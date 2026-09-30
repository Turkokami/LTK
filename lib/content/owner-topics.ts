/**
 * owner-topics.ts — "Running a company" explainers (/trade/owners/:slug/).
 * Researched 2026-09-30 against agency pages, eCFR, statutes, court rulings and SEC filings;
 * every page lists its sources. `notes` is maintainer-only (gaps, inferences, recheck items)
 * and is never rendered. Recheck: DOL contractor rule (proposed Feb 2026), OSHA heat rule
 * (proposed), Rollins FTC order terms, Texas insurance amounts (the /trade/start/ page governs).
 */

export interface OwnerTopic {
  slug: string;
  title: string;
  /** 140–160 characters. */
  metaDescription: string;
  question: string;
  /** 40–60 words, answer-first. */
  answer: string;
  keyFact: string;
  sections: { heading: string; body: string[] }[];
  checklist: string[];
  sources: { label: string; url: string }[];
  /** Maintainer-only. Never rendered. */
  notes: string;
  verifiedOn: string;
}

export const OWNER_TOPICS: OwnerTopic[] = [
  {
    slug: 'hiring-your-first-technician',
    metaDescription: 'Employee or contractor, overtime on commission, I-9 and new-hire reports, workers’ comp and tech licensing: what to settle before your first technician starts.',
    title: 'Hiring your first technician',
    question: 'What do I need to get right before my first technician starts?',
    answer:
      'Settle employee versus contractor first; a tech who runs your routes on your schedule is usually an employee. Pay at least minimum wage and overtime after 40 hours, even on commission unless a narrow exemption fits. Complete Form I-9 within three business days, collect a W-4, report the hire to your state, and check technician licence rules.',
    keyFact:
      'The FLSA section 7(i) commission exemption needs all three: a retail or service establishment, a regular rate above 1.5 times the applicable minimum wage, and more than half of pay from commissions over a representative period (DOL Fact Sheet #20).',
    sections: [
      {
        heading: 'Employee or independent contractor',
        body: [
          'The IRS looks at three kinds of evidence: behavioral control (do you direct how the work is done), financial control (who pays expenses and supplies tools), and the type of relationship (contracts, benefits, whether the work is central to your business). There is no magic number of factors. If you are unsure, you or the worker can file Form SS-8 for an IRS ruling, but expect to wait six months or more.',
          'The Labor Department runs its own test for wage law. It has stopped applying its 2024 contractor rule in investigations, and on February 26, 2026 it proposed replacing it with a test built on two core factors: how much control the worker has, and the worker’s chance for profit or loss from initiative or investment. Comments closed April 28, 2026. As of September 30, 2026 no final rule has been issued.',
          'In practice, a tech who works your accounts, in your truck, under your licence and your schedule looks like an employee under both tests. Treat 1099 arrangements as the exception that needs a written reason.',
        ],
      },
      {
        heading: 'Wages, overtime and commission pay',
        body: [
          'Covered employees get time and one-half their regular rate for hours over 40 in a workweek. Commissions do not change that on their own. They are part of the regular rate used to figure overtime.',
          'The section 7(i) exemption lets some commission-paid employees skip overtime, but only at a retail or service establishment: one where 75% of annual sales of goods or services are not for resale and are recognized as retail in the industry. The regular rate must also exceed 1.5 times minimum wage every overtime week, and commissions must be more than half of pay over a representative period of one month to one year.',
          'No federal rule says pest control qualifies. In 2020 the Labor Department withdrew its old industry lists and now applies the same Part 779 analysis to every establishment. Mixed residential and commercial work makes the 75% test harder to call. Get a wage-hour attorney’s opinion before you rely on 7(i), and keep accurate hours records either way.',
        ],
      },
      {
        heading: 'New-hire paperwork',
        body: [
          'Form I-9: the employee completes Section 1 no later than the first day of work. You complete Section 2, after examining their documents, within 3 business days of the first day of work for pay. A tech who starts Monday needs Section 2 done by Thursday.',
          'Collect a federal Form W-4 for withholding. Federal law also requires you to report each new or rehired employee to the state where they work within 20 days of hire; some states require it sooner. Many employers send the W-4 data, and states prefer electronic reports through their new-hire website.',
        ],
      },
      {
        heading: 'Workers’ comp and technician licensing',
        body: [
          'Workers’ comp rules are set state by state. Call your state workers’ comp agency or a licensed agent before the first day and have coverage in place when the tech starts, not after the first injury.',
          'Before a new tech treats a single account, check what your state requires of technicians: a registration, an ID card, a licence, or direct supervision rules. Our state start pages for Texas, Washington, Florida, California and South Carolina list the requirements with sources.',
          'This is general information, not legal or tax advice. Confirm classification and pay plans with the Labor Department, the IRS, your accountant or an employment attorney.',
        ],
      },
    ],
    checklist: [
      'Write down why the new tech is an employee or a contractor, using the IRS control factors.',
      'Set the pay plan so every workweek clears minimum wage and pays overtime after 40 hours.',
      'Do not claim the 7(i) commission exemption without a written opinion from a wage-hour attorney.',
      'Complete I-9 Section 2 within 3 business days of the first paid day, and keep it on file.',
      'Collect a W-4 and file the state new-hire report within 20 days, or sooner if your state says so.',
      'Bind workers’ comp coverage before the first shift.',
      'Register or license the tech with your state pesticide agency before they apply anything.',
    ],
    sources: [
      {
        label: 'IRS: Independent contractor (self-employed) or employee?',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee',
      },
      {
        label: 'DOL WHD: 2026 proposed rule on employee or independent contractor status (RIN 1235-AA46)',
        url: 'https://www.dol.gov/agencies/whd/flsa/misclassification/2026rulemaking',
      },
      {
        label: 'DOL WHD: Overtime pay',
        url: 'https://www.dol.gov/agencies/whd/overtime',
      },
      {
        label: 'DOL WHD Fact Sheet #20: Commission employees of retail or service establishments, section 7(i)',
        url: 'https://www.dol.gov/agencies/whd/fact-sheets/20-flsa-commissions-retail',
      },
      {
        label: 'DOL WHD: 2020 final rule withdrawing the retail-concept industry lists (29 CFR 779.317, 779.320)',
        url: 'https://www.dol.gov/agencies/whd/overtime/2020-7i',
      },
      {
        label: 'USCIS: Completing Section 2 of Form I-9',
        url: 'https://www.uscis.gov/i-9-central/completing-form-i-9/completing-section-2-employer-review-and-attestation',
      },
      {
        label: 'HHS ACF Office of Child Support Services: New hire reporting',
        url: 'https://acf.gov/css/employers/employer-responsibilities/new-hire-reporting',
      },
    ],
    notes:
      'Seven sources, one over the 3-6 target; each carries a claim that could not be merged. Commission-in-regular-rate statement also matches 29 CFR 778.117 (opened via eCFR API, not listed). I-9 Section 1 deadline (first day of employment) comes from the USCIS Section 1 page, opened but not listed. The 2014 CFR text of the withdrawn lists (779.317 and 779.320) was checked: neither list named pest control or exterminators, so there was never a federal list either way. Whether a pest company can meet the 7(i) retail concept is unresolved; the "mixed residential and commercial work makes the 75% test harder" line is an inference, not an agency statement. "In practice ... looks like an employee" is an inference from the IRS and DOL factors. Federal minimum wage figure ($7.25, DOL minimum-wage page) deliberately left out so the page does not go stale; states may be higher. Workers’ comp: Texas Department of Insurance confirms Texas private employers may opt out as non-subscribers (with notice duties); left out to keep to the source limit, and the SBA page’s claim that the federal government requires workers’ comp was not used because workers’ comp is state-run. Technician licensing is pointed to the /trade/start/ pages rather than restated. DOL 2026 rule status: DOL page shows proposed rule only; re-check for a final rule before publishing. DOL press release page (whd20260226) returned 403.',
    verifiedOn: '2026-09-30',
  },
  {
    slug: 'business-insurance',
    metaDescription: 'The insurance a pest control company carries: licence minimums, care, custody and control, pesticide claims, WDO errors and omissions, trucks and employees.',
    title: 'Insurance a pest control company carries',
    question: 'What insurance does a pest control company need?',
    answer:
      'Start with what your state demands for the business licence: liability coverage at a set minimum, sometimes a bond, and in some states errors and omissions for WDO reports. Then close the gaps: damage to the property you are treating, pesticide-related claims, vehicles and injured employees. Read the exclusions, not just the limits, before you sign.',
    keyFact:
      'Alabama requires WDO permit holders to carry errors and omissions coverage of at least $100,000 on the official wood infestation report, on top of at least $150,000 liability coverage (Ala. Admin. Code r. 80-10-9-.28).',
    sections: [
      {
        heading: 'Start with the licence requirement',
        body: [
          'Most pest control business licences come with a proof-of-insurance requirement. The minimums, the form and the cancellation-notice rules vary by state. Our state start pages for Texas, Washington, Florida, California and South Carolina list each state’s sourced minimums, so check yours there first.',
          'Some states let you post a bond instead. Washington, for example, accepts either a surety bond or a liability insurance policy as evidence of financial responsibility for a commercial pesticide applicator licence, and only from insurers authorized in the state or placed as surplus lines.',
        ],
      },
      {
        heading: 'The gaps a standard policy can leave',
        body: [
          'Care, custody or control. Texas and Alabama both require the policy to cover damage to persons or property under your care, custody or control; Texas says the policy’s care, custody and control exclusion must be deleted. That is exactly the house or building you are treating. Ask your agent to confirm in writing that your policy covers it.',
          'Pesticide claims. Purdue Extension, writing about spray drones, notes that general liability coverage typically excludes liability from the contents of the spray tank, and that chemical liability is sold as its own coverage. Ask how your policy treats pesticide drift, contamination and pollution, and get the answer on paper.',
        ],
      },
      {
        heading: 'WDO inspections and errors and omissions',
        body: [
          'A wood-destroying organism report is a professional opinion that buyers and lenders rely on. The SBA describes professional liability insurance as protection against losses from errors and negligence.',
          'Some states require it. Alabama requires WDO permit holders to carry at least $100,000 in errors and omissions coverage on the official Alabama Wood Infestation Inspection Report, plus coverage for damage caused by wood-destroying organisms. If you write WDO reports anywhere, price E&O even where it is optional.',
        ],
      },
      {
        heading: 'Vehicles, employees and the rest',
        body: [
          'Commercial auto covers your trucks. Federal minimum financial responsibility rules for hazmat carriers in 49 CFR Part 387 mostly apply to vehicles rated 10,001 pounds or more. For example, a truck at that weight carrying listed hazardous materials across state lines needs at least $1,000,000 in public liability coverage. Lighter service trucks fall outside those federal minimums, but your state’s auto insurance rules still apply.',
          'Workers’ comp covers injured employees; the rules come from your state, so ask your state workers’ comp agency what applies from the first hire. The SBA lists general liability, product liability, professional liability, commercial property and a bundled business owner’s policy among the common small-business coverages.',
          'This is general information, not legal advice. Confirm required coverage with your state pesticide agency and have a licensed agent and, for contract questions, an attorney review the policy wording.',
        ],
      },
    ],
    checklist: [
      'Pull your state’s licence insurance minimum from our state start page or the agency rule.',
      'Get written confirmation that the policy covers property under your care, custody or control.',
      'Ask how the policy treats pesticide drift, contamination and pollution claims.',
      'Price errors and omissions coverage if you write WDO or real estate termite reports.',
      'Make sure the policy names the business exactly as it appears on the licence.',
      'Check that commercial auto lists every service vehicle and every driver.',
      'Diary the renewal date so the agency never gets a cancellation notice first.',
    ],
    sources: [
      {
        label: 'Texas Department of Agriculture: SPCS insurance requirements (care, custody and control exclusion must be deleted)',
        url: 'https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Business/SPCS-Insurance-Requirements',
      },
      {
        label: 'Alabama Administrative Code r. 80-10-9-.28: Financial responsibility for insurance coverage',
        url: 'https://admincode.legislature.state.al.us/api/rule/80-10-9-.28',
      },
      {
        label: 'Washington RCW 17.21.160: Commercial pesticide applicator licence, financial responsibility',
        url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=17.21.160',
      },
      {
        label: 'U.S. Small Business Administration: Get business insurance',
        url: 'https://www.sba.gov/business-guide/launch-your-business/get-business-insurance',
      },
      {
        label: 'Purdue University: Spray drones, chapter 13, Insurance for protecting your investment',
        url: 'https://ag.purdue.edu/department/extension/ppp/resources/ppp-publications/mobile/ppp-154/13.insurance-for-protecting-your-investment-and-challenges-from-lawsuits.html',
      },
      {
        label: 'eCFR 49 CFR 387.9: Financial responsibility, minimum levels',
        url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387/subpart-A/section-387.9',
      },
    ],
    notes:
      'Texas: the TDA PDF opened (dated July 2020 in metadata) shows $200,000 per occurrence / $300,000 aggregate, while a search-engine summary reported $500,000 / $1,000,000. The PDF may be out of date. I used Texas only for the care-custody-control wording and did not restate any Texas amount; the site’s /trade/start/tx/ page should remain the authority on the number. No federal or state agency source was found that describes the standard CGL care-custody-control exclusion or pollution exclusion in general terms; the page states what the state rules require and quotes Purdue’s drone-context note, and tells readers to confirm with their agent. A Massachusetts rule (333 CMR 10.13) reportedly requires an endorsement modifying the pollution exclusion, but the mass.gov PDF could not be opened (403), so it was left out. Penn State ag law drift fact sheet download failed. 49 CFR 387: the $1,000,000 figure is table entry (3) of 387.9 (for-hire and private, interstate, GVWR 10,001 lb or more). Whether the HMR Materials of Trade exception affects Part 387 applicability was not verified; the "lighter trucks fall outside" line relies on 387.3(c)(1) exception for GVWR under 10,001 lb, which has carve-outs for Division 1.1-1.3, 2.3 Zone A, 6.1 PG I Zone A and Class 7 highway-route quantities. The SBA page says federal law requires workers’ comp, unemployment and disability insurance for businesses with employees; not repeated because workers’ comp and disability are state programs. Bonds: only Washington verified.',
    verifiedOn: '2026-09-30',
  },
  {
    slug: 'vehicles-and-hazmat',
    metaDescription: 'Hauling pesticides in service trucks: the DOT Materials of Trade exception and its limits, when placards and a CDL kick in, and state decal and storage rules.',
    title: 'Hauling pesticides: DOT, placards and decals',
    question: 'What DOT and state rules apply when my service trucks carry pesticides?',
    answer:
      'Most service trucks can run under DOT’s Materials of Trade exception: small packages, 440 pounds total, original or equally strong containers, marked with the product name, secured against shifting, and a driver who knows what is aboard. Go past those limits and full hazmat rules, placards and a CDL can follow. States add decal and storage rules.',
    keyFact:
      'Materials of Trade limits: 30 kg (66 lb) or 30 L (8 gal) per package for Packing Group II or III, 0.5 kg (1 lb) or 0.5 L (1 pint) for Packing Group I, and 200 kg (440 lb) aggregate gross weight per vehicle (49 CFR 173.6).',
    sections: [
      {
        heading: 'What counts as a material of trade',
        body: [
          'DOT defines a material of trade as a hazardous material, other than hazardous waste, carried by a private motor carrier in direct support of a principal business that is not transportation. A pest company hauling its own products to its own jobs fits that description.',
          'The exception covers Class 3, 8 and 9 materials and Divisions 4.1, 5.1, 5.2 and 6.1 within set package sizes: up to 1 pound or 1 pint for Packing Group I, and up to 66 pounds or 8 gallons for Packing Group II or III. All materials of trade on one vehicle may not exceed 440 pounds gross. Hazardous waste, self-reactive materials and materials poisonous by inhalation are excluded.',
          'Check each product’s safety data sheet for its hazard class, packing group and any inhalation hazard before you count it as a material of trade.',
        ],
      },
      {
        heading: 'The rules you still have to follow',
        body: [
          'Packages must be leak tight for liquids, sift proof for solids, securely closed, secured against shifting and protected against damage. Use the manufacturer’s original packaging or one of equal or greater strength.',
          'Each non-bulk package must be marked with a common name or proper shipping name, plus "RQ" if it holds a reportable quantity of a hazardous substance. The driver must be told that hazardous materials are aboard and what this section requires.',
        ],
      },
      {
        heading: 'When placards and a CDL come in',
        body: [
          'Carry more than the Materials of Trade limits and the exception no longer applies; the rest of the hazardous materials regulations do. For materials in placarding Table 2, placards are not required below 1,001 pounds aggregate gross weight, except for bulk packagings and materials covered by 49 CFR 172.505.',
          'The CDL rule turns on placards. Federal CDL rules treat a vehicle of any size as a commercial motor vehicle if it carries hazardous materials that must be placarded. The driver then needs a CDL with a hazardous materials endorsement, which requires a knowledge test.',
        ],
      },
      {
        heading: 'State decals, storage and spill rules',
        body: [
          'South Carolina requires every vehicle that transports pesticides to and from a job, or is used to apply them, to carry a Department of Pesticide Regulation identification symbol on both sides, kept clean and readable from 100 feet. Company cars that never haul pesticide do not need one.',
          'Georgia’s Structural Pest Division tells companies that pesticides must be in a locked compartment, such as a truck toolbox, whenever they are out of the applicator’s view. Service containers must carry the product name and EPA registration number, food containers are never allowed, the label must be available to the person applying, and each truck needs a spill kit big enough for the largest potential spill.',
          'This is general information, not legal advice. Confirm with PHMSA’s Hazardous Materials Information Center, your state pesticide agency or a transportation attorney.',
        ],
      },
    ],
    checklist: [
      'List every product on each truck with its hazard class and packing group from the SDS.',
      'Weigh a fully loaded truck’s hazmat and keep it under 440 pounds gross.',
      'Keep products in original containers or labeled service containers with the EPA registration number.',
      'Strap or box everything so nothing shifts, and lock it when the tech walks away.',
      'Carry a spill kit sized to the biggest spill the truck could have.',
      'Brief every driver on what hazardous materials are aboard.',
      'Check your state for vehicle decal or marking rules before a new truck goes out.',
    ],
    sources: [
      {
        label: 'eCFR 49 CFR 173.6: Materials of trade exceptions',
        url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-C/part-173/subpart-A/section-173.6',
      },
      {
        label: 'eCFR 49 CFR 171.8: Definitions (material of trade)',
        url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-C/part-171/subpart-A/section-171.8',
      },
      {
        label: 'eCFR 49 CFR 172.504: General placarding requirements',
        url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-I/subchapter-C/part-172/subpart-F/section-172.504',
      },
      {
        label: 'eCFR 49 CFR Part 383: Commercial driver’s licence standards (383.5 definitions, 383.93 endorsements)',
        url: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383',
      },
      {
        label: 'South Carolina Code of Regulations Chapter 27, reg. 27-1083 (vehicle identification, records)',
        url: 'https://www.scstatehouse.gov/coderegs/Chapter%2027.pdf',
      },
      {
        label: 'Georgia Department of Agriculture Structural Pest Division: CAM 5, Pesticide safety on vehicles (rev. 01/15/2021)',
        url: 'https://agr.ga.gov/sites/default/files/documents/pest-control/cam-5-pesticide-safety-on-vehicles.pdf',
      },
    ],
    notes:
      'eCFR text was read through the eCFR renderer API (the web pages redirect bots). PHMSA’s Materials of Trade guidance page returned 403; a search summary says PHMSA’s MOTs brochure names pest control as an example business, but it was not opened, so that claim is not on the page. The line that some fumigants may be excluded as poisonous by inhalation was cut to a general "check the SDS" instruction because no product-level source was checked. 173.6(d) aggregate exception applies except for (a)(1)(iii) diluted Class 9 and (a)(7)(iii) batteries; not relevant to most pest trucks, left out. Limited-quantity packages (173.6(a)(6)) are also eligible; left out for length. Whether the full HMR impose shipping papers, emergency response information and training above MOT limits is true under Parts 172 and 177 but was not separately opened, so the page says only that "the rest of the regulations apply." 172.504 Table 1 materials (for example Division 2.3, 6.1 PG I Zone A inhalation hazards) require placards in any quantity; not spelled out. The Georgia CAM 5 is agency compliance guidance, not the rule text; it cites Rule 620-6-.04 for backflow. Georgia requirements stated as the Division’s guidance. Florida statute 482.051(5) also requires a copy of the label in the vehicle at the site for new-construction subterranean termite pretreatment (opened, not listed). Texas vehicle identification (4 TAC 7.27) exists for agricultural applicator businesses but was not opened on an agency site.',
    verifiedOn: '2026-09-30',
  },
  {
    slug: 'pesticide-recordkeeping',
    metaDescription: 'What pesticide application records a pest company must keep and for how long, now the federal USDA rule is gone, with state examples and customer notice rules.',
    title: 'Pesticide application records',
    question: 'What pesticide records does a commercial pest company have to keep, and for how long?',
    answer:
      'Your state sets the rules. Federal rules make every state certification plan require commercial applicators to keep restricted-use records for at least two years. States such as South Carolina and Florida go further and cover every application. Termite work often runs longer: South Carolina wants five years or the life of the warranty, whichever is longer.',
    keyFact:
      'USDA’s federal restricted-use pesticide recordkeeping rule for certified applicators, 7 CFR Part 110, was rescinded effective July 11, 2025 (90 FR 20083).',
    sections: [
      {
        heading: 'The federal floor after 2025',
        body: [
          'USDA’s restricted-use pesticide recordkeeping rule at 7 CFR Part 110 is gone. USDA rescinded it effective July 11, 2025, calling it obsolete; the federal program had been defunded and closed on September 30, 2012.',
          'What remains is EPA’s certification rule. Under 40 CFR 171.303, every state plan must require certified commercial applicators to keep restricted-use records for at least two years and make them available to state officials. The minimum fields: customer name and address, location, size of area treated, site, time and date, brand or product name, EPA registration number, total amount applied per location per application, and the name and certification number of the certified applicator, plus any noncertified applicator working under direct supervision.',
          'If noncertified techs apply restricted-use products under your supervision, 40 CFR 171.201 also requires records showing each one met the training or qualification standard, including the tech’s printed name and signature, the date, the trainer and what training was given.',
        ],
      },
      {
        heading: 'What state rules look like',
        body: [
          'State pest rules usually cover every product, not just restricted-use ones. South Carolina requires the company to record the quantity of each pesticide used, received or purchased, the common chemical name of the active ingredient, the brand name and EPA registration number, the pest or purpose, and the date and place of application. For general household insect control the pest can be listed as "household pests."',
          'Florida requires pest control records, including contracts, to be kept at the licensed business location or the Florida address on the licence application, and electronic records must be produced on request. Fumigation records must include the fumigant cylinder identification number.',
        ],
      },
      {
        heading: 'How long to keep them',
        body: [
          'South Carolina: five years, or as long as a warranty or contract continues, whichever is longer, for both pre-construction and post-construction termite treatments, including bait systems. Two years for everything else.',
          'Florida: at least two years for pest control records and restricted-use operational records, three years for preventive subterranean termite treatment in new construction, and two years for fumigation records, which must be handed over within 3 business days of a request.',
          'If you work in more than one state, keep to the longest period that applies, and keep termite records for as long as any warranty on that property is live.',
        ],
      },
      {
        heading: 'Telling the customer',
        body: [
          'South Carolina requires a written statement at the customer’s request showing the company name and address, the pest, the common chemical name of the active ingredient (not the brand), and the responsible licensed applicator. Continuing household contracts may use general pest terms and list alternate chemicals.',
          'California requires a registered structural pest control company to give the owner and tenant written notice of the pest, the pesticides and active ingredients, a required caution statement, and the treatment frequency on a contract. Fumigation notice is due at least 48 hours before; other applications need it no later than the application. It can go by mail or email, by posting on the property, or by hand; commercial buildings also need a posted notice.',
          'This is general information, not legal advice. Confirm current record and notice rules with your state pesticide agency.',
        ],
      },
    ],
    checklist: [
      'Record every application the day it happens, not at the end of the week.',
      'Capture product name, EPA registration number, amount, site, pest, date, address and applicator on every ticket.',
      'Keep a signed training record for each noncertified tech who applies restricted-use products.',
      'Keep termite records for the longest of your state minimum or the life of the warranty.',
      'Store records where your licence says they must be, and be able to produce them within days.',
      'Build the customer notice or statement into your service ticket so it goes out every time.',
    ],
    sources: [
      {
        label: 'Federal Register 90 FR 20083 (May 12, 2025): Rescission of 7 CFR Part 110 recordkeeping',
        url: 'https://www.govinfo.gov/content/pkg/FR-2025-05-12/pdf/2025-08220.pdf',
      },
      {
        label: 'eCFR 40 CFR Part 171: Certification of pesticide applicators (171.201, 171.303)',
        url: 'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-171',
      },
      {
        label: 'South Carolina Code of Regulations Chapter 27, reg. 27-1083 (records, customer statement)',
        url: 'https://www.scstatehouse.gov/coderegs/Chapter%2027.pdf',
      },
      {
        label: 'Florida Administrative Code r. 5E-14.142 (effective 5/18/2026): Records, reports, advertising, applications',
        url: 'https://www.flrules.org/gateway/ruleNo.asp?id=5E-14.142',
      },
      {
        label: 'California Business and Professions Code section 8538: Notice before application',
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=8538',
      },
    ],
    notes:
      'Important correction to the brief: 7 CFR Part 110 no longer exists. USDA AMS rescinded it by final rule published May 12, 2025 (90 FR 20083, Docket AMS-AMS-25-0019), effective July 11, 2025; eCFR version history confirms the sections were removed that day. The FR summary says Part 110 set requirements for "all certified private and commercial applicators"; industry and extension sources describe it mainly as the private-applicator rule. The page avoids characterizing its old scope. University of Illinois Extension (opened) confirms the rescission and advises continued recordkeeping. Florida rule text was read from the current adopted version (flrules tid 30832437, effective 5/18/2026); the 3-year pretreat period is cross-referenced to F.S. 482.051(5), which was also opened. The "multi-state, keep the longest" and "keep termite records while any warranty is live" lines are practical advice, not agency statements (South Carolina does require the warranty-length rule for termite work). Texas 4 TAC 7.144 (2-year records) was seen only on LII; the Texas SOS rule viewer has moved and did not load, so Texas is omitted. Texas 4 TAC 7.145 (TDA PDF, opened) requires contracts and invoices be kept two years; not used. California Branch 1 is fumigation; Branch 2 and 3 are general pest and wood-destroying organisms; branch names inferred from the code structure, not quoted.',
    verifiedOn: '2026-09-30',
  },
  {
    slug: 'osha-for-pest-companies',
    metaDescription: 'OSHA rules for pest control companies: hazard communication, PPE and respirators, heat and ladders, and why the Worker Protection Standard rarely applies.',
    title: 'OSHA basics for pest control companies',
    question: 'Which OSHA rules apply to a pest control company, and does the Worker Protection Standard?',
    answer:
      'OSHA’s general industry rules apply: a written hazard communication program with SDS access and training, a PPE hazard assessment, a full respirator program when respirators are required, and ladder rules. EPA’s Worker Protection Standard does not cover structural pest control. It applies to pesticide use in producing agricultural plants on farms, forests, nurseries and greenhouses.',
    keyFact:
      '40 CFR 170.303(b)(8): the Worker Protection Standard does not apply to pesticide use not directly related to producing agricultural plants, including structural pest control.',
    sections: [
      {
        heading: 'Hazard communication',
        body: [
          'You need a written hazard communication program at each workplace. It lists the hazardous chemicals present and explains how you handle labels, safety data sheets and training.',
          'Keep an SDS for each hazardous chemical, readily accessible to employees during every shift in their work area. Electronic access is fine if nothing gets in the way of immediate access, which matters for techs on the road. Train employees when they are first assigned and whenever a new chemical hazard comes into their work.',
          'OSHA does not require its own labels on pesticides that carry EPA-regulated FIFRA labeling. That exemption covers labeling only. The written program, SDS and training duties still apply to your pesticides.',
        ],
      },
      {
        heading: 'PPE and respirators',
        body: [
          'Follow each product label’s PPE statement. Then do OSHA’s hazard assessment for everything else the job brings: attics, crawlspaces, sharp edges, eye hazards. OSHA requires you to select PPE for the hazards found, tell each employee, make sure it fits, and keep a written certification naming the workplace, the person who did the assessment and the date.',
          'If respirators are necessary to protect employees, or you require them, you need a written respiratory protection program with worksite procedures and a trained program administrator. Each wearer needs a medical evaluation. Anyone in a tight-fitting respirator must be fit tested before first use, when the facepiece changes, and at least once a year.',
          'Voluntary use is lighter. If a tech chooses to wear one when it is not required, give them OSHA’s Appendix D information. If the only voluntary use is filtering facepieces (dust masks), those employees do not have to be in a written program.',
        ],
      },
      {
        heading: 'Heat, ladders and attics',
        body: [
          'Federal OSHA handles heat through the General Duty Clause and promotes water, rest and shade. New workers need time to build tolerance: shorter shifts, frequent breaks, plenty of fluids and quick attention to symptoms. OSHA’s heat National Emphasis Program was reissued effective April 10, 2026. Washington, Minnesota, California, Oregon and Colorado have their own heat laws.',
          'Inspect ladders before first use each shift. Tag any damaged ladder "Dangerous: Do Not Use" and take it out of service. Portable ladders used to reach an upper landing need side rails that extend at least 3 feet above it, and a ladder is used only for its designed purpose.',
        ],
      },
      {
        heading: 'Does the Worker Protection Standard apply?',
        body: [
          'Usually not. The WPS applies when a product labeled for WPS is used in producing agricultural plants on an agricultural establishment: a farm, forest, nursery or greenhouse. It expressly does not apply to structural pest control, or to ornamental plantings such as lawns, parks and landscaping kept for looks.',
          'If you treat crops in a greenhouse or nursery with a WPS-labeled product, read the label and 40 CFR Part 170 before the job.',
          'This is general information, not legal advice. Confirm with OSHA, your state plan office if you have one, or your state pesticide agency.',
        ],
      },
    ],
    checklist: [
      'Write the hazard communication program and list every product you stock.',
      'Put SDS access on every tech’s phone or truck and test that it works offline.',
      'Do and sign the PPE hazard assessment, and keep the certification on file.',
      'If any label or task requires a respirator, set up medical evaluations and annual fit tests.',
      'Set a heat plan: water on every truck, shade breaks, and lighter duty for new hires.',
      'Add a ladder check to the start-of-shift truck inspection.',
    ],
    sources: [
      {
        label: 'eCFR 29 CFR 1910.1200: Hazard Communication',
        url: 'https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-Z/section-1910.1200',
      },
      {
        label: 'eCFR 29 CFR 1910.132: Personal protective equipment, general requirements',
        url: 'https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-I/section-1910.132',
      },
      {
        label: 'eCFR 29 CFR 1910.134: Respiratory protection',
        url: 'https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-I/section-1910.134',
      },
      {
        label: 'eCFR 29 CFR 1910.23: Ladders',
        url: 'https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XVII/part-1910/subpart-D/section-1910.23',
      },
      {
        label: 'OSHA: Heat exposure',
        url: 'https://www.osha.gov/heat-exposure',
      },
      {
        label: 'eCFR 40 CFR 170.303: Worker Protection Standard applicability',
        url: 'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-170/subpart-C/section-170.303',
      },
    ],
    notes:
      'Federal heat standard status (from https://www.osha.gov/heat-exposure/rulemaking, opened but not listed to stay within six sources): proposed rule published August 30, 2024; informal hearing ended July 2, 2025; post-hearing submissions due October 30, 2025; no final rule as of 2026-09-30. Add a line if one is issued. The five state heat-law states are as listed on OSHA’s heat page; OSHA-approved state plans may have other rules. "Follow each label’s PPE statement" is advice; the label-is-the-law principle (EPA, "It is a violation of Federal law to use this product in a manner inconsistent with its labeling") was verified on EPA’s pesticide label page but that page is not listed. Whether a label-required respirator makes respirator use "required" under 1910.134(c)(1) is an inference; the page says "if you require them" and the checklist treats label or task requirements as triggering the program, which is the conservative reading. The greenhouse/nursery line is an inference from 170.303(a) and the definition of agricultural establishment in 170.3 (farm, forest, nursery or greenhouse); it does not claim the pest company becomes the WPS employer. 1910.23 is the general industry ladder rule; construction work falls under 29 CFR 1926.1053, not covered. Fall protection beyond ladders (1910.28) not researched. HCS 2024 update compliance dates not researched.',
    verifiedOn: '2026-09-30',
  },
  {
    slug: 'buying-and-selling-a-company',
    metaDescription: 'What buyers look at when a pest control company sells: customer contracts, a licence that belongs to a person, earn-outs, and non-competes after the FTC rule.',
    title: 'Buying or selling a pest control company',
    question: 'What do buyers look at when a pest control company changes hands, and what trips deals up?',
    answer:
      'Buyers pay for customers they can keep: recurring contracts, clean records and a licence that survives closing. The licence is the trap. Some states tie the business licence to a qualified person, so if the seller is that person, plan who qualifies after the sale. With the FTC rule gone, non-competes turn on state law and case-by-case FTC action.',
    keyFact:
      'Rollins reported completing 94 acquisitions over the last three years, including 26 in 2025 (Form 10-K for fiscal 2025, filed February 12, 2026).',
    sections: [
      {
        heading: 'Who is buying',
        body: [
          'Consolidation is steady. Rentokil Initial completed its acquisition of Terminix on October 12, 2022, and described the combined company as the global leader in pest control and the leader in North America.',
          'Rollins, parent of Orkin, says in its latest annual report that pest control has fragmented markets and low barriers to entry. It reported 94 acquisitions over three years, 26 of them in 2025, and says it targets high-quality, profitable businesses with strong leadership, brand awareness and loyal customers.',
        ],
      },
      {
        heading: 'What a buyer looks at',
        body: [
          'Customer contracts are the asset. Rollins’s franchise deals, for example, involve sales of territories and customer contracts. Expect a buyer to ask for a contract list, retention history, pricing, and open termite warranties, and to check your application records against it.',
          'Price is not always paid in one lump. Rollins reports contingent consideration on its Fox Pest Control and Saela Pest Control acquisitions, meaning part of the price depended on later results. Rollins also books seller non-compete agreements as intangible assets amortized over 3 to 20 years.',
          'Ask your attorney and accountant to compare an asset sale with a stock or membership-interest sale. The choice decides which liabilities, such as open warranties and claims, travel with the business, and how the price is taxed.',
        ],
      },
      {
        heading: 'The licence often belongs to a person',
        body: [
          'In Florida, the state will not issue or renew a pest control business licence unless the company’s work is under a certified operator in charge who holds the licensee’s categories. That person must be a full-time employee whose primary occupation is with the licensee, and who personally supervises the work.',
          'Florida also requires a licence application upon transfer of business ownership, and a licence expires when the business changes its name or location. If the seller is the certified operator and plans to leave, the buyer needs a qualified replacement lined up before closing. Check your own state’s qualifier rule on our state start pages.',
        ],
      },
      {
        heading: 'Non-competes after the FTC rule',
        body: [
          'The FTC’s 2024 nationwide non-compete rule is off the table. A federal district court in Texas set it aside in Ryan, LLC v. FTC, and on September 5, 2025 the FTC voted 3-1 to drop its appeals and accept that ruling. That leaves most non-compete questions to state law.',
          'The FTC still acts case by case. On April 15, 2026 it ordered Rollins to stop enforcing non-competes against more than 18,000 employees, typically two-year bans within about 75 miles of a location, and sent warning letters to 13 other pest control companies. The final order was approved June 22, 2026.',
          'The Rollins order still allows non-competes tied to buying a business when the person bound has an existing ownership stake in it. Branch-level staff, including technicians, sales inspectors and branch managers, are expressly covered by the ban. This is general information, not legal or tax advice. Have an attorney and a CPA review any purchase agreement.',
        ],
      },
    ],
    checklist: [
      'Build a clean customer list: contract type, price, start date, service history and warranty status.',
      'Match application records to the customer list before a buyer asks.',
      'Name who will be the qualifying licence holder the day after closing.',
      'Ask your state agency what a change of ownership triggers for the business licence.',
      'Have an attorney and CPA compare an asset sale and a stock sale for your situation.',
      'Limit any seller non-compete to owners with an equity stake, and have counsel review employee agreements.',
    ],
    sources: [
      {
        label: 'Rentokil Initial plc Form 6-K, Q3 2022 trading update (completion of Terminix transaction)',
        url: 'https://www.sec.gov/Archives/edgar/data/930157/000165495422014468/a8151e.htm',
      },
      {
        label: 'Rollins, Inc. Form 10-K for fiscal year 2025 (filed February 12, 2026)',
        url: 'https://www.sec.gov/Archives/edgar/data/84839/000008483926000008/rol-20251231.htm',
      },
      {
        label: 'FTC press release (September 5, 2025): FTC files to accede to vacatur of Non-Compete Clause Rule',
        url: 'https://www.ftc.gov/news-events/news/press-releases/2025/09/federal-trade-commission-files-accede-vacatur-non-compete-clause-rule',
      },
      {
        label: 'FTC press release (April 15, 2026): FTC takes action against noncompete agreements (Rollins)',
        url: 'https://www.ftc.gov/news-events/news/press-releases/2026/04/ftc-takes-action-against-noncompete-agreements-securing-protections-workers',
      },
      {
        label: 'FTC: In the Matter of Rollins, Inc., Decision and Order (public)',
        url: 'https://www.ftc.gov/system/files/ftc_gov/pdf/251_0011_rollins_do_public.pdf',
      },
      {
        label: 'Florida Statutes 482.071: Pest control business licences',
        url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0482/Sections/0482.071.html',
      },
      {
        label: 'Florida Statutes 482.152: Duties of certified operator in charge',
        url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0482/Sections/0482.152.html',
      },
    ],
    notes:
      'Seven sources, one over the 3-6 target, because the FTC order text (sale-of-business carve-out) and the April press release (warning letters, 75-mile scope) carry different facts. Final order approval date June 22, 2026 and 2-0 vote come from the FTC June 2026 press release (opened, not listed). The FTC noncompete hub page lists a Federal Register notice dated February 12, 2026 removing the rule from the CFR; not verified in the Federal Register, so not stated. The vacatur court is N.D. Tex., 746 F. Supp. 3d 369 (2024), per the FTC. Anticimex: only a September 23, 2016 Anticimex press release (acquisition of American Pest, Maryland/DC/Virginia) was found and opened; it does not describe ownership, so Anticimex and private-equity roll-ups are left out of the body. No primary source on private-equity roll-ups in pest control was found; add one before naming any. No valuation multiples are published. "Route density" was dropped from the answer because no primary source ties it to buyer criteria; it is common industry talk only. "That leaves most non-compete questions to state law" is an inference from the rule being vacated, not an FTC statement. The asset-versus-stock paragraph is framed as questions for advisers; the liability and tax differences are general knowledge not tied to a listed source (IRS Form 8594 page, opened, confirms both parties file it for asset sales where goodwill attaches). The qualifier example uses Florida only; South Carolina also requires a Designated Certified Applicator at each business location (Clemson DPR FAQ, opened). SBA "Buy an existing business" page (opened) recommends reviewing financial statements, tax returns, licences and permits, contracts and leases, and hiring an attorney and accountant; not listed to limit sources.',
    verifiedOn: '2026-09-30',
  },
];

export function getOwnerTopic(slug: string): OwnerTopic | undefined {
  return OWNER_TOPICS.find((t) => t.slug === slug);
}
