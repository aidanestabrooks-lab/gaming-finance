/**
 * Typed access to the data snapshots in src/data/, which `npm run data`
 * (scripts/fetch-data.mjs) refreshes from public sources. Everything here runs
 * at build time inside component frontmatter; components embed only the
 * numbers the browser needs.
 */
import fredJson from '../data/fred.json';
import pricesJson from '../data/prices.json';
import companiesJson from '../data/companies.json';
import kalshiJson from '../data/kalshi.json';
import polymarketJson from '../data/polymarket.json';
import auctionsJson from '../data/auctions.json';

export type Obs = [string, number];
export interface Series { asOf: string; value: number; obs: Obs[] }

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "2026-11-12" or an ISO timestamp -> "Nov 12, 2026" (UTC). */
export function shortDate(iso: string): string {
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}
export function daysBetween(fromIso: string, toIso: string): number {
  return Math.max(0, Math.round((new Date(toIso).getTime() - new Date(fromIso).getTime()) / 86400000));
}

// ---------------------------------------------------------------- FRED
type FredFile = { fetched: string; source: string; series: Record<string, Series> };
const fredFile = fredJson as FredFile;

export const fred = {
  fetched: fredFile.fetched,
  source: fredFile.source,
  has(id: string): boolean {
    return id in fredFile.series;
  },
  get(id: string): Series {
    const s = fredFile.series[id];
    if (!s) throw new Error(`FRED series ${id} is not in the snapshot; add it to scripts/fetch-data.mjs`);
    return s;
  },
  latest(id: string): number {
    return fred.get(id).value;
  },
  asOf(id: string): string {
    return fred.get(id).asOf;
  },
  obs(id: string, since?: string): Obs[] {
    const o = fred.get(id).obs;
    return since ? o.filter(([d]) => d >= since) : o;
  },
  /** Percent change over `lag` observations (12 for a monthly series = year over year). */
  yoy(id: string, lag = 12): { asOf: string; value: number } {
    const o = fred.get(id).obs;
    const a = o[o.length - 1];
    const b = o[o.length - 1 - lag];
    return { asOf: a[0], value: (a[1] / b[1] - 1) * 100 };
  },
};

const CURVE: { id: string; t: number }[] = [
  { id: 'DGS1MO', t: 1 / 12 }, { id: 'DGS3MO', t: 0.25 }, { id: 'DGS6MO', t: 0.5 }, { id: 'DGS1', t: 1 }, { id: 'DGS2', t: 2 },
  { id: 'DGS3', t: 3 }, { id: 'DGS5', t: 5 }, { id: 'DGS7', t: 7 }, { id: 'DGS10', t: 10 }, { id: 'DGS20', t: 20 }, { id: 'DGS30', t: 30 },
];

/** Treasury par yield curve in percent, tenors in years, latest common date. */
export function parCurve(): { id: string; t: number; y: number }[] {
  return CURVE.filter((c) => fred.has(c.id)).map((c) => ({ ...c, y: fred.latest(c.id) }));
}
export function curveAsOf(): string {
  return fred.asOf('DGS10');
}
/** Linear interpolation of the par curve at maturity `t` years (percent). Flat beyond the ends. */
export function parYield(t: number): number {
  const c = parCurve();
  if (t <= c[0].t) return c[0].y;
  if (t >= c[c.length - 1].t) return c[c.length - 1].y;
  for (let i = 1; i < c.length; i++) {
    if (t <= c[i].t) {
      const w = (t - c[i - 1].t) / (c[i].t - c[i - 1].t);
      return c[i - 1].y + w * (c[i].y - c[i - 1].y);
    }
  }
  return c[c.length - 1].y;
}

// ---------------------------------------------------------------- generic statistics
export function logReturns(close: number[]): number[] {
  const r: number[] = [];
  for (let i = 1; i < close.length; i++) if (close[i] > 0 && close[i - 1] > 0) r.push(Math.log(close[i] / close[i - 1]));
  return r;
}
function sd(xs: number[]): number {
  const m = xs.reduce((a, b) => a + b, 0) / xs.length;
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / (xs.length - 1));
}
/** Annualized volatility of log changes over the last `window` observations. */
export function realizedVol(close: number[], window = 252, periodsPerYear = 252): number {
  const r = logReturns(close.slice(-(window + 1)));
  return sd(r) * Math.sqrt(periodsPerYear);
}
/** Yield volatility for a lognormal rate tree: stdev of log changes in the yield level, annualized. */
export function yieldVol(id: string, window = 252): number {
  const ys = fred.obs(id).map(([, v]) => v).filter((v) => v > 0);
  return realizedVol(ys, window);
}

// ---------------------------------------------------------------- prices (ETFs)
export interface Asset { ticker: string; label: string; desc: string; name: string; currency: string; price: number; priceTime: string | null; dates: string[]; close: number[] }
type PricesFile = { fetched: string; source: string; assets: Asset[] };
const pricesFile = pricesJson as PricesFile;

export const prices = {
  fetched: pricesFile.fetched,
  source: pricesFile.source,
  assets: pricesFile.assets,
  get(ticker: string): Asset {
    const a = pricesFile.assets.find((x) => x.ticker === ticker);
    if (!a) throw new Error(`no price history for ${ticker}`);
    return a;
  },
  asOf(): string {
    return pricesFile.assets[0].dates[pricesFile.assets[0].dates.length - 1];
  },
};

/** Align several close series on their common dates. */
export function align(series: { dates: string[]; close: number[] }[]): { dates: string[]; close: number[][] } {
  const common = series.reduce<Set<string>>((acc, s, i) => (i === 0 ? new Set(s.dates) : new Set(s.dates.filter((d) => acc.has(d)))), new Set());
  const dates = [...common].sort();
  const close = series.map((s) => {
    const m = new Map(s.dates.map((d, i) => [d, s.close[i]]));
    return dates.map((d) => m.get(d)!);
  });
  return { dates, close };
}

export interface AssetStats { tickers: string[]; labels: string[]; annRet: number[]; annVol: number[]; corr: number[][]; cov: number[][]; start: string; end: string; n: number }
/** Annualized return (CAGR), volatility, and correlation/covariance of daily log returns over the last `years`. */
export function assetStats(tickers = prices.assets.map((a) => a.ticker), years = 5): AssetStats {
  const assets = tickers.map((t) => prices.get(t));
  const al = align(assets);
  const cutoff = new Date(al.dates[al.dates.length - 1]);
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - years);
  const from = al.dates.findIndex((d) => d >= cutoff.toISOString().slice(0, 10));
  const dates = al.dates.slice(from);
  const close = al.close.map((c) => c.slice(from));
  const rets = close.map(logReturns);
  const n = rets[0].length;
  const means = rets.map((r) => r.reduce((a, b) => a + b, 0) / n);
  const cov = rets.map((ri, i) => rets.map((rj, j) => (ri.reduce((a, _, k) => a + (ri[k] - means[i]) * (rj[k] - means[j]), 0) / (n - 1)) * 252));
  const annVol = cov.map((row, i) => Math.sqrt(row[i]));
  const corr = cov.map((row, i) => row.map((c, j) => c / (annVol[i] * annVol[j])));
  const yrs = n / 252;
  const annRet = close.map((c) => Math.pow(c[c.length - 1] / c[0], 1 / yrs) - 1);
  return { tickers, labels: assets.map((a) => a.label), annRet, annVol, corr, cov, start: dates[0], end: dates[dates.length - 1], n };
}

/** Rolling correlation of daily log returns, sampled every `step` observations to keep the output small. */
export function rollingCorr(a: string, b: string, window = 252, step = 21): Obs[] {
  const al = align([prices.get(a), prices.get(b)]);
  const ra = logReturns(al.close[0]);
  const rb = logReturns(al.close[1]);
  const out: Obs[] = [];
  for (let end = window; end <= ra.length; end += step) {
    const xa = ra.slice(end - window, end);
    const xb = rb.slice(end - window, end);
    const ma = xa.reduce((p, q) => p + q, 0) / window;
    const mb = xb.reduce((p, q) => p + q, 0) / window;
    let sab = 0, saa = 0, sbb = 0;
    for (let i = 0; i < window; i++) {
      sab += (xa[i] - ma) * (xb[i] - mb);
      saa += (xa[i] - ma) ** 2;
      sbb += (xb[i] - mb) ** 2;
    }
    out.push([al.dates[end], Math.round((sab / Math.sqrt(saa * sbb)) * 1000) / 1000]);
  }
  return out;
}

// ---------------------------------------------------------------- companies
export interface Company {
  ticker: string; name: string; group: 'hyperscaler' | 'levered'; currency: string; price: number; priceTime: string | null;
  dates: string[]; close: number[];
  annual: Record<string, Obs[]>; trailing: Record<string, Obs>; quarterly: Record<string, Obs>;
}
type CompaniesFile = { fetched: string; source: string; companies: Company[] };
const companiesFile = companiesJson as CompaniesFile;

export const companies = {
  fetched: companiesFile.fetched,
  source: companiesFile.source,
  list: companiesFile.companies,
  get(ticker: string): Company {
    const c = companiesFile.companies.find((x) => x.ticker === ticker);
    if (!c) throw new Error(`no company data for ${ticker}`);
    return c;
  },
  hyperscalers: companiesFile.companies.filter((c) => c.group === 'hyperscaler'),
  levered: companiesFile.companies.filter((c) => c.group === 'levered'),
};

export interface CompanySnapshot {
  ticker: string; name: string; price: number; priceDate: string;
  shares: number; marketCap: number; totalDebt: number; cash: number; netDebt: number; balanceSheetDate: string;
  revenueTTM: number; operatingIncomeTTM: number; ebitMargin: number; taxRate: number; capexTTM: number; daTTM: number; interestExpenseTTM: number;
  revenueFY: number; revenueFYPrior: number; revenueGrowth: number; fiscalYearEnd: string;
  salesToCapital: number; investedCapital: number;
  equityVol1y: number; beta1y: number;
}

function last(c: Company, key: string): Obs | undefined {
  return c.quarterly[key] ?? c.trailing[key] ?? c.annual[key]?.[c.annual[key].length - 1];
}
function ttm(c: Company, key: string): Obs | undefined {
  return c.trailing[key] ?? c.annual[key]?.[c.annual[key].length - 1];
}

/** Derived, model-ready figures for one company. Dollar amounts are in the filing currency (USD for all included names). */
export function companySnapshot(c: Company): CompanySnapshot {
  const shares = last(c, 'OrdinarySharesNumber')?.[1] ?? NaN;
  const totalDebt = last(c, 'TotalDebt')?.[1] ?? 0;
  const cash = last(c, 'CashAndCashEquivalents')?.[1] ?? 0;
  const revenueTTM = ttm(c, 'TotalRevenue')?.[1] ?? NaN;
  const operatingIncomeTTM = ttm(c, 'OperatingIncome')?.[1] ?? NaN;
  const pretax = ttm(c, 'PretaxIncome')?.[1] ?? NaN;
  const tax = ttm(c, 'TaxProvision')?.[1] ?? NaN;
  const taxRate = pretax > 0 && tax >= 0 ? Math.min(0.35, tax / pretax) : 0.21;
  const capexTTM = Math.abs(ttm(c, 'CapitalExpenditure')?.[1] ?? 0);
  const daTTM = ttm(c, 'DepreciationAndAmortization')?.[1] ?? 0;
  const interestExpenseTTM = ttm(c, 'InterestExpense')?.[1] ?? 0;
  const rev = c.annual.TotalRevenue ?? [];
  const revenueFY = rev[rev.length - 1]?.[1] ?? NaN;
  const revenueFYPrior = rev[rev.length - 2]?.[1] ?? NaN;
  const revenueGrowth = revenueFY / revenueFYPrior - 1;
  // Sales-to-capital: incremental revenue per dollar reinvested in the latest fiscal year
  // (capex net of D&A plus the working-capital build). Falls back to revenue / invested capital.
  const capexFY = Math.abs(c.annual.CapitalExpenditure?.slice(-1)[0]?.[1] ?? 0);
  const daFY = c.annual.DepreciationAndAmortization?.slice(-1)[0]?.[1] ?? 0;
  const dwcFY = -(c.annual.ChangeInWorkingCapital?.slice(-1)[0]?.[1] ?? 0);
  const reinvFY = capexFY - daFY + dwcFY;
  const investedCapital = last(c, 'InvestedCapital')?.[1] ?? (last(c, 'StockholdersEquity')?.[1] ?? 0) + totalDebt - cash;
  let salesToCapital = reinvFY > 0 && revenueFY - revenueFYPrior > 0 ? (revenueFY - revenueFYPrior) / reinvFY : revenueTTM / investedCapital;
  if (!Number.isFinite(salesToCapital) || salesToCapital <= 0) salesToCapital = revenueTTM / investedCapital;
  // Market statistics from one year of daily closes against SPY.
  const spy = prices.get('SPY');
  const al = align([c, spy]);
  const n = Math.min(252, al.dates.length - 1);
  const ri = logReturns(al.close[0].slice(-(n + 1)));
  const rm = logReturns(al.close[1].slice(-(n + 1)));
  const mi = ri.reduce((a, b) => a + b, 0) / ri.length;
  const mm = rm.reduce((a, b) => a + b, 0) / rm.length;
  let cov = 0, varm = 0;
  for (let k = 0; k < ri.length; k++) {
    cov += (ri[k] - mi) * (rm[k] - mm);
    varm += (rm[k] - mm) ** 2;
  }
  return {
    ticker: c.ticker, name: c.name, price: c.price, priceDate: c.dates[c.dates.length - 1],
    shares, marketCap: c.price * shares, totalDebt, cash, netDebt: totalDebt - cash,
    balanceSheetDate: last(c, 'TotalDebt')?.[0] ?? '',
    revenueTTM, operatingIncomeTTM, ebitMargin: operatingIncomeTTM / revenueTTM, taxRate, capexTTM, daTTM, interestExpenseTTM,
    revenueFY, revenueFYPrior, revenueGrowth, fiscalYearEnd: rev[rev.length - 1]?.[0] ?? '',
    salesToCapital, investedCapital,
    equityVol1y: sd(ri) * Math.sqrt(252), beta1y: cov / varm,
  };
}

/** CAPM cost of equity and a market-value WACC. Risk-free is the 10-year Treasury; cost of debt is risk-free plus the IG index OAS. */
export function waccFor(s: CompanySnapshot, erp = 0.045): { rf: number; beta: number; ke: number; kd: number; wd: number; wacc: number } {
  const rf = fred.latest('DGS10') / 100;
  const kd = rf + fred.latest('BAMLC0A0CM') / 100;
  const beta = Math.min(2.5, Math.max(0.3, s.beta1y));
  const ke = rf + beta * erp;
  const wd = s.totalDebt / (s.totalDebt + s.marketCap);
  return { rf, beta, ke, kd, wd, wacc: (1 - wd) * ke + wd * kd * (1 - s.taxRate) };
}

// ---------------------------------------------------------------- Kalshi
export interface KalshiMarket {
  ticker: string; label: string; title: string; yes_bid: number | null; yes_ask: number | null; no_bid: number | null; no_ask: number | null;
  last: number | null; previous: number | null; yes_bid_size: number | null; yes_ask_size: number | null;
  volume: number | null; volume_24h: number | null; open_interest: number | null; close_time: string; expiration_time: string; status: string;
  floor_strike: number | null; cap_strike: number | null; custom_strike: Record<string, string> | null;
}
export interface KalshiEvent { series: string; event_ticker: string; title: string; sub_title: string; mutually_exclusive: boolean; strike_date: string | null; markets: KalshiMarket[] }
type KalshiFile = { fetched: string; source: string; fee: { type: string; rate: number }; events: KalshiEvent[] };
const kalshiFile = kalshiJson as KalshiFile;

export const kalshi = {
  fetched: kalshiFile.fetched,
  source: kalshiFile.source,
  fee: kalshiFile.fee,
  events: kalshiFile.events,
  event(ticker: string): KalshiEvent {
    const e = kalshiFile.events.find((x) => x.event_ticker === ticker);
    if (!e) throw new Error(`no Kalshi event ${ticker}`);
    return e;
  },
  /** Open events of a series, soonest to close first. */
  series(series: string): KalshiEvent[] {
    return kalshiFile.events.filter((e) => e.series === series).sort((a, b) => (a.markets[0]?.close_time < b.markets[0]?.close_time ? -1 : 1));
  },
  /** The next FOMC decision event. */
  fedDecision(): KalshiEvent {
    return kalshi.series('KXFEDDECISION')[0];
  },
};

// ---------------------------------------------------------------- Polymarket
export interface PolyMarket {
  question: string; groupItemTitle: string | null; outcomes: string[] | null; outcomePrices: number[] | null;
  bestBid: number | null; bestAsk: number | null; spread: number | null; lastTradePrice: number | null; liquidity: number | null; volume: number | null; endDate: string | null;
}
export interface PolyEvent { slug: string; title: string; endDate: string; volume: number | null; liquidity: number | null; markets: PolyMarket[] }
type PolyFile = { fetched: string; source: string; events: PolyEvent[] };
const polyFile = polymarketJson as PolyFile;

export const polymarket = {
  fetched: polyFile.fetched,
  source: polyFile.source,
  events: polyFile.events,
  fedDecision(): PolyEvent {
    return [...polyFile.events].sort((a, b) => (a.endDate < b.endDate ? -1 : 1))[0];
  },
};

export type FedOutcomeKey = 'cut50' | 'cut25' | 'hold' | 'hike25' | 'hike50';
export interface FedOutcome { key: FedOutcomeKey; label: string; kalshi?: KalshiMarket; poly?: PolyMarket }
const OUTCOME_LABELS: Record<FedOutcomeKey, string> = { cut50: 'Cut 50+ bp', cut25: 'Cut 25 bp', hold: 'No change', hike25: 'Hike 25 bp', hike50: 'Hike 50+ bp' };

function classify(text: string): FedOutcomeKey | null {
  const t = text.toLowerCase();
  const big = /50|>\s*25|\+/.test(t);
  if (/maintain|no change|hold|0\s*bps?/.test(t) && !/25|50/.test(t)) return 'hold';
  if (/cut|decrease|lower/.test(t)) return big ? 'cut50' : 'cut25';
  if (/hike|increase|raise/.test(t)) return big ? 'hike50' : 'hike25';
  return null;
}

/** The next Fed decision's five outcomes with the Kalshi and Polymarket quotes matched to each. */
export function fedOutcomes(): { event: string; kalshiClose: string; polyEnd: string; outcomes: FedOutcome[] } {
  const ke = kalshi.fedDecision();
  const pe = polymarket.fedDecision();
  const outcomes: FedOutcome[] = (Object.keys(OUTCOME_LABELS) as FedOutcomeKey[]).map((key) => ({ key, label: OUTCOME_LABELS[key] }));
  for (const m of ke?.markets ?? []) {
    const k = classify(m.label);
    const o = outcomes.find((x) => x.key === k);
    if (o) o.kalshi = m;
  }
  for (const m of pe?.markets ?? []) {
    const k = classify(m.groupItemTitle ?? m.question);
    const o = outcomes.find((x) => x.key === k);
    if (o) o.poly = m;
  }
  return { event: ke?.title ?? pe?.title ?? 'Fed decision', kalshiClose: ke?.markets[0]?.close_time ?? '', polyEnd: pe?.endDate ?? '', outcomes };
}

// ---------------------------------------------------------------- Treasury auctions
export interface Auction {
  cusip: string; securityType: string; securityTerm: string; originalSecurityTerm?: string; auctionDate: string; issueDate?: string; maturityDate?: string; reopening: string;
  interestRate?: number; highYield?: number; medianYield?: number; lowYield?: number; highPrice?: number; bidToCoverRatio?: number; offeringAmount?: number;
  totalAccepted?: number; totalTendered?: number; allottedAtHighYieldPercentage?: number;
  primaryDealersCompetitiveParAwarded?: number; directBiddersCompetitiveParAwarded?: number; indirectBiddersCompetitiveParAwarded?: number;
  somaAccepted?: number; competitiveAccepted?: number; noncompetitiveAccepted?: number;
}
type AuctionsFile = { fetched: string; source: string; auctions: Auction[] };
const auctionsFile = auctionsJson as AuctionsFile;

export const auctions = {
  fetched: auctionsFile.fetched,
  source: auctionsFile.source,
  all: auctionsFile.auctions,
  /** Auctions of one original term (e.g. '10-Year'), newest first, including reopenings. */
  byTerm(term: string, n = 12): Auction[] {
    return auctionsFile.auctions
      .filter((a) => (a.originalSecurityTerm ?? a.securityTerm) === term && a.highYield != null && a.medianYield != null)
      .slice(0, n);
  },
};

// ---------------------------------------------------------------- sector ETFs and macro factor panel
import sectorsJson from '../data/sectors.json';
export interface SectorEtf { ticker: string; sector: string; name: string; currency: string; price: number; priceTime: string | null; dates: string[]; close: number[] }
type SectorsFile = { fetched: string; source: string; etfs: SectorEtf[] };
const sectorsFile = sectorsJson as SectorsFile;

export const sectors = {
  fetched: sectorsFile.fetched,
  source: sectorsFile.source,
  etfs: sectorsFile.etfs,
  get(ticker: string): SectorEtf {
    const e = sectorsFile.etfs.find((x) => x.ticker === ticker);
    if (!e) throw new Error(`no sector ETF ${ticker}`);
    return e;
  },
};

/** Last observation of each calendar month, as a map "YYYY-MM" -> value. */
function monthEnds(dates: string[], values: number[]): Map<string, number> {
  const m = new Map<string, number>();
  for (let i = 0; i < dates.length; i++) m.set(dates[i].slice(0, 7), values[i]); // later dates overwrite earlier ones
  return m;
}

export interface SectorPanel {
  months: string[]; // "YYYY-MM", each row is the return over that month
  tickers: string[]; names: string[];
  ret: number[][]; // [month][sector] simple monthly return
  spy: number[]; // [month] SPY monthly return
  factors: string[]; // factor names
  fac: number[][]; // [month][factor] monthly factor change
  levels: Record<string, number>; // latest factor levels
}

/**
 * Monthly panel for sector factor models: sector ETF returns, SPY return, and changes in
 * macro drivers (10y yield in percentage points, Moody's Baa minus 10y spread in points, log change of the broad
 * dollar index and WTI, change in VIX). Starts where every series exists (XLC lists in 2018).
 */
export function sectorPanel(): SectorPanel {
  const facDefs: { id: string; name: string; kind: 'diff' | 'log' }[] = [
    { id: 'DGS10', name: '10y yield (Δ pp)', kind: 'diff' },
    { id: 'BAA10Y', name: 'Baa credit spread (Δ pp)', kind: 'diff' },
    { id: 'DTWEXBGS', name: 'Dollar index (Δ log)', kind: 'log' },
    { id: 'DCOILWTICO', name: 'WTI crude (Δ log)', kind: 'log' },
    { id: 'VIXCLS', name: 'VIX (Δ points)', kind: 'diff' },
  ];
  const etfMaps = sectorsFile.etfs.map((e) => monthEnds(e.dates, e.close));
  const spyA = prices.get('SPY');
  const spyMap = monthEnds(spyA.dates, spyA.close);
  const facMaps = facDefs.map((f) => {
    const o = fred.obs(f.id);
    return monthEnds(o.map((x) => x[0]), o.map((x) => x[1]));
  });
  const all = [...etfMaps, spyMap, ...facMaps];
  const months = [...etfMaps[0].keys()].filter((k) => all.every((m) => m.has(k))).sort();
  // Drop the current, incomplete month unless it is the only data for the month end.
  const out: SectorPanel = { months: [], tickers: sectorsFile.etfs.map((e) => e.ticker), names: sectorsFile.etfs.map((e) => e.sector), ret: [], spy: [], factors: facDefs.map((f) => f.name), fac: [], levels: {} };
  for (let i = 1; i < months.length; i++) {
    const a = months[i - 1], b = months[i];
    out.months.push(b);
    out.ret.push(etfMaps.map((m) => +(m.get(b)! / m.get(a)! - 1).toFixed(5)));
    out.spy.push(+(spyMap.get(b)! / spyMap.get(a)! - 1).toFixed(5));
    out.fac.push(facDefs.map((f, j) => {
      const x0 = facMaps[j].get(a)!, x1 = facMaps[j].get(b)!;
      return +(f.kind === 'log' ? Math.log(x1 / x0) : x1 - x0).toFixed(5);
    }));
  }
  for (const f of facDefs) out.levels[f.id] = fred.latest(f.id);
  return out;
}

// ---------------------------------------------------------------- stock universe for the screener
import universeJson from '../data/universe.json';
export interface ScreenStock {
  ticker: string; name: string; sector: string; price: number; priceDate: string;
  marketCap: number | null; ev: number | null; revenueTTM: number | null; ebitdaTTM: number | null; netIncomeTTM: number | null; fcfTTM: number | null;
  revGrowth: number | null; ebitMargin: number | null; netMargin: number | null;
  pe: number | null; evEbitda: number | null; fcfYield: number | null; psales: number | null; pb: number | null;
  netDebtEbitda: number | null; interestCoverage: number | null; roe: number | null;
  vol1y: number; beta1y: number; mom12_1: number; ret1m: number; ret3m: number; ret12m: number; pos52w: number; drawdown52w: number;
}
type UniverseFile = { fetched: string; source: string; stocks: ScreenStock[] };
const universeFile = universeJson as UniverseFile;

export const universe = {
  fetched: universeFile.fetched,
  source: universeFile.source,
  stocks: universeFile.stocks,
  sectors: [...new Set(universeFile.stocks.map((s) => s.sector))],
  asOf: universeFile.stocks[0]?.priceDate ?? '',
};

// ---------------------------------------------------------------- Nvidia: option chain, earnings moves, event study (week 18)
import nvidiaJson from '../data/nvidia.json';
export interface OptionQuote { bid: number; ask: number; mid: number; iv: number; oi: number; vol: number }
export interface OptionExpiry { expiration: string; days: number; strike: number; call: OptionQuote; put: OptionQuote; straddle: number; impliedMove: number; totalOI: number; putCallOI: number }
interface NvidiaFile {
  fetched: string; source: string; spot: number; priceTime: string | null; name: string; dates: string[]; close: number[];
  bench: { ticker: string; name: string; dates: string[]; close: number[] };
  peers: Record<string, { name: string; price: number; dates: string[]; close: number[] }>;
  options: OptionExpiry[]; earnings: [string, string][];
}
const nvidiaFile = nvidiaJson as NvidiaFile;
export const nvidia = { ...nvidiaFile, asOf: nvidiaFile.dates[nvidiaFile.dates.length - 1] };

/** Close-to-close move from each report day (reports are after the close) to the next session. */
export function earningsMoves(): { label: string; date: string; before: number; after: number; move: number }[] {
  const { dates, close } = nvidiaFile;
  const out: { label: string; date: string; before: number; after: number; move: number }[] = [];
  for (const [label, date] of nvidiaFile.earnings) {
    let i = dates.findIndex((d) => d >= date);
    if (i < 0) continue;
    if (dates[i] !== date) i -= 1; // report date was not a session; use the prior close
    if (i < 0 || i + 1 >= dates.length) continue;
    out.push({ label, date, before: close[i], after: close[i + 1], move: close[i + 1] / close[i] - 1 });
  }
  return out;
}

export interface EventStudy {
  eventDate: string; bench: string; estDays: number; gap: number; estStart: string; estEnd: string;
  alpha: number; beta: number; sigma: number; r2: number;
  rows: { date: string; r: number; rm: number; ar: number; car: number }[]; // from a few days before the event
  peers: Record<string, { name: string; rows: [string, number][] }>; // cumulative return since the close before the event
}
/** Market-model event study of NVDA against SMH: estimation window, abnormal returns and CAR from the event date. */
export function nvidiaEventStudy(eventDate = '2026-11-11', estDays = 250, gap = 5, pre = 5): EventStudy {
  const al = align([nvidiaFile, nvidiaFile.bench]);
  const r = logReturns(al.close[0]);
  const rm = logReturns(al.close[1]);
  const rd = al.dates.slice(1);
  const e = rd.findIndex((d) => d >= eventDate);
  const s0 = Math.max(0, e - gap - estDays), s1 = e - gap;
  const xs = rm.slice(s0, s1), ys = r.slice(s0, s1);
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
  }
  const beta = sxy / sxx, alpha = my - beta * mx;
  let sse = 0, sst = 0;
  for (let i = 0; i < n; i++) {
    sse += (ys[i] - alpha - beta * xs[i]) ** 2;
    sst += (ys[i] - my) ** 2;
  }
  const sigma = Math.sqrt(sse / (n - 2));
  const rows: EventStudy['rows'] = [];
  let car = 0;
  for (let i = Math.max(0, e - pre); i < r.length; i++) {
    const ar = r[i] - alpha - beta * rm[i];
    if (i >= e) car += ar;
    rows.push({ date: rd[i], r: +r[i].toFixed(5), rm: +rm[i].toFixed(5), ar: +ar.toFixed(5), car: +car.toFixed(5) });
  }
  const peers: EventStudy['peers'] = {};
  const base = (dates: string[], close: number[]) => {
    const i = dates.findIndex((d) => d >= eventDate);
    const b = close[Math.max(0, i - 1)];
    return dates.slice(Math.max(0, i - pre)).map((d, k) => [d, +(close[Math.max(0, i - pre) + k] / b - 1).toFixed(4)] as [string, number]);
  };
  peers.NVDA = { name: nvidiaFile.name, rows: base(nvidiaFile.dates, nvidiaFile.close) };
  peers.SMH = { name: nvidiaFile.bench.name, rows: base(nvidiaFile.bench.dates, nvidiaFile.bench.close) };
  for (const [t, p] of Object.entries(nvidiaFile.peers)) peers[t] = { name: p.name, rows: base(p.dates, p.close) };
  return { eventDate, bench: 'SMH', estDays: n, gap, estStart: rd[s0], estEnd: rd[s1 - 1], alpha, beta, sigma, r2: 1 - sse / sst, rows, peers };
}
