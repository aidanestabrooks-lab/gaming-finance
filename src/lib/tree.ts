// Extensive-form game solver and SVG renderer shared by the tree models.
import { el, clear } from './svg';

export interface TreeNode {
  player?: string;
  actions?: { label: string; prob?: number; node: TreeNode }[];
  payoffs?: number[];
}

export interface Solved {
  node: TreeNode;
  value: number[];
  choice: number;
  kids: Solved[];
  depth: number;
  leaves: number;
  y?: number;
  onPath?: boolean;
}

export interface SolveStats {
  nodes: number;
}

/** Backward induction. Players maximize their own index of the payoff vector; Nature takes expectations. */
export function solve(node: TreeNode, players: string[], depth = 0, stats: SolveStats = { nodes: 0 }): Solved {
  stats.nodes++;
  if (node.payoffs) return { node, value: node.payoffs, choice: -1, kids: [], depth, leaves: 1 };
  const kids = node.actions!.map((a) => solve(a.node, players, depth + 1, stats));
  const leaves = kids.reduce((s, k) => s + k.leaves, 0);
  if (node.player === 'Nature') {
    const value = players.map((_, i) => kids.reduce((s, k, j) => s + (node.actions![j].prob ?? 0) * k.value[i], 0));
    return { node, value, choice: -1, kids, depth, leaves };
  }
  const idx = players.indexOf(node.player!);
  let best = 0;
  for (let k = 1; k < kids.length; k++) if (kids[k].value[idx] > kids[best].value[idx] + 1e-12) best = k;
  return { node, value: kids[best].value, choice: best, kids, depth, leaves };
}

export function markPath(s: Solved): void {
  s.onPath = true;
  if (s.node.player === 'Nature') s.kids.forEach(markPath);
  else if (s.choice >= 0) markPath(s.kids[s.choice]);
}

export function layout(s: Solved, y0 = 0): number {
  if (!s.kids.length) {
    s.y = y0 + 0.5;
    return y0 + 1;
  }
  let y = y0;
  for (const k of s.kids) y = layout(k, y);
  s.y = (s.kids[0].y! + s.kids[s.kids.length - 1].y!) / 2;
  return y;
}

function maxDepth(s: Solved): number {
  return s.kids.length ? Math.max(...s.kids.map(maxDepth)) : s.depth;
}

export function draw(svg: SVGSVGElement, root: Solved, players: string[], opts: { rowH?: number; width?: number; right?: number } = {}): void {
  clear(svg);
  const rowH = opts.rowH ?? 30;
  const D = maxDepth(root);
  const W = opts.width ?? 900;
  const H = root.leaves * rowH + 30;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const left = 40;
  const right = opts.right ?? 150;
  const colW = (W - left - right) / Math.max(D, 1);
  const sx = (d: number) => left + d * colW;
  const sy = (y: number) => 15 + y * rowH;

  const walk = (s: Solved) => {
    s.kids.forEach((k, i) => {
      const a = s.node.actions![i];
      const on = !!(s.onPath && k.onPath);
      svg.appendChild(
        el('line', {
          x1: sx(s.depth), y1: sy(s.y!), x2: sx(k.depth), y2: sy(k.y!),
          stroke: on ? 'var(--text)' : 'var(--line)', 'stroke-width': on ? 2.5 : 1.2,
        }),
      );
      const lx = (sx(s.depth) + sx(k.depth)) / 2;
      const ly = (sy(s.y!) + sy(k.y!)) / 2 - 4;
      const label = a.prob !== undefined ? `${a.label} (${a.prob})` : a.label;
      svg.appendChild(el('text', { x: lx, y: ly, class: on ? 'lbl' : 'lbl muted', 'text-anchor': 'middle', 'font-size': 11 }, label));
      walk(k);
    });
    const cx = sx(s.depth), cy = sy(s.y!);
    if (!s.kids.length) {
      const txt = `(${s.value.map((v) => (Number.isInteger(v) ? String(v) : v.toFixed(1))).join(', ')})`;
      svg.appendChild(el('text', { x: cx + 8, y: cy + 4, class: `mono ${s.onPath ? 'lbl' : 'lbl muted'}`, 'font-size': 11 }, txt));
    } else {
      const pi = players.indexOf(s.node.player!);
      const fill = s.node.player === 'Nature' ? 'var(--c6)' : `var(--c${pi + 1})`;
      const c = el('circle', { cx, cy, r: s.onPath ? 7 : 5, fill, stroke: s.onPath ? 'var(--text)' : 'none', 'stroke-width': 1.5 });
      c.appendChild(el('title', {}, `${s.node.player} · rollback value (${s.value.map((v) => v.toFixed(2)).join(', ')})`));
      svg.appendChild(c);
      if (s.depth === 0) svg.appendChild(el('text', { x: cx, y: cy - 12, class: 'lbl', 'text-anchor': 'middle', 'font-size': 11 }, s.node.player!));
    }
  };
  walk(root);
}

export function pathText(s: Solved): string {
  if (!s.kids.length) return '';
  if (s.node.player === 'Nature') return '[chance]';
  const a = s.node.actions![s.choice];
  const rest = pathText(s.kids[s.choice]);
  return `${s.node.player}: ${a.label}${rest ? ' → ' + rest : ''}`;
}
