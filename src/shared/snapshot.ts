// The one answer the service gives: `GET /snapshot`. The panel and the Work
// Status section both read it, so the shape lives here and nowhere else.

/** Points of history the service keeps: three minutes at one sample every five seconds. */
export const HISTORY_POINTS = 36;

/**
 * CPU comes in two scales, and which one a field uses is part of its contract.
 *
 * Aggregates are a share of all logical cores, 0..100, with the same
 * denominator as the machine's own CPU (`SystemStats.cpu`): `app.cpu` and
 * `ProcessGroup.cpu`.
 *
 * Everything below that (`ProcessRow`, `Job`, `DevServer`) counts 100 per
 * core, as Activity Monitor and `top` do. The UI divides these raw readings
 * by `SystemStats.cores` to display percentages of total machine capacity,
 * leaving the already-normalized aggregates unchanged.
 */
export type Percent = number;

export type GroupId = 'app' | 'opencode' | 'terminals';

export interface ProcessRow {
  pid: number;
  ppid: number;
  name: string;
  /** What it is, for a row: `vite` for `node .../vite.js`, otherwise the name. */
  label: string;
  /** Trimmed command line; empty when the OS would not tell us. */
  command: string;
  /** `null` until two samples exist. */
  cpu: Percent | null;
  /** Resident memory in bytes. */
  memory: number;
  ports: number[];
}

/** One thing an agent or the terminal started, with everything it started in turn. */
export interface Job {
  /** The top process; Stop takes this pid and name. */
  pid: number;
  name: string;
  /** `bun run dev`, `claude`. */
  title: string;
  command: string;
  cpu: Percent;
  memory: number;
  /** Every port any process in the job listens on. */
  ports: number[];
  count: number;
  /** Only the processes worth a row (busy, big, or listening), heaviest first. */
  members: ProcessRow[];
}

export interface ProcessGroup {
  id: GroupId;
  cpu: Percent;
  memory: number;
  /** Every process in the group. */
  count: number;
  /** Processes outside any job: the app's own, the OpenCode server, idle shells. */
  processes: ProcessRow[];
  jobs: Job[];
}

export interface DevServer {
  pid: number;
  /** What the server is: `vite` for `node .../vite.js`. */
  name: string;
  /** The process name the OS reports: `node`. */
  executable: string;
  command: string;
  ports: number[];
  group: GroupId;
  /** CPU and memory of the listening process and everything under it. */
  cpu: Percent;
  memory: number;
  /** The job that started it, which Stop ends as a whole; `null` when it has none. */
  job: { pid: number; name: string; title: string } | null;
}

export interface Series {
  /** Oldest first, one point per sample. */
  cpu: Percent[];
  memory: number[];
}

export interface SystemStats {
  hostname: string;
  /** Node's `process.platform`: `darwin`, `linux`, `win32`, ... */
  platform: string;
  release: string;
  arch: string;
  cpuModel: string;
  cores: number;
  cpu: Percent | null;
  /** 1, 5 and 15 minute load; `null` on Windows, which has none. */
  load: [number, number, number] | null;
  memoryTotal: number;
  memoryUsed: number;
  uptimeSeconds: number;
}

export type Warning =
  /** The process list could not be read; only system numbers are shown. */
  | 'processes-unavailable'
  /** Listening ports could not be read; dev servers are not detected. */
  | 'ports-unavailable';

export interface Snapshot {
  at: number;
  intervalMs: number;
  system: SystemStats;
  app: {
    rootPid: number;
    rootName: string;
    cpu: Percent;
    memory: number;
    groups: ProcessGroup[];
  };
  /**
   * OpenCode running on this machine outside OpenChamber's tree, a TUI in
   * another terminal for example. CPU and memory include its children.
   */
  outside: ProcessRow[];
  servers: DevServer[];
  history: {
    system: Series;
    app: Series;
  };
  warnings: Warning[];
}
