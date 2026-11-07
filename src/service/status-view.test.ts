import { describe, expect, test } from 'bun:test';

import type { Snapshot } from '../shared/snapshot.ts';
import { statusView } from './status-view.ts';

const snapshot = (overrides: Partial<Snapshot> = {}): Snapshot => ({
  at: 0,
  intervalMs: 2000,
  system: {
    hostname: 'mac', platform: 'darwin', release: '25', arch: 'arm64', cpuModel: 'M4', cores: 10,
    cpu: 25, load: [1, 1, 1], memoryTotal: 16 * 1024 ** 3, memoryUsed: 13.3 * 1024 ** 3, uptimeSeconds: 100,
  },
  app: { rootPid: 1, rootName: 'OpenChamber', cpu: 12, memory: 1.6 * 1024 ** 3, groups: [] },
  outside: [],
  servers: [],
  history: { system: { cpu: [], memory: [] }, app: { cpu: [10], memory: [1.5 * 1024 ** 3, 1.6 * 1024 ** 3] } },
  warnings: [],
  ...overrides,
});

const server = (ports: number[]) => ({
  pid: 9, name: 'vite', executable: 'node', command: 'node vite', ports, group: 'opencode' as const, cpu: 0, memory: 0, job: null,
});

describe('statusView', () => {
  test('the same four lines the frame shows', () => {
    const view = statusView(snapshot({ servers: [server([5197, 3917])] }), 'en');
    expect(view.rows.map((row) => row.id)).toEqual(['app', 'cpu', 'memory', 'servers']);
    expect(view.rows[0]).toMatchObject({ value: '1.6 GB · 12%', content: { kind: 'chart', unit: 'bytes', step: 2, tone: 'accent' } });
    expect(view.rows[1]).toMatchObject({ value: '25%', content: { kind: 'bar', value: 25, tone: 'info' } });
    expect(view.rows[2]).toMatchObject({ value: '13.3 GB / 16.0 GB' });
    expect(view.rows[3]).toMatchObject({ content: { kind: 'chips', chips: [
      { id: 'port-3917', label: ':3917', url: 'http://localhost:3917' },
      { id: 'port-5197', label: ':5197', url: 'http://localhost:5197' },
    ] } });
  });

  test('OpenChamber CPU is shown as the share the snapshot carries, never above 100%', () => {
    const full = statusView(snapshot({ app: { rootPid: 1, rootName: 'OpenChamber', cpu: 100, memory: 1024 ** 3, groups: [] } }), 'en');
    expect(full.rows[0]).toMatchObject({ value: '1.0 GB · 100%' });
  });

  test('formats numbers for the app language and falls back to English for a tag Intl refuses', () => {
    expect(statusView(snapshot(), 'de').rows[2]).toMatchObject({ value: '13,3 GB / 16,0 GB' });
    expect(statusView(snapshot(), 'en_US').rows[2]).toMatchObject({ value: '13.3 GB / 16.0 GB' });
  });

  test('counts the ports it does not show and drops the app line without a process list', () => {
    const many = statusView(snapshot({ servers: [server([1, 2, 3, 4, 5, 6, 7, 8])] }), 'en');
    expect(many.rows.at(-1)).toMatchObject({ value: '+2' });
    const partial = statusView(snapshot({ warnings: ['processes-unavailable'], servers: [server([1])] }), 'en');
    expect(partial.rows.map((row) => row.id)).toEqual(['processes', 'cpu', 'memory']);
  });
});
