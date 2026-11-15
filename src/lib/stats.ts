// Small numerical toolkit shared by the interactive models. No dependencies.

/** Deterministic 32-bit PRNG (mulberry32) so simulations are reproducible. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal draw via Box-Muller. */
export function randn(u: () => number): number {
  let a = 0;
  while (a === 0) a = u();
  const b = u();
  return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b);
}

/** Student-t draw with `nu` degrees of freedom (fat tails), unit scale. */
export function randt(u: () => number, nu: number): number {
  const z = randn(u);
  let chi = 0;
  for (let i = 0; i < nu; i++) {
    const g = randn(u);
    chi += g * g;
  }
  return z / Math.sqrt(chi / nu);
}

/** Standard normal CDF (Abramowitz-Stegun 7.1.26, max error 1.5e-7). */
export function normCdf(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp(-0.5 * x * x);
  const p =
    d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x >= 0 ? 1 - p : p;
}

/** Standard normal PDF. */
export function normPdf(x: number): number {
  return 0.3989422804014327 * Math.exp(-0.5 * x * x);
}

/** Black-Scholes call price. */
export function bsCall(S: number, K: number, r: number, sigma: number, T: number): number {
  if (T <= 0 || sigma <= 0) return Math.max(S - K, 0);
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  return S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2);
}

/** Bisection root finder on [lo, hi]. */
export function bisect(f: (x: number) => number, lo: number, hi: number, tol = 1e-8, maxIter = 200): number {
  let flo = f(lo);
  for (let i = 0; i < maxIter; i++) {
    const mid = 0.5 * (lo + hi);
    const fm = f(mid);
    if (Math.abs(fm) < tol || hi - lo < tol) return mid;
    if ((flo < 0 && fm < 0) || (flo > 0 && fm > 0)) {
      lo = mid;
      flo = fm;
    } else {
      hi = mid;
    }
  }
  return 0.5 * (lo + hi);
}

export function mean(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

export function stdev(xs: number[]): number {
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) * (b - m), 0) / (xs.length - 1));
}

export function quantile(sorted: number[], q: number): number {
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

/** Solve A x = b by Gaussian elimination with partial pivoting. */
export function solve(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    const pv = M[c][c];
    if (Math.abs(pv) < 1e-12) continue;
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / pv;
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((row, i) => (Math.abs(row[i]) < 1e-12 ? 0 : row[n] / row[i]));
}

export const fmt = {
  pct: (x: number, d = 1) => `${(100 * x).toFixed(d)}%`,
  num: (x: number, d = 2) => x.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }),
  usd: (x: number, d = 2) => `$${x.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}`,
  cents: (x: number) => `${Math.round(x * 100)}¢`,
  bp: (x: number) => `${(10000 * x).toFixed(0)} bp`,
};
