// Number formatting shared by the panel and the Work Status section.
import type { GroupId, ProcessRow } from './snapshot.ts';

let locale = 'en';
/** A tag Intl does not know (`en_US`) falls back to English instead of throwing on every number. */
export const setLocale = (next: string): void => {
  try {
    locale = Intl.NumberFormat.supportedLocalesOf(next)[0] ?? 'en';
  } catch {
    locale = 'en';
  }
};

const number = (value: number, digits: number): string => new Intl.NumberFormat(locale, {
  minimumFractionDigits: digits,
  maximumFractionDigits: digits,
}).format(value);

/** 1024-based, the way Activity Monitor and Task Manager count. */
export const formatBytes = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = Math.max(0, bytes);
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const digits = unit >= 3 && value < 100 ? 1 : 0;
  return `${number(value, digits)} ${units[unit]}`;
};

export const formatPercent = (value: number | null): string => {
  if (value === null) return '–';
  if (value > 0 && value < 0.01) return '<0.01%';
  return `${number(value, value > 0 && value < 1 ? 2 : value < 10 ? 1 : 0)}%`;
};

/** Convert a raw 100-per-core reading to the machine-wide percentage used in the UI. */
export const processCpuPercent = (value: number | null, cores: number): number | null =>
  value === null ? null : value / Math.max(1, cores);

export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86_400);
  const hours = Math.floor((seconds % 86_400) / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  if (days > 0) return `${days} d ${hours} h`;
  if (hours > 0) return `${hours} h ${minutes} min`;
  return `${minutes} min`;
};

/**
 * The arguments of a command line, without the executable's path: the row
 * already names the process. `/usr/local/bin/node server.js --port 3000`
 * reads `server.js --port 3000`. A command that doesn't start with the
 * process's own path is returned whole.
 */
export const commandArguments = (name: string, command: string): string => {
  const unquoted = command.replace(/^"([^"]+)"/, '$1');
  if (!name || !/^([A-Za-z]:)?[\\/]/.test(unquoted)) return command;
  let index = -1;
  // `.../OpenChamber Helper.app/Contents/MacOS/OpenChamber Helper --type=gpu`: the
  // executable is the occurrence followed by its arguments, not the bundle folder.
  while ((index = unquoted.indexOf(name, index + 1)) >= 0) {
    if (!/[\\/]/.test(unquoted[index - 1] ?? '')) continue;
    const after = unquoted.slice(index + name.length).replace(/^\.exe/i, '');
    if (after === '' || after.startsWith(' ')) return after.trim();
  }
  return command;
};

const HELPER_TYPES: Record<string, string> = {
  renderer: 'Renderer',
  'gpu-process': 'GPU',
  utility: 'Utility',
  zygote: 'Zygote',
};

const UTILITY_SERVICES: [RegExp, string][] = [
  [/network/i, 'Network service'],
  [/storage/i, 'Storage service'],
  [/audio/i, 'Audio service'],
  [/video_?capture/i, 'Video capture'],
];

const join = (...parts: string[]): string => parts.filter(Boolean).join(' · ');

/**
 * What a process row says: a title people recognise and one muted detail line.
 * Electron helpers are named by their role (`Renderer`, `GPU`) instead of
 * `OpenChamber Helper (Renderer)` with a screen of flags.
 */
export const processLabel = (row: ProcessRow, role: 'root' | 'self' | 'other'): { title: string; detail: string } => {
  const ports = row.ports.map((port) => `:${port}`).join(' ');
  if (role === 'root') return { title: 'Main process', detail: join(ports, commandArguments(row.name, row.command)) };
  if (role === 'self') return { title: 'Resource Monitor', detail: 'this extension' };
  const type = /--type=([\w-]+)/.exec(row.command)?.[1];
  if (type && /\bHelper\b/.test(row.name)) {
    const subType = type === 'utility' ? /--utility-sub-type=([\w.]+)/.exec(row.command)?.[1] ?? '' : '';
    const service = UTILITY_SERVICES.find(([pattern]) => pattern.test(subType))?.[1];
    return { title: service ?? HELPER_TYPES[type] ?? type, detail: join(ports, commandArguments(row.name, row.command)) };
  }
  const title = row.label || row.name;
  // npm and friends rename their process to the command line; repeating it underneath says nothing.
  const args = commandArguments(row.name, row.command);
  return { title, detail: join(ports, args === title || args === row.name ? '' : args) };
};

/** A job's detail line: ports, size, and the exact arguments unless the title already is the command. */
export const jobDetail = (job: { name: string; title: string; command: string; ports: readonly number[]; count: number }): string => {
  const args = commandArguments(job.name, job.command);
  const repeatsTitle = args === job.title || args === job.name || job.command === job.title;
  return join(job.ports.map((port) => `:${port}`).join(' '), job.count > 1 ? `${job.count} processes` : '', repeatsTitle ? '' : args);
};

export const platformName = (platform: string): string => {
  if (platform === 'darwin') return 'macOS';
  if (platform === 'win32') return 'Windows';
  if (platform === 'linux') return 'Linux';
  return platform;
};

export const GROUP_LABELS: Record<GroupId, string> = {
  app: 'OpenChamber',
  opencode: 'OpenCode',
  terminals: 'Terminal',
};

/** Who started a dev server, in the words the user knows. */
export const SERVER_ORIGIN: Record<GroupId, string> = {
  app: 'OpenChamber',
  opencode: 'Agent',
  terminals: 'Terminal',
};

// The machine's series use status colours, which differ in every theme.
// OpenChamber's parts are shades of the theme's primary colour, so the
// footprint reads as one thing split in three.
export const COLORS = {
  cpu: 'var(--oc-info)',
  memory: 'var(--oc-success)',
  app: 'var(--oc-primary)',
  opencode: 'color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))',
  terminals: 'var(--oc-muted)',
} as const;
