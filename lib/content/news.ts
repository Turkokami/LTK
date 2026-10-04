/**
 * news.ts — Wire industry news. Researched and written 2026-10-04 from the sources listed on
 * each article (agency releases, company filings, state notices, trade press as support).
 * Original wording; `date` is when the news happened, not when we wrote it up.
 * Recheck items: PestWorld date is registration opening (show runs Oct 20–23, 2026); the
 * screwworm piece runs to mid-June case counts; Rollins Q2 figures are from release copies.
 */

export interface NewsArticle {
  slug: string;            // kebab-case, unique, <= 60 chars
  title: string;           // <= 52 characters (the site appends " · LTK")
  description: string;     // meta description, MUST be 140–160 characters (count them; em dash counts as 1)
  dek: string;             // one-sentence summary shown under the headline
  date: string;            // ISO date of the underlying news event/announcement
  topic: 'regulation' | 'invasive' | 'business' | 'industry' | 'technology';
  body: string[];          // 5–9 paragraphs, 350–650 words total, original writing
  whatItMeans: string;     // 1–3 sentences: practical takeaway for techs/owners
  sources: { name: string; url: string }[]; // 2+ sources, the pages you actually read
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "spotted-lanternfly-first-new-hampshire-detection",
    title: "Spotted Lanternfly Reaches New Hampshire",
    description: "New Hampshire confirmed its first field detection of spotted lanternfly in Salem in late August 2026, as the invasive planthopper keeps spreading in the East.",
    dek: "State officials found a small number of the invasive planthoppers in Salem and say there is no sign yet of an established population.",
    date: "2026-08-26",
    topic: "invasive",
    body: [
      "Spotted lanternfly has turned up in New Hampshire for the first time. In late August 2026 the New Hampshire Department of Agriculture, Markets and Food confirmed a small number of the insects in the town of Salem, near the Massachusetts line. It is the first time the pest has been found in the field in the state.",
      "State officials were careful to say the find does not mean the bug has settled in. The department said there is “no evidence of an established population at this time,” and that survey teams will keep watching the area. Neighboring Vermont also reports no known established population.",
      "The detection fits a pattern that has played out for more than a decade. Since the insect was first found in Pennsylvania in 2014, it has spread to 19 states plus Washington, D.C., according to New Hampshire Public Radio, reaching as far north as Massachusetts and as far south as the Carolinas. Reporting on the Salem find noted that milder New England winters are weakening the cold barrier that used to slow pests like this one.",
      "The spread is not limited to the north. In February 2026 the North Carolina Department of Agriculture and Consumer Services confirmed established populations in Davidson, Rowan and Caswell counties, bringing that state to seven counties with breeding populations. North Carolina officials traced some of the spread along interstate and highway corridors, a reminder that the insect is a hitchhiker. Adults and egg masses ride on vehicles, trailers, firewood and outdoor equipment.",
      "Spotted lanternfly feeds on more than 100 plant species, and growers worry most about grapes and maples. Its favorite host is tree of heaven, an invasive tree already common across much of the Northeast. Heavy feeding leaves honeydew on decks, cars and siding, which grows black sooty mold and draws stinging insects. That nuisance side is often what drives a homeowner to call a pest control company.",
      "Both states are asking the public to kill any lanternflies they see and report them. New Hampshire takes reports through NHBugs.org, and North Carolina has an online reporting tool through its agriculture department. Coverage of the New Hampshire find noted that populations respond to insecticides, and that scraping egg masses and vacuuming nymphs can also help, along with removing tree of heaven.",
      "For companies working along the leading edge of the spread, the first sightings are often reported by customers who do not know what they are looking at. A fall adult on a patio or a mud-colored egg mass on a grill cover can be the first clue in a new town."
    ],
    whatItMeans: "Learn to recognize adults, nymphs and egg masses, and report suspected finds in new areas to the state before treating. Check your own trucks and equipment when you leave known infested zones, and follow your state’s label and quarantine rules if you add lanternfly work to your service menu.",
    sources: [
      { name: "NHPR: Spotted lanternfly confirmed in Salem", url: "https://www.nhpr.org/environment/2026-08-26/spotted-lanternfly-nh-salem-invasive-pest" },
      { name: "WCAX: Spotted lanternfly detected in New Hampshire for first time", url: "https://www.wcax.com/2026/08/28/spotted-lanternfly-detected-new-hampshire-first-time/" },
      { name: "NCDA&CS: Spotted lanternfly found in three additional counties", url: "https://www.ncagr.gov/news/press-releases/2026/02/10/ncdacs-finds-spotted-lanternfly-three-additional-counties" }
    ]
  },
  {
    slug: "rentokil-h1-2026-drops-north-america-margin-target",
    title: "Rentokil Drops US Margin Target After Soft Q2",
    description: "Rentokil Initial retired its 2027 North America margin target after US pest control growth slowed to 2.4% in Q2 2026, and shares fell 16% on the news.",
    dek: "The owner of Terminix says it will reinvest in its North American business instead of chasing a 20% margin goal.",
    date: "2026-07-30",
    topic: "business",
    body: [
      "Rentokil Initial, the parent of Terminix, reported first-half 2026 results on July 30 and told investors it is giving up on a key promise for its North American business. The company retired its target of a 20% North America margin in 2027, saying it would put money back into the region instead.",
      "The market did not like it. AJ Bell reported that Rentokil shares sank 16% to 370.60 pence that day, making it the worst performer in the FTSE 100.",
      "The headline numbers were not bad on their own. Group revenue for the half was $3,589 million, up 6.7% on a reported basis. North America revenue reached $2,197 million, with organic growth of 3.7%. But the core US pest control line grew more slowly. North America Pest Control Services posted organic growth of 2.6% for the half, slipping from 2.8% in the first quarter to 2.4% in the second. AJ Bell noted the second-quarter figure came in below the 3.0% midpoint of guidance.",
      "According to the company’s report, residential revenue grew solidly through the half, but termite growth slowed in the second quarter, and commercial growth was slower, especially in national accounts. Rentokil also flagged weakness in residential lead flow toward the end of the second quarter that carried into July.",
      "Chief executive Mike Duffy said reaching the company’s potential will take “disciplined reinvestment primarily back into the North America business.” The company said it now wants to favor volume growth over short-term margin gains.",
      "Part of that plan is physical. Rentokil said it hit its 2026 target of opening 70 smaller local branches, aimed at areas with higher household incomes. It also reported $45 million in gross cost savings in the half, or $28 million after reinvestment, and continued to roll out its PestConnect connected device system in the US.",
      "Rentokil’s update landed about a week after Rollins described a similar slowdown in residential leads. Taken together, the two largest players in US pest control are telling the same story: commercial and relationship-driven work is holding up, while consumer-driven residential demand got softer in late spring. Rentokil said it still expects full-year profit to land in line with market expectations."
    ],
    whatItMeans: "Expect Terminix to keep pushing new local branches and residential growth, which means more competition for homeowner accounts in many markets. For independent owners, a cooler residential lead market is a reason to lean on referrals, renewals and commercial work rather than paid search alone.",
    sources: [
      { name: "Rentokil Initial half-year financial report (via Investegate)", url: "https://www.investegate.co.uk/announcement/rns/rentokil-initial--rto/half-year-financial-report/9694673" },
      { name: "AJ Bell: Rentokil shares plunge as it retires margin target", url: "https://www.ajbell.co.uk/news/articles/rentokil-shares-plunge-retires-margin-target-after-us-pest-miss" }
    ]
  },
  {
    slug: "rollins-q2-2026-residential-leads-slow",
    title: "Rollins Q2: Residential Slows, Commercial Grows",
    description: "Rollins grew Q2 2026 revenue 7.9% to $1.1 billion, but residential pest control lagged as consumer leads slowed while commercial and termite work grew faster.",
    dek: "Orkin’s parent posted its 99th straight quarter of revenue growth, but said digital lead volume for residential work fell short.",
    date: "2026-07-22",
    topic: "business",
    body: [
      "Rollins, the parent company of Orkin and a long list of regional brands, reported second-quarter 2026 results on July 22. Revenue rose 7.9% from a year earlier to $1.1 billion, with organic growth of 5.7%. It was the company’s 99th consecutive quarter of revenue growth.",
      "Under the headline, the mix told a more mixed story. Organic growth by service line was 3.6% in residential, 7.2% in commercial and 8.9% in termite and ancillary services. Residential pest control, the biggest consumer-facing piece of the business, was the laggard.",
      "Chief executive Jerry Gahlhoff Jr. said results “fell short of expectations,” pointing to slower growth in parts of residential pest control. The softness was concentrated in brands that depend on customers finding them through search, digital media and inbound calls. Relationship-based channels, such as home builder work and door-to-door sales, delivered solid organic growth.",
      "Rollins said lead volume improved toward the end of June and held that momentum through the first weeks of July. Coverage of the earnings call described the lead environment as getting worse through the quarter before that late recovery.",
      "Profit grew more slowly than sales. Net income was $144 million, up 1.7%, and earnings per diluted share were $0.30, up 3.4%. Operating margin fell 110 basis points to 18.7%, and adjusted EBITDA margin fell 120 basis points to 21.9%.",
      "The company kept buying. Rollins spent $117 million on acquisitions in the quarter, paid $88 million in dividends and spent $6 million on capital expenditures. Operating cash flow was $173 million.",
      "About a week later, Rentokil Initial reported a similar late-quarter dip in residential lead flow at Terminix. With the two largest US operators both pointing to the same pattern, the slowdown looks more like a market-wide shift in how homeowners were shopping for service this spring than a problem at any one company.",
      "For people in the field, the service-line numbers are worth a closer look. Commercial accounts and termite work grew roughly twice as fast as residential pest control at Rollins this quarter. That kind of work tends to come from contracts, builder relationships and inspections rather than a homeowner typing a search into a phone, and it has proven steadier when consumer demand cools. It is also the kind of work where documentation, inspection quality and repeat service carry the account."
    ],
    whatItMeans: "If your phones were quieter in May and June, you were not alone. Owners who rely heavily on paid search may want to build up referral, builder and commercial channels, which held up better for the biggest companies in the industry.",
    sources: [
      { name: "Rollins Q2 2026 results press release (via Placera)", url: "https://www.placera.se/pressmeddelanden/rollins-rollins-inc-reports-second-quarter-2026-financial-results-20260722" },
      { name: "Rollins Q2 2026 results (via Webull)", url: "https://www.webull.com/news/15272748094071808" }
    ]
  },
  {
    slug: "new-world-screwworm-confirmed-in-texas",
    title: "New World Screwworm Confirmed in Texas",
    description: "USDA confirmed New World screwworm in a Zavala County, Texas calf on June 3, 2026, and cases quickly climbed. What pest pros in the region should know.",
    dek: "The flesh-eating fly larvae were found in U.S. livestock and a dog in June, prompting quarantines and stepped-up sterile fly releases.",
    date: "2026-06-03",
    topic: "invasive",
    body: [
      "New World screwworm is back in the United States. On June 3, 2026, USDA’s Animal and Plant Health Inspection Service confirmed the pest in a three-week-old calf in Zavala County, Texas. The larvae were found in the calf’s navel area.",
      "Screwworm is a fly whose larvae feed on the living flesh of warm-blooded animals. It mostly hits livestock, but it can also infest pets, wildlife and, less often, people and birds. The female lays eggs in open wounds or around body openings, and the maggots burrow in.",
      "The first case did not stay alone for long. By June 12, USDA data listed nine confirmed U.S. cases: eight in Texas and one in a dog in Lea County, New Mexico. Texas cases at that point involved cattle and goats in Zavala, La Salle, Gillespie and Edwards counties. A July 2026 update from a University of Tennessee vector-borne disease working group reported 41 total Texas cases, with activity in six counties.",
      "APHIS said its response includes a unified incident command with the Texas Animal Health Commission, a 20-kilometer infested zone with quarantines and movement controls, extra trapping along the border, and wildlife surveillance. The agency also added ground release of sterile flies on top of the roughly 4 million sterile flies per week already being dropped from the air. More than 130 million sterile male flies had been released in Texas since January, according to reporting on USDA data.",
      "Under Secretary Dudley Hoskins said, “The United States has defeated this pest before, and we will do it again.” USDA stressed that the food supply is safe, since screwworm does not infect meat or produce.",
      "USDA’s advice to animal owners is to check animals for wounds that drain or grow, signs of discomfort, and maggots near the nose, ears, genitals or navel. Suspected cases should go to a state animal health official or USDA area veterinarian right away. People with suspicious sores should see a doctor.",
      "Pest control crews working rural properties, ranch homes, kennels and wildlife exclusion jobs in South Texas are among the people most likely to see an animal up close. A dog with a draining wound full of maggots or a dead animal under a deck is not just a fly job anymore in an affected area. It is a possible report to animal health officials."
    ],
    whatItMeans: "Screwworm is a veterinary and regulatory matter, not something to treat on a pest call. If you see maggots in a wound on a pet, livestock or wildlife in South Texas or nearby, tell the owner to call a vet and report it to the state animal health agency or USDA immediately.",
    sources: [
      { name: "USDA APHIS: USDA confirms presence of New World screwworm in the United States", url: "https://www.aphis.usda.gov/news/agency-announcements/usda-confirms-presence-new-world-screwworm-united-states" },
      { name: "New World screwworm cases climb to nine in U.S.", url: "https://idahonews.com/news/nation-world/new-world-screwworm-cases-climb-to-nine-in-us-with-two-more-confirmed-in-texas" },
      { name: "University of Tennessee Vector & VBD Watch, July 20, 2026", url: "https://vectorvbdwatch.tennessee.edu/?p=548" }
    ]
  },
  {
    slug: "pestworld-2026-grapevine-texas",
    title: "PestWorld 2026 Heads to Grapevine, Texas",
    description: "NPMA’s PestWorld 2026 runs October 20–23 at the Gaylord Texan in Grapevine, Texas, with more than 250 exhibitors and CEU-eligible education sessions.",
    dek: "The industry’s biggest annual show returns this month under the theme “Built for This Business.”",
    date: "2026-05-11",
    topic: "industry",
    body: [
      "The National Pest Management Association opened registration for PestWorld 2026 in May, and the show is now just weeks away. This year’s event runs October 20 through 23 at the Gaylord Texan Resort and Convention Center in Grapevine, Texas, in the Dallas–Fort Worth area. The theme is “Built for This Business.”",
      "PestWorld is the largest yearly gathering in the professional pest control world. According to the UK-based National Pest Technicians Association, the 2025 event drew more than 4,500 delegates, including nearly 640 international attendees from 75 countries.",
      "Education is a big part of the draw. NPMA said the 2026 program includes more than 40 sessions across business, fumigation, safety, technical, wildlife and wood-destroying organism tracks. Attendees can pick up continuing education credits along the way, which matters for techs and owners juggling license renewals.",
      "The exhibit hall is billed as the industry’s largest, with more than 250 companies spread across 128,000 square feet. That is where manufacturers, distributors, software vendors and equipment makers show what is new for the coming season.",
      "The schedule opens with a ceremony on Tuesday, October 20. Main stage keynote speakers are set for Wednesday and Thursday, and the event wraps up with a closing celebration called PestFest on Friday, October 23.",
      "Early-bird pricing ended September 3, so anyone registering now will pay standard rates. NPMA’s registration page has the current details.",
      "NPMA describes the show as a place to bring together thousands of attendees from around the world for four days of education, networking, business development and new ideas. For a working tech, that mix can be useful in a very plain way. The technical and wood-destroying organism tracks are where you hear how other companies handle the problems you see on your own routes, from tough German cockroach accounts to termite inspections and wildlife calls. The safety and fumigation tracks cover the parts of the job where mistakes are the most costly.",
      "For owners and managers, the business track and the hallway conversations are often the main event. The past year has brought plenty to talk about: a softer residential lead market at the largest public companies, steady acquisition activity, and a farm bill fight in Congress over whether local governments can set their own pesticide rules.",
      "If you are going for the first time, a few habits help. Look at the session list before you arrive and mark the ones that count toward your state’s credit requirements. Keep the paperwork you need to document attendance. Walk the exhibit hall with a short list of questions about products you already use, not just new launches. And swap contact info with people from other regions, because the best advice at these shows often comes from someone who has already solved your problem somewhere else."
    ],
    whatItMeans: "If you are going, plan your sessions around the CEUs your state requires and use the exhibit hall to compare tools side by side. If you are not, ask the people from your company who attend to bring back notes on new products and label changes.",
    sources: [
      { name: "NPMA: Registration opens for PestWorld 2026", url: "https://www.npmapestworld.org/your-business/latest-news/built-for-this-business-registration-opens-for-pestworld-2026/" },
      { name: "NPTA: Programme announced for PestWorld 2026", url: "https://www.npta.org.uk/programme-announced-for-pestworld-oct-2026/" }
    ]
  },
  {
    slug: "house-strips-pesticide-preemption-from-farm-bill",
    title: "House Strips Pesticide Preemption From Farm Bill",
    description: "In an April 29 vote of 280–142, the House removed farm bill language that would have barred local pesticide rules, a top NPMA priority for 2026.",
    dek: "Lawmakers from both parties voted to drop provisions on local pesticide rules and manufacturer liability, then passed the farm bill the next day.",
    date: "2026-04-29",
    topic: "regulation",
    body: [
      "The pest control industry’s top federal goal for 2026 took a hit in the House this spring. On April 29, House members voted 280 to 142 to strip pesticide provisions out of the farm bill, including language that would have stopped local governments from regulating the use of labeled pesticides.",
      "Federal preemption of local pesticide rules has been a long-running priority for the National Pest Management Association. At NPMA’s Legislative Day in Washington, held March 15 to 17, more than 475 pest management professionals attended, and more than 230 members met with lawmakers and their staff. The main ask was getting pesticide preemption into the 2026 farm bill.",
      "The amendment that removed the language was offered by Rep. Anna Paulina Luna, a Florida Republican, and passed with support from both parties. According to an analysis by farmdoc daily at the University of Illinois, one of the struck sections would have barred local regulation of labeled pesticides, which would have kept towns and cities from adding their own restrictions, such as limits near schools. Another struck section dealt with manufacturer liability and would have limited states and courts from penalizing pesticide makers over their products.",
      "A day later, on April 30, the House passed the Farm, Food, and National Security Act of 2026 by a vote of 224 to 200. Coverage from the agricultural science societies noted that the final House bill dropped the language preempting state and local pesticide warning label rules.",
      "The fight is not over. The Senate Agriculture Committee still has to produce its own version of the bill, and congressional leaders have said they want a final compromise before the end of the year. Supporters of preemption could try to restore some form of the language in the Senate or in a final conference deal.",
      "For now, the patchwork stays in place. In states that do not already preempt local pesticide ordinances, cities and counties keep whatever authority state law gives them to set their own rules on pesticide use. That means a company working across several towns can still face different notice, posting or product rules from one job to the next."
    ],
    whatItMeans: "Keep tracking local ordinances where you work, because a single federal standard is not coming through the House bill. Owners who want preemption should watch the Senate version and stay in touch with NPMA and their state association on next steps.",
    sources: [
      { name: "farmdoc daily: Chemical collision — the pesticide provisions that nearly derailed the House bill", url: "https://farmdocdaily.illinois.edu/2026/04/chemical-collision-the-pesticide-provisions-that-nearly-derailed-the-house-bill.html" },
      { name: "CSA News: House approves farm bill", url: "https://www.sciencesocieties.org/publications/crops-soils/2026/may/house-approves-farm-bill" },
      { name: "NPMA: Legislative Day 2026", url: "https://www.npmapestworld.org/your-business/latest-news/npma-legislative-day-2026-industry-unites-in-washington-to-protect-our-future/" }
    ]
  },
  {
    slug: "asian-longhorned-tick-confirmed-in-alabama",
    title: "Asian Longhorned Tick Confirmed in Alabama",
    description: "Alabama confirmed its first Asian longhorned tick on a dog in DeKalb County in April 2026. By July the invasive tick was active in 27 states.",
    dek: "The self-cloning invasive tick keeps moving south and north, with new county finds across the eastern half of the country.",
    date: "2026-04-23",
    topic: "invasive",
    body: [
      "The Asian longhorned tick has reached Alabama. The Alabama Department of Agriculture and Industries reported in April 2026 that the tick was found on a dog in DeKalb County, in the northeast corner of the state.",
      "The tick is native to eastern Asia and was first confirmed in the United States by USDA in 2017. Alabama’s notice said it was in 24 eastern states as of April. By July 18, a University of Tennessee vector-borne disease working group listed 27 states with active detections, including Alabama and Connecticut, and more than 400 county detections nationwide.",
      "What makes this tick a problem is how fast it can build up. Females can reproduce without mating and lay roughly 1,000 to 2,000 eggs at a time, so a single tick can start a new population. Heavy infestations on livestock can weaken animals and stunt weight gain.",
      "The main animal health worry is Theileria orientalis, a blood parasite of cattle that the tick is known to spread. Alabama officials also noted the tick can carry the agents of Rocky Mountain spotted fever and Heartland virus. The University of Tennessee summary reported that multiple Theileria types are circulating in the U.S. and that Ohio has seen a sharp rise in detections compared with 2021.",
      "New county finds in 2026 included spots in Arkansas, Kentucky, New York, North Carolina and seven Pennsylvania counties, according to the working group. Producers have tried spraying, ear tags, mowing and other pesticide treatments, with mixed results.",
      "Alabama’s guidance for animal owners is to check animals often, especially the head, neck, flanks, armpits, groin and under the tail. The state recommends keeping grass and weeds trimmed, clearing brush and using acaricides. Unusual or heavy infestations should be reported to a veterinarian, extension agent or the State Veterinarian’s Office.",
      "For pest control companies, the longhorned tick is mostly a residential and rural property issue. It shows up on dogs, in pastures and in the overgrown edges where lawns meet woods. Because it does not look like the deer ticks and lone star ticks most customers know, a homeowner may bring one in a bag and ask what it is. That is a good moment to get a proper ID through the local extension office, especially in a county where it has not been reported before."
    ],
    whatItMeans: "Tick service customers in the Southeast and Northeast may start finding a tick they have never seen before, often on dogs. Save specimens for identification through your extension office, and focus yard work on habitat reduction and labeled perimeter treatments in tall grass and brush edges.",
    sources: [
      { name: "Alabama Department of Agriculture and Industries: Asian longhorned tick detected in Alabama", url: "https://agi.alabama.gov/animalindustries/2026/04/asian-longhorned-tick-detected-in-alabama/" },
      { name: "University of Tennessee Vector & VBD Watch, July 20, 2026", url: "https://vectorvbdwatch.tennessee.edu/?p=548" }
    ]
  },
  {
    slug: "rollins-acquires-romex-pest-control",
    title: "Rollins Buys Utah-Based Romex Pest Control",
    description: "Rollins acquired Romex Pest Control of Pleasant Grove, Utah, in April 2026, adding a 200-plus employee, door-to-door-driven company that serves four states.",
    dek: "Romex will keep its own brand as Rollins uses the deal to enter new markets.",
    date: "2026-04-02",
    topic: "business",
    body: [
      "Rollins announced on April 2, 2026, that it has acquired Romex Pest Control, a fast-growing company based in Pleasant Grove, Utah. Terms were not disclosed.",
      "Romex was founded in 2016 and has more than 200 employees. It serves residential and commercial customers in four states and ranks among the top 40 companies on the PCT 100 list. Rollins said Romex built its business on door-to-door marketing and data-driven decisions, and is known for eco-friendly operations.",
      "Rollins president and CEO Jerry Gahlhoff said the deal gives the company entry points into new markets and supports its long-term growth plans in new regions of the U.S. Like many Rollins acquisitions, Romex will keep its own name. Rollins said the brand will stay because of its strong reputation for customer-focused service.",
      "Romex leadership pitched continuity to its customers, saying they would see “the same faces, the same service, and the same standards.” The Potomac Company served as the exclusive financial advisor to Romex, according to PMP.",
      "The deal is part of a steady acquisition pace at Rollins, which owns Orkin and a group of regional brands. In its second-quarter report in July, Rollins said it spent $117 million on acquisitions during that quarter alone.",
      "Romex’s growth model also lines up with what Rollins later said was working this year. When Rollins reported a slowdown in residential leads from search and inbound calls in the second quarter, it said relationship-based channels such as door-to-door sales were still growing well.",
      "Rollins described the deal as part of what its chief financial officer called the company’s M&A playbook. In practice, that playbook has meant buying established regional companies, keeping their local names and staff, and folding them into the larger group behind the scenes. Rollins has used that approach to grow well beyond the Orkin brand over the years.",
      "Pest control remains a fragmented market with many small and mid-sized local companies, which gives buyers like Rollins a steady supply of acquisition targets. A company like Romex, with a sizable workforce built in about a decade, a multi-state footprint and a proven sales model, fits that strategy.",
      "For customers, Rollins and Romex both said the day-to-day experience should not change. For the people who work there, joining a much larger company can open doors to training, benefits and career paths that a smaller operator may not offer."
    ],
    whatItMeans: "Fast-growing door-to-door companies in the West are getting the attention of big buyers. For techs at acquired companies, a kept brand usually means routes and customers stay the same at first, but expect changes in systems and benefits over time.",
    sources: [
      { name: "Rollins: Rollins acquires Romex Pest Control", url: "https://rollins.com/investors/press-releases/detail/429/rollins-acquires-romex-pest-control" },
      { name: "PMP: Rollins to acquire Romex Pest Control", url: "https://www.mypmp.net/rollins-to-acquire-romex-pest-control/" },
      { name: "Rollins Q2 2026 results (via Webull)", url: "https://www.webull.com/news/15272748094071808" }
    ]
  }
];
