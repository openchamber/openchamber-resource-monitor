import { describe, expect, test } from 'bun:test';

import type { RawProcess } from './parse.ts';
import { buildTreeView, collectTree, cpuShare, describeProcess, GROUP_PROCESS_LIMIT, jobTitle } from './tree.ts';

const MB = 1024 * 1024;
const proc = (pid: number, ppid: number, name: string, memoryMb = 10): RawProcess => ({ pid, ppid, name, memory: memoryMb * MB, cpuSeconds: 0 });

// launchd → OpenChamber → helpers, OpenCode (→ agent shell → vite), a terminal (→ next), this service (→ ps)
const processes: RawProcess[] = [
  proc(1, 0, 'launchd'),
  proc(100, 1, 'OpenChamber', 300),
  proc(101, 100, 'OpenChamber Helper (Renderer)', 500),
  proc(102, 100, 'OpenChamber Helper (GPU)', 80),
  proc(200, 100, 'opencode', 600),
  proc(201, 200, 'zsh', 3),
  proc(202, 201, 'node', 120),
  proc(203, 202, 'esbuild', 30),
  proc(300, 100, 'zsh', 4),
  proc(301, 300, 'node', 200),
  proc(400, 100, 'node', 30),
  proc(401, 400, 'ps', 1),
  proc(900, 1, 'opencode', 400),
  proc(901, 900, 'opencode', 50),
  proc(950, 1, 'Safari', 900),
];

const commands = new Map([
  [201, '/bin/zsh -c npm run dev'],
  [200, '/Users/me/.opencode/bin/opencode serve --port 4096'],
  [202, 'node /repo/node_modules/.bin/vite --port 5173'],
  [301, 'node /repo/node_modules/next/dist/bin/next dev'],
  [900, 'opencode'],
]);

const ports = new Map([[100, [3000]], [200, [4096]], [202, [5173]], [301, [3001]]]);
const cpu = new Map<number, number | null>([[100, 1], [101, 2], [200, 3], [202, 4], [203, 1], [301, 2], [400, 0.5], [900, 1], [901, 1]]);

const view = () => {
  const members = collectTree(processes, 100, 400);
  return { members, view: buildTreeView({ members, processes, rootPid: 100, selfPid: 400, cores: 1, cpu, commands, ports }) };
};

describe('process tree', () => {
  test('takes the root and everything under it, but not the service\'s own ps', () => {
    const { members } = view();
    expect([...members.keys()].sort((a, b) => a - b)).toEqual([100, 101, 102, 200, 201, 202, 203, 300, 301, 400]);
  });

  test('groups the app, OpenCode with what agents started, and the terminal', () => {
    const { view: tree } = view();
    // Own processes flat; what agents and the terminal started folds into jobs.
    expect(tree.groups.map((group) => [group.id, group.processes.map((row) => row.pid), group.jobs.map((job) => job.pid)])).toEqual([
      ['app', [100, 101, 102, 400], []],
      ['opencode', [200], [201]],
      ['terminals', [300], [301]],
    ]);
    const agentJob = tree.groups[1]?.jobs[0];
    expect(agentJob).toMatchObject({ title: 'zsh', count: 3, memory: 153 * MB, cpu: 5, ports: [5173] });
    // The wrapper shell (3 MB, idle) isn't worth a row; vite (big) and esbuild (busy) are.
    expect(agentJob?.members.map((row) => [row.pid, row.label])).toEqual([[202, 'vite'], [203, 'esbuild']]);
    const app = tree.groups[0];
    expect(app?.memory).toBe((300 + 500 + 80 + 30) * MB);
    expect(app?.processes.at(-1)?.name).toBe('Resource Monitor');
    expect(tree.memory).toBe((300 + 500 + 80 + 600 + 3 + 120 + 30 + 4 + 200 + 30) * MB);
    expect(tree.cpu).toBeCloseTo(1 + 2 + 3 + 4 + 1 + 2 + 0.5);
  });

  test('dev servers skip the app and OpenCode\'s own ports and count their children', () => {
    const { view: tree } = view();
    expect(tree.servers.map((server) => [server.ports, server.name, server.group])).toEqual([
      [[3001], 'next', 'terminals'],
      [[5173], 'vite', 'opencode'],
    ]);
    expect(tree.servers[1]?.memory).toBe(150 * MB);
    expect(tree.servers[1]?.cpu).toBe(5);
    // Stop on a dev server ends the job that started it, so a watcher can't bring it back.
    expect(tree.servers.map((server) => server.job?.pid)).toEqual([301, 201]);
  });

  test('aggregate CPU is a share of all logical cores; process readings stay per core', () => {
    const members = collectTree(processes, 100, 400);
    // OpenCode (and its agent shell, vite and esbuild) busy on 8 of 16 logical CPUs: 800% per core.
    const busy = new Map<number, number | null>([[200, 300], [202, 400], [203, 100]]);
    const tree = buildTreeView({ members, processes, rootPid: 100, selfPid: 400, cores: 16, cpu: busy, commands, ports });
    const openCode = tree.groups.find((group) => group.id === 'opencode');
    expect(openCode?.cpu).toBe(50);
    expect(tree.cpu).toBe(50);
    // The reading itself is untouched: the server row and the job still say how many cores they keep busy.
    expect(openCode?.processes.find((row) => row.pid === 200)?.cpu).toBe(300);
    expect(openCode?.jobs[0]?.cpu).toBe(500);
    expect(tree.servers.find((server) => server.pid === 202)?.cpu).toBe(500);
  });

  test('the same load is a bigger share of a machine with fewer cores', () => {
    const members = collectTree(processes, 100, 400);
    const busy = new Map<number, number | null>([[200, 100]]);
    const share = (cores: number) => buildTreeView({ members, processes, rootPid: 100, selfPid: 400, cores, cpu: busy, commands, ports }).cpu;
    expect(share(16)).toBeCloseTo(6.25);
    expect(share(2)).toBe(50);
    expect(share(1)).toBe(100);
  });

  test('an aggregate never reads above 100% of the machine', () => {
    const members = collectTree(processes, 100, 400);
    const over = new Map<number, number | null>([[100, 300], [200, 300]]);
    const tree = buildTreeView({ members, processes, rootPid: 100, selfPid: 400, cores: 4, cpu: over, commands, ports });
    expect(tree.cpu).toBe(100);
    expect(tree.groups.every((group) => group.cpu >= 0 && group.cpu <= 100)).toBe(true);
    expect(cpuShare(50, 0)).toBe(50);
    expect(cpuShare(-5, 4)).toBe(0);
  });

  test('OpenCode outside the app is listed once with its children', () => {
    const { view: tree } = view();
    expect(tree.outside.map((row) => [row.pid, row.memory / MB, row.cpu])).toEqual([[900, 450, 2]]);
  });

  test('a Windows wrapper that serves OpenCode counts as OpenCode', () => {
    const windows = [proc(10, 0, 'OpenChamber.exe'), proc(11, 10, 'cmd.exe'), proc(12, 11, 'opencode.exe'), proc(13, 10, 'pwsh.exe')];
    const members = collectTree(windows, 10, 99);
    const tree = buildTreeView({ members, processes: windows, rootPid: 10, selfPid: 99, cores: 1, cpu: new Map(), commands: new Map([[12, 'opencode.exe serve --port 1']]), ports: new Map() });
    expect(tree.groups.map((group) => [group.id, group.processes.map((row) => row.pid)])).toEqual([
      ['app', [10]],
      ['opencode', [11, 12]],
      ['terminals', [13]],
    ]);
    expect(tree.rootName).toBe('OpenChamber');
  });

  test('the app\'s own listening children are not dev servers', () => {
    // Another extension's service: a direct child of the app, on a loopback port.
    const withService = [...processes, proc(500, 100, 'OpenChamber', 40)];
    const members = collectTree(withService, 100, 400);
    const tree = buildTreeView({ members, processes: withService, rootPid: 100, selfPid: 400, cores: 1, cpu, commands, ports: new Map([...ports, [500, [54321]]]) });
    expect(tree.servers.map((server) => server.pid)).toEqual([301, 202]);
    expect(tree.groups[0]?.processes.some((row) => row.pid === 500 && row.ports.includes(54321))).toBe(true);
  });

  test('a project action that exec\'d into its command still counts as the terminal', () => {
    // `zsh -lic "bun run dev"` replaces the shell, so the PTY child is bun itself.
    const withAction = [...processes, { ...proc(600, 100, 'bun', 90), tty: 'ttys007' }, { ...proc(601, 600, 'node', 60), tty: 'ttys007' }];
    const members = collectTree(withAction, 100, 400);
    const tree = buildTreeView({ members, processes: withAction, rootPid: 100, selfPid: 400, cores: 1, cpu, commands: new Map([...commands, [601, 'node /site/node_modules/.bin/astro dev']]), ports: new Map([...ports, [601, [4321]]]) });
    const terminals = tree.groups.find((group) => group.id === 'terminals');
    expect(terminals?.processes.map((row) => row.pid)).toEqual([300]);
    expect(terminals?.jobs.map((job) => [job.pid, job.title, job.count])).toEqual([[301, 'node next dev', 1], [600, 'bun', 2]]);
    expect(tree.servers.find((server) => server.ports[0] === 4321)).toMatchObject({ name: 'astro', job: { pid: 600 } });
  });

  test('a child sharing the app\'s own terminal is still the app (dev builds started from a shell)', () => {
    const fromShell = processes.map((row) => (row.pid === 100 || row.pid === 101 ? { ...row, tty: 'ttys001' } : row));
    const members = collectTree(fromShell, 100, 400);
    const tree = buildTreeView({ members, processes: fromShell, rootPid: 100, selfPid: 400, cores: 1, cpu, commands, ports });
    expect(tree.groups[0]?.processes.map((row) => row.pid)).toContain(101);
  });

  test('on Windows a process older than its recorded parent is not its child', () => {
    const start = (row: RawProcess, startedAt: number): RawProcess => ({ ...row, startedAt });
    // pid 10 was reused by the app after the old parent of 30 died.
    const windows = [start(proc(10, 1, 'OpenChamber.exe'), 2_000), start(proc(20, 10, 'opencode.exe'), 3_000), start(proc(30, 10, 'sqlservr.exe'), 1_000)];
    expect([...collectTree(windows, 10, 99).keys()].sort((a, b) => a - b)).toEqual([10, 20]);
  });

  test('a missing root yields an empty view, not a crash', () => {
    const members = collectTree(processes, 12345, 400);
    expect(members.size).toBe(0);
    expect(buildTreeView({ members, processes, rootPid: 12345, selfPid: 400, cores: 1, cpu, commands, ports }).groups).toEqual([]);
  });

  test('a huge group is cut but still counts everything', () => {
    const many = [proc(1, 0, 'app'), proc(2, 1, 'opencode'), ...Array.from({ length: GROUP_PROCESS_LIMIT + 5 }, (_, index) => proc(10 + index, 2, 'mcp'))];
    const members = collectTree(many, 1, 999);
    const group = buildTreeView({ members, processes: many, rootPid: 1, selfPid: 999, cores: 1, cpu: new Map(), commands: new Map(), ports: new Map() }).groups[1];
    expect(group?.jobs).toHaveLength(GROUP_PROCESS_LIMIT);
    expect(group?.count).toBe(GROUP_PROCESS_LIMIT + 6);
  });
});

describe('describeProcess', () => {
  test('names a runtime by the script it runs', () => {
    expect(describeProcess('node', 'node /repo/node_modules/vite/bin/vite.js --port 5173')).toBe('vite');
    expect(describeProcess('node', 'node /repo/node_modules/next/dist/bin/next dev')).toBe('next');
    expect(describeProcess('node.exe', 'node C:\\repo\\node_modules\\@angular\\cli\\bin\\cli.js serve')).toBe('@angular/cli');
    expect(describeProcess('bun', 'bun run dev')).toBe('dev');
    expect(describeProcess('Python', 'python3 -m http.server 8765')).toBe('http.server');
    expect(describeProcess('node', '')).toBe('node');
    expect(describeProcess('postgres', '/usr/bin/postgres -D data')).toBe('postgres');
  });
});

describe('jobTitle', () => {
  test('runtimes keep their arguments, other programs their name', () => {
    expect(jobTitle('bun', 'bun run dev')).toBe('bun run dev');
    expect(jobTitle('node', 'node /Users/me/site/scripts/dev-web-hmr.mjs')).toBe('node dev-web-hmr.mjs');
    expect(jobTitle('node.exe', '"C:\\Program Files\\nodejs\\node.exe" server.js --port 3000')).toBe('node server.js --port 3000');
    expect(jobTitle('claude', '/opt/claude --output-format stream-json --verbose')).toBe('claude');
    expect(jobTitle('node', 'node a b c d e f g')).toBe('node a b c d …');
  });
});
