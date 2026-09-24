/**
 * ACE study guide: exam strategy tips and the eleven study modules.
 *
 * Ported verbatim from the owner's standalone ACE Prep app (github.com/Turkokami/ACEPrepApp,
 * src/app/). If questions change in the standalone app, copy them here too — the two don't sync.
 */

export type AceStudyGuideSection = {
  id: string;
  title: string;
  examWeight: string;
  summary: string;
  mustKnow: string[];
  testTriggers: string[];
  fieldTakeaways: string[];
};

export const aceExamTips = [
  {
    id: "ipm-first",
    title: "IPM Logic Wins",
    detail:
      "When two answers look close, the one that starts with identification, uses the least disruptive effective tactic, and protects the environment is almost always stronger.",
  },
  {
    id: "species-id",
    title: "Species ID Changes Everything",
    detail:
      "The ACE exam tests whether you understand that different species require different approaches. Know the key ID characters (nodes, wings, frass, egg capsule shape) before you memorize control tactics.",
  },
  {
    id: "biology-drives-control",
    title: "Biology Drives Control",
    detail:
      "Every good control answer follows from the pest's biology. If you know where a pest lives, what it eats, and how it reproduces, the control method almost selects itself.",
  },
  {
    id: "formulation-matters",
    title: "Formulation Fit",
    detail:
      "The exam tests when to use EC vs SC vs dust vs bait vs fumigant. Know which formulations leave the longest residual on porous surfaces and which penetrate or wash off.",
  },
  {
    id: "resistance-rotation",
    title: "Rotate Modes of Action",
    detail:
      "Resistance management means rotating insecticide classes with different modes of action — not just rotating brand names. Know the chemical classes (pyrethroids, OPs, carbamates, neonicotinoids, phenyl pyrazoles).",
  },
  {
    id: "medical-accuracy",
    title: "Medical Importance Is Testable",
    detail:
      "Know which pests cause necrotic bites (brown recluse, sac spider), neurotoxic stings (black widow, scorpion), transmit disease (ticks, fleas, mosquitoes), and cause allergic reactions (cockroaches, bees).",
  },
];

export const aceStudyGuideSections: AceStudyGuideSection[] = [
  {
    id: "biology-morphology",
    title: "Module 1. Insect Biology & Morphology",
    examWeight: "10%",
    summary:
      "This module covers arthropod classification, insect anatomy, development, and the 12 pest management orders. Understanding how insects are built and how they develop is the foundation for understanding how pesticides work and why control strategies differ by pest.",
    mustKnow: [
      "Arthropods have a hard exoskeleton, segmented bodies, and jointed legs. The four pest management classes: Insecta (6 legs), Arachnida (8 legs/2 body regions), Chilopoda (centipedes), and Diplopoda (millipedes).",
      "Insect body regions: head (sensory — antennae, eyes, palpi), thorax (movement — 3 pairs legs, 2 pairs wings), abdomen (digestion, reproduction).",
      "Leg segments in order: coxa → trochanter → femur → tibia → tarsus.",
      "Exoskeleton is made of chitin. Desiccant insecticides (diatomaceous earth, silica aerogel) disrupt the waxy cuticle layer.",
      "Insects breathe through spiracles and tracheae. Oils kill small insects by clogging spiracles (physical mode of action).",
      "Gradual (incomplete) metamorphosis: 3 stages — egg, nymph, adult. Examples: cockroaches, termites, grasshoppers. Nymphs resemble adults.",
      "Complete metamorphosis: 4 stages — egg, larva, pupa, adult. Examples: flies, beetles, butterflies, fleas, ants, bees.",
      "The 12 most important orders: Collembola (springtails), Thysanura (silverfish), Orthoptera (crickets/grasshoppers), Blattodea (cockroaches), Isoptera (termites), Dermaptera (earwigs), Hemiptera (true bugs), Coleoptera (beetles), Siphonaptera (fleas), Diptera (flies), Lepidoptera (moths/butterflies), Hymenoptera (ants/bees/wasps).",
      "Mouthpart types: chewing (beetles, caterpillars, termites), piercing/sucking (fleas, lice, true bugs), sponging (house fly), siphoning (moths/butterflies).",
      "Scientific naming: Genus species. Example: Blatella germanica. Common names vary by region; scientific names are universal.",
    ],
    testTriggers: [
      "If asked about a pesticide's mode of action affecting the cuticle, think desiccants (DE, silica aerogel).",
      "If asked how oils kill insects, the answer is physical suffocation via spiracle clogging.",
      "If asked about metamorphosis type for a specific pest, know: cockroaches/termites = gradual; flies/beetles/fleas/ants = complete.",
      "An insect with piercing-sucking mouthparts cannot cause chewing damage — know the mouthpart types and what damage they cause.",
    ],
    fieldTakeaways: [
      "Knowing insect orders helps you make sense of behavior, life stage, and vulnerability windows.",
      "Metamorphosis type tells you which life stages to target with IGRs vs. adulticides.",
      "Mouthpart type helps diagnose plant or structural damage even before you see the pest.",
    ],
  },
  {
    id: "ipm-principles",
    title: "Module 2. IPM Principles",
    examWeight: "10%",
    summary:
      "IPM is a decision-making process, not just a product category. This module covers what constitutes an IPM inspection, how thresholds work, non-chemical control tactics, and the unique challenges of pest control in food-handling facilities.",
    mustKnow: [
      "IPM = Integrated Pest Management. A strategy combining multiple tactics to manage pests at acceptable levels while minimizing risk to people, non-targets, and the environment.",
      "Essential IPM ingredients: Know your pest (ID first), set thresholds, conduct inspections, use multiple tactics, gain cooperation.",
      "Action threshold: The pest level at which control action becomes necessary. Not 'zero tolerance' — different pests have different thresholds in different settings.",
      "IPM inspection goes beyond a sanitation report: looks for pest requisites (food, water, shelter), signs of pests, entry points, and IPM deficiencies.",
      "The pest triangle: pest + host + environment. Removing or reducing any side reduces the pest problem.",
      "Non-chemical IPM tactics: sanitation, exclusion, harborage denial, pest-proofing, interception, quarantine, environmental alteration, trapping, monitoring, vacuuming, temperature modification, modified atmospheres.",
      "IPM control hierarchy (pyramid, least to most disruptive): prevention/cultural → mechanical/physical → biological → chemical.",
      "Monitoring tools: sticky traps, light traps, pheromone traps, flushing agents, moisture meters, boroscopes, motion detectors, IR cameras, digital cameras, trained dogs.",
      "Food handling facilities: FDA and USDA regulate pesticide applications. GMPs (Good Manufacturing Practices) govern contractor behavior. Third-party auditors (AIB, NSF, etc.) evaluate compliance.",
      "Pest-proof design: building design that denies pests access, harborage, and resources before they enter.",
    ],
    testTriggers: [
      "If an answer starts with 'inspect and identify the pest first,' it is usually the IPM-correct answer.",
      "Thresholds are NOT about tolerating pests — they define when action becomes justified based on risk or damage level.",
      "If the question involves a food plant, think FDA, USDA, GMPs, and third-party auditors.",
      "The IPM pyramid puts chemical control at the top (smallest, least frequent) — not at the base.",
    ],
    fieldTakeaways: [
      "IPM documentation (service reports, monitoring records) protects the company and communicates value to the client.",
      "Understanding thresholds helps technicians explain to clients why one cockroach in a hospital matters but one cricket outside a warehouse may not.",
      "Non-chemical tactics often provide the longest-lasting control — bait stations catch pests, but exclusion stops them from coming back.",
    ],
  },
  {
    id: "ipm-tools-practice",
    title: "Module 3. IPM Tools & Practice",
    examWeight: "10%",
    summary:
      "This module covers pesticide formulation types, their advantages and disadvantages on different surfaces, insecticide chemical classes and their modes of action, and resistance management principles. Knowing which formulation to choose and why is a core ACE competency.",
    mustKnow: [
      "Application types: General/broadcast (wide surface areas), spot (≤2 sq ft, away from human contact), crack & crevice (inaccessible crevices/voids), bait, fumigation, void, space.",
      "Emulsifiable Concentrate (EC): oil-based, forms milky solution, fast knockdown, easily absorbed through skin, phytotoxic risk, may stain. LEAST residual on porous/brick surfaces.",
      "Suspension Concentrate (SC or flowable): finely ground particles in liquid. Better residual than EC on porous surfaces, less skin absorption, requires agitation. Examples: Suspend, Talstar, Tempo.",
      "Microencapsulated (ME or CS): AI in slow-release polymer capsules. Best residual, lower exposure risk, can clog nozzles, expensive. Examples: Cykick CS, Demand CS.",
      "Wettable Powder (WP): AI + inert dust + wetting agent. Good residual on porous surfaces, visible residue, inhalation hazard when mixing, requires frequent agitation.",
      "Dusts: dry AI + inert carrier. Long residual, limited application areas, drift issues, experience needed. Boric acid is one of few 100% AI dusts.",
      "Baits: AI (typically <5%) + attractant. Long residual, target-specific, must compete with other food sources.",
      "Fumigants: volatile gases (methyl bromide, Vikane/sulfuryl fluoride, phosphine). Broad-spectrum, no residual, require enclosed space, highly toxic, special training.",
      "Insecticide chemical classes: Organophosphates (irreversibly inhibit cholinesterase), Carbamates (reversibly inhibit cholinesterase), Pyrethroids (sodium channel disruptors), Neonicotinoids/chloronicotinyls (nicotinic receptor mimics, e.g. imidacloprid/Premise), Phenyl pyrazoles/fipronil (GABA channel blocker, e.g. Termidor), Pyrroles/chlorfenapyr (Phantom — disrupts mitochondrial energy), IGRs (juvenile hormone mimics or chitin synthesis inhibitors), Microbials (Bt, Beauveria bassiana), Macrocyclic lactones/avermectins (chloride channel activators).",
      "Resistance management: Rotate insecticides from different chemical classes with different modes of action. Resistance is most likely when pests have high reproductive rates and the entire population is exposed.",
    ],
    testTriggers: [
      "For 'longest residual on brick/porous surfaces': microencapsulated > wettable powder > suspension concentrate > EC.",
      "If a cockroach account has a history of pyrethroid use, choose a non-pyrethroid class (e.g. chlorfenapyr, fipronil) for rotation.",
      "If asked which formulation requires the LEAST agitation: EC (little agitation) vs. WP and SC (require regular agitation).",
      "Resistance develops faster when: reproductive rate is high, most/all population is exposed.",
    ],
    fieldTakeaways: [
      "Choosing the right formulation for the surface and site is as important as choosing the right active ingredient.",
      "Document insecticide class rotations on accounts with resistance history — it protects efficacy and shows professional practice.",
      "Boric acid is a good rotation choice because resistance is difficult to develop against physical toxicants.",
    ],
  },
  {
    id: "toxicology-safety-laws",
    title: "Module 4. Toxicology, Safety & Laws",
    examWeight: "~15%",
    summary:
      "This module covers how pesticides enter and harm organisms, how acute toxicity is measured, signal words, label requirements, personal protective equipment, pesticide laws (FIFRA), and how to manage exposure risk.",
    mustKnow: [
      "Pesticide legal definition: Any substance intended for preventing, destroying, repelling, or mitigating a pest, or for use as plant regulator, defoliator, or dessicant.",
      "Routes of entry for pesticides into pests: stomach poisons (ingestion), contact (penetrate body wall or feet), fumigants (respiratory/spiracles), desiccants (disrupt cuticle wax).",
      "Acute toxicity = rapidly produced from single exposure. Chronic toxicity = slow-action or long-term exposure effects.",
      "LD50 = Lethal Dose 50 — amount (mg/kg body weight) needed to kill 50% of test population. Lower LD50 = more toxic.",
      "LC50 = Lethal Concentration 50 (used for inhalation/aquatic exposure).",
      "Signal words and EPA toxicity classes: DANGER-POISON (Class I, most toxic), WARNING (Class II), CAUTION (Class III & IV, least toxic).",
      "Hazard = Toxicity × Exposure. Reducing either one reduces risk.",
      "Chronic effects: carcinogenicity, mutagenicity, teratogenicity (birth defects), oncogenicity, reproductive effects, delayed neurotoxicity.",
      "PPE selection is based on label requirements. Route of exposure matters — dermal absorption is often the highest risk for pesticide applicators.",
      "FIFRA = Federal Insecticide, Fungicide, and Rodenticide Act. EPA is the primary federal pesticide regulatory agency.",
      "Every registered pesticide label is a federal legal document. 'The label is the law.'",
      "Pesticide registration requires extensive testing: acute and chronic toxicity, eye/dermal irritation, teratology, reproduction, carcinogenicity — up to 120 different studies.",
      "Restricted Use Pesticides (RUPs) require certified applicator licensing. General Use Pesticides (GUPs) do not, but label compliance still applies.",
      "Organophosphates and carbamates inhibit cholinesterase (OPs irreversibly, carbamates reversibly). Symptoms: SLUD (salivation, lacrimation, urination, defecation).",
    ],
    testTriggers: [
      "If asked which signal word goes with the most toxic class: DANGER-POISON (not just DANGER alone).",
      "If asked how to reduce hazard: reduce toxicity (select less toxic product) OR reduce exposure (PPE, lower-risk formulation).",
      "If an OP/carbamate poisoning question comes up, the mechanism is cholinesterase inhibition.",
      "Label questions: the label is always the legal authority — if the label says it, follow it even if common practice differs.",
    ],
    fieldTakeaways: [
      "Technicians who understand LD50 can explain to customers why a lower-concentration product isn't necessarily safer.",
      "PPE selection should be specific to the label, not generic — check every new product's label.",
      "Documenting material usage and PPE choices protects the technician legally in case of an exposure incident.",
    ],
  },
  {
    id: "cockroaches",
    title: "Module 5. Cockroaches",
    examWeight: "~8%",
    summary:
      "Cockroaches are one of the most medically important pest groups. This module covers cockroach biology, species identification by size/breeding site/egg capsule, and how these differences drive control decisions.",
    mustKnow: [
      "Medical importance: vectors of food poisoning pathogens, respiratory infection, dysentery. Cockroach allergens are a leading asthma trigger in urban environments.",
      "German cockroach (Blatella germanica): ½–⅝ inch, 2 dark stripes on pronotum, 30–40 eggs/ootheca, 2 months egg-to-adult. Kitchen/bathroom indoors. Does NOT fly. Most prolific indoor species.",
      "Brown-banded cockroach (Supella longipalpa): ½ inch, female glues egg capsule to ceilings and furniture. Throughout home, not just kitchen. Does not fly.",
      "Asian cockroach: Similar to German, but flies. Found outdoors in leaf litter, attracted to lights. Cannot breed indoors.",
      "Oriental cockroach (Blatta orientalis): 1¼ inch, dark red-brown to black, short wings. Prefers cool/damp. Found in basements, sewers, crawl spaces. 1–2 years egg-to-adult.",
      "American cockroach (Periplaneta americana): 1¾ inch, reddish-brown with pale pronotum edge. Sewers, basements, wall voids, attics. Strong flier. 9–24 months egg-to-adult.",
      "Smoky-brown cockroach (Periplaneta fuliginosa): 1¾ inch, uniform dark brown. Outdoors — woodpiles, trees, attics, soffits. 12 months egg-to-adult.",
      "Ootheca identification: shape, size, number of segments, and number of eggs help ID species. German ootheca has 15–20 segments (30–40 eggs).",
      "Nymphs are coprophagic early in development (eat older cockroach feces). Young nymphs must remain near crevices and frass.",
      "Control strategy differs significantly by species: German = baiting, crack & crevice treatment in kitchen; Oriental = moisture reduction, basement/crawl space focus; American = sewer entry exclusion.",
    ],
    testTriggers: [
      "If asked which cockroach is most likely in a sewer: Oriental or American cockroach.",
      "An ootheca with ~18 segments = German cockroach.",
      "If a cockroach account is failing pyrethroid treatments, consider resistance — switch chemical class.",
      "Brown-banded cockroaches are found throughout the entire structure, not just kitchens — control must follow them.",
    ],
    fieldTakeaways: [
      "German cockroach populations can double every few weeks — rapid, thorough treatment and follow-up are essential.",
      "Identifying species before treating tells you where to look, what to use, and whether to expect resistance.",
      "Coprophagic behavior means baits placed near existing feces compete against an existing food source in fresh infestations.",
    ],
  },
  {
    id: "ants",
    title: "Module 6. Ants",
    examWeight: "~8%",
    summary:
      "All ants are social insects with overlapping generations, adult care for young, and caste systems. The ACE exam tests species ID by anatomy and behavior, nesting habits, and control differences that stem from those differences.",
    mustKnow: [
      "All ants are social: overlapping generations, cooperative brood care, caste systems, perennial nests.",
      "Ant anatomy key ID points: number of petiole nodes (1 or 2), antennal club segments, presence of acidopore vs. sting, anal opening shape.",
      "Subfamily Formicinae: single node, acidopore (round anal opening with fringe of hairs). Includes carpenter ants, crazy ants, rover ants.",
      "Subfamily Myrmicinae: two nodes, sting. Includes fire ants, pharaoh ants, pavement ants, odorous house ants (note: OHA technically one node).",
      "Carpenter ants (Camponotus): ¼–½ inch, polymorphic, single node, rounded thorax profile. Nest in hollow cavities above ground (trees, wall voids, doors). Produce frass (sawdust + insect fragments + pupal cases). Difficult to bait. Nocturnal.",
      "Fire ants (Solenopsis invicta): 2-segmented antennal club, polymorphic, sting. Mound-builders in soil.",
      "Pharaoh ants (Monomorium pharaonis): tiny (1.5–2 mm), light yellow, two nodes. Major hospital pest — can transmit Pseudomonas and Salmonella. Must bait ONLY — insecticide sprays cause budding.",
      "Odorous house ants (Tapinoma sessile): single node hidden, smell like coconuts when crushed. Polygynous colonies. Very difficult to eliminate — perimeter baiting and exclusion.",
      "Pavement ants: small, build soil nests under slabs, sidewalks. Two nodes. Often confused with other small ants.",
      "Workers needed to identify most ant species — queens and males look alike across many species.",
    ],
    testTriggers: [
      "If an ant account keeps getting worse after insecticide treatment: suspect pharaoh ants or odorous house ants — switch to baiting only.",
      "Carpenter ant frass contains insect fragments and pupal cases — this distinguishes it from termite frass.",
      "Ants with two petiole nodes: typically Myrmicinae (fire ants, pharaoh ants, pavement ants).",
      "Polymorphism (multiple worker sizes) = carpenter ants, fire ants, big-headed ants.",
    ],
    fieldTakeaways: [
      "Identifying the ant species before choosing a control method is the single most important step — wrong identification leads to wrong tactics.",
      "Pharaoh ants can spread through hospitals via plumbing, electrical conduits, and wall voids — treatment must be comprehensive and bait-only.",
      "Carpenter ant satellite colonies are common in structures — treat the satellite colony AND trace back to the parent colony.",
    ],
  },
  {
    id: "flies",
    title: "Module 7. Flies",
    examWeight: "~8%",
    summary:
      "Flies are divided into filth breeders (breed in decaying matter), small flies (fruit flies, phorid flies, fungus gnats), indoor invaders (cluster flies), and outdoor breeders (house flies, mosquitoes). All have complete metamorphosis.",
    mustKnow: [
      "All flies (Order Diptera) have complete metamorphosis: egg → larva (maggot) → pupa → adult. Two functional wings (halteres replace rear wings).",
      "House fly (Musca domestica): 4–7 mm, gray with 4 stripes. Breeds in manure and garbage. Minimum 7–10 day development. Harbors 100+ pathogens. Sponging mouthparts — cannot pierce skin.",
      "Stable fly: looks like house fly but has piercing-sucking mouthparts and bites. Associated with wet organic matter high in nitrogen.",
      "Blow flies and flesh flies: carrion feeders. Presence indicates a dead animal somewhere in or near the structure. Late-instar (3rd instar) larvae have a wandering phase — most likely to be seen by client.",
      "Fruit flies (Drosophila): attracted to fermenting organic matter (drains, fruit, spilled alcohol). Control = eliminate breeding source.",
      "Phorid flies (humpbacked flies): associated with decaying organic matter in drains, sewers, under slabs. Characteristic humpbacked profile and rapid stop-start movement.",
      "Fungus gnats: breed in moist potting soil/organic matter. Most common small fly complaint in offices with potted plants.",
      "Drain flies/moth flies: breed in organic film inside drains. Adults look like tiny moths.",
      "Cluster fly (Pollenia rudis): outdoor fly, parasite of earthworms. Overwinters in attics/walls. Slightly larger than house fly, golden thorax hairs.",
      "Mosquitoes: aquatic breeders (Aedes, Culex, Anopheles). Disease vectors: West Nile virus (Culex), Lyme-adjacent (Aedes), encephalitis, dog heartworm. Control = breeding site elimination, ULV fogging, resting site residual.",
    ],
    testTriggers: [
      "Late-instar fly larvae have a wandering behavior — the life stage most likely seen by clients in a carrion infestation.",
      "If asked about gnats in an office with plants: fungus gnats, not fruit flies.",
      "Cluster flies are identified by golden hairs on thorax and are outdoor parasites of earthworms — they do NOT breed indoors.",
      "House fly vs. stable fly: if it looks like a house fly but bites, it's a stable fly.",
    ],
    fieldTakeaways: [
      "Small fly complaints almost always point to a breeding source — find and eliminate it before spraying.",
      "Sanitation and source reduction are the most effective fly control tactics — chemicals are supplementary.",
      "Documentation of fly monitoring (light trap catch counts, date/location) helps demonstrate control effectiveness to commercial accounts.",
    ],
  },
  {
    id: "biting-stinging",
    title: "Module 8. Biting & Stinging Arthropods",
    examWeight: "~10%",
    summary:
      "This module covers pest identification, bite/sting medical importance, and control for bed bugs, fleas, lice, ticks, mites, spiders, scorpions, and stinging Hymenoptera (bees and wasps).",
    mustKnow: [
      "Bed bugs: ~3/16 inch (apple seed size), mahogany, wingless. Painless bite. Hide in cracks/crevices during day — not just in beds. Survive 2–4 months without feeding. Heavy infestations may have distinctive sweetish odor.",
      "Fleas (Siphonaptera): laterally flattened, wingless. Complete metamorphosis. Only the adult lives on the host. Larva must feed on dried blood (flea feces) to develop. Disease vectors: plague (rat flea), tapeworm (Dipylidium), FAD.",
      "Ticks (Ixodidae — hard ticks): 3-host life cycle (American dog tick, lone star tick, black-legged deer tick). Brown dog tick prefers dogs and structures. Vectors: Lyme disease (black-legged tick/Ixodes scapularis), Rocky Mountain spotted fever (American dog tick), tularemia (lone star tick).",
      "Brown recluse spider: fiddle-shaped mark on cephalothorax, 3 pairs of eyes in semicircle. Nocturnal hunter. Necrotic venom. Most common in central and southern US.",
      "Black widow spider: neurotoxic venom, hourglass marking on abdomen, irregular cobweb. Five US species (Latrodectus). Found in outbuildings, storage, older structures.",
      "Hobo spider: funnel-web builder. Common in Pacific Northwest (WA, OR, ID, UT). NOT considered a medically significant spider for necrotic bites.",
      "Scorpions: 8 legs, 2 claws, segmented tail with stinger. Nocturnal, fluoresce under UV/black light. Neurotoxic venom. Arizona bark scorpion is most medically important US species.",
      "Yellowjackets (Vespula): social, annual colony (<2,000–20,000 workers), primarily ground nesters, aggressively defend nest, most problematic in fall. Paper carton nests.",
      "Bald-faced hornets (Dolichovespula maculata): aerial carton nest, 200–400 workers.",
      "Paper wasps (Polistes): open umbrella nest, exposed brood chambers, fewer than 200 workers. Less aggressive than yellowjackets.",
      "Honey bees: perennial colony (10,000+ workers). Protected pollinator. Failure to remove a wall-void nest = comb melt, honey fermentation, secondary pests (carpet beetles, wax moths, cockroaches, rodents).",
    ],
    testTriggers: [
      "Bed bugs hide throughout the room — not only in beds. The ACE exam tests this misconception directly.",
      "Flea larva cannot live on the host — only adults parasitize the host. Larva lives in carpet/bedding and feeds on flea feces.",
      "Black widow = neurotoxic venom. Brown recluse = necrotic venom. Hobo spider = NOT a confirmed necrotic spider.",
      "When bees nest in a wall, never just spray — failure to remove the comb leads to secondary infestations and structural damage.",
    ],
    fieldTakeaways: [
      "Bed bug treatments must be thorough (not just mattress-focused) and often require multiple visits.",
      "Tick season, species, and disease risk vary by region — knowing what species are local helps set accurate client expectations.",
      "Never treat a honey bee swarm in a wall void without planning comb removal — it creates a worse problem than the original infestation.",
    ],
  },
  {
    id: "occasional-invaders",
    title: "Module 9. Occasional Invaders",
    examWeight: "~5%",
    summary:
      "Occasional invaders enter structures incidentally, usually seasonally, and typically do not reproduce or establish permanent populations indoors. Control focuses on exclusion and perimeter barriers rather than indoor treatments.",
    mustKnow: [
      "Occasional invaders are pests that enter structures but do not breed or establish indoors. Control = exclusion first.",
      "Boxelder bugs: feed on boxelder, maple seeds outdoors. Enter in fall to overwinter. Black with red/orange markings. Control = exclusion, perimeter residual.",
      "Multicolored Asian lady beetles (MALB): congregate on south/west-facing walls in fall after first cold spell. Can bite, stain, and release defensive odor. Control = exclusion before aggregation, interior vacuuming.",
      "Brown marmorated stink bug (BMSB): invade structures in fall to overwinter. Release defensive odor when crushed. Exclusion is primary control.",
      "Millipedes and centipedes: enter from outdoor/damp areas. Millipedes = 2 pairs legs per segment, cylindrical, slow, plant debris feeders. Centipedes = 1 pair legs per segment, flat, fast, predatory. Control = moisture reduction, exterior perimeter treatment.",
      "Sowbugs and pillbugs (isopods): require very high moisture, feed on decaying plant material. Pillbugs roll into a ball (Armadillidium). Control = moisture reduction, debris removal.",
      "Ground beetles, field crickets, earwigs: enter from outdoors in late season. Exterior perimeter treatment + exclusion.",
      "Seed-feeding Hemipterans (e.g., Western conifer seed bug, boxelder bug): attracted to lighted buildings at night — lights can draw them in.",
      "Cluster flies: enter structures in fall to overwinter in attics and wall voids. Exclusion and wall-void treatment are most effective.",
    ],
    testTriggers: [
      "Asian lady beetles become pests when weather turns cold in fall — attracted by the warmth of buildings.",
      "Seed-feeding hemipterans enter homes attracted to LIGHTS at night — not blood, water, or shelter.",
      "Millipedes require moisture and decaying organic matter — control starts with landscape/drainage, not insecticides.",
      "Occasional invaders do not breed indoors — treating indoors treats a symptom, not the cause.",
    ],
    fieldTakeaways: [
      "Exclusion work (caulking, door sweeps, window screens) prevents occasional invaders more effectively than any residual spray.",
      "Seasonal timing matters — installing exclusion before fall migration prevents the problem.",
      "Vacuuming MALB or stink bugs is more effective than spraying once they're inside — crushing releases odors or stains.",
    ],
  },
  {
    id: "stored-product-pests",
    title: "Module 10. Stored Product Pests",
    examWeight: "~8%",
    summary:
      "Stored product pests infest dry goods, grain products, and natural materials. They are divided into primary pests (infest whole grains) and secondary pests (infest damaged or processed products). Control requires thorough source inspection and sanitation before any chemical application.",
    mustKnow: [
      "Primary pests infest whole, undamaged grain internally. Examples: Angoumois grain moth (Sitotroga cerealella), weevils (Sitophilus granarius/oryzae), lesser grain borer.",
      "Secondary pests infest damaged, processed, or milled grain. Examples: flour beetles (red/confused), Indian meal moth, saw-toothed grain beetle, cigarette beetle, drugstore beetle.",
      "Indian meal moth (Plodia interpunctella): most common stored product moth. Pheromone traps available. Silk webbing associated with infested food. Nocturnal, attracted to lights. Primary secondary pest.",
      "Angoumois grain moth: primary pest, feeds internally in whole grain. No silk associated externally.",
      "Flour beetles (Tribolium confusum = confused; T. castaneum = red): reddish-brown, secondary pests. Red flour beetle has clubbed antennae (3 segments); confused flour beetle antennae gradually enlarge.",
      "Cigarette beetle (Lasioderma serricorne) and drugstore beetle (Stegobium paniceum): both infest a wide variety of dry goods (dried herbs, tobacco, pet food, books). Nearly identical — drugstore beetle has striated elytra.",
      "Dermestid beetles (Dermestes/Trogoderma): warehouse beetle larvae are hairy with 2 hooks at end of body, ~½ inch.",
      "Physical control: heat (120°F/60 min kills all stages) or cold (-4°F for 7–14 days). Heat is most reliable for structures; cold for individual packages.",
      "Key control elements: inspection + ID, sanitation, rotation of goods (FIFO), exclusion, physical controls, then chemical if needed.",
      "Hidden sources of infestation: pet food, organic fertilizers, potpourri, old rodent baits, dried flowers, food in coat pockets, bird/rodent/bee nests.",
    ],
    testTriggers: [
      "Indian meal moth = secondary pest with silk; Angoumois grain moth = primary pest, no silk externally.",
      "Beetles with clubbed antennae: warehouse beetle, confused flour beetle, drugstore beetle — all share this character.",
      "All beetles have complete metamorphosis — egg, larva, pupa, adult.",
      "Temperature treatment works for stored product pests: 120°F/60 minutes or -4°F/7–14 days.",
    ],
    fieldTakeaways: [
      "Always find and dispose of the infested source before applying insecticides — otherwise the infestation continues from the source.",
      "Hidden sources (pet food, old rodent bait, dried herbs in a cabinet) are commonly overlooked. Check everything.",
      "Pheromone traps are excellent monitoring tools for stored product moths and some beetles — they catch pests and tell you which direction infestation is spreading.",
    ],
  },
  {
    id: "wood-destroying-insects",
    title: "Module 11. Wood Destroying Insects",
    examWeight: "~8%",
    summary:
      "WDI includes termites (subterranean, drywood, and dampwood), wood-boring beetles (powderpost, false powderpost, anobiid, and old house borer), and carpenter ants. Correct species identification is critical because treatment methods, access, and expectations differ dramatically.",
    mustKnow: [
      "Termite castes: workers, soldiers, reproductives (primary = alates/swarmers; secondary = neotenic). Soldiers or swarmers needed for ID.",
      "Termites digest wood with protozoa, bacteria, and enzymes. Nymphs obtain protozoa through trophallaxis (food sharing with workers).",
      "Ant vs. termite ID: termites have no waist constriction, straight antennae, equal-length wing pairs. Ants have a waist, elbowed antennae, unequal wing pairs.",
      "Eastern subterranean termite (Reticulitermes flavipes): most common US species, 50,000–350,000+ colony, spring swarms, 2 veins on swarmer wing, smooth soldier mandibles.",
      "Formosan subterranean termite (Coptotermes formosanus): 1,000,000+ colony, 10% soldiers, teardrop-shaped soldier head, yellowish-orange hairy swarmers that swarm at night.",
      "Drywood termites (Kalotermitidae): no ground contact, wood moisture <15%, serrated mandibles, 4 anterior veins on swarmer wing. Produce hard dry hexagonal fecal pellets.",
      "Dampwood termites: require moisture in wood, not subterranean. Larger than subterranean. Serrated mandibles.",
      "True powderpost beetles (Lyctidae/Bostrichidae subfamily Lyctinae): 1/32–1/8 inch exit holes, fine silky frass, hardwoods ONLY.",
      "False powderpost beetles (Bostrichidae): 1/16–5/16 inch exit holes, coarse tightly-packed frass, soft and hardwoods. Tend NOT to reinfest.",
      "Anobiid beetles: 1/16–1/8 inch exit holes, elongated loosely-packed frass, prefer >15% wood moisture, hard and softwoods.",
      "Old house borer (Cerambycidae): oval 3/8-inch exit holes, coarse frass with fine striations in damaged wood, attacks softwoods <10 years old.",
      "Carpenter ants: polymorphic, single node, rounded thorax profile, frass contains sawdust + insect parts + pupal cases. Excavate wood for nesting, do NOT eat it. Primary and satellite colonies.",
    ],
    testTriggers: [
      "Drywood termite = dry fecal pellets, no soil contact, serrated mandibles, hardwood in <15% moisture.",
      "True powderpost beetles = hardwood ONLY, fine silky frass, small round holes.",
      "Carpenter ant frass has insect fragments and pupal cases — this is not present in termite frass.",
      "Formosan termites have the largest colonies (1M+) and 10% soldiers — swarm at night.",
    ],
    fieldTakeaways: [
      "Know the frass and hole characteristics for each WDI species — this is a core part of field WDO inspections.",
      "Carpenter ants in a structure almost always mean moisture — find and fix the moisture issue or the colony will persist.",
      "Drywood termite control often requires tent fumigation for whole-structure elimination — localized treatments have limitations.",
    ],
  },
];
