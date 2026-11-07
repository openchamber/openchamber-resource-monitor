import { describe, expect, test } from 'bun:test';

import type { ProcessRow } from './snapshot.ts';
import { commandArguments, formatBytes, formatPercent, jobDetail, processCpuPercent, processLabel, setLocale } from './format.ts';

describe('commandArguments', () => {
  test('drops the executable path the row already names', () => {
    expect(commandArguments('node', '/usr/local/bin/node /repo/node_modules/.bin/vite --port 5173')).toBe('/repo/node_modules/.bin/vite --port 5173');
    expect(commandArguments('Python', '/Applications/Xcode.app/Contents/Developer/Library/Frameworks/Python3.framework/Versions/3.9/Resources/Python.app/Contents/MacOS/Python -m http.server 8799'))
      .toBe('-m http.server 8799');
    expect(commandArguments('OpenChamber Helper (GPU)', '/Applications/OpenChamber.app/Contents/Frameworks/OpenChamber Helper (GPU).app/Contents/MacOS/OpenChamber Helper (GPU) --type=gpu-process'))
      .toBe('--type=gpu-process');
    expect(commandArguments('node', '"C:\\Program Files\\nodejs\\node.exe" vite')).toBe('vite');
    expect(commandArguments('opencode', '/Users/me/.opencode/bin/opencode')).toBe('');
  });

  test('keeps commands that do not start with the process path', () => {
    expect(commandArguments('bun', 'bun server/index.js --port 3917')).toBe('bun server/index.js --port 3917');
    expect(commandArguments('zsh', '-zsh')).toBe('-zsh');
    expect(commandArguments('node', '/opt/other/runtime script.js')).toBe('/opt/other/runtime script.js');
  });
});

describe('processLabel', () => {
  const row = (name: string, command: string, ports: number[] = []): ProcessRow => ({ pid: 1, ppid: 0, name, label: name, command, cpu: null, memory: 0, ports });
  const helpers = '/Applications/OpenChamber.app/Contents/Frameworks';

  test('names Electron helpers by their role', () => {
    expect(processLabel(row('OpenChamber Helper (Renderer)', `${helpers}/OpenChamber Helper (Renderer).app/Contents/MacOS/OpenChamber Helper (Renderer) --type=renderer --lang=en`), 'other'))
      .toEqual({ title: 'Renderer', detail: '--type=renderer --lang=en' });
    expect(processLabel(row('OpenChamber Helper', `${helpers}/OpenChamber Helper.app/Contents/MacOS/OpenChamber Helper --type=gpu-process --user-data-dir=x`), 'other').title).toBe('GPU');
    expect(processLabel(row('OpenChamber Helper', `${helpers}/OpenChamber Helper.app/Contents/MacOS/OpenChamber Helper --type=utility --utility-sub-type=network.mojom.NetworkService`), 'other').title)
      .toBe('Network service');
  });

  test('the app root, this monitor, and ordinary processes', () => {
    expect(processLabel(row('OpenChamber', '/Applications/OpenChamber.app/Contents/MacOS/OpenChamber', [63418]), 'root')).toEqual({ title: 'Main process', detail: ':63418' });
    expect(processLabel(row('Resource Monitor', ''), 'self')).toEqual({ title: 'Resource Monitor', detail: 'this extension' });
    expect(processLabel(row('npm exec http-server -p 8798 -s', 'npm exec http-server -p 8798 -s'), 'other')).toEqual({ title: 'npm exec http-server -p 8798 -s', detail: '' });
    expect(processLabel(row('http-server', 'http-server', [8798]), 'other')).toEqual({ title: 'http-server', detail: ':8798' });
    expect(processLabel(row('opencode', '/Users/me/.opencode/bin/opencode serve --port 4096', [4096]), 'other'))
      .toEqual({ title: 'opencode', detail: ':4096 · serve --port 4096' });
  });
});

describe('jobDetail', () => {
  test('ports, size, and the exact arguments unless the title is already the command', () => {
    expect(jobDetail({ name: 'claude', title: 'claude', command: '/opt/claude --output-format stream-json', ports: [], count: 1 })).toBe('--output-format stream-json');
    expect(jobDetail({ name: 'bun', title: 'bun run dev', command: 'bun run dev', ports: [5180, 3902], count: 9 })).toBe(':5180 :3902 · 9 processes');
    expect(jobDetail({ name: 'node', title: 'node dev-web-hmr.mjs', command: '/usr/bin/node /site/scripts/dev-web-hmr.mjs', ports: [], count: 2 }))
      .toBe('2 processes · /site/scripts/dev-web-hmr.mjs');
  });
});

describe('formatting', () => {
  test('bytes and percents', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(340 * 1024 * 1024)).toBe('340 MB');
    expect(formatBytes(12.94 * 1024 ** 3)).toBe('12.9 GB');
    expect(formatPercent(null)).toBe('–');
    expect(formatPercent(0.004)).toBe('<0.01%');
    expect(formatPercent(0.04)).toBe('0.04%');
    expect(formatPercent(0)).toBe('0.0%');
    expect(formatPercent(4.25)).toBe('4.3%');
    expect(formatPercent(44.4)).toBe('44%');
    expect(formatPercent(250)).toBe('250%');
  });

  test('per-core CPU becomes a percentage of the whole machine', () => {
    expect(processCpuPercent(350, 16)).toBe(21.875);
    for (const [raw, cores, displayed] of [
      [null, 16, '–'], [0, 16, '0.0%'], [0.1, 16, '<0.01%'], [0.4, 16, '0.03%'],
      [35, 16, '2.2%'], [350, 16, '22%'], [1600, 16, '100%'],
      [35, 1, '35%'], [35, 0, '35%'],
    ] as const) {
      expect(formatPercent(processCpuPercent(raw, cores))).toBe(displayed);
    }
  });

  test('converted CPU keeps the established percent precision and locale', () => {
    try {
      setLocale('ru');
      expect(formatPercent(processCpuPercent(35, 16))).toBe('2,2%');
      expect(formatPercent(processCpuPercent(350, 16))).toBe('22%');
      setLocale('en_US');
      expect(formatPercent(processCpuPercent(35, 16))).toBe('2.2%');
    } finally {
      setLocale('en');
    }
  });
});
