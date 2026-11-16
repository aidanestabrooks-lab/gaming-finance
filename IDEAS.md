# Gaming Finance: pitch backlog

Generated 2026-11-15 from a web news search (sources dated Oct 26 to Nov 15, 2026). Ten pitches for weeks 17+, ranked by strength of the news hook and the quality of free data available to drive the interactive model. Existing topics (weeks 1 to 16) were excluded: bank runs, Hormuz, Boeing/Airbus, TSMC, tariff threats, AI capex DCF, Fed decision tree, callable bonds, Kalshi arbitrage, private credit Merton, information cascades, 60/40, Treasury auction winner's curse, pension immunization, yen carry, chip export controls.

Macro backdrop at generation time: CME FedWatch prices a December 9 hike at roughly 85 to 89% for 25 bp and 11 to 15% for 50 bp after October core CPI printed 0.3% for a third month and Governor Waller said a half-point move "should be considered" ([Axios, Nov 10](https://www.axios.com/2026/11/10/federal-reserve-rate-hikes); [Investing.com, ~Nov 11](https://www.investing.com/news/economy-news/fed-rate-hike-odds-in-december-at-88-after-hot-cpi-cme-fedwatch-5017585)). Sources disagree on the 10-year: Advisor Perspectives reported 5.16% in the week to Nov 13 while Nov 9 wire reports had it near 4.87%, so pull the live DGS10 before quoting a level. Democrats swept both chambers on Nov 3 and the Nasdaq entered a correction on Nov 5 to 6 on AI/data-center fears ([CBS](https://www.cbsnews.com/news/stocks-midterm-elections-tech-companies-ai-data-centers/)).

**Publication-timing flags** are marked with a warning line under each pitch. Site publishes Fridays; next slots are Nov 20, Nov 27, Dec 4, Dec 11.

---

## 1. Marvell's $115B Bet on Lumentum: What a 17% Spread Says About China

**News hook.** Marvell agreed on Nov 2 to acquire Lumentum in an all-stock deal at a fixed 4.5 MRVL shares per LITE share, worth roughly $115B at announcement and targeted to close in 1H 2028. The spread has sat between 14% and 18.6% since announcement; merger-arb desks put implied closing odds near 50%, with Chinese regulatory approval named as the wild card and a $3.2B reverse termination fee owed by Marvell if blocked. Marvell reports Dec 1.
Sources: [Bloomberg, Nov 9](https://www.bloomberg.com/news/articles/2026-11-09/marvell-lumentum-deal-odds-near-coin-flip-as-ai-trade-shudders); [24/7 Wall St, Nov 12](https://247wallst.com/investing/2026/11/12/lumentum-trades-below-marvells-buyout-offer-is-the-gap-a-bargain/); [GuruFocus, ~Nov 10](https://www.gurufocus.com/news/9198147/marvell-stocks-fall-66-as-lumentum-deal-spread-widens-to-18).

**Angle.** Merger arbitrage as a probability extraction problem, then a three-player regulatory game (US DOJ/FTC, China SAMR, the merging firms) in which SAMR's veto is a bargaining chip in the wider chip-export conflict. Covers the risk-arb payoff identity: spread = p(break) x (offer minus break price) minus carry, so the market's 50% is only as good as the assumed break price. CFA L2 Corporate Issuers: Corporate Restructuring (M&A deal structure, exchange ratios, termination fees). CFA L3 Alternative Investments: Hedge Fund Strategies (event-driven, merger arbitrage).

**Model.** Merger-arb implied-probability calculator: inputs LITE price, MRVL price, 4.5 ratio, assumed LITE standalone (break) price, expected months to close, financing rate (SOFR), reverse termination fee. Outputs implied p(close), annualized spread return if closed, loss if broken, and a sensitivity surface over break price x time. Second panel: regulatory game tree in which SAMR chooses approve / approve-with-remedies / block and the US chooses to link or not link approval to export-control concessions. Data: Yahoo Finance `MRVL`, `LITE` daily closes; FRED `SOFR`; SEC EDGAR 8-K and merger agreement (Marvell CIK 1058057, Lumentum CIK 1633978). No Kalshi/Polymarket contract found on this deal.

**Takeaway.** A 17% spread on an all-stock deal is not a 17% return; it is the market saying there is a coin-flip chance you end up long Lumentum at whatever price it falls to without a bid.

*Flag:* Spread will move on Marvell's Dec 1 earnings and on any SAMR filing news, but the deal itself cannot resolve before publication.

---

## 2. The AI Bond Deluge: Who Pays When Hyperscalers Compete With the Treasury

**News hook.** Microsoft priced $25B of notes on Oct 29 and Meta sold $15B in USD plus €9B on Nov 4; five hyperscaler deals since Oct 29 total about $67B. Big Tech bonds now trade at the widest gap over other high-grade debt since 2003, hyperscaler 10-year spreads are about 50 bp wider on the year, S&P cut Meta's outlook, Oracle sits one notch above junk with CDS far above peers, and Goldman projects $420B of hyperscaler issuance in 2027 versus $250B in 2026. Analysts increasingly cite AI borrowing as a third driver of the sovereign bond selloff alongside inflation and term premium.
Sources: [TNW, Nov 4](https://thenextweb.com/news/meta-15b-bond-sale-higher-yields-euro-debut); [FourWeekMBA tally, early Nov](https://fourweekmba.com/ai-five-hyperscaler-bond-deals-raise-66-9b-oracle-pays-8-65/); [Forbes, Nov 6](https://www.forbes.com/sites/jasonkirsch/2026/11/06/tight-credit-spreads-are-hiding-the-next-refinancing-problem/); [Indmoney on the selloff](https://www.indmoney.com/blog/us-stocks/global-bond-market-selloff).

**Angle.** Supply-driven spread widening and crowding out: the long end has to absorb Treasury supply, hyperscaler supply, and a Fed that is hiking. Issuers face a timing game (issue now at a known spread versus wait and risk both higher base rates and a wider spread), which resembles a war of attrition where every issuer's optimal move is to go first, flooding the same week. CFA L2 Fixed Income: Term Structure and Interest Rate Dynamics (term premium), Credit Analysis Models (structural vs reduced-form, spread decomposition). CFA L3 Fixed Income: Credit Strategies (spread curves, sector rotation).

**Model.** Spread decomposition dashboard: plot AAA, single-A and BBB OAS against the 10-year ACM term premium and issuance proxies, regress spread changes on issuance, and let the user stress "2027 issuance = $420B" to see implied spread and the price hit on a 30-year 5% hyperscaler bond (duration x spread change). Second panel: an N-issuer timing game showing why simultaneous issuance is the equilibrium. Data: FRED `BAMLC0A1CAAA`, `BAMLC0A2CAA`, `BAMLC0A4CBBB`, `BAMLC0A0CM` (ICE BofA OAS), `THREEFYTP10` (ACM term premium), `DGS10`, `DGS30`; SEC EDGAR 424B2 prospectus supplements for the Oct 29 to Nov 4 deals (Microsoft CIK 789019, Meta 1326801, Oracle 1341439); FINRA TRACE free delayed bond prices for individual CUSIPs; Yahoo `MSFT`, `META`, `ORCL` for equity context.

**Takeaway.** The same capex that showed up in the Week 6 reverse DCF now shows up in your bond fund as 30-year paper, and the spread you are being paid for it has widened 50 bp while the equity story has not changed.

---

## 3. Gold Below $4,000: Real Yields Versus the Central Bank Bid

**News hook.** Spot gold fell under $4,000 on Nov 12, roughly 25 to 30% below its Jan 29 peak of $5,595, as the dollar hit a 19-month high and December hike odds rose. In the same week the World Gold Council reported central banks bought 321 t in Q3, up 42% year on year and the fifth-largest quarter on record; Goldman cut its year-end target to $4,150.
Sources: [Streetwise Reports, Nov 13](https://www.streetwisereports.com/article/2026/11/13/central-bank-gold-buying-surges-42-as-prices-dip-below-us-4-000.html); [Mitrade, Nov 13](https://www.mitrade.com/insights/commodity-analysis/gold/gold-one-year-low-central-banks-20261113J1040); [Kitco/WGC, Nov 3](https://www.kitco.com/news/article/2026-11-03/gold-demand-remains-near-record-highs-central-bank-buying-surges-42-wgc).

**Angle.** Gold as a zero-coupon real bond of infinite maturity: price should fall when 10-year TIPS yields rise, and the gap between the real-yield fair value and the actual price measures the official-sector premium. Central bank diversification is a coordination game: each reserve manager gains from leaving the dollar only if enough others do, which produces the slow accumulation and the occasional air pocket. CFA L2 Alternative Investments: Commodities and Commodity Derivatives (theories of futures returns, roll). CFA L2 Economics: Currency Exchange Rates (real rate differentials). CFA L3 Asset Allocation: inflation-hedging assets.

**Model.** Rolling regression of log gold on 10-year real yield and the broad dollar index, fit on 2006 to 2021, then projected forward to show the "official sector wedge" that opened in 2022 and how much of the 2026 drawdown is real-yield driven versus wedge compression. Slider for assumed quarterly central bank tonnes. Data: FRED `DFII10` (10y TIPS), `DTWEXBGS` (broad dollar), `T10YIE` (breakevens); Yahoo Finance `GC=F` or `GLD` for price (FRED's LBMA gold series were discontinued, so do not rely on `GOLDAMGBD228NLBM`); World Gold Council Gold Demand Trends Q3 2026 for official purchases (free with registration).

**Takeaway.** If you own gold as an inflation hedge you have been short real yields the whole time, and the only reason the drawdown is 25% rather than 40% is a buyer who is not reading the same model you are.

---

## 4. France at 150 bp: Budget Brinkmanship Priced as a Sovereign Spread

**News hook.** The 10-year OAT-Bund spread closed at 151.8 bp on Nov 13 with the OAT at 4.89%, down from a 174.6 bp peak on Oct 22 (highest since the early 2000s) but far above the 86 bp of early September. The revenue half of the 2027 budget passed its first National Assembly vote on Nov 3 after a two-week delay; the target is a 5.0% deficit in 2027 against 5.4% expected in 2026, with debt near 119% of GDP. Moody's holds Aa3 negative; S&P and Fitch A+.
Sources: [OAT-Bund tracker, Nov 13](https://www.ideal-investisseur.fr/en/markets/oat-bund-spread.html); [Admiral Markets, late Oct](https://admiralmarkets.com/analytics/traders-blog/oat-bund-spread-france-euro); [CNBC, Sep 24 background](https://www.cnbc.com/2026/09/24/france-budget-debt-deficit-government.html).

**Angle.** Debt sustainability arithmetic (r minus g, primary balance, snowball effect) meets a game of chicken between a minority government and opposition blocs that each prefer the other to swerve. The market spread is the probability-weighted cost of nobody swerving, and the ECB's implicit backstop (TPI) changes the payoffs for everyone. CFA L2 Fixed Income: Credit Analysis Models (sovereign application); CFA L2 Economics: Economic Growth (g in r minus g); CFA L3 Capital Market Expectations (fiscal policy and yields).

**Model.** Debt-dynamics simulator: debt/GDP path over 10 years given r (live OAT yield), nominal g, primary balance, and a spread-feedback term where each 50 bp of spread raises r on the rolled share of debt; plus a two-player chicken matrix (government concedes / holds, opposition censures / abstains) with a slider for the ECB's probability of intervening that shifts the equilibrium. Data: FRED `IRLTLT01FRM156N` and `IRLTLT01DEM156N` (monthly 10y France and Germany), ECB Data Portal for daily benchmark yields, Eurostat `gov_10dd_edpt1` (debt, deficit), World Bank `GC.DOD.TOTL.GD.ZS` and `NY.GDP.MKTP.KD.ZG`, Agence France Tresor auction results.

**Takeaway.** France is not Greece, but at 150 bp the market has stopped pricing a government that passes a budget and started pricing one that survives it, and the difference compounds through the roll of 119% of GDP.

*Flag:* Budget votes run through December and a no-confidence motion or rating action could land before publication; one source claimed an S&P review on Nov 27 but that could not be verified against S&P's 2026 calendar and may be a carry-over from 2025.

---

## 5. The Local Veto: Data Center Moratoria as a Siting Game

**News hook.** Voters decided 47 data center measures in 2026 across ten states, most of them on Nov 3; one tracker counts limits passing in 40 of 41 local votes, with four more due in December. New York's governor signed a one-year moratorium on projects over 50 MW, Texas and Ohio governors-elect campaigned on moratoria, and Nasdaq's Nov 5 to 6 correction was attributed partly to fears that the new Congress and local vetoes slow the buildout. Electricity bills were the dominant stated reason.
Sources: [Ballotpedia, Nov 15](https://news.ballotpedia.org/2026/11/15/voters-have-decided-on-47-measures-related-to-data-centers-in-2026-in-december-they-will-consider-four-more/); [Forbes, Nov 4](https://www.forbes.com/sites/zacharyfolk/2026/11/04/heres-where-voters-are-rejecting-data-centers-at-the-ballot-full-list/); [Renewable Energy World](https://www.renewableenergyworld.com/energy-business/policy-and-regulation/voters-overwhelmingly-rejected-data-centers-in-the-midterms-heres-where-developers-will-have-a-tough-time/); [CBS on the selloff](https://www.cbsnews.com/news/stocks-midterm-elections-tech-companies-ai-data-centers/).

**Angle.** Siting as a game between a developer and many jurisdictions: each county's rational move is to capture tax base while exporting grid costs, until ratepayers coordinate to veto. Developers hold a real option to relocate; the value of that option falls as the number of willing jurisdictions shrinks, which is a direct hit to the capex plans the Week 6 DCF assumed. CFA L2 Corporate Issuers: Capital Investments and Capital Allocation (real options, abandonment and timing). CFA L2 Economics: externalities and public goods (common-pool grid).

**Model.** Two panels. First, a state-level map of retail electricity price change since 2022 against data center load additions, with a regression users can toggle. Second, an N-jurisdiction siting game: developer picks a site, each jurisdiction votes allow/ban with a payoff of tax revenue minus an electricity pass-through cost scaled by local load; show how the equilibrium count of open jurisdictions falls as pass-through rises, and value the developer's relocation option under each regime. Data: EIA-861M monthly retail electricity price by state via EIA API v2 (`electricity/retail-sales`), FRED `APU000072610` (average US electricity price per kWh) and `CUSR0000SEHF01` (electricity CPI), EIA-860M for planned generation, Ballotpedia measure list, FERC/EIA interconnection queue summaries (free, Lawrence Berkeley "Queued Up"). No free series for data-center-specific load by county; say so and use state-level proxies.

**Takeaway.** The binding constraint on AI capex is turning out to be a county commission, not a GPU supplier, and a project that cannot find a grid is a real option that expired worthless.

*Flag:* Four more local measures vote in December; the hook strengthens rather than expires.

---

## 6. OPEC+ and the 2027 Quota: A Cartel's Repeated Game With Missing Capacity

**News hook.** OPEC+ held December output steady for a third month on Nov 1 and deferred the hard decision to the full 21-member meeting on Nov 29: setting 2027 baselines while roughly 2 mb/d of voluntary cuts expire at year-end, and while the capacity audit that was supposed to anchor those baselines has been disrupted by the Iran war. Gulf producers are still pumping below quota with exports at 60 to 80% of normal; Brent settled at $117.64 on Oct 30.
Sources: [bne IntelliNews, Nov 2](https://www.intellinews.com/opec-holds-december-output-steady-as-2027-call-looms-480729); [OPEC press release, Nov 1](https://opec.org/pr-detail/2033620-1-november-2026.html); [Nasdaq, Nov 2](https://www.nasdaq.com/press-release/oil-enters-november-opec-holding-steady-and-five-producers-set-report-2026-11-02).

**Angle.** A cartel is a repeated prisoner's dilemma sustained by trigger strategies; the discount factor needed to sustain cooperation rises when members disagree about each other's capacity, because cheating becomes hard to distinguish from inability. The 2027 baseline fight is a bargaining game over the reference point for all future cheating. CFA L1/L2 Economics: Firms and Market Structures (oligopoly, cartel stability, Cournot). CFA L2 Alternative Investments: Commodities (contango/backwardation, roll yield in a war-disrupted curve).

**Model.** Cournot cartel simulator with N members, each with a capacity estimate and a true capacity the user can set; compute the cooperative quota, the one-shot defection payoff, and the critical discount factor for a grim-trigger equilibrium; show how uncertainty about capacity widens the range of undetectable cheating and lowers the sustainable price. Overlay the live Brent curve. Data: EIA STEO Table 3a (OPEC crude production by country, monthly), EIA API v2 `steo` series, FRED `DCOILBRENTEU`, `DCOILWTICO`, `POILBREUSDM`; OPEC Monthly Oil Market Report secondary-source production tables (free PDF); JODI oil database for exports.

**Takeaway.** The quota announced on Nov 29 matters less than whether members believe each other's capacity numbers, because a cartel that cannot verify cheating cannot punish it, and a price above $100 is the cheater's reward.

*Flag:* **Resolves Nov 29.** A Nov 27 publication would run two days before the meeting (ideal); a Dec 4 publication would need to be reframed as a post-mortem on the announced baselines.

---

## 7. Nvidia Without Jensen: Pricing Key-Person Risk Into an Earnings Straddle

**News hook.** Nvidia's board accepted Jensen Huang's resignation on Nov 11 and named CFO Colette Kress interim CEO with Harvey Jones as first-ever board chair, per an 8-K filed Nov 12; the resignation came amid reported personal allegations and an FT report that the board approached Arm's Rene Haas. Shares are more than 30% off the October peak. Fiscal Q3 2027 results are due Nov 17 after the close, consensus about $109B revenue against $108B guidance.
Sources: [SEC 8-K, Nov 12](https://www.sec.gov/Archives/edgar/data/0001045810/000104581026000082/nvidiaannouncesceotransiti.htm); [CNBC live blog, Nov 12](https://www.cnbc.com/2026/11/12/nvidia-jensen-huang-ceo-live-updates.html); [Motley Fool preview, Nov 15](https://www.fool.com/investing/2026/11/15/nvidia-reports-earnings-on-nov-17-2026-heres-what-investors-should-be-watching/).

**Angle.** Two layered uncertainties: the earnings print (a known-date event) and succession (an unknown-date event). Options prices around Nov 17 embed both, so the implied move minus the historical earnings-only move estimates what the market charges for key-person risk. The CEO search is a signaling game: an external hire signals the board thinks the strategy needs changing, an internal one signals continuity, and the board knows the market reads it that way. CFA L2 Derivatives: Valuation of Contingent Claims (implied volatility, straddle pricing). CFA L2 Equity: Equity Valuation applications (event studies, abnormal returns).

**Model.** Earnings-move calculator: pull the nearest-expiry NVDA straddle, back out the implied move, compare with the realized move on each of the last 12 earnings dates, and decompose the excess into a succession premium; plus an event-study panel computing cumulative abnormal return since Nov 11 against a semiconductor basket. Data: Yahoo Finance `NVDA` option chain (free via yfinance; CBOE delayed quotes as backup), `SOXX`/`SMH` for the benchmark, SEC EDGAR 8-K for the governance timeline, Nvidia IR for historical earnings dates.

**Takeaway.** The straddle tells you what the market will pay to not know something; when the thing you do not know is who runs the company, the price of that ignorance is a line item you can read off the chain.

*Flag:* **Earnings resolve Nov 17**, before the Nov 20 slot. Reframe for publication as "what the straddle said versus what happened," with the succession premium as the persistent half of the story. If a permanent CEO is named before publication, the signaling section becomes the lead.

---

## 8. Floating-Rate Borrowers Meet a Hiking Fed: The Creditor-on-Creditor Game

**News hook.** Private credit defaults hit a record 6.3% for the 12 months to September while syndicated leveraged loan defaults run 4.5 to 5%; high-yield spreads remain near historic tights even as floating-rate borrowers absorb a Fed that is hiking, not cutting. Liability management exercises are the dominant restructuring tool, yet an Oxford study found more than 80% of 89 LMEs re-defaulted within 36 months, lenders who lose the fight recover about 14 cents, and cooperation agreements have become the lenders' main weapon.
Sources: [Forbes, Nov 6](https://www.forbes.com/sites/jasonkirsch/2026/11/06/tight-credit-spreads-are-hiding-the-next-refinancing-problem/); [Columbia Law Blue Sky, Oct 28](https://clsbluesky.law.columbia.edu/2026/10/28/liability-managements-limited-runway-corporate-restructuring-today-2/); [Alternative Credit Investor, Jul 1 background](https://alternativecreditinvestor.com/2026/07/01/creditor-on-creditor-violence-heats-up-as-lenders-weaponise-co-ops/).

**Angle.** An uptier LME is a prisoner's dilemma among lenders: each is better off joining the priming group if others do, and worse off holding out alone, so the sponsor can extract value from the minority even when every lender would prefer no LME at all. A cooperation agreement is a commitment device that converts the dilemma into a bargaining game. Distinct from the Week 10 Merton model, which priced default; this prices the fight over recovery. CFA L2 Fixed Income: Credit Analysis Models (recovery rates, loss given default); CFA L1 Fixed Income: covenants and priority; CFA L3 Fixed Income: Credit Strategies (liquidity and tail risk in loans).

**Model.** Two panels. First, an interest-coverage stress tool: input a borrower's EBITDA, leverage, and SOFR spread, then sweep SOFR through the December and March hike paths to show when coverage falls below 1.0x. Second, an N-lender LME game: payoffs for join/hold-out with a slider for the share the sponsor needs, showing the equilibrium participation rate and how a co-op agreement (binding threshold) shifts recovery from the sponsor back to lenders. Data: FRED `SOFR`, `BAMLH0A0HYM2` (HY OAS), `BAMLH0A3HYC` (CCC OAS), `BAMLH0A2HYB`, `DRTSCILM` (SLOOS tightening); Fed Financial Stability Report (Nov edition) for private credit figures; Kalshi `KXFEDDECISION-26DEC` for hike odds. No free transaction-level LME dataset exists (PitchBook LCD and Octus are paywalled); use individual SEC 8-K filings for case examples.

**Takeaway.** When the Fed hikes into a floating-rate loan book, the question is not whether borrowers default but which lenders get primed first, and the spread you were paid did not include a seat at that table.

---

## 9. Locked In at 3%: The Mortgage Rate Gap as a Real Option

**News hook.** Freddie Mac's 30-year average was 7.11% for the week of Nov 12 (6.24% a year earlier); daily lender sheets moved to about 7.50% over the weekend as the December hike was priced; single-family starts fell to 859k in September; most forecasters expect 7%+ through year-end.
Sources: [Freddie Mac PMMS](https://www.freddiemac.com/pmms); [FingerLakes1 rate roundup, Nov 15](https://www.fingerlakes1.com/2026/11/15/mortgage-rates-today-november-15-2026-30-year-average-at-7-11/); [Mortgage Daily forecast, week of Nov 16](https://www.mortgagedaily.com/mortgage-rate-forecast/week-of-november-16-2026/).

**Angle.** A homeowner with a 3% fixed mortgage owns a deep-in-the-money liability that disappears if they move; staying put is exercising a real option whose value equals the PV of the rate differential over the expected remaining tenure. Aggregated, this is why existing-home supply collapses and why MBS investors see prepayment speeds near zero (extension risk, the mirror of the Week 8 negative convexity). CFA L2 Fixed Income: Asset-Backed Securities (prepayment, extension and contraction risk); CFA L2 Corporate Issuers: real options (timing and abandonment).

**Model.** Lock-in value calculator: inputs existing rate, balance, remaining term, current market rate, expected years until forced move; outputs the PV of the lock-in subsidy and the break-even home-price gain needed to justify moving. Second panel: distribution of outstanding mortgage rates from FHFA's National Mortgage Database with a slider for the market rate, showing the share of borrowers with a lock-in value above X and the implied sidelined inventory. Data: FRED `MORTGAGE30US`, `MORTGAGE15US`, `HOUST1F`, `EXHOSLUSM495S` (existing home sales), `MSPUS` (median price), `DGS10`; FHFA National Mortgage Database aggregate statistics (free CSV, outstanding loans by rate bucket); Kalshi `KXFEDDECISION-26DEC`.

**Takeaway.** If your mortgage is at 3% and the market is at 7%, you are holding one of the best fixed-income positions of the decade, and the housing market is illiquid because millions of people have correctly refused to sell it.

---

## 10. CLARITY in the Lame Duck: Legislative Passage as a Sequential Veto Game

**News hook.** Polymarket priced the CLARITY Act becoming law in 2026 at about 3% on Nov 6 (down from 82% in February) after a Senate cloture vote failed 49 to 50 on Sep 15 and Democrats swept Congress on Nov 3; House Democrats are reportedly drafting a rival bill that expands SEC oversight and narrows the CFTC. Meanwhile the GENIUS Act is law and the OCC's final stablecoin rule takes effect Jan 18, 2027.
Sources: [DeFi Rate, ~Nov 6](https://defirate.com/news/senate-gop-drops-new-crypto-bill-draft-as-odds-of-passing-stagnate/); [Crypto Briefing, ~Nov 11](https://cryptobriefing.com/house-democrats-sec-crypto-market-structure-bill/); [NPR, Sep 15 background](https://www.npr.org/2026/09/15/nx-s1-5968711/clarity-act-crypto-senate-vote).

**Angle.** Legislation is a sequential game with multiple veto players (House, Senate filibuster pivot, President); the lame duck changes the discount factor because the next Congress rewrites the status quo. SEC versus CFTC jurisdiction is a bureaucratic turf contest in which each agency's payoff rises with ambiguity. Prediction markets give a live probability to check against a structural estimate. CFA L1/L2 Alternative Investments: Introduction to Digital Assets; CFA L3: regulatory risk in alternative allocations.

**Model.** Veto-player passage calculator: user sets P(House passes), P(60 Senate votes), P(sign) for the lame-duck window and for the 2027 Congress, then compares the structural probability with the Polymarket price; second panel shows stablecoin supply growth against 3-month T-bill yields as the GENIUS Act implementation nears. Data: Polymarket (search "CLARITY Act law 2026"; exact slug not verified), Kalshi crypto market-structure contract (pricing 21% by 2028 on Nov 5), DefiLlama stablecoins API (free), FRED `WTB3MS`, SEC EDGAR 10-Q for Circle (`CRCL`) reserve composition, Congress.gov for H.R. 3633 status.

**Takeaway.** A 3% market on a bill that was 82% in February is a lesson in how a single cloture vote and an election can reprice a regulatory regime, and the stablecoin rules that did pass are now the only crypto law that matters for 2027.

*Flag:* Lame-duck session runs to roughly Jan 3, 2027; a surprise floor vote is possible but priced at 3%. Data is the weakest of the ten (no free series for the bill itself beyond prediction markets).

---

## Also considered, not pitched

- **BoJ December hike and the USD/JPY 160 line as a war of attrition** ([FXStreet, Nov 13](https://www.fxstreet.com/news/bank-of-japan-set-to-hike-in-december-why-the-japanese-yen-is-still-weakening-anyway-202611131247)). Fresh hook, good data (FRED `DEXJPUS`, MoF monthly intervention releases), but overlaps heavily with Week 15. Revisit if intervention actually happens.
- **US-China truce extension to Jan 10, 2027** and the Section 301 exclusion fight. Overlaps with Weeks 5 and 16.
- **Fed 25 vs 50 on Dec 9.** Already covered as a decision tree in Week 7; the Kalshi `KXFEDDECISION-26DEC` series is referenced in pitches 8 and 9 instead.
- **Treasury selloff and term premium.** Folded into pitch 2 via `THREEFYTP10` rather than run alone; sources conflict on the 10-year level this week.
- **Taiwan carrier drills and late-November local elections.** Single-source Substack reporting only; TSMC covered in Week 4.
