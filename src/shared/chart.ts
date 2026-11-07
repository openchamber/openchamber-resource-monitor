// A small live area chart in SVG. The newest point sits at the right edge;
// a fresh history fills in from the right as samples arrive.
const SVG = 'http://www.w3.org/2000/svg';
const WIDTH = 300;

let gradientSeq = 0;

const svgNode = <K extends keyof SVGElementTagNameMap>(name: K, attributes: Record<string, string | number>): SVGElementTagNameMap[K] => {
  const node = document.createElementNS(SVG, name);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, String(value));
  return node;
};

export interface ChartOptions {
  color: string;
  height: number;
  /** Points the chart holds; fewer values leave the left side empty. */
  capacity: number;
  /** Shown on hover for a point. */
  format: (value: number) => string;
  /** Seconds between points, for the hover's "12 s ago". */
  intervalSeconds: number;
}

export interface ChartHandle {
  element: HTMLElement;
  update: (values: readonly number[], max: number) => void;
}

export const mountChart = (options: ChartOptions): ChartHandle => {
  const element = document.createElement('div');
  element.className = 'chart';
  element.style.height = `${options.height}px`;
  const height = options.height;
  const svg = svgNode('svg', { viewBox: `0 0 ${WIDTH} ${height}`, preserveAspectRatio: 'none', 'aria-hidden': 'true' });
  const id = `fill-${++gradientSeq}`;
  const defs = svgNode('defs', {});
  const gradient = svgNode('linearGradient', { id, x1: 0, x2: 0, y1: 0, y2: 1 });
  gradient.append(
    svgNode('stop', { offset: '0%', 'stop-color': options.color, 'stop-opacity': 0.32 }),
    svgNode('stop', { offset: '100%', 'stop-color': options.color, 'stop-opacity': 0.02 }),
  );
  defs.append(gradient);
  const grid = svgNode('path', { d: '', class: 'chart-grid' });
  const area = svgNode('path', { d: '', fill: `url(#${id})` });
  const line = svgNode('path', { d: '', fill: 'none', stroke: options.color, 'stroke-width': 1.5, 'vector-effect': 'non-scaling-stroke', 'stroke-linejoin': 'round' });
  svg.append(defs, grid, area, line);
  const cursor = document.createElement('div');
  cursor.className = 'chart-cursor';
  const dot = document.createElement('div');
  dot.className = 'chart-dot';
  dot.style.background = options.color;
  const tip = document.createElement('div');
  tip.className = 'chart-tip';
  element.append(svg, cursor, dot, tip);

  let values: readonly number[] = [];
  let max = 1;
  let hoverIndex: number | null = null;
  let pointerX: number | null = null;

  const xOf = (index: number, count: number): number => ((options.capacity - count + index) / Math.max(1, options.capacity - 1)) * WIDTH;
  const yOf = (value: number): number => {
    const top = 2;
    return height - 1 - (Math.min(value, max) / max) * (height - 1 - top);
  };

  const drawHover = (): void => {
    const value = hoverIndex === null ? undefined : values[hoverIndex];
    if (hoverIndex === null || value === undefined) {
      element.classList.remove('hovering');
      return;
    }
    element.classList.add('hovering');
    const box = element.getBoundingClientRect();
    const x = (xOf(hoverIndex, values.length) / WIDTH) * box.width;
    const y = (yOf(value) / height) * box.height;
    cursor.style.transform = `translateX(${x}px)`;
    dot.style.transform = `translate(${x}px, ${y}px)`;
    const ago = (values.length - 1 - hoverIndex) * options.intervalSeconds;
    tip.textContent = `${options.format(value)} · ${ago === 0 ? 'now' : `${ago} s ago`}`;
    // Past the midpoint the label flips left; it may cross the chart's edge.
    const flip = x > box.width / 2;
    tip.style.left = flip ? '' : `${x + 8}px`;
    tip.style.right = flip ? `${box.width - x + 8}px` : '';
  };

  const hoverAt = (clientX: number): void => {
    if (values.length === 0) return;
    const box = element.getBoundingClientRect();
    const position = ((clientX - box.left) / box.width) * (options.capacity - 1);
    const index = Math.round(position - (options.capacity - values.length));
    hoverIndex = Math.min(values.length - 1, Math.max(0, index));
    drawHover();
  };
  element.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    hoverAt(event.clientX);
  });
  element.addEventListener('pointerleave', () => {
    pointerX = null;
    hoverIndex = null;
    drawHover();
  });

  const update = (nextValues: readonly number[], nextMax: number): void => {
    values = nextValues;
    max = nextMax > 0 ? nextMax : 1;
    grid.setAttribute('d', [0.25, 0.5, 0.75].map((share) => `M0 ${height * share} H${WIDTH}`).join(' '));
    if (values.length === 0) {
      area.setAttribute('d', '');
      line.setAttribute('d', '');
    } else {
      const points = values.map((value, index) => `${xOf(index, values.length).toFixed(2)} ${yOf(value).toFixed(2)}`);
      const single = values.length === 1;
      const path = single ? `M${xOf(0, 1) - 2} ${points[0]?.split(' ')[1]} L${points[0]}` : `M${points.join(' L')}`;
      line.setAttribute('d', path);
      const first = single ? xOf(0, 1) - 2 : xOf(0, values.length);
      area.setAttribute('d', `${path} L${WIDTH} ${height} L${first.toFixed(2)} ${height} Z`);
    }
    // A new point arrived under a still pointer: read the point now under it.
    if (pointerX !== null) hoverAt(pointerX);
  };

  return { element, update };
};
