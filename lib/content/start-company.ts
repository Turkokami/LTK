/**
 * start-company.ts — what it takes to open a structural pest control company, state by state.
 * Source: agency pages, statutes and agency forms, each fetched and read (see `citations`).
 * Maintainer notes on gaps (unreadable statutes, form-number mismatches, the SC DCA wording
 * conflict) live in docs/CONTENT-RESEARCH.md, not here. Re-verify before changing a figure.
 */

export interface StartState {
  code: string;
  businessLicence: string;
  fee: string;
  qualifyingPerson: string;
  insurance: string;
  otherRequirements: string[];
  steps: string[];
  citations: { label: string; url: string }[];
  /** One reader-facing caveat shown in the callout. */
  readerNote: string;
}

export const START_VERIFIED_ON = "2026-09-26";

export const START_COMPANY: StartState[] = [
  {
    "code": "TX",
    "businessLicence": "Structural pest control Commercial Business License from TDA's Structural Pest Control Service (application form SPC-401, or apply online through TDA's TAP portal). Noncommercial and noncommercial political business licences also exist for in-house operations.",
    "fee": "$300 for a commercial business license (TDA SPCS business page and form SPC-401). Apprentices registered on the application are $125 each. Noncommercial/noncommercial political business licences carry no fee. SPCS application fees are non-refundable.",
    "qualifyingPerson": "Every commercial business licence holder has to designate a commercial certified applicator, registered with the business, as its responsible certified applicator. One certified applicator can't be the responsible applicator for more than one business at the same time. To become a certified applicator you need ONE of: (1) a technician licence held for at least six months, plus employment doing pest control under a licensed certified applicator for at least 12 of the last 24 months; (2) a degree in a biological science (official transcript); or (3) proof of verifiable pest control employment, out-of-state included, for at least 12 of the past 24 months. Then pass the General Standards exam plus at least one category exam at 70%. The certified applicator licence fee is $125; exam fees are paid separately to the testing vendor.",
    "insurance": "Commercial and noncommercial businesses must file a policy or contract of insurance of at least $500,000 bodily injury and property damage coverage, with a minimum total aggregate of $1,000,000. It has to cover damage to persons or property under your care, custody or control, and the 'care, custody and control exclusion' must be deleted from the policy (Texas Occupations Code 1951.312). Your agent files it on TDA form ALS-1101 (no other form accepted), and everything on it must match the business registration exactly. Noncommercial political businesses are exempt.",
    "otherRequirements": [
      "A separate business licence for each business location, branch offices included.",
      "Register employees with the business licence within 10 days of hire (SPC-002 for previously licensed people moving companies; SPT-430 or the online system for new people), and terminate them within 10 days (SPC-003).",
      "The licence is tied to the business's Tax ID. A change of Tax ID means a new licence application.",
      "A business licence holder who lives outside Texas must file a resident agent form.",
      "Printed contracts, warranties, service agreements, termite disclosure documents, guarantees and customer information sheets must carry TDA's jurisdiction statement: 'Licensed and Regulated by: Texas Department of Agriculture, P.O. Box 12847, Austin, TX 78711-2847, Phone (866) 918-4481'.",
      "All licensing activity must be finished within one year of the application date or the application is void."
    ],
    "steps": [
      "Form the business with the state and get its Comptroller (or federal) taxpayer ID. The SPCS licence is tied to that Tax ID.",
      "Get the person who will be the responsible certified applicator qualified and licensed: meet one of the three experience or degree routes, pass the General Standards exam plus a category exam, and pay the $125 licence fee.",
      "Have your insurance agent file form ALS-1101 with TDA showing at least $500,000 bodily injury and property damage per occurrence and a $1,000,000 aggregate, with the care, custody and control exclusion deleted.",
      "Apply for the Commercial Business License through TAP or on form SPC-401 with the $300 fee, naming and signed by the responsible certified applicator. Use one licence per location, branches included.",
      "Register every employee with the business licence within 10 days of hire, and put the TDA jurisdiction statement on your contracts and customer paperwork."
    ],
    "citations": [
      {
        "label": "TDA SPCS — Structural Pest Control Business",
        "url": "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Business"
      },
      {
        "label": "TDA SPCS — Insurance Requirements",
        "url": "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Business/SPCS-Insurance-Requirements"
      },
      {
        "label": "TDA SPCS — Certified Applicator Licensing",
        "url": "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Licensing/SPCS-Certified-Applicator-Licensing"
      },
      {
        "label": "TDA SPCS — Structural Pest Control Licensing",
        "url": "https://texasagriculture.gov/Regulatory-Programs/Pesticides/Structural-Pest-Control-Service/Structural-Pest-Control-Licensing"
      },
      {
        "label": "TDA form SPC-401 Commercial Business License Application (rev. 05/15/18)",
        "url": "https://texasagriculture.gov/Portals/0/forms/PEST/Structural/SPC_401_Commercial_Business_License_Application.pdf"
      }
    ],
    "readerNote": "Texas ties the business licence to one responsible certified applicator. If that person leaves, you need a replacement on file before you keep working."
  },
  {
    "code": "WA",
    "businessLicence": "Commercial Applicator licence from WSDA's Pesticide Licensing and Recertification Program. WSDA calls it a joint company-individual licence, required to engage in the business of applying pesticides to the land or property of another. Filed as the Pesticide/Pest Inspector License Application plus the Commercial Company License Application (and a Supplemental Commercial Applicator Application if applicable). A company doing complete WDO inspections for real estate transactions instead needs to be a licensed Structural Pest Inspection company (SPI Company License Application).",
    "fee": "$250 Commercial Applicator licence application fee. Equipment fees of $27 per apparatus after the first may apply (WSDA Commercial Applicators page).",
    "qualifyingPerson": "The individual who makes the pesticide application decisions for the company must hold the Commercial Applicator licence. They qualify by passing the Washington Laws & Safety exam plus category exams in every area the business works in, or by presenting a valid reciprocal state licence. Structural work falls under the PCO Structural endorsement. WSDA's page states no experience requirement.",
    "insurance": "Commercial Applicators must meet the financial coverage requirements of RCW 17.21.160 and .170, by one of two options. Option 1: a liability insurance policy providing $50,000 public liability coverage and $50,000 property damage coverage, with a deductible of no more than $5,000 (Commercial Applicator Financial Responsibility Insurance Certificate). Option 2: a surety bond of a minimum of $100,000 (Commercial Applicator Surety Bond form). Proof must be on file before a new licence is issued. If it lapses, WSDA starts suspension. Complete WDO inspections carry separate SPI coverage, one of: a $25,000 errors and omissions policy covering two years from the inspection date; a $25,000 surety bond; a $12,500 surety bond plus a $25,000 nonoccurrence-based E&O policy; or a $25,000 assigned account held by the department.",
    "otherRequirements": [
      "You need a Washington business licence through the Department of Revenue.",
      "Report changes to name, address, equipment, company-employed commercial operators, and branches, DBAs or locations to WSDA within 30 days on the Supplemental Commercial Applicator Application.",
      "Renew the licence annually. It must be active to operate. The Commercial Applicator also goes on a five-year recertification cycle.",
      "Complete WDO inspection reports need an Inspection Control Number (ICN) and must meet WAC 16-228-2005 through -2045. Specific (pre-treatment) WDO inspections need the PCO Structural or SPI endorsement and employment with a licensed Commercial Applicator or SPI company carrying current insurance.",
      "Changing the company's Commercial Applicator means filing a new Commercial Applicator License Application with the Change of Applicator box checked."
    ],
    "steps": [
      "Register the business and get a Washington business licence through the Department of Revenue.",
      "Get the person who will make application decisions licensed: pass the Laws & Safety exam plus every category exam the business needs (PCO Structural for structural work), or qualify by reciprocity, and pay the $250 Commercial Applicator fee.",
      "File the Commercial Company License Application (and Supplemental Commercial Applicator Application if applicable), paying $27 per apparatus after the first.",
      "File proof of financial responsibility with WSDA: $50,000 public liability plus $50,000 property damage insurance with no more than a $5,000 deductible, or a $100,000 surety bond. Send it to license@agr.wa.gov or WSDA Pesticide Licensing, PO Box 42560, Olympia, WA 98504.",
      "If you'll do real-estate WDO inspections, license as a Structural Pest Inspection company with its own SPI coverage and get ICNs before writing reports."
    ],
    "citations": [
      {
        "label": "WSDA — Commercial Applicators",
        "url": "https://agr.wa.gov/services/licenses-permits-and-certificates/pesticide-license-and-recertification/pesticide-and-spi-licensing/commercial-applicators/commercial-applicators"
      },
      {
        "label": "WSDA — Structural Pest Inspectors",
        "url": "https://agr.wa.gov/services/licenses-permits-and-certificates/pesticide-license-and-recertification/pesticide-and-spi-licensing/commercial-applicators/structural-pest-inspectors"
      },
      {
        "label": "WSDA — Pesticide License Types and Categories",
        "url": "https://agr.wa.gov/services/licenses-permits-and-certificates/pesticide-license-and-recertification/pesticide-and-spi-licensing/pesticide-license-types-and-categories"
      }
    ],
    "readerNote": "Washington licenses the company and its applicator together. Real-estate WDO inspections are a separate Structural Pest Inspection company licence with its own coverage."
  },
  {
    "code": "FL",
    "businessLicence": "Pest control business license from FDACS (Bureau of Licensing and Enforcement). FDACS's page calls it the Commercial Structural Pest Control Business License. It's required under s.482.071 F.S. ('It is unlawful for any person to operate a pest control business that is not licensed by the department'). Apply online at aeslicensing.fdacs.gov.",
    "fee": "$300 for the business license, plus $10 per employee identification card (FDACS Licensing and Certification page). The statute lets FDACS set the fee between $75 and $300, with a $50 late renewal charge after a 30-day grace period (s.482.071(2)).",
    "qualifyingPerson": "A full-time certified pest control operator in charge, certified in the categories the business will perform (General Household Pest and Rodent Control, Termite and Other Wood-Destroying Organisms Control, Lawn and Ornamental, and/or Fumigation). FDACS can't issue or renew the business license unless its work is under a certified operator in charge (s.482.071(2)). The operator in charge must have their primary occupation with the licensee and be a full-time employee (s.482.152). To sit the certified operator exam you need a high school diploma or equivalent plus three years' employment as a service employee of a licensee in the category sought, one year of it in Florida in the year immediately before applying. Degree routes (entomology, horticulture and related, with 20+ semester hours of advanced training) cut this to one year's employment (s.482.132).",
    "insurance": "Minimum financial responsibility under s.482.071(4) F.S.: bodily injury $250,000 per person and $500,000 per occurrence, and property damage $250,000 per occurrence and $500,000 in the aggregate; OR combined single-limit coverage of $500,000 in the aggregate. Licensees doing WDO inspections for real estate transactions also need errors and omissions (professional liability) insurance or a bond of no less than $500,000 in the aggregate and $250,000 per occurrence, or equity or net worth of at least $500,000 verified by CPA review or audit (s.482.226(6)).",
    "otherRequirements": [
      "Each business location must be licensed (s.482.071(3)).",
      "Employee identification cards at $10 per employee (FDACS).",
      "The certified operator in charge must notify FDACS within 24 hours of any accidental human poisoning or death connected with the licensee's work (s.482.152).",
      "WDO inspection reports for real estate transactions must be made on a form prescribed by the department and contain the information listed in s.482.226, including a statement that neither the inspector nor the licensee has a financial interest in the property."
    ],
    "steps": [
      "Form the business with the state.",
      "Get your operator in charge certified: qualifying experience or degree, then pass the FDACS certified operator exam in every category the business will offer. That person must be a full-time employee.",
      "Buy liability coverage at or above the s.482.071(4) minimums (split limits $250,000/$500,000 BI and $250,000/$500,000 PD, or $500,000 CSL aggregate), plus $250,000/$500,000 E&O if you'll do real estate WDO inspections.",
      "Apply for the pest control business license at aeslicensing.fdacs.gov and pay $300, licensing every business location.",
      "Get employee identification cards ($10 each) for your service staff."
    ],
    "citations": [
      {
        "label": "FDACS — Pest Control Licensing and Certification",
        "url": "https://www.fdacs.gov/Business-Services/Pest-Control/Licensing-and-Certification"
      },
      {
        "label": "s.482.071 F.S. (2025) — Licenses; insurance",
        "url": "https://www.flsenate.gov/Laws/Statutes/2025/482.071"
      },
      {
        "label": "s.482.152 F.S. (2025) — Duties of certified operator in charge",
        "url": "https://www.flsenate.gov/Laws/Statutes/2025/482.152"
      },
      {
        "label": "s.482.132 F.S. (2025) — Qualifications for examination",
        "url": "https://www.flsenate.gov/Laws/Statutes/2025/482.132"
      },
      {
        "label": "s.482.226 F.S. (2025) — WDO inspection reports; financial responsibility",
        "url": "https://www.flsenate.gov/Laws/Statutes/2025/482.226"
      }
    ],
    "readerNote": "Florida needs a full-time certified operator in charge for every category you sell. Real-estate WDO inspections add an errors and omissions requirement on top of liability cover."
  },
  {
    "code": "CA",
    "businessLicence": "Company Registration with the Structural Pest Control Board (B&P Code s.8610: every company that engages in structural pest control must be registered with the Board). On approval the company gets a principal registration (PR) number. Branch offices are registered separately.",
    "fee": "$120 company registration application fee (SPCB 'How do I start a structural pest control company?'). Name approval is filed first on form 43L-6 and holds the name for 60 days. LiveScan fingerprinting for unlicensed owners, partners or officers is $49 plus the rolling fee.",
    "qualifyingPerson": "A qualifying manager: a licensed Operator designated to supervise the company's daily business, licensed in every branch the company works in (B&P s.8506.2, s.8610). One operator can't be qualifying manager for more than two registered companies. Operator licence experience (B&P s.8562): actual experience in the employ of a registered California company in the branch sought, for 2 years for Branch 1 or 2 and 4 years for Branch 3 (1 year = 1,600 hours of field experience). You must also have held a Field Representative licence in that branch for at least 1 year (Branches 1 and 2) or 2 years (Branch 3). Minimum age 18.",
    "insurance": "Insurance policy with minimum liability coverage of $500,000 for bodily injury, sickness, disease or death per occurrence and $500,000 for property injury or destruction per occurrence (B&P s.8692). Evidence goes on the Board's Certificate of Insurance form, with 10-day cancellation notice to the Board; a certificate of deposit or other undertaking doesn't satisfy it (s.8690). A company may not operate without the policy in force (s.8691). Also a $12,500 bond from an admitted surety insurer (B&P s.8697). Workers' compensation insurance, or a filed exemption, is also required (B&P s.8693, per SPCB). Errors and omissions insurance isn't required for inspection activities (s.8692).",
    "otherRequirements": [
      "Supporting documents: Articles of Incorporation (corporations) or a Fictitious Business Name Statement (sole proprietors and partnerships).",
      "WDO inspection reports must be prepared on a Board-approved form, delivered to the person requesting the inspection and the owner within 10 business days of the start of the inspection, and filed with the Board within 10 business days after the inspection or completed work begins (B&P s.8516).",
      "Keep all inspection reports, field notes and activity forms for three years (B&P s.8516).",
      "A company can't be registered if an officer or controlling person holds a licence revoked or suspended by discipline (B&P s.8610)."
    ],
    "steps": [
      "Get the Operator's licence in each branch you'll offer. That person becomes the qualifying manager (Field Representative licence first, plus 2 or 4 years of experience with a registered California company).",
      "Form the business, then file the Request for Approval of Registered Company (form 43L-6) to reserve the company name for 60 days.",
      "Line up $500,000/$500,000 per-occurrence liability insurance on the Board's Certificate of Insurance, a $12,500 surety bond, and workers' comp or an exemption.",
      "File the company registration application with the $120 fee, incorporation or fictitious-name paperwork, and LiveScan fingerprints for unlicensed owners or officers.",
      "Once you have your PR number, register any branch offices separately and put WDO reports on the Board-approved form."
    ],
    "citations": [
      {
        "label": "SPCB — How do I start a structural pest control company?",
        "url": "https://www.pestboard.ca.gov/howdoi/pr.shtml"
      },
      {
        "label": "B&P Code s.8610 — Company registration; qualifying manager",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=8610"
      },
      {
        "label": "B&P Code s.8562 — Operator's licence qualifications",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=8562"
      },
      {
        "label": "B&P Code s.8690 — Evidence of insurance before registration",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=8690"
      },
      {
        "label": "B&P Code s.8691 — Insurance must be maintained",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=8691"
      },
      {
        "label": "B&P Code s.8692 — Insurance minimums",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=8692"
      },
      {
        "label": "B&P Code s.8697 — $12,500 bond",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=8697"
      },
      {
        "label": "B&P Code s.8516 — WDO inspection reports",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=8516"
      }
    ],
    "readerNote": "California registers the company with the Structural Pest Control Board and needs a qualifying manager, a surety bond and workers’ comp as well as liability insurance."
  },
  {
    "code": "SC",
    "businessLicence": "Pest Control Business License from Clemson University's Department of Pesticide Regulation, required for any business doing Category 7A (Industrial, Institutional, Structural and Health-Related) work. Under Regulation 27-1085 M, as quoted on DPR's application form, no main business office or branch office where records are kept may do structural pest control in South Carolina without first getting a Business License.",
    "fee": "$150 per year for the business license plus $50 for the DCA licence, $200 total. The licence is valid through 31 December unless suspended or revoked. A DCA change costs $50.",
    "qualifyingPerson": "A Designated Certified Applicator (DCA), licensed by DPR in Category 7A, in place before the business licence is issued. The DCA must be permanently assigned to that specific location full time while the business is open and operating, and nobody can be DCA for more than one location. To qualify: at least two years of verifiable experience in pest control, OR a four-year college degree in the natural sciences. Submit the DCA Verifiable Experience form.",
    "insurance": "Category 7A and 7B applicators must maintain comprehensive general liability insurance of not less than $100,000.00 combined single limit liability coverage, covering bodily injury and property damage from the use or transport of pesticides. No deductible may exceed $1,000, and coverage must be continuous. The insurer completes DPR's Evidence of Financial Responsibility form, and a Certificate of Liability Insurance for the business goes in with the application.",
    "otherRequirements": [
      "The business licence must be prominently displayed at each location.",
      "Report changes within ten days: the name or licence status of the Category 7A applicator or DCA, that applicator's financial responsibility status, or any change in the facility's location.",
      "Vehicles transporting pesticides need DPR vehicle decals. Send vehicle registration numbers to dprca@clemson.edu.",
      "A DCA is required at each structural pest control business location."
    ],
    "steps": [
      "Form the business with the state.",
      "Get your DCA licensed as a commercial applicator in Category 7A (Core plus 7A exams) and document two years of verifiable pest control experience or a four-year natural-sciences degree on the DCA Verifiable Experience form.",
      "Have your insurer complete the Evidence of Financial Responsibility form for at least $100,000 combined single limit general liability, with no deductible over $1,000.",
      "Submit the Business License Application, completed by the owner and signed by the DCA, with the Certificate of Liability Insurance and the $200 ($150 business + $50 DCA). Email it to dprca@clemson.edu and pay online, or mail it to DPR, 511 Westinghouse Rd., Pendleton, SC 29670.",
      "Display the licence at each location, get vehicle decals, and renew by 31 December each year."
    ],
    "citations": [
      {
        "label": "Clemson DPR — Licensing",
        "url": "https://www.clemson.edu/public/regulatory/pesticide-regulation/licensing/"
      },
      {
        "label": "Clemson DPR — Frequently Asked Questions",
        "url": "https://www.clemson.edu/public/regulatory/pesticide-regulation/about/faq.html"
      },
      {
        "label": "Clemson DPR — Business License Application (rev. 07/22)",
        "url": "https://www.clemson.edu/public/regulatory/pesticide-regulation/files/business-license-application.pdf"
      }
    ],
    "readerNote": "South Carolina DPR words the DCA experience rule two ways on its own site (pest control experience vs pesticide application experience). Confirm which applies to you with DPR at 864-646-2150."
  }
];

export function getStart(code: string): StartState | undefined {
  return START_COMPANY.find((s) => s.code === code);
}
