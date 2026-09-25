/**
 * wildlife.ts — how nuisance-wildlife and bird work is regulated, state by state plus federal.
 *
 * These fields are NOT licensed through the state pesticide programme, which is why they have
 * their own registry. Every entry is researched against the state wildlife agency, statute or
 * administrative code, eCFR or fws.gov — see docs/CONTENT-RESEARCH.md. A null means "not
 * verified yet", never "not required".
 */

export interface Citation {
  label: string;
  url: string;
}

export interface WildlifeStateRule {
  /** USPS code, matching states.ts. */
  code: string;
  agency: string;
  agencyUrl: string;
  /** e.g. "Nuisance Wildlife Control Operator permit". Null if no single named permit exists. */
  permitName: string | null;
  whoNeedsIt: string;
  requirements: string[];
  restrictions: string[];
  /** When a pesticide licence is also required (vertebrate toxicants, fumigants). */
  pesticideLicenceAlsoNeeded: string | null;
  citations: Citation[];
  /** Research notes for maintainers — sources that could not be reached, open questions. Not rendered. */
  notes: string | null;
  /** What a technician should know about the gaps, in plain words. Rendered on the card. */
  readerNote?: string;
}

export interface FederalBirdRules {
  mbta: { summary: string; unprotectedExamples: string[]; citations: Citation[] };
  falconryAbatement: { summary: string; citations: Citation[] };
  /** Research notes for maintainers. Not rendered. */
  notes?: string;
}

/**
 * Filled from verified research (2026-09-25; see docs/CONTENT-RESEARCH.md). Every entry cites
 * statute, administrative code, eCFR or the agency's own page. Known gaps are in `notes`.
 * Summaries use newlines as paragraph breaks.
 *
 * RECHECK BEFORE LAUNCH: Florida noticed a July 2026 hearing on amending Rule 68A-9.010.
 */
export const WILDLIFE_VERIFIED_ON: string | null = "2026-09-25";

export const WILDLIFE_STATES: WildlifeStateRule[] = [
  {
    "code": "TX",
    "agency": "Texas Parks and Wildlife Department (TPWD), Wildlife Division. Texas Department of State Health Services (DSHS) sets the rabies transport rules. Texas Department of Agriculture (TDA) Structural Pest Control Service licenses any part of the work that falls outside the statutory exemptions.",
    "agencyUrl": "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/fur-bearing-animal-regulations/nuisance-fur-bearing-animals",
    "permitName": null,
    "whoNeedsIt": "Texas has no general state licence or certification for commercial nuisance-wildlife operators. Landowners or their agents may take nuisance fur-bearers on that land without a hunting or trapping licence. To trap and relocate nuisance fur-bearers you need authorization from TPWD and from the owner of the release property.",
    "requirements": [
      "Relocation needs TPWD authorization plus permission from the owner of the property where the animal is released.",
      "When you relocate animals, send TPWD a monthly report: the number and kind of fur-bearers captured, the release site, and the name and address of the person authorized to release them.",
      "TPWD publishes no fee, exam or renewal cycle for nuisance-wildlife work."
    ],
    "restrictions": [
      "Nobody may possess or sell nuisance fur-bearers or their pelts (31 TAC 65.381(d); Parks & Wildlife Code 71.004).",
      "Rabies quarantine (DSHS): transporting any live fox, skunk, coyote or raccoon is illegal, a Class C misdemeanor. Exempt only while on official duty: entities with TPWD authorization for nuisance fur-bearer relocation, and pest management professionals licensed by TDA. Exempt carriers releasing these animals must release them within 10 miles of the capture site (or within 10 miles of the city limits where captured) and in the county of capture.",
      "Bats (Parks & Wildlife Code 63.101): you may not hunt bats, or buy, sell or possess bought bats. A bat may be removed or hunted if it is inside or on a building occupied by people. The section does not apply to a person licensed to provide pest control services.",
      "Falconers who hold a Texas falconer's permit and use a raptor to control or relocate other birds are outside the structural pest control law (Occupations Code 1951.057)."
    ],
    "pesticideLicenceAlsoNeeded": "Yes, for some work. Texas defines the 'business of structural pest control' to include controlling rodents, nuisance birds and 'any other obnoxious or undesirable animals' in structures with pesticides, rodenticides, fumigants or mechanical devices (Occupations Code 1951.003). Section 1951.058 exempts only work done WITHOUT pesticides: using a raptor to control or relocate birds, live-trapping an animal off a residence, farm or business, and installing or maintaining non-pesticide barriers against nuisance animals. So any pesticide, rodenticide or fumigant use needs a TDA structural pest control licence. Kill-trapping (snap or body-gripping traps) is not listed in the 1951.058 exemptions, so confirm with TDA before relying on it without a licence.",
    "citations": [
      {
        "label": "TPWD Outdoor Annual: Nuisance Fur-bearing Animals",
        "url": "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/fur-bearing-animal-regulations/nuisance-fur-bearing-animals"
      },
      {
        "label": "Tex. Parks & Wildlife Code ch. 71 (71.004 prohibited acts; 71.005 licences)",
        "url": "https://tcss.legis.texas.gov/resources/PW/htm/PW.71.htm"
      },
      {
        "label": "Tex. Parks & Wildlife Code 63.101 Protection of bats",
        "url": "https://tcss.legis.texas.gov/resources/PW/htm/PW.63.htm"
      },
      {
        "label": "Tex. Occupations Code ch. 1951 (1951.003, 1951.057, 1951.058)",
        "url": "https://tcss.legis.texas.gov/resources/OC/htm/OC.1951.htm"
      },
      {
        "label": "DSHS Statewide Wild Animal Transport Restrictions (25 TAC ch. 169; Health & Safety Code ch. 826)",
        "url": "https://www.dshs.texas.gov/notifiable-conditions/zoonosis-control/laws/transport"
      }
    ],
    "readerNote": "We could not verify a bat-exclusion season in TPWD rules, and state-listed bat species may need separate TPWD authority. Confirm with TPWD before bat work.",
    "notes": "The Texas SOS TAC viewer (texreg.sos.state.tx.us) now redirects to a new portal that could not be read, so the text of 31 TAC 65.381 was not read on the official portal. The rule number and wording match the TPWD Outdoor Annual page. statutes.capitol.texas.gov is a JavaScript app; the statute text was read from the Legislature's tcss.legis.texas.gov resource files. No TPWD page stating a recommended bat-exclusion window was verified (a May 1 to Aug 15 window appeared only in a search-engine summary), so no Texas exclusion dates are given. State-listed bat species (e.g. Rafinesque's big-eared bat) would need TPWD authority. No TPWD page for this was fetched."
  },
  {
    "code": "WA",
    "agency": "Washington Department of Fish and Wildlife (WDFW). Washington State Department of Agriculture (WSDA) handles pesticide licensing.",
    "agencyUrl": "https://wdfw.wa.gov/species-habitats/living/nuisance-wildlife/wildlife-control-operators/faq",
    "permitName": "Wildlife Control Operator (WCO) certification. A separate WDFW special trapping permit is needed to use body-gripping traps.",
    "whoNeedsIt": "Anyone who traps, harasses or otherwise controls wildlife on someone else's property for a fee. WAC 220-440-110(4) makes this unlawful without a WCO certification.",
    "requirements": [
      "At least 18 years old.",
      "Pass the Washington State trapper education exam and have at least two years' documented experience. Accepted evidence includes two years holding a trapper's licence, a recommendation letter from a certified WCO or trapper, or two years' employment in wildlife abatement.",
      "Pass the WDFW WCO basic certification course. Classes run online twice a year, usually March and August, and last about 4 to 5 hours. The end-of-class exam needs a score of at least 90%.",
      "Must be legally able to possess a firearm, with no felony or domestic-violence conviction. In the past three years: no more than one Chapter 77.15 RCW infraction and no fish-and-wildlife crime conviction.",
      "Enrollment fee: $50 per certification. WDFW says renewal currently has no fee.",
      "Certification lasts 3 years. WDFW runs a criminal background check at each renewal.",
      "Annual report of all WCO activity due by April 20 each year, even if nothing was trapped (WAC 220-440-120).",
      "No trapping licence is needed to work as a WCO. Without one, trapped animals must be released on site or euthanized. A trapping licence is required to keep fur."
    ],
    "restrictions": [
      "WCOs may not handle deer, elk, cougar, bear, moose, wolf, bighorn sheep, mountain goats, turkeys, or protected or endangered wildlife.",
      "Species WCOs may handle (WDFW FAQ): raccoon, fox, bobcat, beaver, muskrat, mink, river otter, weasel, hare and cottontail rabbits. Also predatory birds (as defined in WAC 220-400-030) and unclassified wildlife such as eastern gray squirrels, yellow-bellied marmots, coyotes and nutria.",
      "Trapped animals must be released on site or euthanized and properly disposed of. Releasing an animal off the property where it was caught needs a WDFW permit, except beaver released under RCW 77.32.585 (WAC 220-440-110(3)).",
      "Body-gripping traps need a special trapping permit, and WDFW requires live traps and other non-lethal methods to be tried first.",
      "Air guns are not firearms and may not be used to euthanize trapped wildlife (WDFW FAQ).",
      "Bats: WDFW guidance (not a rule) says to exclude bats only from mid-August to mid-October, or in early spring before the May birthing period. Never trap flightless young. Do not use naphthalene or mothballs."
    ],
    "pesticideLicenceAlsoNeeded": "Yes, if pesticides are applied for hire. WSDA commercial applicators must be certified in each classification they work in (WAC 16-228-1545). 'Pest control operator – General' covers insects, spiders, birds, rodents and animal pests in and around buildings but excludes fumigants. 'Vertebrate pest control' covers outdoor vertebrate control, also without fumigants. 'Space (nonsoil) fumigation' is needed for fumigants used against rodents or other pests.",
    "citations": [
      {
        "label": "WDFW: Wildlife control operator classes and FAQ",
        "url": "https://wdfw.wa.gov/species-habitats/living/nuisance-wildlife/wildlife-control-operators/faq"
      },
      {
        "label": "WDFW: Hiring a Wildlife Control Operator",
        "url": "https://wdfw.wa.gov/species-habitats/living/nuisance-wildlife/wildlife-control-operators"
      },
      {
        "label": "Chapter 220-440 WAC (220-440-100 certification; -110 use of WCOs; -120 reporting)",
        "url": "https://app.leg.wa.gov/wac/default.aspx?cite=220-440&full=true"
      },
      {
        "label": "WDFW: Living with bats (exclusion guidance)",
        "url": "https://wdfw.wa.gov/species-habitats/living/species-facts/bats"
      },
      {
        "label": "WAC 16-228-1545 WSDA licence classifications",
        "url": "https://app.leg.wa.gov/WAC/default.aspx?cite=16-228-1545"
      }
    ],
    "readerNote": "The bat exclusion windows above are WDFW guidance, not rule text.",
    "notes": "The WDFW bat exclusion windows are guidance, not rule text. Whether any Washington bat species needs special state authority was not researched. Federal ESA or MBTA protections still apply to birds. 'Predatory birds' in WAC 220-400-030 was not opened to confirm which species it covers."
  },
  {
    "code": "FL",
    "agency": "Florida Fish and Wildlife Conservation Commission (FWC). Florida Department of Agriculture and Consumer Services (FDACS) handles pest-control licensing under Chapter 482, F.S.",
    "agencyUrl": "https://myfwc.com/license/wildlife/nuisance-wildlife-permits/",
    "permitName": null,
    "whoNeedsIt": "FWC does not license nuisance wildlife trappers. They may register voluntarily to appear on FWC's Wildlife Trapper List. A property owner may take nuisance wildlife or authorize someone else to do it (Rule 68A-9.010). Species-specific FWC permits apply (see restrictions). Trappers who control commensal rodents (rats, mice) in, on or under structures need an FDACS Limited Commercial Wildlife Management certificate. Its number starts with 'LW'.",
    "requirements": [
      "FDACS Limited Commercial Wildlife Management certificate (s. 482.157, F.S.): application and exam fee of $150 to $300 set by rule, a passing exam score, and proof of insurance meeting s. 482.071(4). It expires 1 year after issue. Renewal fee is $75 to $150, with 4 classroom hours of CE and proof of insurance. A $50 late fee applies after a 30-day grace period. If not renewed within 60 days, you must retake the exam.",
      "That certificate does not authorize pesticides or chemicals other than adhesive materials, running a pest control business, or supervising uncertified people.",
      "Live traps and snares must be checked at least every 24 hours (68A-9.010(2)(c)).",
      "All bird traps must be labeled with the FWC permit or registration number (or the rule exemption) plus the operator's name, address and phone (Rule 68A-16.006). People without a Chapter 482 licence or the listed FDACS certifications need an FWC permit to trap non-native nuisance birds. The commercial wildlife management limited certification is one of the listed exemptions."
    ],
    "restrictions": [
      "These may not be taken as nuisance wildlife: species listed in Chapter 68A-27 F.A.C., black bear, deer, bobwhite quail, wild turkey, and any bird protected under the MBTA (50 CFR 10.13) unless USFWS has authorized it.",
      "Bats: take is allowed only incidental to exclusion devices or registered repellents from Aug 15 to Apr 15. It is also allowed during permanent repairs if an exclusion device has been in place for at least 4 consecutive days/nights with NWS-forecast lows above 50°F. No exclusion devices or anything that blocks bat entry or exit at a roost from Apr 16 through Aug 14.",
      "Bobcat: may be taken when causing or about to cause property damage or a public-safety threat, but a live-captured bobcat may not be euthanized and must be released.",
      "Prohibited methods: gun and light (unless permitted), steel traps (unless permitted), poison other than FDACS-registered pesticides used per label, and any method prohibited by s. 828.12, F.S.",
      "Disposition: release or euthanize within 24 hours of capture or trap inspection. Protected species and non-targets must be released immediately at the capture site.",
      "Release off the capture property is allowed only if the animal is a native species, the release site is in the county of capture and at least 40 contiguous acres, and you carry written permission from that property owner. Otherwise release only on the same contiguous property.",
      "Euthanasia must be humane as defined by the AAZV or AVMA.",
      "Transport is allowed only for euthanasia or lawful release, and does not override county rabies alerts or quarantines.",
      "Separate FWC permits exist for: possessing or transporting live venomous reptiles (captive wildlife permit), gun and light at night, steel traps, deer and bear depredation, protected species, feral mallard control, and Canada goose depredation."
    ],
    "pesticideLicenceAlsoNeeded": "Yes. Chapter 482, F.S. defines 'pest control' to include using any pesticide or mechanical device against rodents, pest birds, bats or other pests in, on or under a structure, lawn or ornamental. 'Rodent' is defined to include squirrels, flying squirrels and bats (s. 482.021). Pesticide use needs an FDACS pest control licence or certification. The wildlife limited certificate (s. 482.157) covers only non-chemical control of commensal rodents. FWC Rule 68A-9.010 allows only FDACS-registered pesticides used according to the label.",
    "citations": [
      {
        "label": "FWC: Nuisance Wildlife Permits",
        "url": "https://myfwc.com/license/wildlife/nuisance-wildlife-permits/"
      },
      {
        "label": "FWC: FAQs Nuisance Wildlife",
        "url": "https://myfwc.com/conservation/you-conserve/wildlife/faqs/"
      },
      {
        "label": "Rule 68A-9.010 F.A.C. Taking Nuisance Wildlife (rule page)",
        "url": "https://flrules.org/gateway/RuleNo.asp?ID=68A-9.010"
      },
      {
        "label": "Rule 68A-9.010 F.A.C. current adopted text (eff. 7/27/2010)",
        "url": "https://flrules.org/gateway/readFile.asp?sid=0&tid=8898700&type=1&file=68A-9.010.doc"
      },
      {
        "label": "FWC: Bird Trap rule (68A-16.006 F.A.C.)",
        "url": "https://myfwc.com/license/wildlife/bird-trap/"
      },
      {
        "label": "s. 482.157, F.S. Limited certification for commercial wildlife management personnel",
        "url": "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0482/Sections/0482.157.html"
      },
      {
        "label": "s. 482.021, F.S. Definitions",
        "url": "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0482/Sections/0482.021.html"
      },
      {
        "label": "FDACS: Are wildlife trappers allowed to trap rodents and mice in my house?",
        "url": "https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Pest-Control/Pest-Control-FAQ/Are-wildlife-trappers-allowed-to-trap-rodents-and-mice-in-my-house"
      }
    ],
    "readerNote": "Rule change pending: FWC noticed a July 2026 public hearing on amending the trapping rule (68A-9.010). Confirm the current text with FWC before you rely on these details.",
    "notes": "RULE CHANGE MAY BE COMING: the flrules.org page for 68A-9.010 lists a July 1, 2026 notice of a public hearing (July 8, 2026) on amendments to the wildlife trapping rules. Recheck the rule text before publishing. The 2008 flrules document returned by search is an outdated proposed rule, not the current text. How FDACS applies Chapter 482 to non-chemical exclusion of bats, squirrels or pest birds by wildlife trappers (beyond commensal rodents) was not confirmed. Only the statutory definitions were read. FWC's bat-trap exemption list (the specific FDACS certifications) was read from FWC's summary, not the rule text itself."
  },
  {
    "code": "CA",
    "agency": "California Department of Fish and Wildlife (CDFW). The Structural Pest Control Board (SPCB) licenses pest control in structures, and the Department of Pesticide Regulation (DPR) handles other pesticide licensing.",
    "agencyUrl": "https://wildlife.ca.gov/Licensing/Trapping",
    "permitName": "CDFW Trapping License. CDFW describes it as issued to a person who traps fur-bearing or nongame mammals for pest control purposes.",
    "whoNeedsIt": "Anyone providing trapping services for profit. Owners, tenants and their agents trapping under FGC 4152 or 4180 are exempt except when providing trapping services for profit (FGC 4005(c)). Exempt: SPCB-licensed structural pest control operators, and DPR-licensed or certified people, but only when trapping rats, mice, voles, moles or gophers (FGC 4005(e)).",
    "requirements": [
      "You must pass a test of knowledge and skill before a licence is issued (FGC 4005(b)).",
      "Fees for the July 1 to June 30 licence year: resident $160.94, nonresident $792.75, junior $54.33. These include a non-refundable 3% application fee capped at $7.50 per item.",
      "Register a trap number with CDFW and stamp or tag it on every trap. Common rat and mouse traps are exempt (14 CCR 465.5(f)(1), (g)).",
      "Visit traps at least once daily and remove all trapped animals (14 CCR 465.5(g)(2); FGC 4152(b), 4180(b)).",
      "No trap within 150 yards of a residence unless set by the person controlling the property, or by someone carrying the landowner's written consent (14 CCR 465.5(g)(3)).",
      "Anyone taking nongame mammals under FGC 4152 as an owner's agent must carry written permission from the owner or tenant.",
      "Raw fur taken while providing trapping services for profit may not be sold (FGC 4005(d))."
    ],
    "restrictions": [
      "Trapped fur-bearers and nongame mammals must be immediately killed or released. Unless released, they must be killed by shooting where local ordinances, landowners and safety permit. Government employees may use chemical euthanasia (14 CCR 465.5(g)(1)).",
      "Nobody, including government employees, may use steel-jawed leghold traps, padded or not, on game, fur-bearing, nongame or protected mammals, dogs or cats. The only exception is government employees or their agents when it is the only way to protect human health or safety (FGC 3003.1(a)(3)).",
      "Body-gripping traps may not be used for recreation or commerce in fur (FGC 3003.1(a)(1)). Conibear traps, snares, cage and box traps, nets, suitcase-type live beaver traps and common rat/mouse traps may be used for purposes unrelated to fur, such as property protection, under the conditions in 14 CCR 465.5(g).",
      "FGC 4152 does not apply to bobcats. Separate CDFW regulations govern bobcats, black bear, beaver, deer, elk, wild pig, wild turkey and gray squirrels causing damage.",
      "Nongame birds and mammals may not be taken except as provided. English sparrow, starling, coyote, weasels, skunks, opossum, moles and rodents may be taken year-round in any number, excluding tree and flying squirrels, fur-bearers, and listed species (14 CCR 472(a)).",
      "The SPCB exemption for live capture and exclusion does not exempt anyone from the California Endangered Species Act (FGC ch. 1.5, s. 2050 et seq.)."
    ],
    "pesticideLicenceAlsoNeeded": "Yes, for some work. People who live-capture and remove, or exclude, vertebrate pests from a structure without pesticides are exempt from the Structural Pest Control Act if they carry insurance per B&P 8692 (B&P 8555(g)). 'Vertebrate pests' there includes bats, raccoons, skunks and squirrels but NOT mice, rats or pigeons. So rat, mouse and pigeon work in or on structures, and any pesticide use in structures, falls under SPCB licensing (B&P 8505).",
    "citations": [
      {
        "label": "CDFW: Trapping License",
        "url": "https://wildlife.ca.gov/Licensing/Trapping"
      },
      {
        "label": "CDFW: California Trapping Laws and Regulations (rev. 5/1/2025) — includes FGC 3003.1, 4005 and 14 CCR 465.5, 472",
        "url": "https://nrm.dfg.ca.gov/FileHandler.ashx?DocumentID=45902"
      },
      {
        "label": "Cal. Fish & Game Code 4005",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FGC&sectionNum=4005"
      },
      {
        "label": "Cal. Fish & Game Code 3003.1",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FGC&sectionNum=3003.1"
      },
      {
        "label": "Cal. Fish & Game Code 4152",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FGC&sectionNum=4152"
      },
      {
        "label": "Cal. Fish & Game Code 4180",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FGC&sectionNum=4180"
      },
      {
        "label": "Cal. Bus. & Prof. Code 8555 (exemptions incl. (g) live capture/exclusion)",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=8555"
      },
      {
        "label": "Cal. Bus. & Prof. Code 8505 (definition of structural pest control)",
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=8505"
      }
    ],
    "readerNote": "The rule says trapped animals must be immediately killed or released, so treat on-site release as the safe practice. The CDFW material we verified sets out no bat-exclusion rules; ask CDFW before bat work.",
    "notes": "RELOCATION: the verified rule text says animals must be 'immediately killed or released' (14 CCR 465.5(g)(1)). Secondary sources say relocation is unlawful (a claimed 465.5(h)) and that release must be on site (14 CCR 679). That wording was not found in the current CDFW regulations booklet and could not be checked in the official CCR, so it is left out. Treat on-site release as the safe practice, but do not cite a specific 'no relocation' clause until verified. BATS: the CDFW Human-Wildlife Conflicts bat page gives no legal status or exclusion window. Whether commercial bat exclusion needs any CDFW authority is unverified (null). Bats are not in the 14 CCR 472(a) list of freely takeable nongame mammals. Domestic pigeon appears in one CDFW summary sheet's version of 472 but not in the regulation text in the 2025 booklet, so it is omitted. DPR qualified applicator requirements for outdoor or agricultural vertebrate control were not researched."
  },
  {
    "code": "SC",
    "agency": "South Carolina Department of Natural Resources (SCDNR). Clemson University Department of Pesticide Regulation handles pesticide licensing.",
    "agencyUrl": "https://www.dnr.sc.gov/wildlife/nuisance.html",
    "permitName": "SCDNR depredation permit (special permit to capture destructive wildlife, SC Code 50-11-2570). South Carolina has no WCO licence. SCDNR keeps a voluntary Wildlife Control Operators referral list.",
    "whoNeedsIt": "SCDNR says control of wildlife damage is the property owner's responsibility. A depredation permit is required for anyone trapping or shooting wildlife during the closed season. No permit is needed when the owner or their designee captures fur-bearers or squirrels within 100 yards of the owner's home when the animal is damaging the home or property.",
    "requirements": [
      "Depredation permits are free from any SCDNR Wildlife Management or Law Enforcement office.",
      "Permits last 30 days (1 year for beaver) and can be renewed.",
      "Anyone taking fur-bearers under a depredation permit must report the number and type of animals to SCDNR within 21 days after the permit expires (50-11-2570(C)).",
      "SCDNR sets no exam, training, fee or renewal requirement for wildlife control operators."
    ],
    "restrictions": [
      "Animals caught under the 100-yard exemption must be destroyed, or relocated only with an SCDNR permit (50-11-2570(B)). SCDNR's WCO list states routine relocation is against state law and that no listed WCO is permitted to relocate captured wildlife.",
      "Fur-bearers taken under a depredation permit may not be disposed of commercially (50-11-2570(C)). SCDNR says no sales, transfers or trades of pelts, parts or whole animals.",
      "Federally protected birds may need additional permits.",
      "SCDNR says there are no registered poisons for squirrels, and any such use violates state and federal law.",
      "Bats (SCDNR guidance): exclusion with one-way devices is the only effective removal method. Best times are early spring (March–April) or fall (August–October). Do not exclude from May through mid-July, when flightless pups would be trapped. SCDNR says there are no effective repellents or pesticides for bats. The federally listed northern long-eared bat may occur in the mountains."
    ],
    "pesticideLicenceAlsoNeeded": "Yes, if pesticides are used. Clemson DPR requires a commercial applicator licence for anyone applying restricted-use pesticides, or any pesticide in Categories 3, 5, 6, 7A, 7B or 8, on another person's property for pay. A Pesticide Business License is needed to run a Category 7A (industrial, institutional, structural and health-related pest control) business: $150 business licence plus a $50 Designated Certified Applicator. Category 7B covers restricted-use fumigants.",
    "citations": [
      {
        "label": "SCDNR: Wildlife Control Operators",
        "url": "https://www.dnr.sc.gov/wildlife/nuisance.html"
      },
      {
        "label": "SCDNR: Wildlife Control Operators Referral List (intro)",
        "url": "https://www.dnr.sc.gov/wildlife/docs/wcointroduction.pdf"
      },
      {
        "label": "SCDNR: Depredation permits",
        "url": "https://www.dnr.sc.gov/hunting/depredation.html"
      },
      {
        "label": "SC Code 50-11-2570 Issuance of special permit to capture destructive wildlife",
        "url": "https://www.scstatehouse.gov/code/t50c011.php"
      },
      {
        "label": "SCDNR: Bats in buildings",
        "url": "https://www.dnr.sc.gov/wildlife/publications/nuisance/SCbatsinbldgs.pdf"
      },
      {
        "label": "Clemson DPR: Licensing",
        "url": "https://www.clemson.edu/public/regulatory/pesticide-regulation/licensing/"
      },
      {
        "label": "Clemson DPR: SC Certification Categories",
        "url": "https://www.clemson.edu/public/regulatory/pesticide-regulation/exam-information/certification-categories.html"
      }
    ],
    "readerNote": "The bat exclusion windows are SCDNR guidance, not rule text. Check with SCDNR whether trapping for hire also needs a fur or trapping licence.",
    "notes": "Not confirmed: whether a WCO working for hire must also hold a SC commercial fur or trapping licence (SC Code Title 50, Ch. 11, Art. 12 was not read), and how an operator gets onto the SCDNR WCO list. The bat exclusion windows are SCDNR guidance, not rule text. Whether any SC bat species needs state authority beyond federal ESA listing was not researched. Clemson's commercial-licensing sub-page returned 404, so the licensing overview page was used."
  }
];

export const FEDERAL_BIRD_RULES: FederalBirdRules | null = {
  "mbta": {
    "summary": "The MBTA protects every species listed at 50 CFR 10.13, including their parts, nests and eggs, whether the bird is wild or captive-raised. Species not on the list are not protected. FWS names European starling, rock (feral) pigeon, house sparrow and mute swan as non-native species the MBTA does not protect.\nDepredation permit (50 CFR 21.100): you need one to take, possess or transport MBTA birds for depredation control, except under the depredation orders in 21.150, 21.153 and 21.156. No permit is needed merely to scare or herd depredating birds, unless they are eagles or threatened/endangered species. Permits are applied for through the regional Migratory Bird Permit Office. They allow killing only if the permit says so, and only by people named on it. They last no more than one year.\nDepredation order 21.150: blackbirds, cowbirds, crows, grackles and magpies may be controlled without a permit when causing serious crop or livestock-feed damage, a health hazard or structural property damage. You must try non-lethal methods each calendar year first, and use non-toxic shot or bullets (air guns excepted).\nNests (FWS memo MBPM-2-02, Jan 15, 2025): an 'inactive' nest has no viable eggs or nestlings, including one still being built. It may be destroyed without a permit as long as nobody keeps the nest or its contents. Destroying an 'in-use' nest (formerly called 'active') needs MBTA authorization. Relocating any nest, even an inactive one, needs authorization. It is your responsibility to confirm a nest is inactive, and FWS recommends working outside nesting season. Eagle nests and ESA-listed species are protected even when inactive.\nBirds inside buildings (50 CFR 21.14): anyone may humanely remove a migratory bird from the INTERIOR of a human-occupied building without a permit when it is disrupting normal use. No glue traps. Release immediately. Patch or exclude to prevent re-entry. Interior nests, eggs and nestlings may be removed. Adults may not be killed without a permit. This does not cover exteriors (siding, eaves) or unoccupied structures such as bridges. Eagles and ESA species need separate authority.",
    "unprotectedExamples": [
      "European starling",
      "Rock pigeon (feral pigeon / rock dove)",
      "House sparrow",
      "Mute swan",
      "Eurasian collared-dove (not on the federal list)"
    ],
    "citations": [
      {
        "label": "50 CFR 10.13 List of Migratory Birds (eCFR)",
        "url": "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-10/subpart-B/section-10.13"
      },
      {
        "label": "50 CFR 21.100 Depredation permits (eCFR)",
        "url": "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-D/section-21.100"
      },
      {
        "label": "50 CFR 21.150 Depredation order for blackbirds, cowbirds, crows, grackles, and magpies (eCFR)",
        "url": "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-D/section-21.150"
      },
      {
        "label": "50 CFR 21.14 Authorization—birds in buildings (eCFR)",
        "url": "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-B/section-21.14"
      },
      {
        "label": "FWS: Frequently Asked Questions About a Federal Depredation Permit (non-native species not protected)",
        "url": "https://www.fws.gov/sites/default/files/documents/2024-09/3-200-13-depredation-frequently-asked-questions.pdf"
      },
      {
        "label": "FWS Migratory Bird Permit Memorandum MBPM-2-02 (Jan. 15, 2025) — nests",
        "url": "https://www.fws.gov/sites/default/files/documents/2025-01/mbpm-2-nest-memorandum-2025.pdf"
      },
      {
        "label": "FWS: Authorized Activities – No Permit Required",
        "url": "https://www.fws.gov/program/migratory-bird-permits/authorized-activities-no-permit-required"
      }
    ]
  },
  "falconryAbatement": {
    "summary": "The Federal Special Purpose – Abatement permit (FWS Form 3-200-79) is issued under the special purpose permit rule, 50 CFR 21.95 (terms up to 3 years). The falconry rule, 50 CFR 21.82(e)(11), says a Master Falconer may do abatement with falconry birds. A General Falconer may do it only as a subpermittee of an abatement permit holder. Payment for abatement services requires a Special Purpose Abatement permit. FWS issues the permit, while falconry permits come from state wildlife agencies. Applicants need a current State falconry permit at Master level. Permits go only to individuals, not businesses, though a DBA may be listed. The application fee is $100 and non-refundable.\nWhat it allows: buying, selling, possessing and using captive-bred raptors to flush, haze or take birds (or other wildlife where allowed) to reduce depredation, including threats to human health and safety. Abatement raptors must be captive-bred and wear a seamless numbered FWS band. Only the permittee's own raptors may be used. Golden and bald eagles may not be used.\nThe abatement permit itself does NOT authorize killing or injuring birds. Any take of MBTA birds needs a depredation permit, which the landowner obtains and names the falconer as subpermittee, or must fall under a depredation order.\nGeneral Falconers may fly the permittee's abatement birds as named subpermittees, carrying a copy of the permit, a dated letter and the 3-186A form. They may not use falconry birds under the abatement permit. Acquisitions and dispositions are reported on Form 3-186A. Accidental take of an MBTA species must be emailed to the Regional Migratory Bird Permit Office within 2 business days. For renewal, apply at least 30 days before expiry.\nNo federal permit is needed to haze MBTA birds (other than eagles or T&E species) if you are not paid, and none is needed to kill non-MBTA species such as starlings, pigeons and house sparrows. State rules still apply. Texas, for example, exempts permitted falconers using raptors for bird control from structural pest control licensing (Occupations Code 1951.057).",
    "citations": [
      {
        "label": "FWS: 3-200-79 Special Purpose – Abatement",
        "url": "https://www.fws.gov/service/3-200-79-special-purpose-abatement"
      },
      {
        "label": "FWS: FAQ About a Federal Special Purpose – Abatement Permit (rev. 2/2023)",
        "url": "https://fws.gov/sites/default/files/documents/2024-12/3-200-79-frequently-asked-questions-about-an-abatement-permit.pdf"
      },
      {
        "label": "50 CFR 21.82 Falconry standards and falconry permitting — (e)(11) abatement (eCFR)",
        "url": "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-C/section-21.82"
      },
      {
        "label": "50 CFR 21.95 Special purpose permits (eCFR)",
        "url": "https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-C/section-21.95"
      }
    ]
  },
  "notes": "The FWS abatement and depredation FAQs still cite pre-2022 section numbers (21.27 special purpose, 21.29 falconry, 21.41 depredation, 21.43 and 21.44 depredation orders). Current eCFR numbers are 21.95, 21.82, 21.100, 21.150 and 21.153; use the current numbers on the site. Muscovy duck IS on the 10.13 list, with its own control order at 50 CFR 21.174. The eCFR HTML pages redirect automated clients to a bot check, so the regulation text was read from the official eCFR versioner API (https://www.ecfr.gov/api/versioner/v1/full/2026-09-23/title-50.xml?part=21 and part=10). The cited eCFR URLs are the standard human-readable addresses of those sections. The FWS pages were fetched directly."
};

export function wildlifeRule(code: string): WildlifeStateRule | undefined {
  return WILDLIFE_STATES.find((r) => r.code === code);
}
