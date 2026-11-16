---
title: "Bank Runs Are Coordination Games"
date: 2026-07-31
week: 1
tags: [Markets, Game Theory]
summary: "A bank run is not a verdict on a bank's solvency. It is a coordination failure among depositors. Silicon Valley Bank lost over $40 billion of deposits in one day in March 2023 and expected to lose another $100 billion the next morning, with a capital ratio above its peers. The Diamond-Dybvig model explains why that can happen, why deposit insurance stops it, and which numbers in a bank's filings tell you whether it is playing the dangerous version of the game."
takeaways:
  - "A bank can be solvent and still fail. SVB's common equity tier 1 ratio was 12 percent, 200 basis points above its peer group, the week it died. Capital measures the loan book; it does not measure the depositors' beliefs about each other."
  - "The number to watch is the share of uninsured deposits. SVB's was about 94 percent at year-end 2022, more than double the large-bank average. Uninsured depositors are the only ones still playing the run game."
  - "Deposit insurance works by changing payoffs, not by adding cash. The March 12, 2023 systemic risk exception made all SVB and Signature depositors whole and the run stopped. Any change to the coverage limit re-prices the game for every bank at once."
  - "Concentrated, connected depositor bases run faster. SVB's venture-backed clients coordinated through social media in hours. Millions of unrelated retail households cannot. That franchise value does not appear in any capital ratio."
  - "Deposit betas are the slow-motion version of the same game. Community banks had passed through 46.9 percent of the Fed's hikes by the first quarter of 2024 and were still raising rates after the hikes stopped. Betas keep rising after a scare because the funding has been repriced."
sources:
  - title: "FDIC: Deposit Insurance at a Glance"
    url: https://www.fdic.gov/resources/deposit-insurance/
  - title: "Federal Reserve: Review of the Federal Reserve's Supervision and Regulation of Silicon Valley Bank"
    url: https://www.federalreserve.gov/publications/review-of-the-federal-reserves-supervision-and-regulation-of-silicon-valley-bank.htm
  - title: "Federal Reserve: Review of the Federal Reserve's Supervision and Regulation of Silicon Valley Bank, full report (PDF, April 28, 2023)"
    url: https://www.federalreserve.gov/publications/files/svb-review-20230428.pdf
  - title: "Federal Reserve: Testimony of Vice Chair for Supervision Michael S. Barr, March 28, 2023"
    url: https://www.federalreserve.gov/newsevents/testimony/barr20230328a.htm
  - title: "California DFPI: Order Taking Possession of Property and Business, Silicon Valley Bank (March 10, 2023)"
    url: https://dfpi.ca.gov/wp-content/uploads/sites/337/2023/03/DFPI-Orders-Silicon-Valley-Bank-03102023.pdf
  - title: "Joint Statement by the Department of the Treasury, Federal Reserve, and FDIC (March 12, 2023)"
    url: https://www.federalreserve.gov/newsevents/pressreleases/monetary20230312b.htm
  - title: "Diamond, D. W. and Dybvig, P. H. (1983). Bank Runs, Deposit Insurance, and Liquidity. Journal of Political Economy 91(3), reprinted by the Federal Reserve Bank of Minneapolis"
    url: https://www.minneapolisfed.org/research/quarterly-review/bank-runs-deposit-insurance-and-liquidity
  - title: "GAO-23-106736: Preliminary Review of Agency Actions Related to March 2023 Bank Failures (April 28, 2023)"
    url: https://www.gao.gov/products/gao-23-106736
  - title: "Federal Reserve Bank of New York, Liberty Street Economics: Deposits and the March 2023 Banking Crisis, A Retrospective (March 27, 2024)"
    url: https://libertystreeteconomics.newyorkfed.org/2024/03/deposits-and-the-march-2023-banking-crisis-a-retrospective/
  - title: "Federal Reserve Bank of Kansas City: Community Bank Deposit Pricing Becoming More Sensitive as Policy Rates Remain Stable (May 28, 2024)"
    url: https://www.kansascityfed.org/banking/community-banking-bulletins/highlight-community-bank-deposit-pricing-becoming-more-sensitive-as-policy-rates-remain-stable/
---

## The setup

A bank takes deposits that can be withdrawn on demand and uses them to fund loans and securities that cannot be sold quickly at full value. That mismatch is the entire business model. It is also the entire problem. On any given day, no bank can repay every depositor at once, however good its assets are.

That turns the decision to withdraw into a game between depositors. If the others stay, the bank survives, the assets pay off, and staying is the better choice. If the others run, the bank is forced to sell assets at a discount, the last depositors out take the loss, and running first is the better choice. Both outcomes are self-fulfilling. The quality of the loan book barely enters.

Silicon Valley Bank is the clearest modern case. On March 8, 2023, the holding company announced it had sold \$21 billion of available-for-sale securities at a \$1.8 billion after-tax loss and was trying to raise \$2.25 billion of capital. On March 9, depositors withdrew over \$40 billion. By the close of business that day the bank had a negative cash balance of about \$958 million. On the evening of March 9 management told supervisors it expected over \$100 billion more to leave on March 10. The two days together would have removed roughly 85 percent of the deposit base. The California Department of Financial Protection and Innovation closed the bank on the morning of March 10 and appointed the FDIC as receiver.

The loans did not change that week. The beliefs did.

## The game, formally

Diamond and Dybvig wrote the canonical model in 1983. Depositors do not know in advance when they will need cash. A bank pools their deposits, invests in a long-term asset that pays more if held to maturity than if liquidated early, and promises to pay anyone who shows up. That contract is valuable: it gives every depositor liquidity insurance that no individual could buy alone. The paper's abstract states the cost in one sentence. Demand deposit contracts that provide liquidity "have multiple equilibria, one of which is a bank run."

A worked example makes the structure visible. Two depositors each hold \$100 at a bank. The bank holds \$200 of loans. Held to maturity the loans pay \$240. Sold today they fetch \$140, a 30 percent haircut. Depositors are served in the order they arrive.

| Depositor A's payoff | B stays | B runs |
| --- | --- | --- |
| **A stays** | \$120 | \$68 |
| **A runs** | \$100 | \$70 (expected) |

If both stay, each receives \$120 at maturity. If A runs and B stays, the bank sells \$143 of face value to raise A's \$100, leaving \$57 of loans worth \$68 at maturity for B. If both run, the first in line gets \$100 and the second gets the remaining \$40 from the fire sale; not knowing the order, each expects \$70.

Check the best responses. If B stays, A prefers to stay (\$120 beats \$100). If B runs, A prefers to run (\$70 beats \$68). There are two Nash equilibria, both stay and both run, and nothing in the bank's balance sheet picks between them. What picks is each depositor's belief about what the other will do. A rumor, a credit downgrade, a competitor's failure, or a badly worded capital raise can move that belief. Once it moves, the run is rational for every individual and ruinous for the group.

This is why the speed of a run has nothing to do with the speed at which loans go bad. SVB's assets were mostly government-guaranteed agency mortgage-backed securities. The problem was duration, not credit: the held-to-maturity portfolio had a weighted-average duration of 6.2 years at year-end 2022 and most of it had maturities of 10 years or more. Rates rose, the securities lost value, and the loss was real but slow. The run was fast because beliefs are fast.

## Why insurance kills the bad equilibrium

Deposit insurance does not give the bank more cash on the day of the run. It changes the payoff matrix. Suppose each depositor's \$100 is guaranteed by a third party. Now A's payoff from staying when B runs is \$100, not \$68. Staying earns \$120 if B stays and \$100 if B runs. Running earns \$100 if B stays and \$70 if B runs. Staying is at least as good in every case and strictly better in most. The run equilibrium is gone. Diamond and Dybvig's abstract puts it the same way: insurance can rule out runs "without reducing the ability of banks to transform assets."

The U.S. version of this guarantee is the FDIC, which insures deposits to at least \$250,000 per depositor at each insured bank. The point to absorb is that the insurer rarely has to pay. The guarantee works by making the first move unnecessary, so the fire sale that would have produced the losses never happens. The best insurance is the kind that is never claimed.

That is also why the share of *uninsured* deposits is the number that matters. Insured depositors have left the game. Uninsured depositors are still playing the original version, with the original two equilibria. At year-end 2022, approximately 94 percent of SVB's total deposits were uninsured, more than double the average for large banking organizations. Its common equity tier 1 capital ratio was 12 percent, 200 basis points above the peer average. By the solvency metric it was better than its peers. By the coordination metric it was one bad announcement from a run.

The authorities understood this on March 12, 2023. Treasury, the Federal Reserve and the FDIC invoked a systemic risk exception and announced that all depositors of SVB and Signature Bank would be made whole, insured or not, with access to their money on March 13. Shareholders and certain unsecured debtholders were not protected. Losses to the Deposit Insurance Fund would be recovered by a special assessment on banks. The statement added nothing to any bank's cash. It changed the payoff for staying at every other bank with a large uninsured base, and the system-wide run that was forming did not complete.

## Why some runs are faster

Coordination needs communication. In the Diamond-Dybvig model depositors do not talk; they simply observe a signal and react. In practice they talk constantly, and how connected they are determines how quickly beliefs converge on "run."

The Federal Reserve's own review describes SVB's depositors as a concentrated network of venture capital investors and technology firms who, "fueled by social media, withdrew uninsured deposits in a coordinated manner at an unprecedented rate." The bank had tripled in size between 2019 and 2021 on deposits from one sector, one geography, and one investor community. The GAO put the growth at 198 percent in total assets over 2019 to 2021, against a 33 percent median for a 19-bank peer group. Those clients shared board members, shared investors, and shared group chats. Once the network's investors began to move, the message reached the entire depositor base within hours.

Contrast a bank funded by millions of unrelated households, each below the insurance limit, most with direct deposit and autopay attached to the account. Those depositors have no reason to move and no channel through which to coordinate if they did. The New York Fed's retrospective found that during March 2023 the large deposit outflows were concentrated at super-regional banks with \$50 billion to \$250 billion in assets, and that the money went mostly to the largest banks. Size, diversification and the perception of implicit backing all made the biggest banks the safe equilibrium.

This is a structural advantage that does not appear in a capital ratio. A diversified, granular, insured deposit base is a franchise asset. It lets a bank hold the long-duration assets that make the business profitable without exposing it to the second equilibrium. The valuation of that franchise is what bank investors are actually paying for when they pay a premium to tangible book.

## The slow-motion version: deposit betas

Runs are the acute form of depositor behavior. The chronic form is repricing. When policy rates rise, depositors can move money to a money market fund or a Treasury bill. Each bank decides how much of the rate increase to pass through to deposit rates. The pass-through ratio is the deposit beta: the cumulative change in a bank's cost of deposits divided by the cumulative change in the policy rate since the start of a tightening cycle.

A low beta is the good equilibrium in miniature. Depositors stay even though they are being paid less than the market rate, because moving is a hassle and nobody else is moving. A sudden jump in betas is a slow coordination shift: enough depositors have noticed the gap that every bank has to pay up or watch balances leave.

The Kansas City Fed reported that community banking organizations, defined as institutions with under \$10 billion in assets, had a cumulative deposit beta of 46.9 percent as of the first quarter of 2024, measured against the effective federal funds rate from March 2022. Roughly half the Fed's hikes had been passed to depositors, and the figure was still rising almost a year after the last hike. Larger banks had seen faster core deposit runoff early in the cycle. The New York Fed found that the industry's cumulative beta continued to climb after March 2023 with no sharp break at the crisis, which is the point: the crisis did not cause the repricing, the rate cycle did, and the crisis simply made every bank aware that uninsured balances are not free.

For a bank's earnings, beta is the denominator of net interest margin. A bank with a 20 percent beta and a bank with a 50 percent beta can report the same loan yields and have very different profitability. The low-beta bank is earning a rent on depositor inattention. That rent is real, but it is a function of the depositors' coordination, not the bank's skill, and it can disappear faster than loans can be repriced.

## What to watch

The useful indicators are the ones that describe the game, not the ones that describe the loan book.

- **Uninsured deposits as a share of total deposits.** Reported quarterly in regulatory filings. Above roughly half, the bank is funded mostly by players who can still run.
- **Depositor concentration.** Sector, geography, and the number of accounts above the insurance limit. A high average balance means a small number of decision-makers.
- **Unrealized losses on securities relative to common equity.** SVB's unrealized losses began in early 2022 and peaked in the third quarter. The held-to-maturity accounting kept them out of capital, not out of the market's view. When losses on paper approach tangible equity, uninsured depositors start doing the arithmetic.
- **Reliance on wholesale and Federal Home Loan Bank funding.** It signals that core deposits are already leaving.
- **Cumulative deposit beta and its trajectory.** Rising betas after the Fed has stopped hiking mean the funding advantage is eroding.
- **Public announcements.** A capital raise, a securities sale "to reposition the balance sheet," or a rating agency review are the signals that flip beliefs. SVB's March 8 announcement was intended to reassure. It was read as distress.
- **The insurance regime itself.** Any proposal to change the \$250,000 limit, to extend coverage to business transaction accounts, or to reintroduce the systemic risk exception changes payoffs for every bank at once.

## What this means for investors

Bank equity is a claim on two things: the spread the bank earns on its assets, and the stability of the funding that lets it hold those assets to maturity. The balance sheet tells you about the first. The structure of the depositor base tells you about the second, and the second is the one that produces sudden, total losses.

For common shareholders of individual banks, the lesson of 2023 is that the solvency ratios were not the warning. SVB was better capitalized than its peers by the standard measure. The warning was a 94 percent uninsured share, a depositor base drawn from a single sector, a securities portfolio with a 6.2-year duration, and unrealized losses that were visible to anyone reading the footnotes. Those four facts described a bank in the two-equilibrium version of the game, and once beliefs moved there was no analysis left to do. Equity holders of SVB and Signature were wiped out; the March 12 statement protected depositors and explicitly excluded shareholders and certain unsecured bondholders. The hierarchy matters. Deposit insurance protects the system by protecting depositors, not by protecting the owners of the bank.

For holders of bank debt and preferreds, the same hierarchy applies with one addition. The systemic risk exception is discretionary. It was used for SVB and Signature; a smaller bank with the same funding structure might not qualify, and the recovery on senior unsecured debt would depend on how much value the fire sale destroyed. The uninsured share is a credit metric as well as an equity metric.

For investors in the large diversified banks, 2023 was a demonstration of franchise value. Deposits flowed toward them because they were the safe equilibrium. A low deposit beta and a granular insured base are the reason their net interest margins hold up when rates rise, and that advantage is worth paying for. But it is an advantage of depositor behavior rather than asset quality, and the deposit beta figures show it eroding over the course of a cycle even without a crisis. Margins built on inattention normalize.

For depositors themselves, including small businesses, the model gives direct guidance. Balances above the insurance limit are a bet on the good equilibrium at that specific bank. Spreading cash across institutions, using sweep arrangements that keep each balance insured, or holding Treasury bills directly removes you from the game. The expected cost of doing so is a few basis points of yield. The expected cost of not doing so was, for SVB's depositors, a weekend of not knowing whether their payroll would clear.

Finally, the model describes something broader than banks. Money market funds in 2008, prime brokerage balances, stablecoins, and any structure that promises par on demand while holding assets that cannot be sold at par on demand is playing the same game. The question to ask of every such structure is the same one: who is still uninsured, how connected are they, and what would make them move at once.
