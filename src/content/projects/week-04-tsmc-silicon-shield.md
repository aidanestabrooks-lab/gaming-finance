---
title: "TSMC's Silicon Shield: When a Company Becomes a Deterrent"
date: 2026-08-21
week: 4
tags: [Firms, Geopolitics]
summary: "One firm books about 70 percent of the world's foundry revenue and makes most of its leading-edge chips on an island at the center of the most watched standoff on earth. The 'silicon shield' is a deterrence argument: nobody can afford to break the fabs. Deterrence is a commitment game, and the same policies that insure the world against losing Taiwan's chips, the $165 billion Arizona build-out, the CHIPS Act, and export controls, change the payoffs that make the shield work. This piece sets out the game, the numbers, and what the margins at TSMC tell you about who is paying for the insurance."
takeaways:
  - "The silicon shield is a deterrence claim with two legs: an attacker destroys what it wants, and third parties intervene to protect their supply. Both legs depend on dependence. Every fab built outside Taiwan and every step a rival takes toward the leading edge weakens one leg or the other."
  - "Insurance and deterrence pull in opposite directions. The United States wants less dependence on Taiwan and wants Beijing to believe it would defend Taiwan. The first undermines the second. That is the commitment problem at the center of the story, and it cannot be resolved by subsidy."
  - "TSMC's share of foundry revenue was 70.4 percent in the fourth quarter of 2025, up from 54 percent in 2020. Its leading-edge concentration is higher still: 74 percent of third-quarter 2025 wafer revenue came from 7nm and below, with 3nm alone at 23 percent. Rival capacity at those nodes is measured in years."
  - "Overseas fabs cost margin. TSMC guided to 1 to 2 percentage points of gross-margin dilution from overseas fabs in 2025, 2 to 3 points in the early years and 3 to 4 points later. Against a 59.5 percent gross margin, that is the explicit price of geographic insurance, paid by shareholders and partly offset by the $6.6 billion CHIPS grant."
  - "This is a portfolio risk, not a single-stock risk. TSMC's named Arizona customers include Apple, NVIDIA, AMD, Broadcom and Qualcomm. A technology index carries Taiwan exposure through nearly every large holding, and no amount of diversification within the sector removes it."
sources:
  - title: "TSMC Investor Relations"
    url: https://investor.tsmc.com/english
  - title: "CSIS: Taiwan's Semiconductor Dominance, Implications for Cross-Strait Relations and the Prospect of Forceful Unification (March 22, 2022)"
    url: https://www.csis.org/blogs/perspectives-innovation/taiwans-semiconductor-dominance-implications-cross-strait-relations
  - title: "TrendForce: AI Demand Drives 4Q25 Global Top 10 Foundries Revenue Up 2.6% QoQ (March 12, 2026)"
    url: https://www.trendforce.com/presscenter/news/20260312-12965.html
  - title: "Evertiq: AI demand lifts top foundries' Q4 revenue, Samsung gains share (TrendForce ranking table)"
    url: https://evertiq.com/news/2026-03-12-ai-demand-lifts-top-foundries-q4-revenue-samsung-gains-share
  - title: "TSMC: TSMC Intends to Expand Its Investment in the United States to US$165 Billion (March 4, 2025)"
    url: https://pr.tsmc.com/english/news/3210
  - title: "Office of Rep. Greg Stanton: Arizona leaders applaud finalized $6.6 billion CHIPS and Science Act award to TSMC (November 15, 2024)"
    url: https://stanton.house.gov/2024/11/stanton-arizona-leaders-applaud-finalized-6-6-billion-chips-and-science-act-award-to-tsmc-for-arizona-manufacturing-expansion
  - title: "TSMC: Third Quarter 2025 results, Form 6-K (October 16, 2025)"
    url: https://www.sec.gov/Archives/edgar/data/1046179/000104617925000116/a3q25e_withguidancexfinal.htm
  - title: "The Motley Fool: TSMC (TSM) Q3 2025 earnings call transcript (October 16, 2025)"
    url: https://www.fool.com/earnings/call-transcripts/2025/10/17/tsmc-tsm-q3-2025-earnings-call-transcript
  - title: "Bureau of Industry and Security: Commerce Implements New Export Controls on Advanced Computing and Semiconductor Manufacturing Items to the PRC (October 7, 2022)"
    url: https://www.bis.gov/press-release/commerce-implements-new-export-controls-advanced-computing-semiconductor-manufacturing-items-peoples
  - title: "Foreign Policy: U.S. chip policy and Taiwan's silicon shield, Aidan Powers-Riggs, CSIS associate fellow (February 17, 2023)"
    url: https://foreignpolicy.com/2023/02/17/united-states-taiwan-china-semiconductors-silicon-shield-chips-act-biden/
  - title: "Asia Times: The limits of Taiwan's silicon shield, Denny Roy, East-West Center (October 6, 2025)"
    url: https://asiatimes.com/2025/10/the-limits-of-taiwans-silicon-shield/
charts:
  - title: "Share of global foundry revenue, fourth quarter 2025"
    type: bar
    labels: ["TSMC", "Samsung", "SMIC", "UMC", "GlobalFoundries", "All others"]
    series:
      - name: "Share of foundry revenue, 4Q25 (percent, TrendForce)"
        data: [70.4, 7.1, 5.2, 4.2, 3.8, 9.3]
    note: "Source: TrendForce top-10 foundry revenue ranking for 4Q25, released March 12, 2026 (as published by TrendForce and tabulated by Evertiq). Definition: share of total global foundry (contract chipmaking) revenue in the quarter, all process nodes, not leading-edge capacity. TSMC 4Q25 revenue was about 33.7 billion USD; top ten combined about 46.3 billion USD, 97.0 percent of the market. 'All others' is 100 minus the five named shares. Intel Foundry does not appear in the TrendForce ranking. TSMC's share of leading-edge (5nm and below) output is higher than its overall share, but no dated third-party capacity estimate was verified for this chart."
  - title: "TSMC wafer revenue by process node, third quarter 2025"
    type: bar
    labels: ["3nm", "5nm", "7nm", "16nm and more mature"]
    series:
      - name: "Share of wafer revenue, 3Q25 (percent)"
        data: [23, 37, 14, 26]
    note: "Source: TSMC third quarter 2025 results, Form 6-K filed with the SEC, October 16, 2025. Advanced technologies, defined by TSMC as 7nm and more advanced, were 74 percent of wafer revenue. '16nm and more mature' is 100 minus the three named shares. Quarterly revenue was 33.10 billion USD with a 59.5 percent gross margin and 50.6 percent operating margin."
---

## The setup

Taiwan Semiconductor Manufacturing Company is a contract manufacturer. It owns no chip designs. It builds what Apple, NVIDIA, AMD, Broadcom, Qualcomm and several hundred other customers send it, and it does so better and at larger scale than anyone else. In the fourth quarter of 2025 it booked 70.4 percent of global foundry revenue. Samsung, the nearest rival, had 7.1 percent. SMIC, China's champion, had 5.2 percent.

The concentration is sharper at the leading edge. In the third quarter of 2025, 74 percent of TSMC's wafer revenue came from processes at 7nm and below: 23 percent from 3nm, 37 percent from 5nm, 14 percent from 7nm. Revenue was \$33.1 billion for the quarter, gross margin 59.5 percent, operating margin 50.6 percent. A 2023 analysis by a CSIS fellow put Taiwanese foundries at more than 60 percent of the world's semiconductors and 92 percent of its most advanced chips. The chip industry is about 15 percent of Taiwan's GDP.

Nearly all of that leading-edge capacity sits on an island across a strait from the Chinese mainland that Beijing regards as a province. The phrase "silicon shield," coined by the journalist Craig Addison in 2000, describes the theory that this dependence protects Taiwan: no major power can afford a conflict that would destroy the fabs, and the powers that depend on them would intervene to keep them running. Whether the theory holds is a question for strategists. What it does to the firm's economics, and to every portfolio with technology exposure, is a question for investors.

## Deterrence as a game

Deterrence is a claim about another player's payoffs. It says: if you take the action I want to prevent, the cost to you will exceed the gain. For the claim to work, three things must be true. The threatened cost must be real. The threat must be credible, meaning the defender would actually carry it out. And the attacker must believe both.

The silicon shield makes two deterrence claims at once. The first is aimed at Beijing: an attack destroys or disables the fabs you would want to capture, and cuts off the roughly one third of your semiconductors that come from Taiwan. The second is aimed at Washington and Tokyo: your economies cannot run without Taiwan's chips, so you will intervene, and Beijing knows it. The first raises the attacker's cost of acting. The second raises the credibility of the defender's response.

A stylized payoff table shows how the two legs fit together. Let the status quo be worth zero to everyone. Coercion that succeeds is worth $G$ to the attacker. Fighting costs the attacker $W$, and losing access to Taiwan's chips costs it $S_A$. For the defender, intervention costs $I$, and losing the chips costs $S_D$.

| | Defender intervenes | Defender abstains |
| --- | --- | --- |
| **Attacker coerces** | Attacker: $G - W - S_A$; Defender: $-I - S_D$ | Attacker: $G - S_A$; Defender: $-S_D$ |
| **Attacker holds** | 0, 0 | 0, 0 |

The defender intervenes only if $I < S_D$, that is, if fighting is cheaper than losing the chips. The attacker holds if coercion is unprofitable: $G - W - S_A < 0$ when intervention is expected, or $G - S_A < 0$ when it is not. The shield works through $S_A$ and $S_D$. Large chip dependence makes $S_A$ big enough to deter and $S_D$ big enough to make intervention credible.

Now watch what the world has been doing to those two terms. Every fab built in Arizona or Kumamoto lowers $S_D$: the defender depends less on Taiwan. Every advance by SMIC, every domestic Chinese design win, lowers $S_A$. Export controls that cut China off from Taiwan's most advanced output lower $S_A$ further, because a buyer that is already denied the chips has less to lose from their destruction. The shield is a function of dependence, and the policy of every major government since 2022 has been to reduce dependence.

## The commitment problem

This is where the game becomes a commitment problem in the sense that Thomas Schelling made famous. The defender has two goals. It wants insurance: enough capacity outside Taiwan that a disruption would not stop its economy. And it wants deterrence: for Beijing to believe that it would fight. The first goal is achieved by making itself less dependent. The second is achieved by remaining dependent, or at least by appearing to be. A defender that has fully insured itself has, in the attacker's eyes, removed its own reason to intervene.

Schelling's resolution of such problems was to burn the bridge: commit so visibly that retreat is impossible. The silicon shield was, for two decades, exactly that kind of commitment, made not by any government but by the accident of where one firm chose to build. The CHIPS Act, with \$52 billion of federal subsidies for domestic fabrication, and TSMC's \$165 billion Arizona plan are the bridge being rebuilt. They are rational insurance against a single point of failure. They are also, in the logic of the game, a signal that the defender is preparing to be able to abstain.

Two further moves show how the debate has absorbed this. In 2023 the strategist Elbridge Colby suggested that if China took Taiwan, the United States should destroy TSMC's facilities there. That makes the first leg of the shield worse than useless from Taiwan's perspective: the fabs become a target for both sides. And in 2025 U.S. Commerce Secretary Howard Lutnick proposed moving half of Taiwan's chip production to the United States, a 50-50 split; Taiwan's Vice-Premier rejected it on October 1, 2025. Taiwan's government understands that its leverage is the dependence itself, and that the insurance its allies want is paid for in its own security.

## Export controls, and what they do to the game

On October 7, 2022, the U.S. Bureau of Industry and Security imposed the broadest controls on China's semiconductor sector to date. The rules added advanced computing chips and the computers containing them to the Commerce Control List, required licenses for items destined for supercomputer end uses in China, and restricted the export of manufacturing equipment to Chinese fabs producing logic at 16/14nm or below with FinFET or GAAFET transistors, DRAM at 18nm half-pitch or below, and NAND at 128 layers or more. Licenses for Chinese-owned facilities face a presumption of denial. The rules also barred U.S. persons from supporting the development or production of chips at those facilities without a license.

For the game above, the controls do two things. They slow the growth of Chinese domestic capacity, which keeps $S_A$ from falling as fast as it otherwise would. But they also deny China the output of Taiwan's most advanced fabs, which lowers $S_A$ directly: a buyer that cannot legally purchase the chips loses less when the fabs stop. The CSIS analysis from February 2023 made this point when the controls were new. Reshoring reduces Taiwan's share of production; export controls reduce China's dependence on Taiwan's foundries; both weaken Beijing's incentive for restraint. The policy is coherent as an attempt to win the technology race. It is in tension with the shield.

## What the insurance costs, and who pays

TSMC's Arizona project is the insurance policy made concrete. The original \$65 billion plan covered three fabs north of Phoenix. The first, running the N4 process, has been in volume production since late 2024 and employs more than 3,000 people. The second and third are planned for 3nm and 2nm. On March 4, 2025, TSMC announced an additional \$100 billion, bringing the planned total to \$165 billion: three more fabs, two advanced packaging facilities, and a research and development center. The U.S. government's contribution, finalized on November 15, 2024, is a \$6.6 billion CHIPS Act grant and approximately \$5 billion in loans, disbursed as milestones are met.

The cost shows up in the margin. On the October 2025 earnings call TSMC's chief financial officer said overseas fabs would dilute gross margin by 1 to 2 percentage points in 2025, revised down from 2 to 3, with dilution of 2 to 3 points in the early stages of the overseas ramp and 3 to 4 points in the later stages. Against a 59.5 percent gross margin that is a visible, recurring charge. It is the price of geographic insurance, and the party paying most of it is the TSMC shareholder, with the U.S. taxpayer covering a portion through the grant and the chip customer covering the rest through whatever pricing TSMC can pass on.

The leading edge, meanwhile, stays home. N2 was on track for volume production in the fourth quarter of 2025; N2P and A16 are scheduled for the second half of 2026; and the company said it would continue investing in leading-edge and advanced packaging facilities in Taiwan over the next several years, with multiple phases of 2nm capacity in Hsinchu and Kaohsiung. Arizona is being upgraded toward more advanced nodes faster than originally planned, but it follows Taiwan. The insurance covers the second-newest process, not the newest. That is the technological version of the commitment problem: the defender's insurance is real, and it is one generation behind the thing it insures.

## The equilibrium and its half-life

Today the "no disruption" equilibrium holds because every player's payoffs say it should. For Beijing, $S_A$ remains large: China still sources about a third of its semiconductors from Taiwan, and the export controls are designed to keep SMIC's 5.2 percent of foundry revenue away from the leading edge. For Washington and Tokyo, $S_D$ remains large: 74 percent of TSMC's wafer revenue is at nodes where it is the dominant producer, and the Arizona fabs are a fraction of that capacity. A State Department-commissioned study cited in the 2023 CSIS analysis put the annual global cost of a blockade that disrupted Taiwan's chip industry at \$2.5 trillion. Nobody wants to test that figure.

But equilibria are built from payoffs, and the payoffs are moving. The shield gets thinner at the pace at which the insurance gets better. That pace is set by three measurable things: how fast capacity is built outside Taiwan, how fast rivals close the gap at the leading edge, and how far export controls reduce the attacker's dependence. All three move in years, not quarters. None of them is moving toward a thicker shield.

The skeptics' strongest point, made by Denny Roy in October 2025, is that chips may not decide the question at all. Beijing accepted large economic costs in Hong Kong and has said it would do so again if Taiwan moved decisively toward permanent separation. If regime priorities dominate, $G$ is not a fixed number; it rises with political circumstances, and no value of $S_A$ reachable by chip dependence is large enough to hold it. On that view the shield was never the deterrent. It was a reason for the rest of the world to care.

## What to watch

- **Overseas gross-margin dilution guidance**, updated each quarter. Rising dilution means more capacity is leaving Taiwan; the insurance is improving and the shield is thinning.
- **The node gap between Taiwan and Arizona.** When Arizona runs the same process as Hsinchu in the same year, the leading-edge leg of the dependence is gone.
- **TrendForce foundry shares** for Samsung and SMIC. A rival moving from the mid single digits to the teens at advanced nodes changes $S_A$ and $S_D$ at once.
- **Export-control revisions** from BIS, and the licensing posture toward Taiwanese and Korean fabs in China.
- **CHIPS Act disbursements** against milestones, and any renegotiation of the terms.
- **Official statements about production splits.** The 50-50 proposal and its rejection were a public negotiation over who pays for the insurance. More will follow.
- **TSMC's share of revenue from AI accelerators**, which the company said is growing at a compound rate in the mid-40s percent or better. The faster the world's compute concentrates on TSMC's most advanced nodes, the larger $S_D$ becomes, and the more the deterrence leg is reinforced even as the insurance leg erodes.

## What this means for investors

The silicon shield is a deterrence equilibrium whose stability depends on dependence, and the most important governments in the world are spending hundreds of billions of dollars to reduce that dependence. For investors, that converts a binary geopolitical question into a slow, measurable one about where capacity sits and what it costs.

**TSMC equity.** The firm earns a 59.5 percent gross margin and about 70 percent of its industry's revenue, and the market has long applied a discount to it for where it is located. The Arizona program is a transfer from shareholders to the resilience of the system: 1 to 2 points of margin now, 3 to 4 later, partly offset by \$6.6 billion in grants. The investment case has to price both the discount for concentration and the dilution from reducing it. Those are the same risk, charged twice.

**Foundry customers.** The companies TSMC names as Arizona customers, Apple, NVIDIA, AMD, Broadcom and Qualcomm, are the largest holdings in most technology and broad-market indices. Their exposure to Taiwan is not on their balance sheets, but it is in their cost of goods sold and in the question of whether their products can be built at all. A technology index that holds no TSMC still carries the risk. Diversifying within the sector does not reduce it, because the sector shares one supplier at the leading edge.

**Semiconductor equipment.** Equipment makers are the one group for whom the insurance program is unambiguously good business. Every duplicated fab is incremental tool demand regardless of whether the fab ever runs at full utilization, and TSMC's 2025 capital expenditure guidance of \$40 to 42 billion is a large share of that demand. The offset is export controls, which have cut their addressable market in China. Equipment is a way to hold the capacity build-out without holding the location risk.

**Rival foundries.** Samsung, Intel and SMIC are the long-dated option on the shield failing or on the insurance succeeding, which from their perspective is the same thing. Their value depends on closing a technology gap that TSMC is actively extending with N2 and A16. Announcements are cheap; yield and volume at advanced nodes are not, and those are the figures to watch.

**The portfolio.** The right frame is not whether to own TSMC. It is to recognize that a diversified equity portfolio already carries a large, concentrated exposure to one island, that this exposure cannot be hedged within the technology sector, and that the policies reducing it are also, in the logic of the game, reducing the deterrent that has kept it safe. That is the irony at the center of the story, and it is the reason this is a portfolio question rather than a stock question.
