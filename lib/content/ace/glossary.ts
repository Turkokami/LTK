/**
 * ACE glossary and stored-product flashcards.
 *
 * Ported verbatim from the owner's standalone ACE Prep app (github.com/Turkokami/ACEPrepApp,
 * src/app/). If questions change in the standalone app, copy them here too — the two don't sync.
 */

export type TrainingGlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  fieldUse: string;
};


export const aceGlossaryTerms: TrainingGlossaryTerm[] = [
  // Biology & Morphology
  {
    id: "arthropoda",
    term: "Arthropoda (Phylum)",
    definition:
      "The animal phylum containing all insects, spiders, crustaceans, centipedes, and millipedes. Characterized by a hard exoskeleton, segmented body, and jointed legs.",
    fieldUse:
      "Knowing arthropod classes (Insecta, Arachnida, etc.) lets you quickly determine what you're dealing with and what control approach applies.",
  },
  {
    id: "chitin",
    term: "Chitin",
    definition:
      "The protein material that makes up the insect's exoskeleton. Covered with wax layers for waterproofing.",
    fieldUse:
      "Desiccant insecticides (diatomaceous earth, silica aerogel) work by disrupting the waxy chitin layer — knowing this helps you explain why they work in dry environments only.",
  },
  {
    id: "complete-metamorphosis",
    term: "Complete Metamorphosis (Holometabolous)",
    definition:
      "Development through four distinct life stages: egg, larva, pupa, adult. The immature (larva) looks completely different from the adult. Examples: flies, beetles, butterflies, fleas, ants, bees.",
    fieldUse:
      "Critical for IGR selection — juvenile hormone analogs target larvae; chitin synthesis inhibitors target the pupal/molting stage.",
  },
  {
    id: "gradual-metamorphosis",
    term: "Gradual Metamorphosis (Hemimetabolous)",
    definition:
      "Development through three stages: egg, nymph, adult. Nymphs resemble small, wingless adults. Examples: cockroaches, termites, grasshoppers, true bugs.",
    fieldUse:
      "In gradual metamorphosis pests, nymphs and adults often occupy the same harborage — control must target both.",
  },
  {
    id: "spiracle",
    term: "Spiracle",
    definition:
      "External openings on the insect's thorax and abdomen through which air enters the tracheal breathing system.",
    fieldUse:
      "Oils kill insects by clogging spiracles (physical mode of action). Fumigants enter pests through spiracles. This is why ventilation affects fumigant efficacy.",
  },
  {
    id: "petiole",
    term: "Petiole (Node)",
    definition:
      "The narrow waist segment(s) between the ant thorax and abdomen (gaster). Number of nodes (1 or 2) is a primary ant identification character.",
    fieldUse:
      "One node vs. two nodes is your first field key for ant identification — carpenter ants and odorous house ants have 1 node; fire ants and pharaoh ants have 2.",
  },
  // IPM
  {
    id: "ipm",
    term: "Integrated Pest Management (IPM)",
    definition:
      "A decision-making process that uses multiple tactics — prevention, monitoring, biological, mechanical, and chemical controls — to manage pests at acceptable levels while minimizing risk.",
    fieldUse:
      "IPM is the professional standard. On the ACE exam, the IPM-correct answer starts with inspection/identification and selects the least disruptive effective tactic.",
  },
  {
    id: "action-threshold",
    term: "Action Threshold",
    definition:
      "The pest population level or damage severity at which control action becomes economically or medically justified. Does NOT mean zero tolerance.",
    fieldUse:
      "Setting appropriate thresholds helps explain to clients why one fly near an outdoor dumpster is different from one fly in a hospital OR.",
  },
  {
    id: "pest-triangle",
    term: "Pest Triangle",
    definition:
      "A model showing that a pest problem requires three elements: a pest, a susceptible host/food source, and a favorable environment. Removing any side reduces the problem.",
    fieldUse:
      "When explaining IPM to clients, the pest triangle shows why exclusion, sanitation, and moisture control are as important as pesticide application.",
  },
  {
    id: "monitoring",
    term: "Monitoring",
    definition:
      "Sampling pest activity over time to observe trends and changes. Differs from inspection (one-time) — monitoring tracks population changes using sticky traps, pheromone traps, light traps, and visual checks.",
    fieldUse:
      "Monitoring data justifies service and documents efficacy. In food plants, auditors expect to see monitoring records.",
  },
  {
    id: "gmp",
    term: "Good Manufacturing Practices (GMPs)",
    definition:
      "FDA and USDA guidelines governing sanitation, facility maintenance, and pest control practices in food manufacturing and handling facilities.",
    fieldUse:
      "Pest control contractors in food plants must operate within GMP requirements — violations can result in shutdown or lost audits.",
  },
  // Formulations & Chemistry
  {
    id: "ec-formulation",
    term: "Emulsifiable Concentrate (EC)",
    definition:
      "A pesticide formulation where an oil-based active ingredient is combined with emulsifiers and solvents to mix with water. Forms a milky solution. Fast knockdown, easily absorbed through skin and porous surfaces, minimal residual on brick/concrete.",
    fieldUse:
      "ECs work well for rapid knockdown on non-porous surfaces but are not the best choice for long-term residual on porous exterior surfaces like brick.",
  },
  {
    id: "sc-formulation",
    term: "Suspension Concentrate (SC / Flowable)",
    definition:
      "A pesticide where finely ground solid particles are suspended in a liquid carrier. Requires agitation. Better residual than EC on porous surfaces, less skin absorption. Examples: Suspend SC, Talstar, Tempo.",
    fieldUse:
      "SCs are a workhorse formulation for perimeter and crack-and-crevice applications where residual matters more than knockdown speed.",
  },
  {
    id: "cs-formulation",
    term: "Microencapsulated (CS / ME)",
    definition:
      "Active ingredient encased in slow-release polymer micro-capsules suspended in liquid. Best residual of liquid formulations, lower exposure risk, readily picked up by insects. Requires agitation, more expensive. Examples: Demand CS, Cykick CS.",
    fieldUse:
      "Ideal for accounts requiring extended residual with lower exposure risk (schools, daycares). The capsule size can be picked up and transferred by crawling insects.",
  },
  {
    id: "ld50",
    term: "LD50 (Lethal Dose 50)",
    definition:
      "The amount of a substance (in mg/kg body weight) that kills 50% of a test population in a single dose. Lower LD50 = more acutely toxic.",
    fieldUse:
      "The basis for EPA toxicity classification and signal words. Helps choose between products of similar efficacy when safety is the priority.",
  },
  {
    id: "signal-word",
    term: "Signal Word",
    definition:
      "Required label word indicating relative acute hazard: DANGER-POISON (Class I, most toxic), WARNING (Class II), CAUTION (Class III & IV, least toxic).",
    fieldUse:
      "First thing to check on any new product label. Guides PPE selection and customer communication about treatment safety.",
  },
  {
    id: "pyrethroid",
    term: "Pyrethroid",
    definition:
      "Synthetic insecticides modeled after natural pyrethrins. Act on insect sodium channels — not cholinesterase. Mammals are much less sensitive than insects. Bind tightly to soil. Examples: bifenthrin, cypermethrin, permethrin, lambda-cyhalothrin.",
    fieldUse:
      "Most common class in structural pest control. Resistance is a documented issue in German cockroaches and bed bugs — rotation with other classes is important.",
  },
  {
    id: "organophosphate",
    term: "Organophosphate (OP)",
    definition:
      "Insecticide class that irreversibly inhibits acetylcholinesterase, causing nerve stimulation. Higher mammalian toxicity than pyrethroids. Examples: malathion, chlorpyrifos, acephate.",
    fieldUse:
      "Rarely used in structural pest control today due to toxicity and restrictions. Know that OPs = irreversible cholinesterase inhibition for the exam.",
  },
  {
    id: "neonicotinoid",
    term: "Neonicotinoid (Chloronicotinyl)",
    definition:
      "Insecticide class that mimics acetylcholine at nicotinic nerve receptors. Water-soluble, systemic in plants. Examples: imidacloprid (Premise), acetamiprid (Transport).",
    fieldUse:
      "Used in termite treatments (imidacloprid/Premise) and some ant baits. Moderate selectivity — lower impact on beneficial insects in structural applications vs. soil applications.",
  },
  {
    id: "fipronil",
    term: "Fipronil (Phenyl Pyrazole)",
    definition:
      "Insecticide that blocks GABA-regulated chloride channels. Long residual in soil (KOC 750). Non-repellent transfer effect. Examples: Termidor, Regent, MaxForce products.",
    fieldUse:
      "The gold standard for subterranean termite liquid treatment. Transfer effect means termites that contact treated soil carry it back to the colony.",
  },
  {
    id: "igr",
    term: "Insect Growth Regulator (IGR)",
    definition:
      "Pesticides that disrupt insect development. Two types: (1) juvenile hormone mimics (fenoxycarb, methoprene, pyriproxyfen) — disrupt adult transformation and reproduction; (2) chitin synthesis inhibitors (noviflumuron, novaluron) — prevent cuticle formation during molting.",
    fieldUse:
      "IGRs do not kill adults directly — they break the reproductive cycle. Best used in combination with adulticides for faster knockdown.",
  },
  // Cockroaches
  {
    id: "ootheca",
    term: "Ootheca",
    definition:
      "The egg capsule produced by cockroaches. Number of segments, size, and color help identify cockroach species. German ootheca: 15–20 segments, 30–40 eggs. Oriental: 16 eggs. American: 14 eggs.",
    fieldUse:
      "Finding and counting ootheca tells you species ID and infestation severity. German cockroach ootheca carried by the female until 1–2 days before hatch.",
  },
  {
    id: "coprophagy",
    term: "Coprophagy",
    definition:
      "Feeding on feces. Early-instar German cockroach nymphs feed on the feces of older cockroaches to obtain essential nutrients and gut microbes.",
    fieldUse:
      "Coprophagy means bait placed near existing feces competes with an established food source. Remove feces before baiting when possible.",
  },
  // Ants
  {
    id: "budding",
    term: "Budding (Ant Colony Fragmentation)",
    definition:
      "A reproductive strategy in some ant species (notably pharaoh ants, odorous house ants) where a portion of the colony — including workers, brood, and one or more queens — splits off to form a new satellite colony when stressed.",
    fieldUse:
      "Using repellent sprays on pharaoh ants causes budding. Bait-only programs avoid this. Always ID the ant species before selecting a control method.",
  },
  {
    id: "trophallaxis",
    term: "Trophallaxis",
    definition:
      "Food sharing between colony members — often mouth-to-mouth. Critical for termites (sharing gut protozoa with nymphs) and ants (distributing liquid bait through the colony).",
    fieldUse:
      "Trophallaxis is why slow-acting ant baits (low-concentration AI) work better than fast knockdown — bait is shared with the queen before workers die.",
  },
  // WDI
  {
    id: "frass",
    term: "Frass",
    definition:
      "Insect excrement or wood powder expelled from boring insects. Characteristics differ by species: drywood termite frass = hard hexagonal pellets; carpenter ant frass = sawdust + insect parts + pupal cases; powderpost beetle frass = fine silky powder.",
    fieldUse:
      "Frass ID is one of the most important WDO inspection skills — the appearance, texture, and location of frass points directly to the pest species.",
  },
  {
    id: "subterranean-termite",
    term: "Subterranean Termite",
    definition:
      "Termites that must maintain contact with soil to survive. Live in underground colonies and build mud tubes to reach above-ground wood. Most common US species: Reticulitermes flavipes (eastern). Largest colonies: Coptotermes formosanus (Formosan).",
    fieldUse:
      "Mud tubes are the primary field sign. Liquid barrier treatments (non-repellent, transfer-effect products like fipronil) and bait systems are the main control approaches.",
  },
  {
    id: "drywood-termite",
    term: "Drywood Termite",
    definition:
      "Termites that require no soil contact. Live entirely within the wood they infest. Need wood moisture <15%. Produce hard, hexagonal, dry fecal pellets that are kicked out of galleries. Family Kalotermitidae.",
    fieldUse:
      "Tent fumigation is often the only way to treat an entire structure for drywood termites. Localized treatments (borate injection, heat, microwaving) can work for limited infestations.",
  },
  // Biting/Stinging
  {
    id: "fad",
    term: "Flea Allergy Dermatitis (FAD)",
    definition:
      "An allergic reaction to flea saliva that causes intense, prolonged itching and skin irritation in sensitized pets and humans. Even a single flea bite can trigger severe FAD in sensitized animals.",
    fieldUse:
      "FAD clients need aggressive flea control — on pet, in environment, and outdoors. A sensitized pet will react to one bite long after the flea population is reduced.",
  },
  {
    id: "necrotic-venom",
    term: "Necrotic Venom",
    definition:
      "Venom that destroys tissue at and around the bite site, causing a spreading wound. Associated with brown recluse spider (Loxosceles reclusa) and some sac spiders.",
    fieldUse:
      "Brown recluse is common in central/southern US. If clients describe a progressively worsening wound, recommend medical evaluation — not just a callback.",
  },
  {
    id: "lyme-disease",
    term: "Lyme Disease",
    definition:
      "A bacterial infection (Borrelia burgdorferi) transmitted by the black-legged deer tick (Ixodes scapularis). Symptoms include bull's-eye rash, fatigue, joint pain. Most common vector-borne disease in the US.",
    fieldUse:
      "Tick programs in the northeast and midwest should focus on deer tick habitat. Know which tick vectors which disease for the ACE exam.",
  },
];

export const storedProductFlashcards: TrainingGlossaryTerm[] = [
  {
    id: "sp-internal-feeders",
    term: "Internal Feeders",
    definition: "Pests whose larvae develop within the kernel of a whole grain or seed.",
    fieldUse: "Key ID distinction — if you see round exit holes in whole kernels, suspect an internal feeder like rice weevil or Angoumois grain moth.",
  },
  {
    id: "sp-scavengers",
    term: "Scavengers",
    definition: "Stored product pests that only attack grains already processed or damaged by other insects.",
    fieldUse: "Sawtoothed grain beetle is a classic scavenger. Their presence often indicates a pre-existing infestation of a primary pest.",
  },
  {
    id: "sp-secondary-pests",
    term: "Secondary Pests",
    definition: "Pests that infest products that are moldy or already out of condition.",
    fieldUse: "Foreign grain beetle is a secondary pest attracted to mold. Finding them often points to a moisture or sanitation issue, not just a pest problem.",
  },
  {
    id: "sp-external-feeders",
    term: "External Feeders",
    definition: "Larvae develop outside kernels and can feed on both whole and processed grains.",
    fieldUse: "Indian meal moth and Mediterranean flour moth are external feeders. They spin silk webbing over their food substrate — look for webbing in flour, cereals, and pet food.",
  },
  {
    id: "sp-elytra",
    term: "Elytra",
    definition: "The hardened forewings of a beetle that protect the hind wings and abdomen.",
    fieldUse: "Elytra characteristics (striations, patterns, color markings) are primary ID features for stored product beetles — always examine under a hand lens.",
  },
  {
    id: "sp-striations",
    term: "Striations",
    definition: "Longitudinal lines or ridges found on the elytra of beetles.",
    fieldUse: "Drugstore beetle has distinct longitudinal grooves (striations); cigarette beetle does not. This is the fastest field ID to separate the two.",
  },
  {
    id: "sp-pronotum",
    term: "Pronotum",
    definition: "The section of the beetle's thorax immediately behind the head.",
    fieldUse: "Sawtoothed grain beetle has 6 saw-like projections on the pronotum — a definitive field ID character. Foreign grain beetle has notches in a square pronotum.",
  },
  {
    id: "sp-serrate-antennae",
    term: "Serrate Antennae",
    definition: "Antennae with a saw-toothed appearance. Example: Cigarette beetle antennae.",
    fieldUse: "Serrate antennae = cigarette beetle. Drugstore beetle has a 3-segmented club instead. Antenna type is a key separation character for these two common pests.",
  },
  {
    id: "sp-beadlike-antennae",
    term: "Beadlike (Moniliform) Antennae",
    definition: "Antennae with segments that resemble a string of beads.",
    fieldUse: "Found on confused flour beetle. Antenna shape helps distinguish flour beetles from other small brown beetles.",
  },
  {
    id: "sp-clubbed-antenna-types",
    term: "Gradual vs. Abrupt Clubbed Antennae",
    definition: "Gradual: segments increase in size slowly toward the tip. Abrupt: club forms suddenly from similarly sized segments.",
    fieldUse: "Red flour beetle has an abrupt 3-segmented club; confused flour beetle has a gradual 4-segmented club. This is the primary field separation between the two species.",
  },
  {
    id: "sp-hide-larder-habitat",
    term: "Hide & Larder Beetle Habitat",
    definition: "Hide and larder beetles feed on trophies or skins and are commonly found in museums.",
    fieldUse: "Museum pest management is a specialty account. Any account with taxidermy, hides, or mounted specimens is at risk. Dermestids can devastate irreplaceable collections.",
  },
  {
    id: "sp-plant-protein-products",
    term: "Plant Protein Stored Products",
    definition: "Dried vegetables, fruits, and nuts are examples of products containing plant proteins commonly infested by stored product pests.",
    fieldUse: "Expand inspections beyond grain bins and flour sacks. Bird seed, dried fruit, decorative gourds, and nut bowls are all common infestation sources missed in callbacks.",
  },
  {
    id: "sp-farinaceous",
    term: "Farinaceous Products",
    definition: "Products primarily composed of grains — flour, meal, starch-based foods.",
    fieldUse: "Mediterranean flour moth is the signature farinaceous pest in mills. Sawtoothed grain beetle and red/confused flour beetles follow closely in processed grain facilities.",
  },
  {
    id: "sp-dermestid-id",
    term: "Dermestid Beetles (Family Dermestidae)",
    definition: "Often identified by an oval shape, short clubbed antennae, and patterned scales. Includes warehouse beetle, khapra beetle, carpet beetles, and hide beetles.",
    fieldUse: "Dermestids are among the most destructive stored product pests and are also major museum and structural pests. Species ID within the family drives control strategy.",
  },
  {
    id: "sp-rice-weevil",
    term: "Rice Weevil (Sitophilus oryzae)",
    definition: "2–3 mm. Attracted to lights and capable of flight. Distinguished from granary weevil by lighter X-shaped markings on wing covers.",
    fieldUse: "Flight capability makes rice weevil a more mobile infestation risk than granary weevil. Look for X markings on elytra — your fastest field ID.",
  },
  {
    id: "sp-granary-weevil",
    term: "Granary Weevil (Sitophilus granarius)",
    definition: "Internal feeder on whole corn, wheat, barley, and rice. Cannot fly. Thoracic pits are oval and widely spaced (vs. round and closely spaced in rice weevil).",
    fieldUse: "Cannot fly, so infestations are more contained. Thoracic pit shape is the microscopic ID character separating it from rice weevil when the X marking isn't clear.",
  },
  {
    id: "sp-bean-weevil",
    term: "Bean/Pea Weevils (Family Bruchidae)",
    definition: "Lack the long proboscis (snout) of true weevils. Leave round exit holes on infested beans.",
    fieldUse: "Round exit holes in beans or peas = bruchid weevil. No snout distinguishes them from curculionid weevils. Common in imported dry beans and bird seed.",
  },
  {
    id: "sp-angoumois-grain-moth",
    term: "Angoumois Grain Moth (Sitotroga cerealella)",
    definition: "Internal feeder. Wingspan 13 mm, yellowish-white wings. Commonly infests barley, rye, corn, oats, and rice as whole grain crops.",
    fieldUse: "Only moth that is a true internal feeder on whole grains. Can be confused with clothes moths — check for the tuft of hair between the eyes on clothes moths (Angoumois lacks it).",
  },
  {
    id: "sp-drugstore-beetle",
    term: "Drugstore Beetle (Stegobium paniceum)",
    definition: "Distinguished from cigarette beetle by rows of longitudinal grooves on elytra. Antenna has a loose 3-segmented club.",
    fieldUse: "Will eat almost anything — including prescription drugs, books, and leather. Grooved elytra = drugstore. Smooth elytra = cigarette. Check antennae to confirm.",
  },
  {
    id: "sp-cigarette-beetle",
    term: "Cigarette Beetle (Lasioderma serricorne)",
    definition: "Serrate antennae (no club), smooth elytra with no longitudinal grooves. Life cycle 30–50 days.",
    fieldUse: "Common in tobacco, spices, dried herbs, and dried floral arrangements. Fast life cycle means populations build quickly. Smooth elytra + serrate antennae = cigarette.",
  },
  {
    id: "sp-trogoderma",
    term: "Trogoderma (Warehouse & Khapra Beetles)",
    definition: "Genus of Dermestids including warehouse beetle (Trogoderma variabile) and khapra beetle (T. granarium, a quarantine species). Brownish-black with mottled elytra patterns.",
    fieldUse: "Khapra beetle is a quarantine pest — report any suspected ID to state ag department. Warehouse beetle larvae have hastisetae (irritating hairs) and are persistent grain pests.",
  },
  {
    id: "sp-urogomphi",
    term: "Urogomphi",
    definition: "The two terminal horns found on the larva of hide beetles (Dermestes spp.).",
    fieldUse: "Urogomphi are a definitive larval ID character for hide beetles. A 12 mm, hairy larva with two small hooks at the tail end = hide beetle.",
  },
  {
    id: "sp-hastisetae",
    term: "Hastisetae",
    definition: "Specialized, irritating hairs found on the larvae of Trogoderma and Anthrenus species. Can cause gastrointestinal irritation if consumed.",
    fieldUse: "Hastisetae in food products is a health risk. Any confirmed dermestid larval contamination of a food product warrants removal and disposal, not just treatment.",
  },
  {
    id: "sp-varied-carpet-beetle",
    term: "Varied Carpet Beetle (Anthrenus verbasci)",
    definition: "Small (3 mm) and covered with colorful scales. Larvae feed on animal protein products.",
    fieldUse: "Feeds on wool, silk, feathers, dried insects, and animal-based food products. Scales are diagnostic — look for small round beetles with a mottled pattern of white, brown, and yellow scales.",
  },
  {
    id: "sp-indian-meal-moth",
    term: "Indian Meal Moth (Plodia interpunctella)",
    definition: "Reddish copper color on outer 1/3 to 1/2 of front wings. Wingspan 18 mm. Larvae feed on candy, dried peppers, pet food, and cereals. Silk webbing is a key sign.",
    fieldUse: "Most common stored product moth in retail and household accounts. Silk webbing in cereals or pet food = IMM first. Pheromone traps are essential for monitoring.",
  },
  {
    id: "sp-mediterranean-flour-moth",
    term: "Mediterranean Flour Moth (Ephestia kuehniella)",
    definition: "Larger than IMM (25 mm wingspan). Pale gray forewings with transverse black wavy bars and dirty white hind wings. External feeder and silk spinner. Nocturnal and attracted to lights.",
    fieldUse: "Signature pest of flour mills. The silk webbing clogs milling machinery. Nocturnal habit means UV light traps are especially useful for monitoring in mills.",
  },
  {
    id: "sp-sawtoothed-grain-beetle",
    term: "Sawtoothed Grain Beetle",
    definition: "Named for 6 saw-like projections on each side of the thorax. Cannot fly. Scavenger — infests processed and damaged grain products.",
    fieldUse: "Cannot fly, so infestations spread through product movement. Sawtoothed projections on thorax are unmistakable with a hand lens. Common in grocery store and warehouse accounts.",
  },
  {
    id: "sp-red-confused-flour-beetle",
    term: "Red vs. Confused Flour Beetle",
    definition: "Red flour beetle (Tribolium castaneum): more common in south, CAN fly, abrupt 3-segmented club. Confused flour beetle (T. confusum): cannot fly, gradual 4-segmented club.",
    fieldUse: "Flight capability matters for spread risk. Both produce quinones that cause off-flavor in infested grain. Antenna club segments (3 abrupt vs. 4 gradual) is the definitive ID character.",
  },
  {
    id: "sp-flour-vs-lyctid-eyes",
    term: "Flour Beetle vs. Lyctid Powderpost Beetle Eye Comparison",
    definition: "Flour beetles have wrap-around eyes; Lyctid powderpost beetles have globular eyes. Tarsal formula: flour beetle = 5-5-4; Lyctid = 4-4-4.",
    fieldUse: "Wrap-around vs. globular eyes and tarsal formula are microscopic characters needed to separate stored product beetles from wood-boring beetles — important for correct diagnosis and treatment.",
  },
  {
    id: "sp-spider-beetles",
    term: "Spider Beetles (Subfamily Ptininae)",
    definition: "Characterized by a spider-like appearance and tolerance for extreme desiccation. Scavengers of grains, nuts, animal skins, and rodent excrement.",
    fieldUse: "Often found in rodent and bird nests. Presence of spider beetles in a structure can indicate an active rodent or bird nest problem nearby — inspect for both.",
  },
  {
    id: "sp-mealworms",
    term: "Mealworms (Tenebrio spp.)",
    definition: "Larvae used as fish bait and pet food. Life cycle over 365 days — the longest of common stored product pests.",
    fieldUse: "Very long life cycle means control can take months. Found in grain bins, animal feed, and poultry operations. Dark mealworm larvae are darker in color than yellow mealworm larvae.",
  },
  {
    id: "sp-foreign-grain-beetle",
    term: "Foreign Grain Beetle (Ahasverus advena)",
    definition: "Tiny (2 mm), reddish-brown. Secondary pest that feeds on molds and mildews. Often found in new construction due to mold in green lumber. Notches in square pronotum.",
    fieldUse: "Common in new housing — clients mistake it for a primary grain pest. The real issue is mold in green lumber or wet drywall. Fix the moisture source; the beetles will disappear.",
  },
  {
    id: "sp-heat-treatment",
    term: "Heat Treatment for Stored Products",
    definition: "120°F for 60 minutes kills all insect life stages in stored products.",
    fieldUse: "Heat is a chemical-free option for treating food products. Must maintain 120°F throughout the product mass — not just the air temperature. Works well for grain bins and empty facilities.",
  },
  {
    id: "sp-cold-treatment",
    term: "Cold Treatment for Stored Products",
    definition: "-4°F for 7–14 days kills the hardiest pest life stages in stored products.",
    fieldUse: "Small infested items (bird seed, decorative gourds, spice containers) can be bagged and frozen. 7 days minimum; 14 days for certainty. Rapid temperature drop is most effective.",
  },
  {
    id: "sp-pheromone-traps",
    term: "Pheromone Traps in Stored Product Pest Management",
    definition: "Attract males to traps to identify infestation levels. Primary monitoring tool — not a standalone control.",
    fieldUse: "Place pheromone traps at regular intervals in warehouses and retail. High trap counts point to the infestation source. Traps confirm species ID and measure population trends over time.",
  },
  {
    id: "sp-four-control-elements",
    term: "Four Key Elements of Stored Product Pest Control",
    definition: "Education, Inspection, Sanitation, and Physical/Chemical control.",
    fieldUse: "The ACE exam expects you to prioritize in order — education and inspection first, then sanitation, then control. Skipping inspection or sanitation and going straight to chemicals is wrong answer territory.",
  },
  {
    id: "sp-stock-rotation",
    term: "Stock Rotation (FIFO)",
    definition: "Rotation of goods ensures older stock is used first, preventing long-term infestation development.",
    fieldUse: "First-in, first-out (FIFO) is the standard recommendation for any food storage account. Inspectors should verify stock rotation compliance — products sitting for 6+ months are high risk.",
  },
  {
    id: "sp-unusual-infestation-sources",
    term: "Unusual Stored Product Pest Infestation Sources",
    definition: "Organic fertilizers, old rodent baits, and bird nests are three unusual places to check beyond the pantry.",
    fieldUse: "Callbacks with no apparent food source should trigger an expanded inspection. Old rodent bait blocks and bird nests in attics or vents are frequently overlooked infestation sources.",
  },
  {
    id: "sp-clothes-vs-angoumois-moth",
    term: "Clothes Moth vs. Angoumois Grain Moth",
    definition: "Clothes moths are smaller and have a tuft of hair between the eyes. Angoumois grain moth lacks this tuft.",
    fieldUse: "Both are small, golden/yellowish moths easily confused in the field. Hair tuft between eyes = clothes moth = wool/fiber pest. No tuft = Angoumois = whole grain internal feeder.",
  },
  {
    id: "sp-weevil-proboscis",
    term: "Proboscis (Weevil Snout)",
    definition: "The elongated snout of weevils (Curculionidae) used to bore into grain kernels for feeding and egg laying.",
    fieldUse: "Long proboscis = true weevil (Curculionidae). Short or absent snout = bruchid (bean/pea weevils). The snout length is your fastest family-level field ID for weevils.",
  },
  {
    id: "sp-exclusion",
    term: "Exclusion in Stored Product Pest Management",
    definition: "Sealing entry points to prevent pests from entering a facility.",
    fieldUse: "Door sweeps, loading dock seals, and proper container storage with tight-fitting lids are all exclusion strategies. Essential in food processing facilities to prevent re-infestation.",
  },
  {
    id: "sp-lamellate-antennae",
    term: "Lamellate Antennae",
    definition: "Antennae characterized by plate-like segments stacked together, like a fan. Common in scarab beetles.",
    fieldUse: "Lamellate antennae are found on scarab beetles — not typical stored product pests, but the ACE exam tests antenna types across orders.",
  },
  {
    id: "sp-pectinate-antennae",
    term: "Pectinate Antennae",
    definition: "Antennae with long, thin processes on one or both sides, resembling a comb.",
    fieldUse: "Comb-like antenna = pectinate. Found in some cerambycid beetles. The ACE exam expects you to distinguish pectinate from serrate (cigarette beetle) and lamellate (scarabs).",
  },
  {
    id: "sp-sanitation-warehouses",
    term: "Sanitation in Stored Product Control",
    definition: "Cleaning up spilled food products to eliminate breeding sites. Core element of any warehouse or food facility pest management program.",
    fieldUse: "Sanitation is the most important non-chemical control. Vacuum-cleaning cracks and crevices in grain storage areas, removing old product residue, and fixing leaks eliminates the harborage that makes chemical treatments last.",
  },
];
