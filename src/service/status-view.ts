// The Work Status section OpenChamber draws itself from `GET /status`, with
// no frame (`contributes.statusSection.source`). Hosts that predate it load
// status/index.html instead. The types mirror `GuestStatusView` in
// @openchamber/sdk; the SDK version this package builds against predates it.
import { formatBytes, formatPercent, setLocale } from '../shared/format.ts';
import type { Snapshot } from '../shared/snapshot.ts';

type Tone = 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'error' | 'info';

type Content =
  | { kind: 'bar'; value: number; tone?: Tone }
  | { kind: 'chart'; values: number[]; max?: number; tone?: Tone; unit?: 'bytes' | 'percent' | 'count'; step?: number }
  | { kind: 'chips'; chips: { id: string; label: string; tone?: Tone; url?: string }[] };

type Row =
  | { kind: 'line'; id: string; label: string; content?: Content; value?: string; tooltip?: string }
  | { kind: 'note'; id: string; text: string; tone?: 'muted' | 'info' | 'warning' | 'error' };

export type StatusView = { rows: Row[] };

/** Ports shown as chips; the rest are counted. */
const PORTS_SHOWN = 6;

const clampShare = (value: number): number => Math.min(100, Math.max(0, value));

/** The same four lines the section's frame shows, in the host's look. */
export const statusView = (snapshot: Snapshot, locale: string): StatusView => {
  setLocale(locale);
  const { system, app } = snapshot;
  const rows: Row[] = [];
  // Without the process list the OpenChamber line would show a stale number as live.
  const processesMissing = snapshot.warnings.includes('processes-unavailable');
  if (processesMissing) {
    rows.push({ kind: 'note', id: 'processes', text: 'Could not read the process list; showing system totals only.', tone: 'warning' });
  } else {
    const history = snapshot.history.app.memory;
    rows.push({
      kind: 'line',
      id: 'app',
      label: 'OpenChamber',
      content: {
        kind: 'chart',
        values: history,
        max: Math.max(1, app.memory, ...history) * 1.15,
        tone: 'accent',
        unit: 'bytes',
        step: snapshot.intervalMs / 1000,
      },
      value: `${formatBytes(app.memory)} · ${formatPercent(app.cpu)}`,
      tooltip: 'Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU is a percentage of total machine capacity: all logical cores together are 100%, on the same scale as the CPU line.',
    });
  }
  rows.push({
    kind: 'line',
    id: 'cpu',
    label: 'CPU',
    content: { kind: 'bar', value: clampShare(system.cpu ?? 0), tone: 'info' },
    value: formatPercent(system.cpu),
  });
  rows.push({
    kind: 'line',
    id: 'memory',
    label: 'Memory',
    content: { kind: 'bar', value: clampShare((system.memoryUsed / Math.max(1, system.memoryTotal)) * 100), tone: 'success' },
    value: `${formatBytes(system.memoryUsed)} / ${formatBytes(system.memoryTotal)}`,
  });
  const listening = [...new Set(snapshot.servers.flatMap((server) => server.ports))].sort((a, b) => a - b);
  if (listening.length > 0 && !processesMissing) {
    rows.push({
      kind: 'line',
      id: 'servers',
      label: 'Dev servers',
      content: {
        kind: 'chips',
        chips: listening.slice(0, PORTS_SHOWN).map((port) => ({ id: `port-${port}`, label: `:${port}`, url: `http://localhost:${port}` })),
      },
      ...(listening.length > PORTS_SHOWN ? { value: `+${listening.length - PORTS_SHOWN}` } : {}),
    });
  }
  return { rows };
};
