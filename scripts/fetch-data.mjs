// Pulls the public data the interactive models run on and writes snapshots to src/data/*.json.
// Every source is independent: a failure keeps the previous snapshot for that source and the
// build goes ahead. Run with `npm run data`. No API keys are needed.
//
// Sources
//   FRED (fredgraph.csv)        Treasury par curve, policy rates, CPI, PCE, OAS, VIX, USD/JPY, BoJ rate
//   Yahoo Finance               ETF and single-name price history, annual and TTM fundamentals
//   Kalshi public API           Fed decision and CPI event contracts (bid/ask in cents)
//   Polymarket Gamma API        Fed decision markets (bid/ask in dollars)
//   TreasuryDirect              Note and bond auction results

import { writeFile, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve('src/data');
const UA = 'GamingFinance/1.0 (research site build; +https://github.com/aidanestabrooks-lab/gaming-finance)';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, { json = true, headers = {}, retries = 3 } = {}) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: json ? 'application/json' : 'text/plain,*/*', ...headers },
      signal: AbortSignal.timeout(40000),
    });
    if (res.ok) return json ? res.json() : res.text();
    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || attempt >= retries) throw new Error(`HTTP ${res.status} for ${url}`);
    await sleep(1500 * attempt);
  }
}

async function readExisting(name) {
  try {
    return JSON.parse(await readFile(path.join(OUT, `${name}.json`), 'utf8'));
  } catch {
    return null;
  }
}

async function step(name, fn) {
  try {
    const data = await fn();
    await writeFile(path.join(OUT, `${name}.json`), JSON.stringify({ fetched: new Date().toISOString(), ...data }));
    console.log(`ok   ${name}`);
    return true;
  } catch (e) {
    console.warn(`FAIL ${name}: ${e.message}. Keeping the existing snapshot.`);
    return false;
  }
}

const r4 = (x) => Math.round(x * 1e4) / 1e4;

// ---------------------------------------------------------------- FRED
const FRED_SERIES = {
  // Treasury constant-maturity par yields
  DGS1MO: '2021-01-01', DGS3MO: '2021-01-01', DGS6MO: '2021-01-01', DGS1: '2021-01-01', DGS2: '2021-01-01',
  DGS3: '2021-01-01', DGS5: '2021-01-01', DGS7: '2021-01-01', DGS10: '2016-01-01', DGS20: '2021-01-01', DGS30: '2021-01-01',
  // Policy rates
  DFF: '2021-01-01', DFEDTARU: '2021-01-01', DFEDTARL: '2021-01-01', SOFR: '2021-01-01',
  // Macro
  CPIAUCSL: '2010-01-01', PCEPILFE: '2010-01-01', UNRATE: '2010-01-01', T10YIE: '2021-01-01',
  // Credit and volatility (the ICE BofA OAS series only export about three years; BAA10Y is the long-history credit factor)
  BAMLH0A0HYM2: '2016-01-01', BAMLC0A0CM: '2016-01-01', BAA10Y: '2016-01-01', VIXCLS: '2016-01-01',
  // FX and Japan
  DEXJPUS: '2010-01-01', IRSTCI01JPM156N: '2010-01-01',
  // Sector factor drivers: broad dollar index, WTI crude
  DTWEXBGS: '2016-01-01', DCOILWTICO: '2016-01-01',
};

async function fetchFred() {
  const series = {};
  for (const [id, since] of Object.entries(FRED_SERIES)) {
    const csv = await get(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${id}&cosd=${since}`, { json: false });
    const obs = [];
    for (const line of csv.split('\n').slice(1)) {
      const [d, v] = line.trim().split(',');
      if (!d || d < since) continue;
      const x = parseFloat(v);
      if (Number.isFinite(x)) obs.push([d, r4(x)]);
    }
    if (!obs.length) throw new Error(`no observations for ${id}`);
    const [asOf, value] = obs[obs.length - 1];
    series[id] = { asOf, value, obs };
    await sleep(150);
  }
  return { source: 'Federal Reserve Bank of St. Louis, FRED', series };
}

// ---------------------------------------------------------------- Yahoo Finance
async function chart(ticker, range) {
  const d = await get(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=${range}&interval=1d`);
  const res = d.chart?.result?.[0];
  if (!res) throw new Error(`no chart for ${ticker}`);
  const ts = res.timestamp ?? [];
  const adj = res.indicators?.adjclose?.[0]?.adjclose ?? res.indicators?.quote?.[0]?.close ?? [];
  const dates = [];
  const close = [];
  for (let i = 0; i < ts.length; i++) {
    if (adj[i] == null) continue;
    dates.push(new Date(ts[i] * 1000).toISOString().slice(0, 10));
    close.push(r4(adj[i]));
  }
  const m = res.meta ?? {};
  return {
    name: m.longName ?? m.shortName ?? ticker,
    currency: m.currency,
    price: m.regularMarketPrice,
    priceTime: m.regularMarketTime ? new Date(m.regularMarketTime * 1000).toISOString() : null,
    dates,
    close,
  };
}

const ETFS = [
  { ticker: 'SPY', label: 'US equity', desc: 'S&P 500 ETF' },
  { ticker: 'EFA', label: 'Intl equity', desc: 'MSCI EAFE ETF' },
  { ticker: 'IEF', label: 'US Treasuries', desc: '7-10 year Treasury ETF' },
  { ticker: 'LQD', label: 'IG credit', desc: 'Investment-grade corporate ETF' },
  { ticker: 'GLD', label: 'Gold', desc: 'Gold trust' },
];

async function fetchPrices() {
  const assets = [];
  for (const a of ETFS) {
    assets.push({ ...a, ...(await chart(a.ticker, '10y')) });
    await sleep(300);
  }
  return { source: 'Yahoo Finance, adjusted daily closes', assets };
}

const FUND_TYPES = [
  'TotalRevenue', 'OperatingIncome', 'PretaxIncome', 'TaxProvision', 'NetIncome', 'DepreciationAndAmortization',
  'CapitalExpenditure', 'OperatingCashFlow', 'FreeCashFlow', 'InterestExpense', 'ChangeInWorkingCapital',
  'TotalDebt', 'CashAndCashEquivalents', 'OrdinarySharesNumber', 'TotalAssets', 'StockholdersEquity', 'InvestedCapital',
  'CurrentDebt', 'LongTermDebt',
];

async function fundamentals(ticker, fields = FUND_TYPES) {
  const now = Math.floor(Date.now() / 1000);
  const types = [
    ...fields.map((t) => `annual${t}`),
    ...fields.map((t) => `trailing${t}`),
    ...fields.map((t) => `quarterly${t}`),
  ].join(',');
  const url = `https://query1.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/${encodeURIComponent(ticker)}?type=${types}&period1=${now - 7 * 365 * 86400}&period2=${now}`;
  const d = await get(url);
  const out = { annual: {}, trailing: {}, quarterly: {} };
  for (const r of d.timeseries?.result ?? []) {
    const type = r.meta?.type?.[0];
    if (!type) continue;
    const rows = (r[type] ?? [])
      .filter((x) => x && x.reportedValue && Number.isFinite(x.reportedValue.raw))
      .map((x) => [x.asOfDate, x.reportedValue.raw])
      .sort((a, b) => (a[0] < b[0] ? -1 : 1));
    if (!rows.length) continue;
    const m = type.match(/^(annual|trailing|quarterly)(.+)$/);
    if (!m) continue;
    out[m[1]][m[2]] = m[1] === 'annual' ? rows.slice(-6) : rows[rows.length - 1];
  }
  if (!Object.keys(out.annual).length) throw new Error(`no fundamentals for ${ticker}`);
  return out;
}

const COMPANIES = [
  { ticker: 'MSFT', group: 'hyperscaler' }, { ticker: 'GOOGL', group: 'hyperscaler' }, { ticker: 'AMZN', group: 'hyperscaler' },
  { ticker: 'META', group: 'hyperscaler' }, { ticker: 'NVDA', group: 'hyperscaler' }, { ticker: 'ORCL', group: 'hyperscaler' },
  { ticker: 'BA', group: 'levered' }, { ticker: 'CCL', group: 'levered' }, { ticker: 'AAL', group: 'levered' },
  { ticker: 'LUMN', group: 'levered' }, { ticker: 'CVNA', group: 'levered' }, { ticker: 'CHTR', group: 'levered' },
];

async function fetchCompanies() {
  const existing = (await readExisting('companies'))?.companies ?? [];
  const companies = [];
  for (const c of COMPANIES) {
    try {
      const px = await chart(c.ticker, '2y');
      await sleep(300);
      const f = await fundamentals(c.ticker);
      await sleep(300);
      companies.push({ ...c, name: px.name, currency: px.currency, price: px.price, priceTime: px.priceTime, dates: px.dates, close: px.close, ...f });
    } catch (e) {
      const old = existing.find((x) => x.ticker === c.ticker);
      console.warn(`     ${c.ticker}: ${e.message}${old ? ' (kept previous)' : ' (dropped)'}`);
      if (old) companies.push(old);
    }
  }
  if (!companies.length) throw new Error('no companies fetched');
  return { source: 'Yahoo Finance (price history, annual and trailing-twelve-month fundamentals as filed)', companies };
}

// ---------------------------------------------------------------- Sector ETFs
const SECTORS = [
  { ticker: 'XLK', sector: 'Technology' }, { ticker: 'XLC', sector: 'Communication Services' }, { ticker: 'XLY', sector: 'Consumer Discretionary' },
  { ticker: 'XLP', sector: 'Consumer Staples' }, { ticker: 'XLV', sector: 'Health Care' }, { ticker: 'XLF', sector: 'Financials' },
  { ticker: 'XLI', sector: 'Industrials' }, { ticker: 'XLE', sector: 'Energy' }, { ticker: 'XLB', sector: 'Materials' },
  { ticker: 'XLU', sector: 'Utilities' }, { ticker: 'XLRE', sector: 'Real Estate' },
];

async function fetchSectors() {
  const etfs = [];
  for (const s of SECTORS) {
    etfs.push({ ...s, ...(await chart(s.ticker, '10y')) });
    await sleep(300);
  }
  return { source: 'Yahoo Finance, adjusted daily closes of the SPDR sector ETFs', etfs };
}

// ---------------------------------------------------------------- Stock universe for the screener
const UNIVERSE = {
  Technology: ['AAPL', 'MSFT', 'NVDA', 'AVGO', 'ORCL', 'CRM', 'AMD', 'ADBE', 'CSCO', 'INTC'],
  'Communication Services': ['GOOGL', 'META', 'NFLX', 'DIS', 'TMUS', 'VZ', 'CMCSA'],
  'Consumer Discretionary': ['AMZN', 'TSLA', 'HD', 'MCD', 'NKE', 'SBUX', 'BKNG', 'LOW'],
  'Consumer Staples': ['WMT', 'COST', 'PG', 'KO', 'PEP', 'PM', 'MDLZ'],
  'Health Care': ['LLY', 'UNH', 'JNJ', 'ABBV', 'MRK', 'PFE', 'TMO', 'AMGN'],
  Financials: ['JPM', 'BAC', 'WFC', 'GS', 'MS', 'BLK', 'SCHW', 'AXP', 'V', 'MA'],
  Industrials: ['CAT', 'GE', 'HON', 'UNP', 'RTX', 'DE', 'LMT', 'BA', 'UPS'],
  Energy: ['XOM', 'CVX', 'COP', 'SLB', 'EOG', 'OXY'],
  Materials: ['LIN', 'APD', 'FCX', 'NEM', 'NUE'],
  Utilities: ['NEE', 'DUK', 'SO', 'CEG', 'AEP'],
  'Real Estate': ['PLD', 'AMT', 'EQIX', 'SPG', 'O'],
};
const SCREEN_FIELDS = ['TotalRevenue', 'OperatingIncome', 'NetIncome', 'EBITDA', 'FreeCashFlow', 'InterestExpense', 'TotalDebt', 'CashAndCashEquivalents', 'OrdinarySharesNumber', 'StockholdersEquity', 'DilutedEPS'];

function logRets(close) {
  const r = [];
  for (let i = 1; i < close.length; i++) r.push(Math.log(close[i] / close[i - 1]));
  return r;
}
function stdev(xs) {
  const m = xs.reduce((a, b) => a + b, 0) / xs.length;
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / (xs.length - 1));
}
const pick = (f, key) => f.quarterly[key]?.[1] ?? f.trailing[key]?.[1] ?? f.annual[key]?.slice(-1)[0]?.[1] ?? null;
const ttmOf = (f, key) => f.trailing[key]?.[1] ?? f.annual[key]?.slice(-1)[0]?.[1] ?? null;
const ratio = (a, b) => (a != null && b != null && b !== 0 && Number.isFinite(a / b) ? r4(a / b) : null);

/** Screener-ready record for one stock: valuation, growth, quality, leverage, risk and momentum. */
function screenRecord(ticker, sector, px, f, spy) {
  const shares = pick(f, 'OrdinarySharesNumber');
  const mcap = shares ? px.price * shares : null;
  const debt = pick(f, 'TotalDebt') ?? 0;
  const cash = pick(f, 'CashAndCashEquivalents') ?? 0;
  const ev = mcap != null ? mcap + debt - cash : null;
  const rev = ttmOf(f, 'TotalRevenue');
  const ebit = ttmOf(f, 'OperatingIncome');
  const ebitda = ttmOf(f, 'EBITDA');
  const ni = ttmOf(f, 'NetIncome');
  const fcf = ttmOf(f, 'FreeCashFlow');
  const intExp = ttmOf(f, 'InterestExpense');
  const revs = f.annual.TotalRevenue ?? [];
  const revGrowth = revs.length >= 2 ? ratio(revs.at(-1)[1] - revs.at(-2)[1], Math.abs(revs.at(-2)[1])) : null;
  // Market statistics on the common dates with SPY.
  const spyMap = new Map(spy.dates.map((d, i) => [d, spy.close[i]]));
  const idx = px.dates.map((d, i) => [d, i]).filter(([d]) => spyMap.has(d));
  const c = idx.map(([, i]) => px.close[i]);
  const s = idx.map(([d]) => spyMap.get(d));
  const n = Math.min(252, c.length - 1);
  const ri = logRets(c.slice(-(n + 1)));
  const rm = logRets(s.slice(-(n + 1)));
  const mi = ri.reduce((a, b) => a + b, 0) / ri.length;
  const mm = rm.reduce((a, b) => a + b, 0) / rm.length;
  let cov = 0, varm = 0;
  for (let k = 0; k < ri.length; k++) {
    cov += (ri[k] - mi) * (rm[k] - mm);
    varm += (rm[k] - mm) ** 2;
  }
  const last = px.close.length - 1;
  const at = (daysBack) => px.close[Math.max(0, last - daysBack)];
  const yr = px.close.slice(-252);
  const hi52 = Math.max(...yr), lo52 = Math.min(...yr);
  return {
    ticker, name: px.name, sector, price: px.price, priceDate: px.dates[last],
    marketCap: mcap, ev, revenueTTM: rev, ebitdaTTM: ebitda, netIncomeTTM: ni, fcfTTM: fcf,
    revGrowth, ebitMargin: ratio(ebit, rev), netMargin: ratio(ni, rev),
    pe: ni > 0 ? ratio(mcap, ni) : null, evEbitda: ebitda > 0 ? ratio(ev, ebitda) : null, fcfYield: ratio(fcf, mcap),
    psales: ratio(mcap, rev), pb: ratio(mcap, pick(f, 'StockholdersEquity')),
    netDebtEbitda: ebitda > 0 ? ratio(debt - cash, ebitda) : null, interestCoverage: intExp > 0 ? ratio(ebit, intExp) : null,
    roe: ratio(ni, pick(f, 'StockholdersEquity')),
    vol1y: r4(stdev(ri) * Math.sqrt(252)), beta1y: r4(cov / varm),
    mom12_1: r4(at(21) / at(273) - 1), ret1m: r4(px.close[last] / at(21) - 1), ret3m: r4(px.close[last] / at(63) - 1), ret12m: r4(px.close[last] / at(252) - 1),
    pos52w: r4((px.close[last] - lo52) / (hi52 - lo52)), drawdown52w: r4(px.close[last] / hi52 - 1),
  };
}

async function fetchUniverse() {
  const spyFile = await readExisting('prices');
  const spy = spyFile?.assets?.find((a) => a.ticker === 'SPY');
  if (!spy) throw new Error('prices.json with SPY is needed first');
  const existing = (await readExisting('universe'))?.stocks ?? [];
  const stocks = [];
  for (const [sector, tickers] of Object.entries(UNIVERSE)) {
    for (const ticker of tickers) {
      try {
        const px = await chart(ticker, '2y');
        await sleep(250);
        const f = await fundamentals(ticker, SCREEN_FIELDS);
        await sleep(250);
        stocks.push(screenRecord(ticker, sector, px, f, spy));
      } catch (e) {
        const old = existing.find((x) => x.ticker === ticker);
        console.warn(`     ${ticker}: ${e.message}${old ? ' (kept previous)' : ' (dropped)'}`);
        if (old) stocks.push(old);
      }
    }
  }
  if (stocks.length < 20) throw new Error(`only ${stocks.length} stocks fetched`);
  return { source: 'Yahoo Finance (prices, trailing-twelve-month and latest-quarter fundamentals as filed)', stocks };
}

// ---------------------------------------------------------------- Kalshi
const KALSHI = 'https://api.elections.kalshi.com/trade-api/v2';
const cents = (s) => (s == null || s === '' ? null : Math.round(parseFloat(s) * 100));
const num = (s) => (s == null || s === '' ? null : parseFloat(s));
// The API quotes prices as dollar strings; the models work in whole cents.
function market(m) {
  return {
    ticker: m.ticker,
    label: m.yes_sub_title ?? m.subtitle ?? m.title,
    title: m.title,
    yes_bid: cents(m.yes_bid_dollars), yes_ask: cents(m.yes_ask_dollars),
    no_bid: cents(m.no_bid_dollars), no_ask: cents(m.no_ask_dollars),
    last: cents(m.last_price_dollars), previous: cents(m.previous_price_dollars),
    yes_bid_size: num(m.yes_bid_size_fp), yes_ask_size: num(m.yes_ask_size_fp),
    volume: num(m.volume_fp), volume_24h: num(m.volume_24h_fp), open_interest: num(m.open_interest_fp),
    close_time: m.close_time, expiration_time: m.expiration_time, status: m.status,
    floor_strike: m.floor_strike ?? null, cap_strike: m.cap_strike ?? null, custom_strike: m.custom_strike ?? null,
  };
}

async function fetchKalshi() {
  const events = [];
  for (const [series, limit] of [['KXFEDDECISION', 4], ['KXCPI', 2], ['KXCPIYOY', 1]]) {
    const d = await get(`${KALSHI}/events?series_ticker=${series}&status=open&with_nested_markets=true&limit=${limit}`);
    for (const e of d.events ?? []) {
      events.push({
        series,
        event_ticker: e.event_ticker,
        title: e.title,
        sub_title: e.sub_title,
        mutually_exclusive: !!e.mutually_exclusive,
        strike_date: e.strike_date ?? null,
        markets: (e.markets ?? []).map(market),
      });
    }
    await sleep(300);
  }
  if (!events.length) throw new Error('no events');
  return { source: 'Kalshi public market data API (prices in cents)', fee: { type: 'quadratic', rate: 0.07 }, events };
}

// ---------------------------------------------------------------- Polymarket
function safeJson(s) {
  try {
    return typeof s === 'string' ? JSON.parse(s) : s ?? null;
  } catch {
    return null;
  }
}

async function fetchPolymarket() {
  const list = await get('https://gamma-api.polymarket.com/events?active=true&closed=false&limit=300&order=volume24hr&ascending=false');
  const slugs = list.filter((e) => /^fed-decision-in-/.test(e.slug ?? '')).map((e) => e.slug).slice(0, 4);
  if (!slugs.length) throw new Error('no Fed decision events found');
  const events = [];
  for (const slug of slugs) {
    const [e] = await get(`https://gamma-api.polymarket.com/events?slug=${slug}`);
    if (!e) continue;
    events.push({
      slug,
      title: e.title,
      endDate: e.endDate,
      volume: e.volume ? +e.volume : null,
      liquidity: e.liquidity ? +e.liquidity : null,
      markets: (e.markets ?? []).map((m) => ({
        question: m.question,
        groupItemTitle: m.groupItemTitle ?? null,
        outcomes: safeJson(m.outcomes),
        outcomePrices: safeJson(m.outcomePrices)?.map(Number) ?? null,
        bestBid: m.bestBid ?? null,
        bestAsk: m.bestAsk ?? null,
        spread: m.spread ?? null,
        lastTradePrice: m.lastTradePrice ?? null,
        liquidity: m.liquidityNum ?? null,
        volume: m.volumeNum ?? null,
        endDate: m.endDate ?? null,
      })),
    });
    await sleep(200);
  }
  return { source: 'Polymarket Gamma API (prices in dollars; no trading fee on these markets)', events };
}

// ---------------------------------------------------------------- TreasuryDirect auctions
const AUCTION_FIELDS = [
  'cusip', 'securityType', 'securityTerm', 'originalSecurityTerm', 'competitiveAuctionCloseDate', 'issueDate', 'maturityDate', 'reopening', 'interestRate', 'highYield',
  'medianYield', 'lowYield', 'highPrice', 'bidToCoverRatio', 'offeringAmount', 'totalAccepted', 'totalTendered',
  'allottedAtHighYieldPercentage', 'primaryDealersCompetitiveParAwarded', 'directBiddersCompetitiveParAwarded',
  'indirectBiddersCompetitiveParAwarded', 'somaAccepted', 'competitiveAccepted', 'noncompetitiveAccepted',
];

async function fetchAuctions() {
  const rows = [];
  for (const type of ['Note', 'Bond']) {
    const d = await get(`https://www.treasurydirect.gov/TA_WS/securities/auctioned?format=json&type=${type}&days=760`);
    for (const a of d) {
      const o = {};
      for (const k of AUCTION_FIELDS) {
        if (a[k] === undefined || a[k] === '') continue;
        const numeric = !(/date/i.test(k) || k === 'cusip' || k === 'reopening' || k === 'securityType' || k === 'securityTerm') && Number.isFinite(+a[k]);
        o[k] = numeric ? +a[k] : a[k];
      }
      o.auctionDate = (o.competitiveAuctionCloseDate ?? '').slice(0, 10);
      delete o.competitiveAuctionCloseDate;
      for (const k of ['issueDate', 'maturityDate']) if (o[k]) o[k] = o[k].slice(0, 10);
      rows.push(o);
    }
    await sleep(300);
  }
  if (!rows.length) throw new Error('no auctions');
  rows.sort((a, b) => (a.auctionDate < b.auctionDate ? 1 : -1));
  return { source: 'TreasuryDirect auction results', auctions: rows };
}

// ---------------------------------------------------------------- Nvidia: options chain, earnings history, peers (week 18)
// Yahoo's options endpoint needs a session cookie and a crumb.
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) GamingFinance/1.0';
async function yahooSession() {
  const r = await fetch('https://fc.yahoo.com', { headers: { 'User-Agent': BROWSER_UA }, redirect: 'manual', signal: AbortSignal.timeout(20000) });
  const cookie = (r.headers.getSetCookie?.() ?? []).map((c) => c.split(';')[0]).join('; ');
  const crumb = await get('https://query1.finance.yahoo.com/v1/test/getcrumb', { json: false, headers: { Cookie: cookie, 'User-Agent': BROWSER_UA } });
  if (!crumb || crumb.length > 40) throw new Error('no Yahoo crumb');
  return { cookie, crumb };
}

// Report dates for the straddle study (fiscal quarter, report date). Extend when a new quarter is reported.
const NVDA_EARNINGS = [
  ['FY24 Q3', '2023-11-21'], ['FY24 Q4', '2024-02-21'], ['FY25 Q1', '2024-05-22'], ['FY25 Q2', '2024-08-28'],
  ['FY25 Q3', '2024-11-20'], ['FY25 Q4', '2025-02-26'], ['FY26 Q1', '2025-05-28'], ['FY26 Q2', '2025-08-27'],
  ['FY26 Q3', '2025-11-19'], ['FY26 Q4', '2026-02-25'], ['FY27 Q1', '2026-05-20'], ['FY27 Q2', '2026-08-26'],
  ['FY27 Q3', '2026-11-17'],
];

async function fetchNvidia() {
  const px = await chart('NVDA', '5y');
  await sleep(300);
  const bench = await chart('SMH', '2y');
  await sleep(300);
  const peers = {};
  for (const t of ['AMD', 'AVGO', 'TSM', 'ARM', 'MRVL']) {
    const c = await chart(t, '1y');
    peers[t] = { name: c.name, price: c.price, dates: c.dates, close: c.close };
    await sleep(300);
  }
  const { cookie, crumb } = await yahooSession();
  const base = await get(`https://query2.finance.yahoo.com/v7/finance/options/NVDA?crumb=${crumb}`, { headers: { Cookie: cookie, 'User-Agent': BROWSER_UA } });
  const res = base.optionChain?.result?.[0];
  if (!res) throw new Error('no option chain');
  const spot = res.quote?.regularMarketPrice ?? px.price;
  const expiries = (res.expirationDates ?? []).map((e) => new Date(e * 1000).toISOString().slice(0, 10));
  // Keep the expiries that matter: everything within 10 days, then roughly monthly out to a year.
  const today = new Date().toISOString().slice(0, 10);
  const keep = [];
  let lastKept = null;
  for (const d of expiries) {
    const days = Math.round((new Date(d) - new Date(today)) / 86400000);
    if (days < 0 || days > 400) continue;
    if (days <= 10 || !lastKept || Math.round((new Date(d) - new Date(lastKept)) / 86400000) >= 25) {
      keep.push(d);
      lastKept = d;
    }
    if (keep.length >= 12) break;
  }
  const options = [];
  for (const d of keep) {
    const ts = Math.floor(new Date(`${d}T00:00:00Z`).getTime() / 1000);
    const o = await get(`https://query2.finance.yahoo.com/v7/finance/options/NVDA?date=${ts}&crumb=${crumb}`, { headers: { Cookie: cookie, 'User-Agent': BROWSER_UA } });
    const chain = o.optionChain?.result?.[0]?.options?.[0];
    if (!chain) continue;
    const mid = (x) => (x.bid > 0 && x.ask > 0 ? (x.bid + x.ask) / 2 : x.lastPrice);
    const strikes = [...new Set([...chain.calls, ...chain.puts].map((x) => x.strike))].sort((a, b) => Math.abs(a - spot) - Math.abs(b - spot));
    const atm = strikes[0];
    const call = chain.calls.find((x) => x.strike === atm);
    const put = chain.puts.find((x) => x.strike === atm);
    if (!call || !put) continue;
    const straddle = mid(call) + mid(put);
    options.push({
      expiration: d, days: Math.round((new Date(d) - new Date(today)) / 86400000), strike: atm,
      call: { bid: call.bid, ask: call.ask, mid: r4(mid(call)), iv: r4(call.impliedVolatility), oi: call.openInterest, vol: call.volume },
      put: { bid: put.bid, ask: put.ask, mid: r4(mid(put)), iv: r4(put.impliedVolatility), oi: put.openInterest, vol: put.volume },
      straddle: r4(straddle), impliedMove: r4(straddle / spot),
      totalOI: chain.calls.reduce((a, x) => a + (x.openInterest ?? 0), 0) + chain.puts.reduce((a, x) => a + (x.openInterest ?? 0), 0),
      putCallOI: r4(chain.puts.reduce((a, x) => a + (x.openInterest ?? 0), 0) / Math.max(1, chain.calls.reduce((a, x) => a + (x.openInterest ?? 0), 0))),
    });
    await sleep(250);
  }
  if (!options.length) throw new Error('no option expiries captured');
  return {
    source: 'Yahoo Finance (NVDA option chain, daily closes; SMH and peers)',
    spot, priceTime: px.priceTime, name: px.name, dates: px.dates, close: px.close,
    bench: { ticker: 'SMH', name: bench.name, dates: bench.dates, close: bench.close },
    peers, options, earnings: NVDA_EARNINGS,
  };
}

// ---------------------------------------------------------------- run
await mkdir(OUT, { recursive: true });
// Optional arguments name the snapshots to refresh, e.g. `npm run data -- fred kalshi`.
const only = new Set(process.argv.slice(2));
const want = (name) => !only.size || only.has(name);
const maybe = (name, fn) => (want(name) ? step(name, fn) : Promise.resolve(true));
const results = await Promise.all([
  maybe('fred', fetchFred),
  maybe('prices', fetchPrices).then(() => maybe('companies', fetchCompanies)).then(() => maybe('universe', fetchUniverse)),
  maybe('sectors', fetchSectors),
  maybe('kalshi', fetchKalshi),
  maybe('polymarket', fetchPolymarket),
  maybe('auctions', fetchAuctions),
  maybe('nvidia', fetchNvidia),
]);
console.log(results.every(Boolean) ? 'All snapshots refreshed.' : 'Some snapshots were not refreshed; see above.');
