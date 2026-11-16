---
title: "Boeing and Airbus: The Duopoly That Can't Afford a Price War"
date: 2026-08-14
week: 3
tags: [Firms, Game Theory]
summary: "Two firms build nearly every large commercial aircraft on earth and together hold a backlog of roughly 15,000 jets, about a decade of output at 2025 delivery rates. Textbook duopoly predicts a price war. The actual game is Cournot with hard capacity constraints and a learning curve: when neither firm can build more, undercutting buys nothing, and market share moves on who can deliver. The 737 MAX grounding, the 2024 door-plug incident and the FAA's production cap show what that costs when one side loses the ability to execute."
takeaways:
  - "With both firms sold out for years, price competition cannot win volume. Capacity-constrained Bertrand collapses to the Cournot outcome: price is set by total capacity, not by the lower bidder. Discounting a slot you cannot deliver is a gift to the airline, not a weapon against the rival."
  - "Share moves on execution. Airbus delivered 69 percent of the two firms' combined output in 2019, 78 percent in 2020 during the MAX grounding, and 57 percent in 2025 as Boeing recovered. None of those swings came from a price change."
  - "The learning curve makes production stability the asset. Boeing's 737 suspension in 2020 produced about $4 billion of abnormal production costs on top of $2.6 billion in customer concessions and $2.6 billion in higher estimated program costs. Rate cuts destroy learning that took years to accumulate."
  - "The binding constraint has moved to the supply chain. Airbus named Pratt & Whitney's failure to commit to ordered engine volumes as the drag on its 2026 guidance; the FAA, not demand, set Boeing's 737 rate at 38 a month from early 2024 to October 2025. The layer below the airframe captures the scarcity."
  - "Boeing posted a record $682 billion backlog and negative $1.9 billion of free cash flow in the same year. A backlog is an option on future execution, not cash. Watch monthly deliveries, FAA rate increments and engine shipments, not order announcements."
sources:
  - title: "Boeing: Orders and Deliveries"
    url: https://www.boeing.com/commercial/#/orders-deliveries
  - title: "Airbus: Orders and Deliveries"
    url: https://www.airbus.com/en/products-services/commercial-aircraft/market/orders-and-deliveries
  - title: "Airbus: Full-Year 2025 results (19 February 2026)"
    url: https://www.airbus.com/en/newsroom/press-releases/2026-02-airbus-reports-full-year-fy-2025-results
  - title: "Airbus: Full-Year 2022 results (deliveries 2021 and 2022)"
    url: https://www.airbus.com/en/newsroom/press-releases/2023-02-airbus-reports-full-year-fy-2022-results
  - title: "Airbus: Full-Year 2020 results (deliveries 2019 and 2020)"
    url: https://www.airbus.com/en/newsroom/press-releases/2021-02-airbus-reports-full-year-fy-2020-results
  - title: "Boeing: Fourth Quarter 2025 Results (January 27, 2026)"
    url: https://boeing.mediaroom.com/2026-01-27-Boeing-Reports-Fourth-Quarter-Results
  - title: "Boeing: Fourth Quarter 2023 Results (deliveries 2022 and 2023)"
    url: https://boeing.mediaroom.com/2024-01-31-Boeing-Reports-Fourth-Quarter-Results
  - title: "Boeing: Fourth Quarter 2021 Results (deliveries 2020 and 2021)"
    url: https://boeing.mediaroom.com/2022-01-26-Boeing-Reports-Fourth-Quarter-Results
  - title: "Boeing: Fourth Quarter 2019 Results (deliveries 2019)"
    url: https://boeing.mediaroom.com/2020-01-29-Boeing-Reports-Fourth-Quarter-Results
  - title: "PBS NewsHour / AP: FAA clears Boeing 737 Max to fly again (November 18, 2020)"
    url: https://www.pbs.org/newshour/nation/faa-clears-boeing-737-max-to-fly-again
  - title: "NTSB: Boeing's inadequate training, guidance and oversight led to mid-exit door plug blowout (June 24, 2025)"
    url: https://www.ntsb.gov/news/press-releases/pages/NR20250624.aspx
  - title: "Airways Magazine: FAA lifts Boeing 737 MAX production cap (October 2025)"
    url: https://airwaysmag.com/new-post/faa-lifts-boeing-737-max-production-cap
charts:
  - title: "Commercial aircraft deliveries per year, 2019 to 2025"
    type: line
    labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"]
    series:
      - name: "Airbus"
        data: [863, 566, 611, 661, 735, 766, 793]
      - name: "Boeing"
        data: [380, 157, 340, 480, 528, 348, 600]
    note: "Source: company-reported full-year commercial aircraft deliveries. Airbus figures from Airbus full-year results press releases (FY2020, FY2022, FY2024 and FY2025 releases, 2021 to 2026). Boeing figures from the Commercial Airplanes deliveries line in Boeing fourth-quarter results releases (January 2020, 2022, 2024 and 2026)."
---

## The setup

Boeing and Airbus build almost every commercial jet with more than 100 seats. In 2025 Airbus delivered 793 aircraft and Boeing 600, Boeing's best year since 2018. Airbus ended the year with a record backlog of 8,754 aircraft. Boeing's commercial backlog stood at over 6,100 airplanes valued at \$567 billion, inside a record company-wide backlog of \$682 billion. Together the two firms owe their customers roughly 15,000 jets. At 2025 delivery rates that is about eleven years of Airbus output and ten years of Boeing's.

A textbook says two firms selling close substitutes should undercut each other until price falls to marginal cost. Both firms instead report positive margins on commercial aircraft in normal years; Airbus earned €7.1 billion of adjusted EBIT on €73.4 billion of revenue in 2025. Something structural is holding the price war back, and it is not an agreement. It is the capacity constraint.

## Bertrand, Cournot, and the capacity constraint

Industrial organization has two canonical duopoly models. In Bertrand competition firms set prices; with identical products and no capacity limit, each firm can take the whole market by undercutting by a cent, so the only equilibrium is price equal to marginal cost and zero profit. In Cournot competition firms choose quantities; the market price is whatever clears total output, and each firm restrains its own output because adding units lowers the price on everything it sells. Cournot profits are positive.

Which model applies depends on how fast capacity can be changed. A standard result, due to Kreps and Scheinkman, is that when firms first commit to capacity and then compete on price, the outcome is the Cournot one. Capacity does the work. Once both firms are sold out, a price cut cannot win volume because the winner has no slot to sell. Airlines know this; they are not choosing between two prices for the same delivery date, they are choosing between two delivery dates.

A worked example. Suppose monthly demand for single-aisle jets can be written as $P = 200 - Q$, with $P$ the price in millions of dollars and $Q$ the combined monthly output, and that each unit costs 80 to build.

| Regime | Output per firm | Price | Profit per firm (per month) |
| --- | --- | --- | --- |
| Bertrand, unlimited capacity | 60 | 80 | 0 |
| Cournot, unlimited capacity | 40 | 120 | 1,600 |
| Each firm capped at 38 units | 38 | 124 | 1,672 |

In Bertrand both firms price at cost and earn nothing. In Cournot each produces 40, price settles at 120, and each earns 40 units times a 40 margin. Now cap each firm at 38 units, below its Cournot quantity. Total output falls to 76, price rises to 124, and profit per firm rises to 1,672, because the margin widens more than the volume shrinks. Neither firm has any incentive to cut price: the cut cannot be converted into a single additional delivery. A binding capacity constraint is, perversely, good for both duopolists' pricing. The numbers are stylized; the structure is the industry's.

The repeated nature of the game reinforces the result. The same two firms meet in every sales campaign, at every airline, for decades. A firm that undercut aggressively in one campaign would face retaliation in the next fifty. In a repeated game, pricing discipline is stable without any communication, because defection is punished by the future. But the capacity constraint is what makes the discipline cheap to maintain: there is nothing to gain from defecting in the first place.

## The learning curve, and what breaks it

The second structural feature is the learning curve. Aircraft assembly is labor-intensive and repetitive, and the labor hours per unit fall as cumulative output rises. The classic formulation, from T. P. Wright's early study of airframe production, is

$$
c_n = c_1 \, n^{-b}
$$

where $c_n$ is the cost of the $n$-th unit, $c_1$ the cost of the first, and $b$ a parameter such that each doubling of cumulative output reduces unit cost by a constant percentage. The implication is that a stable, high production rate is itself a competitive asset. A program that has built thousands of units is cheaper per unit than one that has built hundreds, and the gap compounds.

The learning curve also explains why disruptions are so expensive. Learning lives in people, tooling, supplier cadence and the thousand small adjustments that accumulate on a line running at rate. Stop the line, and the workforce disperses, suppliers idle, and the restart begins further back on the curve than where it stopped. Accounting captures this as "abnormal production costs," the costs of running a line below its planned rate that cannot be absorbed into unit cost.

Boeing's 737 MAX program is the measured case. After two crashes that killed 346 people, a Lion Air flight in 2018 and an Ethiopian Airlines flight less than five months later in March 2019, regulators grounded the type in March 2019. Boeing's deliveries fell from 806 in 2018 to 380 in 2019 and 157 in 2020. In January 2020 the company disclosed an additional \$2.6 billion charge for customer concessions, a \$2.6 billion increase in estimated program costs, and approximately \$4 billion of abnormal production costs expected primarily in 2020 as it suspended and then slowly restarted the 737 line. Revenue fell from \$101.1 billion in 2018 to \$76.6 billion in 2019. The FAA rescinded the grounding on November 18, 2020, after a 20-month review. During 2020 more than 1,000 MAX orders were canceled or removed from the backlog. The airframe did not get worse at building aircraft. The line stopped, and the learning curve ran in reverse.

## The door plug and the cap

The second episode is smaller in human terms and almost as instructive in industrial ones. On January 5, 2024, a Boeing 737-9 operated as Alaska Airlines flight 1282 lost a mid-exit door plug while climbing after takeoff. The aircraft had been delivered about three months earlier. The NTSB's June 24, 2025 findings were that the four bolts needed to secure the plug were missing before the aircraft left the factory, and that the probable cause was Boeing's failure to provide adequate training, guidance and oversight for its parts-removal processes. One flight attendant and seven passengers were injured; there were no fatalities.

The FAA's response was a production cap: 737 MAX output was held at 38 aircraft a month in the wake of the January 2024 incident. Boeing's 2024 deliveries fell to 348 from 528 the year before, while Airbus delivered 766. On October 17, 2025, the FAA allowed the rate to rise to 42 a month after inspectors reviewed the production lines, and Boeing reported in January 2026 that it had moved to 42 during the fourth quarter. From early 2024 until October 2025, the single most important variable in the duopoly, how many 737s Boeing could build, was set by a regulator rather than by demand, cost or price.

This is the capacity-constrained model with the constraint made explicit. Airbus did not need to change a single price to gain share; it needed to deliver. Airbus's share of the two firms' combined deliveries was 69 percent in 2019, 78 percent in 2020, and 57 percent in 2025 as Boeing recovered. Each of those moves is an execution story.

## The suppliers in the middle

Restraint on price pushes competition into delivery slots and reliability, and that pushes the binding constraint one layer down. Both firms depend on a very small number of suppliers for engines, fuselage sections and landing gear, and those suppliers face the same learning curve and the same rate instability.

Airbus's own 2025 results make this concrete. The company said it expects the A320 family to reach a rate of 70 to 75 aircraft a month by the end of 2027 and stabilize at 75 thereafter, but it identified Pratt & Whitney's failure to commit to the number of engines Airbus ordered as the constraint on 2026 deliveries, which it guided to about 870. The A220 ramp to rate 13 in 2028 is paced in part by integrating work packages taken over from Spirit AeroSystems. The A350 is targeted at rate 12 and the A330 at rate 5 by 2028 and 2029. Every one of those targets is a supply-chain statement, not a demand statement. Demand is the 8,754-aircraft backlog.

Engines are the most important case. Jet engines are sold at thin or negative margins and earn their return over decades of maintenance, repair and spare parts. In a duopoly where airframe prices are disciplined and output is capped, the engine maker captures scarcity twice: once at the airframer's gate, where it decides how many aircraft can be completed, and again in the aftermarket, where every delivered aircraft becomes an annuity. The question for investors is who captures the industry's economics, and the answer is often the layer below the airframe.

## What breaks the equilibrium

Three things could change the game.

**Capacity catches up with demand.** If both firms reach their rate targets and the backlog begins to shrink relative to output, the constraint loosens and the Cournot outcome drifts toward Bertrand. Watch the ratio of backlog to annual deliveries. At roughly ten years it is far from binding; at four or five, pricing discipline would be tested.

**One firm loses the ability to execute for long enough that airlines re-fleet.** The MAX grounding and the door-plug cap moved share within the duopoly. A longer disruption would move it permanently, because airlines that have retrained crews and restructured maintenance around one family rarely switch back.

**A credible third manufacturer.** A third player makes retaliation harder to target and gives airlines a bargaining alternative, which is the Bertrand pressure the duopoly has been spared. The signal to watch is not deliveries to domestic carriers, which can be mandated, but the first large order from an airline with a free choice, and the first certification by a regulator the airline's lessors and insurers trust.

## What to watch

- **Monthly deliveries by type**, published by both firms. The chart above is the annual version. A month below the planned rate is a learning-curve cost in real time.
- **FAA rate approvals.** Increases now come in steps after production-line reviews. Each step is a change in the capacity constraint.
- **Engine shipments and supplier commitments.** When an airframer names an engine maker as the constraint, deliveries will miss regardless of the order book.
- **Book-to-bill.** Airbus took 1,000 gross and 889 net orders against 793 deliveries in 2025, a ratio above one. A ratio below one for several years would mean the backlog is shrinking and the constraint is loosening.
- **Abnormal production costs and program charges** in the quarterly filings. They measure how far back the learning curve has slipped.
- **Free cash flow against backlog.** Boeing's 2025 free cash flow was negative \$1.9 billion with a record backlog. The gap is the cost of the capacity constraint binding on the wrong firm.
- **Order cancellations and deferrals** at airlines, which signal whether the demand side of the backlog is as firm as the headline.

## What this means for investors

The duopoly's profitability rests on a capacity constraint, not on collusion and not on brand. That has three consequences for how to read the instruments exposed to it.

**Airframers.** A record backlog is an option on future execution. Its value depends on the rate at which it can be converted into delivered, paid-for aircraft, and that rate is set by factory stability, regulatory approval and supplier output. Boeing in 2025 showed the extreme case: the largest backlog in its history and negative free cash flow in the same year, because the cap and the recovery costs sat between the orders and the cash. Airbus showed the opposite: a 9.7 percent adjusted EBIT margin on record deliveries. The difference between the two was not demand or price. It was who could build what they had sold. When reading either company, the delivery line and the rate commentary carry more information than the order announcements.

**Suppliers.** Engine makers, aerostructures and landing-gear suppliers sit where the constraint binds. That gives them pricing power on the way up and exposes them on the way down: a rate cut at the airframer is passed to the supply chain immediately, and the aftermarket annuity depends on aircraft actually being delivered and flown. The engine aftermarket is the most durable economic layer in the industry, and the one where a disciplined duopoly's scarcity ends up being monetized.

**Lessors.** Aircraft lessors own delivery slots as well as aircraft. When output is capped and backlogs stretch a decade, a near-term slot is scarce, and the value of a lessor's order book rises with it. Lessors are a way to hold the scarcity without holding the execution risk of the factory, at the price of exposure to airline credit and to interest rates.

**Airlines.** The duopoly's customers bear the cost of the capacity constraint as aging fleets, delayed growth and higher maintenance. An airline whose growth plan depends on deliveries from a capped line is carrying a risk it does not control.

For a diversified investor, the lesson is that in a capacity-constrained duopoly the headline competitive metrics, price and share, are not where the risk lives. The risk lives in the rate: how many aircraft a month, approved by whom, with engines from where. The MAX grounding and the door-plug cap both show the same pattern. Market share moved by double digits, billions of costs were booked, and the price of an aircraft was never the variable that changed.
