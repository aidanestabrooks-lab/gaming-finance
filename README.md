# Gaming Finance

Weekly research series: one project a week analyzing a firm, a geopolitical event, or a market situation through game theory, geopolitics, and finance, written for everyday investors.

Built with [Astro](https://astro.build). Deployed to GitHub Pages on every push to `main`.

## Commands

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm install`     | Install dependencies                           |
| `npm run dev`     | Local dev server at `http://localhost:4321`    |
| `npm run build`   | Production build to `dist/`                    |
| `npm run preview` | Serve the production build locally             |
| `npm run data`    | Refresh the model data snapshots in `src/data/` |

## Publishing a project

Add a markdown file to `src/content/projects/` and push. See [src/content/README.md](src/content/README.md) for the frontmatter template.

## Model data

The interactive models take their default inputs from public data, not placeholder numbers. `scripts/fetch-data.mjs` pulls each source and writes a snapshot to `src/data/*.json`; components read the snapshots at build time through `src/lib/data.ts` and show a "Data" line naming the source and the observation date.

| Snapshot | Source | Used by |
| --- | --- | --- |
| `fred.json` | FRED: Treasury par curve (DGS1MO–DGS30), fed funds target, SOFR, CPI, core PCE, unemployment, 10y breakeven, IG and HY option-adjusted spreads, VIX, USD/JPY, Bank of Japan policy rate | Rate tree, immunization, frontier, carry trade, Fed tree, WACC inputs |
| `prices.json` | Yahoo Finance adjusted closes, 10 years: SPY, EFA, IEF, LQD, GLD | Efficient frontier, rolling stock-bond correlation, betas |
| `companies.json` | Yahoo Finance filed fundamentals (annual, TTM, latest quarter) and 2 years of prices for six hyperscalers and six levered issuers | DCF, Merton model |
| `kalshi.json` | Kalshi public API: Fed decision events (Dec, Jan, Mar, Apr) and CPI events, bid/ask in cents | Bucket arbitrage, cross-venue arbitrage, Kelly sizer, Fed tree |
| `polymarket.json` | Polymarket Gamma API: Fed decision events, bid/ask in dollars | Cross-venue arbitrage, Kelly sizer, Fed tree |
| `auctions.json` | TreasuryDirect: note and bond auction results, two years | Winner's curse |
| `sectors.json` | Yahoo Finance adjusted closes, 10 years: the eleven SPDR sector ETFs | Sector factor and momentum models |
| `nvidia.json` | Yahoo Finance: NVDA option chain (ATM straddles at 12 expiries), 5 years of closes, SMH and peer prices, report dates | Earnings straddle, event study |
| `universe.json` | Yahoo Finance prices and filed fundamentals for 80 large caps across the eleven sectors, reduced to screener metrics (valuation, growth, quality, leverage, risk, momentum) | Screener |

No API keys are needed. `npm run data -- fred kalshi` refreshes only the named snapshots. The deploy workflow runs `npm run data` before every build and also on a weekday schedule (12:30 UTC), so the live site refreshes daily even without a push. A source that fails is skipped and the committed snapshot is used for it. Run `npm run data` locally and commit `src/data/` when you want the repository's fallback snapshot brought up to date.

Three models have no data inputs by nature and say so on the page: the tariff 2×2 (ordinal payoffs), the information-cascade simulation (a theoretical model), and the export-control dynamic game (a structural model).

## Configuration

- `src/consts.ts`: site name, tagline, author, Buttondown username, disclaimer text.
- `astro.config.mjs`: `site` and `base`. When a custom domain is added, set `site` to the domain and remove `base`.
- `src/styles/global.css`: color and type tokens (light and dark).
