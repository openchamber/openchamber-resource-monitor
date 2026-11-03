// Turns OS readings into a Snapshot, one sample at a time, and keeps the
// short history the charts draw.
import os from 'node:os';

import type { RawProcess } from './parse.ts';
import type { ProcessSource } from './sources.ts';
import { stopProcesses } from './kill.ts';
import { planStop, type StopTarget } from './stop.ts';
import { buildTreeView, collectTree, isOpenCodeName, type TreeView } from './tree.ts';
import { HISTORY_POINTS, type Percent, type Snapshot, type SystemStats, type Warning } from '../shared/snapshot.ts';

export const SAMPLE_INTERVAL_MS = 5_000;
/** Refresh unchanged processes too: a running server can start listening later. */
const PORTS_REFRESH_MS = 60_000;

interface CpuTimes { idle: number; total: number }

const cpuTimes = (): CpuTimes[] => os.cpus().map(({ times }) => ({
  idle: times.idle,
  total: times.user + times.nice + times.sys + times.idle + times.irq,
}));

const clampPercent = (value: number): Percent => Math.min(100, Math.max(0, value));

const push = (series: number[], value: number): void => {
  series.push(value);
  if (series.length > HISTORY_POINTS) series.splice(0, series.length - HISTORY_POINTS);
};

export class Sampler {
  private previousCores: CpuTimes[] | null = null;
  private previousCpu = new Map<number, { seconds: number; name: string }>();
  private previousAt = 0;
  private commandCache = new Map<number, { name: string; command: string }>();
  private portsCache = new Map<number, number[]>();
  private portsWarning = false;
  private portsPids = new Set<number>();
  private portsAt: number | null = null;
  /** The last tree read that worked, shown again while the process list can't be read. */
  private lastView: TreeView | null = null;
  private history = { system: { cpu: [] as number[], memory: [] as number[] }, app: { cpu: [] as number[], memory: [] as number[] } };

  constructor(
    private readonly source: ProcessSource,
    private readonly rootPid: number,
    private readonly selfPid: number,
  ) {}

  /** Forget everything time-dependent, so a restart after idling draws no line across the gap. */
  reset(): void {
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

  /** The machine's CPU as a share of all cores. */
  private systemCpu(): Percent | null {
    const now = cpuTimes();
    const before = this.previousCores;
    this.previousCores = now;
    if (!before || before.length !== now.length) return null;
    let idle = 0;
    let total = 0;
    now.forEach((core, index) => {
      const previous = before[index];
      if (!previous) return;
      idle += core.idle - previous.idle;
      total += core.total - previous.total;
    });
    return total > 0 ? clampPercent(100 * (1 - idle / total)) : null;
  }

  private processCpu(processes: readonly RawProcess[], at: number, cores: number): Map<number, Percent | null> {
    const elapsed = (at - this.previousAt) / 1000;
    const cpu = new Map<number, Percent | null>();
    const next = new Map<number, { seconds: number; name: string }>();
    for (const process of processes) {
      next.set(process.pid, { seconds: process.cpuSeconds, name: process.name });
      const previous = this.previousCpu.get(process.pid);
      // A reused pid shows up under another name; it gets no number until its second sample.
      if (!previous || previous.name !== process.name || this.previousAt === 0 || elapsed <= 0) {
        cpu.set(process.pid, null);
        continue;
      }
      const used = Math.max(0, process.cpuSeconds - previous.seconds);
      // 100 per core, like Activity Monitor; one process can't use more cores than exist.
      cpu.set(process.pid, Math.min(100 * cores, (100 * used) / elapsed));
    }
    this.previousCpu = next;
    this.previousAt = at;
    return cpu;
  }

  private async commandsFor(processes: readonly RawProcess[], pids: readonly number[]): Promise<Map<number, string>> {
    const byPid = new Map(processes.map((process) => [process.pid, process]));
    for (const pid of this.commandCache.keys()) {
      if (byPid.get(pid)?.name !== this.commandCache.get(pid)?.name) this.commandCache.delete(pid);
    }
    const missing = pids.filter((pid) => !this.commandCache.has(pid));
    if (missing.length > 0) {
      try {
        const found = await this.source.commands(missing);
        for (const pid of missing) {
          const process = byPid.get(pid);
          if (process) this.commandCache.set(pid, { name: process.name, command: found.get(pid) ?? '' });
        }
      } catch {
        // Commands are detail; rows still show names. The next sample asks again.
      }
    }
    return new Map(pids.map((pid) => [pid, this.commandCache.get(pid)?.command ?? '']));
  }

  private async portsFor(pids: readonly number[]): Promise<Map<number, number[]>> {
    const at = Date.now();
    const changed = pids.length !== this.portsPids.size || pids.some((pid) => !this.portsPids.has(pid));
    if (!changed && this.portsAt !== null && at - this.portsAt < PORTS_REFRESH_MS) return this.portsCache;
    this.portsPids = new Set(pids);
    this.portsAt = at;
    try {
      this.portsCache = pids.length > 0 ? await this.source.ports(pids) : new Map();
      this.portsWarning = false;
    } catch {
      this.portsCache = new Map();
      this.portsWarning = true;
    }
    return this.portsCache;
  }

  /**
   * Stops a dev server or what runs in the terminal, planned on a fresh read.
   * `null` when the target isn't something Stop may touch (anymore).
   */
  async stop(target: StopTarget): Promise<{ stopped: number; survived: number } | null> {
    const processes = await this.source.list();
    const members = collectTree(processes, this.rootPid, this.selfPid);
    const commands = await this.commandsFor(processes, [...members.keys()]);
    const plan = planStop(members, commands, target);
    if (plan === null) return null;
    const { pids } = plan;
    if (plan.needsPort && (await this.source.ports(pids)).size === 0) return null;
    const survived = await stopProcesses(pids);
    return { stopped: pids.length - survived.length, survived: survived.length };
  }

  async sample(): Promise<Snapshot> {
    const warnings: Warning[] = [];
    const cores = Math.max(1, os.cpus().length);
    const at = Date.now();
    const systemCpu = this.systemCpu();
    let memoryUsed: number;
    try {
      memoryUsed = await this.source.memoryUsed();
    } catch {
      memoryUsed = os.totalmem() - os.freemem();
    }

    let processes: RawProcess[] | null = null;
    try {
      processes = await this.source.list();
    } catch {
      warnings.push('processes-unavailable');
    }
    let view: TreeView;
    if (processes) {
      // CPU times are as of the moment the list came back, which on Windows can be
      // seconds after `at`; measuring from `at` would spread them over too long a time.
      const cpu = this.processCpu(processes, Date.now(), cores);
      const members = collectTree(processes, this.rootPid, this.selfPid);
      const outsideCandidates = processes.filter((process) => !members.has(process.pid) && isOpenCodeName(process.name));
      const detailPids = [...members.keys(), ...outsideCandidates.map((process) => process.pid)];
      const commands = await this.commandsFor(processes, detailPids);
      const ports = await this.portsFor([...members.keys()]);
      if (this.portsWarning) warnings.push('ports-unavailable');
      view = buildTreeView({ members, processes, rootPid: this.rootPid, selfPid: this.selfPid, cpu, commands, ports });
      this.lastView = view;
    } else {
      // A failed read is not "OpenChamber uses nothing": keep the last view and
      // the previous CPU times, so neither the chart nor the next reading drops to zero.
      view = this.lastView ?? { rootName: 'OpenChamber', cpu: 0, memory: 0, groups: [], servers: [], outside: [] };
    }

    const load = os.loadavg();
    const firstCpu = os.cpus()[0];
    const system: SystemStats = {
      hostname: os.hostname(),
      platform: process.platform,
      release: os.release(),
      arch: os.arch(),
      cpuModel: firstCpu?.model.trim() ?? '',
      cores,
      cpu: systemCpu,
      load: process.platform === 'win32' ? null : [load[0] ?? 0, load[1] ?? 0, load[2] ?? 0],
      memoryTotal: os.totalmem(),
      memoryUsed,
      uptimeSeconds: os.uptime(),
    };

    // Points without a CPU reading yet would draw a false zero.
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
        app: { cpu: [...this.history.app.cpu], memory: [...this.history.app.memory] },
      },
      warnings,
    };
  }
}
