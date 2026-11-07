// The Work Status section: what OpenChamber costs right now, the machine's
// load, and the ports dev servers listen on. The rail panel has the detail.
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { mountChart } from '../shared/chart.ts';
import { FAILURE_TEXT, POLL_MS, portButton, startPolling } from '../shared/client.ts';
import { el, reconcile, setText, type Keyed } from '../shared/dom.ts';
import { COLORS, formatBytes, formatPercent, setLocale } from '../shared/format.ts';
import { HISTORY_POINTS, type Snapshot } from '../shared/snapshot.ts';
import { BASE_STYLE, STATUS_STYLE } from '../shared/style.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');
const style = document.createElement('style');
style.textContent = BASE_STYLE + STATUS_STYLE;
document.head.append(style);

const meter = (color: string) => {
  const fill = el('span');
  fill.style.background = color;
  fill.style.width = '0%';
  return { element: el('div', 'meter', '', [fill]), set: (share: number) => { fill.style.width = `${Math.min(100, Math.max(0, share))}%`; } };
};

const appChart = mountChart({ color: COLORS.app, height: 18, capacity: HISTORY_POINTS, format: formatBytes, intervalSeconds: POLL_MS / 1000 });
const appValue = el('span', 'value num', '–');
appValue.title = 'Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU is a percentage of total machine capacity: all logical cores together are 100%, on the same scale as the CPU line.';
const cpuMeter = meter(COLORS.cpu);
const cpuValue = el('span', 'value num', '–');
const memoryMeter = meter(COLORS.memory);
const memoryValue = el('span', 'value num', '–');
const ports = el('div', 'ports');
const serversValue = el('span', 'value num');

const appLine = el('div', 'line', '', [el('span', 'what', 'OpenChamber'), appChart.element, appValue]);
const cpuLine = el('div', 'line', '', [el('span', 'what', 'CPU'), cpuMeter.element, cpuValue]);
const memoryLine = el('div', 'line', '', [el('span', 'what', 'Memory'), memoryMeter.element, memoryValue]);
const serversLine = el('div', 'line', '', [el('span', 'what', 'Dev servers'), ports, serversValue]);
serversLine.hidden = true;
const note = el('div', 'note', 'Reading…');
root.append(note, appLine, cpuLine, memoryLine, serversLine);
for (const line of [appLine, cpuLine, memoryLine]) line.hidden = true;

const portRows = new Map<string, Keyed<number>>();
const portRow = (port: number): Keyed<number> => ({ element: portButton(host, port), update: () => undefined });

const render = (snapshot: Snapshot): void => {
  const { system, app } = snapshot;
  // Without the process list the OpenChamber line would show a stale number as live.
  const processesMissing = snapshot.warnings.includes('processes-unavailable');
  note.hidden = !processesMissing;
  if (note.className !== 'note error') note.className = 'note error';
  setText(note, processesMissing ? 'Could not read the process list; showing system totals only.' : '');
  for (const line of [cpuLine, memoryLine]) line.hidden = false;
  appLine.hidden = processesMissing;
  setText(appValue, `${formatBytes(app.memory)} · ${formatPercent(app.cpu)}`);
  appChart.update(snapshot.history.app.memory, Math.max(app.memory, ...snapshot.history.app.memory) * 1.15);
  cpuMeter.set(system.cpu ?? 0);
  setText(cpuValue, formatPercent(system.cpu));
  memoryMeter.set((system.memoryUsed / Math.max(1, system.memoryTotal)) * 100);
  setText(memoryValue, `${formatBytes(system.memoryUsed)} / ${formatBytes(system.memoryTotal)}`);
  const listening = [...new Set(snapshot.servers.flatMap((server) => server.ports))].sort((a, b) => a - b);
  serversLine.hidden = listening.length === 0 || processesMissing;
  // A port button kept between samples keeps its hover and focus.
  reconcile(ports, listening.slice(0, 6), String, portRow, portRows);
  setText(serversValue, listening.length > 6 ? `+${listening.length - 6}` : '');
};

// The host sizes the frame to this, up to its limit.
let reportedHeight = -1;
new ResizeObserver(() => {
  const height = Math.ceil(root.getBoundingClientRect().height);
  if (height === reportedHeight) return;
  reportedHeight = height;
  void host.setHeight(height).catch(() => undefined);
}).observe(root);

let started = false;
host.onReady((context) => {
  applyHostReady(context, document.documentElement);
  setLocale(context.locale);
  if (started) return;
  started = true;
  startPolling(host, root, render, (failure) => {
    note.hidden = false;
    note.className = 'note error';
    note.textContent = FAILURE_TEXT[failure];
    for (const line of [appLine, cpuLine, memoryLine, serversLine]) line.hidden = true;
  });
});
