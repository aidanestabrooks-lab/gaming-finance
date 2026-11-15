// Tiny helpers for building SVG charts by hand inside model components.

export function el<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number> = {},
  text?: string,
): SVGElementTagNameMap[K] {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  if (text !== undefined) node.textContent = text;
  return node;
}

export function clear(node: Element): void {
  while (node.firstChild) node.removeChild(node.firstChild);
}

/** Linear scale factory. */
export function scale(d0: number, d1: number, r0: number, r1: number): (x: number) => number {
  const k = (r1 - r0) / (d1 - d0 || 1);
  return (x: number) => r0 + (x - d0) * k;
}

/** Nice tick values for an axis. */
export function ticks(lo: number, hi: number, n = 5): number[] {
  const span = hi - lo || 1;
  const raw = span / n;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm >= 5 ? 5 : norm >= 2 ? 2 : 1) * mag;
  const out: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(10));
  return out;
}

/** Draw x and y axes with ticks and gridlines into `g`. */
export function axes(
  g: SVGGElement,
  sx: (x: number) => number,
  sy: (y: number) => number,
  xr: [number, number],
  yr: [number, number],
  box: { left: number; right: number; top: number; bottom: number },
  fmtX: (v: number) => string = (v) => String(v),
  fmtY: (v: number) => string = (v) => String(v),
): void {
  for (const t of ticks(yr[0], yr[1])) {
    g.appendChild(el('line', { x1: box.left, x2: box.right, y1: sy(t), y2: sy(t), class: 'grid' }));
    g.appendChild(el('text', { x: box.left - 6, y: sy(t) + 4, class: 'tick', 'text-anchor': 'end' }, fmtY(t)));
  }
  for (const t of ticks(xr[0], xr[1])) {
    g.appendChild(el('text', { x: sx(t), y: box.bottom + 16, class: 'tick', 'text-anchor': 'middle' }, fmtX(t)));
  }
  g.appendChild(el('line', { x1: box.left, x2: box.right, y1: box.bottom, y2: box.bottom, class: 'axis' }));
  g.appendChild(el('line', { x1: box.left, x2: box.left, y1: box.top, y2: box.bottom, class: 'axis' }));
}

export function path(points: [number, number][]): string {
  return points.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
}
