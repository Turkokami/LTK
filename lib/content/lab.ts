import type { ReactNode } from 'react';
import { EDITOR } from '@/lib/content/editorial';

/**
 * Attribution for Lab explainers. REGISTRY R-06 — placeholder until a named reviewer exists.
 *
 * Note the difference between an EXPLAINER and a COMPARISON. An explainer is written against
 * published sources and can honestly carry a placeholder byline, the same way the state
 * regulatory pages do. A comparison asserts that somebody physically tested a product, which a
 * placeholder cannot truthfully claim. That is why COMPARISONS stays empty and TECHNOLOGY does
 * not — the gate is different because the claim is different.
 */
const EDITOR_REVIEWER = { name: EDITOR.name, path: EDITOR.path };

/**
 * lab.ts — the Lab content registry.
 *
 * DELIBERATELY EMPTY of real products. The Lab's entire value is independence, and seeding it
 * with invented test results or plausible-sounding scores would destroy that before the first
 * real review exists. Add an entry only after the product has actually been tested against
 * published criteria by a named reviewer.
 *
 * Gate: /about/review-methodology/ must be live before the first entry lands here.
 * BUILD-PLAN Phase 4.
 */

export interface Criterion {
  /** Stable key. Used as the scores map key on every product in the set. */
  key: string;
  label: string;
  /** Why this criterion exists. Published before testing, per the methodology. */
  rationale: string;
}

export interface ComparedProduct {
  slug: string;
  name: string;
  brand: string;
  /**
   * Keyed by Criterion.key. A missing key renders "Not assessable — see notes" rather than a
   * zero or a blank, because both of those silently flatter whatever we tested more thoroughly.
   */
  scores: Record<string, string | undefined>;
  /** Verified-member ratings only. Never an editorial score. See docs/SCHEMA.md. */
  memberRating?: { value: number; count: number };
}

export interface Comparison {
  slug: string;
  /** Full title, used as H1 and schema headline. */
  title: string;
  /** Short form for breadcrumbs. */
  shortTitle: string;
  category: string;
  metaDescription: string;
  /** Target query, verbatim, rendered as the QuickAnswer H2. */
  question: string;
  /** 40-60 words, self-contained. */
  answer: ReactNode;
  /** One hard fact: a number, a date, a measured result. */
  hardFact?: ReactNode;
  criteria: Criterion[];
  products: ComparedProduct[];
  verdict: ReactNode;
  /** ISO date. Equals schema dateModified and the visible tested-on line. */
  testedOn: string;
  reviewer: { name: string; path: string; credential?: string };
}

/** REGISTRY R-06 + Phase 4. Empty until real testing has happened. */
export const COMPARISONS: Comparison[] = [];

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

/* ------------------------------------------------------------------ technology explainers */

export interface TechnologyTopic {
  slug: string;
  name: string;
  /** Answer-first definition. 40-60 words, standalone. */
  definition: ReactNode;
  /** Where it genuinely fits. */
  fits: string[];
  /** Where it does not. A stated position — Keystone 6.5 citability signal 3. */
  doesNotFit: string[];
  /** Outbound primary-authority citation in visible text — citability signal 2. */
  sources: { label: string; url: string }[];
  reviewer: { name: string; path: string; credential?: string };
  verifiedOn: string;
}

/**
 * Phase 4: 25 explainers. Written against sources, not manufacturer marketing.
 *
 * The rule for every entry: `doesNotFit` must be as specific as `fits`, and must be sourced.
 * An explainer that only says where something works is a brochure with a byline on it.
 */
export const TECHNOLOGY: TechnologyTopic[] = [
  {
    slug: 'remote-rodent-monitoring',
    name: 'Remote rodent monitoring',
    definition:
      'Sensors fitted to traps or bait stations that report activity over a wireless network, so ' +
      'a device reports itself instead of waiting to be checked. It changes when you learn about ' +
      'rodent activity and where you send labour. It does not, by itself, kill or exclude ' +
      'anything.',
    fits: [
      'Large commercial and food-handling sites where checking every device on a route consumes ' +
      'most of the service visit, and the sensors let a technician go to the three stations that ' +
      'registered activity instead of all ninety.',
      'Closing the gap between an event and a response. Traditional programmes discover activity ' +
      'at the next scheduled inspection, which can be days or weeks after the fact.',
      'Producing a dated activity record for audit-driven accounts, where the question is not ' +
      'only whether the site is clean but whether you can evidence it over time.',
      'Live-capture programmes with a welfare or legal obligation to clear traps promptly, where ' +
      'the interval between capture and clearance is the actual problem being solved.',
    ],
    doesNotFit: [
      'As a control method. Monitoring is a detection layer. In the vendor pilot most often ' +
      'cited for this technology, the activity declines followed technicians acting on the ' +
      'data — inspecting the flagged areas, finding the entry points and sealing them. The ' +
      'sensors found the problem; exclusion fixed it. Any pitch that treats the sensor itself as ' +
      'the intervention is selling you the dashboard, not the outcome.',
      'Where false triggers cost more than missed ones. Manufacturers document this in their own ' +
      'patent filings: traps fire on water and on non-target species such as insects, and a ' +
      'rodent that enters at the wrong orientation can trigger the device and escape. Each false ' +
      'alert sends someone to a trap that did not catch anything — the exact labour the system ' +
      'was bought to save.',
      'As a replacement for inspection. A sensor reports its own device and nothing else. It ' +
      'cannot see the gap under the loading dock door, the harbourage behind the pallets, or the ' +
      'rub marks along a wall. Sites that cut inspection time because "the sensors cover it" end ' +
      'up with a well-instrumented infestation.',
      'Where the existing device fleet is young. Full sensor-equipped replacement means writing ' +
      'off traps with years of service left; retrofit kits exist precisely because that cost ' +
      'stops most conversions. Price the retrofit path before the rip-and-replace quote.',
      'Species identification. Most deployed systems report that SOMETHING triggered the device, ' +
      'not what. Image recognition to classify the intruder is named as future work in the ' +
      'published research, not a shipped capability.',
    ],
    sources: [
      {
        label:
          'Insect pest monitoring with camera-equipped traps: strengths and limitations — Journal of Pest Science (2020)',
        url: 'https://link.springer.com/article/10.1007/s10340-020-01309-4',
      },
      {
        label: 'A Remote Monitoring System for Rodent Infestation Based on LoRaWAN — Sensors (PMC10180839)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10180839/',
      },
      {
        label:
          'US Patent 11,219,204 — Electronic rodent trap with remote monitoring capability (documents false triggering and escape on mis-orientation)',
        url: 'https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11219204',
      },
      {
        label:
          'US Patent 11,602,144 — System and method for retrofitting rodent traps for remote monitoring (documents the fleet-replacement cost problem)',
        url: 'https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11602144',
      },
    ],
    reviewer: EDITOR_REVIEWER,
    verifiedOn: '2026-09-23',
  },
  {
    slug: 'ai-pest-identification',
    name: 'AI pest identification',
    definition:
      'Software that names a pest from a photograph, usually a convolutional neural network ' +
      'trained on labelled insect images. Accuracy claims above 95% are common and are usually ' +
      'true — of the conditions they were measured in. Field conditions are not those ' +
      'conditions, and the gap is where the buying decision lives.',
    fits: [
      'Triage and pre-sorting, where the job is reducing a large pile of images down to the ones ' +
      'a human should actually look at. Volume reduction is a real saving even at imperfect ' +
      'accuracy, because the cost of a mistake is a second look rather than a wrong treatment.',
      'Fixed imaging rigs with controlled lighting and a small, known species list. The published ' +
      '96%-plus results for stored-product species were achieved on top-down images of five ' +
      'known beetles — that is a realistic description of a mill or warehouse monitoring station, ' +
      'and a poor description of a crawlspace.',
      'Stretching scarce taxonomic expertise. Manual morphological identification needs wing ' +
      'venation and body segmentation read under a microscope by someone trained to do it, and ' +
      'there are not enough of those people. DNA barcoding is accurate but too costly and ' +
      'logistically awkward for routine field volume.',
      'Surveillance programmes where the output is a trend line rather than a verdict on one ' +
      'specimen — mosquito sorting and similar high-count, low-stakes-per-image work.',
    ],
    doesNotFit: [
      'Anywhere the answer is legally or commercially binding. A WDO report, a quarantine call, ' +
      'or an invasive-species determination is not a place for a probabilistic guess with no ' +
      'stated reasoning. CNNs are black boxes — the published work reaches for Grad-CAM ' +
      'visualisation specifically because the model cannot say why it decided what it decided.',
      'Species that look like each other. Inter-species similarity is the named hard problem: ' +
      'published work uses Prodenia litura and the meadow moth as the standing example of two ' +
      'species that are strikingly similar externally. If your two candidate species are the ' +
      'ones that matter commercially, similarity is exactly the case the model handles worst.',
      'Life stages. Intra-species variability across adult, pupa, larva and egg is as large as ' +
      'the difference between some species. A model trained on adults is not a model that ' +
      'identifies what you actually find in an inspection.',
      'Small or dark specimens, and cluttered real-world images. Where average accuracy is ' +
      'quoted at 96%, per-class accuracy on a large field benchmark tells a different story: ' +
      'Miridae 42%, aphids 48% — driven by small size, varied appearance and high intra-class ' +
      'variance. THE AVERAGE HIDES THE FAILURES, and the classes it fails on are not random.',
      'Any system that always returns an answer. The best published practice is a model that ' +
      'REFUSES to predict on low-resolution, blurred or confusing images, precisely because ' +
      'misclassifying an unseen invasive species as something benign is the catastrophic ' +
      'outcome. Ask a vendor what their tool does when it does not know. If the answer is that ' +
      'it always gives its best guess, that is a defect being sold as a feature.',
    ],
    sources: [
      {
        label: 'InsectNet: real-time identification of insects using an end-to-end ML pipeline — PNAS Nexus (2024)',
        url: 'https://academic.oup.com/pnasnexus/article/4/1/pgae575/7933354',
      },
      {
        label: 'Deep learning based agricultural pest monitoring and classification — Scientific Reports (2025), per-class accuracy on IP102',
        url: 'https://www.nature.com/articles/s41598-025-92659-5',
      },
      {
        label: 'Identifying common stored product insects using automated deep learning methods — Journal of Stored Products Research (2023)',
        url: 'https://www.sciencedirect.com/science/article/abs/pii/S0022474X23000929',
      },
      {
        label: 'A structured literature review of computer vision methods for insect identification (PMC13424446)',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC13424446/',
      },
    ],
    reviewer: EDITOR_REVIEWER,
    verifiedOn: '2026-09-23',
  },
  {
    slug: 'thermal-remediation',
    name: 'Thermal remediation',
    definition:
      'Heating a structure or its contents until the pests inside die — typically circulating ' +
      'air at 55–65°C for six to eight hours to drive object temperatures above 50°C. It kills ' +
      'every life stage, leaves no residue, and leaves no residual protection either. The ' +
      'treatment ends the moment the heaters go off.',
    fits: [
      'Infestations where every life stage must die in one visit. Heat reaches eggs, which is ' +
      'the thing most chemical programmes struggle with and the reason heat became mainstream.',
      'Places and objects insecticides cannot go — electronics, sensitive accounts, occupants ' +
      'with chemical sensitivities, and items that cannot be treated any other way.',
      'Accounts where occupant preparation is the failure point. Heat needs far less prep than a ' +
      'chemical programme, and occupants asked to bag and disinfest their own belongings are a ' +
      'documented source of treatment failure because the work needs a level of attention to ' +
      'detail they rarely apply.',
      'Situations needing immediate relief and a defensible single-visit result, where the value ' +
      'is as much in the occupant experience as the entomology.',
    ],
    doesNotFit: [
      'ANY PROGRAMME THAT TREATS 113°F / 45°C AS THE FINISH LINE. That figure is an adult number ' +
      'from lab exposure, and it is the number the sales material quotes. Measured under ' +
      'conditions characteristic of commercial whole-room work, LTemp99 for adults is 48.3°C — ' +
      'and for EGGS it is 54.8°C. Eggs survived SEVEN HOURS at 45°C. A job called finished ' +
      'because the sensors read 113°F has killed the adults and left the next generation.',
      'Rooms where lethal temperature cannot be held inside the harborage rather than in the ' +
      'air. Air at 55–65°C does not mean 55°C inside a wall void, a mattress seam or a packed ' +
      'cupboard, and the insulative mass of the contents decides the real exposure. Failure ' +
      'here is the single most documented cause of bed bugs surviving heat.',
      'Structures the pests can walk out of. Bed bugs detect and orient toward heat sources from ' +
      '10–30mm away, so they actively respond to a rising gradient by moving — into cooler ' +
      'voids, adjoining units, and back afterwards. Escape to cooler areas is the second ' +
      'documented survival route, and it is an argument about the building, not the equipment.',
      'Anywhere reinfestation pressure is continuous. Heat leaves NO residual whatsoever. In a ' +
      'multi-unit building with untreated neighbours, a perfect heat treatment can be reinfested ' +
      'the same week, and the customer will call it a failure.',
      'Contents that cannot take it. Temperature-sensitive items are damaged at treatment ' +
      'temperatures, and the liability is yours.',
      'As something a customer can improvise. Wrapping an infested mattress in black plastic and ' +
      'leaving it in the sun was tested and does not provide thermal control. Worth knowing ' +
      'because customers try it, then call you after the bugs have dispersed.',
    ],
    sources: [
      {
        label:
          'Temperature and Time Requirements for Controlling Bed Bugs under Commercial Heat Treatment Conditions (PMC4553552) — source of the 48.3°C adult and 54.8°C egg figures',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4553552/',
      },
      {
        label:
          'Bed bugs exhibit limited ability to develop heat resistance — PLOS One (2019). Documents the three routes to survival, and finds resistance is NOT one of the likely ones.',
        url: 'https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0211677',
      },
      {
        label: 'Ohio State University — Bed Bug Control: Heat and Cold, research reference collection',
        url: 'https://u.osu.edu/bedbugs/research-refs/bed-bug-control/bed-bug-control-heat-and-cold/',
      },
      {
        label: 'Virginia Department of Agriculture and Consumer Services — Using Heat to Kill Bed Bugs',
        url: 'https://www.vdacs.virginia.gov/pdf/bb-heat1.pdf',
      },
    ],
    reviewer: EDITOR_REVIEWER,
    verifiedOn: '2026-09-23',
  },
  {
    slug: 'automated-bait-stations',
    name: 'Automated and self-resetting bait stations',
    definition:
      'Devices that dispatch rodents repeatedly without a technician resetting them — CO2-powered ' +
      'self-resetting traps that clear their own carcass, and bait stations with automated ' +
      'dispensing or reporting. The pitch is fewer service visits per kill. The evidence says ' +
      'that is true, and that what the device tells you about the population is not.',
    fits: [
      'Sites where toxicant use is restricted, banned, or commercially unacceptable. This is the ' +
      'strongest case and it is getting stronger: EPA\'s 2022 registration review proposed ' +
      'classifying all second-generation anticoagulant products as restricted-use, and British ' +
      'Columbia banned SGARs outright in January 2023. A non-toxicant device carries no secondary ' +
      'contamination risk at all.',
      'Remote and low-frequency-service locations, where the economics turn on how rarely someone ' +
      'has to drive there. Self-resetting and self-clearing design plus a long-life lure that ' +
      'stays attractive for four to six months is a genuinely different service model.',
      'Rat pressure specifically. In the Hawaii field trial, trapping reduced RAT abundance — and ' +
      'did not reduce mouse abundance. Species matters more than the brochure suggests.',
      'Programmes where a rodenticide has stopped working. Anticoagulant resistance is genetic and ' +
      'documented (VKORC1, the Y139C mutation in Norway rats); a mechanical kill is indifferent to ' +
      'it.',
    ],
    doesNotFit: [
      'AS A MEASURE OF THE POPULATION. This is the finding that should change how you sell them: ' +
      'behavioural studies show rats and mice repeatedly visit and pass by self-resetting traps ' +
      'far more often than they trigger them. Kill count is not activity. A device reporting two ' +
      'kills on a site with heavy traffic is not telling you the pressure is low — it is telling ' +
      'you what it managed to catch.',
      'Where you need to know what you killed. Carcasses are ejected and then scavenged, which is ' +
      'why carcass-persistence research exists at all — to help users account for target and ' +
      'NON-TARGET kills nobody observed. In Hawaii, A24s unintentionally killed endangered birds, ' +
      'prompting development of bird-excluder attachments. Mongoose and francolin have also been ' +
      'killed during rat operations.',
      'Mouse-dominant infestations, on current evidence. The same trial that suppressed rats ' +
      'showed no reduction in mice.',
      'As a substitute for exclusion. Removing individuals from a site with an open entry point is ' +
      'a subscription, not a solution — the device works forever precisely because the problem ' +
      'does.',
      'Anywhere rodents have already been trapped or baited badly. Rodent neophobia produces ' +
      'trap-shyness and low bait acceptance, and rodents learn from conspecifics — an animal that ' +
      'witnesses distress at a location is less likely to approach it afterwards. A botched first ' +
      'attempt makes every later device on that site work worse, whatever the technology.',
      'As an automatic upgrade over baiting. In the Hawaii work, adding a broadcast anticoagulant ' +
      'after trapping did NOT further reduce the rat population (P = 0.139). More intervention is ' +
      'not reliably more control, and that cuts both ways.',
    ],
    sources: [
      {
        label:
          'Introduction to Goodnature A24 self-resetting traps — Management of Biological Invasions 13(3), editorial summarising the special issue (visit-versus-trigger behaviour, non-target kills, carcass persistence)',
        url: 'https://www.reabic.net/journals/mbi/2022/3/MBI_2022-A24_Editorial.pdf',
      },
      {
        label:
          'Effectiveness of Snap and A24-automated Traps and Broadcast Anticoagulant Bait in Suppressing Commensal Rodents in Hawaii — Human–Wildlife Interactions',
        url: 'https://digitalcommons.unl.edu/hwi/503/',
      },
      {
        label:
          'Anticoagulant Rodenticide Scientific Review, Final Report — Commonwealth of Massachusetts (EPA registration review status and bait station requirements)',
        url: 'https://www.mass.gov/doc/anticoagulant-rodenticides-scientific-review-final-report/download',
      },
      {
        label:
          'Efficacy of brodifacoum with cholecalciferol in Y139C-resistant Norway rats (PMC9948778) — documents genetic anticoagulant resistance',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9948778/',
      },
    ],
    reviewer: EDITOR_REVIEWER,
    verifiedOn: '2026-09-23',
  },

  {
    slug: 'insect-monitoring-networks',
    name: 'Insect monitoring networks',
    definition:
      'Traps and sensors that count or photograph insects and send the data off site: camera ' +
      'sticky traps, pheromone traps with electronic counters, acoustic probes in grain, and ' +
      'circuit sensors in termite stations. They report what reached the device, and when. ' +
      'They do not tell you how many insects are in the building.',
    fits: [
      'Large stored-product facilities where reading dozens of traps is the labour cost. The ' +
      'published case for camera-equipped traps is continuous, simultaneous records from many ' +
      'traps with little labour, and remote checks that cut site visits.',
      'Bulk grain where the problem is hidden inside the kernel. Acoustic systems can detect ' +
      'larvae feeding inside grain, and immature insects there may outnumber the adults a ' +
      'surface trap would ever catch.',
      'Seeing a rebound after a fumigation, not just a single count. In the flour-mill work, ' +
      'manual trap counts climbed again within a few weeks of fumigation, a sign that beetles ' +
      'had survived or moved back in. Our read: a network that reports daily would surface that ' +
      'kind of rebound as it starts, instead of at the next service visit.',
      'Termite stations at sites that are hard to reach. A datalogged circuit sensor can check ' +
      'every few hours for termites breaking a circuit, so the monthly visit goes to the stations ' +
      'that have activity.',
    ],
    doesNotFit: [
      'As a population estimate. The flour-mill researchers say it directly: trapping is a ' +
      'relative tool, and only direct sampling of the commodity or space measures the ' +
      'population. An electronic counter makes the trap catch more precise. It does not change ' +
      'what a trap catch is.',
      'Dusty or heavily cleaned plants, unless someone still services the traps. In the same ' +
      'mills, trap oil reservoirs were so full of flour dust they could not have killed any ' +
      'insects, and areas cleaned daily with compressed air caught far fewer beetles than areas ' +
      'cleaned weekly. A sensor on a trap full of dust reports a true zero for that trap, and ' +
      'nothing at all about the mill.',
      'Long deployments with no one checking the sensors themselves. In the first computerised ' +
      'termite-monitoring field test, wooden sensors failed after about 4.4 months with no ' +
      'termites present, and accuracy six months after installation fell to 41-79%. A later ' +
      'polyethylene sensor lasted 11.7 months on average. Ask the vendor for field data on how ' +
      'long their sensor lasts before you trust a quiet dashboard.',
      'Acoustic monitoring in noisy plants, or on a tight budget. Researchers still list telling ' +
      'insect sounds apart from background noise as unsolved, and say costs have been hard to ' +
      'bring down. Sound rates vary so much between insects that estimating density takes a large ' +
      'number of samples.',
      'Camera traps sold as fit-and-forget. The main review of camera-equipped traps names high ' +
      'cost, short battery life and poor image quality on some prototypes as limitations, and ' +
      'says fully automated pest detection still needs work. Budget for someone to check the ' +
      'images.',
    ],
    sources: [
      {
        label:
          'Insect pest monitoring with camera-equipped traps: strengths and limitations — Journal of Pest Science (2020), repository record',
        url: 'https://orbi.uliege.be/handle/2268/261623',
      },
      {
        label:
          'Automated Applications of Acoustics for Stored Product Insect Detection, Monitoring, and Management — Insects (2021), PMC8003406',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8003406/',
      },
      {
        label:
          'Trapping Tribolium castaneum and Other Beetles in Flourmills: Evaluating Fumigation Efficacy and Estimating Population Density — Insects (2021), PMC7915626',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7915626/',
      },
      {
        label:
          'A Computerized System for Remote Monitoring of Subterranean Termites near Structures — Journal of Economic Entomology (2001)',
        url: 'https://academic.oup.com/jee/article-abstract/94/6/1518/2217547',
      },
      {
        label:
          'Dimensionally Stable Sensors for a Continuous Monitoring Program to Detect Subterranean Termite Activity — Journal of Economic Entomology (2002)',
        url: 'https://complete.bioone.org/journals/journal-of-economic-entomology/volume-95/issue-5/0022-0493-95.5.975/Dimensionally-Stable-Sensors-for-a-Continuous-Monitoring-Program-to-Detect/10.1603/0022-0493-95.5.975.short',
      },
    ],
    reviewer: EDITOR_REVIEWER,
    verifiedOn: '2026-09-25',
  },
  {
    slug: 'drone-and-pole-camera-inspection',
    name: 'Drone and pole-camera inspection',
    definition:
      'Cameras used to see places a technician cannot easily reach: small drones for roofs and ' +
      'high eaves, pole cameras for nests and soffits, and borescopes pushed through a drilled ' +
      'hole into wall voids. They find places worth checking. ' +
      'They do not confirm what is there, and a drone flown for business needs an FAA-certificated ' +
      'pilot.',
    fits: [
      'Rooftop surveys across many buildings, where getting up there is most of the cost. In a ' +
      'two-year municipal study, drones surveyed 4,700 rooftops for water-holding containers at ' +
      'an average of 22.2 minutes per 100 rooftops, and cut field workload by 67.7% compared ' +
      'with traditional inspection.',
      'Checking whether a nest is in use before anyone removes it. Federal guidance defines an ' +
      'in-use nest as one with viable eggs or nestlings, and puts the job of confirming that on ' +
      'the person destroying it. A pole camera that sees into the cup gives you that check ' +
      'without a ladder.',
      'Wall voids with little insulation or clutter, checked by an experienced inspector, where ' +
      'the infestation is big enough to leave pellets or dead alates. That is the specific ' +
      'situation the drywood-termite borescope trial found it useful for.',
      'Tall structures. Part 107 caps altitude at 400 feet above ground, but allows higher flight ' +
      'within a 400-foot radius of a structure, up to 400 feet above its highest point. That is ' +
      'the rule that makes high-rise facade and roof-edge work possible.',
    ],
    doesNotFit: [
      'As confirmation. In the rooftop study the drone found containers; it could not show ' +
      'whether they held larvae, and ground crews had to check. Roof structures, vegetation and ' +
      'obstructions also meant small or hidden containers were likely missed. The image tells ' +
      'you where to go, not what you will find.',
      'Borescope inspection as the only basis for a termite finding. Overall identification ' +
      'accuracy in the trial was 80.6%, but individual inspectors in the simulated field ranged ' +
      'from 35.7% to 78.6%. Several fell below 50% where voids held insulation, and the test ' +
      'samples included seeds, sugar and sand chosen because they look like pellets. The authors ' +
      'say it should not be relied on alone.',
      'A technician with a drone and no Remote Pilot Certificate. The FAA requires one to fly ' +
      'under Part 107. Getting it means being at least 16, passing the FAA knowledge test and ' +
      'clearing a TSA security check. Keeping it means completing online recurrent training every ' +
      '24 calendar months. Without it, the inspection flight is not a legal commercial operation.',
      'Solo flights to the far side of a roof. Part 107 requires the pilot or a visual observer ' +
      'to keep the drone in sight, without aids other than corrective lenses, for the whole ' +
      'flight. If the ridge blocks your view, you need a second person or an FAA waiver, not a ' +
      'better camera.',
      'Treating a camera view of a nest as clearance to remove it. The same federal guidance ' +
      'warns that nesting behaviour can make it hard to tell whether a nest is in use, especially ' +
      'for colonial, burrowing and secretive species. Eagle nests and nests of species also listed ' +
      'under the Endangered Species Act stay protected even when inactive.',
    ],
    sources: [
      {
        label: 'Become a Certificated Remote Pilot — Federal Aviation Administration',
        url: 'https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot',
      },
      {
        label: '14 CFR Part 107 — Small Unmanned Aircraft Systems (§107.31 visual line of sight, §107.51 operating limitations) — eCFR',
        url: 'https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107',
      },
      {
        label:
          'Unmanned Aerial Vehicle Surveillance of Rooftop Aedes Breeding Sites Before Dengue Season, Dongguan, 2024–2025 — China CDC Weekly (2026), PMC13056549',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13056549/',
      },
      {
        label:
          'Borescope-Aided Inspection May Be Useful in Some Drywood Termite Detection Situations — Forest Products Journal (2014)',
        url: 'https://ucanr.edu/sites/default/files/2015-07/216853.pdf',
      },
      {
        label:
          'Migratory Bird Permit Memorandum MBPM-2-02: Authorizations to take migratory bird nests and contents — U.S. Fish & Wildlife Service (2025)',
        url: 'https://www.fws.gov/sites/default/files/documents/2025-01/mbpm-2-nest-memorandum-2025.pdf',
      },
    ],
    reviewer: EDITOR_REVIEWER,
    verifiedOn: '2026-09-25',
  },
  {
    slug: 'rnai-and-biologicals',
    name: 'RNAi pesticides and biological controls',
    definition:
      'Two groups of actives that work through biology rather than broad nerve toxicity. RNA ' +
      'interference products are double-stranded RNA that shuts off one essential gene in the ' +
      'target pest. Biologicals are living or natural agents, such as Bti bacteria against ' +
      'mosquito larvae and Beauveria fungus against bed bugs. Both act narrowly, and both have ' +
      'hard limits.',
    fits: [
      'Mosquito larvae in standing water where non-target exposure matters. EPA describes Bti as ' +
      'a soil bacterium whose toxins affect only the larvae of mosquitoes, black flies and fungus ' +
      'gnats. EPA also reports minimal toxicity to honey bees, none to people, and no documented ' +
      'resistance to Bti as a larvicide.',
      'Bed bug programmes that need a residual barrier with a different mode of action. Beauveria ' +
      'spores are applied as bands that bugs walk across on their way to a host. In lab testing ' +
      'over residues of 22 insecticides, bed bug kill seven weeks after application was not ' +
      'harmed overall, even where the residues cut spore viability.',
      'Knowing what the first registered RNAi spray actually covers. EPA registered ledprona in ' +
      'December 2023 for three years. It is a sprayable double-stranded RNA that kills Colorado ' +
      'potato beetle by silencing the gene for one protein, PSMB5. EPA found no risk of concern ' +
      'to human health or the environment, including listed species.',
      'Resistance-management planning. EPA gives resistance management as one reason it supports ' +
      'the technology, because a gene-silencing active does not share a mode of action with ' +
      'conventional insecticides.',
    ],
    doesNotFit: [
      'Assuming RNAi cannot be resisted. Researchers selected a Colorado potato beetle population ' +
      'in about nine rounds of selection that survived more than 11,100 times the dose that killed ' +
      'susceptible beetles. The resistance also covered a second, different dsRNA target, which ' +
      'means it blocks the RNAi mechanism in general, not just one gene. Rotating to another dsRNA ' +
      'may not help.',
      'Structural or urban use today. The registered RNAi spray is labelled for Colorado potato ' +
      'beetle on potatoes, and the label is the law. A structural RNAi product is something to ' +
      'watch for, not something you can buy and apply.',
      'Fungal biocontrol of subterranean termites. In 50 years of attempts, mostly with ' +
      'Metarhizium, no successful field use has been reported. Colonies eat infected nestmates ' +
      'when deaths are low and bury them when deaths are higher, so the fungus never produces ' +
      'spores. Overwhelming that took spore densities two to three orders of magnitude above what ' +
      'occurs naturally in soil.',
      'Adult mosquito complaints. Bti works only on larvae that eat it in the water. It does ' +
      'nothing to the adults biting the customer tonight.',
      'Fungal barriers on bare wood, or over old DIY sprays, if you expect them to keep working. ' +
      'Spore germination on wood fell to 29% by seven weeks, compared with 64–69% on fabric. ' +
      'Residues of 12 of the 22 insecticides tested significantly reduced spore viability at five ' +
      'weeks.',
    ],
    sources: [
      {
        label: 'EPA Registers Novel Pesticide Technology for Potato Crops — U.S. EPA (2023)',
        url: 'https://www.epa.gov/pesticides/epa-registers-novel-pesticide-technology-potato-crops',
      },
      {
        label: 'Bti for Mosquito Control — U.S. EPA',
        url: 'https://www.epa.gov/mosquitocontrol/bti-mosquito-control',
      },
      {
        label:
          'Selection for high levels of resistance to double-stranded RNA (dsRNA) in Colorado potato beetle using non-transgenic foliar delivery — Scientific Reports (2021), PMC7985369',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7985369/',
      },
      {
        label:
          'When Subterranean Termites Challenge the Rules of Fungal Epizootics — PLOS One (2012), PMC3314638',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3314638/',
      },
      {
        label:
          'Effects of Chemical Insecticide Residues and Household Surface Type on a Beauveria bassiana-Based Biopesticide for Bed Bug Management — Insects (2021), PMC7998477',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7998477/',
      },
    ],
    reviewer: EDITOR_REVIEWER,
    verifiedOn: '2026-09-25',
  },
  {
    slug: 'digital-service-records',
    name: 'Digital service records',
    definition:
      'Software that records each service visit electronically: products and amounts applied, ' +
      'device checks, pest sightings and site maps, which the office and the client can then ' +
      'pull up. It can make regulatory and audit records complete and searchable. It does not ' +
      'set what a record must contain. Your state and the client\'s audit scheme do that.',
    fits: [
      'Restricted-use applications, where required fields can be made mandatory. Federal rules ' +
      'require state plans to make certified commercial applicators keep restricted-use records ' +
      'for at least two years. The required fields include customer, location, area treated, ' +
      'site, time and date, product, EPA registration number, amount per location, and the ' +
      'applicator\'s certification number.',
      'Food-plant accounts that have to show trends. The SQF Food Manufacturing code requires the ' +
      'pest programme to record sightings and trend pest activity to target applications, and to ' +
      'measure effectiveness and identify trends. That is hard to do from a stack of paper ' +
      'tickets.',
      'Keeping the device map current. SQF requires the site map to show the identification, ' +
      'location, number and type of every pest control and monitoring device. When devices are ' +
      'recorded at each check, the map changes with the account.',
      'Long retention periods and fast retrieval. Minnesota requires structural application ' +
      'records to be kept for five years. SQF requires records to be readily accessible, ' +
      'retrievable and securely stored against loss or unauthorised access.',
    ],
    doesNotFit: [
      'As proof of compliance on its own. The federal restricted-use list is a minimum that states ' +
      'must meet or exceed. Minnesota\'s structural record adds the target pest, and temperature ' +
      'and exposure time for fumigations. It must be completed within five days of application. ' +
      'A national template that does not match your state\'s fields produces a tidy record that is ' +
      'still missing required fields.',
      'Records the technician did not actually confirm. SQF requires records to be confirmed by ' +
      'the person doing the monitoring. Federal rules require states to be able to suspend or ' +
      'revoke certification for falsified records. Pre-filled "no activity" entries and ' +
      'copy-forward visit notes are exactly what an auditor or an inspector will test.',
      'Replacing what has to happen at the site. In a rented apartment, Minnesota requires the ' +
      'applicator to post a list of the label\'s post-application precautions in a conspicuous ' +
      'place inside the unit. SQF requires contractors to report to a responsible authorised ' +
      'person on arrival and after the work. A PDF emailed to the office covers neither.',
      'Platforms where the records cannot leave with the account. SQF retention follows customer, ' +
      'legal and regulatory requirements, with the product\'s shelf life as the minimum. State ' +
      'retention can run to five years. If you cannot export the full history in a usable format ' +
      'when you change software, or when the client changes contractor, the records are not ' +
      '"readily accessible" when an audit asks for them.',
    ],
    sources: [
      {
        label:
          '40 CFR 171.303 — Requirements for State certification plans (restricted-use pesticide recordkeeping) — eCFR',
        url: 'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-171/subpart-D/section-171.303',
      },
      {
        label: 'Minnesota Statutes §18B.37 — Pesticide application records — Minnesota Office of the Revisor of Statutes',
        url: 'https://www.revisor.mn.gov/statutes/cite/18b.37',
      },
      {
        label:
          'SQF Food Safety Code: Food Manufacturing, Edition 9 (2.2.3 Records; 11.2.4 Pest Prevention) — SQFI (check for a newer edition before an audit)',
        url: 'https://www.sqfi.com/docs/sqfilibraries/code-documents/edition-9/code-pdfs/20227fmin_foodmanufacturing_v3-2-final-w-links.pdf?sfvrsn=7f70c75a_8',
      },
    ],
    reviewer: EDITOR_REVIEWER,
    verifiedOn: '2026-09-25',
  },
];

export function getTechnology(slug: string): TechnologyTopic | undefined {
  return TECHNOLOGY.find((t) => t.slug === slug);
}

/**
 * The 25 categories to write, in priority order. Priority is set by purchase value and by how
 * bad the current independent coverage is — both of which point at monitoring first.
 *
 * SCOPING NOTE, added after writing `remote-rodent-monitoring`:
 *
 * `sensor-networks` must be written as the INFRASTRUCTURE layer, not a second monitoring
 * explainer. Rodent monitoring is the application; sensor networks is what it runs on —
 * network type and coverage, gateway dependency, battery life and replacement cost at scale,
 * and the one nobody writes about: WHO OWNS THE DATA and what happens to three years of
 * activity history when you change vendor. That last question is the commercially dangerous
 * one and it is absent from every vendor page.
 *
 * Written as currently listed, it would substantially duplicate `remote-rodent-monitoring`.
 * Two thin overlapping pages are worse than one good one — for readers and for the site's
 * standing with search engines. Do not write it until it can be written as the layer below.
 */
export const TECHNOLOGY_BACKLOG = [
  'remote-rodent-monitoring',
  'sensor-networks',
  'ai-pest-identification',
  'automated-bait-stations',
  'thermal-remediation',
  'electronic-monitoring-compliance',
  'drone-and-pole-camera-inspection',
  'rnai-and-biological-actives',
  'route-optimisation',
  'moisture-and-wdo-detection',
  'canine-detection',
  'fumigation-monitoring',
] as const;
