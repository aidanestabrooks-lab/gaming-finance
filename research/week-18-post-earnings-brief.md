# Week 18 post-earnings pass: brief

Written November 16, 2026. To run on the evening of **Wednesday November 18, 2026** (after the US close), or the first session after that. Nvidia reports fiscal 2027 Q3 after the close on Tuesday November 17; the article `src/content/projects/week-18-nvidia-without-jensen.mdx` was written before the report and needs an honest post-mortem.

A one-time cloud routine for this was attempted on November 16 and refused because the Claude account has no GitHub connection (error `github_token_missing`). Either connect GitHub at https://claude.ai/connect-github and schedule it again, or run this brief in a local session.

## Pre-print numbers to preserve (from the committed `src/data/nvidia.json`, Nov 16 close)

| Item | Value |
|---|---|
| Spot | 160.34 |
| ATM straddle expiring 2026-11-18 (2 days) | \$14.25, 8.89% of spot |
| ~90-day expiry (2027-02-19) ATM implied vol | 52.2% |
| Implied one-day earnings move (90-day diffusion stripped out) | ~8.6% |
| Historical average absolute next-day earnings move | ~5.5% |
| Event-study CAR since Nov 11 vs SMH (Nov 16 snapshot) | ~−2.8%, ~−\$120bn, not significant |

Do not lose these before refreshing the snapshot: after the print, the component's "first expiry after the report" is a post-print weekly that prices diffusion only, so its implied-earnings-move readout becomes meaningless.

## Step 1: facts to gather (cite every source: publication, headline, URL, date)

1. FY27 Q3 results: revenue, data-center revenue, gross margin, Q4 guidance, buyback, China and H200 commentary, who presented the call (interim CEO, CFO Colette Kress). Primary source: Nvidia's press release (nvidianews.nvidia.com / investor.nvidia.com).
2. Stock reaction: Nov 17 close, Nov 18 open and close, the one-day move; what the option chain's implied vol did (IV crush, straddle outcome). ARM, AMD and SMH on Nov 18.
3. Succession, Nov 16 to 18: board statements, interim or permanent CEO, search firm, Rene Haas or Colette Kress news, reinstatement campaign (Gerstner/Baker letter, standwithjensen petition count), Bessent's ten-day deadline (runs to about Nov 25), the Wachtell/Joon Kim investigation, congressional testimony dates, anything said on the call about the search.
4. Grey market and export controls, Nov 16 to 18: BIS/Commerce actions, DOJ cases, Beijing's H200 import approvals, Reuters grey-market quotes, Singapore/Malaysia enforcement, Megaspeed.

## Step 2: refresh data and build

`npm ci`, then `npm run data` (each source fails independently; the Nvidia step must succeed; retry, then `npm run data -- nvidia`). Confirm `src/data/nvidia.json` has a 2026-11-18 close and that `earningsMoves()` in `src/lib/data.ts` yields a row for the '2026-11-17' report (FY27 Q3 in `NVDA_EARNINGS`, `scripts/fetch-data.mjs`). `npm run build` with zero errors.

## Step 3: edit the article

Rules: remark-math is on, so literal dollar signs in prose are `\$`. Keep the frontmatter schema; do not change `date`, `week`, `tags`. Keep the voice and length (about 2,300 to 2,600 words). Keep live expressions; add fixed numbers only for historical facts.

- **What the market pays for not knowing.** Record the pre-print numbers as the stated prior (a `priorImplied`/`priorStraddle` prop on `EarningsStraddle.astro` so the first stat panel shows pre-print implied vs realized, or hard-code them in prose). Rewrite as a post-mortem: what the chain implied (~8.6% one-day, \$14.25 straddle at 160.34), what the stock did, who won the straddle and by how much, and what the ~90-day implied vol did after the print. The thesis is that the long-dated premium is key-person risk and should not fall on earnings; say plainly if it did. Replace the `{reported && (...)}` paragraph with plain prose and real numbers (its expression recomputes from the post-print snapshot and would be wrong).
- **What the market has already charged.** Update the prose to the current CAR and what earnings day added or removed; the component refreshes itself.
- **Reinstating him, or not** and **The candidates.** Fold in Nov 16 to 18 developments; a named interim/permanent CEO, search firm, or anything ruled in or out goes at the top of the section. Change GameTree payoffs or scenarios only if a reported fact replaces an assumption, and say so in the note.
- **The grey market.** New facts in the right paragraph, with sources.
- **What to watch.** Drop the Nov 17 item; add what is now next with dates. Update **What this means for investors** only where the report changed the argument.
- Frontmatter `summary`/`takeaways` only if a fact makes them stale (e.g., a CEO named). Add new sources to `sources`.
- Append "Post-earnings notes (Nov 18, 2026)" to `research/week-18-nvidia.md`: every fact used with URL, plus a "Not verified" list.

## Step 4: verify

`npm run build` clean. In `dist/projects/week-18-nvidia-without-jensen/index.html`: no `NaN`, `undefined`, `null`, `Infinity` in rendered text; the earnings table has a Nov 17 row; no leftover future-tense pre-print phrasing ("the November 17 print", "expiring just after", "before the print" in present tense); no stray `<span class="katex">` around a dollar amount.

## Step 5: ship

Commit article, research notes, component changes and refreshed `src/data/*.json` on main: "Week 18: post-earnings update after the Nov 17 report". Push; `.github/workflows/deploy.yml` deploys to https://aidanestabrooks-lab.github.io/gaming-finance/. Report: what the print said, stock vs implied, what changed in the article, what could not be verified, commit hash.
