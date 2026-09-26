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

  {
    slug: 'exclusion-materials',
    name: 'Rodent exclusion materials',
    definition:
      'Physical materials used to close the gaps rodents use to enter a building: metal wools and ' +
      'meshes, hardware cloth, sheet metal, concrete, and the sealants and door hardware around ' +
      'them. What decides whether a repair holds is gauge, mesh size and a hard, flat surface ' +
      'with no edge to bite. Foam, rubber, vinyl and plastic do not stop gnawing.',
    fits: [
      'Holes sized to the animal. Rats can get through any opening wider than 1/2 inch, and mice ' +
      'through anything wider than 1/4 inch. A pencil or ball-point pen (3/16 to 3/8 inch across) ' +
      'is a quick gauge: if it fits, a mouse can get in. Measure the gap before you choose the ' +
      'material.',
      'Hardware cloth that matches the target species. The published specification is woven ' +
      '19-gauge, 1/2 x 1/2-inch mesh to exclude rats and 24-gauge, 1/4 x 1/4-inch mesh to exclude ' +
      'mice. Use woven or welded cloth. Cloth that is neither breaks easily, while woven or ' +
      'welded cloth keeps its shape when cut to fit around pipes. Holes 3 inches or more across ' +
      'should be backed with 1/4-inch cloth before patching.',
      'Galvanized sheet metal and concrete where gnawing pressure is high. The same specification ' +
      'calls for 24-gauge or heavier galvanized sheet for wall and pipe barriers, 22-gauge or ' +
      'heavier for kick plates and door edging, and 14-gauge for perforated grills. Concrete ' +
      'should be at least 2 inches thick if reinforced and 3 3/4 inches if not. Rodent incisors ' +
      'curve slightly inward, so a flat, hard surface is difficult to start on.',
      'Copper or stainless steel wool packed into small gaps. For openings under 3/4 inch that ' +
      'cannot be closed any other way, Nebraska Extension says to wedge copper or stainless steel ' +
      'wool tightly into the gap. For a long-term repair, work a quick-drying patching plaster ' +
      'into the copper wad before pushing it in, then smooth the outside over.',
      'Doors, which are among the most common entry points. The gap between the door bottom and ' +
      'the threshold should not exceed 1/4 inch. On softwood doors, fit metal flashing or a metal ' +
      'channel to the lower edge, finished to within 1/8 inch of the edge at the sides and bottom.',
    ],
    doesNotFit: [
      'Foam as the barrier. UC IPM lists insulating (expanding) foam among the materials that are ' +
      'ineffective for plugging mouse holes, alongside plastic screening, rubber, vinyl and wood. ' +
      'The federal wildlife damage handbook says spray-in-place foam and neoprene seals are not ' +
      'rodent-proof, and Nebraska Extension adds that sunlight degrades foam. CDC consumer ' +
      'guidance still suggests caulk or spray foam to hold steel wool in place. Treat foam as an ' +
      'air seal or a retainer, never as the thing stopping the rodent.',
      'Plain steel wool as a permanent repair. Every source that recommends it calls it ' +
      'temporary. UC IPM says it may rust over time, the federal handbook warns of rust stains, ' +
      'and Nebraska Extension says coarse steel wool will eventually rust. On a job you are ' +
      'warrantying, specify copper or stainless and back the patch properly.',
      'Rubber and vinyl door sweeps and weather stops on accounts with active rats. Rats and mice ' +
      'can quickly gnaw through rubber or vinyl weather stops, and the federal handbook ' +
      'photographs a large hole Norway rats chewed through a warehouse door weather strip. A ' +
      'sweep seals a gap. It does not stop gnawing unless it is protected by metal. A plastic door ' +
      'boot is only described as working where a door gets little use and its edges are hard for ' +
      'rodents to reach.',
      'Lightweight metals and screen as rodent-proofing. Rats can gnaw through lead and aluminum ' +
      'sheeting, window screen, fiberglass, plastic and low-quality concrete or concrete block. ' +
      'Aluminum flashing and insect screen have their uses, but neither is a rat barrier unless ' +
      'it meets the gauges above. On vents, go no finer than you need: small mesh screens can clog ' +
      'with dust or freeze over, and 1/2 x 1/2-inch cloth is the published compromise between ' +
      'airflow and rodent control.',
      'Metal-to-concrete details that are left to rust. Metal siding resting directly on concrete ' +
      'can rust and corrode faster, and siding should be installed with openings no wider than ' +
      '1/8 inch. An exclusion job that corrodes open at the slab line in a few seasons has only ' +
      'delayed the callback.',
    ],
    sources: [
      {
        label:
          'Rodent-Proof Construction and Exclusion Methods — Prevention and Control of Wildlife Damage, USDA APHIS Animal Damage Control / University of Nebraska (1994)',
        url: 'https://icwdm.org/wp-content/uploads/2023/04/1994RodentProofConstructionBaker.pdf',
      },
      {
        label: 'Rodent-Proof Construction — Structural (G1530) — Nebraska Extension (rev. 2009)',
        url: 'https://extensionpubs.unl.edu/publication/g1530/2003/html/view',
      },
      {
        label: 'Pest Notes: House Mouse — UC Statewide IPM Program (2025)',
        url: 'https://ipm.ucanr.edu/PMG/PESTNOTES/pn7483.html',
      },
      {
        label: 'Pest Notes: Rats — UC Statewide IPM Program (2025)',
        url: 'https://ipm.ucanr.edu/home-and-landscape/rats/pest-notes/',
      },
      {
        label: 'How to Seal Up to Prevent Rodents — Centers for Disease Control and Prevention',
        url: 'https://www.cdc.gov/healthy-pets/rodent-control/seal-up.html',
      },
    ],
    reviewer: EDITOR_REVIEWER,
    verifiedOn: '2026-09-26',
  },
  {
    slug: 'rodenticide-formulations',
    name: 'Rodenticide formulations',
    definition:
      'Rodent baits built on anticoagulants, which block vitamin K recycling so clotting fails ' +
      'and signs are delayed by days; cholecalciferol (vitamin D3), which overwhelms calcium ' +
      'regulation; or bromethalin, which stops nerve cells producing energy. Second-generation ' +
      'anticoagulants can kill from one feeding and persist in tissue, so EPA keeps them out of ' +
      'consumer products.',
    fits: [
      'First-generation anticoagulants where rodents will feed on the bait over several days. EPA ' +
      'describes warfarin-type compounds as much more toxic when feeding occurs on several ' +
      'successive days than on one day only. Second-generation compounds tend to stay in animal ' +
      'tissue longer than first-generation ones, so a multiple-feed active is the lower-residue ' +
      'choice where the programme can wait.',
      'Second-generation anticoagulants in professional programmes only. Brodifacoum, ' +
      'bromadiolone, difenacoum and difethialone are registered only for the commercial and ' +
      'structural pest control markets, in containers of at least 16 pounds of bait (8 pounds for ' +
      'agricultural buildings). EPA describes them as more likely to kill after a single ' +
      'night\'s feeding. That potency is also the reason for the restriction.',
      'Tamper-resistant stations as a label requirement, not an upgrade. Labels require ' +
      'tamper-resistant bait stations for outdoor above-ground placements and where children ' +
      'under six or pets may reach the bait. UC IPM adds nontarget mammals and birds to that list. ' +
      'Consumer products since the 2008 decision must be block or paste bait sold in a station. ' +
      'Loose pellets are not permitted.',
      'Accounts where accidental human exposure is the main worry. Anticoagulant poisoning has a ' +
      'specific antidote, phytonadione (vitamin K1). EPA\'s clinical manual warns that vitamin K3 ' +
      'and K4 do not work, and that large second-generation ingestions may need treatment for as ' +
      'long as three or four months. Bromethalin has no known antidote and treatment is ' +
      'supportive only.',
    ],
    doesNotFit: [
      'Treating secondary poisoning as theoretical. In liver samples from 43 red-tailed hawks ' +
      'admitted to a Massachusetts wildlife clinic from 2017 to 2019, every bird was positive for ' +
      'anticoagulant rodenticides, 91% carried two to four different compounds, and 14 were ' +
      'diagnosed with anticoagulant toxicosis. Brodifacoum, bromadiolone and difethialone were ' +
      'the compounds found most often. A predator that eats many poisoned rodents can build up a ' +
      'toxic dose over time.',
      'Bromethalin as the automatically "safer" swap in homes with pets and children. It is one ' +
      'of only three actives allowed in consumer bait stations, but it has no antidote. In people ' +
      'and animals it causes cerebral oedema, and EPA\'s manual lists stupor, coma and possible ' +
      'seizures. Pick the active for the exposure risk at that site, not for how it is marketed.',
      'Anywhere state law is stricter than the federal label. California now prohibits most uses ' +
      'of brodifacoum, bromadiolone and difethialone, and of the first-generation compounds ' +
      'diphacinone, chlorophacinone and warfarin. Almost all bait used in and around structures ' +
      'there must be in stations within 50 feet of a structure. A national protocol is not ' +
      'compliant in California.',
      'Assuming the federal rules are settled. EPA\'s November 2024 final biological evaluation ' +
      'covered 11 rodenticides. It found currently labelled uses likely to adversely affect 1-8% ' +
      'of listed species. Its mitigation is geographically specific and tied to application ' +
      'method (bait station, in-burrow or broadcast). It will reach you through label language, ' +
      'terms of registration or Bulletins Live! Two. Carcass searches are held back for sites ' +
      'where other measures are not practical. Check the bulletin for the county before you bait.',
      'Leaving dead and dying rodents on site. EPA\'s own reasoning for its mitigation is that ' +
      'some rodenticides stay in target animals long enough to affect the predators and ' +
      'scavengers that eat them. A baiting programme with no carcass pickup is a secondary ' +
      'exposure programme.',
    ],
    sources: [
      {
        label: 'Restrictions on Rodenticide Products — U.S. EPA (2008 risk mitigation decision; page updated 2026)',
        url: 'https://www.epa.gov/rodenticides/restrictions-rodenticide-products',
      },
      {
        label:
          'EPA Releases Rodenticide Strategy, Including Final Biological Evaluation on the Effects of 11 Rodenticides on Endangered Species — U.S. EPA (2024)',
        url: 'https://www.epa.gov/pesticides/epa-releases-rodenticide-strategy-including-final-biological-evaluation-effects-11',
      },
      {
        label:
          'Recognition and Management of Pesticide Poisonings, Chapter 18: Rodenticides — U.S. EPA (6th edition)',
        url: 'https://www.epa.gov/sites/default/files/documents/rmpp_6thed_ch18_rodenticides.pdf',
      },
      {
        label:
          'Continued Anticoagulant Rodenticide Exposure of Red-tailed Hawks in the Northeastern United States with an Evaluation of Serum for Biomonitoring — Environmental Toxicology and Chemistry (2020)',
        url: 'https://academic.oup.com/etc/article-abstract/39/11/2325/7735613',
      },
      {
        label: 'Pest Notes: Rats — UC Statewide IPM Program (2025), California anticoagulant restrictions',
        url: 'https://ipm.ucanr.edu/home-and-landscape/rats/pest-notes/',
      },
    ],
    reviewer: EDITOR_REVIEWER,
    verifiedOn: '2026-09-26',
  },
  {
    slug: 'bed-bug-heat-vs-chemical',
    name: 'Bed bug control: heat, chemical or both',
    definition:
      'Heat, residual insecticides, or both. Heat can kill every life stage in one visit, but ' +
      'survivors are common and it leaves no residual. Residual insecticides keep working after ' +
      'you leave but meet widespread pyrethroid resistance. Combined programmes use heat or other ' +
      'non-chemical methods for the kill and a residual, often a desiccant dust, for survivors.',
    fits: [
      'Heat, where every hiding place can actually be brought to temperature. The commercial ' +
      'heat study recommends at least 48°C for 71.5 minutes, or stopping only once 50°C or more ' +
      'has been reached in every place bed bugs may hide. That is a harborage temperature, not ' +
      'an air temperature.',
      'Desiccant dusts where resistance has made sprays unreliable. EPA notes that desiccants ' +
      'work by a physical mode of action, so bed bugs cannot become resistant to them the way ' +
      'they can to other modes. Use only desiccants registered and labelled for bed bugs. EPA ' +
      'warns that food-grade and pool-grade products pose an increased inhalation risk.',
      'Heat followed by a residual in the places heat reaches worst. Virginia Tech says a few ' +
      'survivors after a heat treatment are very common. It recommends residual applications at ' +
      'floor-wall junctions, voids behind drywall, closet floors, inside electrical wall sockets ' +
      'and anywhere clothing had been stacked.',
      'Non-chemical programmes that add a dust. In 21 New Jersey apartments followed for six ' +
      'months, non-chemical methods plus silica gel dust cut bed bug counts by 99% against 89% ' +
      'for non-chemical methods alone. 90% of the dusted units were down to one bed bug or none, ' +
      'against 46% of the others. The non-chemical arm used steam, vacuuming, encasements and ' +
      'interceptors, not whole-room heat.',
      'Rotating classes rather than repeating one. EPA lists seven registered chemical classes ' +
      'for bed bugs: pyrethrins, pyrethroids, desiccants, biochemicals, pyrroles, neonicotinoids ' +
      'and insect growth regulators. For resistant strains it points to switching classes or ' +
      'using combination products.',
    ],
    doesNotFit: [
      'Pyrethroid-only programmes. Published resistance ratios for US field strains include more ' +
      'than 12,765-fold to deltamethrin in Cincinnati and more than 9,375-fold in New York City, ' +
      'with lambda-cyhalothrin ratios above 6,000 in both cities. EPA itself states that some ' +
      'populations are resistant to pyrethrins and pyrethroids. A label rate cannot overcome ' +
      'thousand-fold resistance.',
      'Assuming a pyrethroid-neonicotinoid mix solves resistance. Bed bugs collected from homes ' +
      'in Cincinnati and Michigan showed moderate to high tolerance or resistance to several ' +
      'neonicotinoids, probably through increased detoxification enzyme activity. A combination ' +
      'product helps only while both halves still work on that population.',
      'Heat jobs run to the air temperature. Virginia Tech notes that many crews aim for 135°F ' +
      'ambient and hold for four to five hours, and that bed bugs escape into cooler cracks and ' +
      'crevices during treatment. Egg death points are higher than adult ones: 122°F against ' +
      '118°F in the Virginia Tech figures. Under whole-room ramp rates the study measured 99% egg ' +
      'kill at 54.8°C. At 45°C, 99% egg kill took 428.5 minutes.',
      'Heat alone, sold as a single guaranteed visit. Virginia Tech says even the best heat ' +
      'treatment cannot be expected to succeed every time, calls heat not a "once and done" ' +
      'method, and recommends a long-lasting desiccant dust afterwards for any bugs or eggs that ' +
      'survived. A quote with no follow-up and no residual step sets up the callback.',
      'Desiccants for fast relief. EPA describes the mode of action as destroying the protective ' +
      'waxy coating, after which bed bugs slowly dehydrate and die. Dust is a long game. The ' +
      'occupant who needs the biting to stop this week needs the kill step as well.',
    ],
    sources: [
      {
        label:
          'Temperature and Time Requirements for Controlling Bed Bugs (Cimex lectularius) under Commercial Heat Treatment Conditions — Insects (2011), PMC4553552',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4553552/',
      },
      {
        label: 'Bed Bug Heat Treatments — What you need to know! (ENTO-583) — Virginia Cooperative Extension (2024)',
        url: 'https://www.pubs.ext.vt.edu/ENTO/ento-583/ento-583.html',
      },
      {
        label:
          'Insecticide resistance and resistance mechanisms in bed bugs, Cimex spp. (Hemiptera: Cimicidae) — Parasites & Vectors (2017), PMC5492349',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5492349/',
      },
      {
        label: 'Pesticides to Control Bed Bugs — U.S. EPA',
        url: 'https://www.epa.gov/bedbugs/pesticides-control-bed-bugs',
      },
      {
        label:
          'Evaluation of a Non-Chemical Compared to a Non-Chemical Plus Silica Gel Approach to Bed Bug Management — Insects (2020), PMC7411924',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7411924/',
      },
    ],
    reviewer: EDITOR_REVIEWER,
    verifiedOn: '2026-09-26',
  },
  {
    slug: 'insect-growth-regulators',
    name: 'Insect growth regulators',
    definition:
      'Insecticides that disrupt insect development rather than killing on contact. Juvenile ' +
      'hormone analogs such as methoprene, hydroprene and pyriproxyfen keep immatures from ' +
      'becoming reproducing adults. Chitin synthesis inhibitors block the exoskeleton, so ' +
      'insects die in an immature stage. Adults usually survive, so an IGR alone gives no quick ' +
      'knockdown.',
    fits: [
      'Breaking the next generation while something else handles the current one. Juvenile ' +
      'hormone analogs let a larva grow and pupate, but the pupa never emerges as an adult. ' +
      'Chitin synthesis inhibitors interfere with building the exoskeleton, so insects die ' +
      'immature or mature into sterile adults. Some IGRs also cut egg viability and adult ' +
      'reproduction, which reduces the number of generations you have to treat.',
      'Indoor cockroach work, including food-handling sites. EPA\'s IGR fact sheet lists ' +
      'S-hydroprene for indoor use as a fogger, spray or impregnated disc, including in food ' +
      'handling establishments but not applied directly to food, and names the roach as a major ' +
      'target pest. Check the current label before you rely on a 2001 use summary.',
      'Flea programmes, on the animal and in the room. Methoprene and pyriproxyfen are designed ' +
      'for long-term control of flea eggs and immatures in the environment. UC IPM describes an ' +
      'on-pet product that does not kill adult fleas but does prevent them reproducing. Where a ' +
      'pet sleeps outside under heavy pressure, UC IPM says those areas can be treated with ' +
      'pyriproxyfen.',
      'Stored-product facilities, paired with a knockdown active. Methoprene is labelled for ' +
      'direct application to stored grain, as a residual contact spray and as an aerosol. In ' +
      'aerosol tests with synergized pyrethrin plus methoprene, fewer than 2% of red flour beetle ' +
      'larvae on treated flour or packaging emerged as normal adults. The pyrethrin gives the ' +
      'immediate adult control that the IGR cannot.',
      'Sites that are also heat-treated. Methoprene stayed stable for 48 hours on concrete held ' +
      'at 65°C and on wheat held at 46°C. The authors conclude it is stable at the high ' +
      'temperatures reached during insecticidal heat treatments of structures.',
    ],
    doesNotFit: [
      'Any customer who needs fewer insects this week. IGRs do not kill insects directly. ' +
      'Extension guidance puts death at 3 to 14 days depending on product, pest and stage, and ' +
      'adults usually survive. With fleas, an indoor IGR treatment kills larvae but not pupae, ' +
      'so adults may keep emerging for up to two weeks. At cool temperatures, fully formed fleas ' +
      'can wait in the cocoon for up to 12 months.',
      'Infestations with every life stage present, treated once. IGRs work only when a ' +
      'susceptible stage is there. Kansas State Extension says they are less effective when ' +
      'generations overlap, and that residual activity is brief enough that repeat applications ' +
      'are usually warranted. That publication is written for greenhouse pests, but the timing ' +
      'problem is the same one you meet in a structure.',
      'Unsealed concrete as a long-residual surface. Methoprene on varnished wood allowed no red ' +
      'flour beetle emergence 24 weeks after treatment at any temperature tested. On unsealed ' +
      'concrete, emergence rose over time. Flour on the surface reduced efficacy further on ' +
      'concrete but not on wood. The substrate mattered more than the temperature.',
      'Assuming one IGR works equally on closely related pests. In the same aerosol work, the ' +
      'confused flour beetle was clearly more tolerant than the red flour beetle. On packaging ' +
      'treated at the lower pyrethrin rate, 29.7% to 49.0% of its larvae emerged as ' +
      'normal-looking adults, depending on the surface. Identify the species before you count on ' +
      'the growth regulator.',
      'Treating low aquatic risk as no aquatic risk. EPA expects none of the juvenile hormone ' +
      'analogs it reviewed to harm people or wildlife when used as labelled. It also notes that ' +
      'methoprene and S-methoprene show some toxicity to certain fish and aquatic invertebrates ' +
      'in laboratory tests. Keep outdoor applications away from water the label does not cover.',
    ],
    sources: [
      {
        label: 'Insect Growth Regulators for Use in Greenhouses (MF3094) — Kansas State University Research and Extension (2013)',
        url: 'https://bookstore.ksre.ksu.edu/pubs/insect-growth-regulators-for-use-in-greenhouses_MF3094.pdf',
      },
      {
        label:
          'Biopesticides Fact Sheet — Insect Growth Regulators: S-Hydroprene, S-Kinoprene, Methoprene, S-Methoprene — U.S. EPA (2001)',
        url: 'https://www3.epa.gov/pesticides/chem_search/reg_actions/registration/fs_G-107_06-Dec-01.pdf',
      },
      {
        label: 'Pest Notes: Fleas — UC Statewide IPM Program (2010)',
        url: 'https://ipm.ucanr.edu/PMG/PESTNOTES/pn7419.html',
      },
      {
        label:
          'Residual efficacy of synergized pyrethrin + methoprene aerosol against larvae of Tribolium castaneum and Tribolium confusum — Journal of Stored Products Research (2011)',
        url: 'https://www.ars.usda.gov/ARSUserFiles/30200530/pdf/1162_2011.pdf',
      },
      {
        label:
          'Residual Efficacy of Methoprene for Control of Tribolium castaneum Larvae at Different Temperatures on Varnished Wood, Concrete, and Wheat — Journal of Economic Entomology (2012)',
        url: 'https://academic.oup.com/jee/article/105/2/718/898152',
      },
    ],
    reviewer: EDITOR_REVIEWER,
    verifiedOn: '2026-09-26',
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
