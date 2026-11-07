import { afterEach, beforeEach, describe, expect, spyOn, test } from 'bun:test';

import type { RawProcess } from './parse.ts';
import { SAMPLE_INTERVAL_MS, Sampler } from './sampler.ts';
import type { ProcessSource } from './sources.ts';
import { HISTORY_POINTS } from '../shared/snapshot.ts';

const MB = 1024 * 1024;

describe('listening port refreshes', () => {
  let now: number;
  let clock: ReturnType<typeof spyOn<typeof Date, 'now'>>;

  beforeEach(() => {
    now = 1_000_000;
    clock = spyOn(Date, 'now').mockImplementation(() => now);
  });
  afterEach(() => clock.mockRestore());

  const fixture = () => {
    const state = {
      rows: [
        { pid: 100, ppid: 1, name: 'OpenChamber', memory: MB, cpuSeconds: 0 },
        { pid: 200, ppid: 100, name: 'opencode', memory: MB, cpuSeconds: 0 },
        { pid: 300, ppid: 200, name: 'bun', memory: MB, cpuSeconds: 0 },
      ] as RawProcess[],
      ports: new Map<number, number[]>([[300, [5173]]]),
      reads: [] as number[][],
      fail: false,
    };
    const source: ProcessSource = {
      list: async () => state.rows,
      commands: async () => new Map([[200, 'opencode serve --port 4096']]),
      ports: async (pids) => {
        state.reads.push([...pids]);
        if (state.fail) throw new Error('lsof timed out');
        return new Map([...state.ports].filter(([pid]) => pids.includes(pid)));
      },
      memoryUsed: async () => MB,
      close: () => undefined,
    };
    return { state, sampler: new Sampler(source, 100, 999) };
  };

  test('unchanged pid sets refresh once per minute, regardless of process order', async () => {
    const { state, sampler } = fixture();
    await sampler.sample();
    state.rows.reverse();
    state.ports = new Map([[300, [8080]]]);
    for (let sample = 1; sample < 12; sample++) {
      now += 5_000;
      expect((await sampler.sample()).servers[0]?.ports).toEqual([5173]);
    }
    expect(state.reads).toHaveLength(1);
    now += 5_000;
    expect((await sampler.sample()).servers[0]?.ports).toEqual([8080]);
    expect(state.reads).toHaveLength(2);
  });

  test('adding, removing, or replacing a watched pid refreshes immediately', async () => {
    const { state, sampler } = fixture();
    await sampler.sample();
    state.rows.push({ pid: 301, ppid: 300, name: 'node', memory: MB, cpuSeconds: 0 });
    await sampler.sample();
    state.rows = state.rows.filter(({ pid }) => pid !== 301);
    await sampler.sample();
    state.rows = state.rows.map((row) => row.pid === 300 ? { ...row, pid: 302 } : row);
    expect((await sampler.sample()).servers).toEqual([]);
    expect(state.reads).toEqual([[100, 200, 300], [100, 200, 300, 301], [100, 200, 300], [100, 200, 302]]);
  });

  test('an empty tree clears cached ports without querying the OS', async () => {
    const { state, sampler } = fixture();
    await sampler.sample();
    const rows = state.rows;
    state.rows = [];
    expect((await sampler.sample()).servers).toEqual([]);
    expect(state.reads).toHaveLength(1);
    state.rows = rows;
    await sampler.sample();
    expect(state.reads).toHaveLength(2);
  });

  test('reset discards port data and forces a fresh read', async () => {
    const { state, sampler } = fixture();
    await sampler.sample();
    state.ports.clear();
    sampler.reset();
    expect((await sampler.sample()).servers).toEqual([]);
    expect(state.reads).toHaveLength(2);
  });

  test('a failed read warns until the next refresh succeeds', async () => {
    const { state, sampler } = fixture();
    state.fail = true;
    expect((await sampler.sample()).warnings).toContain('ports-unavailable');
    state.fail = false;
    now += 5_000;
    expect((await sampler.sample()).warnings).toContain('ports-unavailable');
    expect(state.reads).toHaveLength(1);
    now += 55_000;
    expect((await sampler.sample()).warnings).not.toContain('ports-unavailable');
    expect(state.reads).toHaveLength(2);
  });

  test('Stop checks current listeners even while sampled ports are cached', async () => {
    const { state, sampler } = fixture();
    expect((await sampler.sample()).servers).toHaveLength(1);
    state.ports.clear();
    expect(await sampler.stop({ kind: 'job', pid: 300, name: 'bun' })).toBeNull();
    expect(state.reads).toEqual([[100, 200, 300], [300]]);
    state.fail = true;
    await expect(sampler.stop({ kind: 'job', pid: 300, name: 'bun' })).rejects.toThrow('lsof timed out');
  });
});

test('five-second samples retain three minutes of chart history', () => {
  expect(SAMPLE_INTERVAL_MS).toBe(5_000);
  expect(HISTORY_POINTS * SAMPLE_INTERVAL_MS).toBe(180_000);
});

test('a failed process read keeps the last OpenChamber numbers instead of zeros', async () => {
  let fail = false;
  let cpuSeconds = 0;
  const source: ProcessSource = {
    list: async () => {
      if (fail) throw new Error('ps timed out');
      cpuSeconds += 1;
      const rows: RawProcess[] = [
        { pid: 100, ppid: 1, name: 'OpenChamber', memory: 300 * MB, cpuSeconds },
        { pid: 200, ppid: 100, name: 'opencode', memory: 200 * MB, cpuSeconds },
      ];
      return rows;
    },
    commands: async () => new Map(),
    ports: async () => new Map(),
    memoryUsed: async () => 8 * 1024 * MB,
    close: () => undefined,
  };
  const sampler = new Sampler(source, 100, 999);
  await sampler.sample();
  await new Promise((resolve) => setTimeout(resolve, 20));
  const good = await sampler.sample();
  expect(good.app.memory).toBe(500 * MB);
  expect(good.app.cpu).toBeLessThanOrEqual(100);
  expect(good.app.groups.every((group) => group.cpu >= 0 && group.cpu <= 100)).toBe(true);
  const appPoints = good.history.app.memory.length;

  fail = true;
  const failed = await sampler.sample();
  expect(failed.warnings).toContain('processes-unavailable');
  expect(failed.app.memory).toBe(500 * MB);
  expect(failed.history.app.memory).toHaveLength(appPoints);

  fail = false;
  await new Promise((resolve) => setTimeout(resolve, 20));
  const recovered = await sampler.sample();
  // CPU still has a reading to compare with, so no process falls back to "no number".
  expect(recovered.app.groups.flatMap((group) => group.processes).every((row) => row.cpu !== null)).toBe(true);
});
