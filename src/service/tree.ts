// Which processes are OpenChamber's, and what they are. Pure, so it is tested.
import type { RawProcess } from './parse.ts';
import type { DevServer, GroupId, Job, Percent, ProcessGroup, ProcessRow } from '../shared/snapshot.ts';

export const GROUP_PROCESS_LIMIT = 60;
/** A job member worth a row of its own: busy, big, or listening. */
const NOTABLE_CPU = 1;
const NOTABLE_MEMORY = 40 * 1024 * 1024;
const JOB_MEMBERS_MAX = 8;
const COMMAND_MAX = 400;

/**
 * CPU counted 100 per core, as a share of all cores (0..100), the scale the
 * machine's own CPU uses. Only aggregates go through this; the readings
 * themselves stay per core. Clamped like the machine's CPU.
 */
export const cpuShare = (cpu: number, cores: number): Percent => Math.min(100, Math.max(0, cpu / (cores > 0 ? cores : 1)));

export interface TreeMember {
  process: RawProcess;
  /** 0 for the root, 1 for its children, and so on. */
  depth: number;
  /** The root's child this process descends from; the root's own pid for the root. */
  branch: number;
}

const normalizedName = (name: string): string => name.replace(/^-/, '').replace(/\.exe$/i, '').toLowerCase();

export const isOpenCodeName = (name: string): boolean => /^opencode(-cli)?$/.test(normalizedName(name));

const SHELLS = new Set(['zsh', 'bash', 'sh', 'fish', 'dash', 'ksh', 'tcsh', 'csh', 'nu', 'pwsh', 'powershell', 'cmd', 'elvish', 'xonsh']);
export const isShellName = (name: string): boolean => SHELLS.has(normalizedName(name));

const childrenOf = (processes: readonly RawProcess[]): Map<number, RawProcess[]> => {
  const children = new Map<number, RawProcess[]>();
  for (const process of processes) {
    // pid 0 on Windows lists itself as its own parent.
    if (process.pid === process.ppid) continue;
    const list = children.get(process.ppid) ?? [];
    list.push(process);
    children.set(process.ppid, list);
  }
  return children;
};

/**
 * Everything under `rootPid`, the process that started this service.
 * The service's own children (the `ps` it is running right now) are left
 * out; the service itself stays, so its own cost is visible.
 */
export const collectTree = (processes: readonly RawProcess[], rootPid: number, selfPid: number): Map<number, TreeMember> => {
  const byPid = new Map(processes.map((process) => [process.pid, process]));
  const children = childrenOf(processes);
  const members = new Map<number, TreeMember>();
  const root = byPid.get(rootPid);
  if (!root) return members;
  const stack: TreeMember[] = [{ process: root, depth: 0, branch: rootPid }];
  while (stack.length > 0) {
    const member = stack.pop();
    if (!member || members.has(member.process.pid)) continue;
    members.set(member.process.pid, member);
    if (member.process.pid === selfPid) continue;
    for (const child of children.get(member.process.pid) ?? []) {
      // Windows keeps a dead parent's pid on its children and reuses pids, so a
      // process older than its "parent" belongs to someone else.
      const { startedAt: childStart } = child;
      const { startedAt: parentStart } = member.process;
      if (childStart !== undefined && parentStart !== undefined && childStart < parentStart) continue;
      stack.push({ process: child, depth: member.depth + 1, branch: member.depth === 0 ? child.pid : member.branch });
    }
  }
  return members;
};

const servesOpenCode = (name: string, command: string): boolean => isOpenCodeName(name) && /\sserve(\s|$)/.test(command);

/**
 * A child of the root is OpenCode when it is OpenCode, or a thin wrapper
 * (Windows starts `opencode.cmd` through cmd) whose own child serves it.
 * The built-in terminal and project actions run in a PTY: a shell, or on
 * macOS and Linux whatever the shell exec'd into (`zsh -c "bun run dev"`
 * becomes `bun`), which still holds a terminal the app itself doesn't.
 * Everything else is the app's own plumbing: Electron helpers, other
 * extensions' services, tunnel helpers.
 */
export const classifyBranches = (
  members: ReadonlyMap<number, TreeMember>,
  commands: ReadonlyMap<number, string>,
): Map<number, GroupId> => {
  const groups = new Map<number, GroupId>();
  const rootTty = [...members.values()].find((member) => member.depth === 0)?.process.tty;
  for (const member of members.values()) {
    if (member.depth !== 1) continue;
    const { pid, name } = member.process;
    if (isOpenCodeName(name)) { groups.set(pid, 'opencode'); continue; }
    const wrapsOpenCode = [...members.values()].some((other) => other.branch === pid && other.depth === 2
      && servesOpenCode(other.process.name, commands.get(other.process.pid) ?? ''));
    if (wrapsOpenCode) groups.set(pid, 'opencode');
    else {
      const { tty } = member.process;
      const inTerminal = isShellName(name) || (tty !== undefined && tty !== rootTty);
      groups.set(pid, inTerminal ? 'terminals' : 'app');
    }
  }
  return groups;
};

/** Which part of OpenChamber a tree member belongs to. */
export const groupResolver = (
  members: ReadonlyMap<number, TreeMember>,
  commands: ReadonlyMap<number, string>,
): ((member: TreeMember) => GroupId) => {
  const branches = classifyBranches(members, commands);
  return (member) => (member.depth === 0 ? 'app' : branches.get(member.branch) ?? 'app');
};

/** The OpenCode server the app talks to; it answers on a port but is not a dev server. */
export const isOpenCodeServer = (member: TreeMember, group: GroupId, commands: ReadonlyMap<number, string>): boolean => (
  group === 'opencode' && isOpenCodeName(member.process.name)
  && (member.depth === 1 || servesOpenCode(member.process.name, commands.get(member.process.pid) ?? ''))
);

/** Every pid under `pid` that is in the tree, `pid` first. */
export const subtreePids = (members: ReadonlyMap<number, TreeMember>, pid: number): number[] => {
  const pids: number[] = [];
  const seen = new Set<number>();
  const stack = [pid];
  while (stack.length > 0) {
    const current = stack.pop();
    if (current === undefined || seen.has(current) || !members.has(current)) continue;
    seen.add(current);
    pids.push(current);
    for (const member of members.values()) if (member.process.ppid === current && member.process.pid !== current) stack.push(member.process.pid);
  }
  return pids;
};

/**
 * Jobs: each thing an agent or the terminal started, keyed by its top pid
 * and holding everything under it. Under OpenCode that is every child of the
 * OpenCode server (a command, an MCP server, a provider CLI). In the terminal
 * it is what an interactive shell runs, or a project action that exec'd into
 * its command. The app's own processes are never a job.
 */
export const findJobTops = (
  members: ReadonlyMap<number, TreeMember>,
  commands: ReadonlyMap<number, string>,
  groupOf: (member: TreeMember) => GroupId = groupResolver(members, commands),
): Map<number, GroupId> => {
  const tops = new Map<number, GroupId>();
  const openCodeServers = new Set([...members.values()]
    .filter((member) => isOpenCodeServer(member, groupOf(member), commands))
    .map((member) => member.process.pid));
  const isTerminalShell = (member: TreeMember | undefined): boolean => member !== undefined
    && member.depth === 1 && isShellName(member.process.name) && groupOf(member) === 'terminals';
  for (const member of members.values()) {
    const group = groupOf(member);
    const { pid, ppid, name } = member.process;
    if (group === 'opencode' && openCodeServers.has(ppid)) tops.set(pid, group);
    if (group !== 'terminals') continue;
    if (member.depth === 1 && !isShellName(name)) tops.set(pid, group);
    if (isTerminalShell(members.get(ppid))) tops.set(pid, group);
  }
  return tops;
};

/**
 * A job's title: the command as typed, more or less. Runtimes keep their
 * arguments with paths cut to file names (`node dev-web-hmr.mjs`, `bun run dev`);
 * anything else is its name (`claude`, not a screen of flags).
 */
export const jobTitle = (name: string, command: string): string => {
  const base = normalizedName(name);
  if (!RUNTIMES.has(base)) return name.replace(/\.exe$/i, '');
  const tokens = command.replace(/^"([^"]+)"/, (_, path: string) => path.replace(/\s/g, '\u0000')).trim().split(/\s+/);
  if (tokens.length === 0 || !tokens[0]) return name.replace(/\.exe$/i, '');
  const words = tokens.slice(0, 5).map((token, index) => {
    const plain = token.replace(/\u0000/g, ' ');
    const file = plain.replace(/^.*[\\/]/, '');
    return index === 0 ? file.replace(/\.exe$/i, '') : file;
  });
  return `${words.join(' ')}${tokens.length > 5 ? ' …' : ''}`;
};

const RUNTIMES = new Set(['node', 'bun', 'deno', 'python', 'python3', 'ruby', 'php', 'java', 'npm', 'pnpm', 'yarn', 'npx', 'bunx', 'uv', 'go', 'cargo', 'dotnet']);

/** A readable name for a listening process: `vite` for `node .../vite/bin/vite.js dev`. */
export const describeProcess = (name: string, command: string): string => {
  const base = normalizedName(name);
  if (!RUNTIMES.has(base)) return name.replace(/\.exe$/i, '');
  const args = command.trim().split(/\s+/).slice(1).filter((arg) => !arg.startsWith('-'));
  const first = args[0] === 'run' || args[0] === 'exec' || args[0] === 'x' ? args[1] : args[0];
  if (!first) return base;
  const script = first.replace(/^.*[\\/]/, '').replace(/\.(c|m)?(j|t)s$|\.py$/, '');
  // `.../next/dist/bin/next`, `.../bin/cli.js`: the package name says more than `cli`.
  if (['cli', 'index', 'main', 'bin', 'start'].includes(script)) {
    const parts = first.split(/[\\/]/);
    const pkg = parts.lastIndexOf('node_modules');
    if (pkg >= 0 && parts[pkg + 1]) return parts[pkg + 1]?.startsWith('@') ? `${parts[pkg + 1]}/${parts[pkg + 2] ?? ''}` : parts[pkg + 1] ?? base;
  }
  return script || base;
};

const trimCommand = (command: string): string => (command.length > COMMAND_MAX ? `${command.slice(0, COMMAND_MAX - 1)}…` : command);

interface BuildInput {
  members: ReadonlyMap<number, TreeMember>;
  processes: readonly RawProcess[];
  rootPid: number;
  selfPid: number;
  /** Per process, 100 per core. */
  cpu: ReadonlyMap<number, Percent | null>;
  /** Logical cores, the denominator the machine's own CPU uses; aggregates are shares of it. */
  cores: number;
  commands: ReadonlyMap<number, string>;
  ports: ReadonlyMap<number, number[]>;
}

export interface TreeView {
  rootName: string;
  cpu: Percent;
  memory: number;
  groups: ProcessGroup[];
  servers: DevServer[];
  outside: ProcessRow[];
}

const GROUP_ORDER: GroupId[] = ['app', 'opencode', 'terminals'];

export const buildTreeView = ({ members, processes, rootPid, selfPid, cpu, cores, commands, ports }: BuildInput): TreeView => {
  const groupOf = groupResolver(members, commands);
  const children = childrenOf(processes);
  const byPid = new Map(processes.map((process) => [process.pid, process]));
  const row = (process: RawProcess): ProcessRow => ({
    pid: process.pid,
    ppid: process.ppid,
    name: process.pid === selfPid ? 'Resource Monitor' : process.name.replace(/\.exe$/i, ''),
    label: process.pid === selfPid ? 'Resource Monitor' : describeProcess(process.name, commands.get(process.pid) ?? ''),
    // The service's command line is the app's runtime running this package: noise.
    command: process.pid === selfPid ? '' : trimCommand(commands.get(process.pid) ?? ''),
    cpu: cpu.get(process.pid) ?? null,
    memory: process.memory,
    // The service's own loopback port is how OpenChamber talks to it, not a server of yours.
    ports: process.pid === selfPid ? [] : [...(ports.get(process.pid) ?? [])].sort((a, b) => a - b),
  });

  // Subtree totals inside the tree, for dev servers and the outside list.
  const subtree = (pid: number, inTree: boolean): { cpu: number; memory: number } => {
    let total = { cpu: 0, memory: 0 };
    const stack = [pid];
    const seen = new Set<number>();
    while (stack.length > 0) {
      const current = stack.pop();
      if (current === undefined || seen.has(current)) continue;
      seen.add(current);
      const process = byPid.get(current);
      if (!process || (inTree && !members.has(current))) continue;
      total = { cpu: total.cpu + (cpu.get(current) ?? 0), memory: total.memory + process.memory };
      if (current === selfPid) continue;
      for (const child of children.get(current) ?? []) stack.push(child.pid);
    }
    return total;
  };

  const jobTops = findJobTops(members, commands, groupOf);
  const jobOf = new Map<number, number>();
  for (const top of jobTops.keys()) for (const pid of subtreePids(members, top)) jobOf.set(pid, top);

  const job = (top: TreeMember): Job => {
    const rows = subtreePids(members, top.process.pid).flatMap((pid) => {
      const member = members.get(pid);
      return member ? [row(member.process)] : [];
    });
    const command = commands.get(top.process.pid) ?? '';
    // Wrappers (`bun run dev` → node → node) cost nothing; only rows worth reading stay.
    const notable = rows
      .filter((entry) => (entry.cpu ?? 0) >= NOTABLE_CPU || entry.memory >= NOTABLE_MEMORY || entry.ports.length > 0)
      .sort((a, b) => b.memory - a.memory);
    return {
      pid: top.process.pid,
      name: top.process.name.replace(/\.exe$/i, ''),
      title: jobTitle(top.process.name, command),
      command: trimCommand(command),
      cpu: rows.reduce((sum, entry) => sum + (entry.cpu ?? 0), 0),
      memory: rows.reduce((sum, entry) => sum + entry.memory, 0),
      ports: [...new Set(rows.flatMap((entry) => entry.ports))].sort((a, b) => a - b),
      count: rows.length,
      members: notable.slice(0, JOB_MEMBERS_MAX),
    };
  };

  const groups: ProcessGroup[] = [];
  for (const id of GROUP_ORDER) {
    const inGroup = [...members.values()].filter((member) => groupOf(member) === id);
    if (inGroup.length === 0) continue;
    // What isn't part of a job is listed flat: the app's own processes, the
    // OpenCode server, idle terminal shells. The root leads, then by memory.
    const own = inGroup
      .filter((member) => !jobOf.has(member.process.pid))
      .sort((a, b) => a.depth - b.depth || b.process.memory - a.process.memory)
      .map((member) => row(member.process));
    const jobs = inGroup
      .filter((member) => jobTops.has(member.process.pid))
      .map(job)
      .sort((a, b) => b.memory - a.memory);
    groups.push({
      id,
      cpu: cpuShare(inGroup.reduce((sum, member) => sum + (cpu.get(member.process.pid) ?? 0), 0), cores),
      memory: inGroup.reduce((sum, member) => sum + member.process.memory, 0),
      count: inGroup.length,
      processes: own.slice(0, GROUP_PROCESS_LIMIT),
      jobs: jobs.slice(0, GROUP_PROCESS_LIMIT),
    });
  }

  // The OpenCode server answers the app on a port too; that is not a dev server.
  const openCodeServers = new Set([...members.values()]
    .filter((member) => isOpenCodeServer(member, groupOf(member), commands))
    .map((member) => member.process.pid));
  // Dev servers are what agents and the terminal started. The app's own children
  // (other extensions' services, tunnel helpers) listen on ports too, but they are
  // OpenChamber's plumbing and stay in its process list.
  const servers: DevServer[] = [];
  for (const member of members.values()) {
    const listening = ports.get(member.process.pid);
    const { pid, name } = member.process;
    if (!listening?.length || groupOf(member) === 'app' || openCodeServers.has(pid)) continue;
    const command = commands.get(pid) ?? '';
    const jobTop = members.get(jobOf.get(pid) ?? -1);
    servers.push({
      pid,
      name: describeProcess(name, command),
      executable: name.replace(/\.exe$/i, ''),
      command: trimCommand(command),
      ports: [...listening].sort((a, b) => a - b),
      group: groupOf(member),
      ...subtree(pid, true),
      job: jobTop ? { pid: jobTop.process.pid, name: jobTop.process.name.replace(/\.exe$/i, ''), title: jobTitle(jobTop.process.name, commands.get(jobTop.process.pid) ?? '') } : null,
    });
  }
  servers.sort((a, b) => (a.ports[0] ?? 0) - (b.ports[0] ?? 0));

  const outside = processes
    .filter((process) => !members.has(process.pid) && isOpenCodeName(process.name))
    // A child opencode under another opencode is the same instance's helper.
    .filter((process) => !isOpenCodeName(byPid.get(process.ppid)?.name ?? ''))
    .map((process) => ({ ...row(process), ...subtree(process.pid, false) }))
    .sort((a, b) => b.memory - a.memory);

  const total = subtree(rootPid, true);
  return {
    rootName: members.get(rootPid)?.process.name.replace(/\.exe$/i, '') ?? 'OpenChamber',
    cpu: cpuShare(total.cpu, cores),
    memory: total.memory,
    groups,
    servers,
    outside,
  };
};
