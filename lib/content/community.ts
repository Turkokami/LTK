/**
 * community.ts — content contributed by LTK Discord members.
 *
 * Source: the LTK Discord content pack (scraped 2026-09-25). The owner confirmed on 2026-09-25
 * that the community has approved use of their photos and posts; credit is always by Discord
 * handle.
 *
 * EDITORIAL RULES for everything in this file (CLAUDE.md 2.5 still applies):
 *   - These are MEMBER REPORTS, not verified data or Lab reviews. Every item carries who said
 *     it and when, and pages label it that way.
 *   - Prices and pay are what a member said on the date shown. Never present them as market
 *     rates.
 *   - Chemistry notes are technique talk between licensed pros. The label is the law; pages
 *     say so next to every product mention.
 */

export interface Credit {
  /** Discord handle(s), as posted. */
  who: string;
  /** Month + year, or a range, as posted. */
  when: string;
}

/* ------------------------------------------------------------------ Lab: crew picks */

export interface CrewPick extends Credit {
  product: string;
  /** What members said, paraphrased from the post. Quotes are marked with quotation marks. */
  said: string;
  /** Product page: the member's link, else the manufacturer's page, else a major retailer. */
  link?: string;
  /** Extra links for generic picks (e.g. a category with several brands). */
  alsoLinks?: { label: string; url: string }[];
}

export interface CrewPickGroup {
  id: string;
  name: string;
  blurb: string;
  picks: CrewPick[];
}

/** Stable vote id for a pick. Never change a pick's product name without migrating its votes. */
export function pickId(product: string): string {
  return product
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

export const CREW_PICKS: CrewPickGroup[] = [
  {
    id: 'sprayers',
    name: 'Backpack and hand sprayers',
    blurb: 'The tool on every truck, and the one the crew argues about most.',
    picks: [
      {
        product: 'Lesco 4-gal electric backpack',
        said:
          'Ranked #1 of the 6–7 backpacks one member has run: Lesco, then FlowZone, Birchmeier pump, Birchmeier electric, B&G 2-gal pump, Ryobi, and Tomahawk last (burned up in 3 weeks). The adjustable tip handles cracks and deck boards. Downsides: the standard battery lasts about half a week (the larger one is ~$100), there is no pin-stream tip, and the holster breaks if it catches in a tailgate.',
        who: 'Greg',
        when: 'Mar & Sep 2026',
      },
      {
        product: 'Lesco / Smith backpack',
        said: '“Most comfortable backpack sprayer I’ve ever owned.”',
        who: 'Vulkans Wrath',
        when: 'Sep 2026',
      },
      {
        product: 'FlowZone Typhoon 3 / Storm 2',
        said:
          'Called the industry standard. One member runs 7–8 on shared batteries. Tips: pressure-washer fan tips make cheap fan nozzles, fan spray beats cone, and pulling the wand to use the green tip speeds up 3-up/3-out perimeter sprays.',
        who: 'LTK Director, Kywon, mykninjazx6',
        when: 'Jan 2025',
      },
      {
        product: 'FlowZone 1-gal handheld',
        said: '“By far the best interior sprayer.” Worth one on every truck, and it runs on the same battery as the backpacks.',
        who: 'Kywon',
        when: 'Jan 2025',
      },
      {
        product: 'FlowZone Vortex mosquito attachment',
        said: 'About $350. Quiet, with better range of motion than a blower. Rated 70+ minutes (32 on boost); the attachment battery dies before the backpack’s.',
        who: 'Jeff',
        when: 'Apr 2026',
      },
      {
        product: 'FlowZone OG mosquito fogger',
        said: 'The $10 louvered circle piece is a must, or you only get about two-thirds of the height.',
        who: 'Greg',
        when: 'Mar 2026',
      },
      {
        product: 'Milwaukee M18 4-gal Switch Tank',
        said: 'Divided opinions: “gets a lot of hate but I love it.”',
        who: 'Apollo_Justice, Agent',
        when: 'Mar 2025',
        link: 'https://www.milwaukeetool.com/products/3019-20ps',
      },
      {
        product: 'AlienTabi (Amazon)',
        said: 'Around $175 and “basically a FlowZone.”',
        who: 'Jeff',
        when: 'Apr 2025',
      },
      {
        product: 'Accuthor 1-gal stainless spray can',
        said: '$489 list, with a pressure-relief pull valve. The hose and wand connection is different from B&G. Was free with 5 cases of Bithor SC under an Ensystex promo that ran through August 2026.',
        who: 'Greg',
        when: 'Apr–Aug 2026',
      },
      {
        product: 'B&G / Airfog hand sprayers',
        said: 'Airfog has a good pressure-relief valve and a wide opening, but a skinny collar O-ring.',
        who: 'LTK Director',
        when: 'Dec 2024',
      },
      {
        product: 'Birchmeier backpack',
        said: 'The worst of the ones Greg has run. The battery isn’t protected from rain.',
        who: 'Greg',
        when: 'Sep 2026',
      },
    ],
  },
  {
    id: 'foggers-dusters',
    name: 'Foggers, dusters and aerosol delivery',
    blurb: 'For the jobs a sprayer can’t reach.',
    picks: [
      {
        product: 'VectorFog H200SF-SS thermal fogger',
        said: '“My baby… fun as hell to use.” Gas-powered.',
        who: 'Jeff',
        when: 'Apr 2026',
        link: 'https://www.domyown.com/vectorfog-h200sf-ss-thermal-fogger-p-26635.html',
      },
      { product: 'Golden Eagle and Vector thermal foggers', said: 'Also in the rotation.', who: 'Jeff', when: 'Apr 2025' },
      {
        product: 'Birchmeier DR-5 powder duster',
        said: 'The duster one member reaches for.',
        who: 'Vulkans Wrath',
        when: 'Sep 2026',
        link: 'https://www.amazon.com/dp/B01GEI9VS8',
      },
      { product: 'Dinftin electric DE duster', said: 'An electric option for diatomaceous earth.', who: 'Greg', when: 'Mar 2026' },
      { product: 'B&G aerosol delivery unit', said: '“Absolute game changer.”', who: 'BallisticEnigma', when: 'Mar 2025' },
      {
        product: 'Telescoping wand with brush and scraper heads',
        said: 'For wasp and mud dauber nests out of reach. Watch your trigger finger when it collapses.',
        who: 'Kywon, mykninjazx6, Łěğǐǒň',
        when: 'Jan 2025',
      },
    ],
  },
  {
    id: 'exclusion',
    name: 'Exclusion and hardware',
    blurb: 'What goes into the gap, and what it costs to put it there.',
    picks: [
      {
        product: 'Burrat Samurai Armor door sweep',
        said: 'Replaceable brush and cheaper than Xcluder. Selling a yearly brush replacement adds recurring revenue.',
        who: 'Vulkans Wrath',
        when: 'Feb 2026',
        link: 'https://burrtecusa.com/burrat',
      },
      { product: 'Duramor foam and 9/16" foam plugs', said: 'Used for concrete patching.', who: 'Greg', when: 'Apr 2026' },
      {
        product: 'Temporary reusable roofing anchors',
        said: 'About $15 retail. One member charges $150–175 per installed anchor, seals it under the tiles and leaves it for renewals.',
        who: 'Vulkans Wrath',
        when: 'Jul 2026',
      },
      {
        product: 'Hammer drills for slab drilling',
        said: 'Hilti has the best US service centers. Bosch is arguably the better tool but harder to get serviced.',
        who: 'Ian, Vulkans Wrath',
        when: 'May–Jun 2025',
      },
      {
        product: '18-gauge sheet metal with a truck-bed bender',
        said: 'For rodent exclusion instead of mesh and foam.',
        who: 'T Workman',
        when: 'Feb 2026',
      },
    ],
  },
  {
    id: 'traps-monitoring',
    name: 'Traps, monitoring and tech',
    blurb: 'Devices, sensors and the small tools that make inspections faster.',
    picks: [
      {
        product: 'Duramor Raptor rat trap',
        said: 'On one member’s shortlist.',
        who: 'Greg',
        when: 'Sep 2026',
        link: 'https://duramorusa.com/products/raptor-rat-trap',
      },
      {
        product: 'Gopher Hawk traps',
        said: 'Reusable, good for recurring mole programs. Talprid worms for small jobs; CO₂ or smoke in burrows.',
        who: 'SasquatchPCTX, LTK Director',
        when: 'Mar 2026',
      },
      { product: 'Skyhawk / Trapmate sensors', said: '“Hit the mark every time.”', who: 'LTK Director', when: 'May 2026' },
      {
        product: 'Digital monitoring, compared',
        said: 'Anticimex SMART drew mixed reviews from techs. Bell IQ is Bluetooth, so you have to be nearby, and it is modular with Protecta and T-Rex. Owl Sentry does automated deratization.',
        who: 'Hive-mind thread',
        when: 'Feb 2025 & Apr 2026',
      },
      {
        product: 'Gloves on remote-monitored stations',
        said: 'Field finding: rats avoided stations touched with bare hands. Wear gloves.',
        who: 'Vulkans Wrath',
        when: 'Oct 2025',
      },
      { product: 'Green laser pointer', said: '“Best walk-around tool” for inspections.', who: 'LTK Director', when: 'Jul 2026' },
      {
        product: 'Field ID optics',
        said: 'The NCSU/NOCS SPERT field scope (profits fund NCSU extension). On a budget, a ~$10 jeweler’s loupe or a clip-on phone macro lens. Put a dime in the shot for scale.',
        who: 'Topherdegrace, Saturniid, Vulkans Wrath',
        when: '2025–26',
        link: 'https://go.ncsu.edu/pesttools',
      },
      { product: 'FLIR thermal camera', said: 'Used to confirm temperatures during heat treatments.', who: '#daily-field-ops', when: '2025–26' },
    ],
  },
  {
    id: 'apps',
    name: 'Software and apps',
    blurb: 'Tools members point each other to.',
    picks: [
      {
        product: 'Name Dat Bug',
        said: 'AI pest ID and inspection-report app from BCE Adam Holt, who was looking for Android beta testers. The site also has a free label/SDS library and technical articles.',
        who: 'Hawkeyeholt',
        when: 'Jul 2026',
        link: 'https://app.namedatbug.com',
      },
      { product: 'Pomerix EPA pesticide search', said: 'Search registered pesticides.', who: 'LTK Director', when: 'May 2025', link: 'https://pomerix.com/pesticides' },
      { product: 'Pesticide applicator flashcards (Android)', said: 'Exam study on your phone.', who: '#training-grounds', when: '2025' },
    ],
  },
  {
    id: 'ppe',
    name: 'PPE, apparel and comfort',
    blurb: 'Twenty thousand steps a day is hard on the body. This is what helps.',
    picks: [
      {
        product: 'Thorogood work boots',
        said: 'Waterproof, 8" steel toe, factory refurbish at half price. “I walk 20–25k steps a day… they last 2–3 years.”',
        who: 'LTK Director',
        when: 'Jan & Dec 2025',
      },
      { product: 'Ergodyne Chill-Its 8937 cooling hat', said: 'Part of an OSHA heat plan.', who: 'Vulkans Wrath', when: 'Jun 2025' },
      { product: 'Truewerk T3 WerkPant', said: 'Knee-pad pockets.', who: 'Łěğǐǒň', when: 'Oct 2025' },
      {
        product: 'KORE Essentials ratcheting nylon belt',
        said: 'Lasted 4+ years. 5.11 makes a similar one.',
        who: 'Matt, barkingowl',
        when: 'Sep 2025',
      },
      { product: 'Bee suit and Kershaw work knives', said: 'Standard kit for stinging-insect calls.', who: 'Łěğǐǒň', when: '2025' },
    ],
  },
];

/* ------------------------------------------------------------------ Chemistry talk */

export interface ChemNote extends Credit {
  pest: string;
  notes: string[];
}

/** Technique talk between licensed pros. Always paired with "the label is the law" on the page. */
export const CHEM_TALK: ChemNote[] = [
  {
    pest: 'German cockroaches',
    notes: [
      'Advion WDG + Tekko Trio, or Phantom + Tekko Trio.',
      'Baits the crew rotates: Advion Trio, Vendetta Nitro, Ultimatum, Vanecto (a newer mode of action).',
      'Let roaches “detox” from repellent residues before expecting them to take bait.',
    ],
    who: 'Jeff, #the-hive-mind',
    when: '2025–26',
  },
  {
    pest: 'Ants',
    notes: ['Optigard gel, Alpine WSG.', 'Stop baiting when the soil cools; liquid into the nest works best in cold months.'],
    who: 'Jeff, Vulkans Wrath',
    when: '2025–26',
  },
  {
    pest: 'Spiders',
    notes: ['Onslaught FastCap, Web Out, IGRs.', 'Treat the source and fix entry points, not just the room where they’re seen.'],
    who: '#the-hive-mind',
    when: '2025–26',
  },
  {
    pest: 'Rodents',
    notes: ['Selontra (cholecalciferol), discussed for its lower secondary-poisoning risk.', 'Also in use: Rodenthor, First Strike, Resolve, Contrac, Cad3t.'],
    who: '#the-hive-mind',
    when: '2025–26',
  },
  {
    pest: 'Stinging insects',
    notes: ['Aerosol or foam, then remove the nest.', 'Treat old nest sites to mask the pheromone and discourage rebuilding.'],
    who: '#the-hive-mind',
    when: '2025–26',
  },
];

/* ------------------------------------------------------------------ Trade: job leads */

export interface JobLead {
  posted: string;
  role: string;
  where: string;
  details: string;
  contact: string;
  link?: string;
  who: string;
}

/**
 * Employer posts from #job-board, 2026 only (older ones are likely filled). NOT JobPosting
 * markup: these are leads shared in the Discord, not confirmed open postings with an expiry.
 * Excluded on purpose: the CERV post (a member later warned people to avoid the company).
 */
export const JOB_LEADS: JobLead[] = [
  { posted: '2026-09-01', role: 'Lead Technician', where: 'Wixom, Michigan', details: 'Requires Michigan certified applicator Core, 7F and 7A.', contact: 'DM 🥷🏽LT (regional manager) on Discord', who: '🥷🏽LT' },
  { posted: '2026-08-27', role: 'Southeastern Territory Representative (sales)', where: 'MGK · Southeast / remote', details: 'Manufacturer sales territory.', contact: 'Apply on LinkedIn', link: 'https://www.linkedin.com/jobs/view/4458309433', who: 'Vulkans Wrath' },
  { posted: '2026-08-18', role: 'Technician, part-time to full-time', where: 'Sasquatch Pest Control · Tomball / NW Houston, TX', details: 'Commission-based, competitive for the market. Licence a plus, will train; exclusion experience a big plus. Residential and commercial: rodents, exclusion, wildlife, mosquito, birds.', contact: 'DM Marcus (LTK Director) on Discord', who: 'LTK Director' },
  { posted: '2026-08-14', role: 'Pest Control Technician', where: 'Tekton · Southeast', details: '“Fast-growing local company.” Listing on Indeed.', contact: 'DM Tekton on Discord', who: 'Tekton' },
  { posted: '2026-06-10', role: 'Branch Manager', where: 'Fox Pest Control (a Rollins company) · Brewster, NY', details: '$87,000–$97,000/yr plus stock purchase, 401(k) and health, as posted.', contact: 'Listing on Indeed', who: 'Vulkans Wrath' },
  { posted: '2026-03-11', role: 'Service / Sales Manager', where: 'Pest Control Guys · Kansas City', details: '2+ years of pest control experience.', contact: 'Email Ben@pestcontrolguys.com', who: 'Pest Control Guys' },
  { posted: '2026-01-23', role: 'Pest Control Technician', where: 'Dallas–Fort Worth, TX', details: 'Put “LTK” next to your name for a guaranteed interview, per the poster.', contact: 'Listing on Indeed via Isaac', who: 'Isaac' },
];

/* ------------------------------------------------------------------ Trade: pay & pricing talk */

export interface ReportedFigure extends Credit {
  topic: string;
  figure: string;
}

/** What members said. Never market data — the page labels every item with who and when. */
export const PAY_TALK: ReportedFigure[] = [
  { topic: 'Master tech (runs a team of 3–5, handles callbacks)', figure: '~$65k', who: 'Vulkans Wrath', when: 'Aug 2026' },
  { topic: 'Regular technician', figure: '$36–50k', who: 'Vulkans Wrath', when: 'Aug 2026' },
  { topic: 'Unlicensed new hires paid $5/hr more than a licensed tech', figure: '≈ $9,600/yr gap, as the thread worked it out — the case made for pay transparency', who: '#job-board thread', when: 'Jan 2025' },
  { topic: 'Technician salary bands in posted jobs (AZ, NM, TX)', figure: '$35–65k', who: '#job-board posts', when: '2025–26' },
  { topic: 'Commission technician roles in posted jobs (Michigan)', figure: '$70–100k', who: '#job-board posts', when: 'Nov 2025' },
  { topic: 'Branch manager in a posted job (New York)', figure: '$87–97k', who: '#job-board post', when: 'Jun 2026' },
];

export const PRICING_TALK: ReportedFigure[] = [
  { topic: 'Squirrel job on a steep (15/12) roof', figure: '$450 minimum trapping setup + $100 per animal; exclusion at 3× markup, 5× with access limits; add a spotter tech if needed', who: 'Senior Squatch', when: 'Feb 2026' },
  { topic: 'Labor rate, height work', figure: '$250/hr, $350/hr when it’s “sketchy”; $175 per installed roof anchor', who: 'Vulkans Wrath', when: 'Feb 2026' },
  { topic: 'Specialty work target', figure: '“Get to $150/hr labor for specialty work”', who: 'A manufacturer rep in the thread', when: 'Feb 2026' },
  { topic: 'Termite, bait vs. liquid (a competitor example)', figure: 'Bait install $625 + $33/mo vs. trench-and-treat $350 + $350/yr renewal. One member’s position: a one-time liquid treatment beats bait.', who: 'Greg', when: 'Apr 2026' },
];

/* ------------------------------------------------------------------ Pest library */

export interface IdNote extends Credit {
  title: string;
  body: string;
}

/**
 * Community-confirmed ID notes, keyed by pest-library group. The identifiers the community
 * relies on include Saturniid (entomologist), Topherdegrace (NC State), Hawkeyeholt (Adam
 * Holt, BCE), Nick, Matt and Vulkans Wrath.
 */
export const ID_NOTES: Record<string, IdNote[]> = {
  ants: [
    { title: 'Ant or termite? “AWW”', body: 'Antennae: ants elbowed, termites straight or beaded. Wings: ant pairs unequal, termite pairs equal. Waist: ants pinched, termites broad.', who: 'Topherdegrace', when: 'Sep 2026' },
    { title: 'Florida carpenter ant', body: 'Polymorphic workers with a smoothly rounded thorax. The look-alike Formica integra has a dip in the thorax, is aggressive and sprays acid. Management is the same either way.', who: '#the-hive-mind ID thread', when: '2025–26' },
    { title: 'Odorous house ant alates', body: 'Small, single node. When in doubt, sniff it out.', who: '#the-hive-mind', when: '2025–26' },
    { title: 'Fire ants', body: 'Red imported fire ants are brighter and more orange, and less two-toned than southern fire ants. They often turn up crawling on clothes in closets, and male Solenopsis alates get mistaken for other pests.', who: '#the-hive-mind', when: '2025–26' },
  ],
  'termites-wdo': [
    { title: 'Ant or termite? “AWW”', body: 'Antennae: ants elbowed, termites straight or beaded. Wings: ant pairs unequal, termite pairs equal. Waist: ants pinched, termites broad.', who: 'Topherdegrace', when: 'Sep 2026' },
    { title: 'Powderpost beetle taxonomy', body: 'The old Anobiidae now sit as Anobiinae within Ptinidae; lyctine powderpost beetles are in Bostrichidae. The lesser grain borer is a bostrichid tied to stored grain, not a wood-destroying organism.', who: 'Matt, Saturniid', when: '2025–26' },
  ],
  'stinging-insects': [
    { title: 'Yellowjackets vs. bald-faced hornets', body: 'Vespula yellowjackets nest in cavities — wall voids, firewood. Dolichovespula (bald-faced hornets) build open-air, round nests.', who: '#the-hive-mind', when: '2025–26' },
    { title: 'Mud daubers', body: 'Solitary and not aggressive. Treat the eaves for their food source (spiders) and educate the customer.', who: '#the-hive-mind', when: '2025–26' },
    { title: 'Ground-nesting bees', body: 'Miner and ground bees fall under pollinator protection. Leave them unless they are causing harm.', who: '#the-hive-mind', when: '2025–26' },
  ],
  'stored-product-pests': [
    { title: 'Sawtoothed vs. merchant grain beetle', body: 'Told apart by temple length. Sawtoothed doesn’t fly or come to light and lives up to a year; merchant flies, is drawn to light and prefers cereals.', who: 'Matt', when: '2025–26' },
    { title: 'Dermestid larvae', body: 'Attagenus: long, slender, tail tuft (mistaken for silverfish). Dermestes: urogomphi. Anthrenus: V-shaped tuft. Trogoderma: the warehouse beetle.', who: '#the-hive-mind', when: '2025–26' },
    { title: 'Cigarette vs. drugstore beetle', body: 'Cigarette beetle antennae are serrated; drugstore beetle antennae are clubbed. Don’t trust stock-photo IDs — even an industry body once ran a mislabelled one.', who: '#the-hive-mind', when: '2025–26' },
  ],
  'occasional-invaders': [
    { title: 'Plaster beetles', body: 'Latridiidae are mold feeders — their presence points to a moisture or mildew problem.', who: '#the-hive-mind', when: '2025–26' },
    { title: 'Caddisflies', body: 'Hairy wings (Trichoptera) and aquatic larvae: water is nearby.', who: '#the-hive-mind', when: '2025–26' },
    { title: 'Hammerhead flatworm', body: 'Not an insect. Report it to your state invasive-species office.', who: '#the-hive-mind', when: '2025–26' },
    { title: 'Love bugs vs. boxelder bugs', body: 'Love bugs are March flies (Bibionidae); boxelder bugs are true bugs (Hemiptera, Rhopalidae).', who: '#the-hive-mind', when: '2025–26' },
  ],
  'spiders-scorpions': [
    { title: 'Hobo spider bites', body: 'Necrosis claims are debunked (Utah State and Montana State extension).', who: '#the-hive-mind', when: '2025–26' },
    { title: 'False widows and camel spiders', body: 'Steatoda (false widow) is harmless. Solifugae (camel or sun spiders) are arachnids but neither spiders nor scorpions.', who: '#the-hive-mind', when: '2025–26' },
    { title: 'Bark scorpions', body: 'Genus Centruroides; the species varies by state.', who: '#the-hive-mind', when: '2025–26' },
  ],
  'bed-bugs': [
    { title: 'Fleas and bed bugs: know the angle', body: 'Members usually see fleas from the top, but nearly every reference photo is a side view — the trade needs top-view ID training.', who: '#the-hive-mind', when: '2025–26' },
  ],
};

/** Applies to every group. */
export const PHOTO_ID_TIP = 'Always include a coin or a hand for scale, and freeze a specimen for a clear shot.';

/* ------------------------------------------------------------------ Academy resources */

export interface Resource extends Credit {
  name: string;
  what: string;
  link?: string;
}

export const RESOURCES: Resource[] = [
  { name: 'The BCE Podcast', what: 'Board Certified Entomologists Adam Holt and Chelle Hartzer. Episode 10 features Andrew Sutherland (UC IPM).', who: 'Hawkeyeholt', when: 'Jan 2026' },
  { name: 'NPMA PRO Certified', what: 'A good step before moving into management.', who: 'Vulkans Wrath', when: 'May 2025' },
  { name: 'PestPosse TV — Food Manufacturing course', what: '5 lessons, $30, with a certificate. An LTK collaboration. PestPosse also has a sales masterclass workbook.', who: 'LTK', when: 'Jan 2026' },
  { name: 'Pest Daily sales training', what: 'Good, and pricey.', who: '#training-grounds', when: '2025–26' },
  { name: 'German roach walkthroughs by Ian “Old Ian” Terry', what: 'Video walkthroughs shared in #training-grounds.', who: 'Ian', when: '2025–26' },
  { name: 'NCSU pest tools', what: 'Field optics including the SPERT scope; profits fund NCSU extension.', who: 'Topherdegrace', when: '2025–26', link: 'https://go.ncsu.edu/pesttools' },
  { name: 'Name Dat Bug', what: 'AI pest ID and inspection reports, plus a free label/SDS library.', who: 'Hawkeyeholt', when: 'Jul 2026', link: 'https://app.namedatbug.com' },
  { name: 'Pomerix EPA pesticide search', what: 'Look up registered pesticides.', who: 'LTK Director', when: 'May 2025', link: 'https://pomerix.com/pesticides' },
  { name: 'BPCA UK job board', what: 'For anyone looking across the Atlantic.', who: '#job-board', when: '2025', link: 'https://bpca.org.uk/jobs' },
];

/** Commercial audit tip, from a food-safety specialist in the Discord. */
export const AUDIT_TIP: IdNote = {
  title: 'Rodent device site maps',
  body: 'Not legally required, but third-party auditors and large grocery chains expect them, and the FDA strongly encourages them.',
  who: 'Evanovitz',
  when: 'Jun 2025',
};
