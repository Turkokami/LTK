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
