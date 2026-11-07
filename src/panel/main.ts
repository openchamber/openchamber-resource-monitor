import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { mountChart } from '../shared/chart.ts';
import { FAILURE_TEXT, POLL_MS, portButton, requestStop, startPolling, type PollFailure, type StopRequest } from '../shared/client.ts';
import {
  COLORS,
  GROUP_LABELS,
  SERVER_ORIGIN,
  formatBytes,
  formatPercent,
  formatUptime,
  jobDetail,
  platformName,
  processLabel,
  processCpuPercent,
  setLocale,
} from '../shared/format.ts';
import { el, reconcile, setText, type Keyed } from '../shared/dom.ts';
import { BASE_STYLE, PANEL_STYLE } from '../shared/style.ts';
import { HISTORY_POINTS, type DevServer, type GroupId, type Job, type ProcessGroup, type ProcessRow, type Snapshot } from '../shared/snapshot.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');
const style = document.createElement('style');
style.textContent = BASE_STYLE + PANEL_STYLE;
document.head.append(style);

const INTERVAL_SECONDS = POLL_MS / 1000;

// ----- Skeleton, built once -----

const banner = el('div', 'banner');
banner.hidden = true;

const hostName = el('div', 'host-name', 'This machine');
const hostMeta = el('div', 'host-meta', 'Reading…');
const live = el('div', 'live stale', 'Starting');
const head = el('div', 'head');
head.append(el('div', 'titles', '', [hostName, hostMeta]), live);

const statCard = (label: string, color: string, format: (value: number) => string) => {
  const value = el('span', 'big num', '–');
  const side = el('span', 'sub num');
  const top = el('div', 'card-top', '', [el('span', 'label', label), el('span', 'grow'), side]);
  const chart = mountChart({ color, height: 56, capacity: HISTORY_POINTS, format, intervalSeconds: INTERVAL_SECONDS });
  const sub = el('div', 'sub num');
  const card = el('div', 'card', '', [top, value, chart.element, sub]);
  return { card, value, side, sub, chart };
};

const cpu = statCard('CPU', COLORS.cpu, formatPercent);
const memory = statCard('Memory', COLORS.memory, formatBytes);
const grid = el('div', 'grid', '', [cpu.card, memory.card]);

const appValue = el('span', 'big num', '–');
const appCpuValue = el('span', 'sub num');
const appChart = mountChart({ color: COLORS.app, height: 44, capacity: HISTORY_POINTS, format: formatBytes, intervalSeconds: INTERVAL_SECONDS });
const appStack = el('div', 'stack');
const appLegend = el('div', 'legend');
const appCard = el('div', 'card', '', [
  el('div', 'card-top', '', [el('span', 'label', 'OpenChamber'), el('span', 'grow'), appCpuValue]),
  appValue,
  el('div', 'sub', 'The app, OpenCode, and everything they started'),
  appChart.element,
  appStack,
  appLegend,
]);

// Every row is name · action · CPU · memory, so Stop sits centred beside the numbers.
const columns = (): HTMLElement => {
  const cpuHead = el('span', 'cell', 'CPU');
  cpuHead.title = 'CPU as a percentage of total machine capacity, on the same scale as the CPU card.';
  return el('div', 'cols', '', [el('span'), el('span'), cpuHead, el('span', 'cell', 'Memory')]);
};
const actionCell = (button?: HTMLElement): HTMLElement => el('span', 'action', '', button ? [button] : []);

const serversCount = el('span', 'count');
const serversList = el('div', 'list');
const serversEmpty = el('div', 'empty', 'No dev servers right now. Servers started by an agent, a project action, or the terminal show up here with their ports.');
const serversSection = el('section', 'section', '', [
  el('div', 'section-head', '', [el('span', 'label', 'Dev servers'), serversCount]),
  serversList,
  serversEmpty,
]);

const groupsBox = el('div', 'list');
const processesSection = el('section', 'section', '', [
  el('div', 'section-head', '', [el('span', 'label', 'Processes')]),
  columns(),
  groupsBox,
]);

const outsideBox = el('div', 'list');
const outsideSection = el('section', 'section', '', [
  el('div', 'section-head', '', [el('span', 'label', 'OpenCode outside OpenChamber')]),
  outsideBox,
]);
outsideSection.hidden = true;

const footnote = el('div', 'footnote', 'CPU everywhere is a percentage of total machine capacity: all logical cores together are 100%. Memory is resident memory: pages a process shares with others count in each of them.');

root.append(banner, head, grid, appCard, serversSection, processesSection, outsideSection, footnote);

// ----- Stop -----

let refresh: () => void = () => undefined;

/**
 * A text button that asks once before it acts: the first click turns it
 * into "Stop …?", the second stops. It settles back after a few seconds.
 */
const stopButton = (label: string, question: string, target: StopRequest): HTMLButtonElement => {
  const button = el('button', 'stop', label);
  button.type = 'button';
  let armed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const disarm = (): void => {
    armed = false;
    button.classList.remove('armed');
    button.textContent = label;
  };
  button.addEventListener('click', (event) => {
    // Inside a summary or a clickable row, the click is the button's alone.
    event.preventDefault();
    event.stopPropagation();
    if (button.disabled) return;
    if (!armed) {
      armed = true;
      button.classList.add('armed');
      button.textContent = question;
      clearTimeout(timer);
      timer = setTimeout(disarm, 4_000);
      return;
    }
    clearTimeout(timer);
    button.disabled = true;
    button.textContent = 'Stopping…';
    void requestStop(host, target).then((ok) => {
      if (!ok) showStopError();
      // The row outlives the answer when its process is still there.
      button.disabled = false;
      disarm();
      refresh();
    });
  });
  return button;
};

// ----- Rows -----
// Every list is reconciled by key: a sample updates the numbers of the rows
// it already has, so a row under the pointer, a focused row and a Stop
// waiting for its second click stay as they are between samples.

type Role = 'root' | 'self' | 'other';

let rootPid = 0;
let logicalCores = 1;
const roleOf = (row: ProcessRow): Role => (row.pid === rootPid ? 'root' : row.label === 'Resource Monitor' && row.ppid === rootPid ? 'self' : 'other');

/** A row's CPU and memory, updated in place; only raw per-core inputs need conversion. */
const numberCells = (cpuScale: 'share' | 'per-core') => {
  const cpu = el('span');
  const memory = el('span', 'cell num');
  const set = (cpuValue: number | null, memoryValue: number): void => {
    const share = cpuScale === 'per-core' ? processCpuPercent(cpuValue, logicalCores) : cpuValue;
    // Below one percent of a core a number is noise; it stays readable but recedes.
    const className = share !== null && share * logicalCores >= 1 ? 'cell num' : 'cell num quiet';
    if (cpu.className !== className) cpu.className = className;
    setText(cpu, formatPercent(share));
    setText(memory, formatBytes(memoryValue));
  };
  return { cpu, memory, set };
};

const textBlock = (title: string, detail: string) => {
  const titleLine = el('span', 'title-line', '', [el('span', 'pname', title)]);
  const detailLine = el('span', 'pdetail');
  const setDetail = (text: string): void => {
    setText(detailLine, text);
    detailLine.hidden = text === '';
  };
  setDetail(detail);
  return { element: el('div', 'who', '', [titleLine, detailLine]), setDetail };
};

const processKey = (process: ProcessRow, role: Role): string => {
  const { title, detail } = processLabel(process, role);
  return [process.pid, role, title, detail, process.name, process.command].join('\u0000');
};

const processRow = (process: ProcessRow, role: Role, className = 'row'): Keyed<ProcessRow> => {
  const { title, detail } = processLabel(process, role);
  const cells = numberCells('per-core');
  cells.set(process.cpu, process.memory);
  const element = el('div', className, '', [textBlock(title, detail).element, actionCell(), cells.cpu, cells.memory]);
  element.title = `${process.name} · pid ${process.pid}${process.command ? `\n${process.command}` : ''}`;
  return { element, update: (next) => cells.set(next.cpu, next.memory) };
};

const openJobs = new Set<number>();

// A job with nothing worth unfolding is one plain row.
const isFoldable = (job: Job): boolean => job.members.length > 0 && job.count > 1;

const jobKey = (job: Job, stoppable: boolean): string => [job.pid, job.name, job.title, job.command, stoppable, isFoldable(job)].join('\u0000');

const memberKey = (member: ProcessRow): string => processKey(member, 'other');
const memberRow = (member: ProcessRow): Keyed<ProcessRow> => processRow(member, 'other', 'row member');

const jobRow = (job: Job, stoppable: boolean): Keyed<Job> => {
  const foldable = isFoldable(job);
  const stop = stoppable ? stopButton('Stop', `Stop ${job.title}?`, { kind: 'job', pid: job.pid, name: job.name }) : undefined;
  const cells = numberCells('per-core');
  const text = textBlock(job.title, jobDetail(job));
  const line = el('div', foldable ? 'row job foldable' : 'row job', '', [text.element, actionCell(stop), cells.cpu, cells.memory]);
  line.title = job.command || job.title;
  // Unfolded, commands wrap in full instead of ending in an ellipsis.
  const wrapper = el('div', 'job-wrap', '', [line]);
  const more = el('div', 'more');
  const members = el('div', 'members', '', [more]);
  const memberRows = new Map<string, Keyed<ProcessRow>>();
  let current = job;

  const draw = (next: Job): void => {
    current = next;
    cells.set(next.cpu, next.memory);
    text.setDetail(jobDetail(next));
    const open = foldable && openJobs.has(next.pid);
    line.classList.toggle('open', open);
    wrapper.classList.toggle('open', open);
    if (foldable) line.setAttribute('aria-expanded', String(open));
    if (!open) {
      members.remove();
      return;
    }
    reconcile(members, next.members, memberKey, memberRow, memberRows);
    const quiet = next.count - next.members.length;
    more.hidden = quiet <= 0;
    setText(more, quiet === 1 ? '1 more process, idle' : `${quiet} more processes, idle`);
    if (members.parentElement !== wrapper) wrapper.append(members);
  };

  if (foldable) {
    line.tabIndex = 0;
    line.setAttribute('role', 'button');
    const toggle = (): void => {
      if (openJobs.has(current.pid)) openJobs.delete(current.pid);
      else openJobs.add(current.pid);
      draw(current);
    };
    line.addEventListener('click', toggle);
    line.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  }
  draw(job);
  return { element: wrapper, update: draw };
};

// Groups start unfolded; the ones the user folds are remembered on this device.
const COLLAPSED_KEY = 'collapsed-groups';
const collapsedGroups = new Set<GroupId>();
let deviceStorage = false;

const saveCollapsed = (): void => {
  if (!deviceStorage) return;
  void host.storage.set(COLLAPSED_KEY, [...collapsedGroups], { scope: 'device' }).catch(() => undefined);
};

const loadCollapsed = async (): Promise<void> => {
  if (!deviceStorage) return;
  try {
    const stored = await host.storage.get(COLLAPSED_KEY, { scope: 'device' });
    if (!Array.isArray(stored)) return;
    for (const id of stored) if (id === 'app' || id === 'opencode' || id === 'terminals') collapsedGroups.add(id);
    if (lastSnapshot) render(lastSnapshot);
  } catch {
    // Unreadable preference: groups stay unfolded.
  }
};

type GroupItem = { kind: 'process'; row: ProcessRow; role: Role } | { kind: 'job'; job: Job; stoppable: boolean };

const groupItems = (group: ProcessGroup): GroupItem[] => {
  // Terminal jobs can be stopped; an agent's job only while it serves a port,
  // since OpenCode's provider CLIs and MCP servers are jobs too.
  const stoppable = (job: Job): boolean => group.id === 'terminals' || (group.id === 'opencode' && job.ports.length > 0);
  return [
    ...group.processes.map((row): GroupItem => ({ kind: 'process', row, role: roleOf(row) })),
    ...group.jobs.map((job): GroupItem => ({ kind: 'job', job, stoppable: stoppable(job) })),
  ];
};

const itemKey = (item: GroupItem): string => (item.kind === 'process' ? `process\u0000${processKey(item.row, item.role)}` : `job\u0000${jobKey(item.job, item.stoppable)}`);

const itemRow = (item: GroupItem): Keyed<GroupItem> => {
  if (item.kind === 'process') {
    const row = processRow(item.row, item.role);
    return { element: row.element, update: (next) => { if (next.kind === 'process') row.update(next.row); } };
  }
  const row = jobRow(item.job, item.stoppable);
  return { element: row.element, update: (next) => { if (next.kind === 'job') row.update(next.job); } };
};

const hasStopAll = (group: ProcessGroup): boolean => group.id === 'terminals' && group.jobs.length > 0;
const groupKey = (group: ProcessGroup): string => `${group.id}\u0000${hasStopAll(group)}`;

const groupBlock = (group: ProcessGroup): Keyed<ProcessGroup> => {
  const dot = el('span', 'dot');
  dot.style.background = COLORS[group.id];
  const stopAll = hasStopAll(group) ? stopButton('Stop all', 'Stop everything running in the terminal?', { kind: 'terminals' }) : undefined;
  const count = el('span', 'count');
  const name = el('span', 'gname', '', [dot, el('b', '', GROUP_LABELS[group.id]), count]);
  const cells = numberCells('share');
  const header = el('div', 'group-head foldable', '', [name, actionCell(stopAll), cells.cpu, cells.memory]);
  header.tabIndex = 0;
  header.setAttribute('role', 'button');
  const block = el('div', 'group', '', [header]);
  block.style.setProperty('--group-color', COLORS[group.id]);
  const rows = new Map<string, Keyed<GroupItem>>();
  let current = group;

  const draw = (next: ProcessGroup): void => {
    current = next;
    setText(count, String(next.count));
    cells.set(next.cpu, next.memory);
    const collapsed = collapsedGroups.has(next.id);
    header.classList.toggle('open', !collapsed);
    header.setAttribute('aria-expanded', String(!collapsed));
    // The rows follow the header in the block.
    reconcile(block, collapsed ? [] : groupItems(next), itemKey, itemRow, rows, 1);
  };

  const toggle = (): void => {
    if (collapsedGroups.has(current.id)) collapsedGroups.delete(current.id);
    else collapsedGroups.add(current.id);
    saveCollapsed();
    draw(current);
  };
  header.addEventListener('click', toggle);
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  });
  draw(group);
  return { element: block, update: draw };
};

const serverKey = (server: DevServer): string => [
  server.pid, server.name, server.group, server.ports.join(','), server.command,
  server.job?.pid ?? '', server.job?.name ?? '', server.job?.title ?? '',
].join('\u0000');

const serverRow = (server: DevServer): Keyed<DevServer> => {
  const ports = server.ports.map((port) => portButton(host, port));
  const title = el('div', 'title-line', '', [...ports, el('span', 'pname strong', server.name), el('span', 'origin', SERVER_ORIGIN[server.group])]);
  const stop = server.job ? stopButton('Stop', `Stop ${server.job.title}?`, { kind: 'job', pid: server.job.pid, name: server.job.name }) : undefined;
  const who = el('div', 'who', '', [title]);
  const detail = server.job?.title ?? '';
  if (detail) who.append(el('span', 'pdetail', detail));
  const cells = numberCells('per-core');
  cells.set(server.cpu, server.memory);
  const row = el('div', 'row server', '', [who, actionCell(stop), cells.cpu, cells.memory]);
  row.title = `pid ${server.pid}${server.command ? `\n${server.command}` : ''}`;
  return { element: row, update: (next) => cells.set(next.cpu, next.memory) };
};

interface StackPart { id: GroupId; value: number; total: number }

const stackPart = (part: StackPart): Keyed<StackPart> => {
  const span = el('span');
  span.style.background = COLORS[part.id];
  span.title = GROUP_LABELS[part.id];
  const update = (next: StackPart): void => {
    span.style.width = `${Math.min(100, (next.value / Math.max(1, next.total)) * 100)}%`;
  };
  update(part);
  return { element: span, update };
};

const legendRow = (group: ProcessGroup): Keyed<ProcessGroup> => {
  const swatch = el('span', 'swatch');
  swatch.style.background = COLORS[group.id];
  const count = el('span', 'muted');
  const cpuValue = el('span', 'value num muted');
  const memoryValue = el('span', 'value num');
  const update = (next: ProcessGroup): void => {
    setText(count, ` · ${next.count} ${next.count === 1 ? 'process' : 'processes'}`);
    setText(cpuValue, formatPercent(next.cpu));
    setText(memoryValue, formatBytes(next.memory));
  };
  update(group);
  return { element: el('div', 'legend-row', '', [swatch, el('span', 'name', GROUP_LABELS[group.id], [count]), cpuValue, memoryValue]), update };
};

const WARNING_TEXT = {
  'processes-unavailable': 'The process list could not be read just now. OpenChamber\'s numbers are from the last reading that worked.',
  'ports-unavailable': 'Listening ports could not be read, so dev servers are not detected.',
} as const;

let failure: PollFailure | null = null;
let stopError = false;
let stopErrorTimer: ReturnType<typeof setTimeout> | undefined;
let problems: string[] = [];
let lastSnapshot: Snapshot | null = null;

/** One banner, most urgent first: the service is unreachable, a Stop failed, a reading is partial. */
const updateBanner = (): void => {
  const text = failure !== null
    ? FAILURE_TEXT[failure]
    : stopError
      ? 'Could not stop it. It may have ended already, or it is not something this panel stops.'
      : problems.join(' ');
  banner.hidden = text === '';
  banner.classList.toggle('error', failure !== null || stopError);
  setText(banner, text);
};

function showStopError(): void {
  stopError = true;
  clearTimeout(stopErrorTimer);
  stopErrorTimer = setTimeout(() => {
    stopError = false;
    updateBanner();
  }, 6_000);
  updateBanner();
}

const stackParts = new Map<string, Keyed<StackPart>>();
const legendRows = new Map<string, Keyed<ProcessGroup>>();
const serverRows = new Map<string, Keyed<DevServer>>();
const groupBlocks = new Map<string, Keyed<ProcessGroup>>();
const outsideRows = new Map<string, Keyed<ProcessRow>>();

function render(snapshot: Snapshot): void {
  lastSnapshot = snapshot;
  const { system, app } = snapshot;
  rootPid = app.rootPid;
  logicalCores = system.cores;

  setText(hostName, system.hostname);
  setText(hostMeta, [platformName(system.platform), system.arch, system.cpuModel, `up ${formatUptime(system.uptimeSeconds)}`].filter(Boolean).join(' · '));
  setText(live, `Live · every ${INTERVAL_SECONDS} s`);
  live.classList.remove('stale');

  setText(cpu.value, formatPercent(system.cpu));
  setText(cpu.side, `${system.cores} cores`);
  setText(cpu.sub, system.load ? `Load ${system.load.map((value) => value.toFixed(2)).join(' · ')}` : 'All cores together');
  cpu.chart.update(snapshot.history.system.cpu, 100);

  setText(memory.value, formatBytes(system.memoryUsed));
  setText(memory.side, formatPercent((system.memoryUsed / Math.max(1, system.memoryTotal)) * 100));
  setText(memory.sub, `of ${formatBytes(system.memoryTotal)} · ${formatBytes(Math.max(0, system.memoryTotal - system.memoryUsed))} free`);
  memory.chart.update(snapshot.history.system.memory, system.memoryTotal);

  setText(appValue, formatBytes(app.memory));
  setText(appCpuValue, `${formatPercent(app.cpu)} CPU`);
  appCpuValue.title = `Share of all ${system.cores} cores, the same scale as the CPU card`;
  appChart.update(snapshot.history.app.memory, Math.max(app.memory, ...snapshot.history.app.memory) * 1.15);
  const parts = app.groups.filter((group) => group.memory > 0).map((group): StackPart => ({ id: group.id, value: group.memory, total: app.memory }));
  reconcile(appStack, parts, (part) => part.id, stackPart, stackParts);
  reconcile(appLegend, app.groups, (group) => group.id, legendRow, legendRows);

  setText(serversCount, snapshot.servers.length > 0 ? String(snapshot.servers.length) : '');
  reconcile(serversList, snapshot.servers, serverKey, serverRow, serverRows);
  serversList.hidden = snapshot.servers.length === 0;
  serversEmpty.hidden = snapshot.servers.length > 0;

  reconcile(groupsBox, app.groups, groupKey, groupBlock, groupBlocks);
  // Folded state for jobs that ended would only grow.
  const livePids = new Set(app.groups.flatMap((group) => group.jobs.map((job) => job.pid)));
  for (const pid of openJobs) if (!livePids.has(pid)) openJobs.delete(pid);

  outsideSection.hidden = snapshot.outside.length === 0;
  reconcile(outsideBox, snapshot.outside, (row) => processKey(row, 'other'), (row) => processRow(row, 'other'), outsideRows);

  problems = snapshot.warnings.map((warning) => WARNING_TEXT[warning]);
  updateBanner();
}

const showFailure = (next: PollFailure): void => {
  failure = next;
  updateBanner();
  live.textContent = 'Paused';
  live.classList.add('stale');
};

let started = false;
host.onReady((context) => {
  applyHostReady(context, document.documentElement);
  setLocale(context.locale);
  if (context.features?.deviceStorage === true && !deviceStorage) {
    deviceStorage = true;
    void loadCollapsed();
  }
  if (started) return;
  started = true;
  ({ refresh } = startPolling(host, root, (snapshot) => {
    failure = null;
    render(snapshot);
  }, showFailure));
});
