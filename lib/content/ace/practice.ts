/**
 * ACE practice exam questions, one chapter per study module (ace-1 … ace-11).
 *
 * Ported verbatim from the owner's standalone ACE Prep app (github.com/Turkokami/ACEPrepApp,
 * src/app/). If questions change in the standalone app, copy them here too — the two don't sync.
 */

export type PracticeExamQuestion = {
  id: string;
  prompt: string;
  options: Array<{
    id: "a" | "b" | "c";
    text: string;
  }>;
  correctOptionId: "a" | "b" | "c";
  answerText: string;
};

export type PracticeExamChapter = {
  id: string;
  title: string;
  questionCount: number;
  questions: PracticeExamQuestion[];
};


export const acePracticeExamChapters: PracticeExamChapter[] = [
  {
    id: "ace-1",
    title: "Module 1. Insect Biology & Morphology",
    questionCount: 5,
    questions: [
      {
        id: "ace-1-q1",
        prompt: "How many pairs of legs does an adult insect have?",
        options: [
          { id: "a", text: "2 pairs (4 legs)" },
          { id: "b", text: "3 pairs (6 legs)" },
          { id: "c", text: "4 pairs (8 legs)" },
        ],
        correctOptionId: "b",
        answerText: "3 pairs (6 legs). This is one of the defining characteristics of insects (class Insecta).",
      },
      {
        id: "ace-1-q2",
        prompt: "Which type of metamorphosis is correct for fleas?",
        options: [
          { id: "a", text: "Gradual metamorphosis — egg, nymph, adult" },
          { id: "b", text: "Complete metamorphosis — egg, larva, pupa, adult" },
          { id: "c", text: "No metamorphosis — juveniles look identical to adults" },
        ],
        correctOptionId: "b",
        answerText: "Complete metamorphosis (egg, larva, pupa, adult). Fleas are in Order Siphonaptera, which undergoes complete metamorphosis.",
      },
      {
        id: "ace-1-q3",
        prompt: "Diatomaceous earth kills insects primarily by",
        options: [
          { id: "a", text: "disrupting the insect's nervous system." },
          { id: "b", text: "absorbing or abrading the waxy cuticle and causing desiccation." },
          { id: "c", text: "blocking the insect's digestive enzymes." },
        ],
        correctOptionId: "b",
        answerText: "Absorbing/abrading the waxy cuticle. Desiccants kill through a physical mode of action — disrupting water balance by damaging the exoskeleton.",
      },
      {
        id: "ace-1-q4",
        prompt: "Which insect order contains cockroaches?",
        options: [
          { id: "a", text: "Orthoptera" },
          { id: "b", text: "Isoptera" },
          { id: "c", text: "Blattodea" },
        ],
        correctOptionId: "c",
        answerText: "Blattodea. Termites are Isoptera; grasshoppers and crickets are Orthoptera.",
      },
      {
        id: "ace-1-q5",
        prompt: "An insect with piercing-sucking mouthparts is found on a plant with chewed leaf margins. Which statement is most accurate?",
        options: [
          { id: "a", text: "The insect with piercing-sucking mouthparts is responsible for the chewing damage." },
          { id: "b", text: "The insect with piercing-sucking mouthparts cannot cause chewing damage — a different pest is responsible." },
          { id: "c", text: "Piercing-sucking insects can switch between feeding modes depending on season." },
        ],
        correctOptionId: "b",
        answerText: "The insect with piercing-sucking mouthparts cannot cause chewing damage. Mouthpart type determines damage type — chewing damage requires chewing mouthparts.",
      },
    ],
  },
  {
    id: "ace-2",
    title: "Module 2. IPM Principles",
    questionCount: 5,
    questions: [
      {
        id: "ace-2-q1",
        prompt: "An action threshold in IPM is best defined as",
        options: [
          { id: "a", text: "the point at which zero pests are allowed in a facility." },
          { id: "b", text: "the pest level at which control action becomes necessary." },
          { id: "c", text: "the number of pesticide applications per year allowed by law." },
        ],
        correctOptionId: "b",
        answerText: "The pest level at which control action becomes necessary. Thresholds vary by pest and setting and do not mean zero tolerance.",
      },
      {
        id: "ace-2-q2",
        prompt: "In the IPM control hierarchy (pyramid), which tactic should be used MOST frequently?",
        options: [
          { id: "a", text: "Chemical control" },
          { id: "b", text: "Biological control" },
          { id: "c", text: "Pest prevention and cultural controls (sanitation, exclusion, pest-proofing)" },
        ],
        correctOptionId: "c",
        answerText: "Prevention and cultural controls. Chemical control sits at the top of the pyramid — the smallest section — meaning it should be used least, not most.",
      },
      {
        id: "ace-2-q3",
        prompt: "Which agency primarily regulates pesticide applications in food handling facilities?",
        options: [
          { id: "a", text: "OSHA" },
          { id: "b", text: "EPA and FDA/USDA" },
          { id: "c", text: "Department of Labor" },
        ],
        correctOptionId: "b",
        answerText: "EPA and FDA/USDA. EPA registers pesticides; FDA and USDA regulate their use in food handling facilities. OSHA governs worker safety.",
      },
      {
        id: "ace-2-q4",
        prompt: "Which of the following is a monitoring tool that detects pests by scent?",
        options: [
          { id: "a", text: "Sticky traps" },
          { id: "b", text: "Pheromone traps" },
          { id: "c", text: "Boroscope" },
        ],
        correctOptionId: "b",
        answerText: "Pheromone traps. These use insect-produced chemical signals (sex or aggregation pheromones) to attract and trap target pests.",
      },
      {
        id: "ace-2-q5",
        prompt: "The IPM 'pest triangle' concept means that removing which of the following will reduce a pest problem?",
        options: [
          { id: "a", text: "Any one of the three sides: pest, host/food source, or environment" },
          { id: "b", text: "Only the pest — host and environment cannot be changed" },
          { id: "c", text: "Only the environment — pests adapt to any change in host" },
        ],
        correctOptionId: "a",
        answerText: "Any one of the three sides. Reducing any pest requisite — food, water, shelter, or the pest population itself — reduces the problem.",
      },
    ],
  },
  {
    id: "ace-3",
    title: "Module 3. IPM Tools & Practice",
    questionCount: 6,
    questions: [
      {
        id: "ace-3-q1",
        prompt: "Which pesticide formulation is LEAST likely to provide effective residual on brick or concrete?",
        options: [
          { id: "a", text: "Emulsifiable concentrate (EC)" },
          { id: "b", text: "Microencapsulated (CS)" },
          { id: "c", text: "Wettable powder (WP)" },
        ],
        correctOptionId: "a",
        answerText: "Emulsifiable concentrate (EC). ECs are more likely to penetrate porous surfaces and become unavailable to pests, reducing residual effectiveness.",
      },
      {
        id: "ace-3-q2",
        prompt: "A cockroach account has a long history of pyrethroid use with declining efficacy. Which insecticide would be the best rotation choice?",
        options: [
          { id: "a", text: "Cypermethrin" },
          { id: "b", text: "Chlorfenapyr (Phantom)" },
          { id: "c", text: "Esfenvalerate" },
        ],
        correctOptionId: "b",
        answerText: "Chlorfenapyr (Phantom). It is a pyrrole — a completely different chemical class and mode of action from pyrethroids, making it the correct resistance rotation choice.",
      },
      {
        id: "ace-3-q3",
        prompt: "Which insecticide class works by irreversibly inhibiting cholinesterase?",
        options: [
          { id: "a", text: "Carbamates" },
          { id: "b", text: "Organophosphates" },
          { id: "c", text: "Pyrethroids" },
        ],
        correctOptionId: "b",
        answerText: "Organophosphates. Carbamates also inhibit cholinesterase but do so reversibly — this reversibility is considered a relative safety improvement over OPs.",
      },
      {
        id: "ace-3-q4",
        prompt: "Resistance to insecticides is most likely to develop when",
        options: [
          { id: "a", text: "only a small portion of the pest population is exposed to the pesticide." },
          { id: "b", text: "the pest has a high reproductive rate and most of the population is exposed." },
          { id: "c", text: "the pesticide is rotated between multiple chemical classes." },
        ],
        correctOptionId: "b",
        answerText: "High reproductive rate + most of the population exposed. These conditions accelerate natural selection for resistant individuals.",
      },
      {
        id: "ace-3-q5",
        prompt: "Crack and crevice applications are defined as",
        options: [
          { id: "a", text: "applications to broad surface areas such as walls or floors." },
          { id: "b", text: "application of small amounts of pesticide into inaccessible cracks, crevices, or voids." },
          { id: "c", text: "any application not to exceed 2 square feet." },
        ],
        correctOptionId: "b",
        answerText: "Application into inaccessible cracks, crevices, or voids. Spot applications (not to exceed 2 sq ft) are a separate, distinct application type.",
      },
      {
        id: "ace-3-q6",
        prompt: "Microencapsulated insecticides have which of the following advantages over emulsifiable concentrates?",
        options: [
          { id: "a", text: "Lower cost and no agitation required" },
          { id: "b", text: "Improved residual and lower exposure risk due to slow-release capsules" },
          { id: "c", text: "No visible residue and fast knockdown" },
        ],
        correctOptionId: "b",
        answerText: "Improved residual and lower exposure risk. The polymer capsules slow release of the AI, extending residual and reducing direct contact exposure.",
      },
    ],
  },
  {
    id: "ace-4",
    title: "Module 4. Toxicology, Safety & Laws",
    questionCount: 5,
    questions: [
      {
        id: "ace-4-q1",
        prompt: "LD50 measures",
        options: [
          { id: "a", text: "the amount of material needed to kill half of a test population (mg/kg body weight)." },
          { id: "b", text: "the lethal concentration of a pesticide in air that kills 50% of test animals." },
          { id: "c", text: "the maximum safe exposure limit for pesticide applicators." },
        ],
        correctOptionId: "a",
        answerText: "The amount (mg/kg) needed to kill half the test population. Lower LD50 = more acutely toxic.",
      },
      {
        id: "ace-4-q2",
        prompt: "The signal word DANGER-POISON on a pesticide label indicates",
        options: [
          { id: "a", text: "the pesticide is in EPA Toxicity Class II (moderately toxic)." },
          { id: "b", text: "the pesticide is in EPA Toxicity Class I (most acutely toxic)." },
          { id: "c", text: "the pesticide has been banned for residential use." },
        ],
        correctOptionId: "b",
        answerText: "Class I — most acutely toxic. WARNING = Class II; CAUTION = Classes III and IV (least toxic).",
      },
      {
        id: "ace-4-q3",
        prompt: "Pesticide hazard is best reduced by",
        options: [
          { id: "a", text: "only applying pesticides outdoors." },
          { id: "b", text: "reducing either the toxicity of the product selected or reducing exposure to the applicator and environment." },
          { id: "c", text: "using only natural or organic-certified pesticides." },
        ],
        correctOptionId: "b",
        answerText: "Reducing toxicity or reducing exposure. Hazard = Toxicity × Exposure — either variable can be reduced.",
      },
      {
        id: "ace-4-q4",
        prompt: "FIFRA stands for",
        options: [
          { id: "a", text: "Federal Insecticide, Fungicide, and Rodenticide Act." },
          { id: "b", text: "Field Inspection and Farm Registration Act." },
          { id: "c", text: "Federal Integrated Farming and Rodent Act." },
        ],
        correctOptionId: "a",
        answerText: "Federal Insecticide, Fungicide, and Rodenticide Act. This is the primary US federal pesticide law, administered by the EPA.",
      },
      {
        id: "ace-4-q5",
        prompt: "Which chronic toxicity effect involves harm to developing fetuses?",
        options: [
          { id: "a", text: "Carcinogenicity" },
          { id: "b", text: "Teratogenicity" },
          { id: "c", text: "Oncogenicity" },
        ],
        correctOptionId: "b",
        answerText: "Teratogenicity. Carcinogenicity = cancer; oncogenicity = tumors; teratogenicity = birth defects from fetal exposure.",
      },
    ],
  },
  {
    id: "ace-5",
    title: "Module 5. Cockroaches",
    questionCount: 5,
    questions: [
      {
        id: "ace-5-q1",
        prompt: "Which cockroach is most likely to be found infesting a sewer system?",
        options: [
          { id: "a", text: "German cockroach" },
          { id: "b", text: "Brown-banded cockroach" },
          { id: "c", text: "Oriental or American cockroach" },
        ],
        correctOptionId: "c",
        answerText: "Oriental or American cockroach. Both are associated with cool, damp environments and sewers. German and brown-banded cockroaches prefer warm, dry indoor spaces.",
      },
      {
        id: "ace-5-q2",
        prompt: "Which cockroach ootheca is likely to have 15–20 segments and produce 30–40 eggs?",
        options: [
          { id: "a", text: "German cockroach" },
          { id: "b", text: "Smoky-brown cockroach" },
          { id: "c", text: "Oriental cockroach" },
        ],
        correctOptionId: "a",
        answerText: "German cockroach. Its ootheca has 15–20 segments and produces 30–40 eggs — the highest reproductive rate of common pest cockroaches.",
      },
      {
        id: "ace-5-q3",
        prompt: "A technician finds cockroaches throughout an entire apartment — in bedrooms, living room, and kitchen. Which species is the most likely culprit?",
        options: [
          { id: "a", text: "German cockroach" },
          { id: "b", text: "Brown-banded cockroach" },
          { id: "c", text: "Oriental cockroach" },
        ],
        correctOptionId: "b",
        answerText: "Brown-banded cockroach. Unlike German cockroaches (kitchen/bathroom focused), brown-banded cockroaches distribute throughout the entire structure.",
      },
      {
        id: "ace-5-q4",
        prompt: "Cockroach allergens are a well-documented trigger for which medical condition?",
        options: [
          { id: "a", text: "Bubonic plague" },
          { id: "b", text: "Asthma — especially in urban children" },
          { id: "c", text: "Lyme disease" },
        ],
        correctOptionId: "b",
        answerText: "Asthma. Cockroach allergens (proteins in frass, shed skins, saliva) are a leading asthma trigger among inner-city youth.",
      },
      {
        id: "ace-5-q5",
        prompt: "Early-instar German cockroach nymphs differ from later instars in that they",
        options: [
          { id: "a", text: "are found throughout the structure, not near crevices." },
          { id: "b", text: "remain close to crevices and feed on the feces of older cockroaches (coprophagy)." },
          { id: "c", text: "are resistant to all currently available baits." },
        ],
        correctOptionId: "b",
        answerText: "Remain close to crevices and feed on older cockroach feces (coprophagy). This behavior means fresh bait placements near feces face competition in early infestations.",
      },
    ],
  },
  {
    id: "ace-6",
    title: "Module 6. Ants",
    questionCount: 5,
    questions: [
      {
        id: "ace-6-q1",
        prompt: "Why does treating a pharaoh ant infestation with a repellent insecticide spray often make the problem worse?",
        options: [
          { id: "a", text: "Sprays are not effective against any ant species." },
          { id: "b", text: "Repellent sprays cause pharaoh ant colonies to bud — fragmenting into multiple new colonies that spread throughout the structure." },
          { id: "c", text: "Pharaoh ants are resistant to all registered insecticides." },
        ],
        correctOptionId: "b",
        answerText: "Budding. Pharaoh ants respond to stress by fragmenting colonies — repellent sprays trigger this response, creating more colonies. Baiting is the only appropriate control method.",
      },
      {
        id: "ace-6-q2",
        prompt: "Carpenter ant frass is distinguished from termite frass by",
        options: [
          { id: "a", text: "its bright white color and fine powder consistency." },
          { id: "b", text: "the presence of insect fragments, pupal cases, and sawdust." },
          { id: "c", text: "the presence of hard, hexagonal pellets." },
        ],
        correctOptionId: "b",
        answerText: "Insect fragments, pupal cases, and sawdust. Termite frass does not contain these. Hexagonal pellets are characteristic of drywood termites.",
      },
      {
        id: "ace-6-q3",
        prompt: "Which anatomical feature most reliably distinguishes an ant from a termite swarmer?",
        options: [
          { id: "a", text: "Ants have a constricted waist (petiole) and elbowed antennae; termites have a broad waist and straight antennae." },
          { id: "b", text: "Ants have wings; termites do not." },
          { id: "c", text: "Ants have 8 legs; termites have 6 legs." },
        ],
        correctOptionId: "a",
        answerText: "Ants have a distinct waist (petiole) and elbowed antennae; termite swarmers have no waist constriction and straight antennae. Both have 6 legs.",
      },
      {
        id: "ace-6-q4",
        prompt: "Which ant species requires identification of workers rather than queens for accurate species ID?",
        options: [
          { id: "a", text: "Only fire ants" },
          { id: "b", text: "Most ant species — worker morphology contains the key ID characters" },
          { id: "c", text: "Only pharaoh ants" },
        ],
        correctOptionId: "b",
        answerText: "Most ant species. Queens and males often look similar across species. Workers carry the diagnostic characters (node number, antennal club, polymorphism) needed for ID.",
      },
      {
        id: "ace-6-q5",
        prompt: "An odorous house ant infestation that keeps returning despite repeated treatments is most likely explained by",
        options: [
          { id: "a", text: "insecticide resistance in the colony." },
          { id: "b", text: "polygynous colonies with multiple queens and satellite nests inside the structure." },
          { id: "c", text: "the ants are repelled by the insecticide to a nearby location, then return." },
        ],
        correctOptionId: "b",
        answerText: "Multiple queens and satellite nests. Odorous house ants (Tapinoma sessile) have polygynous colonies with multiple queens and extensive satellite nesting — eliminating one visible nest rarely eliminates the colony.",
      },
    ],
  },
  {
    id: "ace-7",
    title: "Module 7. Flies",
    questionCount: 5,
    questions: [
      {
        id: "ace-7-q1",
        prompt: "Which life stage of a carrion-feeding blow fly is most likely to be noticed by a client?",
        options: [
          { id: "a", text: "Early (1st instar) larva" },
          { id: "b", text: "Late (3rd instar) larva during its wandering phase" },
          { id: "c", text: "Adult fly" },
        ],
        correctOptionId: "b",
        answerText: "Late larva (3rd instar). Before pupation, blow fly larvae enter a wandering phase that brings them away from the carcass and into visible areas of the structure.",
      },
      {
        id: "ace-7-q2",
        prompt: "Employees in a downtown office building with potted plants are complaining about small gnats. The most likely culprit is",
        options: [
          { id: "a", text: "fruit flies (Drosophila)" },
          { id: "b", text: "phorid flies" },
          { id: "c", text: "fungus gnats" },
        ],
        correctOptionId: "c",
        answerText: "Fungus gnats. These are the most common small fly complaint in office environments with potted plants, where they breed in moist potting soil.",
      },
      {
        id: "ace-7-q3",
        prompt: "A client describes a fly that looks identical to a house fly but bites. The most likely species is",
        options: [
          { id: "a", text: "cluster fly" },
          { id: "b", text: "stable fly" },
          { id: "c", text: "blow fly" },
        ],
        correctOptionId: "b",
        answerText: "Stable fly. The stable fly is visually similar to a house fly but has piercing-sucking mouthparts — if it looks like a house fly but bites, it's a stable fly.",
      },
      {
        id: "ace-7-q4",
        prompt: "Cluster flies (Pollenia rudis) differ from house flies in that they",
        options: [
          { id: "a", text: "breed in manure and garbage." },
          { id: "b", text: "are outdoor parasites of earthworms that enter structures to overwinter." },
          { id: "c", text: "transmit more than 100 pathogens." },
        ],
        correctOptionId: "b",
        answerText: "Outdoor parasites of earthworms that overwinter in structures. Cluster flies do not breed indoors or in filth.",
      },
      {
        id: "ace-7-q5",
        prompt: "The most effective long-term control for small flies (fruit flies, drain flies, phorid flies) is",
        options: [
          { id: "a", text: "space sprays applied twice weekly to flying adults." },
          { id: "b", text: "locating and eliminating the organic breeding source." },
          { id: "c", text: "installing UV light traps above all drains." },
        ],
        correctOptionId: "b",
        answerText: "Eliminating the breeding source. Without source elimination, small fly populations regenerate continuously regardless of adult kill.",
      },
    ],
  },
  {
    id: "ace-8",
    title: "Module 8. Biting & Stinging Arthropods",
    questionCount: 6,
    questions: [
      {
        id: "ace-8-q1",
        prompt: "Which statement about bed bugs is FALSE?",
        options: [
          { id: "a", text: "Heavy infestations may have a noticeable sweetish odor." },
          { id: "b", text: "Bed bugs hide principally in beds and are rarely found elsewhere." },
          { id: "c", text: "The bite is painless at the time of feeding." },
        ],
        correctOptionId: "b",
        answerText: "FALSE — bed bugs hide throughout the room in any crack or crevice, not only in beds. This is a critical and frequently tested misconception.",
      },
      {
        id: "ace-8-q2",
        prompt: "A flea larva differs from an adult flea in that the larva",
        options: [
          { id: "a", text: "lives on the host animal and feeds on blood." },
          { id: "b", text: "lives in the environment and feeds on organic debris including adult flea feces." },
          { id: "c", text: "is wingless and laterally flattened." },
        ],
        correctOptionId: "b",
        answerText: "Lives in the environment feeding on organic debris including dried blood from adult flea feces. Only adult fleas live on the host.",
      },
      {
        id: "ace-8-q3",
        prompt: "Which spider is most associated with neurotoxic venom in the United States?",
        options: [
          { id: "a", text: "Brown recluse (Loxosceles reclusa)" },
          { id: "b", text: "Black widow (Latrodectus sp.)" },
          { id: "c", text: "Hobo spider (Eratigena agrestis)" },
        ],
        correctOptionId: "b",
        answerText: "Black widow. It produces neurotoxic venom. Brown recluse produces necrotic venom. Hobo spider is not currently considered a medically significant species.",
      },
      {
        id: "ace-8-q4",
        prompt: "Which tick is the primary vector of Lyme disease in the eastern United States?",
        options: [
          { id: "a", text: "American dog tick (Dermacentor variabilis)" },
          { id: "b", text: "Brown dog tick (Rhipicephalus sanguineus)" },
          { id: "c", text: "Black-legged deer tick (Ixodes scapularis)" },
        ],
        correctOptionId: "c",
        answerText: "Black-legged deer tick (Ixodes scapularis). American dog tick vectors Rocky Mountain spotted fever; lone star tick vectors tularemia.",
      },
      {
        id: "ace-8-q5",
        prompt: "Failing to remove a honey bee nest from a wall void can lead to",
        options: [
          { id: "a", text: "the bees becoming permanently docile and non-defensive." },
          { id: "b", text: "comb melt, honey fermentation, structural staining, and secondary infestations of cockroaches, carpet beetles, and rodents." },
          { id: "c", text: "bees dying off within a few weeks once the colony is treated." },
        ],
        correctOptionId: "b",
        answerText: "Comb melt and secondary infestations. Dead comb releases wax and honey, creating odors, structural damage, and drawing secondary pests — including cockroaches, carpet beetles, wax moths, and rodents.",
      },
      {
        id: "ace-8-q6",
        prompt: "Scorpions can be detected at night using",
        options: [
          { id: "a", text: "pheromone traps" },
          { id: "b", text: "UV/black light — scorpions fluoresce under ultraviolet" },
          { id: "c", text: "CO2 monitors" },
        ],
        correctOptionId: "b",
        answerText: "UV/black light. Scorpions fluoresce brightly under ultraviolet light — this is a practical field detection technique.",
      },
    ],
  },
  {
    id: "ace-9",
    title: "Module 9. Occasional Invaders",
    questionCount: 4,
    questions: [
      {
        id: "ace-9-q1",
        prompt: "When are multicolored Asian lady beetles (MALB) most likely to become structural pests?",
        options: [
          { id: "a", text: "During hot dry spells in summer" },
          { id: "b", text: "After the first cold spell in fall, when they begin congregating on buildings" },
          { id: "c", text: "During early spring mating season" },
        ],
        correctOptionId: "b",
        answerText: "After the first cold spell in fall. MALB aggregate on south/west-facing walls seeking warmth before overwintering — this is a key ACE-tested fact.",
      },
      {
        id: "ace-9-q2",
        prompt: "Seed-feeding hemipterans sometimes enter homes in large numbers because they are attracted to",
        options: [
          { id: "a", text: "food sources stored inside the structure." },
          { id: "b", text: "lighted buildings at night." },
          { id: "c", text: "the warmth of interior spaces." },
        ],
        correctOptionId: "b",
        answerText: "Lights. Seed-feeding hemipterans (like the western conifer seed bug) are attracted to lights at night, which can draw them to illuminated structures.",
      },
      {
        id: "ace-9-q3",
        prompt: "The primary control strategy for occasional invaders is",
        options: [
          { id: "a", text: "broadcast indoor insecticide application." },
          { id: "b", text: "exclusion — sealing entry points before the pest's seasonal migration." },
          { id: "c", text: "baiting with attractants placed in living areas." },
        ],
        correctOptionId: "b",
        answerText: "Exclusion before seasonal migration. Since occasional invaders don't breed indoors, keeping them out is far more effective than treating after they've entered.",
      },
      {
        id: "ace-9-q4",
        prompt: "Millipedes in and around a structure are most effectively controlled by",
        options: [
          { id: "a", text: "applying an indoor broadcast insecticide." },
          { id: "b", text: "reducing moisture and removing leaf litter and decaying organic debris around the structure." },
          { id: "c", text: "installing light traps in the basement." },
        ],
        correctOptionId: "b",
        answerText: "Moisture reduction and organic debris removal. Millipedes require moisture and feed on decaying plant material — eliminating these conditions eliminates the millipede habitat.",
      },
    ],
  },
  {
    id: "ace-10",
    title: "Module 10. Stored Product Pests",
    questionCount: 5,
    questions: [
      {
        id: "ace-10-q1",
        prompt: "Which is true of Indian meal moth but NOT of Angoumois grain moth?",
        options: [
          { id: "a", text: "It has complete metamorphosis." },
          { id: "b", text: "It is a primary pest that feeds internally in whole grain." },
          { id: "c", text: "It is a secondary pest with silk webbing associated with infested food." },
        ],
        correctOptionId: "c",
        answerText: "Indian meal moth is a secondary pest with silk associated with infested food. Angoumois grain moth is a primary pest that feeds internally — no silk is visible externally.",
      },
      {
        id: "ace-10-q2",
        prompt: "Which stored product beetle larvae are approximately ½ inch long, banded in appearance, hairy, and have two small hooks at the end of the abdomen?",
        options: [
          { id: "a", text: "Hide beetle (Dermestes sp.)" },
          { id: "b", text: "Confused flour beetle (Tribolium confusum)" },
          { id: "c", text: "Cigarette beetle (Lasioderma serricorne)" },
        ],
        correctOptionId: "a",
        answerText: "Hide beetle (Dermestes sp.). The hairy, banded larva with two tail hooks is a diagnostic character for hide/dermestid beetle larvae.",
      },
      {
        id: "ace-10-q3",
        prompt: "What type of metamorphosis do all beetles (Order Coleoptera) have?",
        options: [
          { id: "a", text: "Gradual metamorphosis" },
          { id: "b", text: "No metamorphosis" },
          { id: "c", text: "Complete metamorphosis" },
        ],
        correctOptionId: "c",
        answerText: "Complete metamorphosis. All beetles undergo egg → larva → pupa → adult development.",
      },
      {
        id: "ace-10-q4",
        prompt: "Heat treatment for stored product pests in individual food packages requires",
        options: [
          { id: "a", text: "120°F for 60–90 minutes." },
          { id: "b", text: "200°F for 10 minutes." },
          { id: "c", text: "98°F for 24 hours." },
        ],
        correctOptionId: "a",
        answerText: "120°F for 60–90 minutes. This temperature held for that duration kills all life stages of stored product pests.",
      },
      {
        id: "ace-10-q5",
        prompt: "The FIRST step in controlling a stored product pest infestation is",
        options: [
          { id: "a", text: "applying a residual insecticide to all cabinet surfaces." },
          { id: "b", text: "locating and disposing of all infested material." },
          { id: "c", text: "installing pheromone traps throughout the facility." },
        ],
        correctOptionId: "b",
        answerText: "Locating and disposing of all infested material. Without source removal, populations regenerate from the source regardless of other treatments.",
      },
    ],
  },
  {
    id: "ace-11",
    title: "Module 11. Wood Destroying Insects",
    questionCount: 6,
    questions: [
      {
        id: "ace-11-q1",
        prompt: "Termites digest cellulose with the help of",
        options: [
          { id: "a", text: "bacteria only." },
          { id: "b", text: "protozoa only." },
          { id: "c", text: "protozoa, bacteria, and special enzymes — all of the above." },
        ],
        correctOptionId: "c",
        answerText: "All of the above. Termites rely on a community of protozoa, bacteria, and enzymes to break down cellulose. Nymphs obtain gut protozoa from workers via trophallaxis.",
      },
      {
        id: "ace-11-q2",
        prompt: "Which termite species are most likely attacking wood with moisture content less than 15%?",
        options: [
          { id: "a", text: "Eastern subterranean termite (Reticulitermes flavipes)" },
          { id: "b", text: "Formosan subterranean termite (Coptotermes formosanus)" },
          { id: "c", text: "Drywood termite (family Kalotermitidae, e.g. Incisitermes minor)" },
        ],
        correctOptionId: "c",
        answerText: "Drywood termites. They require no ground contact and thrive in wood with less than 15% moisture content — this is a key distinguishing characteristic.",
      },
      {
        id: "ace-11-q3",
        prompt: "True powderpost beetles (Lyctidae) attack",
        options: [
          { id: "a", text: "softwoods only." },
          { id: "b", text: "hardwoods only." },
          { id: "c", text: "both hard and softwoods equally." },
        ],
        correctOptionId: "b",
        answerText: "Hardwoods only. True powderpost beetles require the large starch-filled pores found in hardwoods. False powderpost beetles (Bostrichidae) and anobiids attack both.",
      },
      {
        id: "ace-11-q4",
        prompt: "Which Formosan subterranean termite character most helps distinguish it from eastern subterranean termites?",
        options: [
          { id: "a", text: "Formosan soldiers have smooth mandibles and a round head." },
          { id: "b", text: "Formosan colonies have a high percentage of soldiers (~10%) and soldiers have a teardrop-shaped head." },
          { id: "c", text: "Formosan termites only swarm during daylight hours." },
        ],
        correctOptionId: "b",
        answerText: "10% soldiers with teardrop-shaped head. Reticulitermes soldiers have smooth mandibles and a rectangular head. Formosan termites also swarm at night (not day).",
      },
      {
        id: "ace-11-q5",
        prompt: "Carpenter ants differ from termites in that carpenter ants",
        options: [
          { id: "a", text: "eat wood to obtain nutrition." },
          { id: "b", text: "excavate wood to create nesting galleries but do not consume it for nutrition." },
          { id: "c", text: "build mud tubes to travel between the soil and wood." },
        ],
        correctOptionId: "b",
        answerText: "Excavate but do not eat wood. Termites consume wood for nutrition. Mud tubes are a termite behavior (subterranean), not a carpenter ant behavior.",
      },
      {
        id: "ace-11-q6",
        prompt: "Drywood termite frecal pellets are best described as",
        options: [
          { id: "a", text: "soft, moist pellets that clump together with mud." },
          { id: "b", text: "hard, dry, elongate-oval pellets with six concave sides." },
          { id: "c", text: "fine silky powder resembling flour." },
        ],
        correctOptionId: "b",
        answerText: "Hard, dry, elongate-oval pellets with six concave sides. These distinctive pellets are diagnostic for drywood termite activity and do not change in shape or size over time.",
      },
    ],
  },
];
