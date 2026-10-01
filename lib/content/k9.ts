/**
 * k9.ts — the kinds of K9 work in US pest control, shown on /fields/k9-detection/.
 * Researched 2026-10-01 against peer-reviewed studies, eCFR, USFWS, USDA APHIS, CDC, EPA and
 * state agencies. `notes` is maintainer-only and never rendered.
 */
// K9 (dog) work in US pest control — field guide data.
// Research compiled 2026-10-01. Not legal advice. Every factual claim below comes from a
// source that was opened during research (see `sources` and the maintainer `notes`).

export interface K9Specialty {
  slug: string;
  name: string;
  summary: string;
  howItWorks: string[];
  evidence: string;
  rules: string;
  sources: { label: string; url: string }[];
  notes: string;
}

export const K9_SPECIALTIES: K9Specialty[] = [
  {
    slug: 'bed-bug-detection',
    name: 'Bed bug detection',
    summary:
      'A trained dog and handler search rooms, furniture and whole buildings for the scent of live bed bugs and viable eggs. The dog gives a trained alert, and the handler marks the spot for a technician to check. Teams are used in hotels, multifamily housing, offices and schools, and to confirm whether a treated unit is clear.',
    howItWorks: [
      'The dog works on lead and sniffs beds, furniture, baseboards and wall voids, then gives a trained alert, usually a sit or a paw, at the strongest source of odor. The dog is rewarded with food or play for a correct find. Dogs can be trained to pick out live bugs and viable eggs from dead bugs, cast skins and feces.',
      'UF/IFAS Extension lists where dogs help most: when bed bugs are suspected but a visual inspection finds nothing, whole-building inspections, places other than bedrooms (offices, theaters, schools, public transport), and confirming that control worked.',
      'An alert is a lead, not proof. Before anyone treats, a technician should find live bugs or viable eggs where the dog alerted. A false alert can mean pesticide applied where none is needed.',
      'Dog teams need regular maintenance training. The Rutgers field study suggests training in real infested sites, building up the dog in heat, and turning down jobs when conditions are too poor for a good inspection.',
    ],
    evidence:
      'Lab and controlled tests show what a well-trained dog can do. Pfiester, Koehler & Pereira (2008, Journal of Economic Entomology 101:1389–1396) found dogs told bed bugs apart from other insects with a 97.5% positive indication rate and 0% false positives. They picked live bugs and viable eggs over dead bugs, cast skins and feces with a 95% positive indication rate and a 3% false-positive rate on bed bug feces. In hotel rooms with planted bugs, they were 98% accurate. Real buildings are harder. Cooper, Wang & Singh (2014, Journal of Economic Entomology 107:2171–2181) tested 11 commercial dog teams in naturally infested New Jersey apartments. Every handler believed their dog found more than 95% of infestations. Across three experiments, the mean detection rate was 44% (range 10–100%) and the mean false-positive rate was 15% (range 0–57%). Teams with higher detection rates also had more false positives. Results changed a lot from day to day for the same team. Detection did not depend on infestation level, and neither the team\'s experience nor its certification status predicted detection rate. Only 1 of 16 inspections reached at least 90% detection with no more than 10% false positives. For comparison, the same paper cites a 93% detection rate from interceptor traps left in place for 7–14 days.',
    rules:
      'Rules differ a lot by state, and in some states, inspection-only dog work is licensed pest control. North Carolina\'s Department of Agriculture says canine scent detection for bed bugs is structural pest control. Anyone offering it must hold a "P-phase" Structural Pest Control licence or employ a full-time licence holder. They must also keep inspection records and work under the contracting company. UF/IFAS Extension says dog detection counts as a pest control activity in Florida and requires licensing from FDACS. Maryland regulation COMAR 15.05.01.14(C) bars a pest control business from using a dog team unless the dog and handler are certified together as a team for each target pest by a Department-recognized certifier. Teams must recertify every year, and businesses must keep training records for 2 years. Testers need at least 5 years of documented scent-dog experience and cannot be the dog\'s trainer. Voluntary certification bodies exist, such as the National Entomology Scent Detection Canine Association (NESDCA), a body of pest control owners and operators that certifies dog teams. Do not assume private certification meets a state rule or proves field accuracy. Check your state.',
    sources: [
      {
        label: 'Pfiester, Koehler & Pereira 2008, J. Econ. Entomol. 101(4):1389–1396',
        url: 'https://bioone.org/journals/journal-of-economic-entomology/volume-101/issue-4/0022-0493_2008_101_1389_AOBBCT_2.0.CO_2/Ability-of-Bed-Bug-Detecting-Canines-to-Locate-Live-Bed/10.1603/0022-0493(2008)101[1389:AOBBCT]2.0.CO;2.short',
      },
      {
        label: 'Cooper, Wang & Singh 2014, J. Econ. Entomol. 107(6):2171–2181 (Rutgers PDF)',
        url: 'https://entomology.rutgers.edu/personnel/changlu-wang/docs/Cooper2014AccuracyCanines.pdf',
      },
      {
        label: 'NCDA&CS — Canine Scent Pest Detection: License Requirements (2013)',
        url: 'https://ncagr.gov/divisions/structural-pests-and-pesticides/structural-canine-detection-licensure/open',
      },
      {
        label: 'Maryland Dept. of Agriculture — COMAR 15.05.01 (incl. .14C Canine Pest Detection Teams)',
        url: 'https://mda.maryland.gov/plants-pests/SiteAssets/Pages/Pesticide-Information-for-Professionals/COMAR%2015.05..01%2010.22%20(1).pdf',
      },
      {
        label: 'UF/IFAS Extension — Bed Bug Identification & Inspection',
        url: 'https://sfyl.ifas.ufl.edu/bed-bugs/bed-bug-identification/',
      },
    ],
    notes:
      'The brief\'s premise that inspection-only dog teams may not need a pesticide licence is wrong for at least NC, and Florida per UF/IFAS. I did not find an FDACS primary page; the Florida claim rests on UF/IFAS Extension. The MD COMAR copy is MDA\'s Oct 2022 printout, so recheck it against current COMAR before launch. The MD press release (Jan 2013) described the rules as proposed; the COMAR text confirms they were adopted. The NC letter is dated 2 Oct 2013; confirm it is still current. NESDCA: confirmed it exists from nesdca.com and from Cooper 2014, which names it with IAOCPI and WDDO. Its site did not state recertification intervals or target pests, so I made no claims about those and did not list it as a source. Pfiester numbers come from the BioOne abstract only; I did not read the full text. Cooper 2014 full text was read: the 93% interceptor figure and the 1-of-16 standard are in its Discussion.',
  },
  {
    slug: 'termite-wdi-detection',
    name: 'Termite and wood-destroying insect detection',
    summary:
      'Dogs trained on termite odor search walls, floors and wood in structures to find live termite activity hidden behind finishes. They add to a standard termite or WDI inspection and do not replace it. The evidence comes mostly from lab and controlled tests, and dogs can alert on old termite-damaged wood.',
    howItWorks: [
      'The handler leads the dog along walls, baseboards, door frames and other likely spots. The dog alerts where termite odor is strongest, and the inspector then probes, opens or uses other tools to confirm live activity.',
      'In the main peer-reviewed study, dogs were trained with US Customs scent-detection methods changed to use food rewards. Dogs trained on eastern subterranean termites also found several other termite species.',
      'Dogs are most useful for finding hidden activity quickly. They are weaker at telling live termites apart from old damage, so findings need confirming before anyone treats or writes a report.',
    ],
    evidence:
      'Brooks, Oi & Koehler (2003, Journal of Economic Entomology 96:1259–1266) found trained dogs were 95.93% accurate at finding 40 or more eastern subterranean termite workers. They wrongly alerted on 2.69% of containers without termites. The same dogs were 100% accurate on dark southern subterranean termites, 98.89% on Formosan subterranean termites, 97.33% on powderpost termites and 88.89% on southeastern drywood termites. False responses were 25.33% to termite-damaged wood, 6.67% to American cockroaches and 2.67% to Florida carpenter ants. Cooper et al. (2014) quote Brooks et al. as proposing at least 90% detection and no more than 10% false positives as a reasonable minimum standard. Cooper et al. also cite an earlier termite study (Lewis et al. 1997) with a mean 81% detection rate and 28% false positives in a lab setting. We found no peer-reviewed field study of commercial termite dog teams in real structures.',
    rules:
      'Wood-destroying insect inspections and reports are regulated pest control work in many states, often with set report forms. In Maryland, for example, COMAR 15.05.01.14 sets WDI report content, and its canine team rules apply to "any pest". In North Carolina, structural pest control by statute includes identifying infestations and making inspections. A dog alert alone should not be the basis of a WDI report finding. Check your state for licence category and report requirements.',
    sources: [
      {
        label: 'Brooks, Oi & Koehler 2003, J. Econ. Entomol. 96(4):1259–1266',
        url: 'https://bioone.org/journals/Journal-of-Economic-Entomology/volume-96/issue-4/0022-0493-96.4.1259/Ability-of-Canine-Termite-Detectors-to-Locate-Live-Termites-and/10.1603/0022-0493-96.4.1259.full',
      },
      {
        label: 'Cooper, Wang & Singh 2014 (cites Brooks standard and Lewis et al. 1997)',
        url: 'https://entomology.rutgers.edu/personnel/changlu-wang/docs/Cooper2014AccuracyCanines.pdf',
      },
      {
        label: 'Maryland COMAR 15.05.01 (WDI reports; canine teams)',
        url: 'https://mda.maryland.gov/plants-pests/SiteAssets/Pages/Pesticide-Information-for-Professionals/COMAR%2015.05..01%2010.22%20(1).pdf',
      },
    ],
    notes:
      'Brooks 2003 numbers come from the BioOne abstract; I did not read the full text, so the number of dogs and the test setup are unconfirmed. The abstract implies a lab or container test. The 90%/10% standard is quoted by Cooper 2014, not taken from the Brooks abstract. Lewis et al. 1997 (Forest Products Journal) was not opened directly; its figures are as cited in Cooper 2014. I did not find a state rule that names termite dogs specifically, other than MD\'s "any pest" rule. The claim that dog alerts should not stand alone in a WDI report is a practical inference from the false-positive data, not a cited rule.',
  },
  {
    slug: 'rodent-detection',
    name: 'Rodent detection (invasive species and biosecurity)',
    summary:
      'Scent dogs are trained to find rodents, or their droppings, where people and traps miss them. Some pest control teams use dogs to pinpoint rodent activity in warehouses and commercial accounts. Most published research comes from agency and conservation programs that use dogs to confirm an eradication worked.',
    howItWorks: [
      'Dogs are trained on the target animal or its scat and search large areas, such as marsh, islands or ports, where traps and cameras would miss the last few animals. Scat is often the target because it is easier to find across a large landscape than the animal itself.',
      'In the Chesapeake Bay Nutria Eradication Project, USDA Wildlife Services, the US Fish and Wildlife Service and Maryland DNR used detector dogs with shoreline and ground surveys, monitoring platforms, lures and remote cameras. Dog teams were especially useful for confirming that nutria were gone from areas already trapped.',
      'On islands, detection dogs search for rats after an eradication, and as ongoing biosecurity, to catch a reinvasion early.',
      'In commercial pest control, a dog can work stacked pallets, racking and wall lines in a warehouse to point the technician at live activity, so traps and exclusion go where the rodents actually are. We found no published accuracy data for this commercial use, so treat a dog alert as a lead to confirm, the same as with bed bugs.',
    ],
    evidence:
      'Davis, Seddon, Craig & Russell (2023, Biological Invasions) reviewed 51 empirical studies from 17 countries, 58% from New Zealand. They concluded that motion-sensing cameras and rodent detection dogs have greatly improved detection of rats at low densities. Dogs can reliably detect even a single rat, but cost and the skill needed for training and upkeep limit their wider use. Cameras consistently detected rats at lower densities than other techniques. In Maryland, USFWS reports the last known nutria was caught in May 2015, after more than 20 years of work. About 14,000 nutria were removed, and more than 700 landowners protected about 250,000 acres of marsh. Detector dogs were one tool among several, and no separate detection rate for the dogs was reported in the sources opened.',
    rules:
      'This work is usually done by or under contract to federal, state or tribal agencies, often on public or conservation land, and access depends on landowner and agency permission. Trapping or killing the target animal falls under wildlife and pesticide rules that vary by state and species. Check your state wildlife agency.',
    sources: [
      {
        label: 'Davis et al. 2023, Biological Invasions — review of methods for detecting rats at low densities (ECU record)',
        url: 'https://ro.ecu.edu.au/ecuworks2022-2026/2932',
      },
      {
        label: 'USFWS — Decades-long partnership eradicates destructive nutria rodents from Maryland (2022)',
        url: 'https://www.fws.gov/press-release/2022-09/decades-long-partnership-eradicates-destructive-nutria-rodents-maryland',
      },
      {
        label: 'Pepper et al. 2018 — Chesapeake Bay Nutria Eradication Project: 2017 Update (USDA NWRC repository)',
        url: 'https://digitalcommons.unl.edu/icwdm_usdanwrc/2535',
      },
    ],
    notes:
      'The USDA blog on Wildlife Services nutria detector dogs (usda.gov "unleashing-new-tool-stop-unexpected-invader") returned 403, so its search-snippet claims are NOT used: first used in 2013, dogs named Keeva and Rex, 5 weeks of scent training plus 4 weeks of applied training, alerting by barking. The "especially useful for confirming absence" point rests on the USFWS release and snippet wording; recheck it if possible. The repository abstract for Pepper et al. 2018 says over 400 landowners, while the USFWS release says over 700; they cover different periods. I did not find a US island rat-detection program page from APHIS or USFWS (e.g. Alaska/Pribilofs or Hawaii). Add one if found. The scope is borderline for a pest control site; it is kept per the brief.',
  },
  {
    slug: 'ratting-terriers',
    name: 'Ratting dogs (terrier rat control)',
    summary:
      'Terriers and similar dogs are used to find, flush and kill rats on farms, in barns and sometimes in cities, often together with people moving cover or clearing harborage. It is an old practice with a lot of anecdote but almost no published research on how well it works. It also carries real disease, poison and legal risks.',
    howItWorks: [
      'Handlers move feed, bales, debris or other cover, and the dogs catch and kill rats as they run. Some groups use ferrets or tools to flush burrows. A session can remove the rats that are exposed, but it does not touch the harborage, food and entry points that let a population rebuild.',
      'At best this is a knockdown tool inside an integrated program: sanitation, exclusion, harborage removal and monitoring. It is not a stand-alone control.',
    ],
    evidence:
      'We found no peer-reviewed study or university extension publication that measures how well ratting dogs control rat populations. Published evidence is anecdotal, from news and hobby sources, and is not used here. Treat claims of "eradication" with caution. The welfare and health risks are better documented. CDC says rodents carry and spread the bacteria that cause leptospirosis, and that animals can be infected through bites from rodents, by eating infected tissues, or through contact with infected urine. A leptospirosis vaccine for dogs is available in the US. EPA warns that pets and predators can be poisoned by eating rodents that took certain rodenticides. With second-generation anticoagulants, a rodent can feed many times before it dies, so a carcass may hold many times the lethal dose. Never run dogs where rodenticide baits are, or recently were, in use.',
    rules:
      'There is no federal licence for ratting dogs, and we found no state that licenses them. The federal animal-fighting law, 7 U.S.C. 2156, defines an animal fighting venture as a fight between at least two animals for sport, wagering or entertainment. It excludes activity whose primary purpose is using animals to hunt another animal. Ratting done as pest control on a job is a different thing from rats and dogs run for an audience or for bets, and state animal-cruelty and animal-fighting laws vary, so check your state before you offer it. Get written permission from the property owner, and from the landlord where it is not the same person, and confirm local leash and animal-control rules.',
    sources: [
      { label: 'CDC — Leptospirosis in Animals', url: 'https://www.cdc.gov/leptospirosis/pets/index.html' },
      {
        label: 'EPA — Rodent Control Pesticide Safety Review (secondary poisoning)',
        url: 'https://www.epa.gov/rodenticides/rodent-control-pesticide-safety-review',
      },
      { label: '7 U.S.C. § 2156 (Cornell LII) — animal fighting venture definition', url: 'https://www.law.cornell.edu/uscode/text/7/2156' },
    ],
    notes:
      'The evidence on effectiveness is thin; one search found only news and hobby articles, deliberately not cited. The point about ratting run for sport or wagering is my reading of the 7 USC 2156 text, not a court or agency interpretation, so have a lawyer review it or soften it. State cruelty statutes were not surveyed. "No state licenses ratting dogs" means none was found, not that none exists. Also consider whether a pest control company doing this commercially triggers state pest control licensing (cf. NC\'s broad definition) — unverified. The UK Hunting Act exemption for rats is irrelevant to the US and not included.',
  },
  {
    slug: 'goose-herding-dogs',
    name: 'Canada goose control with herding dogs',
    summary:
      'Trained herding dogs, usually border collies, chase resident Canada geese off lawns, ponds, golf courses, sports fields, corporate grounds and airfields. Repeated over time, this teaches geese the site is unsafe. The work is legal hazing under federal rules only as long as the dog scares and moves geese and never catches, injures or kills them.',
    howItWorks: [
      'The handler sends the dog at geese on turf, or on water with help from a boat, and the dog stalks and pushes them until they fly off. USDA Wildlife Services says the most effective dogs are trained off lead to chase birds as soon as they land. Some communities hire professional canine teams to disperse waterfowl in parks.',
      'Hazing works best before geese settle. Pair it with habitat changes, a no-feeding policy and, where registered, nest and egg treatment. USDA APHIS notes that adult geese not tending flightless goslings leave more readily when harassed.',
      'During the summer molt (roughly mid-June to early July in USDA\'s description), adults and goslings cannot fly. Chasing them then risks dogs catching birds and does little to move them.',
      'Expect geese to move nearby rather than disappear. Treat dog hazing as site protection, not population control.',
    ],
    evidence:
      'Holevinski, Curtis & Malecki (2007, Human–Wildlife Interactions 1(2)) marked 368 adult and 400 juvenile geese in one urban and one suburban community in western New York and hazed them after the molt. Border collies with remote-controlled boats removed more than 90% of geese in 97% of 37 events, border collies alone succeeded in 94% of 113 events, and night-time lasers in 64% of 134 events. But geese stayed loyal to sites, averaging 16.9 hazing events per radio-marked bird. They moved to places where hazing was not allowed, and on average they moved only 1.18 km, not far enough to reach hunting areas. Only 13% of adults and 7% of juveniles were harvested over 2 years. The authors concluded hazing alone is unlikely to reduce urban and suburban goose populations. Dogs clear a site, but they do not shrink the population.',
    rules:
      'Canada geese are protected under the Migratory Bird Treaty Act, which bars pursuing, hunting, taking, capturing or killing migratory birds unless regulations permit it (16 U.S.C. 703). Under 50 CFR 21.100(a), no permit is required merely to scare or herd depredating migratory birds other than endangered or threatened species or bald or golden eagles. USFWS also says control aimed only at scaring geese out of an area, such as harassment, needs no federal permit. A dog that catches, injures or kills a goose takes it unlawfully, so the dog must be under reliable control. Nest and egg work is separate: under 50 CFR 21.162, landowners, homeowners\' associations and local governments must register with USFWS through the eRCGR site before destroying nests or treating eggs. They must also register each employee or agent, report by October 31 each year, and hold any required state or tribal permits. Associations and local governments need the landowner\'s consent for private property. USFWS now says nest and egg work may take place at any time of year. Older APHIS material citing March 1–June 30 is out of date. Some states restrict harassing wildlife, and local leash laws may limit off-lead dogs. Check your state wildlife agency and local ordinances.',
    sources: [
      {
        label: 'eCFR 50 CFR Part 21 (21.100 depredation permits; 21.162 nest and egg depredation order)',
        url: 'https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21',
      },
      { label: 'USFWS Resident Canada Goose Registration — FAQ', url: 'https://apps.fws.gov/rcgr/resources/faq' },
      {
        label: 'USDA APHIS Wildlife Services — Preventing and Managing Waterfowl Damage',
        url: 'https://www.aphis.usda.gov/sites/default/files/fs-ws-manage-waterfowl.508.pdf',
      },
      {
        label: 'Holevinski, Curtis & Malecki 2007, Human–Wildlife Interactions 1(2)',
        url: 'https://digitalcommons.usu.edu/hwi/vol1/iss2/24/',
      },
      { label: '16 U.S.C. § 703 (Cornell LII) — Migratory Bird Treaty Act prohibitions', url: 'https://www.law.cornell.edu/uscode/text/16/703' },
    ],
    notes:
      'IMPORTANT: The brief cited 50 CFR 21.49 and 21.50; these numbers are obsolete. Current eCFR (Title 50, up to date as of 2026-09-29) has the nest/egg order at 21.162, airports at 21.159, agriculture at 21.165, public health at 21.168, and the scare/herd exemption at 21.100(a). I found no federal regulatory text naming dogs. The rule that a dog must not catch or harm geese is my inference from 16 USC 703 plus "take"; it is echoed by state and local guidance seen only in search snippets (Georgia DNR, City of Mentor), which were not opened or were blocked (403). I found no federal text that bans hazing during molt; the molt advice is practical (APHIS 2009 nesting PDF: flightless mid-June to early July). The no-feeding and habitat advice comes from the APHIS 2009 nesting PDF (https://www.aphis.usda.gov/sites/default/files/canada_goose.pdf), which also has the outdated March 1–June 30 window. Castelli & Sleggs 2000 (Wildlife Society Bulletin) was NOT found or opened; a search snippet said it was a retrospective at a Dow Jones NJ site and found dogs did not solve regional overabundance, so it is not cited. Carter 2000 (Dover AFB, Bird Strike Committee proceedings) was opened, but its author is from Border Collie Rescue Inc., so it is not used. Holevinski: the ">90% removed" threshold is stated for the collie+boat combination; whether "94% of 113 events" uses the same threshold should be checked in the full PDF (https://digitalcommons.usu.edu/cgi/viewcontent.cgi?article=1373&context=hwi). The eCFR source URL is the standard human page; the API was used for reading.',
  },
];
