/**
 * field-guides.ts — the long-form career guide behind each /fields/:slug/ page.
 *
 * One entry per discipline slug. Researched against BLS (OOH, OEWS, NCS), O*NET, EPA, OSHA,
 * state agencies, extension and certification bodies; every guide lists its sources. `notes`
 * is maintainer-only (uncertainties, inferences, blocked sources) and is never rendered.
 * A field without an entry falls back to the short text in disciplines.ts.
 */

export interface FieldGuide {
  intro: string;
  dayInTheLife: string[];
  duties: string[];
  workEnvironment: {
    schedule: string;
    seasonality: string;
    physical: string;
    hazards: string;
    vehicleAndTravel: string;
  };
  training: {
    entry: string;
    onTheJob: string;
    licensing: string;
    certifications: { name: string; body: string; what: string; url: string }[];
  };
  skills: string[];
  tools: string[];
  careerPath: { stage: string; description: string }[];
  pay: string;
  benefits: string;
  goodParts: string[];
  hardParts: string[];
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  /** Maintainer-only. Never rendered. */
  notes: string;
}

export const FIELD_GUIDES: Record<string, FieldGuide> = /* BEGIN GUIDES */ {
  "wildlife-control": {
    intro: "Wildlife control is the part of pest work that deals with animals that have a backbone: raccoons, squirrels, skunks, opossums, bats, snakes, birds and the rest. You inspect a building, work out how the animal got in, remove it by the methods the law allows, then seal the building so it cannot get back in. Much of the money is in that last step, the exclusion and repair work. Most of the rules come from the state wildlife agency, not the pesticide programme, and they change a lot from one state to the next. Some states license wildlife control operators, some license nobody, and some still pull parts of the work under the structural pest control law. The job suits people who are comfortable on ladders and roofs and in attics, who can handle a live, frightened animal calmly, and who like solving a different puzzle at every house. It does not suit anyone who wants a fixed route and regular hours. Animals keep their own schedule.",
    dayInTheLife: [
      "A typical day starts with checking traps set on earlier jobs. Where traps are allowed, many states require you to check them at least once a day. California, for example, requires daily trap visits, and Florida requires live traps to be checked at least every 24 hours. So the first part of the morning is often a loop of stops to see what was caught, deal with each animal the way your state allows, and reset or pull the trap.",
      "New jobs start with an inspection. You walk the outside of the building and look at the roofline, soffits, vents, chimney, foundation and any gap where two building materials meet. Then you go into the attic or crawlspace to find droppings, nesting material, damaged insulation and the routes the animal uses. With bats you may come back at dusk to watch where they leave the building. The federal bat guidance for operators calls this an evening emergence survey and notes that bats can use any gap a quarter inch or wider.",
      "Then you sell the job. You explain to the customer what is getting in, how you will remove it, what has to be sealed, what that costs, and what you cannot legally do. Customers often want an animal moved to the woods. In many states that is restricted or illegal: South Carolina says routine relocation is against state law, Washington needs a permit to release off the property, and Florida allows it only under narrow conditions. Saying no clearly, and explaining why, is a large part of the job.",
      "Afternoons are often exclusion work: fitting one-way doors, sealing gaps with metal flashing or mesh, capping chimneys, screening vents, and repairing the damaged trim, siding or roof edges the animal used. That means ladders, roof work and hand tools for hours at a time. Some jobs end in the attic, removing droppings or contaminated insulation, which carries real disease risks (see hazards).",
      "The week has emergencies in it. A bat in a bedroom, a snake in a kitchen, or an animal stuck in a wall does not wait for the route, so many operators take evening or weekend calls. Paperwork is ongoing too. Several states make you keep logs or file reports. Washington wants an annual activity report by April 20, Texas wants monthly reports for relocated fur-bearers, and New York makes licensees upload their annual log at renewal.",
      "The year has its own rhythm. Bat work is shaped by the maternity season. The federal guidance for operators says not to evict or exclude bats during that season unless there is a public health threat, and to treat it as April 1 to August 31 when there is no state-specific guidance. Bird nesting season and the breeding seasons of other species shape when certain work can be done humanely and legally."
    ],
    duties: [
      "Inspect buildings inside and out to find entry points, damage and signs of the animals present.",
      "Identify species from sightings, droppings, tracks, damage and sounds, because the species decides which rules apply.",
      "Check whether the species is protected, needs a state permit, or is off limits to private operators in your state.",
      "Write estimates and explain removal, exclusion and repair options to customers in plain terms.",
      "Set and check live traps and other permitted capture devices within the check intervals your state requires.",
      "Handle, transport, release or euthanize animals only as state law allows, using humane methods.",
      "Install one-way doors and exclusion devices for bats and other animals outside restricted seasons.",
      "Seal entry points with durable materials such as metal flashing, hardware cloth and chimney caps.",
      "Repair damaged trim, vents, soffits and roof edges where the animal got in, as far as your company's scope allows.",
      "Remove droppings, latrines, nesting material and contaminated insulation using the right protective equipment.",
      "Decontaminate tools and gear after bat work to avoid spreading the fungus that causes white-nose syndrome.",
      "Keep trap logs, capture records and the reports your state requires.",
      "Take emergency calls for animals inside living spaces.",
      "Work safely on ladders and roofs and in attics and crawlspaces."
    ],
    workEnvironment: {
      schedule: "BLS says pest control workers mostly work full time and that evening and weekend work is common. In wildlife work, trap-check rules and emergency calls push this further: if your state requires daily trap checks, someone has to run them every day while traps are set, weekends included. Ask employers how trap checks and after-hours calls are shared and whether they are paid as overtime or on call.",
      seasonality: "Seasons shape what you can do as well as how busy you are. Bat exclusions are restricted during the maternity season (the federal operator guidance uses April 1 to August 31 when a state has no specific dates) and should not be done in winter where bats hibernate in the building. Florida writes its bat dates into rule: no exclusion devices from April 16 through August 14. Birds protected under the Migratory Bird Treaty Act have nesting-season limits. Spring and fall are often the heaviest periods for exclusion work, but no BLS or extension source was found that measures wildlife-call volume by season.",
      physical: "BLS notes that pest control workers often kneel, bend and crawl in tight spaces and work in all weather. Wildlife work adds extended ladder and roof time, carrying traps and materials, attic heat and handling animals that bite and scratch. O*NET reports that 81% of pest control workers surveyed work outdoors in all weather every day.",
      hazards: "Falls from ladders and roofs are the most obvious danger. OSHA's construction standard requires fall protection at 6 feet above a lower level and its general industry standard at 4 feet. Ask which applies to your work and what fall protection your employer provides. Disease is the less obvious one. CDC lists disturbing accumulations of bird or bat droppings as a high-risk activity for histoplasmosis, a fungal lung infection. Raccoon latrines can carry raccoon roundworm. CDC says the eggs become infectious 2 to 4 weeks after they are passed, and contaminated material should be removed carefully and burned, buried or sent to a landfill. Rodent droppings and nests need safe cleanup methods because of hantavirus risk. Rabies is the other major risk. CDC's 2022 rabies vaccine recommendations put people who handle wildlife reservoir species, including trappers and animal control officers, in an elevated-risk category, and people who frequently handle bats or enter high-density bat environments in a higher category with antibody checks every 2 years. Ask employers whether they pay for pre-exposure rabies vaccination.",
      vehicleAndTravel: "You drive between jobs all day. O*NET reports that 95% of pest control workers surveyed spend time in an enclosed vehicle every day. Wildlife trucks carry ladders, traps and exclusion materials, and you may be moving live animals. Transport is itself regulated in some states. In Texas, carrying a live fox, skunk, coyote or raccoon is illegal unless you hold TPWD authorization for nuisance fur-bearer relocation or a TDA pest control licence, and even then there are release distance rules. Check your state's rules before you put an animal in the truck."
    },
    training: {
      entry: "BLS lists a high school diploma or equivalent as the typical entry education for pest control workers, plus moderate-term on-the-job training. Wildlife permits add their own conditions. Washington requires WCOs to be at least 18, to pass a trapper education exam, to have two years' documented experience, and to be legally able to possess a firearm with no felony or domestic violence conviction, and WDFW runs a background check at each renewal. New York requires NWCO applicants to be at least 18. Because the work is mostly driving, expect employers to check your driving record, but no source was found that sets a standard for this.",
      onTheJob: "Most people learn on the job alongside an experienced operator. O*NET rates pest control work as needing anywhere from a few days to a year of on-the-job training. In wildlife work the learning curve includes species identification, the legal status of each species in your state, trap use, humane handling and euthanasia, ladder and roof safety, and exclusion carpentry. Structured courses exist. NWCOA's Wildlife Control Operator Training Course is a two-day course covering bats, birds, squirrels and other common species, animal biology, handling, euthanasia, inspection and safety. The National Wildlife Control Training Program offers online training, including state-specific versions for several states.",
      licensing: "There is no single national licence. The pattern varies by state, so check your state's wildlife agency first and then the state pesticide agency.\n- Some states license or certify wildlife control operators directly. New York's NWCO licence needs an exam passed at 80% or higher, costs $50 for a commercial licence, and runs October 1 to September 30. Washington's WCO certification needs a course, an exam at 90% or higher, two years' experience and renewal every three years.\n- Some states have no operator licence at all. Texas and Florida's wildlife agency license nobody for general nuisance work, and South Carolina works through free 30-day depredation permits instead.\n- Some states regulate through a trapping licence. California requires a CDFW trapping licence for anyone trapping for profit, with a knowledge and skills test.\n- Almost every state has species you may not touch without a separate permit, such as deer, bear, protected and endangered species, and migratory birds.\n- The pesticide law still reaches part of the work. Any pesticide, fumigant or rodenticide use needs the state pesticide licence. In some states rodent work, bird work or work in structures falls under the structural pest control law even without pesticides. California's exemption for live capture and exclusion does not cover rats, mice or pigeons, and Florida needs an FDACS certificate for trappers who handle commensal rodents in structures.\nThe site's state wildlife pages set out the verified details for Texas, Washington, Florida, California and South Carolina. This guide is not legal advice.",
      certifications: [
        {
          name: "NWCOA Certified Wildlife Control Operator (via the Wildlife Control Operator Training Course)",
          body: "National Wildlife Control Operators Association (NWCOA)",
          what: "Two-day course covering bats, birds, squirrels and other common species, animal biology, handling, euthanasia, inspection and safety. Completion carries use of the Certified Wildlife Control Operator logo. NWCOA's page does not state exam details, cost or renewal terms.",
          url: "https://nwcoa.com/page-18086"
        },
        {
          name: "Certified Wildlife Control Professional (CWCP)",
          body: "National Wildlife Control Operators Association (NWCOA)",
          what: "Senior credential. Needs 5 years and 10,000 hours of WCO experience (or 10,000 hours over 8 years part time), two NWCOA certifications or one plus two Wildlife EXPOs or a related degree, an 85% exam score, a code-of-ethics pledge and an application fee of $100 for members or $200 for non-members.",
          url: "https://nwcoa.com/Certified-Wildlife-Control-Professional"
        },
        {
          name: "National Wildlife Control Training Program (NWCTP) course and exam",
          body: "National Wildlife Control Training Program, listed by the Internet Center for Wildlife Damage Management",
          what: "Online training with a 130-question exam. State versions exist for Delaware, New York, Oklahoma, Virginia, West Virginia and Tennessee. New York DEC accepts the NWCTP exam route (fee $200) as an alternative to its own free exam.",
          url: "https://icwdm.org/training/certifications/"
        },
        {
          name: "State wildlife operator licence or certification (where one exists)",
          body: "Your state wildlife agency, e.g. NYSDEC or WDFW",
          what: "The legal permission to do the work in states that license it. Requirements, fees and renewal differ by state.",
          url: "https://dec.ny.gov/regulatory/permits-licenses/fish-wildlife-plant/special-licenses/nuisance-wildlife-control"
        }
      ]
    },
    skills: [
      "Species identification from sign, not just sightings",
      "Knowing and following your state's wildlife rules, and knowing when to call the agency",
      "Calm, humane animal handling",
      "Ladder, roof and attic safety",
      "Basic carpentry and building-envelope knowledge for exclusion and repair",
      "Inspection discipline: finding every entry point, not just the obvious one",
      "Explaining limits to customers, especially why an animal cannot simply be relocated",
      "Accurate record keeping for trap logs and state reports",
      "Using protective equipment correctly around droppings, latrines and nests"
    ],
    tools: [
      "Extension and step ladders, with ladder stabilizers and roof safety gear",
      "Fall protection harness and anchors where required",
      "Live cage traps and other capture devices your state permits",
      "Catch poles and snake tongs or hooks",
      "Bite-resistant gloves",
      "One-way exclusion doors, cones and tubes for bats and other animals",
      "Hardware cloth, metal flashing, vent screens and chimney caps",
      "Sealants and fasteners suited to exterior use",
      "Flashlight, inspection mirror and camera for documenting entry points",
      "Respirator, disposable coveralls and eye protection for droppings and insulation work",
      "Disinfectants and decontamination supplies for bat and latrine work",
      "Trap tags or stamped trap numbers where the state requires them",
      "Truck with ladder rack and secure animal transport space"
    ],
    careerPath: [
      {
        stage: "Helper or trainee",
        description: "Riding with an experienced operator, carrying ladders, learning species and state rules, doing trap checks and cleanup. In states that license WCOs you may work under someone else while you build the experience the licence needs."
      },
      {
        stage: "Licensed or certified operator",
        description: "Running your own inspections and jobs. In licensing states this is when you pass the exam and hold your own licence or certification."
      },
      {
        stage: "Exclusion and repair specialist",
        description: "Many operators move toward the exclusion and repair side, which is skilled building work and often the larger part of the invoice."
      },
      {
        stage: "Senior operator or credentialed professional",
        description: "Handling complex jobs such as large bat colonies, commercial buildings and difficult species. NWCOA's CWCP is set at 5 years and 10,000 hours of experience."
      },
      {
        stage: "Supervisor, trainer or manager",
        description: "Training new hires, managing crews and keeping the company compliant with wildlife and pesticide rules."
      },
      {
        stage: "Owner-operator",
        description: "Many wildlife businesses are small. Owning one means handling permits, insurance, sales and scheduling as well as the field work."
      }
    ],
    pay: "BLS does not publish pay for wildlife control operators as a separate occupation. Operators employed by pest control companies are most likely counted under pest control workers (SOC 37-2021). For that occupation the median annual wage was $45,250 in May 2025 ($21.75 an hour). The lowest 10% earned less than $34,680 and the highest 10% more than $61,890. These figures leave out self-employed workers, which matters in a field with many owner-operators, and they do not show overtime, commission or seasonal swings. Ask employers how pay is structured: hourly, per job, commission on exclusion sales, or a mix, and how after-hours calls and trap checks are paid.",
    benefits: "No benefits data exists for wildlife control specifically. The closest BLS benchmark is the National Compensation Survey for private industry workers in service occupations, the group that includes pest control workers. In March 2026, 47% of those workers had access to employer medical care benefits, 47% to retirement benefits, 67% to paid sick leave, 57% to paid vacation and 56% to paid holidays. Across all private industry workers the figures were 71% for medical care, 72% for retirement, 81% for paid sick leave, 80% for paid vacation and 81% for paid holidays. Ask employers directly about health insurance, retirement, paid leave, whether they supply the truck and fuel, whether they pay for licences, training and pre-exposure rabies vaccination, and how on-call time is paid.",
    goodParts: [
      "Every job is a different puzzle, and good inspection skill is visible in the results.",
      "You fix the building as well as removing the animal, so the customer can see the work.",
      "The work is outdoors and active, not a desk or a fixed route.",
      "The skills carry into exclusion, bird work and running your own business.",
      "In many states the barrier to entry is low, so you can start small."
    ],
    hardParts: [
      "Ladders, roofs, attics and heat are physically hard and carry real fall risk.",
      "Disease exposure is real: rabies, histoplasmosis, raccoon roundworm and rodent-borne illness.",
      "Trap checks and emergency calls make hours irregular, including weekends.",
      "The rules differ by state and by species, and getting them wrong can be a crime.",
      "Some customers want things you cannot legally do, such as moving animals off site or exterminating bats.",
      "Euthanasia is part of the work in many states, and it is not for everyone."
    ],
    faq: [
      {
        q: "Do I need a licence to do wildlife control?",
        a: "It depends on the state. New York and Washington license or certify operators directly. Texas has no general operator licence. California requires a trapping licence for anyone trapping for profit. Almost every state needs separate permits for some species, and any pesticide use needs the state pesticide licence. Check your state wildlife agency first, then the pesticide agency."
      },
      {
        q: "Is my pest control licence enough?",
        a: "Usually not on its own. The pesticide licence covers pesticides, while trapping and handling wildlife is regulated by the state wildlife agency. Some states do exempt pest control licensees from parts of the wildlife rules, such as Texas for bats and animal transport, so read your own state's rules."
      },
      {
        q: "Can I relocate the animals I catch?",
        a: "Often no. South Carolina says routine relocation is against state law. Washington needs a permit to release off the property where the animal was caught. California's rule says trapped animals must be immediately killed or released. Florida allows off-site release only under specific conditions. Check before you promise a customer anything."
      },
      {
        q: "When can I do bat work?",
        a: "Not during the maternity season, when flightless young are present, unless there is a public health threat. Federal guidance for operators uses April 1 to August 31 when your state has not set dates. Some states set their own, such as Florida's ban on exclusion devices from April 16 to August 14. Avoid winter exclusions where bats hibernate in the building."
      },
      {
        q: "Should I get the rabies vaccine?",
        a: "Talk to a doctor. CDC's 2022 recommendations put trappers and other people who handle wildlife reservoir species in an elevated-risk group for which pre-exposure vaccination applies, and people who frequently handle bats in a higher group with antibody checks every two years. Ask employers whether they pay for it."
      },
      {
        q: "What certifications are worth having?",
        a: "Your state's licence comes first where one exists. Beyond that, NWCOA's training course and certification and the National Wildlife Control Training Program are the main national options. NWCOA's CWCP is a senior credential that needs five years of experience."
      },
      {
        q: "Can I deal with birds too?",
        a: "Only within federal and state bird law. Most native birds are protected under the Migratory Bird Treaty Act. Starlings, feral pigeons and house sparrows are not. See the bird management guide and the site's federal bird rules."
      },
      {
        q: "How dangerous is the attic cleanup side?",
        a: "Take it seriously. CDC identifies disturbing bird and bat droppings as a high-risk activity for histoplasmosis. Raccoon latrines and rodent nests need careful handling. Use the respiratory protection and protective clothing your employer specifies, and ask what fit testing and training they provide."
      }
    ],
    sources: [
      {
        label: "BLS Occupational Outlook Handbook: Pest Control Workers",
        url: "https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm"
      },
      {
        label: "O*NET OnLine: Pest Control Workers (37-2021.00)",
        url: "https://www.onetonline.org/link/summary/37-2021.00"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026 (news release)",
        url: "https://www.bls.gov/news.release/ebs2.nr0.htm"
      },
      {
        label: "BLS NCS Table 1: Retirement benefits, March 2026",
        url: "https://www.bls.gov/news.release/ebs2.t01.htm"
      },
      {
        label: "BLS NCS Table 2: Medical care benefits, March 2026",
        url: "https://www.bls.gov/news.release/ebs2.t02.htm"
      },
      {
        label: "BLS NCS Table 6: Paid leave benefits, March 2026",
        url: "https://www.bls.gov/news.release/ebs2.t06.htm"
      },
      {
        label: "NWCOA: Certified Wildlife Control Professional",
        url: "https://nwcoa.com/Certified-Wildlife-Control-Professional"
      },
      {
        label: "NWCOA: Wildlife Control Operator Training Course",
        url: "https://nwcoa.com/page-18086"
      },
      {
        label: "Internet Center for Wildlife Damage Management: Certification and Licensing for WCOs",
        url: "https://icwdm.org/training/certifications/"
      },
      {
        label: "NYSDEC: Nuisance Wildlife Control Operator licence",
        url: "https://dec.ny.gov/regulatory/permits-licenses/fish-wildlife-plant/special-licenses/nuisance-wildlife-control"
      },
      {
        label: "White-nose Syndrome Conservation and Recovery Working Group (USFWS), Acceptable Management Practices for Bat Control Activities in Structures: A Guide for NWCOs (2015)",
        url: "https://www.wiatri.net/inventory/bats/aboutBats/pdf/WNSNWCOAMPApril2015.pdf"
      },
      {
        label: "CDC MMWR: Use of a Modified Preexposure Prophylaxis Vaccination Schedule to Prevent Human Rabies (ACIP 2022)",
        url: "https://www.cdc.gov/mmwr/volumes/71/wr/mm7118a2.htm"
      },
      {
        label: "CDC/NIOSH: Histoplasmosis key points",
        url: "https://www.cdc.gov/niosh/histoplasmosis/about/"
      },
      {
        label: "CDC: About Baylisascaris (raccoon roundworm)",
        url: "https://www.cdc.gov/baylisascaris/about/index.html"
      },
      {
        label: "CDC: Hantavirus prevention",
        url: "https://www.cdc.gov/hantavirus/prevention/index.html"
      },
      {
        label: "OSHA 29 CFR 1926.501 Duty to have fall protection (construction)",
        url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.501"
      },
      {
        label: "OSHA 29 CFR 1910.28 Duty to have fall protection (general industry)",
        url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.28"
      },
      {
        label: "USDA APHIS Wildlife Services: Wildlife damage",
        url: "https://www.aphis.usda.gov/wildlife-damage"
      }
    ],
    notes: "State facts for TX, WA, FL, CA and SC are taken from the site's verified registry lib/content/wildlife.ts (verified 2026-09-25) and were not re-fetched; that file's own caveats apply (Florida rule 68A-9.010 amendment hearing noticed July 2026; recheck). NY facts were fetched from NYSDEC on 2026-10-01; the page did not state insurance requirements or species endorsements. NWCOA pages did not give exam format, cost or renewal for the basic certification; nwcoa.com/certification returned 404. CDC's hantavirus page only pointed to a detailed cleanup page, which was not opened, so the guide says only that safe cleanup methods are needed. NIOSH booklet 2005-109 (respirator detail) was found by search but not opened, so no respirator class is named. The fall-protection trigger that applies to residential wildlife exclusion (construction vs general industry) is an inference left to the reader to confirm. 'Spring and fall are heaviest' is phrased as unmeasured. BLS pages are bot-blocked for curl but were read through the fetch tool; BLS pay figures match salary.ts. NCS: medical and retirement access both read as 47% for service occupations (participation 23%, take-up 49% in both tables). That identical match is plausible but should be checked by hand in a browser before launch. Pay mapping of WCOs to SOC 37-2021 is an inference; BLS does not say where WCOs are coded."
  },
  "falconry-abatement": {
    intro: "Falconry-based bird abatement means using trained birds of prey to scare pest birds away from places where they cause damage or danger: landfills, farms and vineyards, food plants, resorts, airports and large buildings. The pest birds learn that the site is dangerous and leave. It is one of the most regulated jobs in pest management, and the rules have nothing to do with pesticide licences. You need a state falconry permit, which takes years of apprenticeship to reach the right level. To be paid, you need a federal Special Purpose Abatement permit from the US Fish and Wildlife Service, which is only open to Master Falconers. Under federal rules that means at least seven years of falconry before you can hold the permit yourself. The work suits people who already love falconry, or are willing to commit to it as a way of life, and who accept that their birds need care every day of the year, not only on working days.",
    dayInTheLife: [
      "The day starts with the birds. Before any client work, each raptor is checked, weighed and fed according to its flying plan. Falconry birds have to be kept in humane and healthful conditions in an approved mews or weathering area that protects them from weather, predators and domestic animals. That care runs every day of the year, including weekends, holidays and days without work.",
      "On a contract site, abatement work is usually repeated visits rather than one job. The aim is to make pest birds treat the site as dangerous, so the falconer flies the birds over problem areas such as the working face of a landfill, a crop block, a loading dock or a roof. The extension literature on pigeon control describes falconry as a way to haze birds rather than kill them, and notes that it needs repeated site visits and is relatively expensive.",
      "Much of the skill is reading the site and the pest birds. You note which species are present and how many, where they roost and feed, and how they respond to each flight. You also decide which of your birds suits the target species and the setting. Weather matters, because wind, rain and heat affect whether and how you can fly.",
      "There is a legal check behind every flight. The abatement permit lets you flush and haze birds with your raptors. It does not let you kill or injure migratory birds. If a raptor kills a protected species by accident, it must be reported to the Regional Migratory Bird Permit Office within two business days. Where lethal control of migratory birds is wanted, it needs its own federal authority, usually a depredation permit held by the landowner with the falconer named as a subpermittee.",
      "Paperwork and admin take real time: keeping permits current, updating subpermittee letters for anyone who flies your birds, reporting acquisitions and disposals of raptors on Form 3-186A, keeping site logs for clients, and quoting new contracts. Airports are their own world. FAA rules require certificated airports to have a wildlife hazard assessment done by a qualified wildlife damage management biologist after certain strike events, and any falconry work there fits into that airport's wildlife plan."
    ],
    duties: [
      "Care for, feed, weigh and house raptors every day in facilities that meet federal and state standards.",
      "Train and condition birds for the flying they do on abatement sites.",
      "Survey client sites to identify pest bird species, numbers, roosts, feeding areas and movement.",
      "Plan and run repeated hazing flights over problem areas.",
      "Match the right raptor to the target species and site.",
      "Check the legal status of every target species and stay within the permit's limits.",
      "Coordinate with landowners on depredation permits where lethal control is authorized.",
      "Keep site logs and report results to clients.",
      "Report raptor acquisitions, transfers and losses on Form 3-186A or the state equivalent.",
      "Report any accidental take of a migratory bird species within two business days.",
      "Supervise and document subpermittees who fly abatement birds under your permit.",
      "Combine falconry with other deterrents and exclusion recommendations where the client needs a full plan.",
      "Maintain telemetry, transport boxes, perches and other falconry equipment.",
      "Transport birds safely between home facilities and client sites."
    ],
    workEnvironment: {
      schedule: "Early starts are common because bird activity on many sites peaks around dawn and dusk, though no source was found that sets typical hours. The fixed part of the schedule is animal care, which happens every day whether or not you work. Contracts often need repeated visits over weeks or months.",
      seasonality: "Pest bird pressure varies with crop seasons, migration and roosting patterns, so demand changes through the year. Your own birds also have seasons, such as molt, that affect how they can be flown. No source was found that measures this for abatement work specifically.",
      physical: "Long hours outdoors in all weather, standing and walking over sites such as landfills, fields and industrial yards, plus daily handling and care of birds. Much of the work is outdoors in open ground rather than at height.",
      hazards: "Talons and beaks can injure the handler. Working sites carry their own hazards: heavy equipment at landfills, aircraft movement areas at airports and traffic at industrial sites. Pest bird roosts can mean contact with droppings. CDC lists disturbing accumulations of bird droppings as a high-risk activity for histoplasmosis. Your birds face hazards too, including power lines, vehicles and predators.",
      vehicleAndTravel: "You travel to client sites with your birds, so the vehicle has to carry them safely. Federal rules let falconers transport lawfully held raptors between states, but any state may regulate that further. Ask any employer how travel time, mileage and overnight jobs are handled."
    },
    training: {
      entry: "Federal falconry rules set the entry point. An Apprentice Falconer must be at least 12 years old. Applicants under 18 need a parent or guardian to sign the application. You need a sponsor: a General or Master Falconer who is at least 18 and has at least two years at General level, who agrees to help you learn husbandry, wildlife law and choice of bird. You must answer at least 80% of the questions correctly on a state-administered exam covering raptor care and handling and the relevant laws. Your raptor facilities must pass a state inspection before you can be issued a permit. Many states have their own extra requirements, so start with your state wildlife agency.",
      onTheJob: "Falconry training is an apprenticeship measured in years. An Apprentice may hold only one raptor and must practise for at least two years, including at least four months a year of keeping, training, flying and hunting the bird, before moving up to General Falconer. Federal rules say no falconry school or course can shorten that two-year period. A General Falconer must be at least 16 and may hold up to three raptors. A Master Falconer must have at least five years at General level. Before you hold your own abatement permit, you can only do abatement as a General Falconer named as a subpermittee of a permit holder, flying their abatement birds, which is the usual way to learn the commercial side.",
      licensing: "Three layers apply.\n1. State falconry permit. States issue falconry permits under federal standards in 50 CFR 21.82, and states can add their own rules. Contact your state wildlife agency for the exam, facility inspection and fees.\n2. Federal Special Purpose Abatement permit (FWS Form 3-200-79). You need this to be paid for abatement services (50 CFR 21.82(e)(11)). Applicants must hold a current state falconry permit at Master level. Abatement raptors must be captive-bred and wear a seamless numbered FWS band. The application fee is $100 and non-refundable. The permit is issued under the special purpose permit rule, now 50 CFR 21.95. Note: 50 CFR 21.85 is the raptor propagation rule, not abatement.\n3. Bird protection law. The abatement permit does not authorize killing or injuring migratory birds. Lethal take of species protected under the Migratory Bird Treaty Act needs a depredation permit (50 CFR 21.100) or must fall under a depredation order. No permit is needed merely to scare or herd depredating migratory birds other than eagles and threatened or endangered species. Starlings, feral pigeons and house sparrows are not protected by the Act, but state rules still apply.\nInside buildings, 50 CFR 21.14 says you may not release a raptor into a building to frighten or capture another bird unless you hold a permit that allows abatement with a raptor. The state-by-state section on this page summarizes them in more detail. This is not legal advice.",
      certifications: [
        {
          name: "Apprentice, General and Master Falconer permits",
          body: "Your state wildlife agency, under federal standards in 50 CFR 21.82",
          what: "The tiered falconry permit. Apprentice: age 12+, sponsor, 80% exam, inspected facilities, one raptor, minimum two years. General: age 16+, up to three raptors. Master: five years at General level.",
          url: "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-C/section-21.82"
        },
        {
          name: "Federal Special Purpose Abatement permit (Form 3-200-79)",
          body: "US Fish and Wildlife Service, Migratory Bird Program",
          what: "Required to be paid for abatement with raptors. Master Falconer level required, captive-bred banded raptors only, $100 non-refundable fee.",
          url: "https://www.fws.gov/service/3-200-79-special-purpose-abatement"
        },
        {
          name: "Subpermittee status under an abatement permit",
          body: "Named by an abatement permit holder under FWS rules",
          what: "How General Falconers legally do abatement work: flying the permit holder's abatement birds, carrying the documents FWS requires.",
          url: "https://fws.gov/sites/default/files/documents/2024-12/3-200-79-frequently-asked-questions-about-an-abatement-permit.pdf"
        }
      ]
    },
    skills: [
      "Raptor husbandry: feeding, weight management, health checks and housing",
      "Training and conditioning birds for repeated, reliable flights",
      "Reading pest bird behaviour and how it changes over a contract",
      "Bird identification, because legal status depends on species",
      "Detailed knowledge of federal and state bird law",
      "Record keeping and permit administration",
      "Explaining to clients what hazing can and cannot do",
      "Patience and consistency over long contracts"
    ],
    tools: [
      "Captive-bred raptors banded with seamless numbered FWS bands",
      "Approved mews and weathering area at home",
      "Scale for daily weighing",
      "Gloves, jesses, leashes, swivels and hoods",
      "Radio telemetry equipment",
      "Transport boxes or giant hoods for vehicle travel",
      "Perches for use on site",
      "Lures and food supplies",
      "Binoculars and a field notebook or app for site logs",
      "Copies of permits, subpermittee letters and Form 3-186A records",
      "Vehicle set up to carry birds safely"
    ],
    careerPath: [
      {
        stage: "Apprentice Falconer (at least 2 years)",
        description: "One raptor, a sponsor, and at least four months a year of keeping, training, flying and hunting. No commercial abatement at this level under the federal rule."
      },
      {
        stage: "General Falconer (at least 5 years before Master)",
        description: "Up to three raptors. You can do abatement only as a named subpermittee of an abatement permit holder, flying that person's abatement birds. This is where most people learn the commercial work."
      },
      {
        stage: "Master Falconer",
        description: "May do abatement with falconry birds and is eligible to apply for a federal Special Purpose Abatement permit."
      },
      {
        stage: "Abatement permit holder",
        description: "Holds the federal permit, can be paid for abatement, and can name subpermittees. Permits are issued to individuals, not businesses, though a business name can be listed."
      },
      {
        stage: "Abatement business owner or programme lead",
        description: "Running contracts, managing subpermittees and combining falconry with other deterrents and exclusion work. Some people move into wider bird management or wildlife control."
      }
    ],
    pay: "BLS does not track falconry-based abatement as an occupation, and no government or university source was found with pay figures for it. The pest control workers figures (median $45,250 in May 2025) are not a good match, because most abatement falconers are self-employed and BLS wage figures leave out the self-employed. Income depends on contracts, site count and how many birds and subpermittees you can run. Anyone offering a job should be asked how pay is set (hourly, per site or per contract), who pays for the birds' food and care, and whether travel time is paid.",
    benefits: "No benefits data exists for this field. Because the permit is issued to individuals and many falconers work for themselves, expect to arrange your own health cover and retirement savings. Employees of an abatement company should ask about medical cover, paid leave, retirement, vehicle use and who pays for bird care while they work. For context only, the BLS National Compensation Survey found that in March 2026, 47% of private industry workers in service occupations had access to employer medical care benefits and 56% to paid holidays.",
    goodParts: [
      "You work with trained birds of prey, which for the right person is a calling, not just a job.",
      "Hazing is a way to move pest birds without poison.",
      "Few people can legally do this work, because the path to it is long.",
      "The work is outdoors in open country and varied sites.",
      "Long contracts give you time to see results build."
    ],
    hardParts: [
      "Under federal minimums it is at least seven years from apprentice permit to Master level and an abatement permit of your own.",
      "Bird care never stops: every day, every holiday, whether you are paid or not.",
      "Results take repeated visits, and not every client is patient.",
      "The legal layers are complex, and a mistake with a protected species has to be reported.",
      "Weather and your birds' condition decide when you can work, not just the calendar.",
      "No reliable public pay data exists, so income is hard to judge before you commit."
    ],
    faq: [
      {
        q: "Can I do this with a pest control licence?",
        a: "No. Falconry abatement is governed by federal and state wildlife law. A pesticide licence plays no part in it. Some states exempt permitted falconers from the structural pest control law. Texas does for using a raptor to control or relocate birds."
      },
      {
        q: "How long before I can get paid for abatement?",
        a: "To be paid you need a Special Purpose Abatement permit, which needs Master Falconer status. Under federal minimums that is at least two years as an Apprentice plus five years as a General Falconer. As a General Falconer you can work as a named subpermittee under someone else's abatement permit."
      },
      {
        q: "How do I start falconry?",
        a: "Contact your state wildlife agency. You need a sponsor, must pass the state exam with at least 80%, and must have facilities that pass inspection before you are issued an Apprentice permit. You can start at age 12, with a parent or guardian signing if you are under 18."
      },
      {
        q: "Can I use any bird I own for abatement?",
        a: "Under the abatement permit, only your own captive-bred raptors with seamless numbered FWS bands, and not bald or golden eagles. General Falconers working as subpermittees fly the permit holder's abatement birds, not their own falconry birds."
      },
      {
        q: "Does the abatement permit let my birds kill pest birds?",
        a: "Not migratory birds. The abatement permit covers flushing and hazing. Lethal take of birds protected under the Migratory Bird Treaty Act needs its own federal authority, usually a depredation permit. Accidental take must be reported within two business days. Species not protected by the Act, such as starlings, feral pigeons and house sparrows, are not covered by the federal permits, but state rules still apply."
      },
      {
        q: "Is the abatement permit under 50 CFR 21.85?",
        a: "No. In the current eCFR, 21.85 is the raptor propagation rule. The abatement permit is a special purpose permit under 21.95, and the falconry rule that mentions abatement is 21.82(e)(11). Older FWS documents use pre-2022 section numbers, which causes this confusion."
      },
      {
        q: "Can I work at airports?",
        a: "Airport wildlife work is driven by FAA rules. Certificated airports must have a wildlife hazard assessment done by a qualified wildlife damage management biologist after certain strike events, and may need a wildlife hazard management plan. Falconry work there would fit inside that plan and the airport's own requirements."
      }
    ],
    sources: [
      {
        label: "50 CFR 21.82 Falconry standards and falconry permitting (eCFR; text read via the eCFR versioner API, 2026-09-23 edition)",
        url: "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-C/section-21.82"
      },
      {
        label: "50 CFR Part 21 table of sections (eCFR; 21.85 is raptor propagation, 21.95 special purpose permits)",
        url: "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21"
      },
      {
        label: "50 CFR 21.100 Depredation permits (eCFR)",
        url: "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-D/section-21.100"
      },
      {
        label: "50 CFR 21.14 Authorization: birds in buildings (eCFR)",
        url: "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-B/section-21.14"
      },
      {
        label: "USFWS: 3-200-79 Special Purpose – Abatement",
        url: "https://www.fws.gov/service/3-200-79-special-purpose-abatement"
      },
      {
        label: "14 CFR 139.337 Wildlife hazard management (eCFR)",
        url: "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-G/part-139/subpart-D/section-139.337"
      },
      {
        label: "Internet Center for Wildlife Damage Management: Pigeon damage control and prevention methods",
        url: "https://icwdm.org/species/birds/pigeons/pigeon-damage-control-and-prevention-methods/"
      },
      {
        label: "CDC/NIOSH: Histoplasmosis key points",
        url: "https://www.cdc.gov/niosh/histoplasmosis/about/"
      },
      {
        label: "BLS Occupational Outlook Handbook: Pest Control Workers",
        url: "https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026",
        url: "https://www.bls.gov/news.release/ebs2.nr0.htm"
      },
      {
        label: "USDA APHIS Wildlife Services: Wildlife damage",
        url: "https://www.aphis.usda.gov/wildlife-damage"
      }
    ],
    notes: "KEY CORRECTION: the brief suggested 50 CFR 21.85 for the abatement permit. In the eCFR part 21 structure (2026-09-23), 21.85 is 'Raptor propagation permitting'. Abatement is a special purpose permit (21.95) and 21.82(e)(11) is the falconry abatement clause; both quoted from the eCFR versioner API. 21.95's text itself does not mention abatement by name; the link to 21.95 comes from the site's existing FEDERAL_BIRD_RULES (which read the FWS FAQ). FAQ details (individuals only, DBA allowed, subpermittee documents, 2-business-day reporting, no eagles, renewal 30 days ahead) come from the FWS abatement FAQ as verified in lib/content/wildlife.ts; the FAQ PDF was not re-opened this session. The FWS 3-200-79 page fetched today confirmed: Master level, captive-bred banded raptors, $100 fee, may charge fees. FWS's falconry program page (fws.gov/program/migratory-bird-permits/falconry) returned 404. FAA airport wildlife page returned 403; 14 CFR 139.337 text read via eCFR API. 'At least seven years' is arithmetic from the federal minimums (2 + 5); states may add time. Early starts, dawn/dusk activity and seasonal demand are stated as unmeasured. No pay source exists; the guide says so. No state falconry fee or exam detail was researched; state pages should be checked before adding any. Texas exemption (Occupations Code 1951.057) is from wildlife.ts."
  },
  "bird-abatement": {
    intro: "Bird management and exclusion is the work of keeping pest birds off buildings and structures: warehouses, distribution centres, factories, parking garages, shopping centres, bridges, signs and storefronts. Most of it is physical. You install netting, spikes, wire systems, electric track and sloped ledges, then clean and decontaminate the droppings left behind. It sits closer to a specialty trade contractor than to a pest route, and much of the work is done at height from ladders and lifts. The legal side is less about pesticide licences and more about which birds you are allowed to touch and when. Most native birds are protected under the federal Migratory Bird Treaty Act, while feral pigeons, starlings and house sparrows are not. But some states still put bird work in structures under the structural pest control law. The job suits people who like building things, are comfortable at height, and can plan a large installation and carry it out.",
    dayInTheLife: [
      "A commercial bird job usually begins with a survey. You find out which birds are present, where they roost, nest and loaf, and what they are damaging or fouling. Species matters most, because a feral pigeon has no federal protection while most native birds do. You also check whether there are active nests. Under current FWS guidance, destroying an in-use nest of a protected species needs federal authorization, while an inactive nest with no viable eggs or young can be removed if nothing is kept.",
      "Then you design and price the system. Extension guidance lists the main tools: quarter-inch mesh or netting to block lofts and vents, one-inch UV-stabilized polypropylene netting for architectural areas (about a ten-year life according to the source), spikes, parallel wires set at different heights above a ledge, electric track systems, and sheet material that slopes ledges at 45 degrees or more so birds cannot stand. Choosing between them depends on the bird pressure, the building, appearance and the client's budget.",
      "Install days are long and physical. You stage materials, set up lifts or ladders, and fit anchors, cables and netting across the underside of a canopy or a run of ledges. Commercial sites have their own rules: working hours, traffic, food-safety controls in food plants, and lift or fall protection requirements.",
      "Cleanup is a large part of the work and the part with the most health risk. CDC lists disturbing accumulations of bird droppings as a high-risk activity for histoplasmosis. Droppings and nest material are removed with the respiratory protection and protective clothing the job calls for.",
      "Some days are service and repair: checking existing systems, fixing damaged netting, restoring power to electric track or removing a trapped bird. Interior jobs, such as birds inside a warehouse, have their own federal rule. Under 50 CFR 21.14 a migratory bird may be humanely removed from inside an occupied building without a permit, with no glue traps and immediate release. This does not cover exteriors such as siding or eaves."
    ],
    duties: [
      "Survey sites to identify bird species, numbers, roosting and nesting areas and the damage caused.",
      "Check the legal status of each species and the status of any nests before work begins.",
      "Design exclusion and deterrent systems suited to the bird pressure and the building.",
      "Write proposals and scopes of work for commercial clients.",
      "Install bird netting, including cable perimeters, anchors and access panels.",
      "Install spikes, post-and-wire systems and electric track deterrents.",
      "Fit sloped ledge covers and other physical modifications.",
      "Seal vents, lofts and other openings with mesh.",
      "Clean and decontaminate droppings and nest material with proper protective equipment.",
      "Operate aerial lifts and ladders safely and use fall protection where required.",
      "Humanely remove birds trapped inside buildings within federal rules.",
      "Run trapping programmes for unprotected species where state law and site conditions allow.",
      "Inspect, repair and maintain installed systems on service visits.",
      "Document work with photos and reports for property managers."
    ],
    workEnvironment: {
      schedule: "Commercial installations are often scheduled around the client's operations, which can mean early starts, nights or weekends at retail and industrial sites. No source was found that sets typical hours for this specialty. BLS says evening and weekend work is common for pest control workers generally.",
      seasonality: "Nesting season matters, because in-use nests of protected species cannot be destroyed without federal authorization, and FWS recommends doing work outside the nesting season. Feral pigeons, starlings and house sparrows are not federally protected, but state rules still apply. Exterior installation work is also affected by weather.",
      physical: "Working at height for long periods, often overhead, carrying and fitting materials, and operating lifts. Cleanup work is dirty and done in full protective gear. O*NET reports that 81% of pest control workers surveyed work outdoors in all weather every day.",
      hazards: "Falls are the main risk. OSHA's construction standard requires fall protection when working 6 feet or more above a lower level, and its general industry standard sets the trigger at 4 feet, with specific rules for working near the edge of low-slope roofs. Ask which standard your employer applies and what fall protection, lift training and rescue plans they provide. Droppings carry disease risk: CDC lists disturbing bird or bat droppings as a high-risk activity for histoplasmosis. Extension guidance warns that contact with nests can expose you to mites and lice and that some chemical repellents and toxicants are hazardous.",
      vehicleAndTravel: "Commercial bird work often covers a wide area, so expect long drives to sites and some overnight jobs. Trucks or trailers carry ladders, netting rolls, cable and tools, and lifts are often rented and delivered to site. Ask employers about travel pay, per diem and who operates and arranges the lifts."
    },
    training: {
      entry: "BLS lists a high school diploma or equivalent as the typical entry education for pest control workers. No source sets a separate entry standard for bird exclusion. Employers will likely look for comfort at height, basic construction skills and a clean driving record, but ask each employer what they require. Backgrounds in roofing, signage, rope access or general construction carry over well.",
      onTheJob: "Most people learn on the job, installing systems under an experienced lead. O*NET rates pest control work as needing anywhere from a few days to a year of on-the-job training. Expect to be trained on fall protection and on any lift before you use it, and ask the employer what that training covers. Many installers also learn from manufacturer training on specific netting, spike and electric systems, but those are vendor programmes, not certifications from an independent body.",
      licensing: "The licensing picture is uneven, and it is where people most often go wrong.\n- Physical exclusion without pesticides often needs no pesticide licence, but not everywhere. Texas exempts installing non-pesticide barriers against nuisance animals from structural pest control licensing. California's exemption for exclusion work does not include pigeons, so pigeon work in or on structures falls under Structural Pest Control Board licensing. Florida's pest control law covers mechanical devices used against pest birds in, on or under structures.\n- Any pesticide use needs the state pesticide licence. That includes avicides, which are restricted use pesticides, and sticky or chemical repellents registered as pesticides. Extension guidance says Avitrol (4-aminopyridine) is a restricted use pesticide that needs a certified applicator, and DRC-1339 is limited to USDA APHIS use.\n- Federal bird law sets what you may touch. The Migratory Bird Treaty Act protects most native birds. Lethal take of protected birds needs a depredation permit or a depredation order. No permit is needed merely to scare or herd them unless they are eagles or threatened or endangered species. Feral pigeons, European starlings and house sparrows are not protected by the Act.\n- State law adds more. Florida, for example, requires bird traps to be labelled and requires an FWC permit for unlicensed people trapping non-native nuisance birds.\nSee the site's federal bird rules and state wildlife pages for the verified details. This is not legal advice.",
      certifications: [
        {
          name: "State pesticide applicator licence (structural or general pest category)",
          body: "Your state pesticide regulatory agency",
          what: "Needed for any pesticide use, including avicides and registered repellents, and in some states for any bird work in structures.",
          url: "https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm"
        },
        {
          name: "NWCOA Wildlife Control Operator Training Course",
          body: "National Wildlife Control Operators Association (NWCOA)",
          what: "Two-day course whose syllabus includes birds alongside bats, squirrels and other species, plus inspection and safety. Useful where bird work overlaps wildlife control.",
          url: "https://nwcoa.com/page-18086"
        },
        {
          name: "Fall protection and aerial lift operator training",
          body: "Provided by your employer or a qualified trainer under OSHA rules",
          what: "Not a single national certificate. OSHA sets duties to protect workers from falls; ask what training and documentation your employer provides for harnesses and lifts.",
          url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.501"
        }
      ]
    },
    skills: [
      "Bird identification and knowing each species' legal status",
      "Working safely at height, including harness use and lift operation",
      "Construction and rigging skills: anchors, cable tensioning, fastening to different building materials",
      "System design: matching the deterrent to the bird pressure and building",
      "Estimating materials and labour for large installations",
      "Careful, protected cleanup of droppings",
      "Working around clients' operations and site rules",
      "Clear reporting to property managers"
    ],
    tools: [
      "Bird netting (UV-stabilized polypropylene and other grades) with cable, turnbuckles and crimps",
      "Anchors, drills and fixing hardware for masonry, steel and wood",
      "Bird spikes",
      "Post-and-wire deterrent systems",
      "Electric track deterrent systems and power units",
      "Sheet material for sloped ledge covers",
      "Quarter-inch mesh for vents and openings",
      "Aerial lifts (boom and scissor) and ladders",
      "Fall protection harnesses, lanyards and anchors",
      "Respirators, disposable coveralls and eye protection for cleanup",
      "Scrapers, sprayers and disinfectants for droppings removal",
      "Live traps for unprotected species where allowed",
      "Camera for before and after documentation"
    ],
    careerPath: [
      {
        stage: "Installer or helper",
        description: "Staging materials, assisting on lifts, cleanup and learning to fit netting and deterrents under a lead."
      },
      {
        stage: "Lead installer",
        description: "Running a crew on site, laying out systems and making sure the installation matches the design."
      },
      {
        stage: "Surveyor and estimator",
        description: "Surveying sites, designing systems and pricing jobs. This is often the step into sales and project management."
      },
      {
        stage: "Project or operations manager",
        description: "Managing several crews and large commercial accounts, safety programmes and compliance with bird law."
      },
      {
        stage: "Specialist or owner",
        description: "Some move into falconry-based abatement, wider wildlife control or exclusion, or start their own bird management company."
      }
    ],
    pay: "BLS does not track bird exclusion installers separately. People doing this work for pest control companies are most likely counted under pest control workers (SOC 37-2021), where the median annual wage was $45,250 in May 2025 ($21.75 an hour), with the lowest 10% under $34,680 and the highest 10% over $61,890. These figures exclude the self-employed and do not show overtime, travel pay or commission. Some bird exclusion work may be done by firms classed as construction contractors, where pay could differ, but no source was found that measures this. Ask employers about hourly rates, overtime, travel and per diem, and any commission on sales.",
    benefits: "No benefits data exists for this specialty. The BLS National Compensation Survey for private industry workers in service occupations, the group that includes pest control workers, found that in March 2026, 47% had access to employer medical care benefits, 47% to retirement benefits, 67% to paid sick leave, 57% to paid vacation and 56% to paid holidays. For all private industry workers the figures were 71%, 72%, 81%, 80% and 81%. Ask about health cover, retirement, paid leave, travel pay, per diem, provided protective equipment, and whether the company pays for lift and fall protection training.",
    goodParts: [
      "You build something visible that lasts. Extension guidance gives netting about a ten-year life.",
      "Commercial work, so fewer callbacks from anxious homeowners and more project-style jobs.",
      "Often no pesticides at all.",
      "Construction skills transfer to and from other trades.",
      "Large jobs and service contracts can make work steady."
    ],
    hardParts: [
      "Long hours at height, with fall risk on every job.",
      "Droppings cleanup is dirty and carries disease risk.",
      "Bird law is complex, and nesting season limits what you can do with protected species.",
      "Travel and overnight jobs can be frequent.",
      "Some state pest control laws reach bird work unexpectedly, so the licence picture varies."
    ],
    faq: [
      {
        q: "Do I need a pest control licence to install bird netting?",
        a: "It depends on the state. Texas exempts non-pesticide barriers. California does not exempt pigeon work in structures from structural pest control licensing. Florida's pest control law covers mechanical devices used against pest birds in structures. Any pesticide use needs a licence everywhere."
      },
      {
        q: "Which birds can I legally deal with?",
        a: "Feral pigeons, European starlings and house sparrows are not protected by the Migratory Bird Treaty Act. Most native birds are. You can scare or herd most protected birds without a federal permit, but lethal take needs a depredation permit or a depredation order. State rules still apply to all species."
      },
      {
        q: "Can I remove nests?",
        a: "For protected species, FWS guidance says an inactive nest with no viable eggs or young can be destroyed without a permit if nothing is kept, while destroying an in-use nest needs authorization. It is your responsibility to confirm a nest is inactive. Eagle nests and listed species are protected even when inactive."
      },
      {
        q: "What about a bird trapped inside a warehouse?",
        a: "Under 50 CFR 21.14, anyone may humanely remove a migratory bird from the inside of an occupied building without a permit when it is disrupting normal use. No glue traps, release it immediately, and seal the entry. This does not cover the outside of buildings."
      },
      {
        q: "Is this more construction or more pest control?",
        a: "Much of it is construction-style installation work at height. The pest control part is understanding bird behaviour and the law. A background in roofing, rigging or general construction is useful."
      },
      {
        q: "What height safety training do I need?",
        a: "OSHA requires employers to protect workers from falls, starting at 6 feet in construction and 4 feet in general industry. Expect training on harnesses and on any lift before you use it, and ask what documentation the employer gives you."
      },
      {
        q: "Are poisons used for pigeons?",
        a: "Rarely, and only under pesticide law. Extension guidance describes Avitrol as a restricted use pesticide for certified applicators and DRC-1339 as limited to USDA APHIS use. Check current registration status with your state pesticide agency."
      }
    ],
    sources: [
      {
        label: "Internet Center for Wildlife Damage Management: Pigeon damage control and prevention methods",
        url: "https://icwdm.org/species/birds/pigeons/pigeon-damage-control-and-prevention-methods/"
      },
      {
        label: "50 CFR 21.14 Authorization: birds in buildings (eCFR)",
        url: "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-B/section-21.14"
      },
      {
        label: "50 CFR 21.100 Depredation permits (eCFR)",
        url: "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-D/section-21.100"
      },
      {
        label: "50 CFR 21.150 Depredation order for blackbirds, cowbirds, crows, grackles and magpies (eCFR)",
        url: "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-D/section-21.150"
      },
      {
        label: "OSHA 29 CFR 1926.501 Duty to have fall protection (construction)",
        url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.501"
      },
      {
        label: "OSHA 29 CFR 1910.28 Duty to have fall protection (general industry)",
        url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.28"
      },
      {
        label: "CDC/NIOSH: Histoplasmosis key points",
        url: "https://www.cdc.gov/niosh/histoplasmosis/about/"
      },
      {
        label: "BLS Occupational Outlook Handbook: Pest Control Workers",
        url: "https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm"
      },
      {
        label: "O*NET OnLine: Pest Control Workers (37-2021.00)",
        url: "https://www.onetonline.org/link/summary/37-2021.00"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026",
        url: "https://www.bls.gov/news.release/ebs2.nr0.htm"
      },
      {
        label: "BLS NCS Table 2: Medical care benefits, March 2026",
        url: "https://www.bls.gov/news.release/ebs2.t02.htm"
      },
      {
        label: "BLS NCS Table 6: Paid leave benefits, March 2026",
        url: "https://www.bls.gov/news.release/ebs2.t06.htm"
      },
      {
        label: "NWCOA: Wildlife Control Operator Training Course",
        url: "https://nwcoa.com/page-18086"
      }
    ],
    notes: "Nest guidance (FWS MBPM-2-02, Jan 2025), the list of species not protected by the MBTA, the state licensing positions for TX, CA and FL, and Florida's bird trap rule come from lib/content/wildlife.ts (verified 2026-09-25) and were not re-fetched. 21.14, 21.100 and 21.150 text was re-read from the eCFR versioner API today. Avitrol: ICWDM describes it as a restricted use pesticide; a search-result snippet said the sole manufacturer shut down in 2010, which was NOT verified from a primary source, so the guide only says to check current registration with the state. OSHA aerial lift fact sheet PDF could not be parsed, so no specific OSHA lift training rule is cited; the guide says 'expect to be trained, ask the employer'. Which OSHA fall standard (1926 vs 1910) applies to bird exclusion installs is not settled here; left to the reader. No height certification body (e.g. SPRAT/IRATA rope access) was researched, so none is listed even though disciplines.ts mentions rope access. The pesticide-licence certification entry links to BLS OOH as a general licensing source because no single national body issues it. Pay mapping to 37-2021 is an inference. NCS retirement/medical identical-figure caveat: see wildlife-control notes. UC IPM pigeon pest note URL tried (pn7433) was the wrong page, so UC IPM is not cited."
  },
  "k9-detection": {
    intro: "K9 detection in pest control means working with a dog trained to find a target pest by scent, most often bed bugs, and also termites and some other pests. The handler and dog work as one team. They search hotel rooms, apartments, offices, dorms, theatres and other places where a visual inspection would be slow or unreliable, and the handler reads the dog's alerts and reports what they mean. No state licence covers detection itself, but in most cases it is pest control work done by a pest control business, and at least one state, Maryland, regulates canine teams directly. Credibility rests on independent team certification and on honest reporting, because field research has shown that teams can perform much worse in real buildings than in controlled tests. The job suits people who want to work closely with a dog every day, who are patient and disciplined about training, and who are comfortable telling a client the limits of what a dog alert proves.",
    dayInTheLife: [
      "The day starts with the dog: exercise, a health check, toileting and setting up the vehicle for travel. The dog lives with the handler or in the company's care, so the working relationship never fully switches off.",
      "Training is built into every week. The SWGDOG guideline for pest and insect detection dogs recommends an average of four hours a week of routine training to keep a team proficient, combined regularly with supervised training by a qualified trainer other than the handler. Training uses varied locations, amounts of target odor, heights, containers, distractors and blank searches. NPMA's bed bug best practices say distractors commonly found in the environments you inspect should be part of ongoing training.",
      "Inspection days are often large jobs: a block of hotel rooms, a floor of apartments, or a school or office. The dog searches in short working periods with breaks, and the handler watches for the dog's trained alert and pinpoints the location. Rutgers researchers who studied teams in occupied apartments recorded inspection times of a few minutes to about ten minutes per apartment, and found that the team that took the longest per unit performed best on the first day.",
      "After an alert, the handler or a technician tries to confirm it. NPMA's best practices say that before treatment the handler or a pest professional should try to confirm a canine alert by a visual inspection, by monitoring devices or by a second canine team. If live bed bugs cannot be confirmed, the client may choose to treat anyway but should be told that activity was not confirmed.",
      "The rest of the day is reports and records. Clients get a report of what was searched, where the dog alerted and what was confirmed. The business keeps records of the team's training and certification. In Maryland that is a legal requirement: records must be kept for two years and shown to the Department of Agriculture on request. Heat, travel and the dog's condition shape the schedule. Penn Vet researchers note that heat injury is the most common non-traumatic cause of death in police and military working dogs, so cooling breaks and shade are part of planning any working day."
    ],
    duties: [
      "Care for the dog daily: feeding, exercise, grooming, health checks and veterinary care.",
      "Run routine maintenance training each week, with blank searches and distractors.",
      "Keep training aids stored and handled so they do not contaminate each other.",
      "Arrange and pass annual independent team certification for each target pest.",
      "Plan inspections with clients: units, access, timing and what the dog will and will not search.",
      "Search rooms, furniture, vehicles, luggage and common areas with the dog.",
      "Read the dog's behaviour and pinpoint alert locations accurately.",
      "Confirm alerts visually, with monitors or with a second team before treatment is recommended.",
      "Write clear inspection reports that separate confirmed findings from unconfirmed alerts.",
      "Tell clients the team's certification status.",
      "Keep training, certification, proficiency and deployment records.",
      "Manage the dog's workload, heat exposure and rest breaks.",
      "Transport the dog safely and keep the vehicle set up for its welfare.",
      "Work with treatment technicians and follow up after treatment to check results."
    ],
    workEnvironment: {
      schedule: "Hotels, multi-unit housing and commercial clients often want inspections at times that suit their occupancy, which can mean early mornings, nights or weekends. BLS says evening and weekend work is common for pest control workers generally. On top of client work, expect training sessions every week and daily dog care on days off.",
      seasonality: "No source was found that measures seasonal demand for canine inspections. Heat is the seasonal factor that matters most for the dog: warm months mean shorter work periods, more cooling breaks and careful vehicle management.",
      physical: "Walking, bending and kneeling through many rooms a day, handling a strong, motivated dog on lead, and lifting or moving furniture during confirmation. BLS notes that pest control workers often kneel, bend and crawl in tight spaces.",
      hazards: "For the handler: the usual inspection hazards, including pesticide residues in treated rooms and the physical strain of long search days. For the dog: heat. Penn Vet researchers say working dogs are bred and trained for high drive, which can override signs of overheating, and that heat injury is the most common non-traumatic cause of death in police and military working dogs. Their study found voluntary head dunking in cool water cooled dogs fastest, and they also recommend ice packs on a collar and wet towels at the neck and armpits as practical field methods.",
      vehicleAndTravel: "You drive between client sites with the dog, often for long days and sometimes overnight trips for large accounts. The vehicle needs a secure, ventilated space for the dog and a plan for heat while parked. Ask employers who owns and equips the vehicle and who pays for the dog's food and veterinary care."
    },
    training: {
      entry: "Most handlers come from one of two directions: a pest control technician who takes on a dog, or a dog handler, often with police, military or professional training experience, who moves into pest control. No source sets an education standard for handlers. BLS lists a high school diploma or equivalent as typical entry education for pest control workers. NPMA's bed bug best practices say handlers should be trained in bed bug biology, behaviour, inspection methods and identification, which points toward a pest control background or training.",
      onTheJob: "Handler training happens with the specific dog, because certification is for the team, not for the dog or handler alone. The SWGDOG guideline says initial training should be done by a competent, qualified detector dog trainer using a structured curriculum, should cover all conditions the team could meet during certification, and should continue until the team is certified or judged not certifiable. After that, training is permanent: SWGDOG recommends an average of four hours a week of maintenance training plus regular supervised training by someone other than the handler. No independent source was found for how long initial handler training typically takes or what a trained dog costs, so ask any trainer for a written course outline, the hours involved, what is included, and what happens if the team fails certification.",
      licensing: "No state licence covers canine detection on its own, but the work usually sits inside pest control law.\n- Pest control licensing. Inspections for bed bugs and termites are normally sold by licensed pest control businesses, and any treatment that follows needs a licensed applicator. Check your state pesticide agency for whether a detection-only business must be licensed.\n- Maryland regulates canine teams directly (COMAR 15.05.01.14 C). A pest control business may not use a canine scent pest detection team unless the dog and handler are trained to the regulation's standard and the business is licensed. Each team must be certified for each target pest by a person or organization recognized by the Department, and recertified every year. Only teams can be certified, not dogs or handlers alone. Pseudo-scents and extracts may be used in training but not in certification tests. Records must be kept for two years.\n- Other states may have their own rules. Check before you sell canine inspections in a new state. This is not legal advice.",
      certifications: [
        {
          name: "Independent third-party team certification to the NPMA minimum standards",
          body: "National Pest Management Association (standards); certification by independent organizations",
          what: "NPMA's bed bug best practices say canine inspections shall be done by a team with current, independent third-party certification. The minimum standards: team-only certification valid one year, testing under field conditions in at least four areas, a 20-minute total search time, pass in every room with one false alert allowed but not on a placed distractor, no pseudo-scents or extracts, two proctors with at least five years' scent dog experience who are not the dog's trainer.",
          url: "https://www.npmapestworld.org/media/rliieovg/npma-bed-bug-best-management-practices-2023_v2.pdf"
        },
        {
          name: "World Detector Dog Organization (WDDO) certification",
          body: "World Detector Dog Organization",
          what: "Certifies teams in several scent disciplines including bed bugs, using a randomized, double-blind testing method and published standards of practice. Certification and recertification come with membership.",
          url: "https://www.wddo.org/"
        },
        {
          name: "National Entomology Scent Detection Canine Association (NESDCA) certification",
          body: "National Entomology Scent Detection Canine Association",
          what: "An entomology-focused team certifying body named in the Rutgers field study and in NPMA material. NESDCA's own website could not be reached, so check its current process and fees directly.",
          url: "https://entomology.rutgers.edu/personnel/changlu-wang/docs/Cooper2014AccuracyCanines.pdf"
        },
        {
          name: "SWGDOG SC8 Pest and Insect Detection guideline",
          body: "Scientific Working Group on Dog and Orthogonal detector Guidelines (SWGDOG), hosted by NIST",
          what: "Not a certificate, but a published guideline many programmes compare against: at least a 90% confirmed alert rate and no more than a 10% false alert rate for certification, about four hours a week of maintenance training, and full training and deployment records.",
          url: "https://www.nist.gov/document/swgdogsubstancedetectordogs-pestandinsectdetectionpdf"
        }
      ]
    },
    skills: [
      "Reading a dog's behaviour, including subtle changes before an alert",
      "Disciplined, record-based training habits",
      "Bed bug and termite biology and identification, to confirm alerts",
      "Honest reporting that separates alerts from confirmed findings",
      "Managing the dog's health, heat load and workload",
      "Client communication: explaining what an inspection can and cannot show",
      "Scheduling and running large multi-unit inspections",
      "Avoiding unintended cues to the dog during searches"
    ],
    tools: [
      "The detection dog",
      "Leads, harness and collar suited to search work",
      "Reward items (food or toy, as trained)",
      "Training aids of live target pests in vented containers, stored separately",
      "Distractor materials for training",
      "Flashlight, inspection tools and magnifier for confirming alerts",
      "Bed bug monitors or interceptors for follow-up confirmation",
      "Water, bowls, cooling towels and ice packs for the dog",
      "Vehicle with a secure, ventilated dog compartment and heat plan",
      "Training, certification and deployment record system",
      "Report templates or software for clients",
      "Canine first aid kit"
    ],
    careerPath: [
      {
        stage: "Pest technician or dog handler",
        description: "The two starting points. Technicians bring pest knowledge; dog handlers bring handling skill. Each has to learn the other side."
      },
      {
        stage: "Handler in training",
        description: "Training as a team with one specific dog under a qualified trainer until the team passes certification or is judged not certifiable."
      },
      {
        stage: "Certified handler",
        description: "Running inspections with annual recertification for each target pest, and keeping up weekly maintenance training."
      },
      {
        stage: "Senior handler or programme lead",
        description: "Managing several teams, training standards and records for a company, and supervising other handlers' training."
      },
      {
        stage: "Trainer, evaluator or business owner",
        description: "Some handlers move into training dogs or running a detection business. Under NPMA standards and Maryland rules, certification evaluators need at least five years of documented scent dog experience and may not be the dog's trainer."
      }
    ],
    pay: "BLS does not track canine detection handlers in pest control as a separate occupation. Handlers employed by pest control companies are most likely counted under pest control workers (SOC 37-2021), where the median annual wage was $45,250 in May 2025, with the lowest 10% under $34,680 and the highest 10% over $61,890. For context only, BLS reports a median of $39,990 for animal trainers (SOC 39-2011) in May 2025, a group that includes people who train dogs for security and other work; that is not the same job. Neither figure includes the self-employed or shows bonus or commission. Ask employers how handlers are paid, whether there is a premium for handling a dog, and who pays for the dog's care while it lives with you.",
    benefits: "No benefits data exists for canine handlers. The BLS National Compensation Survey for private industry workers in service occupations, the group that includes pest control workers, found that in March 2026, 47% had access to employer medical care benefits, 47% to retirement benefits, 67% to paid sick leave, 57% to paid vacation and 56% to paid holidays. For all private industry workers the figures were 71%, 72%, 81%, 80% and 81%. Questions specific to this job: who owns the dog, who pays for food, veterinary care and insurance, what happens to the dog if you leave or it retires, whether you are paid for weekly training and daily care time, and who pays for annual certification.",
    goodParts: [
      "You work with a dog every day, and the partnership is the job.",
      "Dogs can search places and volumes that are slow or impractical to inspect visually.",
      "Under controlled conditions, research shows trained dogs can be highly accurate.",
      "Good, honest handlers build strong trust with commercial clients.",
      "Skills carry into training, programme management and owning a detection business."
    ],
    hardParts: [
      "Field performance can be much lower than controlled tests suggest. The Rutgers study found a mean 44% detection rate and 15% false positive rate in occupied apartments, and certification status did not predict results.",
      "Training never stops: about four hours a week is the SWGDOG guideline, on top of client work.",
      "The dog needs care every day, including days off, holidays and when it is sick or injured.",
      "Heat is a constant risk to the dog and limits how you can schedule work.",
      "Alerts are not proof. You have to confirm them and explain the difference to clients who want a simple yes or no.",
      "Certification standards vary between bodies, so credibility has to be earned, not bought."
    ],
    faq: [
      {
        q: "Do I need a licence to be a K9 handler?",
        a: "There is no separate detection licence in most states, but the work is usually done by a licensed pest control business, and any treatment needs a licensed applicator. Maryland regulates canine teams directly, with annual team certification and two-year record keeping. Check your state pesticide agency."
      },
      {
        q: "Should I buy a trained dog or train my own?",
        a: "No independent source compares these routes or their costs. What the standards agree on is that the team, not the dog, is certified, and that initial training should be by a qualified trainer with a structured curriculum. Ask any seller or trainer for a written outline, the hours of handler training, a health guarantee, and what happens if the team fails certification."
      },
      {
        q: "Which certification should we get?",
        a: "NPMA's best practices call for current, independent third-party team certification to its minimum standards, renewed every year. WDDO and NESDCA are two bodies that certify bed bug teams. Choose one with no business link to your trainer, and in Maryland, one the Department recognizes."
      },
      {
        q: "How accurate are bed bug dogs?",
        a: "In a controlled study (Pfiester and others, 2008), trained dogs found live bed bugs with a 97.5% positive rate and no false positives, and were 98% accurate in hotel rooms with planted bed bugs. In a field study in occupied apartments (Cooper and others, 2014), 11 teams averaged 44% detection and 15% false positives, and the handlers had all believed their dogs were over 95% accurate. Treat alerts as leads to confirm, not as proof."
      },
      {
        q: "What should go in an inspection report?",
        a: "At least what was searched, where the dog alerted, and which alerts were confirmed and how. NPMA's best practices say to try to confirm alerts visually, with monitors or with a second team before treatment, to tell the client if activity could not be confirmed, and to tell clients the team's certification status."
      },
      {
        q: "Can dogs find termites too?",
        a: "Yes, with training for that target. A 2003 controlled study found trained dogs about 96% accurate at finding eastern subterranean termites, with false responses to termite-damaged wood of about 25%. Teams are certified per target pest; in Maryland that is required."
      },
      {
        q: "How do I keep the dog safe in heat?",
        a: "Plan short work periods, shade, water and cooling breaks, and never leave the dog in a hot vehicle. Penn Vet research found that training a dog to dunk its head in cool water cooled it fastest after exercise, with ice packs on a collar and wet towels at the neck and armpits as other practical options. Cool first, then get to a vet if the dog shows heat stress."
      },
      {
        q: "What insurance do I need?",
        a: "No independent source covers this for canine detection. Ask an insurer whether your general liability and professional or errors and omissions cover includes canine inspections and the results you report, whether animal-related injury or property damage is covered, and whether the dog itself can be insured for veterinary costs."
      }
    ],
    sources: [
      {
        label: "Cooper, Wang and Singh (2014), Accuracy of trained canines for detecting bed bugs, J. Econ. Entomol. 107(6): 2171–2181 (Rutgers PDF)",
        url: "https://entomology.rutgers.edu/personnel/changlu-wang/docs/Cooper2014AccuracyCanines.pdf"
      },
      {
        label: "Pfiester, Koehler and Pereira (2008), Ability of bed bug-detecting canines to locate live bed bugs and viable bed bug eggs, J. Econ. Entomol. (PubMed 18767752)",
        url: "https://pubmed.ncbi.nlm.nih.gov/18767752/"
      },
      {
        label: "Brooks and others (2003), Ability of canine termite detectors to locate live termites and discriminate them from non-termite material (PubMed 14503599)",
        url: "https://pubmed.ncbi.nlm.nih.gov/14503599/"
      },
      {
        label: "NPMA Bed Bug Best Management Practices (2023), incl. Appendix A Minimum Standards for Canine Bed Bug Scent Detection Team Certification",
        url: "https://www.npmapestworld.org/media/rliieovg/npma-bed-bug-best-management-practices-2023_v2.pdf"
      },
      {
        label: "COMAR 15.05.01.14 C, Canine Pest Detection Teams (Maryland Department of Agriculture copy)",
        url: "https://mda.maryland.gov/plants-pests/SiteAssets/Pages/Pesticide-Information-for-Professionals/COMAR%2015.05..01%2010.22%20(1).pdf"
      },
      {
        label: "Maryland Department of Agriculture press release (2013): New regulations require pest detection dogs, handlers to be trained and certified",
        url: "https://news.maryland.gov/mda/press-release/2013/01/25/new-regulations-require-pest-detection-dogs-handlers-to-be-trained-certified-2"
      },
      {
        label: "SWGDOG SC8 Substance Detector Dogs: Pest and Insect Detection (NIST)",
        url: "https://www.nist.gov/document/swgdogsubstancedetectordogs-pestandinsectdetectionpdf"
      },
      {
        label: "World Detector Dog Organization",
        url: "https://www.wddo.org/"
      },
      {
        label: "Penn Today: Penn Vet Working Dog Center, reducing dogs' temperature after exercise",
        url: "https://penntoday.upenn.edu/news/penn-vet-working-dog-center-reducing-dogs-temperature-after-exercise-voluntary-head-dunking"
      },
      {
        label: "BLS Occupational Outlook Handbook: Pest Control Workers",
        url: "https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm"
      },
      {
        label: "BLS Occupational Outlook Handbook: Animal Care and Service Workers",
        url: "https://www.bls.gov/ooh/personal-care-and-service/animal-care-and-service-workers.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026",
        url: "https://www.bls.gov/news.release/ebs2.nr0.htm"
      },
      {
        label: "BLS NCS Table 2: Medical care benefits, March 2026",
        url: "https://www.bls.gov/news.release/ebs2.t02.htm"
      }
    ],
    notes: "Per task, specialties are kept brief; another agent covers bed bug, termite, rodent and goose dogs in depth. NESDCA's site (nesdca.org) did not resolve, so its process is not described beyond being named in the Rutgers study (Table 7) and NPMA material; the certification entry links to the Rutgers PDF as the opened source. A search snippet claimed NESDCA uses 4 rooms with 2 positive and 2 negative, blind but not double-blind; NOT verified, left out. IAOCPI (International Association of Canine Pest Inspectors) appears in Cooper 2014 Table 7 but was not researched. WDDO page was read; it did not give recertification timing. Pfiester 2008 and Brooks 2003 abstracts read via Europe PMC REST API (PubMed pages returned a cookie wall); an earlier lookup used PMID 18767753 (a different paper); the correct ID is 18767752. Brooks 2003 authors were not confirmed from the API (authorString did not print) and the journal for Brooks was not confirmed; label says 'Brooks and others' from Cooper 2014's citation. Maryland COMAR text read from the MDA-hosted PDF (printed 10/27/22); re-check for amendments. Note a difference: COMAR requires at least 2 distractors and 3 hides per test area; NPMA requires at least one distractor or hide per area. Dog purchase price, handler course length, insurance products and handler pay premiums have NO source and are written as questions. 'Two starting routes' comes from disciplines.ts, not an external source. Mapping handlers to SOC 37-2021 is an inference; animal trainers figure is context only. Inspection minutes per apartment (2.7 and 10.6 including downtime) come from Cooper 2014 Table 6. NCS caveat: see wildlife-control notes. Penn Vet cooling is a news summary of a peer-reviewed study (Frontiers in Veterinary Science), which was not opened directly; the AVMA warm-weather page returned empty."
  },
  "general-pest": {
    intro: "General pest control is the front door of the pest control industry. A technician visits homes and businesses, often on a repeating schedule, to inspect for, prevent and treat common pests such as ants, cockroaches, spiders, rodents and stored product pests. The Bureau of Labor Statistics counts this work under pest control workers, an occupation that held about 108,700 jobs in 2025. Most of those jobs, 88 percent, were in exterminating and pest control services companies. Most people start as technicians with a high school diploma or equivalent and learn on the job, and most states require a licence, which usually means training and an exam. The work suits people who like being on the road, working without someone looking over their shoulder, solving the puzzle of why a problem keeps coming back, and talking with customers all day. It suits people less well if they want to stay indoors, dislike driving, or do not want to kneel, crawl and handle pesticides under strict legal rules. It is also the starting point for almost every other field on this site.",
    dayInTheLife: [
      "The day usually starts with the truck. A technician checks the day's stops in the company's scheduling software, makes sure the chemicals, baits, traps and equipment needed for those stops are on board, and drives out. O*NET's survey of people in this occupation found that 95 percent operate a vehicle or equipment every day, and 81 percent work outdoors in all weather every day. BLS notes that pest control workers must travel to a client's home or business and work both indoors and outdoors.",
      "At each stop the work begins with people and an inspection, not with a sprayer. O*NET reports that 81 percent of workers have face-to-face discussions every day and 72 percent are on the phone every day. The technician asks what the customer has seen, then inspects to find the source and extent of the problem. Michigan State University's training manual for general pest control calls the inspection the most critical phase of any pest management operation, and calls the flashlight probably the most important piece of inspection equipment in the industry. The technician is looking for the pest itself, signs it leaves behind, and the conditions that let it thrive: moisture, food, clutter, gaps and cracks.",
      "Treatment follows the inspection. Under integrated pest management, which EPA describes as setting action thresholds, monitoring and identifying pests accurately, preventing problems, and then choosing controls for both effectiveness and risk, the technician may place monitors and baits, apply a targeted crack-and-crevice or perimeter treatment, set traps or bait stations for rodents, and recommend repairs or sanitation changes to the customer. Every product is used exactly as its label directs. EPA labels carry the statement that it is a violation of federal law to use the product in a manner inconsistent with its labeling.",
      "Before leaving, the technician records the work. O*NET lists recording work activities and cleaning the work site among the core tasks of the job. The MSU manual says inspection reports should list the pests present, the extent of the infestation, the tools and chemicals used and the structural problems contributing to the pest issue. BLS lists bookkeeping skills as an important quality, because workers keep track of hours, chemical use and payments.",
      "Across a week, the pattern repeats with variation. BLS says working evenings and weekends is common and some workers put in more than 40 hours. New technicians spend part of their first months in required training and under supervision. In Texas, for example, a licensed technician must meet in person with the certified applicator responsible for supervising them one day per week. Licensed workers also attend continuing education, which BLS notes is common because pest control methods change."
    ],
    duties: [
      "Inspect homes, businesses and surrounding areas to find the source and extent of a pest infestation and any damage it has caused.",
      "Identify the pest correctly, since the right treatment depends on the species.",
      "Talk with customers about what they have seen, explain the plan, and recommend treatment and prevention methods.",
      "Measure areas that need treatment and estimate the cost of service.",
      "Choose a treatment that fits the pest, the site and the product label, using integrated pest management principles.",
      "Apply pesticides by spraying or dusting, or by placing baits, following label directions exactly.",
      "Set mechanical traps and place bait stations for rodents and other pests.",
      "Place and check monitoring traps to measure pest activity before and after treatment.",
      "Point out conditions that invite pests, such as moisture, clutter and gaps, and recommend sanitation or repairs.",
      "Operate and maintain spray equipment, including hand-held compressed-air sprayers, backpack sprayers and truck-mounted power sprayers, and calibrate equipment so the right amount is applied.",
      "Drive a company vehicle between stops and keep its chemicals and equipment secured.",
      "Record the work done, including pests found, products and amounts used, and recommendations made.",
      "Clean the work site after the job is finished.",
      "Track inventory of chemicals and supplies.",
      "Wear and maintain personal protective equipment such as gloves, goggles and respirators when the job or label calls for it.",
      "Complete required training and continuing education to keep a licence current."
    ],
    workEnvironment: {
      schedule: "BLS says most pest control workers are employed full time, working evenings and weekends is common, and some work more than 40 hours per week. In O*NET's work context survey, 51 percent reported a 40-hour week. Ask employers how routes are scheduled, whether Saturday work is expected, and how overtime is handled.",
      seasonality: "Neither BLS nor O*NET publishes how workload in this occupation changes through the year, so this guide does not put numbers on it. Pest activity does follow biology and weather. Some pest events are clearly seasonal, for example termite swarms in spring and fall described by University of California IPM. Ask employers how the number of stops, hours and pay change between the busy and slow parts of the year where you live.",
      physical: "BLS describes workers who kneel, bend and crawl in tight spaces to inspect sites, and lists physical stamina as an important quality. In O*NET's survey, 66 percent spend more than half their time walking or running, 58 percent spend more than half their time standing, and 55 percent spend more than half their time making repetitive motions. Crawlspaces, attics and ladders are part of the job.",
      hazards: "Pesticides are the obvious hazard. BLS says workers are trained in pesticide safety and typically wear protective gear that may include gloves, goggles and respirators. O*NET's survey found 66 percent are exposed to contaminants every day, 52 percent to hazardous conditions every day, and 35 percent to minor burns, cuts, bites or stings every day. Rodent work carries a disease risk: CDC says people who handle and clean up after rodents, such as pest exterminators, are at higher risk of hantavirus exposure and should take precautions. Hot attics and summer days bring heat illness risk, which OSHA says affects both indoor and outdoor workers. Ladders and roofs bring fall risk; OSHA calls falls among the most common causes of serious work-related injuries and deaths. The MSU manual tells technicians to keep a ladder on the truck and never use a customer's chair or ladder.",
      vehicleAndTravel: "You drive for a living. BLS says many pest control companies require a driver's licence and a good driving record. O*NET lists driving a truck equipped with power spraying equipment as a core task. Whether the vehicle is a company truck, whether you can take it home, and who pays for fuel are employer policies that vary, so ask."
    },
    training: {
      entry: "BLS says pest control workers typically need a high school diploma or equivalent. In O*NET's survey, 85 percent said a high school diploma or equivalent is required and 14 percent said a post-secondary certificate is required. No college degree is needed to start. Under federal rules the minimum age is 18 for certified applicators and for noncertified applicators using restricted use pesticides under direct supervision; California's structural pest law also sets 18 as the minimum age to apply for its applicator and field representative licences. BLS says many companies require a driver's licence and a good driving record. Background checks are not set by federal rule for this job, but companies accredited under NPMA's QualityPro program must meet standards that include background and motor vehicle record checks. Expect to be asked about your driving record and possibly your background.",
      onTheJob: "BLS says most pest control workers begin as technicians and receive on-the-job training that can usually be completed in less than 3 months. States set minimums, and they differ. In Texas, a new hire registers as an apprentice within 10 days of employment. The apprentice must complete 20 hours of classroom training in general standards, 8 hours of classroom training in each category, and 40 hours of on-the-job training in each category, plus an approved technician training course, and must pass the technician exam before the 12-month apprentice card expires. Until training is complete, an apprentice may not work without a licensed applicator physically present. In Florida, a supervised unlicensed employee must complete 40 hours of site training under the certified operator in charge before performing, soliciting, inspecting or applying pest control, then complete 4 continuing education units within 6 months of receiving an ID card and 2 every year after. Federal rules for anyone using restricted use pesticides under supervision require training within the last 12 months, a way to reach the certified applicator immediately, and access to the product labeling at all times.",
      licensing: "BLS says most states require pest control workers to be licensed, and that workers usually must complete training and pass an exam. The federal framework covers restricted use pesticides: EPA sets certification standards in 40 CFR Part 171, which includes a commercial category for industrial, institutional, structural and health related pest control, and each state's pesticide agency runs certification under those standards. Many states go further and license structural work whatever product is used. Michigan's category 7A manual describes a commercial applicator subclass for anyone who applies pesticides other than ready-to-use products in the course of employment or for hire. Florida's structural pest control law requires anyone without a licence to be supervised regardless of the type of pesticide. The common pattern is a ladder: a registered trainee or apprentice, then a licensed technician who can work alone in the categories they hold, then a certified applicator or operator who can supervise others and is often the person a company licence depends on. Exams usually include a core section on laws, safety and labels plus a category exam. Category names differ: Texas calls it Pest Control, Florida General Household Pest Control, California Branch 2 General Pest, and several states use a numbered 7A category. Licences must be renewed with continuing education; the federal maximum recertification interval is 5 years, and many states renew every year. Check your state's agency (NPIC keeps a directory) and this site's state pages for exact hours, fees and exam rules. This is not legal advice.",
      certifications: [
        {
          name: "State pesticide applicator licence (general or household pest category)",
          body: "Your state pesticide regulatory agency",
          what: "The licence that lets you do the work. Usually a core exam plus a category exam, with continuing education to renew. Requirements vary by state.",
          url: "http://npic.orst.edu/reg/state_agencies.html"
        },
        {
          name: "Associate Certified Entomologist (ACE)",
          body: "Entomological Society of America",
          what: "A voluntary credential for experienced technicians. Requires a current licence that allows unsupervised structural application, at least 5 years of verifiable pest management experience in the US (less with an entomology-related degree), two professional references and a passing exam. Renewal every 3 years with at least 18 CEUs.",
          url: "https://entocert.org/ace"
        },
        {
          name: "Board Certified Entomologist (BCE)",
          body: "Entomological Society of America",
          what: "ESA's longer-established credential, built on a combination of experience, education, references and examination. Eligibility rules changed on 1 January 2025, so check ESA's current requirements.",
          url: "https://entocert.org/bce"
        },
        {
          name: "QualityPro (company accreditation)",
          body: "NPMA QualityPro",
          what: "Accredits companies, not individuals. Accredited companies must meet standards for hiring practices, background and motor vehicle record checks, insurance, workplace safety, customer communications, environmental stewardship and employee training and testing.",
          url: "https://www.npmaqualitypro.org/faqs/"
        }
      ]
    },
    skills: [
      "Customer service: BLS lists it as an important quality, and O*NET finds most workers in face-to-face contact every day.",
      "Attention to detail, because pesticide labels and safety rules must be followed exactly.",
      "Inspection and observation: finding small signs of pests in dark, cramped spaces.",
      "Pest identification and basic biology, which O*NET lists among the knowledge areas for the job.",
      "Basic math for measuring areas, mixing products and estimating costs.",
      "Recordkeeping: tracking hours, chemical use and payments, as BLS describes.",
      "Time management across a route of separate stops.",
      "Physical stamina for standing, bending, kneeling and crawling.",
      "Explaining technical problems in plain words, so customers understand what they must change."
    ],
    tools: [
      "Heavy-duty flashlight, the most important inspection tool according to the MSU manual",
      "Hand mirror for looking behind and under fixtures",
      "Utility tools such as screwdrivers for opening access points",
      "Monitoring traps, including pheromone traps for cockroaches and stored product pests",
      "Flushing agents used during inspection",
      "Hand-held compressed-air sprayer",
      "Backpack sprayer",
      "Truck-mounted power sprayer",
      "Hand and power dusters",
      "Bait stations and bait boxes",
      "Mechanical traps for rodents",
      "Ladder carried on the truck",
      "Camera, where permitted, to document conditions that need correcting",
      "Personal protective equipment: gloves, goggles and respirators as needed",
      "Route and service software such as scheduling programs and pest management databases (O*NET lists PestPac)"
    ],
    careerPath: [
      {
        stage: "Trainee or apprentice",
        description: "Hired without experience and trained under supervision. You learn the pests, the equipment, the labels and the customer conversation, and you work toward the state technician exam. In Texas the apprentice card lasts 12 months."
      },
      {
        stage: "Licensed technician on a route",
        description: "You run your own route in the categories you are licensed for. You still work under a certified applicator or operator who is responsible for your work, and you keep up yearly training. In Texas a technician needs 8 hours of verifiable training each calendar year."
      },
      {
        stage: "Certified applicator or operator",
        description: "The level that can supervise others and, in many states, carry a company's licence. Texas requires one of three routes before the exam: six months as a licensed technician plus 12 of the last 24 months under supervision, a biological science degree, or 12 months of verifiable pest control employment in the last 24 months."
      },
      {
        stage: "Specialist",
        description: "Many technicians add categories and move into termite and WDO work, bed bugs, commercial accounts or fumigation. After five years of experience, some earn the ACE credential."
      },
      {
        stage: "Supervisor or manager",
        description: "BLS says applicators with several years of experience may become supervisors. This site's management page covers branch, technical, safety and operations roles."
      },
      {
        stage: "Owner",
        description: "BLS says some workers start their own pest management business, and 5 percent of pest control workers were self-employed in 2025. Owning a company adds a business licence, a named certified person and insurance requirements. See Starting a company."
      }
    ],
    pay: "BLS does not track general pest work separately from other pest control work, so the honest figure is the one for all pest control workers (SOC 37-2021). The median annual wage was $45,250 in May 2025, or $21.75 an hour. The lowest 10 percent earned less than $34,680 and the highest 10 percent earned more than $61,890. In exterminating and pest control services, where most of these workers are employed, the median was $44,930. For context, the median for all occupations was $50,980. Read these figures with BLS's own definitions in mind. Annual wages assume a full-time, year-round schedule of 2,080 hours. OEWS wages include base pay, commissions, production bonuses and piece rates, but exclude overtime pay, non-production bonuses such as holiday or year-end bonuses, and shift differentials. OEWS also leaves out self-employed workers, so owner-operators are not in these numbers. Many technicians are paid partly on commission or production; ask any employer exactly how pay is calculated, what a typical route earns, and how pay changes in slow months.",
    benefits: "BLS does not publish benefits for pest control workers specifically. The closest official figures come from the National Compensation Survey for March 2026, for private industry workers in service occupations, the broad group that includes building and grounds cleaning and maintenance work. In that group, 47 percent had access to medical care benefits (23 percent participated), 47 percent had access to retirement benefits (23 percent participated), 67 percent had access to paid sick leave, 57 percent to paid vacation, 56 percent to paid holidays and 33 percent to life insurance. For all private industry workers the figures were 71 percent for medical care, 72 percent for retirement, 81 percent for paid sick leave, 80 percent for paid vacation, 81 percent for paid holidays and 59 percent for life insurance. Full-time status matters a great deal: 87 percent of full-time private workers had access to medical care, against 23 percent of part-time workers. The service occupations group covers many jobs besides pest control, so treat these as context, not as a description of any one employer. No official source gives the share of pest companies that provide a take-home vehicle, uniforms, phones, paid licensing or exam fees, or paid training time. Ask each employer directly about all of these, and ask when health coverage starts.",
    goodParts: [
      "You can start without a degree and learn on the job. BLS says training can usually be completed in less than 3 months.",
      "Steady demand. BLS projects 6 percent growth from 2025 to 2035, faster than the 3 percent average, with about 13,700 openings a year.",
      "Independence. In O*NET's survey, half of workers said they have a lot of freedom to decide how they do their tasks.",
      "Problem solving. Each stop is a small investigation into why pests are there and how to stop them coming back.",
      "It opens doors. Termite, fumigation, bed bug, commercial, management and ownership routes almost all start here."
    ],
    hardParts: [
      "Pay sits below the all-occupation median: $45,250 against $50,980 in May 2025.",
      "Evenings and weekends are common, according to BLS, and some weeks run past 40 hours.",
      "It is physical. Kneeling, crawling, ladders, heat and cold are routine.",
      "Daily exposure to contaminants and hazardous conditions, as O*NET's survey shows, means safety habits cannot slip.",
      "A lot of driving, which puts your driving record at the centre of your employability.",
      "Customers can be stressed or unhappy, and you are the person standing in front of them."
    ],
    faq: [
      {
        q: "Do I need a degree or prior experience?",
        a: "No. BLS says a high school diploma or equivalent is the typical entry requirement and most workers start as technicians trained on the job."
      },
      {
        q: "Can I work while I am getting my licence?",
        a: "In most states, yes, under supervision. Texas registers new hires as apprentices who work under a licensed applicator until they pass the technician exam. Florida lets supervised unlicensed employees work after 40 hours of site training. The rules differ by state, so check your state page."
      },
      {
        q: "How long does it take to get licensed?",
        a: "BLS says on-the-job training can usually be completed in less than 3 months. State timelines vary. In Texas the technician exam must be passed before the 12-month apprentice card expires."
      },
      {
        q: "What does it pay?",
        a: "The BLS median for pest control workers was $45,250 a year in May 2025, with the lowest 10 percent under $34,680 and the highest 10 percent over $61,890. Commission and production pay are common enough that you should ask exactly how a company calculates pay."
      },
      {
        q: "Is it dangerous?",
        a: "It has real hazards: pesticides, rodent-borne disease, heat, ladders and driving. BLS says workers are trained in pesticide safety and typically wear gloves, goggles and respirators when needed. Following the label and your company's safety training is what keeps the job safe."
      },
      {
        q: "Will I get a company truck?",
        a: "Often the job involves driving a company truck, and O*NET lists driving a truck with spray equipment as a core task. Whether you take it home and who pays fuel are employer policies, so ask."
      },
      {
        q: "Do I need a clean driving record?",
        a: "BLS says many companies require a driver's licence and a good driving record. QualityPro-accredited companies must check motor vehicle records."
      },
      {
        q: "Where can this lead?",
        a: "Supervisor roles after several years as an applicator, according to BLS, plus specialist fields like termite, fumigation and bed bugs, and ownership."
      }
    ],
    sources: [
      {
        label: "BLS Occupational Outlook Handbook: Pest Control Workers",
        url: "https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm"
      },
      {
        label: "O*NET OnLine: Pest Control Workers (37-2021.00), summary and work context",
        url: "https://www.onetonline.org/link/summary/37-2021.00"
      },
      {
        label: "O*NET OnLine: Pest Control Workers (37-2021.00), task statements and tools",
        url: "https://www.onetonline.org/link/details/37-2021.00"
      },
      {
        label: "BLS OEWS frequently asked questions (what wages include, 2,080-hour annual basis)",
        url: "https://www.bls.gov/oes/oes_ques.htm"
      },
      {
        label: "BLS OEWS overview (self-employed workers excluded)",
        url: "https://www.bls.gov/oes/oes_emp.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 2: Medical care benefits",
        url: "https://www.bls.gov/news.release/ebs2.t02.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 1: Retirement benefits",
        url: "https://www.bls.gov/news.release/ebs2.t01.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 6: Paid leave",
        url: "https://www.bls.gov/news.release/ebs2.t06.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 5: Life insurance benefits",
        url: "https://www.bls.gov/news.release/ebs2.t05.htm"
      },
      {
        label: "US EPA: Revised Certification Standards for Pesticide Applicators",
        url: "https://www.epa.gov/pesticide-worker-safety/revised-certification-standards-pesticide-applicators"
      },
      {
        label: "40 CFR 171.101: Commercial applicator certification categories (Cornell LII)",
        url: "https://www.law.cornell.edu/cfr/text/40/171.101"
      },
      {
        label: "40 CFR 171.201: Direct supervision of noncertified applicators (Cornell LII)",
        url: "https://www.law.cornell.edu/cfr/text/40/171.201"
      },
      {
        label: "Texas Department of Agriculture SPCS: Technician and Apprentice Licensing",
        url: "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Licensing/SPCS-Technician-and-Apprentice-Licensing"
      },
      {
        label: "Texas Department of Agriculture SPCS: Certified Applicator Licensing",
        url: "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Licensing/SPCS-Certified-Applicator-Licensing"
      },
      {
        label: "UF/IFAS Extension PI293: Florida Rules for Direct Supervision of Unlicensed Pesticide Applicators",
        url: "https://ask.ifas.ufl.edu/publication/PI293/pdf"
      },
      {
        label: "Michigan State University Extension E-2048: General Pest Management, Category 7A",
        url: "https://sanweb.lib.msu.edu/DMC/extension_publications/e2048/e2048.pdf"
      },
      {
        label: "US EPA: Integrated Pest Management (IPM) Principles",
        url: "https://www.epa.gov/safepestcontrol/integrated-pest-management-ipm-principles"
      },
      {
        label: "US EPA: Introduction to Pesticide Labels",
        url: "https://www.epa.gov/pesticide-labels/introduction-pesticide-labels"
      },
      {
        label: "CDC: Preventing Hantavirus",
        url: "https://www.cdc.gov/hantavirus/prevention/index.html"
      },
      {
        label: "ESA: ACE eligibility requirements",
        url: "https://entocert.org/ace/eligibility"
      }
    ],
    notes: "1) NCS: Tables 1 and 2 (March 2026) both returned 47/23/49 for private service occupations (access/participation/take-up) for retirement AND medical. Other rows differed between the tables, so it may be a real coincidence, but BLS blocks direct downloads (curl got a 1.3 KB block page) and the figures came through a fetch tool. Re-verify both rows by hand in a browser before publishing. 2) Inference: that pest control workers (SOC 37, building and grounds cleaning and maintenance) fall inside the NCS 'service occupations' group follows from SOC major groups 31-39 being service occupations; I did not open an NCS page that states the mapping. 3) CONFLICT WITH salary.ts: salary.ts says OEWS excludes commission and production pay. The BLS OEWS FAQ says OEWS wages INCLUDE commissions, production bonuses, piece rates and tips, and EXCLUDE overtime, non-production bonuses and shift differentials. Fix salary.ts 'excludes' list. 4) BLS also blocks automated fetches for OEWS occupation pages; the oes372021 page did not render, so percentiles beyond 10/50/90 and state data are not used. 5) The Florida 40-hour and CEU figures come from a UF/IFAS extension summary (PI293, reviewed 11/2024), not from the rule text itself. 6) No sourced data on seasonality, commission prevalence, company vehicles or paid exam fees; all phrased as 'ask employers'. 7) The O*NET page shows 2025 wage data matching OOH; O*NET's employment figure (102,400) differs from OOH (108,700) because they use different vintages; I used OOH. 8) ESA ACE fee amounts for initial application were not shown on the eligibility page; only renewal ($375, $295 members) was shown, so fees are omitted."
  },
  "termite-wdo": {
    intro: "Termite and wood-destroying organism work is the inspection, treatment and reporting side of pest control that protects the structure of a building. EPA says termites cause billions of dollars in structural damage every year and property owners spend over two billion dollars to treat them. The work has two halves. One is treatment: liquid termiticides in the soil, bait systems, treated building materials and wood treatments, and for some infestations, fumigation. The other is inspection and reporting, including the wood-destroying insect reports that home sales and loans often depend on. BLS describes termite control workers as applicators who use chemicals, baiting techniques and structural modifications, and who may repair damage. EPA says firms offering termite services must be licensed by the state. The field suits careful, patient people who do not mind crawlspaces and who can write clearly, because a termite inspection report is a document other people make money decisions on. It is usually entered from general pest after adding the termite category.",
    dayInTheLife: [
      "Many days start with inspections. A technician or inspector arrives at a property, confirms which structures are part of the job, and works through the building from the outside, the inside, the crawlspace or basement and the attic where accessible. On the standard NPMA-33 wood destroying insect inspection report, which NPMA says must be used for HUD and VA guaranteed property transactions, the inspector looks for visible evidence of termites, carpenter ants, carpenter bees and reinfesting wood-boring beetles. That means live insects, dead insects and wings, frass, shelter tubes, exit holes, staining and damage. NPMA's guidance tells the inspector to probe and sound readily accessible wood, and to list the areas that could not be inspected and why.",
      "Then comes the writing. The report records only what was visible on the day. NPMA's guidelines say the inspector is not a damage expert, should not distinguish between structural and cosmetic damage, and that the report clearly states it is not a structural damage report. The inspector still has to make a recommendation, and live termites do not have to be seen for a treatment to be recommended if there is evidence and no documentation of past treatment. Some states set their own rules and forms. In California, only a licensed Branch 3 field representative or operator may inspect before anyone issues an opinion on wood-destroying pests, the report must be delivered within 10 business days of the start of the inspection, and it must include a diagram of the structure showing where infestation or infection was found.",
      "Treatment days look different. For a conventional liquid treatment of subterranean termites, Georgia's minimum treatment standards spell out the work in detail: remove wood debris and cellulose material from under the building, break wood-to-soil contacts, remove accessible termite tunnels, trench along the inside and outside of foundation walls, rod below the trench where needed, and drill concrete slabs, hollow block walls and porches at set intervals so termiticide reaches the soil. The same rule sets the rate at 4 gallons per 10 linear feet per foot of depth for soil, and requires steps to prevent back-siphoning into water supplies and contamination of wells. It is heavy, careful work with a pump, hose, drill and rods.",
      "Other jobs use bait systems. University of California IPM describes baits as slow-acting insecticides that termites share through the colony. Bait work means installing stations around a structure and returning to check and service them. Drywood termites, which nest in dry wood above ground rather than in soil, may be handled with localized treatments such as heat or wood replacement, or with whole-structure fumigation when infestations are widespread, which is fumigation crew work.",
      "Across the week, a termite technician balances inspections, treatments, bait station checks, renewals of service agreements, and paperwork. California requires registered companies to keep inspection reports, field notes and activity forms for three years. The paperwork is not an add-on to the job. It is a large part of what you are paid for and what you are accountable for."
    ],
    duties: [
      "Inspect structures, crawlspaces, basements, attics and surrounding areas for termites and other wood-destroying insects and organisms.",
      "Probe and sound accessible wood to find hidden damage.",
      "Identify the type of termite or other wood-destroying organism, since subterranean, drywood and dampwood termites need different approaches.",
      "Identify conducive conditions such as wood-to-soil contact, moisture problems and wood debris under the structure.",
      "Complete wood-destroying insect inspection reports, including NPMA-33 forms or state-required forms, and list areas that could not be inspected.",
      "Draw foundation diagrams showing where evidence or damage was found, where state rules require it.",
      "Recommend treatment or corrective action based on evidence and documentation of past treatment.",
      "Measure foundations and calculate the volume of termiticide needed.",
      "Trench, rod and drill to apply liquid termiticide to the soil around and under the structure, following the label and state treatment standards.",
      "Drill and treat hollow masonry, slabs, porches and other critical entry points.",
      "Install, monitor and service termite bait stations.",
      "Prevent back-siphoning and protect wells and water supplies during mixing and application.",
      "Seal drill holes after treatment.",
      "Explain findings and treatment options to homeowners, buyers, sellers and real estate agents.",
      "Keep inspection reports, field notes and treatment records as state law requires."
    ],
    workEnvironment: {
      schedule: "BLS does not publish separate hours for termite work. For pest control workers overall, most are full time, evenings and weekends are common, and some work more than 40 hours a week. Inspection scheduling often depends on deadlines set by property sales and loan closings, so ask employers how quickly reports must be turned around.",
      seasonality: "University of California IPM says termite swarms of winged reproductives happen in spring and fall, and swarms are when many homeowners first notice termites. Neither BLS nor any source opened for this guide gives figures on how termite workload varies by month. Inspection volume also tracks home sales in your area. Ask employers how hours change through the year.",
      physical: "This is among the more physical structural lanes. BLS notes that pest control workers kneel, bend and crawl in tight spaces to inspect sites. Termite inspections and treatments put you in crawlspaces and attics, and treatments involve trenching, carrying hose and equipment, and drilling concrete and block.",
      hazards: "Termiticides are pesticides with label requirements, and EPA notes that in most cases termiticide application can only be properly performed by a trained pest management professional. Drilling concrete, brick and block creates respirable crystalline silica dust; OSHA says silica can cause silicosis, an incurable lung disease, as well as lung cancer, COPD and kidney disease, and has a construction standard covering this exposure. Attics and crawlspaces can be very hot; OSHA says heavy physical work and lack of acclimatization raise the risk of heat illness for indoor and outdoor workers. O*NET's survey of pest control workers found 35 percent face minor burns, cuts, bites or stings every day.",
      vehicleAndTravel: "Termite crews usually drive trucks carrying tanks, pumps and hose reels. O*NET lists driving a truck equipped with power spraying equipment as a core task for pest control workers, and BLS says many companies require a driver's licence and a good driving record. Inspectors may drive a lighter vehicle across a wider territory. Ask employers what the vehicle setup is."
    },
    training: {
      entry: "The entry requirements are the same as for pest control workers generally: BLS says a high school diploma or equivalent is typical, and many companies require a driver's licence and a good driving record. The federal minimum age for certified applicators is 18, and California's structural pest law sets 18 as the minimum age to apply for a field representative licence. Most people move into termite work after time in general pest, and some companies hire directly into termite crews.",
      onTheJob: "States set training minimums per category. In Texas, an apprentice must complete 8 hours of classroom training and 40 hours of on-the-job training in each category, so adding Termite Control means its own category training and exam. In California, the Structural Pest Control Board will not accept a Branch 3 field representative application without proof of training and experience in pesticide application, Branch 3 pest identification and biology, application equipment, hazards and safety, structural repairs, and structural inspection procedures and report writing, under the supervision of a Branch 3 licensee. In Florida, an unlicensed employee who will inspect for wood-destroying organisms needs a special ID card and must be trained by the certified operator in charge in WDO detection and control, biology and identification, the inspection forms used for reporting, and the applicable laws, on top of the standard 40 hours of site training. BLS says pest control workers often specialize in areas such as termite elimination after completing general instruction.",
      licensing: "Termite and wood-destroying organism work is a separate licence category in many states, and several states also control who may inspect and sign the report. Texas has a Termite Control category. Florida has Termites and Other Wood-Destroying Organisms. California organises it as Branch 3, Termite and Other Wood-Destroying Organisms, and only a Branch 3 field representative or operator may inspect before a company issues an opinion on wood-destroying pests. Washington issues a separate Structural Pest Inspector licence. Not every state splits termite work out by name, so check your state's category list. Where a state prescribes its own inspection form or procedure, NPMA's guidance says the state form and rules come first. Treatment standards can also be set in state rule, as Georgia does. See this site's state pages and your state agency for specifics. This is not legal advice.",
      certifications: [
        {
          name: "State termite or WDO licence category",
          body: "Your state pesticide regulatory agency",
          what: "The category that lets you treat for termites and, in many states, inspect and report. Usually an added category exam on top of a core exam.",
          url: "http://npic.orst.edu/reg/state_agencies.html"
        },
        {
          name: "Associate Certified Entomologist (ACE)",
          body: "Entomological Society of America",
          what: "Voluntary credential for experienced professionals: current licence allowing unsupervised structural application, at least 5 years of verifiable US pest management experience, two references and an exam. Renew every 3 years with 18 CEUs.",
          url: "https://entocert.org/ace"
        },
        {
          name: "QualityPro (company accreditation)",
          body: "NPMA QualityPro",
          what: "Company-level accreditation covering hiring practices, background and motor vehicle record checks, insurance, safety, customer communications and employee training and testing.",
          url: "https://www.npmaqualitypro.org/faqs/"
        }
      ]
    },
    skills: [
      "Careful, systematic inspection habits, so no accessible area is skipped.",
      "Recognising termite evidence: shelter tubes, wings, frass, blistered or darkened wood, damage that follows the grain.",
      "Clear technical writing, because the report is relied on by buyers, sellers and lenders.",
      "Simple sketching of foundation diagrams.",
      "Measurement and calculation of linear footage and termiticide volume.",
      "Understanding of building construction: slabs, crawlspaces, block walls, porches and where they let termites in.",
      "Patience and stamina for crawlspace and drilling work.",
      "Explaining findings calmly to people with a lot of money riding on the answer."
    ],
    tools: [
      "Flashlight",
      "Probe or screwdriver for probing and sounding wood",
      "Moisture meter, which the MSU manual lists as useful when inspecting for wood-destroying insects",
      "Sound detection device for hearing insects working inside wood",
      "Ladder",
      "Inspection forms such as the NPMA-33 or the state-required form",
      "Graph paper or software for foundation diagrams",
      "Truck-mounted tank, pump and hose reel for liquid termiticide",
      "Trenching shovel",
      "Soil rods for injecting below trenches and under slabs",
      "Hammer drill and masonry bits for slabs and block walls",
      "Patching material for sealing drill holes",
      "Termite bait stations and monitoring devices",
      "Personal protective equipment, including respiratory protection for dust where required"
    ],
    careerPath: [
      {
        stage: "General pest technician",
        description: "Most termite technicians start on a general pest route, learning labels, safety, equipment and customers."
      },
      {
        stage: "Termite technician",
        description: "Adds the termite category, completes category training, and works on treatment crews and bait accounts."
      },
      {
        stage: "WDO inspector",
        description: "Inspects for real estate transactions and writes reports. In some states this needs its own licence level, such as California's Branch 3 field representative or Washington's Structural Pest Inspector."
      },
      {
        stage: "Certified applicator or operator in the termite category",
        description: "Can supervise others in the category and, in many states, qualify a company for termite work."
      },
      {
        stage: "Specialist routes",
        description: "From here, people move into fumigation, exclusion, management or ownership. Five years of experience opens the ACE credential."
      }
    ],
    pay: "BLS does not publish pay for termite or WDO work separately. It counts termite control workers within pest control workers (SOC 37-2021), whose median annual wage was $45,250 in May 2025 ($21.75 an hour), with the lowest 10 percent under $34,680 and the highest 10 percent over $61,890. The median in exterminating and pest control services was $44,930. Those figures include commission and production bonuses but not overtime premium, assume 2,080 hours a year, and exclude self-employed workers. No official source opened for this guide shows whether termite work pays more or less than general pest work, so this guide makes no claim either way. Ask employers how inspections and treatments are paid, for example hourly, per job or by commission on sales.",
    benefits: "There are no official benefit figures for termite work specifically. The closest are BLS National Compensation Survey figures for March 2026 for private industry workers in service occupations, the broad group that includes building and grounds work: 47 percent had access to medical care benefits, 47 percent to retirement benefits, 67 percent to paid sick leave, 57 percent to paid vacation, 56 percent to paid holidays and 33 percent to life insurance. Across all private industry workers, access was 71 percent for medical care and 72 percent for retirement. Full-time workers had much higher access to medical care (87 percent) than part-time workers (23 percent). These are broad context, not what a given pest company offers. Ask employers about health coverage, retirement contributions, paid time off, vehicle use, and whether they pay for category exams, inspector licences and continuing education.",
    goodParts: [
      "Termite work protects the structure of people's homes; EPA puts the damage at billions of dollars a year.",
      "Inspection and report writing reward people who are careful and organised.",
      "Adding a category builds on what you already know from general pest.",
      "The skills lead naturally to fumigation, exclusion, management and ownership.",
      "Each house is different, so the work does not become repetitive in the same way as a fixed route."
    ],
    hardParts: [
      "Crawlspaces, attics, trenching and concrete drilling are hard on the body.",
      "Silica dust from drilling and heat in attics are real health hazards that need proper controls.",
      "Reports are relied on in property sales, so mistakes carry real consequences for the company and for you.",
      "Inspection deadlines are often set by someone else's closing date.",
      "State rules on forms, filing and treatment standards are detailed and must be followed exactly."
    ],
    faq: [
      {
        q: "Do I need a separate licence for termite work?",
        a: "In many states, yes: termite and WDO is its own category, such as Texas Termite Control, Florida Termites and Other Wood-Destroying Organisms, or California Branch 3. Some states fold it into a broader category. Check your state."
      },
      {
        q: "What is a WDI or WDO report?",
        a: "A report of visible evidence of wood-destroying insects (or, in some states, organisms including fungi) found on the day of inspection. NPMA says the NPMA-33 form must be used for HUD and VA guaranteed property transactions unless a state requires its own form."
      },
      {
        q: "Does the report guarantee there are no termites?",
        a: "No. The NPMA guidelines say the report reflects conditions on the inspection date only and provides no warranty unless one is attached. It covers visible evidence, and the inspector must list areas that could not be inspected."
      },
      {
        q: "Do I have to judge structural damage?",
        a: "No. NPMA's guidance says the inspector is not a damage expert and the report states it is not a structural damage report. If damage questions arise, a qualified structural professional should be contacted."
      },
      {
        q: "How are termites treated?",
        a: "EPA lists liquid soil-applied termiticides, termite baits, building materials impregnated with termiticides, and wood treatments. Drywood infestations may be treated locally or by fumigation when widespread."
      },
      {
        q: "Is drilling concrete a health risk?",
        a: "Yes. OSHA lists drilling concrete, brick, block and mortar as a source of respirable crystalline silica, which can cause silicosis and lung cancer. Use the dust controls and respiratory protection your employer provides."
      },
      {
        q: "Can I inspect for real estate as a new hire?",
        a: "It depends on the state. California requires a Branch 3 field representative or operator. Florida lets trained unlicensed employees with a special ID card inspect under a certified operator's supervision."
      },
      {
        q: "Does termite work pay more than general pest?",
        a: "BLS does not separate the two, so there is no official answer. Ask employers how termite work is paid where you are."
      }
    ],
    sources: [
      {
        label: "US EPA: Termites, How to Identify and Control Them",
        url: "https://www.epa.gov/safepestcontrol/termites-how-identify-and-control-them"
      },
      {
        label: "University of California IPM Pest Notes: Termites",
        url: "https://ipm.ucanr.edu/PMG/PESTNOTES/pn7415.html"
      },
      {
        label: "NPMA: Suggested Guidelines for Completing the NPMA-33 (Version 1.3, 2019)",
        url: "https://www.npmapestworld.org/media/mxdpkryi/final-suggested-guideline-for-completing-the-npma-33-rev-2019_08_12.pdf"
      },
      {
        label: "Georgia Department of Agriculture: Structural Pest Control Rule 620-6-.04, Control Measures (2018)",
        url: "https://agr.georgia.gov/sites/default/files/documents/assets/legal/2018/Amended-SPC-Rule-620-6-04-(2018)-(CLEAN).pdf"
      },
      {
        label: "16 CCR 1990: California wood destroying pest inspection report requirements (Cornell LII)",
        url: "https://www.law.cornell.edu/regulations/california/16-CCR-1990"
      },
      {
        label: "California Structural Pest Control Act (Business and Professions Code), SPCB",
        url: "https://www.pestboard.ca.gov/pestlaw/pestact.pdf"
      },
      {
        label: "BLS Occupational Outlook Handbook: Pest Control Workers",
        url: "https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm"
      },
      {
        label: "O*NET OnLine: Pest Control Workers (37-2021.00), summary and work context",
        url: "https://www.onetonline.org/link/summary/37-2021.00"
      },
      {
        label: "BLS OEWS frequently asked questions (what wages include, 2,080-hour annual basis)",
        url: "https://www.bls.gov/oes/oes_ques.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 2: Medical care benefits",
        url: "https://www.bls.gov/news.release/ebs2.t02.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 1: Retirement benefits",
        url: "https://www.bls.gov/news.release/ebs2.t01.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 6: Paid leave",
        url: "https://www.bls.gov/news.release/ebs2.t06.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 5: Life insurance benefits",
        url: "https://www.bls.gov/news.release/ebs2.t05.htm"
      },
      {
        label: "Texas Department of Agriculture SPCS: Technician and Apprentice Licensing",
        url: "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Licensing/SPCS-Technician-and-Apprentice-Licensing"
      },
      {
        label: "UF/IFAS Extension PI293: Florida Rules for Direct Supervision of Unlicensed Pesticide Applicators",
        url: "https://ask.ifas.ufl.edu/publication/PI293/pdf"
      },
      {
        label: "Michigan State University Extension E-2048: General Pest Management, Category 7A",
        url: "https://sanweb.lib.msu.edu/DMC/extension_publications/e2048/e2048.pdf"
      },
      {
        label: "OSHA: Crystalline Silica",
        url: "https://www.osha.gov/silica-crystalline"
      },
      {
        label: "OSHA: Heat Exposure",
        url: "https://www.osha.gov/heat-exposure"
      },
      {
        label: "ESA: ACE eligibility requirements",
        url: "https://entocert.org/ace/eligibility"
      },
      {
        label: "NPMA QualityPro: Frequently asked questions",
        url: "https://www.npmaqualitypro.org/faqs/"
      }
    ],
    notes: "1) Same NCS caveats as general-pest (47/23 coincidence across Tables 1 and 2; service-occupations mapping is an inference). 2) Washington Structural Pest Inspector licence and the Texas/Florida/California category names come from the site's own states.ts records; the Texas apprentice category hours were re-checked on the TDA page; California Branch 3 requirements and report rules were re-checked in the Structural Pest Control Act (B&P 8516, 8564) and 16 CCR 1990. I did not re-open WSDA. 3) disciplines.ts says termite work 'pays better than general pest'. I found no official source for that and did not repeat it; consider softening disciplines.ts. 4) disciplines.ts says 'several states additionally regulate who may sign a WDI/WDO report'. Confirmed for California (Branch 3 signature, 16 CCR 1990; B&P 8516) and Florida (special ID card for WDO inspectors under supervision, via UF/IFAS PI293). 5) VA and FHA lender rules: a search summary said VA expanded inspection counties in July 2025, but I only had a search snippet and a vendor page, so it is not used. Only the NPMA guideline statement about HUD/VA use of the NPMA-33 is used. 6) Georgia's rule is cited as one state's example of treatment standards, not as a national standard. Labels and other states' rules may differ. 7) The Georgia rule's crawlspace clearance (18 inches after treatment) is not cited as a working-space figure. 8) EPA termite page states 'billions of dollars' and 'over two billion dollars' to treat; EPA does not give a year or source for those figures."
  },
  "bed-bugs": {
    intro: "Bed bug work means finding and eliminating bed bugs in homes, apartments, hotels, healthcare settings and other places people sleep or sit. CDC describes bed bugs as small, flat, wingless insects that feed on blood while people sleep, and recommends that people with an infestation contact a professional pest control company experienced with treating them. The work combines detailed inspection, non-chemical methods such as heat, steam, vacuuming and encasements, and insecticides, because NPMA's best management practices say insecticide resistance in bed bugs is widespread. It is also unusually personal work. Bed bugs are not known to spread disease, but researchers have documented serious psychological distress in people living with infestations, and NPMA's guidelines tell companies to train staff to communicate in an understanding, helpful and empathetic manner. BLS does not count bed bug work separately; it sits inside pest control workers. The field suits patient, thorough people who can stay calm with upset customers and who are comfortable working in other people's bedrooms. It is usually entered from general pest.",
    dayInTheLife: [
      "Bed bug days are built around inspections, treatments and follow-ups. Before an inspection, NPMA's best management practices suggest reviewing the building's pest control records, talking with owners, occupants and staff about the history of bed bug activity, and finding out where people sleep and rest outside bedrooms. In large buildings, technicians map infested rooms to see how far the problem has spread.",
      "The inspection itself is close, slow work with a flashlight. NPMA says inspections should focus on where people sit, sleep or rest, and may expand to storage areas, common areas and items that move between rooms. Technicians use flashlights or headlamps, magnifiers, mirrors or a phone camera, forceps and vials for specimens, and hand tools to open furniture and fixtures. Only live bed bugs or viable eggs confirm current activity, and any specimen should be identified by a trained person, because related bugs that feed on bats and birds need different management. Skin reactions alone cannot confirm bed bugs, and NPMA tells inspectors not to inspect a person's body or offer an opinion on a skin reaction.",
      "Treatment is usually a combination. NPMA's guidelines and EPA describe integrated pest management for bed bugs: educating residents, asking for specific cooperation, treating all infested areas with non-chemical and chemical methods, and checking results. A heat treatment means setting up heaters and fans designed for insect control, placing sensors in the harborage areas and the slow-to-heat places, and watching temperatures until the target is held long enough to kill all life stages, while guarding against damage to heat-sensitive items and accidental sprinkler activation. Chemical work can include dusts, liquids, aerosols and other formulations, and NPMA recommends using multiple insecticide classes to manage resistance. Some companies also fumigate; the Vikane structural fumigant label lists bed bugs as a target pest.",
      "In apartments and hotels, a single job often becomes several. NPMA says units beside, above, below and across the hall from an infested unit should be included in the inspection or service, because any of them may be the source or may be infested. Technicians also protect themselves and their next stop: NPMA tells them to assume beds and furniture are infested, avoid sitting or leaning on them, place equipment in an uninfested open area, inspect their clothes and gear before leaving, and dry clothes on high heat for 30 minutes after a bad site.",
      "Follow-up visits are part of the job, not a sign of failure. NPMA says post-treatment assessments should be scheduled based on bed bug biology, the treatment used, how well the client cooperates and the service agreement, and that success is generally declared when no evidence of new activity is found using a combination of detection methods. Everything gets documented, including any lack of cooperation or uncorrected conditions."
    ],
    duties: [
      "Interview clients, property managers and staff about bed bug history and where people sleep and rest.",
      "Review previous pest control records for the building.",
      "Inspect beds, furniture, cracks and crevices, storage areas and common areas for bed bugs and their signs.",
      "Collect specimens and confirm identification, distinguishing bed bugs from related bugs.",
      "Install and service monitoring devices such as interceptors under bed legs.",
      "Explain how clients should prepare for treatment and what they must do afterward.",
      "Install mattress and box spring encasements designed for bed bugs.",
      "Vacuum and steam infested areas and items.",
      "Set up, run and monitor heat treatments, placing sensors in harborage areas and watching for cold spots.",
      "Run containerized heat or freeze treatments for items that are hard to treat in place.",
      "Apply insecticides according to the label, rotating classes and formulations to manage resistance.",
      "Inspect and, where agreed, treat surrounding units in multi-unit buildings.",
      "Advise on whether infested items can be kept or should be discarded, and mark or disable discarded items so they are not reused.",
      "Carry out post-treatment assessments and follow-up visits.",
      "Document inspections, treatments, client cooperation and results.",
      "Take precautions so bed bugs are not carried to the truck, the next job or home."
    ],
    workEnvironment: {
      schedule: "BLS does not publish hours for bed bug work separately. For pest control workers overall, most are full time, evenings and weekends are common, and some work more than 40 hours. Heat treatments typically take a long block of time on one site because temperatures must be raised and held, so expect long days rather than many short stops. Ask employers how heat jobs are scheduled and paid.",
      seasonality: "No source opened for this guide gives figures on seasonal patterns in bed bug work. CDC notes bed bugs are found in hotels, homes and transportation around the world, so this is not tied to outdoor weather in the way many outdoor pests are. Ask employers how steady the workload is.",
      physical: "Bed bug work is detailed and physical. NPMA's guidelines say strains and back injuries are a risk and that technicians should be trained to lift beds and furniture properly. Comprehensive visual inspections, NPMA says, are labor-intensive, time-consuming and physically demanding. Heat treatments mean moving heavy equipment and working in hot rooms.",
      hazards: "NPMA's guidelines list the hazards companies should train for: dangerous items such as sharps and firearms hidden in drawers or under mattresses; possible exposure to pathogens from close contact with people, soiled linens and other potentially infectious materials; heat exhaustion and heat stress; strains and back injuries; and insecticide residues left by clients who treated before calling a professional. NPMA also warns that elevated indoor temperatures during heat treatments can cause heat-related illness in workers and clients, with older adults, children and people with chronic conditions most at risk. Pesticide exposure risks apply as in all pest control work.",
      vehicleAndTravel: "As in other pest control work, you travel to clients and drive a work vehicle, and BLS says many companies require a driver's licence and a good driving record. Heat treatment equipment is bulky, so bed bug crews may run larger vehicles or trailers. NPMA lists trucks, trailers and shipping containers among the enclosures used for containerized heat treatment. Keeping the vehicle free of bed bugs is part of the job."
    },
    training: {
      entry: "Entry is the same as for pest control workers generally: BLS says a high school diploma or equivalent is typical and many companies require a driver's licence and a good driving record. The federal minimum age for certified applicators is 18. Because the work takes you into bedrooms and private spaces, expect employers to care about background checks; QualityPro-accredited companies must meet standards that include background and motor vehicle record checks.",
      onTheJob: "NPMA's best management practices say staff regularly involved in bed bug control or sales need advanced training covering identification, biology and behavior, how bed bugs spread, how to inspect and the limits of each inspection method, treatment options, prevention, why bed bugs are hard to find and eliminate, how to evaluate success, the company's service agreement terms, and the laws that apply. NPMA says this training should be tailored to each market served, such as single-family homes, multi-family housing, hotels, offices, healthcare and transportation, and documented with sign-in sheets or other records. Staff should also be trained to communicate with clients with empathy. On top of that, you need your state's basic training and licence, which BLS says can usually be completed in less than 3 months of on-the-job training for pest control workers. Heat equipment competence is learned on the job; no licence exam tests it.",
      licensing: "Bed bug work is done under the state's general structural pest control licence, not a separate bed bug licence, in the five states this site covers. Texas, Florida, California, South Carolina and Washington list no bed bug category in the category lists on this site's state pages. Insecticide treatments fall under that licence like any other structural pest work, including the federal rules for restricted use products in 40 CFR Part 171. Heat equipment is a different matter: NPMA's guidelines tell companies to research fire codes and local ordinances on portable heaters and fire suppression systems, and to use only equipment designed and tested for insect control. If you fumigate for bed bugs, you need the fumigation category as well. Check your state page and your state agency for specifics. This is not legal advice.",
      certifications: [
        {
          name: "State pesticide applicator licence (general structural category)",
          body: "Your state pesticide regulatory agency",
          what: "The licence that covers insecticide treatments for bed bugs in most states. Core plus category exam, with continuing education.",
          url: "http://npic.orst.edu/reg/state_agencies.html"
        },
        {
          name: "Associate Certified Entomologist (ACE)",
          body: "Entomological Society of America",
          what: "Voluntary credential showing broad entomology knowledge, for professionals with at least 5 years of US pest management experience and a licence allowing unsupervised structural application. Renew every 3 years with 18 CEUs.",
          url: "https://entocert.org/ace"
        },
        {
          name: "QualityPro (company accreditation)",
          body: "NPMA QualityPro",
          what: "Company accreditation covering hiring, background and motor vehicle record checks, insurance, safety, customer communications and employee training and testing.",
          url: "https://www.npmaqualitypro.org/faqs/"
        },
        {
          name: "Canine bed bug scent detection team certification",
          body: "Third-party certifiers, against NPMA's minimum standards",
          what: "NPMA's best management practices include minimum standards for certifying canine bed bug detection teams and say handlers should tell clients their team's certification status. Only relevant if you move into K9 detection.",
          url: "https://www.npmapestworld.org/media/rliieovg/npma-bed-bug-best-management-practices-2023_v2.pdf"
        }
      ]
    },
    skills: [
      "Thorough, patient inspection, because low-level infestations are easy to miss.",
      "Accurate identification of bed bugs and their life stages, and of look-alike insects.",
      "Calm, empathetic communication with people who are frightened, ashamed or exhausted.",
      "Clear instruction-giving, so clients prepare properly and cooperate.",
      "Understanding heat transfer and how insulation and air flow create cold spots.",
      "Discipline about not carrying bed bugs from site to site.",
      "Careful documentation of treatments, cooperation and results.",
      "Physical strength and good lifting technique for beds and furniture."
    ],
    tools: [
      "Flashlight or headlamp",
      "Hand lens or other magnifier",
      "Inspection mirror or phone camera",
      "Forceps and vials for specimen collection",
      "Screwdrivers, pliers, pry bar, multi-tool, crescent wrench and staple gun for opening furniture",
      "Passive and active bed bug monitoring devices, including interceptors",
      "Mattress and box spring encasements designed for bed bugs",
      "Vacuum",
      "Steamer",
      "Heaters and fans designed and tested for insect control",
      "Temperature sensors and monitors",
      "Containerized heat or freeze equipment",
      "Insecticide dusts, liquids and aerosols, with application equipment",
      "Personal protective equipment and a change of clothes"
    ],
    careerPath: [
      {
        stage: "General pest technician",
        description: "Most people learn the basics of inspection, labels and customer service on a general route first."
      },
      {
        stage: "Bed bug technician",
        description: "Joins a bed bug crew or takes on bed bug accounts after the advanced training NPMA recommends."
      },
      {
        stage: "Heat treatment lead",
        description: "Runs heat jobs: equipment setup, sensor placement, monitoring, fire and sprinkler precautions, and the client's re-entry."
      },
      {
        stage: "Bed bug specialist for commercial markets",
        description: "Handles multi-unit housing, hotels, healthcare or transport accounts, where surrounding-unit inspections and documentation matter most."
      },
      {
        stage: "K9 handler, manager or owner",
        description: "From here people move into K9 detection, management, or their own company. See the K9 detection and management pages."
      }
    ],
    pay: "BLS does not publish pay for bed bug work separately. It falls within pest control workers (SOC 37-2021): median annual wage $45,250 in May 2025 ($21.75 an hour), lowest 10 percent under $34,680, highest 10 percent over $61,890, and $44,930 in exterminating and pest control services. OEWS wages include commissions and production bonuses but not overtime premium, assume 2,080 hours a year, and exclude the self-employed. No official source opened for this guide shows how bed bug technicians are paid compared with general technicians. Ask employers whether heat jobs are paid hourly, by the job or with a bonus, and how long days are handled.",
    benefits: "No official benefit figures exist for bed bug work specifically. The nearest are BLS National Compensation Survey figures for March 2026 for private industry workers in service occupations: 47 percent had access to medical care benefits, 47 percent to retirement benefits, 67 percent to paid sick leave, 57 percent to paid vacation, 56 percent to paid holidays and 33 percent to life insurance. For all private industry workers, access was 71 percent for medical care and 72 percent for retirement, and full-time workers had far higher access to medical care (87 percent) than part-time workers (23 percent). These describe a broad group, not any one employer. Ask about health coverage, retirement, paid time off, and whether the company supplies work clothes or uniforms, a change of clothes for bad sites, and laundering, since NPMA recommends technicians change and heat-dry clothing after badly infested locations.",
    goodParts: [
      "You solve a problem that is causing people real distress, and you can see the difference when it is gone.",
      "The work is skilled. Inspection, heat management and resistance-aware chemical use reward expertise.",
      "Heat and other non-chemical methods mean the job is not only spraying.",
      "Experience leads to commercial accounts, K9 detection, management or ownership.",
      "Bed bugs are found in homes, hotels and transport worldwide, according to CDC, so the skill travels."
    ],
    hardParts: [
      "Clients are often in distress. Researchers have documented anxiety, insomnia, nightmares and worse in people with infestations.",
      "Hidden hazards: NPMA warns about sharps, firearms, soiled linens and pesticide residues from client treatments.",
      "Heat treatments are long, hot and physically heavy, and carry heat illness risk.",
      "Results depend on client cooperation, which you cannot control.",
      "You must guard constantly against carrying bed bugs to your truck, other clients or your own home.",
      "Insecticide resistance means simple spray-and-leave approaches fail."
    ],
    faq: [
      {
        q: "Do bed bugs spread disease?",
        a: "CDC says bed bugs are not known to spread diseases to people. Bites can cause itching, sleep loss and skin infections from scratching, and allergic reactions are possible though rare."
      },
      {
        q: "Will I bring bed bugs home?",
        a: "It is a real risk, which is why NPMA's guidelines tell technicians to minimize contact with infested items, inspect clothes and equipment before leaving, carry a change of clothes for bad sites, and dry clothing on high heat for 30 minutes afterward."
      },
      {
        q: "How hot does a heat treatment need to be?",
        a: "NPMA's guidelines, citing University of Minnesota research, list exposure times to kill all life stages at the harborage: 7 hours at 113°F, 90 minutes at 118°F, and under a minute at 122°F. EPA's IPM page says at least 120°F for 90 minutes to make sure eggs are killed. Sensors confirm the temperature where bed bugs actually hide, not just the air."
      },
      {
        q: "Why do bed bug jobs need follow-ups?",
        a: "NPMA says bed bugs and eggs may be missed in inaccessible places, treatments can fail because of resistance or technique, clients may not cooperate, and bed bugs can be reintroduced. Follow-ups confirm the problem is gone."
      },
      {
        q: "Do I need a special licence for bed bugs?",
        a: "Not in the five states this site covers. The work falls under the general structural licence. Fumigating for bed bugs needs the fumigation category."
      },
      {
        q: "Can I tell if a bite is from a bed bug?",
        a: "No. NPMA says it is not possible to tell from a skin reaction, and inspectors should not examine a person's body or give an opinion on a reaction. Only live bed bugs or viable eggs confirm activity."
      },
      {
        q: "Why are pesticides alone not enough?",
        a: "NPMA says insecticide resistance in bed bugs is widespread and varies between populations. Research summarized by Ohio State University documents resistance to pyrethroids and to several neonicotinoids. That is why combined chemical and non-chemical methods are recommended."
      },
      {
        q: "What do clients have to do?",
        a: "EPA's preparation guidance includes reducing clutter, removing cardboard boxes, moving the bed at least 6 inches from the wall, drying clothing and bedding on high heat for 30 minutes, using encasements and interceptors, and vacuuming. The technician's job includes explaining this clearly."
      }
    ],
    sources: [
      {
        label: "CDC: About Bed Bugs",
        url: "https://www.cdc.gov/bed-bugs/about/index.html"
      },
      {
        label: "US EPA: Controlling Bed Bugs Using Integrated Pest Management (IPM)",
        url: "https://www.epa.gov/bedbugs/controlling-bed-bugs-using-integrated-pest-management-ipm"
      },
      {
        label: "US EPA: Preparing for Treatment Against Bed Bugs",
        url: "https://www.epa.gov/bedbugs/preparing-treatment-against-bed-bugs"
      },
      {
        label: "NPMA: Bed Bug Best Management Practices, A Guide for Pest Management Professionals (2023)",
        url: "https://www.npmapestworld.org/media/rliieovg/npma-bed-bug-best-management-practices-2023_v2.pdf"
      },
      {
        label: "Ohio State University bed bug research: Insecticide resistance",
        url: "https://u.osu.edu/bedbugs/research/insecticide-resistance"
      },
      {
        label: "Burrows, Perron and Susser (2013), Suicide following an infestation of bed bugs, American Journal of Case Reports (PMC)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3700489"
      },
      {
        label: "US EPA pesticide label: Vikane gas fumigant, EPA Reg. No. 62719-4 (accepted 04/14/2014)",
        url: "https://www3.epa.gov/pesticides/chem_search/ppls/062719-00004-20140414.pdf"
      },
      {
        label: "BLS Occupational Outlook Handbook: Pest Control Workers",
        url: "https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm"
      },
      {
        label: "O*NET OnLine: Pest Control Workers (37-2021.00), summary and work context",
        url: "https://www.onetonline.org/link/summary/37-2021.00"
      },
      {
        label: "BLS OEWS frequently asked questions (what wages include, 2,080-hour annual basis)",
        url: "https://www.bls.gov/oes/oes_ques.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 2: Medical care benefits",
        url: "https://www.bls.gov/news.release/ebs2.t02.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 1: Retirement benefits",
        url: "https://www.bls.gov/news.release/ebs2.t01.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 6: Paid leave",
        url: "https://www.bls.gov/news.release/ebs2.t06.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 5: Life insurance benefits",
        url: "https://www.bls.gov/news.release/ebs2.t05.htm"
      },
      {
        label: "40 CFR 171.101: Commercial applicator certification categories (Cornell LII)",
        url: "https://www.law.cornell.edu/cfr/text/40/171.101"
      },
      {
        label: "ESA: ACE eligibility requirements",
        url: "https://entocert.org/ace/eligibility"
      },
      {
        label: "NPMA QualityPro: Frequently asked questions",
        url: "https://www.npmaqualitypro.org/faqs/"
      }
    ],
    notes: "1) Same NCS caveats as general-pest. 2) EPA's do-it-yourself bed bug page (opened) gave a heat figure of 130°F as summarized by the fetch tool, which conflicts with EPA's IPM page (120°F for 90 minutes) and NPMA Appendix B. I did not use the DIY figure and did not list that page. 3) The psychological-effects claim rests on a 2013 case report plus its literature review (PMC3700489). The often-quoted Goddard and de Shazo finding (81 percent of 135 online accounts reporting PTSD-type symptoms) appeared only in search snippets; I could not open the paper, so the 81 percent figure is NOT used. 4) The claim that no state among TX, FL, CA, SC, WA has a bed bug category is based on the category lists in this site's states.ts, not a fresh check of each agency. 5) Inference, not sourced: whether heat-only treatment without any pesticide requires a pesticide licence varies by state; I did not state an answer, only that fire codes apply (NPMA). 6) The Vikane label used is the 2014 EPA-accepted version; current labels (now marketed by a different registrant) may differ. 7) 'Heat treatments take a long block of time' is an inference from NPMA's requirement to raise and hold temperatures with sensors; no source gives a duration. 8) The OSU page summarizes published studies; the 93.5 percent L925I figure it quotes is for European populations, so it is not used for the US."
  },
  fumigation: {
    intro: "Fumigation is pest control with a gas. A fumigation crew seals a building, a chamber, a container or a commodity, introduces a fumigant that reaches every void and crevice, holds it for the required time, then airs out the space and proves with instruments that it is safe to re-enter. BLS describes fumigators as applicators who seal buildings and use gases to treat large-scale infestations. Structural fumigation with sulfuryl fluoride treats drywood termites, wood-boring beetles, bed bugs and other pests in whole buildings. Commodity fumigation with phosphine-releasing products protects stored grain and other products. The fumigants are highly hazardous. The Vikane label calls sulfuryl fluoride a highly hazardous material that must be used only by people trained in respiratory equipment, gas detection and emergency procedures, and NIOSH lists 200 ppm as immediately dangerous to life or health. Every state this site covers treats fumigation as its own category, often with extra prerequisites. The field suits experienced, disciplined applicators who follow procedure exactly, every time. It is not an entry-level job.",
    dayInTheLife: [
      "A structural fumigation starts well before the gas. The crew confirms the job details and the state notice. Florida, for example, requires the company to notify the state agency at least 24 hours before a general fumigation, naming the fumigant, the certified operator or fumigation ID cardholder in charge, the structure, the date, the target pest and the duration. The occupants must have left, with people, pets and desirable plants removed, and food, feed, drugs and medicines removed unless they are sealed as the label allows. The Vikane label also requires an adult occupant to receive the product's fact sheet. In apartments and townhouses, if one unit is fumigated, the label requires every unit in the structure to be vacated.",
      "Then the building is sealed. For a tarpaulin fumigation, the Vikane label calls for a highly resistant material such as vinyl-coated nylon or polyethylene sheeting at least 4 mil thick, sealed at the ground. O*NET lists positioning and fastening tarpaulin edges over the building and taping vents to make it airtight and check for leaks among the tasks of pest control workers. That means ladders, roof work and heavy tarps. Every exterior door gets a secondary lock or barricade so only the state licensed applicator in charge can get in, and warning placards go up showing the date, the fumigant and the applicator's name, address and phone number.",
      "Before releasing the fumigant, the crew calculates the dose for the volume and conditions, and introduces chloropicrin as a warning agent. The label says chloropicrin causes smarting of the eyes and tears and must be released inside at least 5 to 10 minutes before the fumigant. The fumigant itself is released from outside the structure. The label requires two trained people, at least one a state-licensed or certified applicator, to be present during introduction, during any re-entry before aeration, and at the start of the initial aeration whenever exposure exceeds 1 ppm. Anyone entering above 1 ppm wears a positive-pressure self-contained breathing apparatus.",
      "Aeration and clearance are where discipline matters most. Under one of the Vikane label's aeration procedures, the crew opens the structure and runs fans capable of moving a total of 5,000 cubic feet per minute for at least an hour, wearing respiratory protection, then secures the building for at least 6 hours from the first opening of the seal. Afterward the crew measures the concentration in the breathing zone of every room, where people stand, sit or lie down, with an approved clearance device. Only when every reading is 1 ppm or less may a certified applicator authorize removing the placards and re-occupying the building.",
      "Commodity fumigation follows the same logic in a different setting. USDA's grain fumigation handbook, which covers ships' holds, land carriers and river barges, describes the certified applicator inspecting holds for their ability to keep gas in, writing a signed statement on which holds are suitable, choosing the application method and dose, holding a pre-fumigation conference with the vessel's officer, placarding every entrance, and confirming carriers are gas free, which for metal phosphide is 0.3 ppm or less. Throughout, the paperwork is as important as the gas."
    ],
    duties: [
      "Inspect the structure or commodity and confirm the target pest and that fumigation is appropriate.",
      "Measure the space and calculate fumigant dosage and cost.",
      "File the advance notice of fumigation with the state agency where required.",
      "Give occupants the required fact sheet and preparation instructions, and confirm all people, pets and plants are out.",
      "Remove or properly seal food, feed, drugs and medicines.",
      "Prepare multi-unit and connected structures as the label requires, including vacating every unit.",
      "Install and seal tarpaulins or tape and seal the structure, and check for leaks.",
      "Secure all entrances with secondary locks or barricades.",
      "Post warning placards with the required information and keep them up until clearance.",
      "Introduce the warning agent and then the fumigant, from outside the structure, with the required crew present.",
      "Wear and maintain self-contained breathing apparatus and use gas detection devices.",
      "Monitor fumigant concentration during the exposure period.",
      "Run the label's aeration procedure, including fans and minimum waiting times.",
      "Clear the structure room by room with a calibrated clearance device before re-entry is authorized.",
      "Keep fumigation records and calibration records as the label and state require.",
      "Store fumigant cylinders upright, secured and locked in a posted storage area."
    ],
    workEnvironment: {
      schedule: "BLS does not publish hours for fumigators separately. For pest control workers overall, most are full time, evenings and weekends are common, and some work more than 40 hours. Structural fumigations run over more than one day because of exposure and aeration periods; the Vikane label requires at least 6 hours from the start of aeration before re-entry under its aeration procedures. Ask employers how crews are scheduled across tarping, introduction and clearance visits.",
      seasonality: "The Vikane label says not to fumigate for insect pests when the temperature at the site of pest activity is below 40°F, which limits some structural insect fumigations in cold conditions. No source opened for this guide gives figures on seasonal workload. Ask employers how the season runs in your region.",
      physical: "Tarping is heavy, at-height work. O*NET lists positioning and fastening tarpaulins over buildings and taping vents among the tasks of pest control workers, and BLS notes workers kneel, bend and crawl in tight spaces. Working in a self-contained breathing apparatus adds weight and effort.",
      hazards: "The fumigant is the main hazard. NIOSH lists sulfuryl fluoride with a recommended exposure limit of 5 ppm averaged over a work shift and a 10 ppm short-term limit, an OSHA limit of 5 ppm, and 200 ppm as immediately dangerous to life or health, with effects on the eyes, skin, respiratory system, central nervous system and kidneys. USDA's handbook notes aluminum phosphide is in the most toxic of EPA's four label toxicity categories, and in 2010 EPA prohibited all uses of aluminum and magnesium phosphide products around residential areas to reduce the risk of accidental poisonings, particularly of children. USDA's handbook notes phosphine is flammable above 1.79 percent in air. Falls from ladders and roofs during tarping are a further risk; OSHA calls falls among the most common causes of serious work-related injuries and deaths. The chloropicrin warning agent is a lachrymator that causes eye irritation and tears.",
      vehicleAndTravel: "Crews travel to the job with tarps, sandbags or seals, fans, cylinders, detection equipment and breathing apparatus. Fumigant cylinders must be stored upright and secured, according to the Vikane label. BLS says many pest control companies require a driver's licence and a good driving record, and transport of hazardous materials may bring additional requirements; ask employers what driving credentials they expect."
    },
    training: {
      entry: "Nobody starts as a fumigator. The usual route is experience as a licensed pest control technician or applicator first. The federal minimum age for certified applicators is 18, and California's structural pest law sets 18 as the minimum age to apply for a field representative licence. BLS says many companies require a driver's licence and a good driving record. Expect employers to check background and driving record; QualityPro-accredited companies must.",
      onTheJob: "Fumigation training is formal and specific. The Vikane label requires application personnel to take part in the registrant's sulfuryl fluoride training and stewardship plan, and Florida's rules, as summarized by UF/IFAS, require residential fumigation employees to complete stewardship training annually. In Florida, an unlicensed employee who will serve as the secondary person on a fumigation must get a Fumigation Identification Card endorsement after training from the certified operator in charge in basic fumigation procedures, use of self-contained breathing apparatus, fumigant safety equipment and immediate reporting of irregularities. To serve as the primary person, they must also pass the Special ID cardholder exam in fumigation and still work under the certified operator's direct supervision. Expect months of crew work before you are trusted to lead a job.",
      licensing: "Fumigation is its own licence category everywhere this site covers, and the federal certification standards in 40 CFR Part 171 include a separate non-soil fumigation category for applicators using restricted use fumigants on anything other than soil. EPA's 2017 revision of those standards added specialized certification for fumigation. States add prerequisites. Texas requires certified applicators testing in structural fumigation to submit 40 hours of training for prequalification before scheduling the exam, and splits Structural Fumigation from Commodity Fumigation. California's Structural Pest Control Board will not accept a Branch 1 (fumigation) field representative application without proof of six months' training and experience fumigating under the immediate supervision of a licensed fumigator, or the equivalent, and California's applicator licence covers only Branches 2 and 3, not fumigation. Florida has a Fumigation category and its ID card endorsements. South Carolina lists 7B Structural Fumigation. Check this site's state pages and your state agency for specifics. This is not legal advice.",
      certifications: [
        {
          name: "State fumigation licence category",
          body: "Your state pesticide regulatory agency",
          what: "The category that allows you to perform or supervise fumigations. Often has prerequisites such as Texas's 40 hours of training or California's six months of supervised experience.",
          url: "http://npic.orst.edu/reg/state_agencies.html"
        },
        {
          name: "Sulfuryl fluoride training and stewardship",
          body: "The fumigant registrant, as required by the product label",
          what: "Label-required training for application personnel using sulfuryl fluoride structural fumigants. Florida requires residential fumigation employees to complete it annually.",
          url: "https://www3.epa.gov/pesticides/chem_search/ppls/062719-00004-20140414.pdf"
        },
        {
          name: "Florida Fumigation ID card endorsement and Special ID cardholder (fumigation)",
          body: "Florida Department of Agriculture and Consumer Services",
          what: "Florida credentials that let trained unlicensed employees act as the secondary or, after an exam, the primary person on a fumigation under a certified operator.",
          url: "https://ask.ifas.ufl.edu/publication/PI293/pdf"
        },
        {
          name: "Associate Certified Entomologist (ACE)",
          body: "Entomological Society of America",
          what: "Voluntary credential for experienced professionals with at least 5 years of US pest management experience. Not fumigation-specific.",
          url: "https://entocert.org/ace"
        }
      ]
    },
    skills: [
      "Absolute procedural discipline: following the label and the checklist in order, every time.",
      "Math for volume, dosage and fan capacity calculations.",
      "Competence with self-contained breathing apparatus.",
      "Using and calibrating gas detection and clearance devices.",
      "Reading buildings for leaks, connected spaces and shared plumbing or ducts.",
      "Clear communication with occupants, neighbours and crew.",
      "Teamwork, since key steps legally require two trained people.",
      "Recordkeeping for notices, calibrations and clearances.",
      "Comfort and safety at height on ladders and roofs."
    ],
    tools: [
      "Tarpaulins of vinyl-coated nylon or polyethylene at least 4 mil thick",
      "Sealing tape, clamps and sand or water snakes to seal tarps to the ground",
      "Fumigant cylinders, scales and introduction lines",
      "Chloropicrin evaporation containers and wicking material",
      "Fans for distribution and aeration",
      "Positive-pressure self-contained breathing apparatus",
      "Approved clearance devices such as INTERSCAN, MIRAN SapphIRe or Spectros ExplorIR analyzers",
      "Gas monitoring equipment for concentration during exposure",
      "Secondary locks and barricades for exterior doors",
      "Warning placards",
      "Ladders",
      "Measuring tools for calculating volume",
      "Personal protective equipment"
    ],
    careerPath: [
      {
        stage: "Licensed technician in another category",
        description: "Fumigators come from experienced pest control work, often general pest or termite."
      },
      {
        stage: "Fumigation crew member",
        description: "Works on tarping, sealing and aeration under a licensed fumigator. In Florida this can mean a Fumigation ID card endorsement as the secondary person."
      },
      {
        stage: "Licensed fumigator",
        description: "Passes the state fumigation category after meeting prerequisites such as Texas's 40 hours or California's six months of supervised fumigation experience, and can lead jobs."
      },
      {
        stage: "Fumigation supervisor or certified operator in charge",
        description: "Responsible for crews, notices, equipment, calibration and compliance. Often the person a company's fumigation work depends on."
      },
      {
        stage: "Commercial, commodity or management roles",
        description: "Some move into commodity and food-industry fumigation, commercial and food safety work, management or ownership."
      }
    ],
    pay: "BLS does not publish pay for fumigators separately. It counts them within pest control workers (SOC 37-2021), whose median annual wage was $45,250 in May 2025 ($21.75 an hour), with the lowest 10 percent under $34,680 and the highest 10 percent over $61,890, and a median of $44,930 in exterminating and pest control services. Those figures include commissions and production bonuses but not overtime premium, assume 2,080 hours, and exclude the self-employed. No official source opened for this guide shows fumigation pay compared with other pest work. Ask employers how fumigation crews are paid, whether there is a premium for licensed fumigators, and how multi-day jobs and call-outs are handled.",
    benefits: "No official benefit figures exist for fumigation specifically. The nearest are BLS National Compensation Survey figures for March 2026 for private industry workers in service occupations: 47 percent had access to medical care benefits, 47 percent to retirement benefits, 67 percent to paid sick leave, 57 percent to paid vacation, 56 percent to paid holidays and 33 percent to life insurance. For all private industry workers, access was 71 percent for medical care and 72 percent for retirement, and 87 percent of full-time private workers had access to medical care against 23 percent of part-time workers. These describe a broad group, not any one employer. Ask employers about health coverage, retirement, paid time off, whether they pay for fumigation category training and exams and for annual stewardship training, and how breathing apparatus is fitted and maintained.",
    goodParts: [
      "It is skilled, specialist work that few people are qualified to do.",
      "A fumigation reaches pests that local treatments cannot, such as widespread drywood termite infestations.",
      "Clear procedures and measurable clearance standards mean you know when a job is done right.",
      "Crew work, rather than working alone all day.",
      "Experience leads to commodity and food-industry work, supervision and management."
    ],
    hardParts: [
      "The fumigants can kill. There is no margin for shortcuts.",
      "Tarping means heavy lifting, ladders and roof work.",
      "Working in breathing apparatus is tiring.",
      "Multi-day jobs, return visits for clearance, and advance notice rules make schedules rigid.",
      "Prerequisites mean years of other pest work before you can lead a fumigation.",
      "Records, notices and calibrations are checked, and mistakes have legal consequences."
    ],
    faq: [
      {
        q: "Can I start in fumigation?",
        a: "Not realistically. States require experience or training first: Texas requires 40 hours of training before the structural fumigation exam, and California requires six months of supervised fumigation experience for a Branch 1 field representative application. Most fumigators come from other pest control work."
      },
      {
        q: "What fumigants are used?",
        a: "Sulfuryl fluoride is used for structures and household goods; the Vikane label lists pests including drywood termites, wood-boring beetles, bed bugs, cockroaches and rodents. Aluminum and magnesium phosphide, which release phosphine, are used mainly for stored grain and other commodities, and EPA prohibits their use around residential areas."
      },
      {
        q: "When is a building safe to re-enter?",
        a: "Under the Vikane label, when an approved, calibrated clearance device shows 1 ppm or less in the breathing zone of every room, and a certified applicator authorizes removal of the placards."
      },
      {
        q: "Why are two people required?",
        a: "The Vikane label requires two trained people, at least one licensed or certified by the state, during introduction, re-entry before aeration and the start of initial aeration when exposure exceeds 1 ppm, so someone can help if something goes wrong."
      },
      {
        q: "Do I need to wear a breathing apparatus?",
        a: "Yes, whenever you enter an area above 1 ppm sulfuryl fluoride, the label requires a positive-pressure self-contained breathing apparatus. You need training in how to use it."
      },
      {
        q: "What is the warning agent?",
        a: "Chloropicrin. It causes eye irritation and tears at very low concentrations, so anyone who enters by mistake knows to leave. The label requires it to be released inside before the fumigant."
      },
      {
        q: "Is fumigation a separate licence?",
        a: "Yes, in every state this site covers, and the federal standards include a non-soil fumigation category. Check your state's prerequisites."
      },
      {
        q: "What about fumigating apartments?",
        a: "If one unit in a multi-unit building is fumigated, the Vikane label requires every unit in the structure to be vacated and treated as a fumigated structure, with notices, securing and clearance for each."
      }
    ],
    sources: [
      {
        label: "US EPA pesticide label: Vikane gas fumigant, EPA Reg. No. 62719-4 (accepted 04/14/2014)",
        url: "https://www3.epa.gov/pesticides/chem_search/ppls/062719-00004-20140414.pdf"
      },
      {
        label: "NIOSH Pocket Guide to Chemical Hazards: Sulfuryl fluoride",
        url: "https://www.cdc.gov/niosh/npg/npgd0581.html"
      },
      {
        label: "US EPA news release (April 7, 2010): restrictions on aluminum and magnesium phosphide fumigants",
        url: "https://www.epa.gov/archive/epapages/newsroom_archive/newsreleases/930a525cd534e290852576fe00580df9.html"
      },
      {
        label: "USDA AMS Federal Grain Inspection Service: Fumigation Handbook (October 2023)",
        url: "https://www.ams.usda.gov/sites/default/files/media/FumigationHB.pdf"
      },
      {
        label: "Fla. Admin. Code R. 5E-14.110: Fumigation Requirements, Notices (Cornell LII)",
        url: "https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-5E-14-110"
      },
      {
        label: "Texas Department of Agriculture SPCS: Certified Applicator Licensing",
        url: "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Licensing/SPCS-Certified-Applicator-Licensing"
      },
      {
        label: "California Structural Pest Control Act (Business and Professions Code), SPCB",
        url: "https://www.pestboard.ca.gov/pestlaw/pestact.pdf"
      },
      {
        label: "UF/IFAS Extension PI293: Florida Rules for Direct Supervision of Unlicensed Pesticide Applicators",
        url: "https://ask.ifas.ufl.edu/publication/PI293/pdf"
      },
      {
        label: "40 CFR 171.101: Commercial applicator certification categories (Cornell LII)",
        url: "https://www.law.cornell.edu/cfr/text/40/171.101"
      },
      {
        label: "US EPA: Revised Certification Standards for Pesticide Applicators",
        url: "https://www.epa.gov/pesticide-worker-safety/revised-certification-standards-pesticide-applicators"
      },
      {
        label: "BLS Occupational Outlook Handbook: Pest Control Workers",
        url: "https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm"
      },
      {
        label: "O*NET OnLine: Pest Control Workers (37-2021.00), task statements and tools",
        url: "https://www.onetonline.org/link/details/37-2021.00"
      },
      {
        label: "BLS OEWS frequently asked questions (what wages include, 2,080-hour annual basis)",
        url: "https://www.bls.gov/oes/oes_ques.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 2: Medical care benefits",
        url: "https://www.bls.gov/news.release/ebs2.t02.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 1: Retirement benefits",
        url: "https://www.bls.gov/news.release/ebs2.t01.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 6: Paid leave",
        url: "https://www.bls.gov/news.release/ebs2.t06.htm"
      },
      {
        label: "BLS National Compensation Survey, Employee Benefits, March 2026, Table 5: Life insurance benefits",
        url: "https://www.bls.gov/news.release/ebs2.t05.htm"
      },
      {
        label: "OSHA: Fall Protection",
        url: "https://www.osha.gov/fall-protection"
      },
      {
        label: "ESA: ACE eligibility requirements",
        url: "https://entocert.org/ace/eligibility"
      }
    ],
    notes: "1) Same NCS caveats as general-pest. 2) The Vikane label used is the EPA-accepted 2014 master label (Dow AgroSciences as registrant at the time). Current labels may differ in detail (aeration steps, clearance devices, stewardship provider); re-check the current label in EPA's PPLS before publishing label-specific numbers. 3) 'Every state treats fumigation as its own category' in the intro is based on the five states on the site (TX SF/CF, FL FUM, CA Branch 1, SC 7B; WA's categories were not reproduced in states.ts) plus the federal non-soil fumigation category. I softened licensing text to 'everywhere this site covers'; consider editing the intro sentence to match if the WA category list is not confirmed. 4) The 2010 phosphide incident is referenced without names, per brief. Details of the specific case came from news and trade summaries and are not used beyond EPA's own release, which says the action followed accidental poisonings, particularly of children. Hazards text now follows the EPA release wording (reduce accidental poisonings, particularly of children) rather than describing the incident. 5) Phosphine flammability (1.79 percent) and the 0.3 ppm gas-free threshold come from the USDA AMS handbook, which is written for grain inspection personnel. 6) California: Business and Professions Code 8564(c) for Branch 1 experience; 8564.5 shows the applicator licence covers Branches 2 and 3 only. A search snippet mentioned a 100-hour Branch 1 figure; I did not see it in the Act text I read, so it is not used. 7) Chloropicrin '5 to 10 minutes' timing comes from the 2014 label text; the extracted PDF text was OCR-garbled around that line, so verify against the current label. 8) The TX 40-hour requirement is on the TDA certified applicator page; disciplines.ts already states it, now confirmed. 9) No source opened gives hazmat driving credential requirements for fumigation crews; phrased as 'ask employers'."
  },
  "commercial-food-safety": {
    intro: "Commercial and food safety pest work means running pest programmes inside places that get audited: food plants, warehouses, distribution centres, and restaurants. The pest biology is the same as on a residential route. What changes is the paper. A food plant certified to a scheme such as SQF has to keep a documented pest programme with a site map of every device, records of every inspection and application, and trend reports that show whether the programme is working. The technician who services that account produces most of that evidence. Federal food law sits underneath it: FDA's rules for food facilities say pests must not be allowed in any area of a food plant, and pesticides may only be used with precautions that protect food and packaging. This lane suits people who are careful, like routine, and do not mind writing things down properly every single visit. It also suits people who want a route that runs on fixed service frequencies instead of the phone ringing. If you hate paperwork, or you want to work alone without anyone checking your work, this is the wrong lane.",
    dayInTheLife: [
      "A food plant visit starts at the front office, not the truck. The SQF Food Manufacturing Code says pest contractors must report to a responsible authorised person when they enter the premises and again after they finish. Before you go onto the production floor you follow the plant's good manufacturing practices. FDA's rule for food facilities lists what those usually look like: suitable outer garments, hand washing before work, removing unsecured jewellery, and hair and beard restraints where appropriate. Many plants also keep a pest sighting log for their own staff. Under the AIB International Consolidated Standards, that log records the date, time, pest type, location, action taken and who reported it, and you read it before you start so you know where to look.",
      "Most of the visit is a device route. Outside, you check tamper-resistant rodent stations that are anchored, locked and labelled. Where no facility assessment sets the spacing, the AIB standards place exterior stations every 50 to 100 feet and inspect them at least monthly. Inside, the AIB standards say toxic bait is not used for routine monitoring, so interior devices are mechanical traps, glue boards and similar devices placed along perimeter walls, on both sides of exterior doors and in sensitive areas such as receiving, staging and finished goods, checked at least weekly unless the programme justifies otherwise. Insect light traps get emptied, cleaned and checked, and you record what kind of insects they caught and roughly how many. In plants that handle grain, cereals, spices or herbs you may also check pheromone traps for stored product insects.",
      "Every device you touch gets a record. If you apply a pesticide, the AIB standards expect the record to show the product name, the EPA registration number, the target pest, the rate or concentration, the exact location, the method, the amount used, the date and time, and your printed name and signature. The SQF code requires the contractor to leave a written report of findings, inspections and treatments. In practice the record is the product the client is paying for, because the record is what the plant shows its auditor.",
      "On a regular cycle someone has to step back and read the records as a whole. The SQF code requires the site to record pest sightings and trend the frequency of activity so applications are targeted, and to measure whether the programme is working. The AIB standards call for pest management personnel to review sightings and activity at least quarterly and send a report of findings to the facility, plus a documented assessment of the whole facility at least once a year by trained IPM personnel, using at least 12 months of history. Depending on the company, that trend report and annual assessment is written by the route technician, a commercial specialist, or a technical manager.",
      "Audit time is when the work is graded. An auditor will walk the map against the wall to see whether every device on paper exists and every device on the wall is on paper. They will ask for specimen labels for every pesticide used, a copy of each technician's state certification or registration, the pest company's licence, the certificate of insurance and the written scope of service. Under the AIB scoring system, integrated pest management is one of five scored categories, and a facility does not receive AIB recognition if any category scores 135 or lower or if there is any unsatisfactory finding.",
      "Restaurants and other retail food businesses run on a different rulebook. FDA's Food Code is a model code that states and local health departments adopt, and it requires the premises to be kept free of pests through routine inspection of deliveries and premises, control methods, and removal of harbourage. It also says rodent bait must be in a covered, tamper-resistant bait station, tracking powder pesticides may not be used in a food establishment, and restricted use pesticides may only be applied by a certified applicator or someone under their direct supervision. A restaurant route is faster and less document-heavy than a food plant, but the health inspector reads your work the same way an auditor does."
    ],
    duties: [
      "Check in with the site's designated contact at the start and end of every service, as the SQF code requires of pest contractors.",
      "Follow the plant's good manufacturing practices: protective garments, hair and beard restraints, jewellery removal and hand washing.",
      "Read the facility's pest sighting log before starting and respond to each entry.",
      "Inspect and service exterior rodent stations, making sure each one is anchored, locked, labelled and contains only bait approved for that use.",
      "Inspect and service interior mechanical traps, glue boards and other non-toxic monitoring devices at the frequency the programme sets.",
      "Empty, clean and check insect light traps, and record insect types and approximate counts.",
      "Service pheromone monitors for stored product insects where the products call for them.",
      "Keep the device site map accurate: add, remove and map temporary devices, and account for any device that is pulled.",
      "Record every pesticide application with product, EPA registration number, target pest, rate, location, method, amount, date, time and applicator signature.",
      "Leave a written service report of findings, inspections and treatments for the site.",
      "Identify and report conditions that let pests in or let them live: gaps, harbourage, burrows, debris, poor sanitation.",
      "Review activity trends at least quarterly and help write recommendations for corrective action.",
      "Support the annual facility assessment using at least 12 months of records.",
      "Keep the documentation an auditor will ask for current: specimen labels, applicator credentials, company licence, insurance certificate and scope of service.",
      "In restaurants, use only tamper-resistant bait stations, never tracking powder pesticides, and follow label directions that allow use in a food establishment."
    ],
    workEnvironment: {
      schedule: "BLS says most pest control workers work full time, that evenings and weekends are common, and that some work more than 40 hours a week. Commercial service runs to the frequencies written into each account's scope of service, which the AIB standards say should state how often service happens. When you can service an area depends on the account, so ask any employer which shifts and days the commercial route actually runs.",
      seasonality: "Less seasonal than residential work, because contracts set the service frequency all year. Flying insect pressure still swings: in the absence of a risk assessment, the AIB standards have light traps checked weekly in the active season and monthly in colder seasons.",
      physical: "A lot of walking through large buildings, plus standing, bending, kneeling and crawling to reach devices, which BLS lists as normal for pest control workers. Some devices and light traps are reached by ladder, and OSHA's ladder standard applies to every ladder an employer has you use. Temperatures range from coolers and freezers to hot warehouses and outdoor perimeters in any weather.",
      hazards: "Pesticide exposure is the obvious one, which is why application and storage rules are tight in food plants: the AIB standards require pesticides stored on site to be locked, labelled, inventoried and kept with spill materials. Food plants add their own hazards: moving forklifts, production machinery and noise. OSHA's lockout/tagout standard covers servicing and maintenance of machines that could start up unexpectedly, so never reach into or behind equipment to get at a device; tell the plant contact and let their people make it safe. OSHA's noise standard requires protection where sound levels exceed its limits, so wear the hearing protection the plant requires.",
      vehicleAndTravel: "You drive between accounts. BLS notes that many pest control companies require a driver's licence and a good driving record. Commercial routes can cover a wide area, because food plants and warehouses cluster in industrial zones rather than neighbourhoods. Carrying pesticides in a work vehicle has its own rules; see the vehicles and hazmat page in the owner section of this site."
    },
    training: {
      entry: "BLS says pest control workers typically need a high school diploma or equivalent and learn on the job, and that many employers want a driver's licence and a good driving record. EPA sets 18 as the federal minimum age for anyone seeking certification as a pesticide applicator. Companies accredited by QualityPro, the credentialing programme endorsed by the National Pest Management Association, commit to criminal background checks where appropriate and allowed by law, motor vehicle record checks where appropriate, and a drug-free workplace policy, so expect those at many larger employers. Food plants themselves may require documented GMP training before you work on their floor; the AIB standards list it as a requirement for anyone providing pest services in the facility.",
      onTheJob: "BLS says most pest control workers start as technicians, receive on-the-job training that can usually be completed in less than three months, and complete general training in pesticide use and safety. Commercial food work is usually something you move into after you can already run a route, because the inspection and documentation standards are higher. At companies that hold the QualityPro Food Safety certification, every employee who performs or sells pest service in food processing and handling facilities must pass a QualityPro exam on pest management in those facilities, covering food safety, prevention, best management practices, pests, inspection, traps and pesticides. Ask any employer how long you will ride with a senior commercial technician before you take accounts alone.",
      licensing: "There is no separate food safety pest licence. You need the same state pesticide licence or registration as any other structural technician, and the food plant will keep a copy of it on file: the SQF code requires pest contractors to be licensed and approved by the relevant authority, and the AIB standards require the facility to keep each technician's certification or registration document, the company's licence and, where regulation requires it, evidence that unlicensed staff are supervised by a licensed applicator. The general pattern across states follows EPA's certification rule: commercial applicators prove competency by exam, usually a core exam plus one or more category exams, restricted use pesticides may only be used by a certified applicator or a trained person under their direct supervision, and certification must be renewed at least every five years, usually through continuing education. Categories, exam rules and CEU hours differ by state. Check your state's page under Licensing in the Academy section of this site, and check with your state pesticide agency. This is general information, not legal advice.",
      certifications: [
        {
          name: "QualityPro Food Safety",
          body: "QualityPro (endorsed by the National Pest Management Association)",
          what: "A company-level certification. The company must already be QualityPro accredited, and every employee who performs or sells pest service in food processing and handling facilities must pass the QualityPro food facility exam.",
          url: "https://www.npmaqualitypro.org/available-credentials/qualitypro-food-safety/"
        },
        {
          name: "Associate Certified Entomologist (ACE)",
          body: "Entomological Society of America Certification Corporation",
          what: "An individual credential for working pest professionals. Requires at least five years of verifiable pest management experience, a current US pesticide applicator licence and a passing score on a structural pest knowledge exam. The certifying body advises at least 40 hours of preparation.",
          url: "https://entocert.org/ace"
        },
        {
          name: "Preventive Controls for Human Food (PCQI course)",
          body: "Food Safety Preventive Controls Alliance (FSPCA)",
          what: "A 2.5-day course using the FDA-recognised standardised curriculum on how food plants build food safety plans under FSMA. Not required of pest technicians, but it teaches the system your client is working inside, and it is one way plant staff qualify as a preventive controls qualified individual.",
          url: "https://www.fspca.net/"
        },
        {
          name: "Board Certified Entomologist (BCE)",
          body: "Entomological Society of America Certification Corporation",
          what: "For people with a biology or life science degree that includes entomology coursework, plus one to three years of relevant experience depending on degree level. Common among technical leads on large commercial accounts.",
          url: "https://entocert.org/bce/eligibility"
        }
      ]
    },
    skills: [
      "Accurate, complete record keeping on every visit, with no gaps or shortcuts",
      "Pest identification, including stored product insects and the flies and moths found in light traps",
      "Reading a site map and keeping it matched to what is on the wall",
      "Spotting structural and sanitation conditions that let pests in or let them live",
      "Following another organisation's rules (GMPs, sign-in, restricted areas) without being reminded",
      "Turning months of device counts into a short, clear trend report",
      "Explaining findings to plant QA staff and managers in plain language",
      "Label reading, especially which products may be used in a food establishment and where",
      "Staying calm and organised when an auditor is asking questions"
    ],
    tools: [
      "Tamper-resistant exterior rodent bait stations, with locks or single-use ties",
      "Interior mechanical rodent traps, including multi-catch and extended trigger traps",
      "Glue boards",
      "Remotely monitored traps that send alerts, at accounts that use them",
      "Insect light traps, with shatter-resistant lamps in production and raw material areas",
      "Pheromone traps for stored product insects",
      "Facility site map with numbered devices",
      "Service records system, on paper or electronic",
      "Specimen labels and Safety Data Sheets for every product used",
      "Flashlight and inspection mirror",
      "Hand sprayer, duster and bait applicators for products labelled for food facility use",
      "Ladder suited to reaching high devices",
      "Personal protective equipment required by the product label and by the plant",
      "Plant-required GMP gear: hair and beard restraints, clean outer garments"
    ],
    careerPath: [
      {
        stage: "General pest technician",
        description: "Get licensed or registered, learn identification and label reading, and learn to run a route. BLS says initial training usually takes less than three months."
      },
      {
        stage: "Commercial route technician",
        description: "Take on restaurants, offices and light commercial accounts where documentation matters and the health inspector reads your records."
      },
      {
        stage: "Food plant specialist",
        description: "Service audited facilities. At QualityPro Food Safety companies, this is where you pass the food facility exam. You learn device programmes, trend reporting and audit preparation."
      },
      {
        stage: "Commercial technical lead or account manager",
        description: "Write annual facility assessments and trend reports, train other technicians and handle audit findings. Many people at this stage add the ACE credential once they have five years of experience."
      },
      {
        stage: "Next moves",
        description: "From here people move into auditing and quality assurance, into fumigation (commodity work is common in food), into branch or technical management, or into owning a commercial-focused company. See the auditor, fumigation, management and ownership guides."
      }
    ],
    pay: "BLS does not track commercial or food safety pest technicians separately. They are counted as pest control workers (SOC 37-2021), and O*NET lists Commercial Pest Control Technician among that occupation's reported job titles. For May 2025, BLS reports a national median of $45,250 a year ($21.75 an hour) for pest control workers, with the lowest 10 percent earning under $34,680 and the highest 10 percent over $61,890. Inside the exterminating and pest control services industry the median was $44,930. These figures exclude self-employed workers, and the annual numbers assume 2,080 hours, so they do not show overtime, commission or bonus pay. There is no national data showing whether commercial technicians earn more or less than residential ones, so ask employers directly how commercial routes are paid. See the pay pages on this site for the full BLS baseline.",
    benefits: "BLS's National Compensation Survey groups pest control workers with building and grounds cleaning and maintenance under service occupations. In March 2026, among private industry workers in service occupations, 47 percent had access to employer medical care benefits, 47 percent to a retirement plan, 67 percent to paid sick leave, 57 percent to paid vacation and 56 percent to paid holidays. Size matters too: at private establishments with 1 to 49 workers, 55 percent had access to medical care and 55 percent to retirement benefits. These are averages across many occupations, not pest-specific numbers. Ask each employer whether they provide a company vehicle, uniforms and plant-required gear, and whether they pay for licensing, exam fees, continuing education and credentials such as ACE.",
    goodParts: [
      "Routes run on fixed contract frequencies, so the work is steadier and more predictable than residential call-in work.",
      "Your skill is visible. A clean audit with no pest findings is a result you can point to.",
      "You learn how food plants and food safety systems work, which opens doors into auditing and quality assurance.",
      "Less pesticide spraying and more inspection, monitoring and prevention, because the standards push programmes that way.",
      "A clear path to technical roles for people who are good at records and analysis."
    ],
    hardParts: [
      "Paperwork never stops. A missed record is a finding against your client, even if the pest work was perfect.",
      "You work under someone else's rules: sign-in, GMP gear, restricted areas and production schedules.",
      "Audits are stressful, and a bad one can cost your company the account.",
      "Large facilities mean long walks, high devices and every kind of temperature.",
      "You often find problems, such as sanitation or structural gaps, that only the client can fix, and you have to keep pushing them to fix it."
    ],
    faq: [
      {
        q: "Do I need a special licence to service food plants?",
        a: "No separate food licence exists. You need your state pesticide licence or registration in the right category. The plant will keep a copy of it, and of your company licence, on file for its auditor."
      },
      {
        q: "What is the difference between SQF, BRCGS and AIB?",
        a: "SQF and BRCGS are food safety certification schemes recognised by the Global Food Safety Initiative (GFSI). Each sets requirements a certified site must meet, including a pest programme. AIB International publishes Consolidated Standards for Inspection; an AIB recognition document is valid for one year and AIB says it is not a certificate of compliance."
      },
      {
        q: "Why is there no poison bait inside the plant?",
        a: "The AIB standards say toxic bait is not used for routine interior monitoring. Interior devices are mechanical traps, glue boards and similar devices, so a rodent is caught where it can be found and removed."
      },
      {
        q: "How often do I service the devices?",
        a: "The scope of service and the facility assessment set it. Where no assessment exists, the AIB standards default to at least monthly for exterior rodent stations, at least weekly for interior rodent devices, and weekly light trap checks in the active season."
      },
      {
        q: "What does an auditor actually look at in the pest programme?",
        a: "The site map against the devices on the wall, service and application records, trend reports, specimen labels, technician credentials, the company licence, the insurance certificate, the scope of service, and live evidence of pests during the walk."
      },
      {
        q: "Is restaurant work the same as food plant work?",
        a: "The goals are the same, the rules differ. Restaurants follow the FDA Food Code as adopted by your state or local health department: covered tamper-resistant bait stations, no tracking powder pesticides, and only products whose labels allow use in a food establishment."
      },
      {
        q: "Should I take the FSPCA PCQI course?",
        a: "It is not required of pest technicians. It is a 2.5-day course on how plants build FSMA food safety plans. People heading toward auditing or quality assurance often find it useful because it is the system their clients work inside."
      },
      {
        q: "Does commercial work pay more?",
        a: "There is no national data that splits commercial from residential technicians. BLS counts both as pest control workers. Ask employers how commercial routes are paid and whether food facility credentials come with a raise."
      }
    ],
    sources: [
      {
        label: "eCFR: 21 CFR 117.35, Sanitary operations (pest control)",
        url: "https://www.ecfr.gov/current/title-21/section-117.35"
      },
      {
        label: "eCFR: 21 CFR 117.10, Personnel",
        url: "https://www.ecfr.gov/current/title-21/section-117.10"
      },
      {
        label: "FDA Food Code 2022",
        url: "https://www.fda.gov/food/fda-food-code/food-code-2022"
      },
      {
        label: "SQF Food Safety Code: Food Manufacturing, Edition 9 (11.2.4 Pest Prevention)",
        url: "https://www.sqfi.com/docs/sqfilibraries/code-documents/edition-9/code-pdfs/20227fmin_foodmanufacturing_v3-2-final-w-links.pdf?sfvrsn=7f70c75a_8"
      },
      {
        label: "AIB International Consolidated Standards for Inspection: Prerequisite and Food Safety Programs (2022), copy hosted by AFDO",
        url: "https://afdo.org/wp-content/uploads/2024/01/23food.pdf"
      },
      {
        label: "GFSI: Recognised certification programme owners",
        url: "https://mygfsi.com/how-to-implement/recognition/certification-programme-owners/"
      },
      {
        label: "QualityPro Food Safety",
        url: "https://www.npmaqualitypro.org/available-credentials/qualitypro-food-safety/"
      },
      {
        label: "QualityPro Accreditation",
        url: "https://www.npmaqualitypro.org/available-credentials/qualitypro/"
      },
      {
        label: "ESA Certification: Associate Certified Entomologist",
        url: "https://entocert.org/ace"
      },
      {
        label: "ESA Certification: BCE eligibility",
        url: "https://entocert.org/bce/eligibility"
      },
      {
        label: "FSPCA (Food Safety Preventive Controls Alliance)",
        url: "https://www.fspca.net/"
      },
      {
        label: "Ohio State University: FSPCA Preventive Controls for Human Food training",
        url: "https://foodindustries.osu.edu/events/fspca-preventive-controls-human-food-training-7"
      },
      {
        label: "EPA: Certification Standards for Pesticide Applicators",
        url: "https://www.epa.gov/pesticide-worker-safety/certification-standards-pesticide-applicators"
      },
      {
        label: "BLS Occupational Outlook Handbook: Pest Control Workers",
        url: "https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm"
      },
      {
        label: "O*NET OnLine: 37-2021.00 Pest Control Workers",
        url: "https://www.onetonline.org/link/details/37-2021.00"
      },
      {
        label: "BLS National Compensation Survey: Medical care benefits, March 2026 (Table 2)",
        url: "https://www.bls.gov/news.release/ebs2.t02.htm"
      },
      {
        label: "BLS National Compensation Survey: Retirement benefits, March 2026 (Table 1)",
        url: "https://www.bls.gov/news.release/ebs2.t01.htm"
      },
      {
        label: "BLS National Compensation Survey: Paid leave, March 2026 (Table 6)",
        url: "https://www.bls.gov/news.release/ebs2.t06.htm"
      },
      {
        label: "eCFR: 29 CFR 1910.147, Control of hazardous energy (lockout/tagout)",
        url: "https://www.ecfr.gov/current/title-29/section-1910.147"
      },
      {
        label: "eCFR: 29 CFR 1910.23, Ladders",
        url: "https://www.ecfr.gov/current/title-29/section-1910.23"
      }
    ],
    notes: "BRCGS Issue 9 requirement text (section 4.14 Pest management) could not be read: the standard is sold, and the free interpretation guideline sample only shows the table of contents entry. Search results summarising 4.14 came from vendor and consultancy blogs and were NOT used. So BRCGS is mentioned only as a GFSI-recognised scheme with a pest section, not quoted. BRCGS says Issue 10 consultation closed 15 February 2026; re-check when Issue 10 publishes. The AIB 2022 Consolidated Standards PDF was read from a copy hosted on afdo.org, not aibinternational.com; confirm it is still the current edition. All device spacings and frequencies quoted are AIB defaults that apply only 'in the absence of an assessment'; the copy says so. The 'pays accordingly' line in disciplines.ts for this field is NOT supported by any national data I found; the guide says there is no split. Night or off-shift servicing of food plants is common lore but I found no primary source, so the schedule text tells readers to ask. NCS benefit figures: pest control workers sit in SOC major group 37, which NCS reports inside 'service occupations'; that mapping is my reading of the NCS occupational groupings."
  },
  management: {
    intro: "Management in pest control is the layer between the trucks and the owner. The titles vary by company, but the work falls into four jobs. A branch or service manager runs a territory: technicians, routes, customers and the numbers. A technical director or technical manager owns the right answer on identification, treatment, labels, callbacks and training. A safety manager owns injuries, vehicle and chemical safety, and training records. An operations manager owns scheduling, fleet, inventory and the software. In a small company one person does all four. In most states the company's licence also depends on a named, certified person who is responsible for the pest control work, and that person is often a manager. Nearly everyone in these jobs came up off a route. The work suits people who like solving other people's problems, can hold technicians to a standard without losing them, and are comfortable with numbers, complaints and responsibility for things they did not personally do.",
    dayInTheLife: [
      "A branch manager's day usually starts before the technicians leave. Routes have to be covered, sick calls replaced, and the day's emergencies fitted in. Once the trucks are out, the job is people and customers: ride-alongs to check work quality, callbacks on jobs that did not hold, escalations from unhappy customers, and sales follow-ups. Later come the numbers: production, cancellations, overtime, and whatever the owner or regional manager reviews each week. Hiring, training and discipline sit on top of all of it.",
      "A technical director spends the day answering questions. Technicians call or message with an insect they cannot identify, a label question, or an account where treatments keep failing. The technical lead decides which products the company uses, writes treatment protocols, trains new hires and runs continuing education, and goes out to the hardest accounts personally. In states that require a certified person to supervise the company's pest control work, the technical lead often holds that role. Florida law, for example, makes the certified operator in charge a full-time employee responsible for personally supervising the selection of chemicals, safe use, correct concentrations, training of personnel and control measures, and for notifying the state within 24 hours of any accidental human poisoning or death on a job they supervise.",
      "A safety manager's week is incidents, training and records. Companies with more than 10 employees at any time in the previous year must keep OSHA injury and illness records unless their industry is partially exempt, and the exterminating industry (part of NAICS 5617) is not on OSHA's partially exempt list. Every employer, regardless of size, must report work-related fatalities, in-patient hospitalisations, amputations and losses of an eye to OSHA. The rest of the job is preventing those events: hazard communication and Safety Data Sheets, respirator and PPE programmes, ladder safety, heat illness planning, vehicle safety, and making sure training is documented. The owner pages on this site cover the OSHA standards that apply to pest companies in more detail.",
      "An operations manager's day is the system that holds the company together: scheduling and routing, the fleet and its maintenance, product inventory and storage, the service software and the records it keeps. In practice operations is where regulatory record keeping lives, because pesticide application records, vehicle requirements and storage rules all depend on systems working every day, not on one person remembering.",
      "Across all four jobs the week has a rhythm: a few hours in the field, a lot of time on the phone and in meetings, and responsibility for outcomes produced by other people. The hardest part for most new managers is the shift from being the best technician to making other technicians good."
    ],
    duties: [
      "Build and cover daily routes, and fit emergencies and callbacks into the schedule.",
      "Hire, train, coach and, when needed, discipline technicians and office staff.",
      "Ride along and inspect completed work to check quality and label compliance.",
      "Handle customer complaints and escalations, and decide on retreatments and refunds.",
      "Track branch numbers: production, cancellations, overtime, collections and sales.",
      "Answer technical questions on identification, product selection and label directions.",
      "Write treatment protocols and choose which products the company stocks.",
      "Serve as the state-required certified or qualifying person where the company designates you, and meet that role's supervision duties.",
      "Run or arrange continuing education so technicians keep their licences current.",
      "Keep OSHA injury and illness records and report serious injuries and fatalities to OSHA as required.",
      "Run hazard communication, PPE and respirator programmes and keep training records.",
      "Manage vehicle safety, maintenance and driver records.",
      "Control product inventory, storage and disposal.",
      "Audit pesticide application records for completeness.",
      "Report to the owner or regional leadership and carry out company policy."
    ],
    workEnvironment: {
      schedule: "BLS says evenings and weekends are common for pest control workers, and managers are the people who cover the gaps, so expect a schedule that bends around the field. There is no national survey of pest management hours. Ask any employer how many hours the role really runs in peak season and whether you are expected to be reachable after hours.",
      seasonality: "Managers feel the season through staffing and workload: busy months mean more calls, more overtime and more hiring pressure. Technical and safety work runs year round, and slower months are when most training and planning happen.",
      physical: "Lighter than route work but not desk-only. Ride-alongs, inspections of difficult accounts and covering routes put you back in attics and crawlspaces, which BLS describes as hot in summer and cold in winter.",
      hazards: "The same field hazards as technicians when you are in the field, plus the responsibility for everyone else's. Under Florida law, for example, the certified operator in charge must notify the state within 24 hours of an accidental human poisoning or death connected with work they supervise. A licence that a company depends on also carries regulatory risk for you personally if records or practices fail.",
      vehicleAndTravel: "Branch managers drive between job sites and accounts. Regional and multi-branch roles add travel between offices. Many managers keep a company vehicle; ask whether the role includes one."
    },
    training: {
      entry: "Almost always promotion from inside. BLS says pest control workers advance with experience and that applicators with several years of experience may become supervisors. A degree is not required for most branch, operations or safety roles. Technical director roles favour people with deep identification and label knowledge, and some companies look for a biology or entomology background, which is what the BCE credential requires.",
      onTheJob: "Most managers learn by doing: senior technician, then service or route supervisor, then branch or technical manager. Larger companies may have formal management training; ask whether it exists before you accept a promotion. Safety managers commonly take OSHA Outreach training. OSHA says the 30-hour course is intended for supervisors or workers with safety responsibilities, that it is voluntary, that it is not a certification, and that it does not by itself meet the training requirements of any OSHA standard.",
      licensing: "Managers usually need the highest level of state pesticide certification in the categories the company works, because most states make a certified person responsible for the business licence. The site's state pages name the role for each state: Texas calls it the responsible certified applicator, Florida the certified operator in charge, California the qualifying manager. Texas, for example, requires every commercial business licence holder to designate a certified applicator as its responsible certified applicator, and one certified applicator cannot be the responsible applicator for more than one business at the same time. Under EPA's certification rule, certification must be renewed at least every five years, and noncertified workers may only use restricted use pesticides after training and under the direct supervision of a certified applicator, which is supervision managers end up providing. Check the Starting a company and Licensing pages on this site for your state. This is general information, not legal advice.",
      certifications: [
        {
          name: "Associate Certified Entomologist (ACE)",
          body: "Entomological Society of America Certification Corporation",
          what: "Requires five years of verifiable pest management experience, a current US applicator licence and a passing exam. Common among technical managers and branch managers who want a credential that is not tied to one state.",
          url: "https://entocert.org/ace"
        },
        {
          name: "Board Certified Entomologist (BCE)",
          body: "Entomological Society of America Certification Corporation",
          what: "For degree holders: a bachelor's in a biological or life science with entomology coursework plus three years of experience (less with a graduate degree). Often held by technical directors at larger companies.",
          url: "https://entocert.org/bce/eligibility"
        },
        {
          name: "OSHA Outreach Training Program (30-hour)",
          body: "US Occupational Safety and Health Administration, through authorised trainers",
          what: "A voluntary course for supervisors and workers with safety responsibilities. You get a completion card, not a certification, and it does not replace the training specific OSHA standards require.",
          url: "https://www.osha.gov/training/outreach"
        },
        {
          name: "QualityPro accreditation",
          body: "QualityPro (endorsed by the National Pest Management Association)",
          what: "A company credential, not a personal one, but managers usually run it. Accredited companies must have been in business at least two years and meet 18 standards covering vehicles, dress, safety, pesticide handling, IPM, background and driving record checks and a drug-free workplace policy.",
          url: "https://www.npmaqualitypro.org/available-credentials/qualitypro/"
        }
      ]
    },
    skills: [
      "Coaching and correcting technicians without losing them",
      "Scheduling and routing under pressure",
      "Handling angry customers and making fair calls on retreatments",
      "Deep identification and label knowledge, especially for technical roles",
      "Reading branch numbers and explaining them to an owner",
      "Knowing the state pesticide rules your company licence depends on",
      "Running safety programmes and keeping training records straight",
      "Writing clear procedures and protocols",
      "Hiring judgement"
    ],
    tools: [
      "Service and scheduling software",
      "Routing and fleet tracking systems",
      "Spreadsheets or reporting dashboards for branch numbers",
      "Product labels, Safety Data Sheets and the company's approved product list",
      "OSHA injury and illness log forms",
      "Training and licence tracking records",
      "Identification references, a hand lens or microscope for technical roles",
      "Company vehicle with a full technician's kit for ride-alongs and covering routes",
      "PPE and respirator fit-testing records",
      "Inventory and storage logs for pesticides"
    ],
    careerPath: [
      {
        stage: "Senior technician",
        description: "You run a route well, hold the right licence categories, and other technicians start asking you questions."
      },
      {
        stage: "Service or route supervisor",
        description: "You ride with new hires, check work and cover routes. BLS counts first-line supervisors separately from technicians, and in the pest control industry they earn noticeably more than technicians."
      },
      {
        stage: "Branch, technical, safety or operations manager",
        description: "You own a territory or a function. This is often where you become the certified person the state licence depends on."
      },
      {
        stage: "Regional or senior manager",
        description: "Multiple branches, or a technical or safety role across the whole company. More travel, more numbers, less field time."
      },
      {
        stage: "Next moves",
        description: "Many managers eventually start or buy a company; others move into auditing and quality assurance. See the ownership and auditor guides."
      }
    ],
    pay: "BLS publishes pay for occupations inside the exterminating and pest control services industry (NAICS 561710). For May 2025, BLS counted 7,740 first-line supervisors of building and grounds workers in that industry, with a median of $63,340 a year. Most of them (7,290) are coded as first-line supervisors of housekeeping and janitorial workers (SOC 37-1011): median $63,400, lowest 10 percent under $47,650, highest 10 percent over $90,520. Another 440 are coded as supervisors of landscaping and groundskeeping workers (SOC 37-1012), median $62,910. The SOC titles do not mention pest control, but these are the supervisors pest control companies report to BLS. General and operations managers (SOC 11-1021) in the industry numbered 9,200, with a median of $81,890, lowest 10 percent under $44,920 and highest 10 percent over $157,830. For comparison, the median for pest control workers in the same industry was $44,930 and for all occupations in the industry $45,750. BLS does not publish separate figures for technical directors or safety managers. OEWS excludes self-employed workers and does not capture commission or bonus pay.",
    benefits: "BLS's National Compensation Survey reports benefits by occupational group, and pest management jobs fall into two groups. First-line supervisors (SOC 37) sit in service occupations: in March 2026, 47 percent of private industry workers in that group had access to medical care benefits, 47 percent to retirement plans, 67 percent to paid sick leave, 57 percent to paid vacation and 56 percent to paid holidays. Managers (SOC 11) sit in management, business and financial occupations: 94 percent had access to medical care, 91 percent to retirement plans, 97 percent to paid sick leave, 98 percent to paid vacation and 98 percent to paid holidays. These are averages across all industries, not pest-specific figures, and smaller employers offer less: at private establishments with 1 to 49 workers, 55 percent had access to medical care. Ask any employer whether the role includes a company vehicle, a bonus tied to branch results, and paid continuing education and credential fees.",
    goodParts: [
      "A clear step up in pay from technician work, according to BLS industry data.",
      "You solve harder problems and get to be the person others rely on.",
      "You shape how the company does the work: training, protocols, safety.",
      "Less physical wear than full-time route work.",
      "It is the most common route toward owning a company."
    ],
    hardParts: [
      "You are responsible for work you did not do yourself, including legally if you are the certified person on the licence.",
      "People problems: hiring, turnover, discipline and covering routes when someone quits.",
      "Long and unpredictable hours, especially in peak season.",
      "Customer escalations land on you.",
      "You may earn less per hour than you expect once extra hours are counted, so ask what the real hours are."
    ],
    faq: [
      {
        q: "Do I need a degree to become a manager?",
        a: "Not usually. BLS says experienced applicators may become supervisors, and most managers came up off the route. Technical director roles at larger companies sometimes favour a science degree, which is what the BCE requires."
      },
      {
        q: "What licence does a manager need?",
        a: "Usually the highest level of state certification in the categories the company works, because many states make a certified person responsible for the business licence. See the Starting a company and Licensing pages for your state."
      },
      {
        q: "What does being the responsible or qualifying person mean?",
        a: "It varies by state, but it is real responsibility. Florida, for example, requires the certified operator in charge to be a full-time employee who personally supervises chemical selection, safe use, concentrations, training and control measures. Texas does not let one certified applicator be the responsible applicator for two businesses at once."
      },
      {
        q: "How much more do supervisors make than technicians?",
        a: "In May 2025, BLS reported a median of $63,340 for first-line supervisors in the pest control industry, against $44,930 for pest control workers in the same industry. General and operations managers had a median of $81,890."
      },
      {
        q: "Is OSHA 30 a certification?",
        a: "No. OSHA says none of its Outreach courses is a certification. The 30-hour card shows you completed safety awareness training aimed at supervisors."
      },
      {
        q: "Does a small pest company have to keep OSHA injury logs?",
        a: "If it had more than 10 employees at any time in the previous year, yes, because the industry is not on OSHA's partially exempt list. Every employer must report fatalities, in-patient hospitalisations, amputations and loss of an eye."
      },
      {
        q: "Should I get the ACE before applying for a technical role?",
        a: "It helps, and it needs five years of experience and a current licence. It shows a level of knowledge that is not tied to one state's exam."
      }
    ],
    sources: [
      {
        label: "BLS OEWS May 2025, NAICS 561710: first-line supervisors of building and grounds workers (37-1010), annual median",
        url: "https://data.bls.gov/timeseries/OEUN000000056171037101013"
      },
      {
        label: "BLS OEWS May 2025, NAICS 561710: first-line supervisors of housekeeping and janitorial workers (37-1011), annual median",
        url: "https://data.bls.gov/timeseries/OEUN000000056171037101113"
      },
      {
        label: "BLS OEWS May 2025, NAICS 561710: general and operations managers (11-1021), annual median",
        url: "https://data.bls.gov/timeseries/OEUN000000056171011102113"
      },
      {
        label: "BLS OEWS May 2023, Exterminating and Pest Control Services industry table",
        url: "https://www.bls.gov/oes/2023/may/naics5_561710.htm"
      },
      {
        label: "O*NET OnLine: 37-1012.00 First-Line Supervisors of Landscaping, Lawn Service, and Groundskeeping Workers",
        url: "https://www.onetonline.org/link/summary/37-1012.00"
      },
      {
        label: "O*NET OnLine: 37-1011.00 First-Line Supervisors of Housekeeping and Janitorial Workers",
        url: "https://www.onetonline.org/link/summary/37-1011.00"
      },
      {
        label: "BLS Occupational Outlook Handbook: Pest Control Workers",
        url: "https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm"
      },
      {
        label: "Florida Statutes 482.152: Duties of certified operator in charge",
        url: "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0482/Sections/0482.152.html"
      },
      {
        label: "eCFR: 29 CFR 1904 Subpart B, Scope (recordkeeping exemptions)",
        url: "https://www.ecfr.gov/current/title-29/part-1904/subpart-B"
      },
      {
        label: "OSHA: Outreach Training Program",
        url: "https://www.osha.gov/training/outreach"
      },
      {
        label: "EPA: Certification Standards for Pesticide Applicators",
        url: "https://www.epa.gov/pesticide-worker-safety/certification-standards-pesticide-applicators"
      },
      {
        label: "ESA Certification: Associate Certified Entomologist",
        url: "https://entocert.org/ace"
      },
      {
        label: "ESA Certification: BCE eligibility",
        url: "https://entocert.org/bce/eligibility"
      },
      {
        label: "QualityPro Accreditation",
        url: "https://www.npmaqualitypro.org/available-credentials/qualitypro/"
      },
      {
        label: "BLS National Compensation Survey: Medical care benefits, March 2026 (Table 2)",
        url: "https://www.bls.gov/news.release/ebs2.t02.htm"
      },
      {
        label: "BLS National Compensation Survey: Retirement benefits, March 2026 (Table 1)",
        url: "https://www.bls.gov/news.release/ebs2.t01.htm"
      },
      {
        label: "BLS National Compensation Survey: Paid leave, March 2026 (Table 6)",
        url: "https://www.bls.gov/news.release/ebs2.t06.htm"
      }
    ],
    notes: "SOC choice: the brief suggested 37-1012. I checked: O*NET's 37-1012 sample titles are all landscaping/grounds titles and do not mention pest control, and OEWS May 2025 shows only 440 people coded 37-1012 in NAICS 561710 versus 7,290 coded 37-1011 (May 2023: 550 vs 5,300). So the guide leads with the broad group 37-1010 inside the pest industry and explains the split. I could not open the SOC 2018 definitions or direct-match title file (bls.gov 403s scripted fetches), so the claim that pest supervisors are coded mostly under 37-1011 is an INFERENCE from the industry employment counts, not a published BLS mapping. May 2025 OEWS figures came from the BLS Public Data API (v1), not an HTML table; the May 2025 naics5_561710 page does not exist at bls.gov/oes/2025/may/. Texas responsible certified applicator details come from the site's own start-company.ts (TDA sources cited there), not re-opened by me; California 'qualifying manager' is from disciplines.ts and was not re-verified. NCS grouping of SOC 37 into service occupations and SOC 11 into management, business and financial is my reading of NCS groupings. No source found for typical manager hours, bonus structures or vehicle policy, so those are phrased as questions to ask."
  },
  auditor: {
    intro: "Auditing and quality assurance is the job of checking pest programmes rather than running them. It comes in three main forms. Third-party auditors work for certification bodies and audit food sites against schemes such as SQF or BRCGS, and the pest programme is one part of what they check. Client-side QA staff work for the food plant itself and manage the pest contractor as one of their prerequisite programmes. Internal quality auditors work for pest companies and check their own technicians' accounts before a client's auditor does. None of these roles treats anything, so none of them needs a pesticide licence just to audit, but credibility comes from credentials and experience. The work suits people who are thorough, sceptical in a polite way, good with documents and able to tell someone their programme has a problem without starting a fight. It is a career for people who have learned the work well enough to see what others miss. It is a poor fit for people who want to be outdoors all day or who dislike conflict.",
    dayInTheLife: [
      "Every audit starts with documents. On the pest programme, an auditor working against the SQF code is checking that the site has a documented pest prevention programme that names who is responsible, records and trends pest sightings, sets how often pest status is checked, shows every device on a site map with its location, number and type, lists the chemicals used with Safety Data Sheets available, and measures whether the programme is working. The contractor must be licensed and approved by the relevant authority, use trained operators and approved chemicals, and leave written reports of inspections and treatments.",
      "Then comes the walk. The auditor compares the site map with what is actually on the walls, opens stations, looks at light traps, and looks for evidence of pests and for conditions that would let them in. The SQF code says identified pest activity must not present a contamination risk to food, raw materials or packaging, and that contaminated product must be disposed of and the source investigated, with records kept. Under the AIB standards, the facility's pest programme is judged partly by results: effective pest management is shown by a lack of identified pest activity.",
      "Client-side QA work is less about a single audit day and more about running the system all year. In an SQF-certified site, senior management must designate a primary and substitute SQF practitioner, employed by the site, who has completed HACCP training and oversees the whole SQF system, including contract services such as pest control. Under FSMA, FDA requires certain parts of a food facility's food safety plan, such as preparing the plan, validation and records review, to be done or overseen by a preventive controls qualified individual. In practice the QA person reads every pest service report, follows up on recommendations, keeps the trend data, and answers for the pest programme when the certification auditor arrives.",
      "Internal quality auditors at pest companies do a smaller version of the same job from the other side. They visit commercial accounts, check that records are complete, that every device on the map is present and serviced, that labels and licences are on file, and that trend reports were written and sent. The point is to find the gaps before the client's auditor or the state inspector does.",
      "The rest of the week is writing. Findings have to be clear, specific and tied to the requirement they fail, and corrective actions have to be followed up. Third-party auditors also travel a great deal, because audits happen at the site."
    ],
    duties: [
      "Review the documented pest programme against the scheme or customer standard.",
      "Check the device site map against the devices actually in place.",
      "Review service reports, pesticide application records and pest sighting logs for completeness.",
      "Confirm specimen labels and Safety Data Sheets are on file for every product used.",
      "Confirm technician certifications or registrations, the pest company licence and insurance certificate are current.",
      "Check the written scope of service covers frequency, services, approved chemicals, emergency procedures and record keeping.",
      "Walk the facility looking for pest activity, harbourage and entry points.",
      "Assess trend analysis and whether recommendations were acted on.",
      "Check pesticide storage on site: locked, labelled, inventoried, with spill control.",
      "Write findings tied to the specific requirement, and grade their severity.",
      "Follow up corrective actions and verify they were completed.",
      "For client QA roles: manage the pest contractor, read every report and keep the programme audit-ready.",
      "For internal pest company auditors: inspect technicians' commercial accounts and coach them on gaps.",
      "Keep your own training and credential records current."
    ],
    workEnvironment: {
      schedule: "Third-party audits are scheduled around the site, and some schemes use unannounced audits; AIB's recognition document is labelled as announced, unannounced or announced to corporate. Client-side QA roles run on the plant's schedule. There is no national data on auditor hours, so ask about overnight travel and how many audits a week are expected.",
      seasonality: "Mostly year round. Certifications and AIB recognition run on annual cycles, so each site's audit date recurs. Pest pressure itself is seasonal, so findings change with the season.",
      physical: "A mix of desk work and long walks through large facilities, including warehouses, coolers and exterior perimeters. Lighter than route work, but you are on your feet most of an audit day.",
      hazards: "Food plant hazards: forklifts, production machinery and noise. You follow the plant's safety and GMP rules like any visitor. Auditors do not apply pesticides, so pesticide exposure is lower than for technicians, but you will open stations and handle devices.",
      vehicleAndTravel: "Third-party auditors travel between sites, often far and often overnight. Client-side QA roles are based at one plant or a few. Internal pest company auditors drive between their company's commercial accounts."
    },
    training: {
      entry: "Requirements depend on which kind of auditor you want to be. To register as an SQF auditor, SQFI requires a university degree in a discipline related to the food sector categories you apply for, or equivalency through 10 years of industry experience or an approved education plan; completion of SQFI's Auditing the SQF Code Requirements course, an HACCP training course and the Auditing SQF Food Safety Systems exam; at least 120 hours of food industry auditing; at least two years of work in a food-related technical, professional or supervisory role involving food safety; and employment or contract with a licensed SQF certification body. SQFI says the 120 audit hours count supplier, HACCP and GMP audits, but not internal audits or pest control assessments. That last point matters: years of pest programme audits do not by themselves count toward SQF auditor hours. Client-side QA roles usually want food science or related education plus HACCP and PCQI training. Internal pest company auditor roles usually go to experienced commercial technicians.",
      onTheJob: "Most people learn auditing by being audited first. Commercial and food safety pest technicians learn what auditors look for by preparing for audits. After registration, SQFI says further auditor qualification is done by the certification body through witnessed audits and reviewed audit reports. Client QA staff typically build up through plant roles such as sanitation, quality technician or food safety coordinator.",
      licensing: "Auditing a pest programme does not usually require a pesticide licence, because the auditor applies nothing. If your role includes any pesticide application, the normal state licensing rules apply, and many auditors keep a licence because they came off the route. FSMA uses two defined roles. A preventive controls qualified individual must complete training at least equivalent to the FDA-recognised standardised curriculum, or be qualified through job experience. A qualified auditor, for FSMA supplier verification audits, must be a qualified individual with technical expertise from education, training or experience; FDA's examples include government employees and audit agents of accredited certification bodies. Neither is a state licence. This is general information, not legal advice.",
      certifications: [
        {
          name: "SQF Auditor registration",
          body: "SQFI (Safe Quality Food Institute)",
          what: "Registration to audit SQF sites for a licensed certification body. Requires a relevant degree or equivalency, SQFI auditor training and exam, HACCP training, 120 audit hours (not counting pest control assessments) and two years of food safety work.",
          url: "https://www.sqfi.com/sqf-professionals/auditors-technical-reviewers"
        },
        {
          name: "Preventive Controls for Human Food (PCQI training)",
          body: "Food Safety Preventive Controls Alliance (FSPCA)",
          what: "A 2.5-day course using the FDA-recognised standardised curriculum on building and running an FSMA food safety plan. Completing it is one way to meet FDA's training requirement for a preventive controls qualified individual.",
          url: "https://www.fspca.net/"
        },
        {
          name: "Associate Certified Entomologist (ACE)",
          body: "Entomological Society of America Certification Corporation",
          what: "Five years of verifiable pest management experience, a current US applicator licence and an exam. Gives an auditor with a pest background a credential that food clients recognise.",
          url: "https://entocert.org/ace"
        },
        {
          name: "Board Certified Entomologist (BCE)",
          body: "Entomological Society of America Certification Corporation",
          what: "For degree holders in biological or life sciences with entomology coursework plus relevant experience. Strong credential for technical auditing of pest programmes.",
          url: "https://entocert.org/bce/eligibility"
        }
      ]
    },
    skills: [
      "Reading standards closely and tying each finding to a specific requirement",
      "Document review: spotting missing dates, unsigned records and maps that do not match",
      "Pest identification and knowledge of how pests get into buildings",
      "Understanding HACCP and FSMA preventive controls well enough to see where pests fit",
      "Clear, neutral written reports",
      "Delivering bad news calmly and professionally",
      "Independence: not letting relationships soften findings",
      "Time management across many sites"
    ],
    tools: [
      "The scheme standard or customer standard being audited",
      "Audit checklist and report templates",
      "Site device map and the pest contractor's records",
      "Flashlight",
      "Camera or tablet for evidence, where the site allows it",
      "Keys or tools to open locked bait stations, provided or supervised by the contractor",
      "Plant-required GMP gear and PPE",
      "Hand lens for identification",
      "Laptop for report writing"
    ],
    careerPath: [
      {
        stage: "Commercial or food safety technician",
        description: "You prepare accounts for audits and learn what auditors look for. This is the most common starting point for pest-side auditors."
      },
      {
        stage: "Internal quality auditor at a pest company",
        description: "You audit your own company's commercial accounts. Some pest companies run these roles; ask larger employers whether they do."
      },
      {
        stage: "Technical or QA lead",
        description: "You add credentials such as ACE or BCE and PCQI training, and either lead quality for a pest company or move to a food plant's QA team."
      },
      {
        stage: "Client-side QA or food safety manager",
        description: "You run the pest programme and other prerequisite programmes from inside the plant, often as SQF practitioner or PCQI."
      },
      {
        stage: "Third-party certification auditor",
        description: "You register with a scheme such as SQF and work for a certification body. This needs food industry audit hours beyond pest assessments, and usually a relevant degree."
      }
    ],
    pay: "BLS does not track pest programme auditors or food safety auditors as a separate occupation, and its industry data for pest control companies does not show a quality assurance occupation. Third-party auditors, client-side QA staff and internal pest company auditors can be classified under several different occupations depending on the employer, so there is no honest single BLS figure to quote. Ask employers for their pay range directly, and treat any number you see without a named survey behind it with suspicion.",
    benefits: "Because these roles fall into different occupational groups, there is no single benefits figure. As a reference point, BLS's National Compensation Survey for March 2026 shows that among private industry workers in management, business and financial occupations, 94 percent had access to medical care benefits, 91 percent to retirement plans, 97 percent to paid sick leave and 98 percent to paid vacation. If your role is classified as a technician or service job instead, the service occupations figures in the other field guides apply. Ask employers about travel reimbursement and per diem, a company vehicle for field auditors, and whether they pay for auditor training, exams and credential renewals.",
    goodParts: [
      "You use everything you learned on the route, without the daily wear of route work.",
      "The work matters: pest problems found early keep contaminated food from reaching people.",
      "Credentials such as PCQI, ACE and scheme auditor registration travel with you between employers.",
      "Variety, especially for third-party auditors who see many sites.",
      "A clear route out of the truck for people who like documents and analysis."
    ],
    hardParts: [
      "Nobody is glad to see you until the audit passes.",
      "Third-party roles can mean heavy travel and nights away.",
      "Getting registered as a scheme auditor takes food industry audit hours that pest assessments do not count toward.",
      "Report writing takes as long as the audit.",
      "You have to stay independent even with people you like."
    ],
    faq: [
      {
        q: "Do I need a pesticide licence to audit pest programmes?",
        a: "Not usually, because auditors do not apply pesticides. If your role includes any application, normal state licensing applies. Many auditors keep their licence because it adds credibility."
      },
      {
        q: "Can my years of pest work count toward becoming an SQF auditor?",
        a: "Work experience can help with the two-year food safety work requirement if it involved food safety accountability, but SQFI says pest control assessments do not count toward the 120 required audit hours. You need supplier, HACCP or GMP audits."
      },
      {
        q: "What is a PCQI?",
        a: "A preventive controls qualified individual under FDA's FSMA rule for food facilities. They prepare or oversee the food safety plan, validation, records review and reanalysis. The FSPCA 2.5-day course is one way to qualify."
      },
      {
        q: "What is the difference between an SQF practitioner and an SQF auditor?",
        a: "The practitioner works for the certified site and runs its SQF system; the code requires them to be employed by the site and to have HACCP training. The auditor works for a licensed certification body and audits the site."
      },
      {
        q: "Is AIB recognition the same as certification?",
        a: "No. AIB says its recognition document reflects the score on the day of the inspection, expires after one year, and is not a certificate of compliance like an ISO certificate."
      },
      {
        q: "Which food safety schemes are GFSI-recognised?",
        a: "GFSI lists recognised programmes including BRCGS, SQF, FSSC 22000, IFS, PrimusGFS and GLOBALG.A.P., among others. GFSI itself does not certify food businesses."
      },
      {
        q: "What does an auditor look at first in a pest programme?",
        a: "Usually the documents: the written programme, site map, service and application records, trend reports, labels, licences and the scope of service. Then the walk, to see whether reality matches the paper."
      }
    ],
    sources: [
      {
        label: "SQFI: SQF Auditors and Technical Reviewers requirements",
        url: "https://www.sqfi.com/sqf-professionals/auditors-technical-reviewers"
      },
      {
        label: "SQF Food Safety Code: Food Manufacturing, Edition 9",
        url: "https://www.sqfi.com/docs/sqfilibraries/code-documents/edition-9/code-pdfs/20227fmin_foodmanufacturing_v3-2-final-w-links.pdf?sfvrsn=7f70c75a_8"
      },
      {
        label: "eCFR: 21 CFR 117.180, PCQI and qualified auditor requirements",
        url: "https://www.ecfr.gov/current/title-21/section-117.180"
      },
      {
        label: "eCFR: 21 CFR 117.3, Definitions",
        url: "https://www.ecfr.gov/current/title-21/section-117.3"
      },
      {
        label: "eCFR: 21 CFR 117.35, Sanitary operations (pest control)",
        url: "https://www.ecfr.gov/current/title-21/section-117.35"
      },
      {
        label: "FDA: FSMA Final Rule for Preventive Controls for Human Food",
        url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-preventive-controls-human-food"
      },
      {
        label: "FSPCA (Food Safety Preventive Controls Alliance)",
        url: "https://www.fspca.net/"
      },
      {
        label: "Ohio State University: FSPCA Preventive Controls for Human Food training",
        url: "https://foodindustries.osu.edu/events/fspca-preventive-controls-human-food-training-7"
      },
      {
        label: "AIB International Consolidated Standards for Inspection: Prerequisite and Food Safety Programs (2022), copy hosted by AFDO",
        url: "https://afdo.org/wp-content/uploads/2024/01/23food.pdf"
      },
      {
        label: "GFSI: Recognised certification programme owners",
        url: "https://mygfsi.com/how-to-implement/recognition/certification-programme-owners/"
      },
      {
        label: "BRCGS: Global Standard Food Safety",
        url: "https://www.brcgs.com/our-standards/food-safety"
      },
      {
        label: "ESA Certification: Associate Certified Entomologist",
        url: "https://entocert.org/ace"
      },
      {
        label: "ESA Certification: BCE eligibility",
        url: "https://entocert.org/bce/eligibility"
      },
      {
        label: "BLS OEWS May 2023, Exterminating and Pest Control Services industry table",
        url: "https://www.bls.gov/oes/2023/may/naics5_561710.htm"
      },
      {
        label: "BLS National Compensation Survey: Medical care benefits, March 2026 (Table 2)",
        url: "https://www.bls.gov/news.release/ebs2.t02.htm"
      },
      {
        label: "BLS National Compensation Survey: Paid leave, March 2026 (Table 6)",
        url: "https://www.bls.gov/news.release/ebs2.t06.htm"
      }
    ],
    notes: "No BLS occupation fits; I deliberately did not offer a proxy SOC (compliance officers 13-1041, quality control analysts 19-4099.01 etc. are plausible but none is justified for pest programme auditing). The OEWS 561710 table has no QA occupation; 47-4011 construction and building inspectors (460 jobs in 2023) are probably WDI/termite inspectors, not auditors. SQFI auditor requirements: a search-engine summary claimed 160 hours and 5 years; the live SQFI page I opened says 120 hours and 2 years, which is what the guide uses. Re-check, as SQFI revises criteria. BRCGS auditor requirements and BRCGS 4.14 text were not accessible (paywalled); not used. The existence of internal quality auditor roles at pest companies comes from disciplines.ts and general industry knowledge; I found no primary source, so the guide tells readers to ask employers. The SQF code also has an internal audits clause (2.5.4) requiring trained internal auditors independent where practical; not quoted in the guide but supports the internal QA description. FSMA 'qualified auditor' relates to supplier verification onsite audits (117.435) per 117.180(b); the guide frames it that way."
  },
  ownership: {
    intro: "Owning a pest control company means you stop being paid for pest control and start being paid for running a business that does pest control. Most owners in this trade are small. Census data for 2022 counts 13,603 employer firms in exterminating and pest control services, and about 65 percent of them had fewer than five employees. At the other end, 21 firms with 500 or more employees employed about 36 percent of the industry's workers. People reach ownership two ways: a technician or manager who goes out on their own, or someone from outside the trade who buys or starts a company and hires the licensed people. The first knows the work and has to learn the business; the second is the reverse. This guide covers the path to owning, what owners actually do, and the money, with sourced numbers. The legal setup is covered elsewhere on this site: Starting a company for state licensing, and the Owners section for hiring, insurance, vehicles and hazmat, records, OSHA, and buying or selling a company.",
    dayInTheLife: [
      "In a one-truck company the owner is the technician, salesperson, scheduler, bookkeeper and customer service desk. Days are spent on the route, and evenings on quotes, invoices, callbacks and paperwork. BLS lists bookkeeping as a key skill for pest control workers and notes that self-employed workers in particular need it to run their business.",
      "Once there are employees, the owner's day moves off the truck. Hiring and keeping technicians, routing, pricing, collections, marketing, and handling the customers who want to speak to the owner take most of the time. Payroll, workers' compensation, vehicle insurance and licence renewals all have deadlines. The owner pages on this site cover hiring your first technician, the insurance a pest company carries, and the record-keeping rules for pesticide applications.",
      "Compliance never goes away. The company needs its own state business licence and a named certified person responsible for the pest control work, often the owner. Florida, for example, requires the certified operator in charge to be a full-time employee who personally supervises chemical selection, safe use, concentrations, training and control measures. Texas requires each commercial business licence to designate a responsible certified applicator who cannot serve two businesses at once. Once the company has more than 10 employees, it also has to keep OSHA injury and illness records, because the industry is not on OSHA's partially exempt list.",
      "Money is the constant background. SBA tells new businesses to calculate start-up costs in two groups, one-time costs such as permits and equipment and monthly costs such as salaries, and to work out a break-even point before launching. In a route business, owners watch cash flow closely, because payroll and fuel are due whether or not customers have paid yet.",
      "Later in an owner's career the question becomes what happens to the company: grow it, hand it on, or sell it. The industry includes very large national companies that buy smaller ones, and the buying and selling page in the Owners section covers how those deals work."
    ],
    duties: [
      "Hold or hire the state-required certified or qualifying person and keep the business licence current.",
      "Carry the insurance and any bond your state requires.",
      "Set prices and service agreements.",
      "Market the company and sell services.",
      "Hire, train, pay and keep technicians and office staff.",
      "Classify workers correctly and meet payroll tax and wage law obligations.",
      "Run scheduling, routing and customer service.",
      "Invoice, collect and manage cash flow.",
      "Keep pesticide application records as state law requires.",
      "Run vehicle safety and meet rules for carrying pesticides.",
      "Meet OSHA obligations, including injury records once you pass 10 employees.",
      "Choose products and equipment, and manage storage and inventory.",
      "Handle complaints, damage claims and disputes.",
      "Plan the company's future: growth, buying other routes, or selling."
    ],
    workEnvironment: {
      schedule: "Owners set their own schedule in theory and have the longest hours in practice, especially early on. BLS says evenings and weekends are common in pest control work, and an owner is the last person covering. There is no national survey of owner hours in this industry.",
      seasonality: "Revenue follows pest seasons, while many costs, such as insurance, vehicle payments and core staff, do not. Recurring service agreements smooth this out, which is one reason owners build them.",
      physical: "Fully physical while you are the main technician. BLS describes route work as standing, bending, kneeling and crawling in attics and crawlspaces that are hot in summer and cold in winter. Less physical as the company grows and you move into management.",
      hazards: "All the field hazards while you are on the route, plus the financial and legal risks of running a business: liability claims, regulatory violations and cash shortfalls. A business licence that depends on your certification puts your own licence on the line for your employees' work.",
      vehicleAndTravel: "Your trucks are your workplace. Pesticides on vehicles are regulated, and some loads trigger federal hazardous materials rules; see the vehicles and hazmat page in the Owners section. Expect to drive your whole service area, and more as you grow."
    },
    training: {
      entry: "BLS says some pest control workers start their own pest management business, and most owners who come from the trade start as technicians. To own and operate legally you need what your state requires of a business, usually a business licence plus a certified person responsible for the work, plus insurance or bond minimums. Texas, for example, requires the responsible certified applicator to qualify through one of several routes, such as a technician licence held for at least six months plus at least 12 of the last 24 months working under a certified applicator, and then pass a general standards exam and at least one category exam. Requirements differ widely, so start with the Starting a company page for your state.",
      onTheJob: "There is no formal training path to ownership. The common route is years on a route, then supervision or management, where you learn pricing, scheduling, hiring and the numbers on someone else's money. SBA's business guide is a free starting point for business planning, start-up costs and funding.",
      licensing: "Ownership itself does not need a pesticide licence in every state, but the company does. The general pattern: the company holds a state business licence for pest control, names a certified person who is responsible for the work, and files proof of insurance or a bond. Technicians are licensed or registered individually under the state's applicator rules, which follow EPA's certification framework: competency by exam, restricted use pesticides only by or under the direct supervision of certified applicators, and recertification at least every five years. If you are buying in from outside the trade, you will need to hire or partner with a certified person who meets your state's rules. See Starting a company on this site for TX, WA, FL, CA and SC, and check with your state pesticide agency. This is general information, not legal or financial advice.",
      certifications: [
        {
          name: "QualityPro accreditation",
          body: "QualityPro (endorsed by the National Pest Management Association)",
          what: "A company credential. Requires at least two years in business, minimum insurance, criminal background and motor vehicle record checks where appropriate and lawful, a drug-free workplace policy, tested and trained employees, and 18 professional standards. Add-on certifications include GreenPro, QualityPro Schools, QualityPro Food Safety and QualityPro Public Health.",
          url: "https://www.npmaqualitypro.org/available-credentials/qualitypro/"
        },
        {
          name: "Associate Certified Entomologist (ACE)",
          body: "Entomological Society of America Certification Corporation",
          what: "Five years of verifiable pest management experience, a current US applicator licence and an exam. An individual credential owners often hold or encourage, because it signals technical depth to customers.",
          url: "https://entocert.org/ace"
        },
        {
          name: "OSHA Outreach Training Program (30-hour)",
          body: "US Occupational Safety and Health Administration, through authorised trainers",
          what: "Voluntary safety training aimed at supervisors and people with safety responsibilities. Not a certification and not a substitute for standard-specific training, but useful once you have employees.",
          url: "https://www.osha.gov/training/outreach"
        }
      ]
    },
    skills: [
      "Pricing work so it covers labour, vehicles, product, insurance and profit",
      "Bookkeeping and cash flow management",
      "Hiring and keeping good technicians",
      "Selling and customer service",
      "Knowing your state's licensing, record-keeping and insurance rules",
      "Delegating work you used to do yourself",
      "Saying no to unprofitable work",
      "Planning ahead: equipment, hiring and season changes"
    ],
    tools: [
      "Accounting software or a bookkeeper",
      "Service, scheduling and billing software",
      "Business bank account and payroll service",
      "Service vehicles fitted for pesticide transport",
      "Full technician equipment: sprayers, dusters, bait and monitoring devices, PPE",
      "Pesticide storage that meets label and state rules",
      "Written service agreements and price lists",
      "Insurance policies and the certificates customers ask for",
      "Record systems for pesticide applications, training and licences",
      "A business plan with start-up costs and break-even figures"
    ],
    careerPath: [
      {
        stage: "Licensed technician",
        description: "Learn the work and get licensed. Most owners from the trade start here."
      },
      {
        stage: "Certified applicator in the categories you will sell",
        description: "Get the level of certification your state requires for the person responsible for a business licence. In Texas, for example, that is a certified applicator who has passed general standards and category exams."
      },
      {
        stage: "Supervisor or manager",
        description: "Learn pricing, scheduling, hiring and the numbers on someone else's money. Many owners skip this step and wish they had not."
      },
      {
        stage: "Owner-operator",
        description: "Start a company or buy a route. You are the technician and the business at the same time. See Starting a company for your state."
      },
      {
        stage: "Owner with employees",
        description: "Hire your first technician, move off the truck, add insurance, payroll and OSHA obligations. After two years in business you can apply for QualityPro accreditation."
      },
      {
        stage: "Grow, hand on or sell",
        description: "Expand by adding routes or buying other companies, pass the company on, or sell. See the buying and selling page in the Owners section."
      }
    ],
    pay: "There is no public national figure for what pest control owners earn. BLS wage data (OEWS) excludes self-employed workers, so owner-operators are not in it, and BLS says about 5 percent of pest control workers are self-employed. What public data does show is the size of the businesses. Census Statistics of US Businesses for 2022 counts 13,603 employer firms in exterminating and pest control services, with 16,080 establishments, 139,917 employees, $7.04 billion in annual payroll and $19.56 billion in receipts. Firms with fewer than five employees (8,882 of them) averaged about $237,000 in receipts each; firms with 5 to 9 employees about $737,000; 10 to 19 employees about $1.59 million; and 20 to 99 employees about $4.67 million. These are receipts, not profit: payroll, vehicles, product, insurance, rent and taxes come out before the owner is paid. Across the industry, payroll averaged about $50,300 per employee. If you are self-employed, IRS self-employment tax adds 15.3 percent (12.4 percent Social Security and 2.9 percent Medicare) on net earnings, which an employee would split with an employer. For context on what you would pay staff, BLS reports a May 2025 median of $44,930 for pest control workers in the industry. SBA's size standard for exterminating and pest control services is $17.5 million in average annual receipts, so nearly every firm in the trade counts as a small business for federal programmes.",
    benefits: "As an owner you provide your own benefits and decide what to offer employees. For comparison, BLS's National Compensation Survey for March 2026 shows that among private industry workers in service occupations, the group pest control workers fall into, 47 percent had access to medical care benefits, 47 percent to a retirement plan and 67 percent to paid sick leave. At private establishments with 1 to 49 workers, 55 percent had access to medical care, 55 percent to retirement plans and 75 percent to paid sick leave. Those are the benchmarks your employees will compare you against. What you offer, and what it costs, is a business decision to work out with an accountant or benefits adviser.",
    goodParts: [
      "You decide how the work is done, which customers to take and what standard to hold.",
      "Recurring service agreements can build a steady, saleable business over time.",
      "The industry is mostly small firms, so small companies can compete locally.",
      "Ownership is the one role in the trade with no fixed pay ceiling.",
      "There is an established market for selling pest control companies when you are ready to exit."
    ],
    hardParts: [
      "Most new businesses do not last. BLS data shows that of private establishments in administrative and waste services opened in the year to March 2015, 82 percent were still open a year later, 52 percent after five years and 37 percent after ten.",
      "Your licence, and sometimes your personal finances, are exposed to your employees' mistakes.",
      "Early years mean long hours and doing every job yourself.",
      "Payroll, insurance and vehicle costs are due even in slow months.",
      "Hiring and keeping good technicians is a constant job.",
      "You compete against very large national companies with bigger marketing budgets."
    ],
    faq: [
      {
        q: "Can I start a pest control company without a licence?",
        a: "The company needs a state business licence and, in most states, a named certified person responsible for the work. You can own the company without being that person in many states if you employ someone who qualifies. Check Starting a company for your state."
      },
      {
        q: "How much does it cost to start?",
        a: "There is no reliable national figure. SBA recommends listing one-time costs (licences, permits, equipment, vehicles) and monthly costs (insurance, payroll, fuel, software) and working out a break-even point before you launch. State licence fees and insurance minimums are on the Starting a company pages."
      },
      {
        q: "How much do owners make?",
        a: "No public data source measures it. BLS wage data excludes the self-employed. Census data shows average receipts per firm by size, for example about $237,000 a year for firms with fewer than five employees in 2022, but receipts are not profit."
      },
      {
        q: "How many pest control companies are there?",
        a: "Census counted 13,603 employer firms in 2022 with 16,080 locations. About 94 percent had fewer than 20 employees. That count excludes one-person businesses with no payroll."
      },
      {
        q: "Should I buy an existing company or start from scratch?",
        a: "Both happen in this trade. Buying gets you customers and cash flow on day one but costs more up front; starting is cheaper but slower. The buying and selling page in the Owners section covers how deals are usually structured."
      },
      {
        q: "Can I get an SBA loan?",
        a: "SBA mostly backs loans made by participating lenders rather than lending itself, and its Lender Match tool connects businesses with those lenders. Pest control companies under $17.5 million in average annual receipts meet SBA's size standard. Eligibility and terms are set by the SBA programme and the lender."
      },
      {
        q: "When do I need to worry about OSHA paperwork?",
        a: "Every employer must report work-related fatalities, in-patient hospitalisations, amputations and loss of an eye. Once you had more than 10 employees at any time in the previous year, you must also keep OSHA injury and illness records."
      },
      {
        q: "What is QualityPro and when can I get it?",
        a: "An NPMA-endorsed accreditation for pest companies. It requires at least two years in business plus standards on insurance, hiring checks, training, vehicles and safety."
      }
    ],
    sources: [
      {
        label: "Census Bureau: 2022 SUSB Annual Data Tables by Establishment Industry",
        url: "https://www.census.gov/data/tables/2022/econ/susb/2022-susb-annual.html"
      },
      {
        label: "Census Bureau: 2022 SUSB US and state, 6-digit NAICS (data file)",
        url: "https://www2.census.gov/programs-surveys/susb/tables/2022/us_state_6digitnaics_2022.txt"
      },
      {
        label: "Census Bureau: County Business Patterns 2023, US file",
        url: "https://www2.census.gov/programs-surveys/cbp/datasets/2023/cbp23us.zip"
      },
      {
        label: "eCFR: 13 CFR 121.201, SBA size standards by NAICS code",
        url: "https://www.ecfr.gov/current/title-13/section-121.201"
      },
      {
        label: "SBA: Plan your business (startup costs and break-even point)",
        url: "https://www.sba.gov/counseling/plan-your-business/"
      },
      {
        label: "SBA: Loans (SBA-guaranteed loan programs)",
        url: "https://www.sba.gov/loans/"
      },
      {
        label: "BLS Business Employment Dynamics: Survival of private sector establishments by opening year, Administrative and Waste Services (Table 7)",
        url: "https://www.bls.gov/bdm/us_age_naics_56_table7.txt"
      },
      {
        label: "BLS Business Employment Dynamics: Survival of private sector establishments by opening year, total private (Table 7)",
        url: "https://www.bls.gov/bdm/us_age_naics_00_table7.txt"
      },
      {
        label: "BLS Occupational Outlook Handbook: Pest Control Workers",
        url: "https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm"
      },
      {
        label: "BLS OEWS May 2025, NAICS 561710: pest control workers (37-2021), annual median",
        url: "https://data.bls.gov/timeseries/OEUN000000056171037202113"
      },
      {
        label: "IRS: Self-employment tax (Social Security and Medicare taxes)",
        url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      },
      {
        label: "eCFR: 29 CFR 1904 Subpart B, Scope (recordkeeping exemptions)",
        url: "https://www.ecfr.gov/current/title-29/part-1904/subpart-B"
      },
      {
        label: "Florida Statutes 482.152: Duties of certified operator in charge",
        url: "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0482/Sections/0482.152.html"
      },
      {
        label: "EPA: Certification Standards for Pesticide Applicators",
        url: "https://www.epa.gov/pesticide-worker-safety/certification-standards-pesticide-applicators"
      },
      {
        label: "QualityPro Accreditation",
        url: "https://www.npmaqualitypro.org/available-credentials/qualitypro/"
      },
      {
        label: "QualityPro (credentials overview)",
        url: "https://www.npmaqualitypro.org/"
      },
      {
        label: "ESA Certification: Associate Certified Entomologist",
        url: "https://entocert.org/ace"
      },
      {
        label: "OSHA: Outreach Training Program",
        url: "https://www.osha.gov/training/outreach"
      },
      {
        label: "BLS National Compensation Survey: Medical care benefits, March 2026 (Table 2)",
        url: "https://www.bls.gov/news.release/ebs2.t02.htm"
      },
      {
        label: "BLS National Compensation Survey: Paid leave, March 2026 (Table 6)",
        url: "https://www.bls.gov/news.release/ebs2.t06.htm"
      }
    ],
    notes: "Deliberately does not duplicate owner-topics.ts (hiring, insurance, vehicles/hazmat, pesticide records, OSHA, buying/selling); the page should link to /trade/start/ and /trade/owners/<slug>/ (slugs: hiring-your-first-technician, business-insurance, vehicles-and-hazmat, pesticide-recordkeeping, osha-for-pest-companies, buying-and-selling-a-company). Census numbers: SUSB 2022 is employer firms only (excludes nonemployers); receipts in the file are in $1,000s. Average receipts per firm by size class are MY ARITHMETIC (receipts / firms) and the copy says 'about'. Average payroll per employee ($50,300) is also my arithmetic (7,039,610 / 139,917). 'About 36 percent of workers at 21 firms with 500+ employees' = 50,148 / 139,917. CBP 2023 (16,535 establishments, 139,150 employees, $7.44B payroll; 9,415 establishments under 5 employees) was read but not used in copy, to avoid mixing years; available if wanted. CBP legal-form codes suggest most establishments are S corporations (code Z = 10,044) but I did not verify the code key, so not used. Nonemployer Statistics 2023 US file only goes to 4-digit NAICS 5617, so I have no count of one-person pest firms. BED survival data is for the whole Administrative and Waste Services sector (NAICS 56), not pest control specifically; the copy says so. 'Very large national companies that buy smaller ones' rests on the owner-topics buying/selling page (Rollins SEC filings, FTC order) and is not re-sourced here. Texas qualifying-route details come from start-company.ts, not re-opened. SBA loan FAQ paraphrases sba.gov/loans ('Loans backed by SBA', 'SBA-guaranteed loan program', Lender Match); 'does not usually lend directly' is my framing of 'backed' loans, re-check wording. The startup-costs content (one-time vs monthly expenses, break-even) was read on sba.gov/counseling/plan-your-business/ after the old business-guide URL 301-redirected there. No source found for owner income, start-up cost ranges or owner hours; all phrased as unknowns."
  }
} /* END GUIDES */;

export const FIELD_GUIDES_UPDATED = '2026-10-01';

export function getFieldGuide(slug: string): FieldGuide | undefined {
  return FIELD_GUIDES[slug];
}
