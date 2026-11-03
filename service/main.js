// src/service/main.ts
import http from "node:http";

// src/service/sampler.ts
import os from "node:os";

// src/service/kill.ts
import { execFile } from "node:child_process";
var GRACE_MS = 3000;
var POLL_MS = 150;
var isAlive = (pid) => {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error instanceof Error && "code" in error && error.code === "EPERM";
  }
};
var taskkill = (pids, force) => new Promise((resolve) => {
  const args = [...force ? ["/F"] : [], "/T", ...pids.flatMap((pid) => ["/PID", String(pid)])];
  execFile("taskkill", args, { windowsHide: true, timeout: 1e4 }, () => resolve());
});
var signal = (pids, name) => {
  for (const pid of pids) {
    try {
      process.kill(pid, name);
    } catch {}
  }
};
var stopProcesses = async (pids) => {
  if (pids.length === 0)
    return [];
  if (process.platform === "win32")
    await taskkill(pids, false);
  else
    signal(pids, "SIGTERM");
  const deadline = Date.now() + GRACE_MS;
  while (Date.now() < deadline && pids.some(isAlive))
    await new Promise((resolve) => setTimeout(resolve, POLL_MS));
  const left = pids.filter(isAlive);
  if (left.length === 0)
    return [];
  if (process.platform === "win32")
    await taskkill(left, true);
  else
    signal(left, "SIGKILL");
  await new Promise((resolve) => setTimeout(resolve, POLL_MS * 2));
  return left.filter(isAlive);
};

// src/service/tree.ts
var GROUP_PROCESS_LIMIT = 60;
var NOTABLE_CPU = 1;
var NOTABLE_MEMORY = 40 * 1024 * 1024;
var JOB_MEMBERS_MAX = 8;
var COMMAND_MAX = 400;
var normalizedName = (name) => name.replace(/^-/, "").replace(/\.exe$/i, "").toLowerCase();
var isOpenCodeName = (name) => /^opencode(-cli)?$/.test(normalizedName(name));
var SHELLS = new Set(["zsh", "bash", "sh", "fish", "dash", "ksh", "tcsh", "csh", "nu", "pwsh", "powershell", "cmd", "elvish", "xonsh"]);
var isShellName = (name) => SHELLS.has(normalizedName(name));
var childrenOf = (processes) => {
  const children = new Map;
  for (const process2 of processes) {
    if (process2.pid === process2.ppid)
      continue;
    const list = children.get(process2.ppid) ?? [];
    list.push(process2);
    children.set(process2.ppid, list);
  }
  return children;
};
var collectTree = (processes, rootPid, selfPid) => {
  const byPid = new Map(processes.map((process2) => [process2.pid, process2]));
  const children = childrenOf(processes);
  const members = new Map;
  const root = byPid.get(rootPid);
  if (!root)
    return members;
  const stack = [{ process: root, depth: 0, branch: rootPid }];
  while (stack.length > 0) {
    const member = stack.pop();
    if (!member || members.has(member.process.pid))
      continue;
    members.set(member.process.pid, member);
    if (member.process.pid === selfPid)
      continue;
    for (const child of children.get(member.process.pid) ?? []) {
      const { startedAt: childStart } = child;
      const { startedAt: parentStart } = member.process;
      if (childStart !== undefined && parentStart !== undefined && childStart < parentStart)
        continue;
      stack.push({ process: child, depth: member.depth + 1, branch: member.depth === 0 ? child.pid : member.branch });
    }
  }
  return members;
};
var servesOpenCode = (name, command) => isOpenCodeName(name) && /\sserve(\s|$)/.test(command);
var classifyBranches = (members, commands) => {
  const groups = new Map;
  const rootTty = [...members.values()].find((member) => member.depth === 0)?.process.tty;
  for (const member of members.values()) {
    if (member.depth !== 1)
      continue;
    const { pid, name } = member.process;
    if (isOpenCodeName(name)) {
      groups.set(pid, "opencode");
      continue;
    }
    const wrapsOpenCode = [...members.values()].some((other) => other.branch === pid && other.depth === 2 && servesOpenCode(other.process.name, commands.get(other.process.pid) ?? ""));
    if (wrapsOpenCode)
      groups.set(pid, "opencode");
    else {
      const { tty } = member.process;
      const inTerminal = isShellName(name) || tty !== undefined && tty !== rootTty;
      groups.set(pid, inTerminal ? "terminals" : "app");
    }
  }
  return groups;
};
var groupResolver = (members, commands) => {
  const branches = classifyBranches(members, commands);
  return (member) => member.depth === 0 ? "app" : branches.get(member.branch) ?? "app";
};
var isOpenCodeServer = (member, group, commands) => group === "opencode" && isOpenCodeName(member.process.name) && (member.depth === 1 || servesOpenCode(member.process.name, commands.get(member.process.pid) ?? ""));
var subtreePids = (members, pid) => {
  const pids = [];
  const seen = new Set;
  const stack = [pid];
  while (stack.length > 0) {
    const current = stack.pop();
    if (current === undefined || seen.has(current) || !members.has(current))
      continue;
    seen.add(current);
    pids.push(current);
    for (const member of members.values())
      if (member.process.ppid === current && member.process.pid !== current)
        stack.push(member.process.pid);
  }
  return pids;
};
var findJobTops = (members, commands, groupOf = groupResolver(members, commands)) => {
  const tops = new Map;
  const openCodeServers = new Set([...members.values()].filter((member) => isOpenCodeServer(member, groupOf(member), commands)).map((member) => member.process.pid));
  const isTerminalShell = (member) => member !== undefined && member.depth === 1 && isShellName(member.process.name) && groupOf(member) === "terminals";
  for (const member of members.values()) {
    const group = groupOf(member);
    const { pid, ppid, name } = member.process;
    if (group === "opencode" && openCodeServers.has(ppid))
      tops.set(pid, group);
    if (group !== "terminals")
      continue;
    if (member.depth === 1 && !isShellName(name))
      tops.set(pid, group);
    if (isTerminalShell(members.get(ppid)))
      tops.set(pid, group);
  }
  return tops;
};
var jobTitle = (name, command) => {
  const base = normalizedName(name);
  if (!RUNTIMES.has(base))
    return name.replace(/\.exe$/i, "");
  const tokens = command.replace(/^"([^"]+)"/, (_, path) => path.replace(/\s/g, "\x00")).trim().split(/\s+/);
  if (tokens.length === 0 || !tokens[0])
    return name.replace(/\.exe$/i, "");
  const words = tokens.slice(0, 5).map((token, index) => {
    const plain = token.replace(/\u0000/g, " ");
    const file = plain.replace(/^.*[\\/]/, "");
    return index === 0 ? file.replace(/\.exe$/i, "") : file;
  });
  return `${words.join(" ")}${tokens.length > 5 ? " …" : ""}`;
};
var RUNTIMES = new Set(["node", "bun", "deno", "python", "python3", "ruby", "php", "java", "npm", "pnpm", "yarn", "npx", "bunx", "uv", "go", "cargo", "dotnet"]);
var describeProcess = (name, command) => {
  const base = normalizedName(name);
  if (!RUNTIMES.has(base))
    return name.replace(/\.exe$/i, "");
  const args = command.trim().split(/\s+/).slice(1).filter((arg) => !arg.startsWith("-"));
  const first = args[0] === "run" || args[0] === "exec" || args[0] === "x" ? args[1] : args[0];
  if (!first)
    return base;
  const script = first.replace(/^.*[\\/]/, "").replace(/\.(c|m)?(j|t)s$|\.py$/, "");
  if (["cli", "index", "main", "bin", "start"].includes(script)) {
    const parts = first.split(/[\\/]/);
    const pkg = parts.lastIndexOf("node_modules");
    if (pkg >= 0 && parts[pkg + 1])
      return parts[pkg + 1]?.startsWith("@") ? `${parts[pkg + 1]}/${parts[pkg + 2] ?? ""}` : parts[pkg + 1] ?? base;
  }
  return script || base;
};
var trimCommand = (command) => command.length > COMMAND_MAX ? `${command.slice(0, COMMAND_MAX - 1)}…` : command;
var GROUP_ORDER = ["app", "opencode", "terminals"];
var buildTreeView = ({ members, processes, rootPid, selfPid, cpu, commands, ports }) => {
  const groupOf = groupResolver(members, commands);
  const children = childrenOf(processes);
  const byPid = new Map(processes.map((process2) => [process2.pid, process2]));
  const row = (process2) => ({
    pid: process2.pid,
    ppid: process2.ppid,
    name: process2.pid === selfPid ? "Resource Monitor" : process2.name.replace(/\.exe$/i, ""),
    label: process2.pid === selfPid ? "Resource Monitor" : describeProcess(process2.name, commands.get(process2.pid) ?? ""),
    command: process2.pid === selfPid ? "" : trimCommand(commands.get(process2.pid) ?? ""),
    cpu: cpu.get(process2.pid) ?? null,
    memory: process2.memory,
    ports: process2.pid === selfPid ? [] : [...ports.get(process2.pid) ?? []].sort((a, b) => a - b)
  });
  const subtree = (pid, inTree) => {
    let total = { cpu: 0, memory: 0 };
    const stack = [pid];
    const seen = new Set;
    while (stack.length > 0) {
      const current = stack.pop();
      if (current === undefined || seen.has(current))
        continue;
      seen.add(current);
      const process2 = byPid.get(current);
      if (!process2 || inTree && !members.has(current))
        continue;
      total = { cpu: total.cpu + (cpu.get(current) ?? 0), memory: total.memory + process2.memory };
      if (current === selfPid)
        continue;
      for (const child of children.get(current) ?? [])
        stack.push(child.pid);
    }
    return total;
  };
  const jobTops = findJobTops(members, commands, groupOf);
  const jobOf = new Map;
  for (const top of jobTops.keys())
    for (const pid of subtreePids(members, top))
      jobOf.set(pid, top);
  const job = (top) => {
    const rows = subtreePids(members, top.process.pid).flatMap((pid) => {
      const member = members.get(pid);
      return member ? [row(member.process)] : [];
    });
    const command = commands.get(top.process.pid) ?? "";
    const notable = rows.filter((entry) => (entry.cpu ?? 0) >= NOTABLE_CPU || entry.memory >= NOTABLE_MEMORY || entry.ports.length > 0).sort((a, b) => b.memory - a.memory);
    return {
      pid: top.process.pid,
      name: top.process.name.replace(/\.exe$/i, ""),
      title: jobTitle(top.process.name, command),
      command: trimCommand(command),
      cpu: rows.reduce((sum, entry) => sum + (entry.cpu ?? 0), 0),
      memory: rows.reduce((sum, entry) => sum + entry.memory, 0),
      ports: [...new Set(rows.flatMap((entry) => entry.ports))].sort((a, b) => a - b),
      count: rows.length,
      members: notable.slice(0, JOB_MEMBERS_MAX)
    };
  };
  const groups = [];
  for (const id of GROUP_ORDER) {
    const inGroup = [...members.values()].filter((member) => groupOf(member) === id);
    if (inGroup.length === 0)
      continue;
    const own = inGroup.filter((member) => !jobOf.has(member.process.pid)).sort((a, b) => a.depth - b.depth || b.process.memory - a.process.memory).map((member) => row(member.process));
    const jobs = inGroup.filter((member) => jobTops.has(member.process.pid)).map(job).sort((a, b) => b.memory - a.memory);
    groups.push({
      id,
      cpu: inGroup.reduce((sum, member) => sum + (cpu.get(member.process.pid) ?? 0), 0),
      memory: inGroup.reduce((sum, member) => sum + member.process.memory, 0),
      count: inGroup.length,
      processes: own.slice(0, GROUP_PROCESS_LIMIT),
      jobs: jobs.slice(0, GROUP_PROCESS_LIMIT)
    });
  }
  const openCodeServers = new Set([...members.values()].filter((member) => isOpenCodeServer(member, groupOf(member), commands)).map((member) => member.process.pid));
  const servers = [];
  for (const member of members.values()) {
    const listening = ports.get(member.process.pid);
    const { pid, name } = member.process;
    if (!listening?.length || groupOf(member) === "app" || openCodeServers.has(pid))
      continue;
    const command = commands.get(pid) ?? "";
    const jobTop = members.get(jobOf.get(pid) ?? -1);
    servers.push({
      pid,
      name: describeProcess(name, command),
      executable: name.replace(/\.exe$/i, ""),
      command: trimCommand(command),
      ports: [...listening].sort((a, b) => a - b),
      group: groupOf(member),
      ...subtree(pid, true),
      job: jobTop ? { pid: jobTop.process.pid, name: jobTop.process.name.replace(/\.exe$/i, ""), title: jobTitle(jobTop.process.name, commands.get(jobTop.process.pid) ?? "") } : null
    });
  }
  servers.sort((a, b) => (a.ports[0] ?? 0) - (b.ports[0] ?? 0));
  const outside = processes.filter((process2) => !members.has(process2.pid) && isOpenCodeName(process2.name)).filter((process2) => !isOpenCodeName(byPid.get(process2.ppid)?.name ?? "")).map((process2) => ({ ...row(process2), ...subtree(process2.pid, false) })).sort((a, b) => b.memory - a.memory);
  const total = subtree(rootPid, true);
  return {
    rootName: members.get(rootPid)?.process.name.replace(/\.exe$/i, "") ?? "OpenChamber",
    cpu: total.cpu,
    memory: total.memory,
    groups,
    servers,
    outside
  };
};

// src/service/stop.ts
var parseStopTarget = (value) => {
  if (typeof value !== "object" || value === null)
    return null;
  const kind = Reflect.get(value, "kind");
  if (kind === "terminals")
    return { kind };
  const pid = Reflect.get(value, "pid");
  const name = Reflect.get(value, "name");
  if (kind === "job" && Number.isInteger(pid) && pid > 0 && typeof name === "string" && name)
    return { kind, pid, name };
  return null;
};
var planStop = (members, commands, target) => {
  const tops = findJobTops(members, commands);
  if (target.kind === "job") {
    const member = members.get(target.pid);
    const group = tops.get(target.pid);
    if (!member || !group)
      return null;
    if (member.process.name.replace(/\.exe$/i, "") !== target.name.replace(/\.exe$/i, ""))
      return null;
    return { pids: subtreePids(members, target.pid), needsPort: group === "opencode" };
  }
  const pids = [...tops].filter(([, group]) => group === "terminals").flatMap(([pid]) => subtreePids(members, pid));
  return { pids, needsPort: false };
};

// src/shared/snapshot.ts
var HISTORY_POINTS = 36;

// src/service/sampler.ts
var SAMPLE_INTERVAL_MS = 5000;
var PORTS_REFRESH_MS = 60000;
var cpuTimes = () => os.cpus().map(({ times }) => ({
  idle: times.idle,
  total: times.user + times.nice + times.sys + times.idle + times.irq
}));
var clampPercent = (value) => Math.min(100, Math.max(0, value));
var push = (series, value) => {
  series.push(value);
  if (series.length > HISTORY_POINTS)
    series.splice(0, series.length - HISTORY_POINTS);
};

class Sampler {
  source;
  rootPid;
  selfPid;
  previousCores = null;
  previousCpu = new Map;
  previousAt = 0;
  commandCache = new Map;
  portsCache = new Map;
  portsWarning = false;
  portsPids = new Set;
  portsAt = null;
  lastView = null;
  history = { system: { cpu: [], memory: [] }, app: { cpu: [], memory: [] } };
  constructor(source, rootPid, selfPid) {
    this.source = source;
    this.rootPid = rootPid;
    this.selfPid = selfPid;
  }
  reset() {
    this.previousCores = null;
    this.previousCpu.clear();
    this.previousAt = 0;
    this.portsPids.clear();
    this.portsAt = null;
    this.portsCache.clear();
    this.portsWarning = false;
    this.lastView = null;
    this.history = { system: { cpu: [], memory: [] }, app: { cpu: [], memory: [] } };
  }
  systemCpu() {
    const now = cpuTimes();
    const before = this.previousCores;
    this.previousCores = now;
    if (!before || before.length !== now.length)
      return null;
    let idle = 0;
    let total = 0;
    now.forEach((core, index) => {
      const previous = before[index];
      if (!previous)
        return;
      idle += core.idle - previous.idle;
      total += core.total - previous.total;
    });
    return total > 0 ? clampPercent(100 * (1 - idle / total)) : null;
  }
  processCpu(processes, at, cores) {
    const elapsed = (at - this.previousAt) / 1000;
    const cpu = new Map;
    const next = new Map;
    for (const process2 of processes) {
      next.set(process2.pid, { seconds: process2.cpuSeconds, name: process2.name });
      const previous = this.previousCpu.get(process2.pid);
      if (!previous || previous.name !== process2.name || this.previousAt === 0 || elapsed <= 0) {
        cpu.set(process2.pid, null);
        continue;
      }
      const used = Math.max(0, process2.cpuSeconds - previous.seconds);
      cpu.set(process2.pid, Math.min(100 * cores, 100 * used / elapsed));
    }
    this.previousCpu = next;
    this.previousAt = at;
    return cpu;
  }
  async commandsFor(processes, pids) {
    const byPid = new Map(processes.map((process2) => [process2.pid, process2]));
    for (const pid of this.commandCache.keys()) {
      if (byPid.get(pid)?.name !== this.commandCache.get(pid)?.name)
        this.commandCache.delete(pid);
    }
    const missing = pids.filter((pid) => !this.commandCache.has(pid));
    if (missing.length > 0) {
      try {
        const found = await this.source.commands(missing);
        for (const pid of missing) {
          const process2 = byPid.get(pid);
          if (process2)
            this.commandCache.set(pid, { name: process2.name, command: found.get(pid) ?? "" });
        }
      } catch {}
    }
    return new Map(pids.map((pid) => [pid, this.commandCache.get(pid)?.command ?? ""]));
  }
  async portsFor(pids) {
    const at = Date.now();
    const changed = pids.length !== this.portsPids.size || pids.some((pid) => !this.portsPids.has(pid));
    if (!changed && this.portsAt !== null && at - this.portsAt < PORTS_REFRESH_MS)
      return this.portsCache;
    this.portsPids = new Set(pids);
    this.portsAt = at;
    try {
      this.portsCache = pids.length > 0 ? await this.source.ports(pids) : new Map;
      this.portsWarning = false;
    } catch {
      this.portsCache = new Map;
      this.portsWarning = true;
    }
    return this.portsCache;
  }
  async stop(target) {
    const processes = await this.source.list();
    const members = collectTree(processes, this.rootPid, this.selfPid);
    const commands = await this.commandsFor(processes, [...members.keys()]);
    const plan = planStop(members, commands, target);
    if (plan === null)
      return null;
    const { pids } = plan;
    if (plan.needsPort && (await this.source.ports(pids)).size === 0)
      return null;
    const survived = await stopProcesses(pids);
    return { stopped: pids.length - survived.length, survived: survived.length };
  }
  async sample() {
    const warnings = [];
    const cores = Math.max(1, os.cpus().length);
    const at = Date.now();
    const systemCpu = this.systemCpu();
    let memoryUsed;
    try {
      memoryUsed = await this.source.memoryUsed();
    } catch {
      memoryUsed = os.totalmem() - os.freemem();
    }
    let processes = null;
    try {
      processes = await this.source.list();
    } catch {
      warnings.push("processes-unavailable");
    }
    let view;
    if (processes) {
      const cpu = this.processCpu(processes, Date.now(), cores);
      const members = collectTree(processes, this.rootPid, this.selfPid);
      const outsideCandidates = processes.filter((process2) => !members.has(process2.pid) && isOpenCodeName(process2.name));
      const detailPids = [...members.keys(), ...outsideCandidates.map((process2) => process2.pid)];
      const commands = await this.commandsFor(processes, detailPids);
      const ports = await this.portsFor([...members.keys()]);
      if (this.portsWarning)
        warnings.push("ports-unavailable");
      view = buildTreeView({ members, processes, rootPid: this.rootPid, selfPid: this.selfPid, cpu, commands, ports });
      this.lastView = view;
    } else {
      view = this.lastView ?? { rootName: "OpenChamber", cpu: 0, memory: 0, groups: [], servers: [], outside: [] };
    }
    const load = os.loadavg();
    const firstCpu = os.cpus()[0];
    const system = {
      hostname: os.hostname(),
      platform: process.platform,
      release: os.release(),
      arch: os.arch(),
      cpuModel: firstCpu?.model.trim() ?? "",
      cores,
      cpu: systemCpu,
      load: process.platform === "win32" ? null : [load[0] ?? 0, load[1] ?? 0, load[2] ?? 0],
      memoryTotal: os.totalmem(),
      memoryUsed,
      uptimeSeconds: os.uptime()
    };
    if (systemCpu !== null) {
      push(this.history.system.cpu, systemCpu);
      push(this.history.system.memory, memoryUsed);
      if (processes) {
        push(this.history.app.cpu, view.cpu);
        push(this.history.app.memory, view.memory);
      }
    }
    return {
      at,
      intervalMs: SAMPLE_INTERVAL_MS,
      system,
      app: { rootPid: this.rootPid, rootName: view.rootName, cpu: view.cpu, memory: view.memory, groups: view.groups },
      outside: view.outside,
      servers: view.servers,
      history: {
        system: { cpu: [...this.history.system.cpu], memory: [...this.history.system.memory] },
        app: { cpu: [...this.history.app.cpu], memory: [...this.history.app.memory] }
      },
      warnings
    };
  }
}

// src/service/sources.ts
import { execFile as execFile2, spawn } from "node:child_process";
import { readdir, readFile, readlink } from "node:fs/promises";
import os2 from "node:os";

// src/service/parse.ts
var toInt = (value) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};
var basename = (path) => {
  const trimmed = path.trim();
  const slash = Math.max(trimmed.lastIndexOf("/"), trimmed.lastIndexOf("\\"));
  return slash >= 0 ? trimmed.slice(slash + 1) : trimmed;
};
var parseCpuTime = (value) => {
  const [daysPart, clock] = value.includes("-") ? value.split("-", 2) : ["0", value];
  const parts = (clock ?? "").split(":").map(Number);
  if (parts.some((part) => !Number.isFinite(part)))
    return Number.NaN;
  let seconds = 0;
  for (const part of parts)
    seconds = seconds * 60 + part;
  return Number(daysPart) * 86400 + seconds;
};
var parsePsList = (stdout) => {
  const rows = [];
  for (const line of stdout.split(`
`)) {
    const match = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\S+)\s+(\S+)\s+(.+?)\s*$/.exec(line);
    if (!match)
      continue;
    const pid = toInt(match[1]);
    const ppid = toInt(match[2]);
    const rssKb = toInt(match[3]);
    const cpuSeconds = parseCpuTime(match[4] ?? "");
    if (!Number.isFinite(pid) || !Number.isFinite(ppid))
      continue;
    const tty = match[5] ?? "??";
    rows.push({
      pid,
      ppid,
      name: basename(match[6] ?? ""),
      memory: Number.isFinite(rssKb) ? rssKb * 1024 : 0,
      cpuSeconds: Number.isFinite(cpuSeconds) ? cpuSeconds : 0,
      ...tty === "??" || tty === "-" ? {} : { tty }
    });
  }
  return rows;
};
var parsePsCommands = (stdout) => {
  const commands = new Map;
  for (const line of stdout.split(`
`)) {
    const match = /^\s*(\d+)\s+(.*?)\s*$/.exec(line);
    if (match)
      commands.set(toInt(match[1]), match[2] ?? "");
  }
  return commands;
};
var parseVmStatUsed = (stdout) => {
  const pageSize = toInt(/page size of (\d+) bytes/.exec(stdout)?.[1]);
  const pages = (label) => {
    const match = new RegExp(`^${label}:\\s+(\\d+)`, "m").exec(stdout);
    return match ? toInt(match[1]) : Number.NaN;
  };
  const anonymous = pages("Anonymous pages");
  const purgeable = pages("Pages purgeable");
  const wired = pages("Pages wired down");
  const compressed = pages("Pages occupied by compressor");
  const values = [pageSize, anonymous, wired, compressed];
  if (values.some((value) => !Number.isFinite(value)))
    return null;
  const app = Math.max(0, anonymous - (Number.isFinite(purgeable) ? purgeable : 0));
  return (app + wired + compressed) * pageSize;
};
var parseMeminfoUsed = (content) => {
  const read = (label) => toInt(new RegExp(`^${label}:\\s+(\\d+) kB`, "m").exec(content)?.[1]) * 1024;
  const total = read("MemTotal");
  const available = read("MemAvailable");
  return Number.isFinite(total) && Number.isFinite(available) ? Math.max(0, total - available) : null;
};
var parseLinuxStat = (content, ticksPerSecond, pageSize) => {
  const open = content.indexOf("(");
  const close = content.lastIndexOf(")");
  if (open < 0 || close < open)
    return null;
  const pid = toInt(content.slice(0, open));
  const fields = content.slice(close + 2).split(" ");
  const ppid = toInt(fields[1]);
  const tty = fields[4];
  const utime = toInt(fields[11]);
  const stime = toInt(fields[12]);
  const rss = toInt(fields[21]);
  if (!Number.isFinite(pid) || !Number.isFinite(ppid))
    return null;
  return {
    pid,
    ppid,
    name: content.slice(open + 1, close),
    memory: Number.isFinite(rss) ? rss * pageSize : 0,
    cpuSeconds: Number.isFinite(utime + stime) ? (utime + stime) / ticksPerSecond : 0,
    ...tty && tty !== "0" ? { tty } : {}
  };
};
var parseCmdline = (content) => content.split("\x00").filter(Boolean).join(" ");
var parseProcNetTcp = (content) => {
  const listening = new Map;
  for (const line of content.split(`
`).slice(1)) {
    const fields = line.trim().split(/\s+/);
    if (fields[3] !== "0A")
      continue;
    const port = Number.parseInt(fields[1]?.split(":")[1] ?? "", 16);
    const inode = fields[9];
    if (inode && inode !== "0" && Number.isFinite(port))
      listening.set(inode, port);
  }
  return listening;
};
var socketInode = (link) => /^socket:\[(\d+)\]$/.exec(link)?.[1] ?? null;
var addPort = (ports, pid, port) => {
  if (!Number.isFinite(pid) || !Number.isFinite(port) || port <= 0)
    return;
  const list = ports.get(pid) ?? [];
  if (!list.includes(port))
    list.push(port);
  ports.set(pid, list);
};
var portOf = (address) => toInt(address.slice(address.lastIndexOf(":") + 1));
var parseLsofListen = (stdout) => {
  const ports = new Map;
  let pid = Number.NaN;
  for (const line of stdout.split(`
`)) {
    if (line.startsWith("p"))
      pid = toInt(line.slice(1));
    else if (line.startsWith("n"))
      addPort(ports, pid, portOf(line.slice(1)));
  }
  return ports;
};
var parseNetstatListen = (stdout) => {
  const ports = new Map;
  for (const line of stdout.split(/\r?\n/)) {
    const fields = line.trim().split(/\s+/);
    if (fields[0] !== "TCP" || fields.length < 5)
      continue;
    const remote = fields[2] ?? "";
    if (remote !== "0.0.0.0:0" && remote !== "[::]:0")
      continue;
    addPort(ports, toInt(fields[fields.length - 1]), portOf(fields[1] ?? ""));
  }
  return ports;
};
var parseWindowsList = (stdout) => {
  const rows = [];
  for (const line of stdout.split(/\r?\n/)) {
    const [pid, ppid, memory, cpu, started, ...name] = line.split("\t");
    const parsedPid = toInt(pid);
    const parsedPpid = toInt(ppid);
    if (!Number.isFinite(parsedPid) || !Number.isFinite(parsedPpid))
      continue;
    const bytes = Number(memory);
    const ticks = Number(cpu);
    const startedAt = Number.parseInt(started ?? "", 10);
    rows.push({
      pid: parsedPid,
      ppid: parsedPpid,
      name: name.join("\t").trim(),
      memory: Number.isFinite(bytes) ? bytes : 0,
      cpuSeconds: Number.isFinite(ticks) ? ticks / 1e7 : 0,
      ...Number.isFinite(startedAt) ? { startedAt } : {}
    });
  }
  return rows;
};
var parseWindowsCommands = (stdout) => {
  const commands = new Map;
  for (const line of stdout.split(/\r?\n/)) {
    const tab = line.indexOf("\t");
    if (tab < 0)
      continue;
    const pid = toInt(line.slice(0, tab));
    if (Number.isFinite(pid))
      commands.set(pid, line.slice(tab + 1).trim());
  }
  return commands;
};

// src/service/sources.ts
var run = (file, args, okExitCodes = [0]) => new Promise((resolve, reject) => {
  execFile2(file, args, { timeout: 1e4, maxBuffer: 16 * 1024 * 1024, windowsHide: true }, (error, stdout) => {
    const code = error && "code" in error && typeof error.code === "number" ? error.code : error ? -1 : 0;
    if (!error || okExitCodes.includes(code))
      resolve(stdout);
    else
      reject(error);
  });
});
var chunks = (items, size) => {
  const result = [];
  for (let index = 0;index < items.length; index += size)
    result.push(items.slice(index, index + size));
  return result;
};
var freeMemoryFallback = () => os2.totalmem() - os2.freemem();
var psSource = () => ({
  list: async () => parsePsList(await run("ps", ["-A", "-o", "pid=,ppid=,rss=,cputime=,tty=,comm="])),
  commands: async (pids) => {
    const commands = new Map;
    for (const part of chunks(pids, 200)) {
      for (const [pid, command] of parsePsCommands(await run("ps", ["-ww", "-o", "pid=,command=", "-p", part.join(",")], [0, 1]))) {
        commands.set(pid, command);
      }
    }
    return commands;
  },
  ports: async (pids) => {
    const ports = new Map;
    for (const part of chunks(pids, 200)) {
      for (const [pid, list] of parseLsofListen(await run("lsof", ["-nP", "-a", "-p", part.join(","), "-iTCP", "-sTCP:LISTEN", "-Fpn"], [0, 1]))) {
        ports.set(pid, list);
      }
    }
    return ports;
  },
  memoryUsed: async () => {
    if (process.platform !== "darwin")
      return freeMemoryFallback();
    return parseVmStatUsed(await run("vm_stat", [])) ?? freeMemoryFallback();
  },
  close: () => {
    return;
  }
});
var getconf = async (name, fallback) => {
  try {
    const value = Number.parseInt(await run("getconf", [name]), 10);
    return Number.isFinite(value) && value > 0 ? value : fallback;
  } catch {
    return fallback;
  }
};
var linuxSource = () => {
  const constants = Promise.all([getconf("CLK_TCK", 100), getconf("PAGESIZE", 4096)]);
  return {
    list: async () => {
      const [ticks, pageSize] = await constants;
      const entries = (await readdir("/proc")).filter((entry) => /^\d+$/.test(entry));
      const rows = await Promise.all(entries.map(async (pid) => {
        try {
          return parseLinuxStat(await readFile(`/proc/${pid}/stat`, "utf8"), ticks, pageSize);
        } catch {
          return null;
        }
      }));
      return rows.filter((row) => row !== null);
    },
    commands: async (pids) => {
      const commands = new Map;
      await Promise.all(pids.map(async (pid) => {
        try {
          commands.set(pid, parseCmdline(await readFile(`/proc/${pid}/cmdline`, "utf8")));
        } catch {}
      }));
      return commands;
    },
    ports: async (pids) => {
      const listening = new Map;
      for (const table of ["/proc/net/tcp", "/proc/net/tcp6"]) {
        try {
          for (const [inode, port] of parseProcNetTcp(await readFile(table, "utf8")))
            listening.set(inode, port);
        } catch {}
      }
      const ports = new Map;
      if (listening.size === 0)
        return ports;
      await Promise.all(pids.map(async (pid) => {
        let fds;
        try {
          fds = await readdir(`/proc/${pid}/fd`);
        } catch {
          return;
        }
        const found = new Set;
        await Promise.all(fds.map(async (fd) => {
          try {
            const inode = socketInode(await readlink(`/proc/${pid}/fd/${fd}`));
            const port = inode ? listening.get(inode) : undefined;
            if (port)
              found.add(port);
          } catch {}
        }));
        if (found.size > 0)
          ports.set(pid, [...found]);
      }));
      return ports;
    },
    memoryUsed: async () => parseMeminfoUsed(await readFile("/proc/meminfo", "utf8")) ?? freeMemoryFallback(),
    close: () => {
      return;
    }
  };
};
var END = "<<resource-monitor-end>>";
var WINDOWS_HELPER = `
$ErrorActionPreference = 'SilentlyContinue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
while ($true) {
  $request = [Console]::In.ReadLine()
  if ($null -eq $request) { break }
  $lines = @()
  if ($request -eq 'list') {
    $lines = foreach ($p in Get-CimInstance Win32_Process -Property ProcessId,ParentProcessId,WorkingSetSize,KernelModeTime,UserModeTime,CreationDate,Name) {
      $started = if ($p.CreationDate) { ([DateTimeOffset]$p.CreationDate).ToUnixTimeMilliseconds() } else { '' }
      "$($p.ProcessId)\`t$($p.ParentProcessId)\`t$($p.WorkingSetSize)\`t$([uint64]$p.KernelModeTime + [uint64]$p.UserModeTime)\`t$started\`t$($p.Name)"
    }
  } elseif ($request.StartsWith('commands ')) {
    $ids = $request.Substring(9).Split(',') | Where-Object { $_ -match '^[0-9]+$' }
    if ($ids) {
      $filter = ($ids | ForEach-Object { "ProcessId=$_" }) -join ' OR '
      $lines = foreach ($p in Get-CimInstance Win32_Process -Filter $filter -Property ProcessId,CommandLine) {
        "$($p.ProcessId)\`t$($p.CommandLine -replace '[\\t\\r\\n]', ' ')"
      }
    }
  }
  [Console]::Out.WriteLine(($lines -join "\`n"))
  [Console]::Out.WriteLine('${END}')
  [Console]::Out.Flush()
}
`;
var windowsSource = () => {
  let helper = null;
  let buffer = "";
  let waiting = null;
  let queue = Promise.resolve();
  const fail = (error) => {
    if (waiting) {
      clearTimeout(waiting.timer);
      waiting.reject(error);
      waiting = null;
    }
  };
  const start = () => {
    if (helper && helper.exitCode === null)
      return helper;
    const encoded = Buffer.from(WINDOWS_HELPER, "utf16le").toString("base64");
    const child = spawn("powershell.exe", ["-NoLogo", "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-EncodedCommand", encoded], {
      windowsHide: true,
      stdio: ["pipe", "pipe", "pipe"]
    });
    buffer = "";
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      buffer += chunk;
      const end = buffer.indexOf(END);
      if (end < 0 || !waiting)
        return;
      const answer = buffer.slice(0, end);
      buffer = buffer.slice(end + END.length).replace(/^\r?\n/, "");
      clearTimeout(waiting.timer);
      waiting.resolve(answer);
      waiting = null;
    });
    child.stderr.resume();
    child.on("error", (error) => fail(error));
    child.on("exit", () => {
      if (helper === child)
        helper = null;
      fail(new Error("PowerShell helper exited"));
    });
    helper = child;
    return child;
  };
  const ask = (request) => {
    const next = queue.then(() => new Promise((resolve, reject) => {
      const child = start();
      const timer = setTimeout(() => {
        fail(new Error("PowerShell helper timed out"));
        child.kill();
      }, 15000);
      waiting = { resolve, reject, timer };
      child.stdin.write(`${request}
`);
    }));
    queue = next.catch(() => {
      return;
    });
    return next;
  };
  return {
    list: async () => parseWindowsList(await ask("list")),
    commands: async (pids) => {
      const commands = new Map;
      for (const part of chunks(pids, 100)) {
        for (const [pid, command] of parseWindowsCommands(await ask(`commands ${part.join(",")}`)))
          commands.set(pid, command);
      }
      return commands;
    },
    ports: async (pids) => {
      const wanted = new Set(pids);
      const all = parseNetstatListen(await run("netstat", ["-ano"]));
      return new Map([...all].filter(([pid]) => wanted.has(pid)));
    },
    memoryUsed: async () => freeMemoryFallback(),
    close: () => {
      fail(new Error("closed"));
      helper?.kill();
      helper = null;
    }
  };
};
var createProcessSource = () => {
  if (process.platform === "win32")
    return windowsSource();
  if (process.platform === "linux")
    return linuxSource();
  return psSource();
};

// src/shared/format.ts
var locale = "en";
var setLocale = (next) => {
  try {
    locale = Intl.NumberFormat.supportedLocalesOf(next)[0] ?? "en";
  } catch {
    locale = "en";
  }
};
var number = (value, digits) => new Intl.NumberFormat(locale, {
  minimumFractionDigits: digits,
  maximumFractionDigits: digits
}).format(value);
var formatBytes = (bytes) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = Math.max(0, bytes);
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const digits = unit >= 3 && value < 100 ? 1 : 0;
  return `${number(value, digits)} ${units[unit]}`;
};
var formatPercent = (value) => {
  if (value === null)
    return "–";
  if (value > 0 && value < 0.1)
    return "<0.1%";
  return `${number(value, value < 10 ? 1 : 0)}%`;
};

// src/service/status-view.ts
var PORTS_SHOWN = 6;
var clampShare = (value) => Math.min(100, Math.max(0, value));
var statusView = (snapshot, locale) => {
  setLocale(locale);
  const { system, app } = snapshot;
  const rows = [];
  const processesMissing = snapshot.warnings.includes("processes-unavailable");
  if (processesMissing) {
    rows.push({ kind: "note", id: "processes", text: "Could not read the process list; showing system totals only.", tone: "warning" });
  } else {
    const history = snapshot.history.app.memory;
    rows.push({
      kind: "line",
      id: "app",
      label: "OpenChamber",
      content: {
        kind: "chart",
        values: history,
        max: Math.max(1, app.memory, ...history) * 1.15,
        tone: "accent",
        unit: "bytes",
        step: snapshot.intervalMs / 1000
      },
      value: `${formatBytes(app.memory)} · ${formatPercent(app.cpu)}`,
      tooltip: "Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU counts 100% per core."
    });
  }
  rows.push({
    kind: "line",
    id: "cpu",
    label: "CPU",
    content: { kind: "bar", value: clampShare(system.cpu ?? 0), tone: "info" },
    value: formatPercent(system.cpu)
  });
  rows.push({
    kind: "line",
    id: "memory",
    label: "Memory",
    content: { kind: "bar", value: clampShare(system.memoryUsed / Math.max(1, system.memoryTotal) * 100), tone: "success" },
    value: `${formatBytes(system.memoryUsed)} / ${formatBytes(system.memoryTotal)}`
  });
  const listening = [...new Set(snapshot.servers.flatMap((server) => server.ports))].sort((a, b) => a - b);
  if (listening.length > 0 && !processesMissing) {
    rows.push({
      kind: "line",
      id: "servers",
      label: "Dev servers",
      content: {
        kind: "chips",
        chips: listening.slice(0, PORTS_SHOWN).map((port) => ({ id: `port-${port}`, label: `:${port}`, url: `http://localhost:${port}` }))
      },
      ...listening.length > PORTS_SHOWN ? { value: `+${listening.length - PORTS_SHOWN}` } : {}
    });
  }
  return { rows };
};

// src/service/main.ts
var port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
var token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? "";
if (!port || !token) {
  console.error("OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required");
  process.exit(1);
}
var IDLE_STOP_MS = 20000;
var WARM_UP_MS = 700;
var source = createProcessSource();
var sampler = new Sampler(source, process.ppid, process.pid);
var latest = null;
var lastRequestAt = 0;
var running = false;
var timer = null;
var warming = null;
var stop = () => {
  if (timer)
    clearTimeout(timer);
  timer = null;
  running = false;
  latest = null;
  sampler.reset();
  source.close();
};
var schedule = () => {
  timer = setTimeout(() => {
    tick();
  }, SAMPLE_INTERVAL_MS);
};
var tick = async () => {
  timer = null;
  if (Date.now() - lastRequestAt > IDLE_STOP_MS) {
    stop();
    return;
  }
  try {
    latest = await sampler.sample();
  } catch {}
  if (running)
    schedule();
};
var ensureRunning = () => {
  if (running && latest)
    return Promise.resolve();
  if (warming)
    return warming;
  warming = (async () => {
    try {
      latest = await sampler.sample();
      await new Promise((resolve) => setTimeout(resolve, WARM_UP_MS));
      latest = await sampler.sample();
      running = true;
      schedule();
    } finally {
      warming = null;
    }
  })();
  return warming;
};
var json = (res, status, body) => {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
};
var server = http.createServer((req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    json(res, 401, { error: "unauthorized" });
    return;
  }
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (url.pathname === "/health") {
    json(res, 200, { ok: true });
    return;
  }
  if (req.method === "POST" && url.pathname === "/stop") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString("utf8");
    });
    req.on("end", () => {
      let target;
      try {
        target = parseStopTarget(JSON.parse(body));
      } catch {
        target = null;
      }
      if (!target) {
        json(res, 400, { error: "bad-request" });
        return;
      }
      sampler.stop(target).then((result) => result ? json(res, 200, result) : json(res, 404, { error: "not-stoppable" }), () => json(res, 500, { error: "stop-failed" }));
    });
    return;
  }
  const view = url.pathname === "/status";
  if (req.method !== "GET" || url.pathname !== "/snapshot" && !view) {
    json(res, 404, { error: "not-found" });
    return;
  }
  lastRequestAt = Date.now();
  const locale = url.searchParams.get("locale") ?? "en";
  ensureRunning().then(() => {
    if (!latest) {
      json(res, 503, { error: "no-sample" });
      return;
    }
    json(res, 200, view ? statusView(latest, locale) : latest);
  }).catch(() => json(res, 500, { error: "sample-failed" }));
});
var shutdown = () => {
  stop();
  server.close();
  process.exit(0);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
server.listen(port, "127.0.0.1");
