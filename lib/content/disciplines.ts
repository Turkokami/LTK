/**
 * disciplines.ts — the trades inside this industry, and the routes between them.
 *
 * THIS IS THE SCOPE CORRECTION. The build was originally aimed at structural pest control
 * technicians. That is one lane in a much wider industry, and the wider industry is the point:
 * wildlife control, falconry-based bird abatement, K9 detection, exclusion, insulation,
 * termite and WDO, fumigation, turf and ornamental, mosquito and vector, commercial and food
 * safety, and the ownership route that sits on top of all of them.
 *
 * Two jobs for this layer:
 *
 *   1. SHOW PEOPLE THE ROUTES. Almost nobody enters this industry on purpose. They take a
 *      technician job, and five years later nobody has told them that bird abatement with a
 *      trained hawk is a job, or that K9 bed bug detection exists, or that the exclusion
 *      specialist on their crew out-earns them. A map of the routes is genuinely useful and
 *      nobody publishes one.
 *
 *   2. FEED THE COMMUNITY. Every discipline has a handful of people worldwide who actually
 *      know it. The value of the community is putting a second-year technician in a room with
 *      them. Each discipline page routes to the relevant community space.
 *
 * Note on licensing: a discipline is NOT a licence category. Some map cleanly onto a state
 * category (termite, fumigation, weed control), some are licensed by a completely different
 * agency (falconry is federal and state wildlife, not pesticide), and some need no pesticide
 * licence at all (exclusion, insulation, detection K9 handling). That mismatch is exactly why
 * people cannot find this information, so `licensing` states the real regime per discipline
 * rather than pretending they all run through the state pesticide agency.
 */

export type Regime =
  | 'state-pesticide'
  | 'state-wildlife'
  | 'federal-and-state-wildlife'
  | 'trade-certification'
  | 'contractor-or-trade'
  | 'none-or-varies';

export interface Discipline {
  slug: string;
  name: string;
  /** One sentence, plain, for someone who has never heard of it. */
  summary: string;
  /** Which regulator actually governs this work. */
  licensing: Regime;
  /** Said plainly, because the regime name means nothing on its own. */
  licensingNote: string;
  /**
   * Realistic route in. Not a fantasy ladder — the actual way people arrive, including
   * arriving sideways from another trade.
   */
  routeIn: string;
  /** What the work is like day to day. The thing a job ad never says. */
  dayToDay: string;
  /**
   * Disciplines people commonly move to from here. Slugs. This is what makes the layer a map
   * rather than a list — the cross-links ARE the career paths.
   */
  movesTo: string[];
  /** BLS SOC code where one genuinely applies. Many of these have no clean BLS mapping. */
  socCode?: string;
  /** True where the discipline is small enough that the community is the only real network. */
  communityIsTheNetwork: boolean;
}

export const DISCIPLINES: Discipline[] = [
  {
    slug: 'general-pest',
    name: 'General pest control',
    summary: 'Routine prevention and treatment of household and commercial pests — ants, roaches, spiders, rodents, stored product pests.',
    licensing: 'state-pesticide',
    licensingNote:
      'State pesticide licence, usually an apprentice-to-technician-to-applicator ladder. The most common entry point in the industry.',
    routeIn: 'Hired with no experience, trained on the job, licensed within the first year. No degree required anywhere in the US.',
    dayToDay: 'A route. Eight to fifteen stops, mostly recurring, mostly residential. You work alone, you drive a lot, and you talk to people all day — the job is half technical and half customer relationship, which surprises people.',
    movesTo: ['termite-wdo', 'commercial-food-safety', 'mosquito-vector', 'ownership'],
    socCode: '37-2021',
    communityIsTheNetwork: false,
  },
  {
    slug: 'termite-wdo',
    name: 'Termite and wood-destroying organisms',
    summary: 'Inspection, treatment and reporting on termites, wood-boring beetles and decay fungi — including the inspection reports that real estate transactions depend on.',
    licensing: 'state-pesticide',
    licensingNote:
      'A separate licence category in most states. Several states additionally regulate who may sign a WDI/WDO report, because a real estate transaction rests on it.',
    routeIn: 'Usually a lateral move from general pest after a year or two, adding the termite category. Some companies hire directly into termite.',
    dayToDay: 'Crawlspaces, attics, foundations and a lot of writing. The inspection report is a legal document and the liability is real, which is why it pays better than general pest.',
    movesTo: ['fumigation', 'exclusion', 'ownership'],
    socCode: '37-2021',
    communityIsTheNetwork: false,
  },
  {
    slug: 'wildlife-control',
    name: 'Wildlife control',
    summary: 'Removal, exclusion and damage management for raccoons, squirrels, bats, snakes, birds and other vertebrates.',
    licensing: 'state-wildlife',
    licensingNote:
      'Usually a state wildlife or nuisance-animal permit, NOT the pesticide licence — a genuinely different agency in most states, and the single most common thing people get wrong when they try to add wildlife work.',
    routeIn: 'Often from general pest, often from trapping or hunting backgrounds, sometimes straight in. Bat work in particular has hard seasonal legal restrictions you learn before anything else.',
    dayToDay: 'Ladders, roofs, attics and live animals. Physically the hardest lane in the industry and the one with the most variable hours — animals do not respect a route schedule.',
    movesTo: ['exclusion', 'bird-abatement', 'falconry-abatement', 'ownership'],
    communityIsTheNetwork: false,
  },
  {
    slug: 'falconry-abatement',
    name: 'Falconry-based bird abatement',
    summary: 'Using trained raptors to move nuisance bird populations off landfills, vineyards, resorts, airports and distribution centres.',
    licensing: 'federal-and-state-wildlife',
    licensingNote:
      'Federal falconry regulation plus a state falconry permit plus, in most cases, a separate abatement endorsement. Nothing to do with a pesticide licence. The apprenticeship period is measured in years, not weeks — this is the longest runway of any discipline here.',
    routeIn: 'Through falconry itself, not through pest control. You apprentice under a licensed falconer first and the commercial abatement work comes after. People almost never arrive at this from a pest route, which is exactly why it is worth documenting.',
    dayToDay: 'Early starts, weather, and a living animal you are responsible for every day of the year including the days you are not working. Extraordinary work if it suits you and completely unsuitable if it does not.',
    movesTo: ['bird-abatement', 'wildlife-control'],
    communityIsTheNetwork: true,
  },
  {
    slug: 'bird-abatement',
    name: 'Bird management and exclusion',
    summary: 'Netting, spikes, wire, shock track, deterrents and clean-up for pest birds on commercial and industrial structures.',
    licensing: 'none-or-varies',
    licensingNote:
      'Often no pesticide licence at all, but protected-species law governs what you may touch and when. Nesting-season restrictions are federal.',
    routeIn: 'From wildlife, from exclusion, or from a rope-access or height-work background. Height certification matters more here than a pest licence.',
    dayToDay: 'Working at height, a lot of it. Closer to a specialist trade contractor than to a pest route.',
    movesTo: ['exclusion', 'falconry-abatement', 'ownership'],
    communityIsTheNetwork: true,
  },
  {
    slug: 'k9-detection',
    name: 'K9 detection',
    summary: 'Handler and dog teams scent-detecting bed bugs, termites, rodents or invasive species — used where visual inspection is unreliable or too slow.',
    licensing: 'trade-certification',
    licensingNote:
      'No state licence governs detection work itself. Credibility rests on third-party certification of the team, and standards vary enormously between certifying bodies — which is the live argument inside this discipline.',
    routeIn: 'Either a pest professional who takes on a dog, or a dog handler who enters pest. Both routes exist and they produce very different practitioners.',
    dayToDay: 'You have a colleague who lives with you. Training never stops, the dog has good and bad days, and your results are only as good as your own handling — which is the part newcomers underestimate.',
    movesTo: ['bed-bugs', 'ownership'],
    communityIsTheNetwork: true,
  },
  {
    slug: 'exclusion',
    name: 'Exclusion and pest-proofing',
    summary: 'Sealing structures so pests cannot get in — the permanent fix that chemical treatment alone never achieves.',
    licensing: 'contractor-or-trade',
    licensingNote:
      'Often needs no pesticide licence, but may touch contractor licensing depending on the state and the scale of the work.',
    routeIn: 'From pest, from wildlife, or straight from construction. Construction people often become the best exclusion techs because they already understand how buildings are put together.',
    dayToDay: 'Hand tools, mesh, sealant, crawlspaces and roofs. Visible, permanent, physical work — genuinely satisfying in a way routine spraying is not, and people say so.',
    movesTo: ['insulation', 'wildlife-control', 'ownership'],
    communityIsTheNetwork: false,
  },
  {
    slug: 'insulation',
    name: 'Insulation and attic restoration',
    summary: 'Removing contaminated insulation, decontaminating and re-insulating after infestation — usually sold alongside exclusion.',
    licensing: 'contractor-or-trade',
    licensingNote: 'Not a pesticide licence. Respiratory protection and confined-space practice matter far more here.',
    routeIn: 'Almost always from exclusion or wildlife, as an add-on service that becomes its own crew.',
    dayToDay: 'Hot attics, full PPE, heavy work — and the highest ticket value per job of anything in this list, which is why it keeps appearing on pest companies\' service menus.',
    movesTo: ['exclusion', 'ownership'],
    communityIsTheNetwork: false,
  },
  {
    slug: 'fumigation',
    name: 'Fumigation',
    summary: 'Whole-structure and commodity fumigation — the highest-consequence work in the industry.',
    licensing: 'state-pesticide',
    licensingNote:
      'A separate category everywhere, with additional prequalification. Texas, for example, requires 40 hours of training approved before you may even schedule the exam.',
    routeIn: 'Experienced applicators only. Nobody starts here and nobody should.',
    dayToDay: 'Procedure, monitoring, paperwork and absolute discipline. The margin for error is smaller than anywhere else in the industry and everything about the culture reflects that.',
    movesTo: ['commercial-food-safety', 'ownership'],
    communityIsTheNetwork: true,
  },
  {
    slug: 'commercial-food-safety',
    name: 'Commercial and food safety',
    summary: 'Pest management inside audited environments — food processing, warehousing, pharmaceutical, hospitality — against AIB, SQF, BRC and similar schemes.',
    licensing: 'state-pesticide',
    licensingNote:
      'Standard licence, but the real gate is audit literacy. The scheme requirements, not the state, drive what you document and how.',
    routeIn: 'From general pest, usually by being the technician who did not mind the paperwork.',
    dayToDay: 'Documentation, trend analysis, device maps and auditors. More desk work than any other technical lane, and it pays accordingly.',
    movesTo: ['fumigation', 'ownership'],
    communityIsTheNetwork: false,
  },
  {
    slug: 'mosquito-vector',
    name: 'Mosquito and vector control',
    summary: 'Managing mosquitoes, ticks and other disease vectors — in private service and in public health districts.',
    licensing: 'state-pesticide',
    licensingNote: 'State licence; public-sector vector control adds a separate noncommercial or government applicator track.',
    routeIn: 'From general pest on the private side, or through a public health district on the government side. The two routes barely talk to each other.',
    dayToDay: 'Seasonal and weather-driven. Surveillance and mapping on the public health side; route work on the private side.',
    movesTo: ['turf-ornamental', 'ownership'],
    communityIsTheNetwork: false,
  },
  {
    slug: 'turf-ornamental',
    name: 'Turf and ornamental',
    summary: 'Pest, weed and disease management on lawns, trees and landscape plantings.',
    licensing: 'state-pesticide',
    licensingNote: 'Its own category almost everywhere, and in several states you may license through either a structural or an agricultural programme.',
    routeIn: 'From landscaping as often as from pest control. Horticultural knowledge matters more here than structural knowledge.',
    dayToDay: 'Outdoor, seasonal, plant-focused. Closer to horticulture than to pest control and it attracts a different person.',
    movesTo: ['mosquito-vector', 'ownership'],
    socCode: '37-3012',
    communityIsTheNetwork: false,
  },
  {
    slug: 'bed-bugs',
    name: 'Bed bug work',
    summary: 'Inspection, heat remediation and chemical treatment for bed bugs — in housing, hospitality, healthcare and transport.',
    licensing: 'state-pesticide',
    licensingNote: 'Standard licence. Heat remediation adds equipment competence that no licence tests.',
    routeIn: 'From general pest. Many companies run a dedicated bed bug crew because the work and the customer conversation are both unlike anything else.',
    dayToDay: 'Emotionally the hardest work in the industry. You are in people\'s bedrooms on the worst week of their year, and the customer management is as demanding as the treatment.',
    movesTo: ['k9-detection', 'ownership'],
    communityIsTheNetwork: false,
  },
  {
    slug: 'ownership',
    name: 'Ownership and running a branch',
    summary: 'Running the business — routing, hiring, pricing, compliance, and eventually selling or not selling to a roll-up.',
    licensing: 'state-pesticide',
    licensingNote:
      'A business licence plus a designated responsible certified applicator in most states, with insurance or bond minimums attached.',
    routeIn:
      'Two routes, and they produce different companies: a technician who goes out on their own, or someone who buys in from outside the trade. The first knows the work and learns the business; the second is the reverse.',
    dayToDay: 'You stop doing pest control and start doing hiring, pricing, cash flow and compliance. The people who love it and the people who regret it are both very clear about why.',
    movesTo: [],
    communityIsTheNetwork: false,
  },
];

export function getDiscipline(slug: string): Discipline | undefined {
  return DISCIPLINES.find((d) => d.slug === slug);
}

/** Disciplines that lead into this one — the inverse of movesTo, computed so it cannot drift. */
export function routesInto(slug: string): Discipline[] {
  return DISCIPLINES.filter((d) => d.movesTo.includes(slug));
}

/** The small disciplines where the community genuinely is the only network. */
export const NETWORK_DISCIPLINES = DISCIPLINES.filter((d) => d.communityIsTheNetwork);
