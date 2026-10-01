/**
 * wire.ts — regulatory update log.
 *
 * Compiled 2026-10-01 from primary documents (Federal Register, EPA, eCFR, state registers and
 * agency notices). Every item lands here only with a primary-source document behind it;
 * `notes` records certainty and recheck items for maintainers.
 *
 * `sourceUrl` and `sourceLabel` are NON-OPTIONAL on purpose. A regulatory claim without a
 * primary source is the one category of error on this site that can cost a reader their
 * licence, and the type system is the cheapest place to make that impossible.
 *
 * Sources that count: a state agency bulletin, an EPA registration document, a registrant
 * label revision, a published rule. Sources that do not count: a distributor email, a trade
 * press summary, a forum post, a manufacturer newsletter. Those may TELL us to look — they are
 * never the citation.
 */

export type UpdateKind =
  | 'rule'
  | 'label'
  | 'cancellation'
  | 'restricted-use'
  | 'licensing'
  | 'proposal'
  | 'decision';

export const KIND_LABEL: Record<UpdateKind, string> = {
  rule: 'Rule change',
  label: 'Label change',
  cancellation: 'Cancellation',
  'restricted-use': 'Restricted use',
  licensing: 'Licensing',
  proposal: 'Proposed',
  decision: 'EPA decision',
};

export interface RegulatoryUpdate {
  slug: string;
  /** USPS code, or 'US' for a federal change that applies in every state. */
  stateCode: string;
  kind: UpdateKind;
  headline: string;
  summary: string;
  /** One practical sentence: what a tech or owner should do about it. */
  whatToDo: string;
  /** ISO date the change takes effect — not the date we noticed it. For a proposal or
   *  decision with no effective date, the publication/decision date. */
  effectiveOn: string;
  /** Required. Primary source only. */
  sourceUrl: string;
  /** What the reader is clicking through to, named plainly. */
  sourceLabel: string;
  /** Maintainer-only: certainty, inferences, recheck items. Never rendered. */
  notes?: string;
}

export const UPDATES: RegulatoryUpdate[] = [
  {
    slug: "usda-rescinds-part-110-rup-recordkeeping",
    stateCode: "US",
    kind: "rule",
    headline: "USDA scraps its federal RUP recordkeeping rule (7 CFR Part 110)",
    summary: "USDA rescinded 7 CFR Part 110, the federal rule on recordkeeping of restricted use pesticides by certified applicators, effective July 11, 2025. USDA said the program had been defunded and closed, and EPA had folded much of the recordkeeping material into applicator training. Your state licence rules still set your RUP and job record duties.",
    whatToDo: "Keep RUP and service records exactly as your state rules require; nothing in your state record duties went away with this federal rescission.",
    effectiveOn: "2025-07-11",
    sourceUrl: "https://www.federalregister.gov/documents/2025/05/12/2025-08220/rescission-of-recordkeeping-on-restricted-use-pesticides-by-certified-applications",
    sourceLabel: "Federal Register 90 FR 20083 (May 12, 2025), final rule, AMS",
    notes: "Confirmed via FR API: doc 2025-08220, citation 90 FR 20083, effective 2025-07-11. FR title itself says \"Certified Applications\" (sic). Part 110 historically covered private applicators; commercial/structural record duties come from state law. The statement that state duties are unchanged is an inference from the rule text (it only rescinds the federal part)."
  },
  {
    slug: "epa-phosphine-metal-phosphide-interim-decision",
    stateCode: "US",
    kind: "decision",
    headline: "EPA interim decision on phosphine and metal phosphides adds aeration buffers",
    summary: "EPA issued its interim registration review decision for aluminum phosphide, magnesium phosphide and phosphine. Labels add aeration buffer zones sized from lookup tables using measured phosphine levels, updated fumigation management plan language, PPE changes, a pre-application burrow check and buffers near conservation areas for burrow treatments. Registrants had to submit amended labels after the June 2024 notice.",
    whatToDo: "Before your next phosphide job, read the current product label, rebuild your fumigation management plan around the aeration buffer tables, and plan how you will keep people out of the buffer.",
    effectiveOn: "2024-06-24",
    sourceUrl: "https://www.federalregister.gov/d/2024-13808",
    sourceLabel: "Federal Register 89 FR 52462 (June 24, 2024), notice of availability; Interim Decision in docket EPA-HQ-OPP-2013-0081 (signed May 14, 2024)",
    notes: "Opened the FR notice and the ID PDF (regulations.gov EPA-HQ-OPP-2013-0081-0128). ID says registrants must submit amended labels \"within 60 after the announcement\" (the word \"days\" is missing in the source). Burrow conservation-area buffer is 100 feet per the ID text. effectiveOn uses the FR notice date; there is no single label effective date, and field labels change as registrants amend. Treat as decision, not an in-force label date."
  },
  {
    slug: "epa-rodenticide-strategy-final-be",
    stateCode: "US",
    kind: "decision",
    headline: "EPA finalizes Rodenticide Strategy for endangered species",
    summary: "EPA released its final biological evaluation for 11 rodenticides, which also serves as its Rodenticide Strategy. Expect future label limits that differ by bait station, in-burrow and broadcast use, with location-specific restrictions delivered through Bulletins Live! Two, label language or registration terms. EPA says carcass searches will be used only when other measures are not practical.",
    whatToDo: "Make sure every tech who places rodenticide knows how to look up Bulletins Live! Two, and watch for new labels on the bait products you stock.",
    effectiveOn: "2024-11-22",
    sourceUrl: "https://www.epa.gov/pesticides/epa-releases-rodenticide-strategy-including-final-biological-evaluation-effects-11",
    sourceLabel: "EPA announcement, Rodenticide Strategy and final biological evaluation (Nov. 22, 2024); docket EPA-HQ-OPP-2023-0567",
    notes: "Date and contents from EPA page. Covers chlorophacinone, diphacinone, warfarin, brodifacoum, bromadiolone, difenacoum, difethialone, bromethalin, cholecalciferol, strychnine, zinc phosphide. The rodenticide registration review docket (EPA-HQ-OPP-2015-0778) showed no final/amended interim decision posted as of the last listed item (Oct 2025); a Clemson release (Nov 2025) says EPA expected to release the amended PID and interim decision in 2026. I did not find one, so none is listed."
  },
  {
    slug: "epa-final-insecticide-strategy",
    stateCode: "US",
    kind: "decision",
    headline: "EPA final Insecticide Strategy targets agricultural uses",
    summary: "EPA finalized its Insecticide Strategy, which sets a standard way to pick endangered species protections for agricultural insecticides as products are registered or reviewed. The final version cut buffer distances from the draft. The document says it addresses agricultural insecticide use, so indoor and structural work is not its focus, but ag-use labels you carry may pick up new limits.",
    whatToDo: "If your firm also does turf, ornamental or ag-adjacent spraying, check new insecticide labels for runoff and drift limits and any Bulletins Live! Two direction.",
    effectiveOn: "2025-04-29",
    sourceUrl: "https://www.regulations.gov/document/EPA-HQ-OPP-2024-0299-0250",
    sourceLabel: "EPA Insecticide Strategy (Final), docket EPA-HQ-OPP-2024-0299 (posted Apr. 29, 2025)",
    notes: "Opened the final strategy PDF. Scope statement quoted from p. 6: it covers \"the use of agricultural insecticides.\" I did not find an explicit carve-out sentence for structural or residential use, so the summary says \"not its focus\" rather than \"exempt.\" Release date from EPA news release (epa.gov/node/295869) and docket posting date."
  },
  {
    slug: "epa-sulfuryl-fluoride-residential-fumigation-labels",
    stateCode: "US",
    kind: "label",
    headline: "New sulfuryl fluoride labels for residential tent fumigation",
    summary: "EPA approved new sulfuryl fluoride labels on July 11, 2024 for residential structural fumigation. Labels require posted no-entry signs on tents, site-specific fumigation logs, added registrant stewardship training, longer active and passive aeration times, and drop references to \"approved\" clearance devices. Old-label stock could be sold or distributed for 12 months after approval.",
    whatToDo: "Fumigate only by the new label, retrain crews on the longer aeration steps, and keep a site-specific log for every residential job.",
    effectiveOn: "2024-07-11",
    sourceUrl: "https://www.epa.gov/pesticides/epa-announces-next-steps-protect-people-sulfuryl-fluoride-used-fumigate-residential",
    sourceLabel: "EPA announcement on sulfuryl fluoride residential fumigation (July 30, 2024); docket EPA-HQ-OPP-2009-0136",
    notes: "Label approval date July 11, 2024 and 12-month existing-stocks window are from the EPA page. Existing-stocks end date (about July 11, 2025) is arithmetic, not stated as a date by EPA, so it is not in the summary. The EPA page did not list exact aeration hours. Florida later rewrote its fumigation rules to match these labels (see FL item)."
  },
  {
    slug: "osha-heat-standard-proposal",
    stateCode: "US",
    kind: "proposal",
    headline: "OSHA proposes a federal heat illness prevention standard",
    summary: "OSHA proposed a heat injury and illness prevention standard covering indoor and outdoor work. Employers would need a written plan to evaluate and control heat hazards. A public hearing ran June 16 to July 2, 2025, and post-hearing comments closed October 30, 2025. OSHA's Fall 2025 agenda lists a supplemental proposal in December 2026.",
    whatToDo: "Put a written heat plan in place now covering water, rest, shade, acclimatization and attic or crawlspace work; it is good practice and likely to line up with any final rule.",
    effectiveOn: "2024-08-30",
    sourceUrl: "https://www.federalregister.gov/d/2024-14824",
    sourceLabel: "Federal Register 89 FR 70698 (Aug. 30, 2024), proposed rule, RIN 1218-AD39",
    notes: "Hearing dates and Oct 30, 2025 deadline from 90 FR 46110 (Sept 25, 2025). Timetable (Supplemental NPRM 12/00/2026, Final Action 10/00/2027) from reginfo.gov Fall 2025 agenda (pubId 202510). reginfo lists a \"2026\" agenda edition for this RIN but I could not load its entry, so the newer timetable may differ. No final rule exists."
  },
  {
    slug: "osha-heat-nep-renewed-2026",
    stateCode: "US",
    kind: "decision",
    headline: "OSHA renews heat emphasis program; building services on target list",
    summary: "OSHA reissued its heat National Emphasis Program effective April 10, 2026 for five years. It targets 55 high-risk industries, including NAICS 5617, services to buildings and dwellings, which takes in exterminating and pest control. Inspectors may run random heat inspections on National Weather Service heat advisory or warning days.",
    whatToDo: "Check that your heat plan, training records and water-rest-shade practices are on paper and followed, especially on heat advisory days.",
    effectiveOn: "2026-04-10",
    sourceUrl: "https://www.osha.gov/sites/default/files/enforcement/directives/CPL_03-00-024_0.pdf",
    sourceLabel: "OSHA Directive CPL 03-00-024, National Emphasis Program: Outdoor and Indoor Heat-Related Hazards (effective Apr. 10, 2026)",
    notes: "Effective date and NAICS 5617 listing confirmed in the directive PDF (appendix lists 5617 \"Services to Buildings and Dwellings (includes landscaping services, tree removal and tree trimming services)\"). That 561710 Exterminating and Pest Control Services sits within NAICS 5617 is standard NAICS structure, not stated in the directive. Five-year duration and the 55 industries are from the OSHA news release of Apr. 10, 2026. State-plan states (CA, WA, SC) run their own programs."
  },
  {
    slug: "epa-bilingual-labels-rup-deadline",
    stateCode: "US",
    kind: "label",
    headline: "Spanish label sections now required on restricted use pesticides",
    summary: "Under PRIA 5, restricted use pesticides and Category I agricultural products released for shipment from December 29, 2025 must carry Spanish translations of key label sections, such as signal word, first aid, PPE and storage, on the container or by QR code or link. Expect bilingual labels on fumigants and other RUPs you buy.",
    whatToDo: "Show Spanish-speaking crews where the translated sections or QR link are on the RUP labels you stock, and include it in safety training.",
    effectiveOn: "2025-12-29",
    sourceUrl: "https://www.epa.gov/system/files/documents/2026-03/prn-2025-02.pdf",
    sourceLabel: "EPA Pesticide Registration Notice 2025-02 (signed Feb. 26, 2026), bilingual labeling tracking",
    notes: "Schedule quoted in PRN 2025-02 and on epa.gov/pesticide-labels/bilingual-labeling. The requirement applies to products \"released for shipment,\" so older stock already in the channel may still carry English-only labels; that is my reading, not an EPA statement."
  },
  {
    slug: "epa-bilingual-labels-nonag-category-i",
    stateCode: "US",
    kind: "label",
    headline: "Spanish labeling due for most toxic non-ag products Dec. 29, 2026",
    summary: "The next PRIA 5 deadline is December 29, 2026 for non-agricultural products in Acute Toxicity Category I, which covers some structural and residential-use products. Spanish versions of key label sections must be on the container or reachable by QR code or link. Non-ag, non-RUP products can instead link to a Spanish safety data sheet.",
    whatToDo: "Ask your distributor which Category I products you use will switch to bilingual labels or Spanish SDS links, and update your crew safety binder.",
    effectiveOn: "2026-12-29",
    sourceUrl: "https://www.epa.gov/system/files/documents/2026-03/prn-2025-02.pdf",
    sourceLabel: "EPA Pesticide Registration Notice 2025-02 (signed Feb. 26, 2026)",
    notes: "Scheduled ahead. Later steps from the same PRN: ag Category II on Dec 29, 2027; non-ag Category II on Dec 29, 2028; all others on Dec 29, 2030. Which specific structural products are Category I was not checked."
  },
  {
    slug: "tx-spcs-insurance-minimums-als-1101",
    stateCode: "TX",
    kind: "licensing",
    headline: "Texas enforces higher SPCS insurance minimum and new ALS-1101 form",
    summary: "From January 1, 2024, TDA enforces the higher insurance minimum adopted in 2023: at least $500,000 per occurrence for bodily injury and property damage, with a $1,000,000 annual aggregate, for business and noncommercial certified applicator licences. Policies effective on or after January 1, 2024 must be filed on the revised ALS-1101 form (rev. 11/01/23).",
    whatToDo: "Check that your certificate of insurance meets $500,000/$1,000,000 and that your agent filed it on the 11/01/23 ALS-1101.",
    effectiveOn: "2024-01-01",
    sourceUrl: "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service",
    sourceLabel: "TDA Structural Pest Control Service notices page; 4 TAC §7.123 (amended eff. Jan. 16, 2023, 48 TexReg 131)",
    notes: "TDA page states the insurance increase and the technician category training rule were \"fully enforced on January 1, 2024,\" and gives the ALS-1101 revision details. Dollar amounts read from 4 TAC 7.123 via the LII mirror (law.cornell.edu); the official TAC viewer is an Appian app I did not open. I did not confirm the previous minimums, so the summary does not state the size of the increase."
  },
  {
    slug: "tx-technician-add-category-training",
    stateCode: "TX",
    kind: "licensing",
    headline: "Texas technicians need 48 training hours before adding a category",
    summary: "Since January 1, 2024, TDA fully enforces the rule that a licensed technician must finish 8 classroom hours and 40 on-the-job hours before taking the exam to add a licence category. Training goes on the department's verifiable training record form. Annual technician renewal still needs 8 hours of verifiable training.",
    whatToDo: "Log the 8 classroom and 40 on-the-job hours on the verifiable training record before you book any technician for a new category exam.",
    effectiveOn: "2024-01-01",
    sourceUrl: "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service",
    sourceLabel: "TDA Structural Pest Control Service notices page; 4 TAC §7.133(c) (amended eff. Jan. 16, 2023)",
    notes: "Rule adopted in 2023 (eff. 1/16/2023) with enforcement deferred to 1/1/2024 per TDA notice. Hours from 4 TAC 7.133(c) and (d) as shown on LII mirror. Included because the enforcement date falls in scope."
  },
  {
    slug: "tx-spcs-exams-move-to-metro-institute",
    stateCode: "TX",
    kind: "licensing",
    headline: "Texas SPCS licence exams moved to Metro Institute",
    summary: "Beginning May 19, 2025, Metro Institute gives TDA structural pest control applicator exams at testing sites across Texas. Applicants still apply and pay licence fees to TDA first. Once TDA issues an account or approval number, the applicant registers for the exam on Metro's website.",
    whatToDo: "Have new hires apply to TDA first, then book their exam with Metro using the TDA approval number.",
    effectiveOn: "2025-05-19",
    sourceUrl: "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service",
    sourceLabel: "TDA Structural Pest Control Service notices page (exam vendor notice)",
    notes: "Agency bulletin text only; I found no rule change for this. TDA fee page still shows fees \"effective January 1, 2016\" ($64 per exam category), so no TX fee change is listed. No 2024-2026 Subchapter H rule adoptions turned up in Texas Register searches; a 2025 webinar titled \"2025 CEU Updates\" is linked on the TDA page but I found no written CEU rule change, so none is listed."
  },
  {
    slug: "wa-direct-supervision-noncertified-applicators",
    stateCode: "WA",
    kind: "rule",
    headline: "Washington sets rules for supervising unlicensed RUP applicators",
    summary: "WSDA adopted WAC 16-228-1548, effective January 1, 2026, setting duties for licensed applicators who supervise noncertified people using federal restricted use pesticides. The supervisor must hold the matching classification. The noncertified applicator must be trained within the past 12 months on the equipment they use and meet a minimum age.",
    whatToDo: "Document equipment training for every unlicensed tech who handles RUPs, renew it yearly, and make sure each supervisor is certified in that classification.",
    effectiveOn: "2026-01-01",
    sourceUrl: "https://lawfilesext.leg.wa.gov/law/wsr/2025/22/25-22-065.htm",
    sourceLabel: "Washington State Register WSR 25-22-065 (filed Oct. 31, 2025), new WAC 16-228-1548",
    notes: "Effective date from the WSR filing. Detail checked in current WAC 16-228-1548 (app.leg.wa.gov). The rule states a minimum age requirement but I did not pin down the age number, so none is given. Implements the 40 CFR 171 certification plan EPA approved for WA in Dec. 2022 plus SB 5330 (2023)."
  },
  {
    slug: "wa-licence-categories-exam-retake-waits",
    stateCode: "WA",
    kind: "licensing",
    headline: "Washington revises licence categories and exam retake waits",
    summary: "Effective January 1, 2026, WSDA added, merged and removed pesticide licence classifications, added competency standards for nearly all licensees, and ended substitutions for the core laws and safety exam. Anyone who fails an exam a second, third or fourth time waits at least 14 days to retest; after five or more failures the wait is 60 days.",
    whatToDo: "Check each licensee's classifications against the new WAC 16-228-1545 list at renewal, and plan exam dates around the retake waits.",
    effectiveOn: "2026-01-01",
    sourceUrl: "https://lawfilesext.leg.wa.gov/law/wsr/2025/22/25-22-065.htm",
    sourceLabel: "Washington State Register WSR 25-22-065 (filed Oct. 31, 2025), amending WAC 16-228-1540 and -1545",
    notes: "Retake waits read from current WAC 16-228-1540(5). Current WAC 16-228-1545 lists \"Pest control operator (PCO) - General\" and a wood destroying organism classification. I did not map which classifications were added or merged, so none are named. The same filing also tightened dealer RUP sales records."
  },
  {
    slug: "fl-fumigation-rules-match-new-sf-labels",
    stateCode: "FL",
    kind: "rule",
    headline: "Florida rewrites fumigation rules and log to match new SF labels",
    summary: "FDACS amended its fumigation and records rules (5E-14.102, .1025, .108-.113, .142, .1421), effective May 18, 2026, to match the new sulfuryl fluoride labels. The fumigation log, FDACS-13000 (Rev. 03/26), was substantially rewritten. Updated forms include the notification of fumigation, fumigation inspection and the employee ID card application.",
    whatToDo: "Throw out old fumigation logs and notification forms, switch to the current FDACS revisions, and walk crews through the rewritten log.",
    effectiveOn: "2026-05-18",
    sourceUrl: "https://www.flrules.org/Gateway/View_notice.asp?id=30832437",
    sourceLabel: "Florida Administrative Code 5E-14.142, rule effective May 18, 2026 (filed Apr. 28, 2026); proposed in FAR Vol. 52/28 (Feb. 11, 2026)",
    notes: "Effective date from the flrules final-rule record for 5E-14.142; the chapter index shows the same 5/18/2026 date for .102, .1025, .108, .110, .111, .112, .113, .142, .1421. Form numbers and revs from the reference list: FDACS-13000 Rev. 03/26; FDACS-13606 Rev. 03/26; FDACS-13667 Rev. 11/25; FDACS-13674 Rev. 11/25. A notice of change ran in FAR Vol. 52/53 (Mar. 18, 2026). I did not diff the rule text line by line."
  },
  {
    slug: "fl-5e-14-2025-update-registry-form",
    stateCode: "FL",
    kind: "rule",
    headline: "Florida updates pest control rules, adds prior-notice registry form",
    summary: "FDACS amended Chapter 5E-14 effective April 29, 2025 to carry out 2024 changes to Chapter 482. The update clarifies continuing education and exam rules, revises penalties, updates incorporated forms and adopts form FDACS-13609 (Rev. 03/25) for the registry of people who must get prior notice of pesticide applications near their homes.",
    whatToDo: "Use the current FDACS forms for licence and ID card work, and check your notification list against the state prior-notification registry.",
    effectiveOn: "2025-04-29",
    sourceUrl: "https://www.flrules.org/Gateway/View_notice.asp?id=29162291",
    sourceLabel: "Florida Administrative Register Vol. 51/18 (Jan. 28, 2025), notice of proposed rule, 5E-14; rules effective Apr. 29, 2025",
    notes: "Effective 4/29/2025 confirmed on the flrules final record for 5E-14.132 (filed 4/9/2025) and on the chapter index (.105, .106, .117, .123, .132, .136, .1471, .149). 5E-14.1471 is new (History-New 4-29-25). The registry itself dates to s. 482.2267 F.S. (1992); the new piece is the rule and form. Fee rule 5E-14.132 was amended, but I did not confirm any dollar change, so no fee change is claimed. The notice says the changes \"implement changes made during the most recent legislative session\"; I did not identify the 2024 bill."
  },
  {
    slug: "fl-fwc-nuisance-wildlife-trapping-proposal",
    stateCode: "FL",
    kind: "proposal",
    headline: "FWC proposes trapping changes to nuisance wildlife rule 68A-9.010",
    summary: "FWC proposed amendments to nuisance wildlife rule 68A-9.010 that rework how nuisance wildlife may be trapped, including trap types, glue boards and time limits for animals moved offsite. A public hearing was held July 8, 2026. The proposed effective date is December 31, 2026, and the rule has not been adopted yet.",
    whatToDo: "Wildlife crews should read the proposed rule text from the FAR notice and watch for adoption before the proposed December 31, 2026 date.",
    effectiveOn: "2026-04-06",
    sourceUrl: "https://www.flrules.org/Gateway/View_notice.asp?id=30744846",
    sourceLabel: "Florida Administrative Register Vol. 52/66 (Apr. 6, 2026), FWC notice of proposed rule, 68A-9.010 and 68A-9.012",
    notes: "Not adopted: rule history still ends \"Amended 7-27-10\" and the latest notice is the July 8, 2026 hearing notice (FAR Vol. 52/127, Jul. 1, 2026). Proposed effective date Dec. 31, 2026. The downloaded proposed text lost its underline and strike-through formatting. I compared it with the current rule to infer changes: current bans steel traps and allows release or euthanasia within 24 hours; proposed text appears to allow only cage traps for rabbits and squirrels and reads \"within 12 24 hours\" for animals moved offsite, which likely means 12 hours, but this is unconfirmed. The glue board limit (inside enclosed buildings or conveyances, arthropod devices excluded) appears to be new text. Verify against the FAR PDF before publishing specifics."
  },
  {
    slug: "ca-ab-1322-diphacinone-moratorium",
    stateCode: "CA",
    kind: "restricted-use",
    headline: "California adds diphacinone to its anticoagulant bait ban",
    summary: "AB 1322 added diphacinone to California's SGAR rules: it is banned in wildlife habitat areas and statewide unless an exemption applies, such as certain agricultural activities or declared public health needs, until DPR and Fish and Wildlife certify new restrictions. Violations are misdemeanors enforced by county agricultural commissioners.",
    whatToDo: "Pull diphacinone baits from routes that do not fit a statutory exemption and document the exemption on any job where you still use it.",
    effectiveOn: "2024-01-01",
    sourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB1322",
    sourceLabel: "California AB 1322 (Ch. 836, Stats. 2023), Food and Agricultural Code §12978.7",
    notes: "Chaptered Oct 13, 2023 (Ch. 836). Non-urgency bill (majority vote), so the Jan 1, 2024 effective date follows the standard rule; it is not printed on the bill page. Exemption list is summarized; see FAC 12978.7 for full text."
  },
  {
    slug: "ca-ab-2552-fgar-restrictions-penalties",
    stateCode: "CA",
    kind: "restricted-use",
    headline: "California bans chlorophacinone and warfarin baits, adds $25,000 fines",
    summary: "AB 2552, the Poison Free Wildlife Act, prohibits chlorophacinone and warfarin statewide, makes them restricted materials, and bans all first-generation anticoagulants in wildlife habitat areas. Selling or using any anticoagulant rodenticide in violation of the rules carries a civil penalty of up to $25,000 per day per violation, on top of other penalties.",
    whatToDo: "Audit every bait station program for anticoagulants and switch to non-anticoagulant baits, traps and exclusion unless a written exemption applies.",
    effectiveOn: "2025-01-01",
    sourceUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2552",
    sourceLabel: "California AB 2552 (Ch. 571, Stats. 2024), Food and Agricultural Code §12978.7",
    notes: "Chaptered Sept 25, 2024 (Ch. 571). Non-urgency, so effective Jan 1, 2025 by default rule. Exemptions include public health use by government agencies and vector control, agricultural activities (including food storage warehouses), water and utility infrastructure, and declared public health needs. AB 1788 (2020) SGAR moratorium predates the window and is not listed separately."
  },
  {
    slug: "ca-spcb-standard-fumigation-log-43m-47",
    stateCode: "CA",
    kind: "rule",
    headline: "California SPCB requires new Standard Structural Fumigation Log",
    summary: "Effective October 1, 2024, SPCB rule 16 CCR 1970 moves fumigation log content into a required Standard Structural Fumigation Log, form 43M-47 (Rev. 6/2023). Application reports must now include time of application, product name and EPA registration number, and show that a registered applicator was supervised by a field representative or operator.",
    whatToDo: "Use form 43M-47 for every fumigation and update your service tickets to capture time, product name, EPA reg. number and the supervising licensee.",
    effectiveOn: "2024-10-01",
    sourceUrl: "https://www.pestboard.ca.gov/pestlaw/psrr_approval.pdf",
    sourceLabel: "OAL Notice of Approval, SPCB amendments to 16 CCR 1970, OAL Matter No. 2024-0725-01 (Aug. 21, 2024)",
    notes: "Effective date and form number from the OAL approval. Details on added report fields are from the SPCB notice of proposed action (pestboard.ca.gov/pestlaw/psrr_nopra.pdf, dated 3/21/2024); I assumed the adopted text matches the proposal. The rule ties the changes to 40 CFR 171.303(b)(7)(vi)."
  },
  {
    slug: "ca-spcb-exam-rules-2026",
    stateCode: "CA",
    kind: "licensing",
    headline: "California SPCB exam rules change Oct. 1, 2026",
    summary: "New SPCB exam rules (16 CCR 1940, 1940.1, 1941, 1942) take effect October 1, 2026 for applicator, field representative and operator exams. Exam applications must include a signed statement under penalty of perjury and a copy of acceptable government photo ID. Branch 1, 2 or 3 operator applicants must prove required coursework. The six-month re-exam window language is struck.",
    whatToDo: "Have exam candidates bring acceptable government photo ID, and check that operator candidates have proof of required coursework before applying.",
    effectiveOn: "2026-10-01",
    sourceUrl: "https://www.pestboard.ca.gov/pestlaw/examinations_approval.pdf",
    sourceLabel: "OAL Notice of Approval, SPCB examinations rulemaking, OAL Matter No. 2026-0601-04 (July 13, 2026)",
    notes: "Effective 10/1/2026 from the OAL approval. Content from the SPCB notice of proposed action (examinations_notice.pdf, Dec. 18, 2025), assumed adopted as proposed. Exam content outlines were also updated by incorporating OPES occupational analyses. I did not check any exam fee change."
  },
  {
    slug: "ca-dpr-draft-anticoagulant-rodenticide-regs",
    stateCode: "CA",
    kind: "proposal",
    headline: "California DPR drafts rules that would limit anticoagulant baiting",
    summary: "DPR released draft regulations for all anticoagulant rodenticides. They would make them restricted materials, limit use at structures to listed sites within 50 feet, cap baiting at 35 consecutive days and 105 days a year per site, and require annual training plus a written sustainable rodent management plan. This is a draft, not a formal proposal.",
    whatToDo: "Start writing a rodent management plan and tracking bait days per site now so you are ready if DPR formally proposes these rules.",
    effectiveOn: "2025-09-24",
    sourceUrl: "https://www.cdpr.ca.gov/?p=14973",
    sourceLabel: "California DPR, Anticoagulant Rodenticide Mitigation Informal Public Workshop (Sept. 24, 2025) and draft regulatory text",
    notes: "Details from DPR workshop presentation PDF (cdpr.ca.gov/wp-content/uploads/2025/08/anticoagulant_rodenticide_workshop_presentation.pdf). Proposed exemptions from the structure and duration limits include public health, vector control, water and hydro infrastructure, FGAR ag use, island and CDFW eradication, and research. I found no formal OAL notice of proposed action as of Oct 1, 2026. Under AB 1788/1322/2552 these regulations are a step toward lifting the moratoria."
  },
  {
    slug: "sc-pesticide-regs-amended-2024",
    stateCode: "SC",
    kind: "rule",
    headline: "South Carolina amends pesticide licensing, supervision and WDO rules",
    summary: "Clemson DPR amended Regulations 27-1070, 27-1071, 27-1078, 27-1083 and 27-1085, effective June 28, 2024. The current text requires a 7B or 1C licensee on site for all fumigant use and sets supervision distances for RUP work. It requires $100,000 combined single limit liability coverage for Category 7, and 10 CCUs, including 3 in 7B, for fumigation licensees.",
    whatToDo: "Check fumigation crew schedules, supervision distances, insurance certificates and 7B CCU totals against the amended rule text.",
    effectiveOn: "2024-06-28",
    sourceUrl: "https://www.scstatehouse.gov/state_register.php?first=FILE&pdf=1&file=Sr48-6.pdf",
    sourceLabel: "South Carolina State Register Vol. 48, Issue 6 (June 28, 2024), Document No. 5263, final regulations",
    notes: "The register printed the full amended text without change markings, and the synopsis calls the changes \"wording corrections, deletions and additions.\" I could not tell which provisions are new and which are restated, so the summary describes what the text now requires rather than what changed. The effective date matches LII history notes for 27-1070, 27-1078, 27-1083 and 27-1085. RUP supervision: the licensee must be within 30 miles and reachable by phone or radio; for Danger or Warning products in mandatory categories, within 60 miles."
  },
  {
    slug: "sc-commercial-recert-block-2024-2028",
    stateCode: "SC",
    kind: "licensing",
    headline: "South Carolina commercial CCU block runs Jan. 2024 to Dec. 2028",
    summary: "South Carolina commercial and non-commercial applicators are in a new five-year recertification block, January 1, 2024 to December 31, 2028. Category 7A (industrial, institutional, structural and health-related) alone needs 12 category-specific CCUs and 20 total. Category 7B (fumigation) alone needs 3 specific and 10 total. Combinations raise the specific count.",
    whatToDo: "Set a CCU plan for each licensee now so 7A holders reach 12 category CCUs and 20 total before December 31, 2028.",
    effectiveOn: "2024-01-01",
    sourceUrl: "https://www.clemson.edu/public/regulatory/pesticide-regulation/licensing/recertification.html",
    sourceLabel: "Clemson Department of Pesticide Regulation, Recertification page (1/1/2024-12/31/2028 block table)",
    notes: "This is a routine block rollover, not a new rule; include it only if the wire covers deadlines. Category names from Clemson certification categories page. Table also shows 7A plus 7B together needs 15 specific CCUs and 20 total. Private applicator block is Jan 1, 2025 to Dec 31, 2029 (not structural)."
  },
  {
    slug: "sc-sgar-state-restricted-use",
    stateCode: "SC",
    kind: "restricted-use",
    headline: "South Carolina restricts four SGAR baits to certified applicators",
    summary: "From February 1, 2025, Clemson DPR restricts brodifacoum, bromadiolone, difenacoum and difethialone statewide under Regulation 27-1075(B). Sellers need a dealer licence and must keep sales records. Sales are limited to certified applicators. Verifiably trained technicians may apply SGARs commercially under a certified applicator's supervision.",
    whatToDo: "Buy SGARs only from licensed dealers, keep certified-applicator supervision on every SGAR job, and keep technician training records current.",
    effectiveOn: "2025-02-01",
    sourceUrl: "https://news.clemson.edu/?p=220060",
    sourceLabel: "Clemson University news release on statewide SGAR restriction (Jan. 29, 2025); notice of intent in SC State Register Vol. 48, Issue 11 (Nov. 22, 2024)",
    notes: "Clemson DPR is part of Clemson University, so its news release is the agency's own announcement; the formal notice of intent is in State Register SR48-11, pp. 12-13 (scstatehouse.gov file Sr48-11.pdf). The notice proposed Jan 1, 2025 and limited professional use to Categories 7A and 8 plus private applicators. The Jan 2025 release gives Feb 1, 2025 and the summary uses that. No final order was found in the State Register."
  },
  {
    slug: "sc-sgar-restriction-extended-indefinitely",
    stateCode: "SC",
    kind: "decision",
    headline: "South Carolina's SGAR restriction no longer has an end date",
    summary: "Clemson DPR extended its statewide restriction on second-generation anticoagulant rodenticides indefinitely. The original one-year order began February 1, 2025. The rules stay the same: a dealer licence is needed to sell SGARs, dealers keep sales records, and sales are limited to certified applicators. DPR also plans an industry working group to track SGAR sales and use.",
    whatToDo: "Treat SGAR rules as permanent: keep dealer invoices and supervision records, and budget for alternatives on sensitive coastal accounts.",
    effectiveOn: "2025-11-11",
    sourceUrl: "https://news.clemson.edu/pesticide-regulators-extend-restrictions-on-certain-rodenticides/",
    sourceLabel: "Clemson University news release, \"Pesticide regulators extend restrictions on certain rodenticides\" (Nov. 11, 2025)",
    notes: "Date is the announcement date; the release does not state a separate effective date for the extension. No State Register notice of the extension found in SR50 issues 1-9 (2026). Kiawah Island bobcat deaths were the trigger per SR48-11."
  }
];

const newestFirst = (a: RegulatoryUpdate, b: RegulatoryUpdate) =>
  a.effectiveOn < b.effectiveOn ? 1 : a.effectiveOn > b.effectiveOn ? -1 : 0;

/** Items filed under one state (not including federal). */
export function updatesForState(stateCode: string): RegulatoryUpdate[] {
  return UPDATES.filter((u) => u.stateCode === stateCode).sort(newestFirst);
}

export const FEDERAL_UPDATES = UPDATES.filter((u) => u.stateCode === 'US').sort(newestFirst);
export const ALL_UPDATES = [...UPDATES].sort(newestFirst);

/** State codes that have at least one item, for grid badges and filters. */
export const STATES_WITH_UPDATES = [...new Set(UPDATES.map((u) => u.stateCode))].filter((c) => c !== 'US');

/** Most recent effective date across the log — the page's dateModified. */
export const WIRE_UPDATED = ALL_UPDATES.reduce((m, u) => (u.effectiveOn > m && u.effectiveOn <= today() ? u.effectiveOn : m), '');

function today(): string {
  return new Date().toISOString().slice(0, 10);
}
