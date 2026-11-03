// Polls the service while the frame is on screen. A hidden frame (another
// rail tab, a folded section) asks nothing, so the service idles and stops.
import { HostRequestError, type HostClient } from '@openchamber/sdk';

import { el } from './dom.ts';
import type { Snapshot } from './snapshot.ts';

export const POLL_MS = 5_000;

export type PollFailure = 'needs-approval' | 'paused' | 'service-failed' | 'unreachable' | 'bad-answer';

export const FAILURE_TEXT: Record<PollFailure, string> = {
  'needs-approval': 'Allow the local service for Resource Monitor in Settings → Extensions.',
  paused: 'Resource Monitor is paused in Settings → Extensions.',
  'service-failed': 'The monitoring service stopped. It restarts on the next refresh.',
  unreachable: 'Could not reach the monitoring service.',
  'bad-answer': 'The monitoring service answered with something unexpected.',
};

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

// The panel and the service ship in one package, so a light shape check is
// enough to catch a half-written answer.
const isSnapshot = (value: unknown): value is Snapshot => isRecord(value)
  && typeof value.at === 'number'
  && isRecord(value.system)
  && isRecord(value.app)
  && Array.isArray(value.app.groups)
  && Array.isArray(value.servers)
  && Array.isArray(value.outside)
  && isRecord(value.history);

const failureOf = (error: unknown): PollFailure => {
  if (!(error instanceof HostRequestError)) return 'unreachable';
  if (error.code === 'NO_SERVICE' || error.code === 'NOT_GRANTED') return 'needs-approval';
  if (error.code === 'DISABLED') return 'paused';
  if (error.code === 'SERVICE_FAILED') return 'service-failed';
  return 'unreachable';
};

export type StopRequest = { kind: 'job'; pid: number; name: string } | { kind: 'terminals' };

/** Asks the service to stop a job or everything in the terminal; true when it did. */
export const requestStop = async (host: HostClient, target: StopRequest): Promise<boolean> => {
  try {
    const result = await host.serviceRequest({ method: 'POST', path: '/stop', body: JSON.stringify(target) });
    return result.status === 200;
  } catch {
    return false;
  }
};

/** A dev server's port: a click opens it, in the desktop app beside the chat. */
export const portButton = (host: HostClient, port: number): HTMLButtonElement => {
  const button = el('button', 'port', `:${port}`);
  button.type = 'button';
  button.title = `Open http://localhost:${port}`;
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    void host.openUrl(`http://localhost:${port}`).catch(() => undefined);
  });
  return button;
};

export const isOnScreen = (root: HTMLElement): boolean => !document.hidden && root.getBoundingClientRect().width > 0;

export const startPolling = (
  host: HostClient,
  root: HTMLElement,
  onSnapshot: (snapshot: Snapshot) => void,
  onFailure: (failure: PollFailure) => void,
): { refresh: () => void } => {
  let inflight = false;
  const poll = async (): Promise<void> => {
    if (inflight || !isOnScreen(root)) return;
    inflight = true;
    try {
      const result = await host.serviceRequest({ method: 'GET', path: '/snapshot' });
      let body: unknown;
      try {
        body = JSON.parse(result.body);
      } catch {
        body = null;
      }
      if (result.status === 200 && isSnapshot(body)) onSnapshot(body);
      else onFailure(result.status === 200 ? 'bad-answer' : 'service-failed');
    } catch (error) {
      onFailure(failureOf(error));
    } finally {
      inflight = false;
    }
  };
  void poll();
  setInterval(() => { void poll(); }, POLL_MS);
  // Coming back on screen refreshes at once instead of after the next tick.
  // Only the hidden-to-shown change counts: every render resizes the root.
  let shown = isOnScreen(root);
  const onVisibility = (): void => {
    const next = isOnScreen(root);
    if (next && !shown) void poll();
    shown = next;
  };
  document.addEventListener('visibilitychange', onVisibility);
  new ResizeObserver(onVisibility).observe(document.documentElement);
  return { refresh: () => { void poll(); } };
};
