/**
 * states.ts — the 50-state registry that drives five stacked geo grids (300 pages).
 *
 * CLAUDE.md §3: DO NOT generate all 50 at once. Build Wave 1 with real verified data, confirm
 * indexation and ranking, then scale. Fifty templated pages with the state name swapped is
 * doorway spam and Google treats it as such.
 *
 * `verified: false` means the regulatory record has not been sourced and signed off. A state
 * page whose record is unverified will not render in production — see REGISTRY.md R-14.
 */

export interface StateRecord {
  name: string;
  /** USPS two-letter code. Used in JobPosting addressRegion and mono spec columns. */
  code: string;
  /** URL segment. Never changes once shipped. CLAUDE.md 2.7. */
  slug: string;
  /** Build wave. 1 = TX/WA/FL/CA/SC (largest markets + your operating states). */
  wave: 1 | 2 | 3;
  /** Issuing agency. Public fact, still requires a source URL before publish. */
  agency: string | null;
  agencyUrl: string | null;
  /**
   * Set true ONLY when every regulatory value has a source URL, a verification date and a
   * named human reviewer. This is the production gate.
   */
  verified: boolean;
}

/**
 * The regulatory payload for a single state. Every field is REGISTRY R-14.
 * Numbers are nullable on purpose: a null renders an honest "not yet published" state,
 * an invented number is unrecoverable.
 */
export interface StateRegulatory {
  stateCode: string;
  /** ISO date. Drives both the visible "last verified" line and schema dateModified. */
  verifiedOn: string | null;
  /** Path to the reviewer's Person page. Named humans only. */
  reviewedByPath: string | null;
  sourceUrls: string[];
  licenseCategories: { code: string; name: string }[];
  examStructure: string | null;
  applicationFeeUsd: number | null;
  renewalCycleMonths: number | null;
  ceuHoursPerCycle: number | null;
  ceuHoursByCategory: { category: string; hours: number }[];
  /**
   * Per-tier recertification, because Texas (and most states) do NOT use one pooled number.
   * Technicians and certified applicators have entirely different obligations under entirely
   * different names — hours of verifiable training vs CEUs. Publishing a single figure is the
   * most common way somebody arrives at renewal short.
   */
  recertByTier: { tier: string; requirement: string; note?: string }[];
  acceptedFormats: string[];
  approvedProviders: { name: string; url: string | null }[];
  renewalDeadline: string | null;
  reciprocity: string[];
}

export const STATES: StateRecord[] = [
  { name: 'Alabama', code: 'AL', slug: 'alabama', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Alaska', code: 'AK', slug: 'alaska', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Arizona', code: 'AZ', slug: 'arizona', wave: 2, agency: null, agencyUrl: null, verified: false },
  { name: 'Arkansas', code: 'AR', slug: 'arkansas', wave: 2, agency: null, agencyUrl: null, verified: false },
  { name: 'California', code: 'CA', slug: 'california', wave: 1, agency: 'California Structural Pest Control Board (SPCB), Department of Consumer Affairs', agencyUrl: 'https://www.pestboard.ca.gov/', verified: true },
  { name: 'Colorado', code: 'CO', slug: 'colorado', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Connecticut', code: 'CT', slug: 'connecticut', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Delaware', code: 'DE', slug: 'delaware', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Florida', code: 'FL', slug: 'florida', wave: 1, agency: 'Florida Department of Agriculture and Consumer Services (FDACS) — Bureau of Licensing and Enforcement', agencyUrl: 'https://www.fdacs.gov/Business-Services/Pest-Control/Licensing-and-Certification', verified: true },
  { name: 'Georgia', code: 'GA', slug: 'georgia', wave: 2, agency: null, agencyUrl: null, verified: false },
  { name: 'Hawaii', code: 'HI', slug: 'hawaii', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Idaho', code: 'ID', slug: 'idaho', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Illinois', code: 'IL', slug: 'illinois', wave: 2, agency: null, agencyUrl: null, verified: false },
  { name: 'Indiana', code: 'IN', slug: 'indiana', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Iowa', code: 'IA', slug: 'iowa', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Kansas', code: 'KS', slug: 'kansas', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Kentucky', code: 'KY', slug: 'kentucky', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Louisiana', code: 'LA', slug: 'louisiana', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Maine', code: 'ME', slug: 'maine', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Maryland', code: 'MD', slug: 'maryland', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Massachusetts', code: 'MA', slug: 'massachusetts', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Michigan', code: 'MI', slug: 'michigan', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Minnesota', code: 'MN', slug: 'minnesota', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Mississippi', code: 'MS', slug: 'mississippi', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Missouri', code: 'MO', slug: 'missouri', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Montana', code: 'MT', slug: 'montana', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Nebraska', code: 'NE', slug: 'nebraska', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Nevada', code: 'NV', slug: 'nevada', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'New Hampshire', code: 'NH', slug: 'new-hampshire', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'New Jersey', code: 'NJ', slug: 'new-jersey', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'New Mexico', code: 'NM', slug: 'new-mexico', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'New York', code: 'NY', slug: 'new-york', wave: 2, agency: null, agencyUrl: null, verified: false },
  { name: 'North Carolina', code: 'NC', slug: 'north-carolina', wave: 2, agency: null, agencyUrl: null, verified: false },
  { name: 'North Dakota', code: 'ND', slug: 'north-dakota', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Ohio', code: 'OH', slug: 'ohio', wave: 2, agency: null, agencyUrl: null, verified: false },
  { name: 'Oklahoma', code: 'OK', slug: 'oklahoma', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Oregon', code: 'OR', slug: 'oregon', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Pennsylvania', code: 'PA', slug: 'pennsylvania', wave: 2, agency: null, agencyUrl: null, verified: false },
  { name: 'Rhode Island', code: 'RI', slug: 'rhode-island', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'South Carolina', code: 'SC', slug: 'south-carolina', wave: 1, agency: 'Clemson University — Department of Pesticide Regulation (DPR)', agencyUrl: 'https://www.clemson.edu/public/regulatory/pesticide-regulation/', verified: true },
  { name: 'South Dakota', code: 'SD', slug: 'south-dakota', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Tennessee', code: 'TN', slug: 'tennessee', wave: 2, agency: null, agencyUrl: null, verified: false },
  { name: 'Texas', code: 'TX', slug: 'texas', wave: 1, agency: 'Texas Department of Agriculture — Structural Pest Control Service (SPCS)', agencyUrl: 'https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service', verified: true },
  { name: 'Utah', code: 'UT', slug: 'utah', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Vermont', code: 'VT', slug: 'vermont', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Virginia', code: 'VA', slug: 'virginia', wave: 2, agency: null, agencyUrl: null, verified: false },
  { name: 'Washington', code: 'WA', slug: 'washington', wave: 1, agency: "Washington State Department of Agriculture (WSDA) — Pesticide Management Division", agencyUrl: 'https://agr.wa.gov/services/licenses-permits-and-certificates/pesticide-license-and-recertification', verified: true },
  { name: 'West Virginia', code: 'WV', slug: 'west-virginia', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Wisconsin', code: 'WI', slug: 'wisconsin', wave: 3, agency: null, agencyUrl: null, verified: false },
  { name: 'Wyoming', code: 'WY', slug: 'wyoming', wave: 3, agency: null, agencyUrl: null, verified: false },
];

export const WAVE_1 = STATES.filter((s) => s.wave === 1);
export const WAVE_2 = STATES.filter((s) => s.wave === 2);
export const WAVE_3 = STATES.filter((s) => s.wave === 3);

/** Only verified states render in production. Unverified states 404 rather than publish a guess. */
export const PUBLISHED_STATES = STATES.filter(
  (s) => s.verified || process.env.NODE_ENV !== 'production',
);

export function getState(slug: string): StateRecord | undefined {
  return STATES.find((s) => s.slug === slug);
}

/**
 * Regulatory records live here as they are sourced. Empty until R-14 lands.
 * Add Wave 1 first: TX, WA, FL, CA, SC.
 */
export const REGULATORY: Record<string, StateRegulatory> = {
  /**
   * CALIFORNIA — Structural Pest Control Board (SPCB), inside the Department of Consumer Affairs.
   *
   * THE TWO-REGULATOR TRAP, AND IT IS THE MOST EXPENSIVE MISTAKE ON THIS PAGE: California
   * splits pest work between two entirely separate authorities.
   *
   *   SPCB governs STRUCTURAL pest control — fumigation, general pest, termite and WDO. Licences
   *     are Operator, Field Representative and Applicator, organised into three BRANCHES.
   *   DPR and the County Agricultural Commissioners govern agricultural, landscape and
   *     right-of-way pesticide use — that is the QAL and QAC world, plus the Maintenance
   *     Gardener Pest Control Business licence.
   *
   * A person doing landscape and turf work needs the DPR credential, not an SPCB branch, and a
   * person doing termite work needs SPCB, not DPR. People buy the wrong exam prep, sit the wrong
   * exam, and discover it at the point of trying to register a business. Nothing on page one of
   * a search for "California pest control license" makes this distinction plainly.
   *
   * SECOND THING NOBODY SAYS OUT LOUD: the renewal is triennial but the licence is dead, not
   * merely late, the moment it goes delinquent. You may not work during the delinquency window.
   *
   * Figures below are from 16 CCR s.1950 and SPCB's own renewal guidance.
   */
  CA: {
    stateCode: 'CA',
    verifiedOn: '2026-09-23',
    reviewedByPath: null, // REGISTRY R-06 — named reviewer still outstanding.
    sourceUrls: [
      'https://www.law.cornell.edu/regulations/california/16-CCR-1950',
      'https://www.pestboard.ca.gov/howdoi/renew.shtml',
      'https://www.pestboard.ca.gov/ce/index.shtml',
      'https://pestboard.ca.gov/pestlaw/reg_update20090419.pdf',
    ],
    // California organises structural work into BRANCHES, not categories. The vocabulary
    // difference matters: an applicator searching "category" finds the DPR scheme instead.
    licenseCategories: [
      { code: 'Branch 1', name: 'Fumigation' },
      { code: 'Branch 2', name: 'General pest' },
      { code: 'Branch 3', name: 'Termite and other wood-destroying organisms' },
    ],
    examStructure:
      'Three licence levels, each with its own SPCB exam: Applicator (entry), Field ' +
      'Representative, and Operator (the level that lets a business be registered). Field ' +
      'Representative carries pre-licensing training and experience requirements — Branch 3 ' +
      'requires a minimum of 100 hours of training and experience, at least 80 of them actual ' +
      'field work, and must include Integrated Pest Management and the effect of structural pest ' +
      'control on water quality.',
    applicationFeeUsd: null, // SPCB fee schedule changes; not published here without the current form.
    renewalCycleMonths: 36, // Triennial, all licensees, fixed to 30 June.
    ceuHoursPerCycle: null, // Depends on licence level and branch count — see below.
    ceuHoursByCategory: [
      { category: 'Operator or Field Representative — one branch', hours: 16 },
      { category: 'Operator or Field Representative — two branches', hours: 20 },
      { category: 'Operator or Field Representative — three branches', hours: 24 },
      { category: 'Applicator — any branch', hours: 12 },
    ],
    recertByTier: [
      {
        tier: 'Operator and Field Representative',
        requirement: '16, 20 or 24 hours per three-year period — one, two or three branches held',
        note:
          'The total is not free-form. Every cycle must contain at least 8 hours of Board-approved ' +
          'Structural Pest Control Act, Rules and Regulations, or related agency regulations; at ' +
          'least 4 technical hours SPECIFIC TO EACH branch held; and, for anyone holding Branch 2 ' +
          'or Branch 3, at least 2 hours of Integrated Pest Management. The remainder is general. ' +
          'Hitting the total with the wrong mix fails the renewal just as hard as being short.',
      },
      {
        tier: 'Applicator',
        requirement: '12 hours per three-year period',
        note:
          'Fixed composition: 6 hours pesticide application and use, 2 hours Integrated Pest ' +
          'Management, and 4 hours on the Structural Pest Control Act and its rules and regulations.',
      },
    ],
    acceptedFormats: [
      'SPCB-approved classroom courses',
      'SPCB-approved online and video courses',
      'Courses must be Board-approved in advance — an unapproved course earns nothing, however good it was',
    ],
    approvedProviders: [
      {
        name: 'SPCB approved continuing education courses (official)',
        url: 'https://www.pestboard.ca.gov/ce/index.shtml',
      },
      {
        name: 'SPCB licence renewal guidance',
        url: 'https://www.pestboard.ca.gov/howdoi/renew.shtml',
      },
    ],
    renewalDeadline:
      'All CE hours must be completed by 30 JUNE, and renewal plus payment submitted by the same ' +
      'date. Keep the certificates — they are uploaded with the online renewal. Miss it and the ' +
      'licence goes DELINQUENT for up to 90 days with an added fee, and here is the part that ' +
      'catches people: the licence is NOT VALID during delinquency, so you cannot legally work ' +
      'while you sort it out. Any licence not renewed by 30 SEPTEMBER is cancelled outright.',
    reciprocity: [
      'California does not offer general structural pest control reciprocity. SPCB examination is ' +
      'required regardless of licences held in other states.',
      'If the work is agricultural, landscape or right-of-way rather than structural, the credential ' +
      'comes from DPR and the County Agricultural Commissioner (QAL/QAC), not from SPCB at all.',
    ],
  },

  /**
   * FLORIDA — FDACS. Two separate statutes, and conflating them is the mistake everyone makes.
   *
   *   Chapter 482 F.S. — PEST CONTROL. Structural work: general household, termite and other
   *     wood-destroying organisms, lawn and ornamental, fumigation. This is the one that covers
   *     the pest control industry as this site's audience understands it. Certificate runs ONE
   *     year.
   *   Chapter 487 F.S. — PESTICIDE APPLICATOR licences. Restricted-use products, private
   *     agriculture, aerial. Licence runs FOUR years and uses a completely different CEU maths
   *     (4 core CEUs plus a category count from the FDACS table).
   *   Chapter 388 F.S. — arthropod and mosquito control.
   *
   * WHERE THE INTERNET IS WRONG, AND IT IS WRONG LOUDLY: multiple page-one sites state that
   * Florida certified operators need "24 CEUs biennially" or "16 CEUs", and that the licence is
   * biennial. The governing text is s.482.111(10) F.S., and it says something much smaller and
   * much stranger — 2 hours of core plus 2 hours per category held, annually. A certified
   * operator holding all four categories owes 10 hours a year, not 24 every two years. The
   * numbers circulating appear to be Chapter 487 figures, or another state's, applied to
   * Chapter 482 by people who did not notice Florida runs two schemes.
   *
   * Figures below come from the statute and from Rule 5E-14.132 F.A.C., not from a CEU vendor.
   */
  FL: {
    stateCode: 'FL',
    verifiedOn: '2026-09-23',
    reviewedByPath: null, // REGISTRY R-06 — named reviewer still outstanding.
    sourceUrls: [
      'https://www.flsenate.gov/Laws/Statutes/2024/482.111',
      'https://www.fdacs.gov/Business-Services/Pest-Control/Licensing-and-Certification',
      'https://flrules.elaws.us/fac/5e-14.132',
      'https://www.fdacs.gov/Business-Services/Pesticide-Licensing/Pesticide-Applicator-Licenses/Pesticide-Applicator-Certification-and-Licensing/CEU-Requirements',
    ],
    // s.482.111(2)(a) F.S. names these categories directly.
    licenseCategories: [
      { code: 'GHP', name: 'General household pest control' },
      { code: 'WDO', name: 'Termites and other wood-destroying organisms' },
      { code: 'L&O', name: 'Lawn and ornamental pest control' },
      { code: 'FUM', name: 'Fumigation' },
    ],
    examStructure:
      'Pest control operator certificate requires passing the FDACS examination, and you must ' +
      'qualify to sit it first: a high school diploma plus three years of documented experience as ' +
      'a service employee of a licensee in the category sought (at least one year of it in Florida), ' +
      'or a relevant degree with a year of Florida experience. A degree in entomology qualifies you ' +
      'for examination in ALL categories; horticulture, botany or agronomy qualifies you only for ' +
      'Lawn and Ornamental. Separately, FDACS runs four Limited Certification categories ' +
      '(Commercial Landscape Maintenance, Governmental or Private applicator, Commercial Urban ' +
      'Fertilizer, and Limited Wildlife) at $150 exam fee per category — none of which permits ' +
      'operating a commercial pest control business.',
    applicationFeeUsd: 150, // Rule 5E-14.132(1) F.A.C. — original issuance and annual renewal both $150.
    renewalCycleMonths: 12, // s.5E-14.132(3): a certificate expires one year after date of issuance.
    ceuHoursPerCycle: null, // Additive by category — a single pooled figure misstates it. See below.
    ceuHoursByCategory: [
      { category: 'Core (legislation, safety, labeling, IPM) — once per certificate', hours: 2 },
      { category: 'Each category held, per category', hours: 2 },
    ],
    recertByTier: [
      {
        tier: 'Certified Pest Control Operator (Chapter 482)',
        requirement: '2 hours core CEU plus 2 hours in EACH category held, every year — or pass the exam',
        note:
          'Additive, so the number depends on your certificate: one category is 4 hours, all four ' +
          'categories is 10 hours. Renewal is annual, not biennial, and the certificate expires one ' +
          'year from its issue date rather than on a fixed statewide date. Source: s.482.111(10) F.S.',
      },
      {
        tier: 'Employee identification cardholder',
        requirement: '2 hours of continuing training by the card renewal date',
        note:
          'Pesticide safety, integrated pest management, and applicable federal and state law. This ' +
          'covers technicians working under a certified operator — a much lighter obligation than ' +
          'the operator carries, and frequently forgotten because the card feels like paperwork.',
      },
      {
        tier: 'Pesticide applicator licence (Chapter 487) — different scheme entirely',
        requirement: '4 core CEUs plus a category CEU count set by the FDACS table, over a FOUR-year licence',
        note:
          'Restricted-use, private agriculture and aerial applicators. Core CEUs cannot substitute ' +
          'for category CEUs and there are no substitutions in either direction. Only 4 core CEUs ' +
          'are needed per licence, not 4 per category. If you hold both a 482 certificate and a 487 ' +
          'licence, the same CEUs may count for both provided they fall inside each licence period.',
      },
    ],
    acceptedFormats: [
      'FDACS-approved classroom programs, meetings and seminars',
      'FDACS-approved online and correspondence courses',
      'Passing the FDACS examination instead of CEUs — permitted per category, and you may renew ' +
      'some categories by CEU and others by exam in the same cycle',
    ],
    approvedProviders: [
      {
        name: 'FDACS CEU program search (official)',
        url: 'https://ceu.freshfromflorida.com/',
      },
      {
        name: 'UF/IFAS Pesticide Information Office',
        url: 'https://pested.ifas.ufl.edu/',
      },
    ],
    renewalDeadline:
      'The certificate expires one year after its own issue date, so Florida operators do not share ' +
      'a statewide deadline the way South Carolina does — yours is personal to your certificate. ' +
      'FDACS sends a renewal notice at least 60 days out. THE HARD EDGE: under s.482.111(4) F.S., ' +
      'if you fail to renew AND supply proof of the CEUs within 60 days after expiry, you can be ' +
      'recertified only by REEXAMINATION. There is no longer grace period to fall back on.',
    reciprocity: [
      'Florida does not operate broad pest control reciprocity — the Chapter 482 experience and ' +
      'examination requirements apply regardless of what you hold elsewhere, and at least one year ' +
      'of the qualifying experience must be Florida experience. Confirm with FDACS before ' +
      'relocating a career: (850) 617-7870.',
    ],
  },

  /**
   * SOUTH CAROLINA — Clemson University Department of Pesticide Regulation (DPR).
   *
   * FIRST ODDITY, AND IT IS A REAL ONE: South Carolina does not regulate pesticide applicators
   * through a state department of agriculture. The authority sits inside Clemson University,
   * under Regulatory Services. People search "SC Department of Agriculture pesticide licence"
   * and find nothing useful, because the regulator is a land-grant university.
   *
   * SECOND ODDITY: SC calls them CCUs — Continuing Certification Units — not CEUs. Every
   * third-party page calls them CEUs. Both terms are indexed here on purpose because the
   * licensee searching at 11pm the night before a deadline types whichever one they remember.
   *
   * THE STRUCTURAL DIFFERENCE FROM TX AND WA: SC runs FIXED, STATEWIDE five-year blocks, not a
   * rolling clock from your own licensure date. Everybody in the commercial pool is on the same
   * 1/1/2024–12/31/2028 block regardless of when they were licensed. Texas runs on the calendar
   * year; Washington runs a rolling five years per licensee. Three states, three entirely
   * different shapes of the same obligation.
   *
   * CARRY-OVER IS THE EXACT INVERSE OF WASHINGTON. WA lets nothing cross the cycle boundary.
   * SC lets you carry over excess CCUs — but only the excess you earn during the FINAL year of
   * a block. Get that backwards in either direction and you lose credits you paid for.
   *
   * Figures below are taken from DPR's own recertification page and the text of SC Regulation
   * 27-1078 reproduced on it, not from a CEU vendor.
   */
  SC: {
    stateCode: 'SC',
    verifiedOn: '2026-09-23',
    reviewedByPath: null, // REGISTRY R-06 — named reviewer still outstanding.
    sourceUrls: [
      'https://www.clemson.edu/public/regulatory/pesticide-regulation/licensing/recertification.html',
      'https://www.clemson.edu/public/regulatory/pesticide-regulation/licensing/',
      'https://www.clemson.edu/public/regulatory/pesticide-regulation/exam-information/certification-categories.html',
      'https://www.clemson.edu/public/regulatory/pesticide-regulation/about/faq.html',
    ],
    licenseCategories: [
      { code: '3', name: 'Ornamental and turf pest control' },
      { code: '5', name: 'Aquatic pest control' },
      { code: '6', name: 'Right-of-way pest control' },
      { code: '7A', name: 'Structural, institutional and health-related pest control' },
      { code: '7B', name: 'Structural fumigation' },
      { code: '8', name: 'Public health pest control' },
    ],
    examStructure:
      'Core exam plus a category exam for each category held. Register through DPR at ' +
      'dprexams@clemson.edu. Online exams are available. Exam results stay valid for five years ' +
      'from the date taken. A commercial licence can also be obtained by reciprocating an existing ' +
      'licence from a state SC holds a reciprocal agreement with. Category 7A applicants running a ' +
      'business also need the 7A Structural Pest Control Business licence and a Designated ' +
      'Certified Applicator (DCA) on file.',
    applicationFeeUsd: null, // DPR fee schedule is not reproduced here without the current form.
    renewalCycleMonths: 12, // Licence renews ANNUALLY. The CCU block is a separate five-year clock.
    ceuHoursPerCycle: null, // Commercial total is category-dependent — see below.
    // Total CCUs required per five-year block, by the category held. Category-specific minimums
    // sit inside these totals: 7A needs 12 of its 20 specific to 7A; 3, 5, 7B and 8 each need 3
    // of their 10. Categories 1, 2, 4, 6, 9, 10 and 11 carry no category-specific requirement.
    ceuHoursByCategory: [
      { category: '7A — structural, institutional, health-related', hours: 20 },
      { category: '7B — structural fumigation', hours: 10 },
      { category: '3 — ornamental and turf', hours: 10 },
      { category: '5 — aquatic', hours: 10 },
      { category: '8 — public health', hours: 10 },
      { category: 'All other categories (1, 2, 4, 6, 9, 10, 11)', hours: 10 },
    ],
    recertByTier: [
      {
        tier: 'Commercial Applicator',
        requirement: '10 to 24 CCUs per five-year block, depending on which categories you hold',
        note:
          'Holding 7A alone is 20 CCUs, of which at least 12 must be 7A-specific — by far the ' +
          'heaviest requirement in the state, and it is the category most pest control work sits in. ' +
          'Stacking categories raises it: 7A plus any three of (3, 5, 7B, 8) is 21, and 7A plus all ' +
          'four is 24, which is the statutory ceiling. No combination can ever require more than 24.',
      },
      {
        tier: 'Non-Commercial Applicator',
        requirement: '10 CCUs per five-year block',
        note: 'Non-commercial is the category for federal and state government employees.',
      },
      {
        tier: 'Private Applicator',
        requirement: '5 CCUs per five-year block',
        note: 'Private applicators run on their own block: 1 Jan 2025 – 31 Dec 2029.',
      },
    ],
    acceptedFormats: [
      'DPR-approved in-person training sessions and courses',
      'DPR-approved online and correspondence self-study courses',
      'Passing a written DPR examination in the final year of the block, in place of CCUs entirely',
    ],
    approvedProviders: [
      {
        name: 'DPR approved course search (official)',
        url: 'http://regfocus.clemson.edu/dpr/recert.htm',
      },
      {
        name: 'Check your own CCU status — Commercial',
        url: 'http://regfocus.clemson.edu/dpr/commercial.htm',
      },
      {
        name: 'Clemson Urban Entomology — ATT, MTT, WIR and Termite Control Basics training',
        url: 'https://blogs.clemson.edu/regulatory/',
      },
    ],
    renewalDeadline:
      'Current commercial and non-commercial block: 1 Jan 2024 – 31 Dec 2028. Private block: ' +
      '1 Jan 2025 – 31 Dec 2029. Licences themselves expire 31 December EVERY year and must be ' +
      'renewed annually — a 25% late fee applies from 1 January and renewal stays open until ' +
      '31 March. TWO TRAPS: (1) you may earn no more than HALF your required category-specific ' +
      'CCUs and no more than half your core-competency CCUs during the final year of a block, so ' +
      'the requirement cannot be crammed at the end; (2) if you reach the end of the block without ' +
      'the credits, or without renewing, the licence is REVOKED — not lapsed. Revoked means ' +
      'retaking the full exams and reapplying from scratch.',
    reciprocity: [
      'SC issues commercial licences by reciprocity from states it holds an agreement with, as an ' +
      'alternative to sitting the SC Core and category exams. Confirm the current list with DPR ' +
      'before relying on it: 864-646-2150.',
    ],
  },

  /**
   * WASHINGTON — WSDA Pesticide Management Division.
   *
   * WA is structurally different from Texas in a way that matters and that almost nothing
   * online states plainly: THE ANNUAL RENEWAL AND THE RECERTIFICATION ARE TWO SEPARATE
   * OBLIGATIONS. You renew the licence every calendar year (fee and paperwork), and separately
   * you must recertify every FIVE years by earning credits or by retesting. People who keep
   * their renewals current still lose the licence at the five-year mark because nobody told
   * them the credit clock was running underneath the annual one.
   *
   * The second WA-specific thing: wood-destroying-organism inspections run under a separate
   * Structural Pest Inspector (SPI) licence, not under a pesticide applicator category. A
   * termite inspector in WA and a termite inspector in TX are holding different kinds of
   * credential from different parts of the regulatory structure.
   *
   * SOURCING NOTE — read before editing. The credit counts here (40 per five-year cycle, max
   * 15 in any one calendar year; 20 and max 10 for Private Applicators) are corroborated by
   * two Washington State government sources: the legislature's own bill analyses of the
   * Washington Pesticide Application Act and the WA DNR pesticide laws handbook, alongside
   * WSDA's live recertification pages. WSDA's licensing pages render their credit tables in a
   * way that did not survive extraction, so the per-licence-type table below is deliberately
   * conservative and the fields that could not be confirmed are null rather than guessed.
   *
   * KNOWN OPEN QUESTION (do not publish either version until settled): third-party sources
   * disagree about when the five-year cycle STARTS. One says all types begin the cycle as soon
   * as they gain licensure; another says everything except Limited and Rancher Private begins
   * the year AFTER certification. That is a one-year difference in when somebody's licence
   * dies, so it is left out entirely. WSDA licensing: 877-301-4555.
   */
  WA: {
    stateCode: 'WA',
    verifiedOn: '2026-09-23',
    reviewedByPath: null, // REGISTRY R-06 — named reviewer still outstanding.
    sourceUrls: [
      'https://agr.wa.gov/services/licenses-permits-and-certificates/pesticide-license-and-recertification',
      'https://agr.wa.gov/services/licenses-permits-and-certificates/pesticide-license-and-recertification/recertification',
      'https://agr.wa.gov/services/licenses-permits-and-certificates/pesticide-license-and-recertification/recertification/recertification-by-credit',
      'https://agr.wa.gov/services/licenses-permits-and-certificates/pesticide-license-and-recertification/pesticide-and-spi-licensing/pesticide-license-types-and-categories',
      'https://dnr.wa.gov/publications/fp_pestic_laws_booklet.pdf',
    ],
    // WSDA separates LICENCE TYPE from CATEGORY. What is listed here are the licence types a
    // pest professional actually holds. The numbered treatment categories sit underneath these
    // and are not reproduced until they can be read from WSDA's own table verbatim.
    licenseCategories: [
      { code: 'CA', name: 'Commercial Applicator' },
      { code: 'CO', name: 'Commercial Operator' },
      { code: 'SPI', name: 'Structural Pest Inspector' },
      { code: 'PO', name: 'Public Operator' },
      { code: 'PCC', name: 'Pest Control Consultant' },
      { code: 'PA', name: 'Private Applicator' },
    ],
    examStructure:
      'Written exams administered by WSDA, both paper-based and computer-based, at sites including ' +
      'Olympia, Yakima, Spokane, Wenatchee and Moses Lake. A Commercial Applicator must be licensed ' +
      'in every category in which they work. Commercial Applicators must also carry proof of ' +
      'financial coverage on record with WSDA. Structural Pest Inspector is its own licence and its ' +
      'own exam, covering WDO identification, damage, and conducive conditions.',
    applicationFeeUsd: null, // Fee schedule changes annually — not published here without the current form.
    renewalCycleMonths: 12, // The LICENCE renews annually. Recertification is the separate 5-year clock.
    ceuHoursPerCycle: null, // Pooled figure is wrong for WA — see recertByTier.
    ceuHoursByCategory: [],
    recertByTier: [
      {
        tier: 'Commercial Applicator, Commercial Operator, Structural Pest Inspector, Public Operator, Consultant',
        requirement: '40 WSDA-approved credits every five years, or retest',
        note:
          'No more than 15 credits may be earned in any one calendar year, so the requirement cannot ' +
          'be left to the final year of the cycle — 40 credits needs a minimum of three calendar ' +
          'years. This is the single most common way a WA licence is lost.',
      },
      {
        tier: 'Private Applicator',
        requirement: '20 WSDA-approved credits every five years, or retest',
        note: 'No more than 10 credits in any one calendar year.',
      },
      {
        tier: 'Limited Private and Rancher Private Applicator',
        requirement: 'Reduced credit requirement, and all credits must relate to weed control',
        note:
          'These two types also renew every five years rather than annually. Confirm the current ' +
          'figure with WSDA — it is the one tier where the published third-party numbers disagree.',
      },
    ],
    acceptedFormats: [
      'WSDA-approved on-site courses',
      'WSDA-approved webinars',
      'WSDA-approved self-paced internet courses',
      'Retesting toward the end of the five-year cycle, in place of credits entirely',
    ],
    approvedProviders: [
      {
        name: 'WSDA approved recertification course search',
        url: 'https://agr.wa.gov/services/licenses-permits-and-certificates/pesticide-license-and-recertification/recertification/recertification-courses',
      },
      {
        name: 'WSU Pesticide Education Program (Urban IPM and recertification courses)',
        url: 'https://pep.wsu.edu/',
      },
    ],
    renewalDeadline:
      'Credits must be completed by 11:59 p.m. Pacific on 31 December to count toward that calendar ' +
      'year. Credits CANNOT be carried over into the next five-year cycle — anything surplus is lost ' +
      'at the cycle boundary. WSDA will not review missing credits for courses that took place before ' +
      'the previous calendar year, and all credits must be reported by the course sponsor, not by you.',
    reciprocity: [
      'WSDA issues reciprocal licences and maintains its own list of recognised states. WSDA may also ' +
      'waive recertification where the licensee demonstrates comparable standards met through another ' +
      'state or an EPA-approved government agency plan.',
      'Confirm any reciprocal arrangement with WSDA before relying on it: https://agr.wa.gov/services/licenses-permits-and-certificates/pesticide-license-and-recertification/pesticide-and-spi-licensing/reciprocal-licenses',
    ],
  },

  /**
   * TEXAS — verified 23 Sep 2026 against the Texas Department of Agriculture's own pages.
   *
   * Worth recording why this state matters as a test case. During verification, a licensing
   * content site ranking on page one stated that Texas structural pest control is regulated by
   * TDLR. That is wrong: the Structural Pest Control Board became the Structural Pest Control
   * Service within TDA on 1 Sep 2007. Being right where the ranking pages are wrong is the
   * entire thesis of this layer.
   */
  TX: {
    stateCode: 'TX',
    verifiedOn: '2026-09-23',
    reviewedByPath: null, // REGISTRY R-06 — named reviewer still outstanding.
    sourceUrls: [
      'https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Licensing',
      'https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Licensing/SPCS-Technician-and-Apprentice-Licensing',
      'https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Licensing/SPCS-Certified-Applicator-Licensing',
    ],
    // TDA's own category names, verbatim. Do not paraphrase these — applicators search the
    // exact wording that appears on their licence.
    licenseCategories: [
      { code: 'PC', name: 'Pest control' },
      { code: 'TC', name: 'Termite control' },
      { code: 'LO', name: 'Lawn and ornamental' },
      { code: 'SF', name: 'Structural fumigation' },
      { code: 'CF', name: 'Commodity fumigation' },
      { code: 'WC', name: 'Weed control' },
      { code: 'WP', name: 'Wood preservation' },
    ],
    examStructure:
      'Technician: one category exam per category trained, $64 each, taken after an SPCS-approved ' +
      'Technician Training Course. Certified Applicator: the General Standards exam plus at least ' +
      'one category exam. Both require 70% to pass.',
    applicationFeeUsd: 125,
    renewalCycleMonths: 12,
    ceuHoursPerCycle: null, // Texas does not use a single pooled figure — see recertByTier.
    ceuHoursByCategory: [],
    recertByTier: [
      {
        tier: 'Apprentice',
        requirement: '20 hours general standards + 8 hours classroom and 40 hours on-the-job per category',
        note:
          'Initial training, not recertification. The 20 general hours must include at least 2 hours ' +
          'in each of ten named subjects. Apprentice card runs 12 months from date of hire.',
      },
      {
        tier: 'Technician',
        requirement: '8 hours verifiable training in general standards each calendar year',
        note:
          'Not called CEUs. Up to 2 of the 8 may be on-the-job or hands-on. Internet or video counts ' +
          'if the certified applicator certifies it is appropriate. An SPCS-approved CEU course counts ' +
          'hour for hour. No course repeats for credit in the same year. Records kept on the ' +
          'Verifiable Training Record form for 2 years after employment ends.',
      },
      {
        tier: 'Certified Applicator',
        requirement: '2 CEUs general training + 1 CEU in each category certified',
        note:
          'At least 1 of the 2 general units must be federal and state laws, pesticide safety, ' +
          'environmental protection or IPM. No CEUs needed in the first year the licence is issued. ' +
          'Self-study or internet courses only every other year. No repeats within a recertification year.',
      },
    ],
    acceptedFormats: [
      'SPCS-approved classroom courses',
      'Self-study or internet — certified applicators may use these only every other year',
      'On-the-job or hands-on — technicians only, capped at 2 of the 8 required hours',
    ],
    approvedProviders: [
      {
        name: 'SPCS Course Providers (official list)',
        url: 'https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Course-Providers',
      },
    ],
    renewalDeadline:
      'CEUs are counted on the calendar year (1 Jan – 31 Dec) and apply to the FOLLOWING year\'s ' +
      'renewal. Licences expire annually, tied to the expiration of the business licence they sit under ' +
      '— not to the individual\'s own anniversary.',
    reciprocity: [
      'TDA maintains reciprocal agreements for pesticide applicator licensing — confirm current ' +
      'agreements with TDA directly before relying on one.',
    ],
  },
};

export function getRegulatory(code: string): StateRegulatory | undefined {
  return REGULATORY[code];
}
