# Publishing a new project

Every project is one markdown file in `src/content/projects/`. The filename becomes the URL:
`week-05-example.md` is served at `/projects/week-05-example`.

To publish: add the file, commit, push to `main`. GitHub Actions builds and deploys in about two minutes.

## Frontmatter template

```yaml
---
title: "Title of the project"
date: 2026-11-20            # YYYY-MM-DD. Newest date is featured on the home page.
week: 5                     # Week number shown as a badge.
tags: [Firms, Game Theory]  # One or more of: Firms, Geopolitics, Game Theory, Markets, CFA
summary: "One or two sentences. Shown on cards, in the RSS feed, and under the title."
takeaways:
  - "First takeaway for investors."
  - "Second takeaway."
sources:
  - title: "Name of the source"
    url: https://example.com/report
charts:                     # Optional. Rendered below the body with Chart.js.
  - title: "What the chart shows"
    type: line              # line or bar
    labels: ["2022", "2023", "2024"]
    series:
      - name: "Series A"
        data: [10, 12, 15]
      - name: "Series B"
        data: [8, 9, 14]
    note: "Source and units. Keep it short."
draft: false                # true hides the project from the site and the build.
---

Body in markdown. Headings start at `##`. Images go in `public/images/` and are referenced as
`/gaming-finance/images/name.png` until a custom domain is set up (then `/images/name.png`).
```

## Interactive models (MDX)

Name the file `.mdx` instead of `.md` to embed an interactive model. Import it at the top of the body
(after the frontmatter) and drop it in where you want it:

```mdx
import PayoffMatrix from '../../components/models/PayoffMatrix.astro';

## The setup

<PayoffMatrix id="unique-id" rowPlayer="A" colPlayer="B" rows={["x","y"]} cols={["u","v"]} payoffs={[[[1,1],[0,0]],[[0,0],[1,1]]]} />
```

Available models live in `src/components/models/`:

| Component | What it does |
| --- | --- |
| `PayoffMatrix` | 2×2 normal-form game: pure and mixed Nash equilibria, best-response diagram |
| `GameTree` | Extensive-form game with chance nodes, backward induction, scenario buttons |
| `DynamicGame` | Procedurally generated three-player multi-round game with sensitivity heatmap |
| `BucketArb`, `CrossVenueArb`, `KellySizer` | Prediction-market arbitrage and sizing with Kalshi-style fees |
| `CascadeSim` | Information-cascade Monte Carlo |
| `AuctionSim` | Common-value auction and winner's curse |
| `DcfModel` | Multi-stage FCFF DCF, sensitivity grid, reverse DCF |
| `RateTree` | Binomial interest rate tree, callable bond, OAS, effective duration/convexity |
| `MertonModel` | Structural credit model: PD, spread, distance to default |
| `Frontier` | Mean-variance frontier with a stock-bond correlation slider |
| `Immunization` | Liability-driven bullet vs barbell under shifts and twists |
| `CarryTrade` | Levered carry Monte Carlo with fat tails, jumps, VaR/CVaR |
| `SectorModel` | Sector macro-factor betas, scenario forecaster, momentum backtest |
| `Screener` | 80-stock screener with filters, pillar weights, CSV export |
| `EarningsStraddle` | Option-chain implied move vs realized earnings moves, straddle P&L |
| `EventStudy` | Market-model abnormal returns and CAR around an event |
| `GreyMarket` | Inspection game for export-control leakage, break-even premium |

LaTeX works in both `.md` and `.mdx`: inline `$x^2$`, display `$$ ... $$`.

### Using the data snapshots in a page

`src/lib/data.ts` exposes the snapshots in `src/data/` (refreshed by `npm run data` and daily by the deploy workflow). In an `.mdx` file you can import it and interpolate live figures so the prose stays correct after each refresh:

```mdx
import { fred, shortDate } from '../../lib/data';
export const tenYear = fred.latest('DGS10');

The 10-year Treasury yields {tenYear.toFixed(2)}% as of {shortDate(fred.asOf('DGS10'))}.
```

Useful calls: `fred.latest(id)`, `fred.yoy('CPIAUCSL')`, `parCurve()`, `parYield(t)`, `assetStats()`, `companies.get('MSFT')` with `companySnapshot()`, `kalshi.fedDecision()`, `fedOutcomes()`, `auctions.byTerm('10-Year')`. Models that take data render a `DataNote` line with the source and date; add one to any new model via `src/components/models/DataNote.astro`.

## Rules the build enforces

- `tags` must only use the five allowed values, or the build fails with a clear error.
- `week` must be a positive whole number.
- Every `sources` entry needs a valid URL.
- `takeaways` needs at least one item.
