/**
 * ACE practice exam questions, one chapter per study module (ace-1 … ace-11).
 *
 * Ported verbatim from the owner's standalone ACE Prep app (github.com/Turkokami/ACEPrepApp,
 * src/app/). If questions change in the standalone app, copy them here too — the two don't sync.
 *
 * 2026-10-01: 220 questions added (20 per module), written in original wording from the topics
 * the ACE prep class decks cover. Those decks are ESA-owned and are not copied or reused. 16
 * earlier questions that closely followed the decks' quiz slides were rewritten, and outdated
 * facts corrected (termites in Blattodea, Lyctinae, German cockroach moisture, heat guidance).
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
  /** recall = Easy, id = Medium, applied = Hard on the practice test. */
  difficulty: "recall" | "id" | "applied";
};

export type PracticeExamChapter = {
  id: string;
  title: string;
  questionCount: number;
  questions: PracticeExamQuestion[];
};


export const acePracticeExamChapters: PracticeExamChapter[] = [
  {
    "id": "ace-1",
    "title": "Module 1. Insect Biology & Morphology",
    "questionCount": 25,
    "questions": [
      {
        "id": "ace-1-q1",
        "prompt": "How many pairs of legs does an adult insect have?",
        "options": [
          {
            "id": "a",
            "text": "2 pairs (4 legs)"
          },
          {
            "id": "b",
            "text": "3 pairs (6 legs)"
          },
          {
            "id": "c",
            "text": "4 pairs (8 legs)"
          }
        ],
        "correctOptionId": "b",
        "answerText": "3 pairs (6 legs). This is one of the defining characteristics of insects (class Insecta).",
        "difficulty": "recall"
      },
      {
        "id": "ace-1-q2",
        "prompt": "Which type of metamorphosis is correct for fleas?",
        "options": [
          {
            "id": "a",
            "text": "Gradual metamorphosis — egg, nymph, adult"
          },
          {
            "id": "b",
            "text": "Complete metamorphosis — egg, larva, pupa, adult"
          },
          {
            "id": "c",
            "text": "No metamorphosis — juveniles look identical to adults"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Complete metamorphosis (egg, larva, pupa, adult). Fleas are in Order Siphonaptera, which undergoes complete metamorphosis.",
        "difficulty": "recall"
      },
      {
        "id": "ace-1-q3",
        "prompt": "Diatomaceous earth kills insects primarily by",
        "options": [
          {
            "id": "a",
            "text": "disrupting the insect's nervous system."
          },
          {
            "id": "b",
            "text": "absorbing or abrading the waxy cuticle and causing desiccation."
          },
          {
            "id": "c",
            "text": "blocking the insect's digestive enzymes."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Absorbing/abrading the waxy cuticle. Desiccants kill through a physical mode of action — disrupting water balance by damaging the exoskeleton.",
        "difficulty": "recall"
      },
      {
        "id": "ace-1-q4",
        "prompt": "Which insect order contains cockroaches?",
        "options": [
          {
            "id": "a",
            "text": "Orthoptera"
          },
          {
            "id": "b",
            "text": "Hemiptera"
          },
          {
            "id": "c",
            "text": "Blattodea"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Blattodea. Termites are now classified inside Blattodea too (they used to be their own order, Isoptera). Grasshoppers and crickets are Orthoptera; true bugs are Hemiptera.",
        "difficulty": "id"
      },
      {
        "id": "ace-1-q5",
        "prompt": "An insect with piercing-sucking mouthparts is found on a plant with chewed leaf margins. Which statement is most accurate?",
        "options": [
          {
            "id": "a",
            "text": "The insect with piercing-sucking mouthparts is responsible for the chewing damage."
          },
          {
            "id": "b",
            "text": "The insect with piercing-sucking mouthparts cannot cause chewing damage — a different pest is responsible."
          },
          {
            "id": "c",
            "text": "Piercing-sucking insects can switch between feeding modes depending on season."
          }
        ],
        "correctOptionId": "b",
        "answerText": "The insect with piercing-sucking mouthparts cannot cause chewing damage. Mouthpart type determines damage type — chewing damage requires chewing mouthparts.",
        "difficulty": "applied"
      },
      {
        "id": "ace-1-q6",
        "prompt": "Chitin, the main structural material of the insect procuticle, is chemically best described as a",
        "options": [
          {
            "id": "a",
            "text": "protein similar to keratin"
          },
          {
            "id": "b",
            "text": "nitrogen-containing polysaccharide"
          },
          {
            "id": "c",
            "text": "wax secreted by the epidermis"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Chitin is a long-chain polysaccharide (a polymer of N-acetylglucosamine). Proteins stiffen the cuticle around it, and the waterproofing wax sits in the thin outer epicuticle, which contains no chitin.",
        "difficulty": "recall"
      },
      {
        "id": "ace-1-q7",
        "prompt": "On a winged adult insect, which thoracic segments carry the wings?",
        "options": [
          {
            "id": "a",
            "text": "Prothorax and mesothorax"
          },
          {
            "id": "b",
            "text": "Prothorax and metathorax"
          },
          {
            "id": "c",
            "text": "Mesothorax and metathorax"
          }
        ],
        "correctOptionId": "c",
        "answerText": "The front wings sit on the mesothorax and the hind wings on the metathorax. The prothorax carries the first pair of legs but never wings.",
        "difficulty": "recall"
      },
      {
        "id": "ace-1-q8",
        "prompt": "Which leg segment joins the insect leg to the body?",
        "options": [
          {
            "id": "a",
            "text": "Coxa"
          },
          {
            "id": "b",
            "text": "Femur"
          },
          {
            "id": "c",
            "text": "Tarsus"
          }
        ],
        "correctOptionId": "a",
        "answerText": "The coxa is the base segment, attached to the thorax. Going outward come the trochanter, femur, tibia and finally the tarsus, the segmented foot.",
        "difficulty": "recall"
      },
      {
        "id": "ace-1-q9",
        "prompt": "Air enters an insect's body mainly through",
        "options": [
          {
            "id": "a",
            "text": "book lungs on the underside of the abdomen"
          },
          {
            "id": "b",
            "text": "spiracles that open into a network of tracheae"
          },
          {
            "id": "c",
            "text": "the mouth, then into the gut"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Insects breathe through openings along the body called spiracles, which feed branching air tubes (tracheae). Book lungs are found in spiders and scorpions, not insects.",
        "difficulty": "recall"
      },
      {
        "id": "ace-1-q10",
        "prompt": "A horticultural oil spray kills soft scales and aphids mainly by",
        "options": [
          {
            "id": "a",
            "text": "coating the insect and blocking its spiracles"
          },
          {
            "id": "b",
            "text": "inhibiting acetylcholinesterase"
          },
          {
            "id": "c",
            "text": "interfering with chitin formation at the next molt"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Oils work physically: a film over small, slow-moving insects clogs the breathing openings and suffocates them. They have no nerve or growth-regulator action.",
        "difficulty": "applied"
      },
      {
        "id": "ace-1-q11",
        "prompt": "The empty, insect-shaped skin left behind after a molt is called the",
        "options": [
          {
            "id": "a",
            "text": "instar"
          },
          {
            "id": "b",
            "text": "ootheca"
          },
          {
            "id": "c",
            "text": "exuvia"
          }
        ],
        "correctOptionId": "c",
        "answerText": "The cast skin is the exuvia (plural exuviae). An instar is the stage between two molts, and an ootheca is a cockroach or mantid egg case.",
        "difficulty": "recall"
      },
      {
        "id": "ace-1-q12",
        "prompt": "A technician finds a pure white cockroach among normal brown German cockroaches. The most likely explanation is that it is",
        "options": [
          {
            "id": "a",
            "text": "an albino mutant that will stay white"
          },
          {
            "id": "b",
            "text": "a different species from the rest of the infestation"
          },
          {
            "id": "c",
            "text": "a freshly molted individual whose new cuticle has not yet darkened and hardened"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Right after a molt the new cuticle is soft and pale. It tans and hardens over several hours, and during that window the insect is especially vulnerable.",
        "difficulty": "applied"
      },
      {
        "id": "ace-1-q13",
        "prompt": "Which of these pests develops by gradual (simple) metamorphosis?",
        "options": [
          {
            "id": "a",
            "text": "Termite"
          },
          {
            "id": "b",
            "text": "Flea"
          },
          {
            "id": "c",
            "text": "Ant"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Termites go egg, nymph, adult with no pupa. Fleas and ants have complete metamorphosis with a larva and a pupa.",
        "difficulty": "id"
      },
      {
        "id": "ace-1-q14",
        "prompt": "An immature insect with visible wing pads on its thorax is most likely a",
        "options": [
          {
            "id": "a",
            "text": "beetle larva"
          },
          {
            "id": "b",
            "text": "late-instar nymph of an insect with gradual metamorphosis"
          },
          {
            "id": "c",
            "text": "fly pupa"
          }
        ],
        "correctOptionId": "b",
        "answerText": "In gradual metamorphosis the wings develop outside the body, so older nymphs show wing pads. Larvae of insects with complete metamorphosis develop their wings internally and show no pads.",
        "difficulty": "id"
      },
      {
        "id": "ace-1-q15",
        "prompt": "In complete metamorphosis, larval tissues are broken down and rebuilt into the adult body during the",
        "options": [
          {
            "id": "a",
            "text": "pupal stage"
          },
          {
            "id": "b",
            "text": "final larval instar"
          },
          {
            "id": "c",
            "text": "nymphal stage"
          }
        ],
        "correctOptionId": "a",
        "answerText": "The pupa is the transformation stage between larva and adult. Nymphs occur only in insects with gradual metamorphosis.",
        "difficulty": "recall"
      },
      {
        "id": "ace-1-q16",
        "prompt": "A coiled, straw-like proboscis used to sip nectar is the mouthpart type of",
        "options": [
          {
            "id": "a",
            "text": "stink bugs"
          },
          {
            "id": "b",
            "text": "house flies"
          },
          {
            "id": "c",
            "text": "moths and butterflies"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Lepidoptera have siphoning mouthparts that can only draw up exposed liquids; they cannot pierce. Stink bugs pierce and suck, and house flies sponge.",
        "difficulty": "id"
      },
      {
        "id": "ace-1-q17",
        "prompt": "Which fly has sponging mouthparts that cannot pierce skin?",
        "options": [
          {
            "id": "a",
            "text": "Stable fly"
          },
          {
            "id": "b",
            "text": "House fly"
          },
          {
            "id": "c",
            "text": "Horse fly"
          }
        ],
        "correctOptionId": "b",
        "answerText": "The house fly mops up liquefied food with a sponge-like tip and cannot bite. Stable flies and horse flies have blade-like or piercing mouthparts and feed on blood.",
        "difficulty": "id"
      },
      {
        "id": "ace-1-q18",
        "prompt": "In the scientific name Supella longipalpa, the word Supella is the",
        "options": [
          {
            "id": "a",
            "text": "family name"
          },
          {
            "id": "b",
            "text": "species epithet"
          },
          {
            "id": "c",
            "text": "genus name"
          }
        ],
        "correctOptionId": "c",
        "answerText": "A binomial name is genus plus species epithet. The genus is capitalized and comes first; both words are italicized.",
        "difficulty": "recall"
      },
      {
        "id": "ace-1-q19",
        "prompt": "Why can only female bees, wasps and ants sting?",
        "options": [
          {
            "id": "a",
            "text": "The stinger is a modified egg-laying organ (ovipositor), which males do not have"
          },
          {
            "id": "b",
            "text": "Males have stingers but no venom glands"
          },
          {
            "id": "c",
            "text": "Males lose their stingers after mating"
          }
        ],
        "correctOptionId": "a",
        "answerText": "In stinging Hymenoptera the sting evolved from the ovipositor, so only females have one. Males are harmless to handle.",
        "difficulty": "recall"
      },
      {
        "id": "ace-1-q20",
        "prompt": "An arthropod has two body regions, four pairs of legs and no antennae. It belongs to the class",
        "options": [
          {
            "id": "a",
            "text": "Insecta"
          },
          {
            "id": "b",
            "text": "Arachnida"
          },
          {
            "id": "c",
            "text": "Chilopoda"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Spiders, ticks, mites and scorpions (Arachnida) have a cephalothorax and abdomen, eight legs and no antennae. Insects have three body regions, six legs and antennae; centipedes have many legs.",
        "difficulty": "id"
      },
      {
        "id": "ace-1-q21",
        "prompt": "A long, cylindrical arthropod with two pairs of legs on most body segments is a",
        "options": [
          {
            "id": "a",
            "text": "centipede (Chilopoda)"
          },
          {
            "id": "b",
            "text": "sowbug (Isopoda)"
          },
          {
            "id": "c",
            "text": "millipede (Diplopoda)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Millipedes carry two pairs of legs per apparent segment. Centipedes have one pair per segment, and sowbugs are crustaceans with seven pairs of legs in total.",
        "difficulty": "id"
      },
      {
        "id": "ace-1-q22",
        "prompt": "An insect has hardened front wings that meet in a straight line down the back and protect membranous hind wings. Its order is",
        "options": [
          {
            "id": "a",
            "text": "Coleoptera"
          },
          {
            "id": "b",
            "text": "Hemiptera"
          },
          {
            "id": "c",
            "text": "Dermaptera"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Beetles have hard front wings (elytra) and fly with the hind pair. True bugs have front wings that are only partly hardened, and earwigs have very short front wings plus forceps.",
        "difficulty": "id"
      },
      {
        "id": "ace-1-q23",
        "prompt": "An insect has a jointed beak for piercing and sucking, and front wings that are thick near the base and membranous at the tips, folded flat over the back. Which order is it?",
        "options": [
          {
            "id": "a",
            "text": "Orthoptera"
          },
          {
            "id": "b",
            "text": "Hemiptera (true bugs)"
          },
          {
            "id": "c",
            "text": "Blattodea"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Half-hardened front wings (hemelytra) and a sucking beak mark the true bugs. Bed bugs, stink bugs and kissing bugs are in this group.",
        "difficulty": "id"
      },
      {
        "id": "ace-1-q24",
        "prompt": "Based on molecular evidence, most entomologists now classify termites as",
        "options": [
          {
            "id": "a",
            "text": "a suborder of Orthoptera"
          },
          {
            "id": "b",
            "text": "a family within Hymenoptera"
          },
          {
            "id": "c",
            "text": "a lineage within the cockroach order Blattodea"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Termites turned out to be highly social cockroaches, most closely related to the wood-feeding Cryptocercus cockroaches. Older references, and many exam study guides, still list them as the order Isoptera.",
        "difficulty": "recall"
      },
      {
        "id": "ace-1-q25",
        "prompt": "Desiccant dusts such as silica aerogel will give the best results in which location?",
        "options": [
          {
            "id": "a",
            "text": "A dry attic or wall void"
          },
          {
            "id": "b",
            "text": "A damp crawlspace with standing water"
          },
          {
            "id": "c",
            "text": "Turf that is irrigated daily"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Desiccants kill by stripping the protective wax layer so the insect loses water. In humid or wet places the dust clumps and insects can replace lost water, so it works poorly.",
        "difficulty": "applied"
      }
    ]
  },
  {
    "id": "ace-2",
    "title": "Module 2. IPM Principles",
    "questionCount": 25,
    "questions": [
      {
        "id": "ace-2-q1",
        "prompt": "An action threshold in IPM is best defined as",
        "options": [
          {
            "id": "a",
            "text": "the point at which zero pests are allowed in a facility."
          },
          {
            "id": "b",
            "text": "the pest level at which control action becomes necessary."
          },
          {
            "id": "c",
            "text": "the number of pesticide applications per year allowed by law."
          }
        ],
        "correctOptionId": "b",
        "answerText": "The pest level at which control action becomes necessary. Thresholds vary by pest and setting and do not mean zero tolerance.",
        "difficulty": "recall"
      },
      {
        "id": "ace-2-q2",
        "prompt": "In the IPM control hierarchy (pyramid), which tactic should be used MOST frequently?",
        "options": [
          {
            "id": "a",
            "text": "Chemical control"
          },
          {
            "id": "b",
            "text": "Biological control"
          },
          {
            "id": "c",
            "text": "Pest prevention and cultural controls (sanitation, exclusion, pest-proofing)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Prevention and cultural controls. Chemical control sits at the top of the pyramid — the smallest section — meaning it should be used least, not most.",
        "difficulty": "recall"
      },
      {
        "id": "ace-2-q3",
        "prompt": "Which agency primarily regulates pesticide applications in food handling facilities?",
        "options": [
          {
            "id": "a",
            "text": "OSHA"
          },
          {
            "id": "b",
            "text": "EPA and FDA/USDA"
          },
          {
            "id": "c",
            "text": "Department of Labor"
          }
        ],
        "correctOptionId": "b",
        "answerText": "EPA and FDA/USDA. EPA registers pesticides; FDA and USDA regulate their use in food handling facilities. OSHA governs worker safety.",
        "difficulty": "recall"
      },
      {
        "id": "ace-2-q4",
        "prompt": "Which of the following is a monitoring tool that detects pests by scent?",
        "options": [
          {
            "id": "a",
            "text": "Sticky traps"
          },
          {
            "id": "b",
            "text": "Pheromone traps"
          },
          {
            "id": "c",
            "text": "Boroscope"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Pheromone traps. These use insect-produced chemical signals (sex or aggregation pheromones) to attract and trap target pests.",
        "difficulty": "recall"
      },
      {
        "id": "ace-2-q5",
        "prompt": "The IPM 'pest triangle' concept means that removing which of the following will reduce a pest problem?",
        "options": [
          {
            "id": "a",
            "text": "Any one of the three sides: pest, host/food source, or environment"
          },
          {
            "id": "b",
            "text": "Only the pest — host and environment cannot be changed"
          },
          {
            "id": "c",
            "text": "Only the environment — pests adapt to any change in host"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Any one of the three sides. Reducing any pest requisite — food, water, shelter, or the pest population itself — reduces the problem.",
        "difficulty": "recall"
      },
      {
        "id": "ace-2-q6",
        "prompt": "In IPM, monitoring differs from a single sampling event because monitoring",
        "options": [
          {
            "id": "a",
            "text": "is done only after pesticides have been applied"
          },
          {
            "id": "b",
            "text": "repeats sampling over time so trends in pest activity can be seen"
          },
          {
            "id": "c",
            "text": "counts every individual pest in the building"
          }
        ],
        "correctOptionId": "b",
        "answerText": "A single sample is a snapshot of whether pests are there and how many. Monitoring repeats that sampling over time, which reveals whether populations are rising or falling and whether the program is working.",
        "difficulty": "recall"
      },
      {
        "id": "ace-2-q7",
        "prompt": "Which service practice is LEAST consistent with IPM?",
        "options": [
          {
            "id": "a",
            "text": "Sealing gaps around utility pipes found during inspection"
          },
          {
            "id": "b",
            "text": "Recording sticky-trap counts at each visit"
          },
          {
            "id": "c",
            "text": "Spraying baseboards on a fixed monthly schedule without inspecting"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Calendar spraying with no inspection or evidence of pests is the opposite of IPM. IPM bases treatment decisions on inspection, monitoring and thresholds.",
        "difficulty": "applied"
      },
      {
        "id": "ace-2-q8",
        "prompt": "In food manufacturing, the abbreviation GMPs refers to",
        "options": [
          {
            "id": "a",
            "text": "Good Manufacturing Practices"
          },
          {
            "id": "b",
            "text": "General Monitoring Procedures"
          },
          {
            "id": "c",
            "text": "Government Mandated Pesticides"
          }
        ],
        "correctOptionId": "a",
        "answerText": "GMPs are Good Manufacturing Practices: FDA rules (now in 21 CFR Part 117) for keeping food plants sanitary, including keeping pests out. A pest contractor's work and records are judged against them.",
        "difficulty": "recall"
      },
      {
        "id": "ace-2-q9",
        "prompt": "The main role of a third-party auditing firm at a food plant is to",
        "options": [
          {
            "id": "a",
            "text": "register pesticides for use in food areas"
          },
          {
            "id": "b",
            "text": "issue pest control operator licenses"
          },
          {
            "id": "c",
            "text": "independently assess the plant's food-safety program, including pest control records, against a recognized standard"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Auditors are private, often hired because a retailer or buyer requires them. They are not regulators, but a poor pest program and weak documentation can cost the plant its certification.",
        "difficulty": "recall"
      },
      {
        "id": "ace-2-q10",
        "prompt": "Which statement about action thresholds is most accurate?",
        "options": [
          {
            "id": "a",
            "text": "The threshold for a pest can be lower in a hospital ward or food prep area than outdoors around trash containers"
          },
          {
            "id": "b",
            "text": "EPA sets a single threshold for each pest, printed on the label"
          },
          {
            "id": "c",
            "text": "A threshold means the client must tolerate pests indefinitely"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Thresholds depend on the pest and the setting. Sensitive sites may justify action at one sighting, while a few insects around a dumpster may call only for sanitation.",
        "difficulty": "applied"
      },
      {
        "id": "ace-2-q11",
        "prompt": "Installing door sweeps and sealing gaps around pipes where they enter a building are examples of",
        "options": [
          {
            "id": "a",
            "text": "biological control"
          },
          {
            "id": "b",
            "text": "exclusion (pest-proofing)"
          },
          {
            "id": "c",
            "text": "trapping"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Exclusion physically stops pests from getting in. It is preventive and lasts far longer than any residual pesticide.",
        "difficulty": "id"
      },
      {
        "id": "ace-2-q12",
        "prompt": "Getting rid of stacked cardboard in a storeroom and caulking the cracks behind a kitchen backsplash is mainly",
        "options": [
          {
            "id": "a",
            "text": "quarantine"
          },
          {
            "id": "b",
            "text": "environmental alteration by temperature"
          },
          {
            "id": "c",
            "text": "harborage reduction"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Both steps take away the protected hiding places cockroaches and other pests need. With less harborage, populations shrink and the remaining pests are easier to find and treat.",
        "difficulty": "id"
      },
      {
        "id": "ace-2-q13",
        "prompt": "A distribution warehouse holds all incoming pallets of dried fruit in a separate area until they are inspected for insects. This tactic is",
        "options": [
          {
            "id": "a",
            "text": "quarantine"
          },
          {
            "id": "b",
            "text": "interception"
          },
          {
            "id": "c",
            "text": "harborage reduction"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Isolating new goods until they are confirmed clean keeps an infested shipment from seeding the rest of the facility. Interception means catching pests as they move, for example with traps or air curtains.",
        "difficulty": "applied"
      },
      {
        "id": "ace-2-q14",
        "prompt": "Sealing infested commodities and raising carbon dioxide or lowering oxygen to kill insects is called",
        "options": [
          {
            "id": "a",
            "text": "temperature modification"
          },
          {
            "id": "b",
            "text": "modified atmosphere treatment"
          },
          {
            "id": "c",
            "text": "space spraying"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Modified atmospheres starve insects of oxygen over days. The material must be sealed, and exposure time depends on temperature and the pest.",
        "difficulty": "recall"
      },
      {
        "id": "ace-2-q15",
        "prompt": "An air curtain that blows a stream of air down across a loading-dock doorway is best classified as",
        "options": [
          {
            "id": "a",
            "text": "a chemical repellent"
          },
          {
            "id": "b",
            "text": "biological control"
          },
          {
            "id": "c",
            "text": "a mechanical/physical exclusion device"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Air doors are a physical barrier that keeps flying insects from passing through an open doorway. They work only if sized and maintained correctly.",
        "difficulty": "id"
      },
      {
        "id": "ace-2-q16",
        "prompt": "University of Minnesota research on bed bug cold tolerance found that at about 3°F (-16°C), killing all life stages takes roughly",
        "options": [
          {
            "id": "a",
            "text": "2 hours"
          },
          {
            "id": "b",
            "text": "80 hours (about 3.5 days)"
          },
          {
            "id": "c",
            "text": "30 days"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Olson et al. (2013) reported 100% kill after about 80 hours at -16°C, or about 48 hours at -20°C. Cold works far more slowly than heat, so items must stay frozen long enough.",
        "difficulty": "recall"
      },
      {
        "id": "ace-2-q17",
        "prompt": "When planning a heat or cold treatment, the most important factor to get right is",
        "options": [
          {
            "id": "a",
            "text": "the air temperature in the room, regardless of time"
          },
          {
            "id": "b",
            "text": "the relative humidity only"
          },
          {
            "id": "c",
            "text": "the lethal temperature for the target pest and how long it must be held at that temperature at the slowest-to-heat (or slowest-to-cool) point of the load"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Kill depends on both temperature and exposure time, and pests differ in tolerance. Dense items and hidden spots lag behind air temperature, so the core must reach the target and stay there.",
        "difficulty": "applied"
      },
      {
        "id": "ace-2-q18",
        "prompt": "Releasing beneficial insects such as parasitic wasps or predatory mites is most practical in",
        "options": [
          {
            "id": "a",
            "text": "interior plantscapes and greenhouses"
          },
          {
            "id": "b",
            "text": "restaurant kitchens"
          },
          {
            "id": "c",
            "text": "wall voids with cockroaches"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Most commercial natural enemies target plant pests, so indoor plantings are where biological control fits best. In food and living areas, releasing insects is rarely acceptable.",
        "difficulty": "applied"
      },
      {
        "id": "ace-2-q19",
        "prompt": "A technician finds the same grease buildup and food debris at every visit to a restaurant. Which step will most likely produce a lasting improvement?",
        "options": [
          {
            "id": "a",
            "text": "Doubling the number of insecticide applications"
          },
          {
            "id": "b",
            "text": "Documenting the problems and training the manager and staff on what to correct"
          },
          {
            "id": "c",
            "text": "Switching to a different insecticide class"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Client cooperation and education are often the most neglected IPM tactics. Pesticides cannot keep up with conditions that keep feeding the pests.",
        "difficulty": "applied"
      },
      {
        "id": "ace-2-q20",
        "prompt": "Detailed service reports matter in an IPM program mainly because they",
        "options": [
          {
            "id": "a",
            "text": "replace the need for inspections"
          },
          {
            "id": "b",
            "text": "are required only when restricted-use products are used"
          },
          {
            "id": "c",
            "text": "build a running record of pest findings and site conditions so the program can be adjusted and corrections tracked"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Records let supervisors and clients see trends, assign responsibility for fixes and verify that they were made. Auditors and inspectors also rely on them.",
        "difficulty": "recall"
      },
      {
        "id": "ace-2-q21",
        "prompt": "To look inside a wall void through a small drilled hole without opening the wall, a technician should use a",
        "options": [
          {
            "id": "a",
            "text": "moisture meter"
          },
          {
            "id": "b",
            "text": "borescope"
          },
          {
            "id": "c",
            "text": "motion detector"
          }
        ],
        "correctOptionId": "b",
        "answerText": "A borescope is a thin optical or camera probe for seeing into hidden spaces. A moisture meter only measures wetness, and a motion detector senses movement.",
        "difficulty": "id"
      },
      {
        "id": "ace-2-q22",
        "prompt": "Which statement about scent-detection dogs for bed bugs or termites is most accurate?",
        "options": [
          {
            "id": "a",
            "text": "An alert should be confirmed visually, because accuracy varies with the dog, handler and conditions"
          },
          {
            "id": "b",
            "text": "A trained dog is 100% accurate, so no confirmation is needed"
          },
          {
            "id": "c",
            "text": "Dogs can detect only dead insects"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Dogs can search large areas quickly, but false positives and false negatives happen. Good practice is to find live insects or other physical evidence before treating.",
        "difficulty": "recall"
      },
      {
        "id": "ace-2-q23",
        "prompt": "Where should an insect light trap be placed in a food plant?",
        "options": [
          {
            "id": "a",
            "text": "Facing outward through a window to draw flies in from outside"
          },
          {
            "id": "b",
            "text": "Directly above an open food-prep table"
          },
          {
            "id": "c",
            "text": "Out of view of exterior doors and windows and away from exposed food"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Visible from outside, a trap can attract insects into the building. Over exposed food, insect parts from the trap could fall onto the product.",
        "difficulty": "applied"
      },
      {
        "id": "ace-2-q24",
        "prompt": "Sticky monitors for cockroaches give the most useful information when placed",
        "options": [
          {
            "id": "a",
            "text": "against walls, in corners and under equipment near likely hiding places"
          },
          {
            "id": "b",
            "text": "in the middle of open floor areas"
          },
          {
            "id": "c",
            "text": "on ceilings in well-lit rooms"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Cockroaches travel along edges and stay close to harborage. Traps at these spots catch more insects and help pinpoint the source.",
        "difficulty": "applied"
      },
      {
        "id": "ace-2-q25",
        "prompt": "Pest-proof design is best described as",
        "options": [
          {
            "id": "a",
            "text": "installing extra bait stations once a building is occupied"
          },
          {
            "id": "b",
            "text": "building features chosen during design or renovation to prevent pest entry and harborage"
          },
          {
            "id": "c",
            "text": "using higher pesticide rates in new construction"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Examples include sealed utility penetrations, avoiding hollow voids, tight-fitting doors and keeping landscaping away from walls. Prevention built in from the start is the cheapest long-term control.",
        "difficulty": "recall"
      }
    ]
  },
  {
    "id": "ace-3",
    "title": "Module 3. IPM Tools & Practice",
    "questionCount": 26,
    "questions": [
      {
        "id": "ace-3-q1",
        "prompt": "A technician needs a residual treatment that stays available on unsealed concrete instead of soaking in. Which formulation is the better choice?",
        "options": [
          {
            "id": "a",
            "text": "Wettable powder (WP)"
          },
          {
            "id": "b",
            "text": "Ready-to-use solution"
          },
          {
            "id": "c",
            "text": "Aerosol space spray"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Wettable powder. Its particles stay on top of porous surfaces like concrete and brick, where insects contact them. Solutions and solvent-based liquids tend to soak in, and space sprays leave little residual.",
        "difficulty": "applied"
      },
      {
        "id": "ace-3-q2",
        "prompt": "Why should insecticide rotation for resistance be planned by mode-of-action group rather than by brand name?",
        "options": [
          {
            "id": "a",
            "text": "Different brands can share the same active ingredient or mode of action, so switching brands alone may not change the pressure on the pest"
          },
          {
            "id": "b",
            "text": "Federal law requires a new brand every season"
          },
          {
            "id": "c",
            "text": "Mode-of-action groups only apply to agricultural products"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Resistance develops to how a product kills, not to its label. Two brands from the same IRAC group act the same way, so a real rotation moves to a different mode-of-action group.",
        "difficulty": "applied"
      },
      {
        "id": "ace-3-q3",
        "prompt": "Which insecticide class works by irreversibly inhibiting cholinesterase?",
        "options": [
          {
            "id": "a",
            "text": "Carbamates"
          },
          {
            "id": "b",
            "text": "Organophosphates"
          },
          {
            "id": "c",
            "text": "Pyrethroids"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Organophosphates. Carbamates also inhibit cholinesterase but do so reversibly — this reversibility is considered a relative safety improvement over OPs.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q4",
        "prompt": "Resistance to insecticides is most likely to develop when",
        "options": [
          {
            "id": "a",
            "text": "only a small portion of the pest population is exposed to the pesticide."
          },
          {
            "id": "b",
            "text": "the pest has a high reproductive rate and most of the population is exposed."
          },
          {
            "id": "c",
            "text": "the pesticide is rotated between multiple chemical classes."
          }
        ],
        "correctOptionId": "b",
        "answerText": "High reproductive rate + most of the population exposed. These conditions accelerate natural selection for resistant individuals.",
        "difficulty": "applied"
      },
      {
        "id": "ace-3-q5",
        "prompt": "Crack and crevice applications are defined as",
        "options": [
          {
            "id": "a",
            "text": "applications to broad surface areas such as walls or floors."
          },
          {
            "id": "b",
            "text": "application of small amounts of pesticide into inaccessible cracks, crevices, or voids."
          },
          {
            "id": "c",
            "text": "any application not to exceed 2 square feet."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Application into inaccessible cracks, crevices, or voids. Spot applications (not to exceed 2 sq ft) are a separate, distinct application type.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q6",
        "prompt": "Microencapsulated insecticides have which of the following advantages over emulsifiable concentrates?",
        "options": [
          {
            "id": "a",
            "text": "Lower cost and no agitation required"
          },
          {
            "id": "b",
            "text": "Improved residual and lower exposure risk due to slow-release capsules"
          },
          {
            "id": "c",
            "text": "No visible residue and fast knockdown"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Improved residual and lower exposure risk. The polymer capsules slow release of the AI, extending residual and reducing direct contact exposure.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q7",
        "prompt": "Which formulation needs the most frequent agitation in the spray tank to keep the active ingredient from settling out?",
        "options": [
          {
            "id": "a",
            "text": "Emulsifiable concentrate"
          },
          {
            "id": "b",
            "text": "Wettable powder"
          },
          {
            "id": "c",
            "text": "Soluble powder"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Wettable powder particles are suspended, not dissolved, and sink quickly without agitation. A soluble powder forms a true solution, and an EC forms a stable emulsion.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q8",
        "prompt": "Which formulation dissolves completely in water, so it needs no agitation once mixed?",
        "options": [
          {
            "id": "a",
            "text": "Soluble powder"
          },
          {
            "id": "b",
            "text": "Suspension concentrate"
          },
          {
            "id": "c",
            "text": "Microencapsulated"
          }
        ],
        "correctOptionId": "a",
        "answerText": "A soluble powder forms a true solution. Suspension concentrates and microencapsulated products are suspensions of particles or capsules and must be kept mixed.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q9",
        "prompt": "Spraying an emulsifiable concentrate on ornamental shrubs is most likely to cause which problem?",
        "options": [
          {
            "id": "a",
            "text": "Clogged nozzles from undissolved particles"
          },
          {
            "id": "b",
            "text": "Leaf burn (phytotoxicity) from the solvents"
          },
          {
            "id": "c",
            "text": "A heavy white residue on the leaves"
          }
        ],
        "correctOptionId": "b",
        "answerText": "The petroleum solvents in ECs can injure some plants. Visible residue and nozzle wear are typical of wettable powders.",
        "difficulty": "applied"
      },
      {
        "id": "ace-3-q10",
        "prompt": "Fipronil belongs to which insecticide class?",
        "options": [
          {
            "id": "a",
            "text": "Neonicotinoids"
          },
          {
            "id": "b",
            "text": "Pyrroles"
          },
          {
            "id": "c",
            "text": "Phenylpyrazoles"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Fipronil is a phenylpyrazole (IRAC group 2B). Chlorfenapyr is the common pyrrole, and imidacloprid is a neonicotinoid.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q11",
        "prompt": "Fipronil kills insects by",
        "options": [
          {
            "id": "a",
            "text": "blocking GABA-gated chloride channels in the nervous system"
          },
          {
            "id": "b",
            "text": "inhibiting acetylcholinesterase"
          },
          {
            "id": "c",
            "text": "disrupting energy production in mitochondria"
          }
        ],
        "correctOptionId": "a",
        "answerText": "By blocking the chloride channels that GABA normally opens, fipronil leaves nerves over-excited. Cholinesterase inhibition is the organophosphate and carbamate mode of action.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q12",
        "prompt": "Chlorfenapyr kills insects by",
        "options": [
          {
            "id": "a",
            "text": "keeping sodium channels open"
          },
          {
            "id": "b",
            "text": "mimicking juvenile hormone"
          },
          {
            "id": "c",
            "text": "disrupting the production of energy (ATP) in mitochondria"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Chlorfenapyr is converted inside the insect to a compound that uncouples mitochondrial energy production (IRAC group 13). It is not a nerve poison, which makes it useful against pyrethroid-resistant populations.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q13",
        "prompt": "Indoxacarb, found in many cockroach and ant baits, is",
        "options": [
          {
            "id": "a",
            "text": "a pyrethroid"
          },
          {
            "id": "b",
            "text": "an oxadiazine that blocks sodium channels"
          },
          {
            "id": "c",
            "text": "an insect growth regulator"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Indoxacarb (IRAC 22A) is activated by enzymes inside the insect and then blocks sodium channels. Pyrethroids act on sodium channels too, but by holding them open rather than blocking them.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q14",
        "prompt": "Imidacloprid and dinotefuran act on which target?",
        "options": [
          {
            "id": "a",
            "text": "Nicotinic acetylcholine receptors"
          },
          {
            "id": "b",
            "text": "Acetylcholinesterase"
          },
          {
            "id": "c",
            "text": "Chitin synthesis"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Neonicotinoids (IRAC 4A) mimic acetylcholine at its receptor and overstimulate the nerve. They are water-soluble and systemic in plants.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q15",
        "prompt": "Bifenthrin, cypermethrin and deltamethrin share which mode of action?",
        "options": [
          {
            "id": "a",
            "text": "Inhibiting cholinesterase"
          },
          {
            "id": "b",
            "text": "Activating chloride channels"
          },
          {
            "id": "c",
            "text": "Holding nerve sodium channels open"
          }
        ],
        "correctOptionId": "c",
        "answerText": "All pyrethroids, and natural pyrethrins, are sodium channel modulators in IRAC group 3A. For resistance purposes they count as one mode of action.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q16",
        "prompt": "Why are natural pyrethrins often formulated with piperonyl butoxide (PBO)?",
        "options": [
          {
            "id": "a",
            "text": "PBO repels insects away from treated surfaces"
          },
          {
            "id": "b",
            "text": "PBO blocks the insect enzymes that break down pyrethrins, so fewer knocked-down insects recover"
          },
          {
            "id": "c",
            "text": "PBO protects the pyrethrins from sunlight"
          }
        ],
        "correctOptionId": "b",
        "answerText": "PBO is a synergist. It has little toxicity of its own but inhibits the insect's detoxifying enzymes.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q17",
        "prompt": "Two days after a hydroprene treatment, a client complains that adult cockroaches are still active. The best explanation is that",
        "options": [
          {
            "id": "a",
            "text": "juvenile hormone analogs act on development and do not quickly kill existing adults"
          },
          {
            "id": "b",
            "text": "the product must have been mixed incorrectly"
          },
          {
            "id": "c",
            "text": "the population must be resistant to all IGRs"
          }
        ],
        "correctOptionId": "a",
        "answerText": "JH analogs keep nymphs from becoming fertile adults; they are not fast-acting adulticides. They are usually paired with baits or other products that kill adults.",
        "difficulty": "applied"
      },
      {
        "id": "ace-3-q18",
        "prompt": "Noviflumuron and hexaflumuron in termite bait stations kill termites by",
        "options": [
          {
            "id": "a",
            "text": "fast knockdown of foraging workers"
          },
          {
            "id": "b",
            "text": "releasing a fumigant gas inside the gallery"
          },
          {
            "id": "c",
            "text": "preventing proper formation of new cuticle, so termites die when they try to molt"
          }
        ],
        "correctOptionId": "c",
        "answerText": "These benzoylureas (IRAC 15) inhibit chitin synthesis. Because they act only at the molt, termites keep feeding and sharing bait long enough to spread it through the colony.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q19",
        "prompt": "After a whole-structure fumigation with sulfuryl fluoride, how protected is the building against new infestations?",
        "options": [
          {
            "id": "a",
            "text": "Not at all; fumigants leave no lasting residual"
          },
          {
            "id": "b",
            "text": "Protected for about five years"
          },
          {
            "id": "c",
            "text": "Protected until the next rain"
          }
        ],
        "correctOptionId": "a",
        "answerText": "A fumigant kills what is present when the structure is sealed, then airs out completely. New pests can move in afterward unless other measures are taken.",
        "difficulty": "applied"
      },
      {
        "id": "ace-3-q20",
        "prompt": "Abamectin, used in some cockroach and ant baits, comes from",
        "options": [
          {
            "id": "a",
            "text": "chrysanthemum flowers"
          },
          {
            "id": "b",
            "text": "fermentation of a soil bacterium (Streptomyces avermitilis)"
          },
          {
            "id": "c",
            "text": "a synthetic organophosphate"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Avermectins come from an actinomycete bacterium, even though the class is often loosely called 'fungal-derived'. They activate chloride channels (IRAC group 6).",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q21",
        "prompt": "Boric acid dust works best against cockroaches when it is",
        "options": [
          {
            "id": "a",
            "text": "piled in visible mounds along baseboards"
          },
          {
            "id": "b",
            "text": "applied to wet surfaces so it sticks"
          },
          {
            "id": "c",
            "text": "applied as a thin, barely visible film in voids and cracks"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Cockroaches avoid heavy deposits but walk through light ones, then swallow the dust while grooming. Moisture makes boric acid cake and lose effectiveness.",
        "difficulty": "applied"
      },
      {
        "id": "ace-3-q22",
        "prompt": "Which rodenticide active ingredient is NOT an anticoagulant?",
        "options": [
          {
            "id": "a",
            "text": "Bromadiolone"
          },
          {
            "id": "b",
            "text": "Bromethalin"
          },
          {
            "id": "c",
            "text": "Diphacinone"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Bromethalin is a nerve toxin. Bromadiolone is a second-generation anticoagulant and diphacinone a first-generation one; similar-sounding names are a common trap.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q23",
        "prompt": "Compared with first-generation anticoagulants such as warfarin, second-generation anticoagulants such as brodifacoum",
        "options": [
          {
            "id": "a",
            "text": "can deliver a lethal dose in a single feeding, so secondary poisoning risk to predators is higher"
          },
          {
            "id": "b",
            "text": "need many days of feeding to kill"
          },
          {
            "id": "c",
            "text": "are sold to homeowners for general use"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Second-generation anticoagulants are more potent and stay in tissue longer. Under EPA's rodenticide risk mitigation decision (issued 2008, phased in over the following years) they are no longer sold in consumer products.",
        "difficulty": "recall"
      },
      {
        "id": "ace-3-q24",
        "prompt": "When choosing a product to rotate to for resistance management, the most useful thing to check on the label is",
        "options": [
          {
            "id": "a",
            "text": "the brand name"
          },
          {
            "id": "b",
            "text": "the IRAC mode-of-action group number"
          },
          {
            "id": "c",
            "text": "the formulation type"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Different brands often contain the same chemistry. Rotating means switching to a different IRAC group, not just a different product or formulation.",
        "difficulty": "applied"
      },
      {
        "id": "ace-3-q25",
        "prompt": "Which practice speeds up the development of insecticide resistance?",
        "options": [
          {
            "id": "a",
            "text": "Leaving some areas untreated"
          },
          {
            "id": "b",
            "text": "Rotating between different IRAC groups"
          },
          {
            "id": "c",
            "text": "Applying below the labeled rate time after time"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Sublethal doses let moderately tolerant insects survive and breed, which pushes the population toward resistance. Untreated refuges and rotation slow it down.",
        "difficulty": "applied"
      },
      {
        "id": "ace-3-q26",
        "prompt": "Releasing a pyrethrin aerosol into the air of a closed room to kill flying insects is a",
        "options": [
          {
            "id": "a",
            "text": "crack and crevice treatment"
          },
          {
            "id": "b",
            "text": "spot treatment"
          },
          {
            "id": "c",
            "text": "space treatment"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Space treatments disperse fine droplets into the air and leave little residual. Crack and crevice and spot treatments put product on specific surfaces.",
        "difficulty": "id"
      }
    ]
  },
  {
    "id": "ace-4",
    "title": "Module 4. Toxicology, Safety & Laws",
    "questionCount": 25,
    "questions": [
      {
        "id": "ace-4-q1",
        "prompt": "LD50 measures",
        "options": [
          {
            "id": "a",
            "text": "the amount of material needed to kill half of a test population (mg/kg body weight)."
          },
          {
            "id": "b",
            "text": "the lethal concentration of a pesticide in air that kills 50% of test animals."
          },
          {
            "id": "c",
            "text": "the maximum safe exposure limit for pesticide applicators."
          }
        ],
        "correctOptionId": "a",
        "answerText": "The amount (mg/kg) needed to kill half the test population. Lower LD50 = more acutely toxic.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q2",
        "prompt": "The signal word DANGER-POISON on a pesticide label indicates",
        "options": [
          {
            "id": "a",
            "text": "the pesticide is in EPA Toxicity Class II (moderately toxic)."
          },
          {
            "id": "b",
            "text": "the pesticide is in EPA Toxicity Class I (most acutely toxic)."
          },
          {
            "id": "c",
            "text": "the pesticide has been banned for residential use."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Class I — most acutely toxic. WARNING = Class II; CAUTION = Classes III and IV (least toxic).",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q3",
        "prompt": "Pesticide hazard is best reduced by",
        "options": [
          {
            "id": "a",
            "text": "only applying pesticides outdoors."
          },
          {
            "id": "b",
            "text": "reducing either the toxicity of the product selected or reducing exposure to the applicator and environment."
          },
          {
            "id": "c",
            "text": "using only natural or organic-certified pesticides."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Reducing toxicity or reducing exposure. Hazard = Toxicity × Exposure — either variable can be reduced.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q4",
        "prompt": "FIFRA stands for",
        "options": [
          {
            "id": "a",
            "text": "Federal Insecticide, Fungicide, and Rodenticide Act."
          },
          {
            "id": "b",
            "text": "Field Inspection and Farm Registration Act."
          },
          {
            "id": "c",
            "text": "Federal Integrated Farming and Rodent Act."
          }
        ],
        "correctOptionId": "a",
        "answerText": "Federal Insecticide, Fungicide, and Rodenticide Act. This is the primary US federal pesticide law, administered by the EPA.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q5",
        "prompt": "Which chronic toxicity effect involves harm to developing fetuses?",
        "options": [
          {
            "id": "a",
            "text": "Carcinogenicity"
          },
          {
            "id": "b",
            "text": "Teratogenicity"
          },
          {
            "id": "c",
            "text": "Oncogenicity"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Teratogenicity. Carcinogenicity = cancer; oncogenicity = tumors; teratogenicity = birth defects from fetal exposure.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q6",
        "prompt": "A pesticide whose most severe acute result is an oral LD50 of 200 mg/kg will carry which signal word?",
        "options": [
          {
            "id": "a",
            "text": "DANGER"
          },
          {
            "id": "b",
            "text": "WARNING"
          },
          {
            "id": "c",
            "text": "CAUTION"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Oral LD50 values above 50 and up to 500 mg/kg fall in Toxicity Category II, signal word WARNING. Category I (50 mg/kg or less) is DANGER; Category III (over 500 to 5,000) is CAUTION.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q7",
        "prompt": "Product X has an oral LD50 of 30 mg/kg and Product Y has an oral LD50 of 3,000 mg/kg. Which signal words would you expect?",
        "options": [
          {
            "id": "a",
            "text": "X: CAUTION, Y: DANGER"
          },
          {
            "id": "b",
            "text": "Both: WARNING"
          },
          {
            "id": "c",
            "text": "X: DANGER, Y: CAUTION"
          }
        ],
        "correctOptionId": "c",
        "answerText": "The lower the LD50, the more toxic the product. 30 mg/kg is Category I (DANGER, with POISON and the skull and crossbones for oral toxicity) and 3,000 mg/kg is Category III (CAUTION).",
        "difficulty": "applied"
      },
      {
        "id": "ace-4-q8",
        "prompt": "A product has very low oral toxicity but causes irreversible eye damage. Its signal word will be",
        "options": [
          {
            "id": "a",
            "text": "DANGER, because the signal word follows the most severe acute toxicity category of any test"
          },
          {
            "id": "b",
            "text": "CAUTION, because only oral LD50 determines the signal word"
          },
          {
            "id": "c",
            "text": "none, because eye effects are listed only on the SDS"
          }
        ],
        "correctOptionId": "a",
        "answerText": "EPA considers oral, dermal, inhalation, eye and skin results and uses the worst one. A corrosive Category I eye irritant gets DANGER even if it is hard to poison someone by mouth.",
        "difficulty": "applied"
      },
      {
        "id": "ace-4-q9",
        "prompt": "A technician develops headache and nausea within hours after a concentrate splashes on his arm. This is an example of",
        "options": [
          {
            "id": "a",
            "text": "chronic toxicity"
          },
          {
            "id": "b",
            "text": "acute toxicity"
          },
          {
            "id": "c",
            "text": "teratogenicity"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Acute effects show up soon after a single exposure. Chronic effects come from repeated or long-term exposure, and teratogenic effects are birth defects.",
        "difficulty": "id"
      },
      {
        "id": "ace-4-q10",
        "prompt": "Toxicity of a fumigant breathed in as a gas is normally expressed as",
        "options": [
          {
            "id": "a",
            "text": "an LC50, a concentration in air"
          },
          {
            "id": "b",
            "text": "an oral LD50 in mg/kg"
          },
          {
            "id": "c",
            "text": "a restricted-entry interval"
          }
        ],
        "correctOptionId": "a",
        "answerText": "The LC50 is the concentration in air (or water) that kills half of the test animals over a set exposure. LD50 is used for doses swallowed or applied to skin.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q11",
        "prompt": "For pesticide applicators, the most common route of exposure is",
        "options": [
          {
            "id": "a",
            "text": "oral"
          },
          {
            "id": "b",
            "text": "inhalation"
          },
          {
            "id": "c",
            "text": "dermal (skin)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Most applicator exposure comes through the skin, especially the hands and forearms during mixing. That is why chemical-resistant gloves are the most important single item of PPE.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q12",
        "prompt": "A supplemental use sheet that the product label refers to, but that is not attached to the container, is",
        "options": [
          {
            "id": "a",
            "text": "advertising, with no legal force"
          },
          {
            "id": "b",
            "text": "part of the product's labeling and must be followed"
          },
          {
            "id": "c",
            "text": "optional guidance for certified applicators only"
          }
        ],
        "correctOptionId": "b",
        "answerText": "The label is what is on or attached to the container; labeling also includes other written material that accompanies or is referenced by it. Both are enforceable directions.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q13",
        "prompt": "Under FIFRA, a person who is not a certified applicator may apply a restricted-use pesticide only",
        "options": [
          {
            "id": "a",
            "text": "never, under any circumstances"
          },
          {
            "id": "b",
            "text": "if the property owner gives written permission"
          },
          {
            "id": "c",
            "text": "under the direct supervision of a certified applicator, as defined by the state"
          }
        ],
        "correctOptionId": "c",
        "answerText": "RUPs are limited to certified applicators or people working under their direct supervision. States set what direct supervision requires, and some are stricter than others.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q14",
        "prompt": "Under FIFRA, a state may",
        "options": [
          {
            "id": "a",
            "text": "set requirements stricter than the federal rules"
          },
          {
            "id": "b",
            "text": "allow applicators to ignore federal label restrictions"
          },
          {
            "id": "c",
            "text": "approve any product not registered by EPA for general sale"
          }
        ],
        "correctOptionId": "a",
        "answerText": "States can add restrictions, such as extra licensing or notification rules, but cannot relax federal requirements. That is why the state rules where you work must be checked as well as the label.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q15",
        "prompt": "Under OSHA's current Hazard Communication Standard, a technician looking for a product's hazards, first aid and spill guidance should consult the",
        "options": [
          {
            "id": "a",
            "text": "EPA registration certificate"
          },
          {
            "id": "b",
            "text": "Safety Data Sheet (SDS) in its standard 16-section format"
          },
          {
            "id": "c",
            "text": "state pesticide license"
          }
        ],
        "correctOptionId": "b",
        "answerText": "The 2012 HazCom revision aligned with the Globally Harmonized System and replaced the old MSDS with a uniform 16-section SDS. Employers must keep SDSs available to workers.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q16",
        "prompt": "Which federal agency enforces the rule that employers train workers on chemical hazards and keep safety data sheets available?",
        "options": [
          {
            "id": "a",
            "text": "OSHA"
          },
          {
            "id": "b",
            "text": "EPA"
          },
          {
            "id": "c",
            "text": "FDA"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Workplace hazard communication is an OSHA standard. EPA registers pesticides and approves labels; FDA enforces residue tolerances in most foods.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q17",
        "prompt": "When setting pesticide tolerances, the Food Quality Protection Act (1996) requires EPA to",
        "options": [
          {
            "id": "a",
            "text": "ban all organophosphates immediately"
          },
          {
            "id": "b",
            "text": "license commercial applicators directly"
          },
          {
            "id": "c",
            "text": "add up exposure from food, drinking water and residential uses, with an extra margin of protection for children"
          }
        ],
        "correctOptionId": "c",
        "answerText": "FQPA introduced aggregate (all-source) and cumulative risk assessment and an additional safety factor for infants and children. Uses can be cancelled when total exposure is too high.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q18",
        "prompt": "EPA sets residue tolerances for pesticides on food. Which agency enforces those tolerances for most foods?",
        "options": [
          {
            "id": "a",
            "text": "OSHA"
          },
          {
            "id": "b",
            "text": "FDA"
          },
          {
            "id": "c",
            "text": "Department of Transportation"
          }
        ],
        "correctOptionId": "b",
        "answerText": "FDA monitors and enforces tolerances for most foods; USDA does so for meat, poultry and some egg products. EPA's role is to set the limits.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q19",
        "prompt": "Which federal law governs the management and disposal of hazardous wastes, including some pesticide wastes?",
        "options": [
          {
            "id": "a",
            "text": "Endangered Species Act"
          },
          {
            "id": "b",
            "text": "Food, Drug and Cosmetic Act"
          },
          {
            "id": "c",
            "text": "Resource Conservation and Recovery Act (RCRA)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "RCRA (1976) gives EPA authority over hazardous waste from generation to disposal. Label disposal directions still apply on top of it.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q20",
        "prompt": "A label tells the user to check for an Endangered Species Protection Bulletin before an outdoor application. The applicator should",
        "options": [
          {
            "id": "a",
            "text": "get the bulletin for that location and month from EPA's Bulletins Live! Two website (within six months before the application) and follow it"
          },
          {
            "id": "b",
            "text": "ignore it unless a protected animal is seen on site"
          },
          {
            "id": "c",
            "text": "apply for a permit from the U.S. Fish and Wildlife Service"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Bulletins are an enforceable extension of the label and list area-specific limits. Labels now send users to EPA's online system rather than printing a list of counties.",
        "difficulty": "applied"
      },
      {
        "id": "ace-4-q21",
        "prompt": "A jug of liquid concentrate tips over and starts leaking in the truck bed. What should the technician do first?",
        "options": [
          {
            "id": "a",
            "text": "Hose the truck bed out to dilute the spill"
          },
          {
            "id": "b",
            "text": "Put on the label-required PPE and stop the leak at its source"
          },
          {
            "id": "c",
            "text": "Leave the area and report it the next day"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Protect yourself first, then keep the release from getting bigger. Only after that do you contain and clean up, and diluting it with water just spreads it.",
        "difficulty": "applied"
      },
      {
        "id": "ace-4-q22",
        "prompt": "Once a leak has been stopped, the next priority in handling a liquid spill is to",
        "options": [
          {
            "id": "a",
            "text": "dike it with absorbent and keep it out of drains and water"
          },
          {
            "id": "b",
            "text": "sweep it into the nearest storm drain"
          },
          {
            "id": "c",
            "text": "cover it with plastic and leave it to evaporate"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Containment keeps a small problem from becoming an environmental release. Used absorbent is then collected and disposed of as the label and local rules direct.",
        "difficulty": "applied"
      },
      {
        "id": "ace-4-q23",
        "prompt": "On an agricultural pesticide label, the restricted-entry interval (REI) is",
        "options": [
          {
            "id": "a",
            "text": "the minimum number of days between application and harvest"
          },
          {
            "id": "b",
            "text": "how long the product may be stored after opening"
          },
          {
            "id": "c",
            "text": "the time after application when unprotected workers may not enter the treated area"
          }
        ],
        "correctOptionId": "c",
        "answerText": "REIs come from EPA's Worker Protection Standard. The days between application and harvest are the pre-harvest interval, which is a different thing.",
        "difficulty": "recall"
      },
      {
        "id": "ace-4-q24",
        "prompt": "A technician mixes a product stronger than the label rate because the client's infestation is heavy. Under federal law this is",
        "options": [
          {
            "id": "a",
            "text": "legal, as long as the results are better"
          },
          {
            "id": "b",
            "text": "a violation, because it is a use inconsistent with the labeling"
          },
          {
            "id": "c",
            "text": "legal for certified applicators only"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Exceeding the label rate is misuse under FIFRA. Lower rates are generally allowed unless the label forbids them, but higher rates never are.",
        "difficulty": "applied"
      },
      {
        "id": "ace-4-q25",
        "prompt": "The EPA Establishment Number on a pesticide label identifies",
        "options": [
          {
            "id": "a",
            "text": "the facility where that batch of product was made"
          },
          {
            "id": "b",
            "text": "the product's federal registration"
          },
          {
            "id": "c",
            "text": "the applicator's certification"
          }
        ],
        "correctOptionId": "a",
        "answerText": "The establishment number traces the production site, which helps with recalls. The EPA Registration Number identifies the registered product itself.",
        "difficulty": "recall"
      }
    ]
  },
  {
    "id": "ace-5",
    "title": "Module 5. Cockroaches",
    "questionCount": 25,
    "questions": [
      {
        "id": "ace-5-q1",
        "prompt": "A restaurant reports large reddish-brown cockroaches coming up through floor drains at night. Which species is most likely?",
        "options": [
          {
            "id": "a",
            "text": "German cockroach"
          },
          {
            "id": "b",
            "text": "American cockroach"
          },
          {
            "id": "c",
            "text": "Brownbanded cockroach"
          }
        ],
        "correctOptionId": "b",
        "answerText": "American cockroach. It commonly lives in sewers and drain lines and enters buildings through floor drains. German cockroaches stay in warm, moist areas near food and water indoors, and brownbanded cockroaches favour warm, drier rooms away from water.",
        "difficulty": "applied"
      },
      {
        "id": "ace-5-q2",
        "prompt": "How does a female German cockroach handle her egg capsule (ootheca) compared with most other pest cockroaches?",
        "options": [
          {
            "id": "a",
            "text": "She carries it with her until the eggs are close to hatching"
          },
          {
            "id": "b",
            "text": "She glues it under furniture right after forming it"
          },
          {
            "id": "c",
            "text": "She lays single eggs without a capsule"
          }
        ],
        "correctOptionId": "a",
        "answerText": "German cockroach females carry the ootheca protruding from the abdomen until shortly before hatching, which protects the eggs and is one reason populations grow so fast. Brownbanded females glue theirs to surfaces.",
        "difficulty": "id"
      },
      {
        "id": "ace-5-q3",
        "prompt": "A technician finds cockroaches throughout an entire apartment — in bedrooms, living room, and kitchen. Which species is the most likely culprit?",
        "options": [
          {
            "id": "a",
            "text": "German cockroach"
          },
          {
            "id": "b",
            "text": "Brown-banded cockroach"
          },
          {
            "id": "c",
            "text": "Oriental cockroach"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Brown-banded cockroach. Unlike German cockroaches (kitchen/bathroom focused), brown-banded cockroaches distribute throughout the entire structure.",
        "difficulty": "applied"
      },
      {
        "id": "ace-5-q4",
        "prompt": "Cockroach allergens are a well-documented trigger for which medical condition?",
        "options": [
          {
            "id": "a",
            "text": "Bubonic plague"
          },
          {
            "id": "b",
            "text": "Asthma — especially in urban children"
          },
          {
            "id": "c",
            "text": "Lyme disease"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Asthma. Cockroach allergens (proteins in frass, shed skins, saliva) are a leading asthma trigger among inner-city youth.",
        "difficulty": "recall"
      },
      {
        "id": "ace-5-q5",
        "prompt": "Early-instar German cockroach nymphs differ from later instars in that they",
        "options": [
          {
            "id": "a",
            "text": "are found throughout the structure, not near crevices."
          },
          {
            "id": "b",
            "text": "remain close to crevices and feed on the feces of older cockroaches (coprophagy)."
          },
          {
            "id": "c",
            "text": "are resistant to all currently available baits."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Remain close to crevices and feed on older cockroach feces (coprophagy). This behavior means fresh bait placements near feces face competition in early infestations.",
        "difficulty": "id"
      },
      {
        "id": "ace-5-q6",
        "prompt": "In the Southeast, small tan cockroaches with two dark stripes behind the head fly from the lawn to a lit porch at dusk. The most likely species is the",
        "options": [
          {
            "id": "a",
            "text": "German cockroach"
          },
          {
            "id": "b",
            "text": "brownbanded cockroach"
          },
          {
            "id": "c",
            "text": "Asian cockroach"
          }
        ],
        "correctOptionId": "c",
        "answerText": "The Asian cockroach looks almost the same as the German but lives outdoors in leaf litter and mulch, flies readily, and comes to lights. German cockroaches seldom fly and live indoors.",
        "difficulty": "applied"
      },
      {
        "id": "ace-5-q7",
        "prompt": "Which cockroach female usually carries her egg capsule sticking out of her abdomen until shortly before it hatches?",
        "options": [
          {
            "id": "a",
            "text": "German cockroach"
          },
          {
            "id": "b",
            "text": "American cockroach"
          },
          {
            "id": "c",
            "text": "Oriental cockroach"
          }
        ],
        "correctOptionId": "a",
        "answerText": "German females hold the ootheca until about a day before hatch, so the eggs are protected from many treatments. American and Oriental females drop or attach theirs within a day or two.",
        "difficulty": "recall"
      },
      {
        "id": "ace-5-q8",
        "prompt": "What does a brownbanded cockroach female typically do with her egg capsule?",
        "options": [
          {
            "id": "a",
            "text": "Carries it until the nymphs hatch"
          },
          {
            "id": "b",
            "text": "Glues it to protected surfaces such as the underside of furniture, shelves or ceilings"
          },
          {
            "id": "c",
            "text": "Buries it in soil outdoors"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Brownbanded females attach small capsules, often in clusters, to hidden surfaces. Finding them high on walls or inside furniture is a good identification clue.",
        "difficulty": "recall"
      },
      {
        "id": "ace-5-q9",
        "prompt": "A small cockroach has two pale bands crossing its wings and abdomen. It is most likely a",
        "options": [
          {
            "id": "a",
            "text": "brownbanded cockroach"
          },
          {
            "id": "b",
            "text": "German cockroach"
          },
          {
            "id": "c",
            "text": "smokybrown cockroach"
          }
        ],
        "correctOptionId": "a",
        "answerText": "The crosswise light bands give the brownbanded cockroach its name. German cockroaches have two dark stripes running lengthwise on the pronotum instead.",
        "difficulty": "id"
      },
      {
        "id": "ace-5-q10",
        "prompt": "In spring, a technician finds large, shiny, nearly black cockroaches in a damp basement. The females have only small wing pads. The most likely species is the",
        "options": [
          {
            "id": "a",
            "text": "smokybrown cockroach"
          },
          {
            "id": "b",
            "text": "Oriental cockroach"
          },
          {
            "id": "c",
            "text": "American cockroach"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Oriental cockroaches are dark, favor cool damp places near ground level, and have short wings (males) or only wing pads (females). Smokybrown and American adults have full-length wings.",
        "difficulty": "applied"
      },
      {
        "id": "ace-5-q11",
        "prompt": "A large reddish-brown cockroach with a pale yellowish border around its pronotum is found in a hospital steam tunnel. The species is most likely the",
        "options": [
          {
            "id": "a",
            "text": "Oriental cockroach"
          },
          {
            "id": "b",
            "text": "smokybrown cockroach"
          },
          {
            "id": "c",
            "text": "American cockroach"
          }
        ],
        "correctOptionId": "c",
        "answerText": "The light edge on the pronotum and large size point to the American cockroach, common in sewers, steam tunnels and boiler rooms. Smokybrowns are uniformly dark with no pale border.",
        "difficulty": "id"
      },
      {
        "id": "ace-5-q12",
        "prompt": "A large, uniformly glossy, dark mahogany cockroach is found in tree holes, gutters and attics in the Southeast. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "American cockroach"
          },
          {
            "id": "b",
            "text": "smokybrown cockroach"
          },
          {
            "id": "c",
            "text": "Oriental cockroach"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Smokybrowns are mostly outdoor cockroaches that need high humidity and often get into attics from trees and roofs. They lack the American's pale pronotal edge.",
        "difficulty": "id"
      },
      {
        "id": "ace-5-q13",
        "prompt": "Which practice most reduces gel bait performance against German cockroaches?",
        "options": [
          {
            "id": "a",
            "text": "Placing many small bait spots close to harborage"
          },
          {
            "id": "b",
            "text": "Cleaning up competing food sources"
          },
          {
            "id": "c",
            "text": "Spraying a repellent residual insecticide on or around the bait"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Repellent residues contaminate bait and keep cockroaches away from it. Baits work best with less competing food and many small placements near hiding spots.",
        "difficulty": "applied"
      },
      {
        "id": "ace-5-q14",
        "prompt": "A German cockroach population that ate a particular gel bait last year now avoids it, even though monitors show heavy activity. What is the best explanation and response?",
        "options": [
          {
            "id": "a",
            "text": "The cockroaches are well fed; wait and reapply the same bait later"
          },
          {
            "id": "b",
            "text": "The population may have developed bait aversion; switch to a bait with a different food base and active ingredient"
          },
          {
            "id": "c",
            "text": "Apply more of the same bait in bigger spots"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Some German cockroach strains have become averse to certain bait ingredients, such as glucose. Changing the bait formulation, and rotating active ingredients, restores feeding.",
        "difficulty": "applied"
      },
      {
        "id": "ace-5-q15",
        "prompt": "Under warm indoor conditions, about how long does a German cockroach take to develop from egg to adult?",
        "options": [
          {
            "id": "a",
            "text": "About 2 months"
          },
          {
            "id": "b",
            "text": "One to two years"
          },
          {
            "id": "c",
            "text": "About one week"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Fast development, together with large egg capsules, gives the German cockroach the highest reproductive potential of the common pest species. American and Oriental cockroaches take many months or more.",
        "difficulty": "recall"
      },
      {
        "id": "ace-5-q16",
        "prompt": "Smokybrown cockroaches are getting into a home from heavy mulch beds along the foundation. Which approach gives the best long-term control?",
        "options": [
          {
            "id": "a",
            "text": "Thin the mulch and leaf litter near the foundation, seal entry points, and treat outdoor harborage"
          },
          {
            "id": "b",
            "text": "Place gel bait only under the kitchen sink"
          },
          {
            "id": "c",
            "text": "Set off foggers indoors every month"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Outdoor cockroaches must be managed where they live and at the points where they get in. Indoor-only treatment ignores the source.",
        "difficulty": "applied"
      },
      {
        "id": "ace-5-q17",
        "prompt": "When setting monitors for a brownbanded cockroach infestation, they should be placed",
        "options": [
          {
            "id": "a",
            "text": "only under the kitchen sink and behind the refrigerator"
          },
          {
            "id": "b",
            "text": "outdoors along the foundation"
          },
          {
            "id": "c",
            "text": "throughout the rooms, including higher spots such as behind wall hangings, inside furniture and near electronics"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Brownbanded cockroaches prefer warmer, drier spots than German cockroaches and are often found high up and away from the kitchen. Monitoring only at plumbing misses them.",
        "difficulty": "applied"
      },
      {
        "id": "ace-5-q18",
        "prompt": "A homeowner near woods sees a few winged cockroaches indoors in late spring. They fly to lights at night, and no nymphs are found inside. The most likely culprit is a",
        "options": [
          {
            "id": "a",
            "text": "German cockroach"
          },
          {
            "id": "b",
            "text": "wood cockroach (Parcoblatta)"
          },
          {
            "id": "c",
            "text": "brownbanded cockroach"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Male wood cockroaches fly well and wander indoors during mating season, but they do not breed in homes. Exclusion and changes to outdoor lighting are usually enough.",
        "difficulty": "applied"
      },
      {
        "id": "ace-5-q19",
        "prompt": "Cockroaches spread disease-causing organisms such as Salmonella mainly by",
        "options": [
          {
            "id": "a",
            "text": "biting people at night"
          },
          {
            "id": "b",
            "text": "injecting pathogens while feeding on blood"
          },
          {
            "id": "c",
            "text": "carrying pathogens on their bodies and in their droppings onto food and surfaces"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Cockroaches are mechanical carriers: they move from filth to food and contaminate what they touch. They do not feed on blood.",
        "difficulty": "recall"
      },
      {
        "id": "ace-5-q20",
        "prompt": "To find out whether cockroaches are hiding in a deep crevice behind a commercial stove, the technician should use",
        "options": [
          {
            "id": "a",
            "text": "a flushing agent, such as a short burst of pyrethrin aerosol"
          },
          {
            "id": "b",
            "text": "a moisture meter"
          },
          {
            "id": "c",
            "text": "a pheromone trap for stored product moths"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Flushing agents irritate hidden cockroaches and drive them into view, which confirms the harborage. The site can then be treated with bait or another targeted product.",
        "difficulty": "applied"
      },
      {
        "id": "ace-5-q21",
        "prompt": "Cockroaches prefer cracks where their bodies touch surfaces above and below. This behavior is called",
        "options": [
          {
            "id": "a",
            "text": "phototaxis"
          },
          {
            "id": "b",
            "text": "thigmotaxis"
          },
          {
            "id": "c",
            "text": "trophallaxis"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Thigmotaxis is a response to contact. It is why crack and crevice treatment and bait placement in tight spaces work so well; trophallaxis is food sharing.",
        "difficulty": "recall"
      },
      {
        "id": "ace-5-q22",
        "prompt": "After a juvenile hormone analog treatment, adult German cockroaches with twisted, crinkled wings begin to appear. This most likely means",
        "options": [
          {
            "id": "a",
            "text": "the IGR is working, producing deformed adults that cannot reproduce"
          },
          {
            "id": "b",
            "text": "the population has developed bait aversion"
          },
          {
            "id": "c",
            "text": "a second species has moved in"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Twisted wings are a classic sign of JH-analog exposure in the last nymphal stage. Such adults are usually sterile, so the population declines over time.",
        "difficulty": "id"
      },
      {
        "id": "ace-5-q23",
        "prompt": "Which pest cockroach relies most heavily on human structures, is rarely found living outdoors, and seldom flies?",
        "options": [
          {
            "id": "a",
            "text": "Asian cockroach"
          },
          {
            "id": "b",
            "text": "Smokybrown cockroach"
          },
          {
            "id": "c",
            "text": "German cockroach"
          }
        ],
        "correctOptionId": "c",
        "answerText": "German cockroaches depend on warm, humid indoor spaces such as kitchens and bathrooms. Asian and smokybrown cockroaches live mainly outdoors and fly.",
        "difficulty": "recall"
      },
      {
        "id": "ace-5-q24",
        "prompt": "American cockroaches keep appearing from floor drains in a building that is rarely used. A useful first step is to",
        "options": [
          {
            "id": "a",
            "text": "put gel bait in the bedrooms"
          },
          {
            "id": "b",
            "text": "check for dried-out drain traps, refill them or add trap primers, and fit drain covers"
          },
          {
            "id": "c",
            "text": "use an IGR aimed at German cockroaches"
          }
        ],
        "correctOptionId": "b",
        "answerText": "When a drain trap dries out, its water seal is lost and sewer cockroaches can walk straight in. Restoring the seal and adding covers closes the route.",
        "difficulty": "applied"
      },
      {
        "id": "ace-5-q25",
        "prompt": "For the best results with gel bait against German cockroaches, the technician should apply",
        "options": [
          {
            "id": "a",
            "text": "many small placements in or right next to harborage"
          },
          {
            "id": "b",
            "text": "a few large blobs in open areas of the floor"
          },
          {
            "id": "c",
            "text": "one bead along the full length of every countertop edge"
          }
        ],
        "correctOptionId": "a",
        "answerText": "German cockroaches forage only a short way from their hiding places. Many small spots close by reach more of them and waste less product.",
        "difficulty": "applied"
      }
    ]
  },
  {
    "id": "ace-6",
    "title": "Module 6. Ants",
    "questionCount": 25,
    "questions": [
      {
        "id": "ace-6-q1",
        "prompt": "Why does treating a pharaoh ant infestation with a repellent insecticide spray often make the problem worse?",
        "options": [
          {
            "id": "a",
            "text": "Sprays are not effective against any ant species."
          },
          {
            "id": "b",
            "text": "Repellent sprays cause pharaoh ant colonies to bud — fragmenting into multiple new colonies that spread throughout the structure."
          },
          {
            "id": "c",
            "text": "Pharaoh ants are resistant to all registered insecticides."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Budding. Pharaoh ants respond to stress by fragmenting colonies — repellent sprays trigger this response, creating more colonies. Baiting is the only appropriate control method.",
        "difficulty": "applied"
      },
      {
        "id": "ace-6-q2",
        "prompt": "Carpenter ant frass is distinguished from termite frass by",
        "options": [
          {
            "id": "a",
            "text": "its bright white color and fine powder consistency."
          },
          {
            "id": "b",
            "text": "the presence of insect fragments, pupal cases, and sawdust."
          },
          {
            "id": "c",
            "text": "the presence of hard, hexagonal pellets."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Insect fragments, pupal cases, and sawdust. Termite frass does not contain these. Hexagonal pellets are characteristic of drywood termites.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q3",
        "prompt": "Which anatomical feature most reliably distinguishes an ant from a termite swarmer?",
        "options": [
          {
            "id": "a",
            "text": "Ants have a constricted waist (petiole) and elbowed antennae; termites have a broad waist and straight antennae."
          },
          {
            "id": "b",
            "text": "Ants have wings; termites do not."
          },
          {
            "id": "c",
            "text": "Ants have 8 legs; termites have 6 legs."
          }
        ],
        "correctOptionId": "a",
        "answerText": "Ants have a distinct waist (petiole) and elbowed antennae; termite swarmers have no waist constriction and straight antennae. Both have 6 legs.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q4",
        "prompt": "Which ant species requires identification of workers rather than queens for accurate species ID?",
        "options": [
          {
            "id": "a",
            "text": "Only fire ants"
          },
          {
            "id": "b",
            "text": "Most ant species — worker morphology contains the key ID characters"
          },
          {
            "id": "c",
            "text": "Only pharaoh ants"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Most ant species. Queens and males often look similar across species. Workers carry the diagnostic characters (node number, antennal club, polymorphism) needed for ID.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q5",
        "prompt": "An odorous house ant infestation that keeps returning despite repeated treatments is most likely explained by",
        "options": [
          {
            "id": "a",
            "text": "insecticide resistance in the colony."
          },
          {
            "id": "b",
            "text": "polygynous colonies with multiple queens and satellite nests inside the structure."
          },
          {
            "id": "c",
            "text": "the ants are repelled by the insecticide to a nearby location, then return."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Multiple queens and satellite nests. Odorous house ants (Tapinoma sessile) have polygynous colonies with multiple queens and extensive satellite nesting — eliminating one visible nest rarely eliminates the colony.",
        "difficulty": "applied"
      },
      {
        "id": "ace-6-q6",
        "prompt": "An ant has a single node and a round opening at the tip of the gaster ringed with short hairs. It belongs to the subfamily",
        "options": [
          {
            "id": "a",
            "text": "Dolichoderinae"
          },
          {
            "id": "b",
            "text": "Formicinae"
          },
          {
            "id": "c",
            "text": "Myrmicinae"
          }
        ],
        "correctOptionId": "b",
        "answerText": "The fringed round opening (acidopore) belongs to Formicinae, including carpenter, crazy and rover ants. Dolichoderines have a slit-like opening, and myrmicines have two nodes and usually a sting.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q7",
        "prompt": "Fire ants, pavement ants and pharaoh ants all share which feature?",
        "options": [
          {
            "id": "a",
            "text": "A two-segmented waist (petiole plus postpetiole)"
          },
          {
            "id": "b",
            "text": "A fringed round opening at the tip of the gaster"
          },
          {
            "id": "c",
            "text": "No sting"
          }
        ],
        "correctOptionId": "a",
        "answerText": "All three are myrmicines, which have two nodes and a sting, although the sting is weak or rarely used in some species.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q8",
        "prompt": "Small dark ants trailing in a kitchen give off a smell like rotting coconut when crushed. The most likely species is the",
        "options": [
          {
            "id": "a",
            "text": "Argentine ant"
          },
          {
            "id": "b",
            "text": "pavement ant"
          },
          {
            "id": "c",
            "text": "odorous house ant"
          }
        ],
        "correctOptionId": "c",
        "answerText": "The coconut-like smell is the classic field clue for Tapinoma sessile. Argentine ants have, at most, a faint musty smell and a more upright node.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q9",
        "prompt": "A tiny yellowish ant has 10-segmented antennae ending in a two-segmented club. It nests outdoors and raids the brood of other ants. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "pharaoh ant"
          },
          {
            "id": "b",
            "text": "thief ant"
          },
          {
            "id": "c",
            "text": "ghost ant"
          }
        ],
        "correctOptionId": "b",
        "answerText": "The thief ant (Solenopsis molesta) has a two-segmented club on 10-segmented antennae. The pharaoh ant has 12 segments with a three-segmented club, and telling them apart changes the treatment plan.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q10",
        "prompt": "A very small ant has a dark head and thorax but a pale, almost see-through gaster and legs. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "ghost ant"
          },
          {
            "id": "b",
            "text": "pharaoh ant"
          },
          {
            "id": "c",
            "text": "rover ant"
          }
        ],
        "correctOptionId": "a",
        "answerText": "The two-toned look is typical of the ghost ant, Tapinoma melanocephalum, a sweet-feeding pest in warm regions and heated buildings. Pharaoh ants are evenly yellowish with a darker gaster tip.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q11",
        "prompt": "An ant with two nodes, fine lengthwise grooves on the head and thorax, and a pair of short spines on the back of the thorax is pushing soil up through sidewalk cracks. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "red imported fire ant"
          },
          {
            "id": "b",
            "text": "acrobat ant"
          },
          {
            "id": "c",
            "text": "pavement ant"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Grooved head and thorax plus small spines mark Tetramorium. They nest under slabs and pavers and often fight in large numbers on sidewalks in spring.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q12",
        "prompt": "An ant that raises its heart-shaped gaster over its body when disturbed is most likely",
        "options": [
          {
            "id": "a",
            "text": "a carpenter ant"
          },
          {
            "id": "b",
            "text": "an acrobat ant"
          },
          {
            "id": "c",
            "text": "a big-headed ant"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Crematogaster's waist joins the top of the gaster, so the gaster can be tipped up over the body. Acrobat ants often nest in moist or previously damaged wood.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q13",
        "prompt": "A large ant with workers of several sizes has a single node and an evenly rounded, arched thorax when viewed from the side. It is most likely",
        "options": [
          {
            "id": "a",
            "text": "a field ant (Formica)"
          },
          {
            "id": "b",
            "text": "an Argentine ant"
          },
          {
            "id": "c",
            "text": "a carpenter ant (Camponotus)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "An evenly curved thorax profile separates Camponotus from Formica, whose thorax has a dip. Argentine ants are small and all the same size.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q14",
        "prompt": "A dark ant with extremely long antennae and legs runs in fast, erratic paths across a countertop. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "rover ant"
          },
          {
            "id": "b",
            "text": "pharaoh ant"
          },
          {
            "id": "c",
            "text": "longhorn crazy ant"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Paratrechina longicornis gets its name from its long appendages and jerky, darting run. Rover ants are tiny, slow and have only nine antennal segments.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q15",
        "prompt": "After a 2010 revision, the tawny crazy ant and many other ants formerly placed in Paratrechina are now in the genus",
        "options": [
          {
            "id": "a",
            "text": "Nylanderia"
          },
          {
            "id": "b",
            "text": "Linepithema"
          },
          {
            "id": "c",
            "text": "Tapinoma"
          }
        ],
        "correctOptionId": "a",
        "answerText": "LaPolla and colleagues split Nylanderia off from Paratrechina. The tawny crazy ant is now Nylanderia fulva, while the longhorn crazy ant stays in Paratrechina.",
        "difficulty": "recall"
      },
      {
        "id": "ace-6-q16",
        "prompt": "A tiny brownish ant with nine-segmented antennae and no club, common in the South, is most likely the",
        "options": [
          {
            "id": "a",
            "text": "rover ant (Brachymyrmex)"
          },
          {
            "id": "b",
            "text": "thief ant"
          },
          {
            "id": "c",
            "text": "little black ant"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Nine antennal segments with no club is unusual and points to Brachymyrmex. Thief ants and little black ants have clubbed antennae and two nodes.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q17",
        "prompt": "Light-to-dark brown ants, all the same size, with a single upright node form wide, busy trails along a foundation. Colonies have many queens and nests seem to merge into one huge population. The most likely species is the",
        "options": [
          {
            "id": "a",
            "text": "Argentine ant"
          },
          {
            "id": "b",
            "text": "red imported fire ant"
          },
          {
            "id": "c",
            "text": "carpenter ant"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Linepithema humile forms enormous multi-queen networks with heavy trails. Fire ants come in many sizes and have two nodes, and carpenter ants are large and polymorphic.",
        "difficulty": "applied"
      },
      {
        "id": "ace-6-q18",
        "prompt": "A sunny lawn has dome-shaped soil mounds with no central opening, and they explode with aggressive stinging ants of mixed sizes when disturbed. The most likely ant is the",
        "options": [
          {
            "id": "a",
            "text": "harvester ant"
          },
          {
            "id": "b",
            "text": "red imported fire ant"
          },
          {
            "id": "c",
            "text": "pavement ant"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Fire ant workers enter through underground tunnels, so the mound has no central hole. Harvester ants have one central entrance surrounded by a cleared circle.",
        "difficulty": "applied"
      },
      {
        "id": "ace-6-q19",
        "prompt": "A large red ant colony sits in a bare, cleared circle of ground with a single central entrance, and the workers sting painfully. It is most likely a",
        "options": [
          {
            "id": "a",
            "text": "red imported fire ant colony"
          },
          {
            "id": "b",
            "text": "leafcutter ant colony"
          },
          {
            "id": "c",
            "text": "harvester ant colony"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Pogonomyrmex workers clear the vegetation around a single nest opening and collect seeds. Leafcutter nests have many crater-like openings.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q20",
        "prompt": "When is the best time to follow carpenter ant foraging trails back to the nest?",
        "options": [
          {
            "id": "a",
            "text": "Midday in summer"
          },
          {
            "id": "b",
            "text": "After dark on warm evenings"
          },
          {
            "id": "c",
            "text": "Midwinter, when activity is lowest"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Carpenter ants forage mostly at night. Trailing them with a red-filtered flashlight leads to parent and satellite nests.",
        "difficulty": "applied"
      },
      {
        "id": "ace-6-q21",
        "prompt": "Ants are ignoring a sweet gel bait. What is the best next step?",
        "options": [
          {
            "id": "a",
            "text": "Spray the trail with a repellent pyrethroid"
          },
          {
            "id": "b",
            "text": "Put out small test amounts of protein- or oil-based bait to see what they will take"
          },
          {
            "id": "c",
            "text": "Double the amount of the same sweet bait"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Food preferences vary by species and change with the colony's needs, for example when brood is growing. Small test placements show which bait matrix will be accepted.",
        "difficulty": "applied"
      },
      {
        "id": "ace-6-q22",
        "prompt": "What is the main advantage of a non-repellent liquid applied around a structure's perimeter for ants?",
        "options": [
          {
            "id": "a",
            "text": "Foragers walk through it without avoiding it, pick up a lethal dose and may pass it to nestmates"
          },
          {
            "id": "b",
            "text": "It keeps ants away from the house without killing them"
          },
          {
            "id": "c",
            "text": "It works without any label restrictions on application sites"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Ants cannot detect non-repellents, so they do not avoid treated areas, and delayed action allows transfer within the colony. Repellent sprays can scatter or split colonies.",
        "difficulty": "applied"
      },
      {
        "id": "ace-6-q23",
        "prompt": "Some workers in a colony have enormous heads compared with the rest, and soil is pushed up along a patio edge. The ant is most likely a",
        "options": [
          {
            "id": "a",
            "text": "carpenter ant"
          },
          {
            "id": "b",
            "text": "acrobat ant"
          },
          {
            "id": "c",
            "text": "big-headed ant (Pheidole)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Pheidole colonies have two worker forms, with majors carrying oversized heads. Carpenter ants have a range of sizes, but their heads are not that out of proportion.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q24",
        "prompt": "In Florida, huge numbers of small black ants with pale yellowish feet trail along exterior walls. They have a single node, no sting and no noticeable odor. The most likely species is the",
        "options": [
          {
            "id": "a",
            "text": "ghost ant"
          },
          {
            "id": "b",
            "text": "white-footed ant"
          },
          {
            "id": "c",
            "text": "little black ant"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Technomyrmex difficilis is named for its pale tarsi and builds very large colonies in warm coastal areas. Little black ants have two nodes, and ghost ants have a pale gaster.",
        "difficulty": "id"
      },
      {
        "id": "ace-6-q25",
        "prompt": "The widely recommended 'two-step method' for fire ants in lawns means",
        "options": [
          {
            "id": "a",
            "text": "broadcasting a bait over the whole area, then treating individual problem mounds"
          },
          {
            "id": "b",
            "text": "drenching every mound twice a week"
          },
          {
            "id": "c",
            "text": "digging out mounds, then refilling them with sand"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Broadcast bait reaches colonies you cannot see, and individual mound treatment gives quick relief where people are. It cuts total insecticide use compared with treating every mound.",
        "difficulty": "applied"
      }
    ]
  },
  {
    "id": "ace-7",
    "title": "Module 7. Flies",
    "questionCount": 25,
    "questions": [
      {
        "id": "ace-7-q1",
        "prompt": "Large numbers of blow flies appear inside a home in the middle of winter. What should the inspection look for first?",
        "options": [
          {
            "id": "a",
            "text": "A dead animal, such as a rodent or bird, in a wall void, attic or chimney"
          },
          {
            "id": "b",
            "text": "Overwatered houseplants"
          },
          {
            "id": "c",
            "text": "Rotting fruit on the counter"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Blow flies breed in carcasses. A sudden indoor emergence usually means a dead animal inside the structure, so finding and removing the carcass is the fix.",
        "difficulty": "applied"
      },
      {
        "id": "ace-7-q2",
        "prompt": "Small fuzzy flies with moth-like wings held roof-like over the body are resting on a bathroom wall, and larvae are found in the film inside a drain. Which fly is it?",
        "options": [
          {
            "id": "a",
            "text": "Drain fly (moth fly)"
          },
          {
            "id": "b",
            "text": "Fungus gnat"
          },
          {
            "id": "c",
            "text": "Fruit fly"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Drain flies (family Psychodidae) breed in the gelatinous organic film inside drains. Cleaning the film out of the drain line is the main control step.",
        "difficulty": "applied"
      },
      {
        "id": "ace-7-q3",
        "prompt": "A client describes a fly that looks identical to a house fly but bites. The most likely species is",
        "options": [
          {
            "id": "a",
            "text": "cluster fly"
          },
          {
            "id": "b",
            "text": "stable fly"
          },
          {
            "id": "c",
            "text": "blow fly"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Stable fly. The stable fly is visually similar to a house fly but has piercing-sucking mouthparts — if it looks like a house fly but bites, it's a stable fly.",
        "difficulty": "id"
      },
      {
        "id": "ace-7-q4",
        "prompt": "Cluster flies (Pollenia rudis) differ from house flies in that they",
        "options": [
          {
            "id": "a",
            "text": "breed in manure and garbage."
          },
          {
            "id": "b",
            "text": "are outdoor parasites of earthworms that enter structures to overwinter."
          },
          {
            "id": "c",
            "text": "transmit more than 100 pathogens."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Outdoor parasites of earthworms that overwinter in structures. Cluster flies do not breed indoors or in filth.",
        "difficulty": "id"
      },
      {
        "id": "ace-7-q5",
        "prompt": "The most effective long-term control for small flies (fruit flies, drain flies, phorid flies) is",
        "options": [
          {
            "id": "a",
            "text": "space sprays applied twice weekly to flying adults."
          },
          {
            "id": "b",
            "text": "locating and eliminating the organic breeding source."
          },
          {
            "id": "c",
            "text": "installing UV light traps above all drains."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Eliminating the breeding source. Without source elimination, small fly populations regenerate continuously regardless of adult kill.",
        "difficulty": "applied"
      },
      {
        "id": "ace-7-q6",
        "prompt": "A tiny fuzzy fly with broad, hairy wings folded like a tent over its back rests on a shower wall. It is most likely a",
        "options": [
          {
            "id": "a",
            "text": "fruit fly"
          },
          {
            "id": "b",
            "text": "phorid fly"
          },
          {
            "id": "c",
            "text": "moth fly (Psychodidae)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Moth or drain flies are covered in hairs and look like tiny moths. Their larvae live in the slimy film inside drains and other wet organic buildup.",
        "difficulty": "id"
      },
      {
        "id": "ace-7-q7",
        "prompt": "A small hump-backed fly tends to run quickly across surfaces before it flies. It is most likely a",
        "options": [
          {
            "id": "a",
            "text": "phorid fly"
          },
          {
            "id": "b",
            "text": "fungus gnat"
          },
          {
            "id": "c",
            "text": "moth fly"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Phorids (scuttle flies) are known for the arched thorax and darting run. Fungus gnats are slender and long-legged, and moth flies are fuzzy.",
        "difficulty": "id"
      },
      {
        "id": "ace-7-q8",
        "prompt": "Phorid flies keep coming back in a restaurant even after every drain has been cleaned. What is the most likely hidden source?",
        "options": [
          {
            "id": "a",
            "text": "A broken drain or sewer line under the slab, soaking the soil with organic matter"
          },
          {
            "id": "b",
            "text": "Potted plants in the dining room"
          },
          {
            "id": "c",
            "text": "Ripe fruit at the bar"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Phorid larvae breed in decaying, wet organic material, including soil saturated by leaking sewage. Finding and repairing the leak is often the only lasting fix.",
        "difficulty": "applied"
      },
      {
        "id": "ace-7-q9",
        "prompt": "In flies, the hind wings are reduced to small knobbed balancing organs called",
        "options": [
          {
            "id": "a",
            "text": "elytra"
          },
          {
            "id": "b",
            "text": "halteres"
          },
          {
            "id": "c",
            "text": "hemelytra"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Halteres help flies stay stable in flight and are why Diptera seem to fly on a single pair of wings. Elytra are beetle wing covers, and hemelytra are true bug front wings.",
        "difficulty": "recall"
      },
      {
        "id": "ace-7-q10",
        "prompt": "What is the best way to control fungus gnats breeding in office potted plants?",
        "options": [
          {
            "id": "a",
            "text": "Weekly space sprays in the office"
          },
          {
            "id": "b",
            "text": "Enzyme drain gel in the restrooms"
          },
          {
            "id": "c",
            "text": "Let the soil dry between waterings, remove badly infested plants, and drench the soil with Bti if needed"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Fungus gnat larvae need constantly moist, organic potting soil. Cutting back on watering breaks the cycle, and Bti targets the larvae directly.",
        "difficulty": "applied"
      },
      {
        "id": "ace-7-q11",
        "prompt": "Larger, dark-eyed Drosophila are found around floor drains, garbage containers and dish machines rather than fruit. They are most likely",
        "options": [
          {
            "id": "a",
            "text": "dark-eyed fruit flies such as Drosophila repleta"
          },
          {
            "id": "b",
            "text": "cluster flies"
          },
          {
            "id": "c",
            "text": "blow flies"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Dark-eyed fruit flies breed in fermenting organic matter in drains and refuse. Cleaning those sites, not just removing fruit, is needed.",
        "difficulty": "id"
      },
      {
        "id": "ace-7-q12",
        "prompt": "In midwinter, large metallic blue-green flies suddenly appear at the windows of a house, along with a bad odor from one wall. The most likely cause is",
        "options": [
          {
            "id": "a",
            "text": "cluster flies coming out of overwintering spots"
          },
          {
            "id": "b",
            "text": "blow flies that developed on a dead animal in the wall"
          },
          {
            "id": "c",
            "text": "house flies coming in through open doors"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Metallic coloring plus a smell points to blow flies breeding on carrion such as a dead rodent. Cluster flies are dull gray with golden hairs and come with no odor.",
        "difficulty": "applied"
      },
      {
        "id": "ace-7-q13",
        "prompt": "A gray fly with three dark stripes on the thorax and a checkerboard-patterned abdomen is most likely a",
        "options": [
          {
            "id": "a",
            "text": "blow fly"
          },
          {
            "id": "b",
            "text": "house fly"
          },
          {
            "id": "c",
            "text": "flesh fly"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Flesh flies (Sarcophagidae) show three thoracic stripes and a checkered abdomen. House flies have four stripes, and blow flies are usually metallic.",
        "difficulty": "id"
      },
      {
        "id": "ace-7-q14",
        "prompt": "House flies are numerous near a restaurant's back door. Where should the inspection start?",
        "options": [
          {
            "id": "a",
            "text": "The dumpster and garbage area, checking for larvae and how often it is cleaned"
          },
          {
            "id": "b",
            "text": "Floor drains in the dining room"
          },
          {
            "id": "c",
            "text": "Potted plants on the patio"
          }
        ],
        "correctOptionId": "a",
        "answerText": "House flies most often breed in garbage and manure, and a poorly kept dumpster is the usual source at commercial sites. Fixing sanitation there comes before anything else.",
        "difficulty": "applied"
      },
      {
        "id": "ace-7-q15",
        "prompt": "In hot summer weather, a house fly can go from egg to adult in about",
        "options": [
          {
            "id": "a",
            "text": "two months"
          },
          {
            "id": "b",
            "text": "one week to ten days"
          },
          {
            "id": "c",
            "text": "one year"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Short generation times explain how quickly fly populations build. Removing breeding material at least weekly breaks the cycle.",
        "difficulty": "recall"
      },
      {
        "id": "ace-7-q16",
        "prompt": "What gives the best long-term mosquito control around a home?",
        "options": [
          {
            "id": "a",
            "text": "Running an electric bug zapper all night"
          },
          {
            "id": "b",
            "text": "Fogging the yard once a week"
          },
          {
            "id": "c",
            "text": "Getting rid of containers and other spots that hold water for a week or more"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Removing larval habitat stops mosquitoes at the source. Zappers kill few mosquitoes, and fogging only kills the adults present at that moment.",
        "difficulty": "applied"
      },
      {
        "id": "ace-7-q17",
        "prompt": "A black-and-white mosquito bites during the day and breeds in small backyard containers. It is most likely",
        "options": [
          {
            "id": "a",
            "text": "Aedes albopictus (Asian tiger mosquito)"
          },
          {
            "id": "b",
            "text": "Culex pipiens (northern house mosquito)"
          },
          {
            "id": "c",
            "text": "Anopheles quadrimaculatus"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Aedes container breeders bite in daytime and have bold white markings. Culex species mostly bite from evening into night.",
        "difficulty": "id"
      },
      {
        "id": "ace-7-q18",
        "prompt": "Which mosquito genus is the main vector of West Nile virus in the United States?",
        "options": [
          {
            "id": "a",
            "text": "Aedes"
          },
          {
            "id": "b",
            "text": "Culex"
          },
          {
            "id": "c",
            "text": "Anopheles"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Culex mosquitoes, which often breed in polluted standing water, pass West Nile virus between birds and people. Anopheles are known for malaria.",
        "difficulty": "recall"
      },
      {
        "id": "ace-7-q19",
        "prompt": "Bti (Bacillus thuringiensis israelensis) placed in standing water controls mosquitoes by",
        "options": [
          {
            "id": "a",
            "text": "killing adults as they land on the water"
          },
          {
            "id": "b",
            "text": "acting as a juvenile hormone mimic"
          },
          {
            "id": "c",
            "text": "producing toxins that kill larvae when they eat it"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Bti is a bacterial larvicide that must be eaten to work. It is very selective for mosquito, black fly and fungus gnat larvae.",
        "difficulty": "recall"
      },
      {
        "id": "ace-7-q20",
        "prompt": "A client is alarmed by 'giant mosquitoes' with very long, fragile legs resting on the house in spring. They do not bite. They are most likely",
        "options": [
          {
            "id": "a",
            "text": "crane flies, which do not bite and need no control"
          },
          {
            "id": "b",
            "text": "Asian tiger mosquitoes"
          },
          {
            "id": "c",
            "text": "midges that transmit disease"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Crane flies (Tipulidae) look like oversized mosquitoes but cannot bite. They show up seasonally, and educating the client is usually enough.",
        "difficulty": "id"
      },
      {
        "id": "ace-7-q21",
        "prompt": "Tough, flattened, leathery fly larvae are crawling across a floor some distance from a compost or manure pile. They are most likely",
        "options": [
          {
            "id": "a",
            "text": "house fly maggots"
          },
          {
            "id": "b",
            "text": "soldier fly larvae"
          },
          {
            "id": "c",
            "text": "fungus gnat larvae"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Soldier fly larvae have a tougher skin than most fly larvae, so they resist drying out and can wander far. House fly maggots are soft and pale, tapering to a point at the head.",
        "difficulty": "id"
      },
      {
        "id": "ace-7-q22",
        "prompt": "A large fly with big, often colorful eyes bites painfully around a farm pond in summer, and only the females bite. It most likely belongs to the family",
        "options": [
          {
            "id": "a",
            "text": "Calliphoridae"
          },
          {
            "id": "b",
            "text": "Muscidae"
          },
          {
            "id": "c",
            "text": "Tabanidae"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Horse flies and deer flies (Tabanidae) slash skin to feed on blood, and their larvae develop in wet soil and shallow water. Blow flies (Calliphoridae) do not bite.",
        "difficulty": "id"
      },
      {
        "id": "ace-7-q23",
        "prompt": "When should exclusion work be done to keep cluster flies out of a home?",
        "options": [
          {
            "id": "a",
            "text": "In late summer, before the flies look for overwintering sites"
          },
          {
            "id": "b",
            "text": "In midwinter, when the flies are dormant"
          },
          {
            "id": "c",
            "text": "In spring, as they leave"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Cluster flies gather on sunny walls in late summer and fall and slip into cracks. Sealing has to be finished before then; once they are in the walls, vacuuming is the main option.",
        "difficulty": "applied"
      },
      {
        "id": "ace-7-q24",
        "prompt": "Stable flies most often breed in",
        "options": [
          {
            "id": "a",
            "text": "clean, moving water"
          },
          {
            "id": "b",
            "text": "wet, decaying plant material mixed with manure, such as old hay, silage or rotting grass clippings"
          },
          {
            "id": "c",
            "text": "the slime layer inside sink drains"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Stable fly larvae develop in fermenting, wet vegetation, often mixed with animal waste. Removing or drying those materials is the key to control.",
        "difficulty": "recall"
      },
      {
        "id": "ace-7-q25",
        "prompt": "Small flies are emerging in a dry storeroom where no fruit is kept. What is the most productive way to inspect?",
        "options": [
          {
            "id": "a",
            "text": "Treat the ceiling with a residual spray"
          },
          {
            "id": "b",
            "text": "Look for hidden moist organic buildup, such as spills under shelving, wet mop heads, drains and leaking equipment"
          },
          {
            "id": "c",
            "text": "Install a light trap and wait"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Fly larvae need moisture, so the source is almost always somewhere wet. Finding and removing it is what actually ends the problem.",
        "difficulty": "applied"
      }
    ]
  },
  {
    "id": "ace-8",
    "title": "Module 8. Biting & Stinging Arthropods",
    "questionCount": 26,
    "questions": [
      {
        "id": "ace-8-q1",
        "prompt": "Which finding is the most reliable confirmation of an active bed bug infestation?",
        "options": [
          {
            "id": "a",
            "text": "Live bed bugs or viable eggs"
          },
          {
            "id": "b",
            "text": "A client's bite marks"
          },
          {
            "id": "c",
            "text": "A musty odor in the room"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Live bugs or viable eggs confirm activity. Bite reactions vary from person to person and can have other causes, and odor alone is not diagnostic.",
        "difficulty": "applied"
      },
      {
        "id": "ace-8-q2",
        "prompt": "A flea larva differs from an adult flea in that the larva",
        "options": [
          {
            "id": "a",
            "text": "lives on the host animal and feeds on blood."
          },
          {
            "id": "b",
            "text": "lives in the environment and feeds on organic debris including adult flea feces."
          },
          {
            "id": "c",
            "text": "is wingless and laterally flattened."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Lives in the environment feeding on organic debris including dried blood from adult flea feces. Only adult fleas live on the host.",
        "difficulty": "id"
      },
      {
        "id": "ace-8-q3",
        "prompt": "Which spider is most associated with neurotoxic venom in the United States?",
        "options": [
          {
            "id": "a",
            "text": "Brown recluse (Loxosceles reclusa)"
          },
          {
            "id": "b",
            "text": "Black widow (Latrodectus sp.)"
          },
          {
            "id": "c",
            "text": "Hobo spider (Eratigena agrestis)"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Black widow. It produces neurotoxic venom. Brown recluse produces necrotic venom. Hobo spider is not currently considered a medically significant species.",
        "difficulty": "id"
      },
      {
        "id": "ace-8-q4",
        "prompt": "Which tick is the primary vector of Lyme disease in the eastern United States?",
        "options": [
          {
            "id": "a",
            "text": "American dog tick (Dermacentor variabilis)"
          },
          {
            "id": "b",
            "text": "Brown dog tick (Rhipicephalus sanguineus)"
          },
          {
            "id": "c",
            "text": "Black-legged deer tick (Ixodes scapularis)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Black-legged deer tick (Ixodes scapularis). American dog tick vectors Rocky Mountain spotted fever; lone star tick vectors tularemia.",
        "difficulty": "id"
      },
      {
        "id": "ace-8-q5",
        "prompt": "Failing to remove a honey bee nest from a wall void can lead to",
        "options": [
          {
            "id": "a",
            "text": "the bees becoming permanently docile and non-defensive."
          },
          {
            "id": "b",
            "text": "comb melt, honey fermentation, structural staining, and secondary infestations of cockroaches, carpet beetles, and rodents."
          },
          {
            "id": "c",
            "text": "bees dying off within a few weeks once the colony is treated."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Comb melt and secondary infestations. Dead comb releases wax and honey, creating odors, structural damage, and drawing secondary pests — including cockroaches, carpet beetles, wax moths, and rodents.",
        "difficulty": "applied"
      },
      {
        "id": "ace-8-q6",
        "prompt": "Scorpions can be detected at night using",
        "options": [
          {
            "id": "a",
            "text": "pheromone traps"
          },
          {
            "id": "b",
            "text": "UV/black light — scorpions fluoresce under ultraviolet"
          },
          {
            "id": "c",
            "text": "CO2 monitors"
          }
        ],
        "correctOptionId": "b",
        "answerText": "UV/black light. Scorpions fluoresce brightly under ultraviolet light — this is a practical field detection technique.",
        "difficulty": "recall"
      },
      {
        "id": "ace-8-q7",
        "prompt": "An unfed adult bed bug is best described as",
        "options": [
          {
            "id": "a",
            "text": "round, black and pinhead-sized"
          },
          {
            "id": "b",
            "text": "flat, oval, reddish-brown and about as big as an apple seed"
          },
          {
            "id": "c",
            "text": "long and slender, with fully developed wings"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Adult Cimex lectularius are about 1/4 inch long, flat when unfed, and swell and lengthen after feeding. They have only tiny wing pads and cannot fly.",
        "difficulty": "id"
      },
      {
        "id": "ace-8-q8",
        "prompt": "Which finding is the strongest evidence of a bed bug infestation?",
        "options": [
          {
            "id": "a",
            "text": "Live bugs, cast skins and dark fecal spotting along mattress seams or furniture joints"
          },
          {
            "id": "b",
            "text": "Itchy red welts on the client's arms"
          },
          {
            "id": "c",
            "text": "Dust on the bed frame"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Bite reactions vary widely, and many people do not react at all, so bites cannot confirm bed bugs. Physical evidence of the insects is needed before treating.",
        "difficulty": "applied"
      },
      {
        "id": "ace-8-q9",
        "prompt": "Bed-bug-like insects with long fringe hairs on the pronotum are biting people in a bedroom under an attic that houses a bat colony. What is the best plan?",
        "options": [
          {
            "id": "a",
            "text": "Treat only the mattress, because these are ordinary bed bugs"
          },
          {
            "id": "b",
            "text": "Identify them as bat bugs, exclude the bats as wildlife law allows, then treat the roost area and rooms"
          },
          {
            "id": "c",
            "text": "Leave the bats and fog the bedroom"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Bat bugs are close relatives of bed bugs that bite people when their bat hosts leave or are removed. Removing the host safely and legally is essential, or the problem keeps returning.",
        "difficulty": "applied"
      },
      {
        "id": "ace-8-q10",
        "prompt": "A family comes home after two weeks away and is immediately bitten by many fleas. What is the best explanation?",
        "options": [
          {
            "id": "a",
            "text": "Adult fleas that had developed and were waiting in their cocoons emerged when they sensed vibration, warmth and carbon dioxide"
          },
          {
            "id": "b",
            "text": "Flea larvae started biting while the family was gone"
          },
          {
            "id": "c",
            "text": "Fleas came in through window screens from a neighbor's yard"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Fully formed adults can stay in the cocoon until a host arrives. That is also why the pupal stage resists treatment and vacuuming before service helps.",
        "difficulty": "applied"
      },
      {
        "id": "ace-8-q11",
        "prompt": "The flea most often found on both cats and dogs in the United States is the",
        "options": [
          {
            "id": "a",
            "text": "dog flea (Ctenocephalides canis)"
          },
          {
            "id": "b",
            "text": "oriental rat flea (Xenopsylla cheopis)"
          },
          {
            "id": "c",
            "text": "cat flea (Ctenocephalides felis)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Despite its name, the cat flea is the usual flea on dogs too. It also carries the dog tapeworm and causes flea allergy dermatitis.",
        "difficulty": "recall"
      },
      {
        "id": "ace-8-q12",
        "prompt": "Applying methoprene or pyriproxyfen to carpets as part of a flea program mainly",
        "options": [
          {
            "id": "a",
            "text": "kills adult fleas on the pet within minutes"
          },
          {
            "id": "b",
            "text": "keeps eggs and larvae in the environment from developing into adults"
          },
          {
            "id": "c",
            "text": "repels fleas from treated rooms"
          }
        ],
        "correctOptionId": "b",
        "answerText": "These juvenile hormone analogs stop development, so they break the cycle over weeks. Adult control comes from on-animal treatment by the veterinarian and adulticides where labeled.",
        "difficulty": "recall"
      },
      {
        "id": "ace-8-q13",
        "prompt": "A large honey bee swarm is hanging in a cluster on a shrub in a client's yard. What is the best advice?",
        "options": [
          {
            "id": "a",
            "text": "Spray it right away with a residual insecticide"
          },
          {
            "id": "b",
            "text": "Seal the nearest wall openings and contact a local beekeeper; a swarm usually moves on within a few days"
          },
          {
            "id": "c",
            "text": "Hose it down with water to make it leave faster"
          }
        ],
        "correctOptionId": "b",
        "answerText": "A swarm is a temporary cluster looking for a new home and is usually not very defensive. Beekeepers can often collect it, and sealing gaps keeps it from moving into the walls.",
        "difficulty": "applied"
      },
      {
        "id": "ace-8-q14",
        "prompt": "Which chigger life stage feeds on people?",
        "options": [
          {
            "id": "a",
            "text": "The six-legged larva"
          },
          {
            "id": "b",
            "text": "The eight-legged nymph"
          },
          {
            "id": "c",
            "text": "The adult mite"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Only the larva is parasitic. It does not burrow; it dissolves skin cells through a feeding tube and then drops off. Nymphs and adults are free-living predators in soil.",
        "difficulty": "recall"
      },
      {
        "id": "ace-8-q15",
        "prompt": "A customer whose doctor diagnosed scabies asks for the whole house to be sprayed. What is the best response?",
        "options": [
          {
            "id": "a",
            "text": "Treat every room with a residual spray"
          },
          {
            "id": "b",
            "text": "Fog the house the same day"
          },
          {
            "id": "c",
            "text": "Explain that scabies mites live in human skin and are treated by a physician, so a structural pesticide treatment is not warranted"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Scabies, like head and crab lice, is a medical problem handled with medicated creams, lotions or shampoos plus laundering. Spraying the house adds exposure without benefit.",
        "difficulty": "applied"
      },
      {
        "id": "ace-8-q16",
        "prompt": "Which louse lives and lays eggs mainly in the seams of clothing and can transmit epidemic typhus?",
        "options": [
          {
            "id": "a",
            "text": "Body louse"
          },
          {
            "id": "b",
            "text": "Head louse"
          },
          {
            "id": "c",
            "text": "Crab louse"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Body lice spend most of their time in clothing and visit the skin to feed, which is why laundering and hygiene control them. Head lice are not known to carry disease.",
        "difficulty": "id"
      },
      {
        "id": "ace-8-q17",
        "prompt": "Unlike most hard ticks, which tick can complete its whole life cycle indoors in homes and kennels?",
        "options": [
          {
            "id": "a",
            "text": "Blacklegged tick"
          },
          {
            "id": "b",
            "text": "Lone star tick"
          },
          {
            "id": "c",
            "text": "Brown dog tick"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Rhipicephalus sanguineus can infest buildings, with all stages hiding in cracks and behind baseboards. Most other ticks people encounter are picked up outdoors.",
        "difficulty": "recall"
      },
      {
        "id": "ace-8-q18",
        "prompt": "Which feature most reliably identifies a recluse spider?",
        "options": [
          {
            "id": "a",
            "text": "A violin-shaped mark, on its own"
          },
          {
            "id": "b",
            "text": "Six eyes arranged in three pairs"
          },
          {
            "id": "c",
            "text": "A red hourglass under the abdomen"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Most spiders have eight eyes; recluses have six in three pairs. Many harmless spiders have dark marks that look like a violin, and the hourglass belongs to widows.",
        "difficulty": "id"
      },
      {
        "id": "ace-8-q19",
        "prompt": "A shiny black spider with a red hourglass under its abdomen hangs in a messy, irregular web low in a garden shed. It is most likely a",
        "options": [
          {
            "id": "a",
            "text": "harmless cellar spider"
          },
          {
            "id": "b",
            "text": "brown recluse, with necrotic venom"
          },
          {
            "id": "c",
            "text": "black widow, with neurotoxic venom"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Female Latrodectus build tangled cobwebs in sheltered, undisturbed spots. Their venom acts on the nervous system.",
        "difficulty": "id"
      },
      {
        "id": "ace-8-q20",
        "prompt": "A pale yellowish spider hides by day in a small silk sac where a wall meets the ceiling and hunts at night without a capture web. It is most likely a",
        "options": [
          {
            "id": "a",
            "text": "funnel weaver"
          },
          {
            "id": "b",
            "text": "cellar spider"
          },
          {
            "id": "c",
            "text": "yellow sac spider (Cheiracanthium)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Sac spiders build silk retreats rather than webs for catching prey. Their bites can be painful but are usually minor.",
        "difficulty": "id"
      },
      {
        "id": "ace-8-q21",
        "prompt": "Which U.S. scorpion is the most medically important and is known for climbing walls and hiding indoors in the Southwest?",
        "options": [
          {
            "id": "a",
            "text": "Arizona bark scorpion (Centruroides sculpturatus)"
          },
          {
            "id": "b",
            "text": "Striped bark scorpion (Centruroides vittatus)"
          },
          {
            "id": "c",
            "text": "Giant desert hairy scorpion (Hadrurus arizonensis)"
          }
        ],
        "correctOptionId": "a",
        "answerText": "The Arizona bark scorpion has the most potent venom of any U.S. species and climbs easily. The giant hairy scorpion is large and intimidating but much less dangerous.",
        "difficulty": "id"
      },
      {
        "id": "ace-8-q22",
        "prompt": "A large black-and-white wasp is going in and out of a gray, football-shaped paper nest high in a tree. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "European hornet"
          },
          {
            "id": "b",
            "text": "bald-faced hornet"
          },
          {
            "id": "c",
            "text": "paper wasp"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Dolichovespula maculata is really an aerial yellowjacket, black with white markings, that builds an enclosed paper envelope nest. Paper wasps build an open, single comb.",
        "difficulty": "id"
      },
      {
        "id": "ace-8-q23",
        "prompt": "A single, open paper comb with exposed cells hangs from a stalk under the eaves. It was built by",
        "options": [
          {
            "id": "a",
            "text": "yellowjackets"
          },
          {
            "id": "b",
            "text": "honey bees"
          },
          {
            "id": "c",
            "text": "paper wasps (Polistes)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Polistes nests look like an upside-down umbrella with no outer covering. Yellowjackets enclose their combs in a paper envelope, often underground.",
        "difficulty": "id"
      },
      {
        "id": "ace-8-q24",
        "prompt": "In the temperate United States, what happens to a typical yellowjacket colony in late fall?",
        "options": [
          {
            "id": "a",
            "text": "It moves into the house to spend the winter"
          },
          {
            "id": "b",
            "text": "It survives the winter and grows larger the next year"
          },
          {
            "id": "c",
            "text": "It dies out, and only newly mated queens overwinter, in sheltered places"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Yellowjacket colonies are annual in cold climates. Foraging and stinging peak in late summer and fall, just before the colony declines.",
        "difficulty": "recall"
      },
      {
        "id": "ace-8-q25",
        "prompt": "Yellowjackets are using a gap in siding to reach a nest in a wall void. Why should the hole NOT be sealed before the nest is eliminated?",
        "options": [
          {
            "id": "a",
            "text": "Trapped workers may chew through drywall into the living space"
          },
          {
            "id": "b",
            "text": "Sealing it is illegal under FIFRA"
          },
          {
            "id": "c",
            "text": "The colony will die within hours anyway"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Blocked yellowjackets look for another exit, sometimes into rooms. Treat the nest, confirm activity has stopped, then seal.",
        "difficulty": "applied"
      },
      {
        "id": "ace-8-q26",
        "prompt": "Which tick is linked to alpha-gal syndrome (a red-meat allergy) and to ehrlichiosis, and the adult female has a single white spot on her back?",
        "options": [
          {
            "id": "a",
            "text": "Blacklegged tick"
          },
          {
            "id": "b",
            "text": "Lone star tick"
          },
          {
            "id": "c",
            "text": "American dog tick"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Amblyomma americanum gets its name from the female's white spot. The blacklegged tick transmits Lyme disease, and the American dog tick transmits Rocky Mountain spotted fever.",
        "difficulty": "id"
      }
    ]
  },
  {
    "id": "ace-9",
    "title": "Module 9. Occasional Invaders",
    "questionCount": 24,
    "questions": [
      {
        "id": "ace-9-q1",
        "prompt": "Which step does the most to keep overwintering lady beetles and stink bugs out of a home?",
        "options": [
          {
            "id": "a",
            "text": "Sealing gaps around windows, siding, utilities and soffits before they gather in fall"
          },
          {
            "id": "b",
            "text": "Fogging the living space in midwinter"
          },
          {
            "id": "c",
            "text": "Placing insecticide baits indoors"
          }
        ],
        "correctOptionId": "a",
        "answerText": "These insects enter through gaps when they look for overwintering sites in fall. Exclusion before they aggregate prevents the problem; once they are inside wall voids, indoor treatments do little.",
        "difficulty": "applied"
      },
      {
        "id": "ace-9-q2",
        "prompt": "Boxelder bugs gathering on a house in fall usually point to which nearby host?",
        "options": [
          {
            "id": "a",
            "text": "Seed-bearing (female) boxelder trees, and sometimes maples"
          },
          {
            "id": "b",
            "text": "Pine trees"
          },
          {
            "id": "c",
            "text": "Turfgrass"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Boxelder bugs feed on the seeds of female boxelder trees and also use maples. Homes near these trees see the fall aggregations.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q3",
        "prompt": "The primary control strategy for occasional invaders is",
        "options": [
          {
            "id": "a",
            "text": "broadcast indoor insecticide application."
          },
          {
            "id": "b",
            "text": "exclusion — sealing entry points before the pest's seasonal migration."
          },
          {
            "id": "c",
            "text": "baiting with attractants placed in living areas."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Exclusion before seasonal migration. Since occasional invaders don't breed indoors, keeping them out is far more effective than treating after they've entered.",
        "difficulty": "applied"
      },
      {
        "id": "ace-9-q4",
        "prompt": "Millipedes in and around a structure are most effectively controlled by",
        "options": [
          {
            "id": "a",
            "text": "applying an indoor broadcast insecticide."
          },
          {
            "id": "b",
            "text": "reducing moisture and removing leaf litter and decaying organic debris around the structure."
          },
          {
            "id": "c",
            "text": "installing light traps in the basement."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Moisture reduction and organic debris removal. Millipedes require moisture and feed on decaying plant material — eliminating these conditions eliminates the millipede habitat.",
        "difficulty": "applied"
      },
      {
        "id": "ace-9-q5",
        "prompt": "In autumn, black bugs with red lines on the pronotum and wing edges gather by the hundreds on the sunny side of a house next to a large maple tree. They are most likely",
        "options": [
          {
            "id": "a",
            "text": "boxelder bugs"
          },
          {
            "id": "b",
            "text": "kissing bugs"
          },
          {
            "id": "c",
            "text": "brown marmorated stink bugs"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Boxelder bugs feed on the seeds of boxelder and some maples, then look for overwintering sites. They are a nuisance only and do not bite or breed indoors.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q6",
        "prompt": "A large brown bug with flattened, leaf-like widenings on its hind legs flies indoors with a loud buzz in fall. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "boxelder bug"
          },
          {
            "id": "b",
            "text": "western conifer seed bug"
          },
          {
            "id": "c",
            "text": "wheel bug"
          }
        ],
        "correctOptionId": "b",
        "answerText": "The western conifer seed bug is a leaf-footed bug that feeds on conifer seeds and overwinters in buildings. It is harmless but can smell when handled.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q7",
        "prompt": "A shield-shaped, mottled brown bug with light bands on its antennae is crawling on window frames in the fall. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "boxelder bug"
          },
          {
            "id": "b",
            "text": "elm leaf beetle"
          },
          {
            "id": "c",
            "text": "brown marmorated stink bug"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Halyomorpha halys is an invasive stink bug that shelters in homes over winter. The banded antennae help separate it from native brown stink bugs.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q8",
        "prompt": "What is the best way to remove multicolored Asian lady beetles that are already inside a home?",
        "options": [
          {
            "id": "a",
            "text": "Sweep them up and crush them"
          },
          {
            "id": "b",
            "text": "Vacuum them up and empty or discard the bag promptly"
          },
          {
            "id": "c",
            "text": "Set off a fogger in the living area"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Crushed or disturbed beetles release a yellow, smelly fluid that stains. Vacuuming removes them cleanly, and sealing entry points before fall prevents the next year's invasion.",
        "difficulty": "applied"
      },
      {
        "id": "ace-9-q9",
        "prompt": "A fast-moving arthropod with 15 pairs of very long legs is catching insects in a damp basement. It is most likely a",
        "options": [
          {
            "id": "a",
            "text": "house centipede"
          },
          {
            "id": "b",
            "text": "millipede"
          },
          {
            "id": "c",
            "text": "silverfish"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Scutigera coleoptrata is a predator with very long legs. Millipedes move slowly, have two pairs of legs per segment and feed on decaying plant material.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q10",
        "prompt": "A gray, segmented, armored arthropod rolls into a tight ball when touched. It is a",
        "options": [
          {
            "id": "a",
            "text": "sowbug"
          },
          {
            "id": "b",
            "text": "millipede"
          },
          {
            "id": "c",
            "text": "pillbug"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Pillbugs roll up completely. Sowbugs look similar but cannot roll into a ball and have two small tail-like appendages.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q11",
        "prompt": "Sowbugs and pillbugs are classified as",
        "options": [
          {
            "id": "a",
            "text": "insects"
          },
          {
            "id": "b",
            "text": "crustaceans"
          },
          {
            "id": "c",
            "text": "arachnids"
          }
        ],
        "correctOptionId": "b",
        "answerText": "They are land-dwelling isopods, related to shrimp and crabs. They breathe through gill-like structures and need high moisture, so they die quickly in dry indoor air.",
        "difficulty": "recall"
      },
      {
        "id": "ace-9-q12",
        "prompt": "Tiny gray hexapods that leap when disturbed by using a forked organ under the abdomen are swarming on a wet basement floor. They are most likely",
        "options": [
          {
            "id": "a",
            "text": "springtails (Collembola)"
          },
          {
            "id": "b",
            "text": "fleas"
          },
          {
            "id": "c",
            "text": "psocids"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Springtails jump using a forked organ called the furcula and thrive where there is moisture and mold. Drying out the area is the main control.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q13",
        "prompt": "A silvery-gray, carrot-shaped insect with mottled markings and three tail filaments is common around a hot boiler and a bakery oven. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "silverfish"
          },
          {
            "id": "b",
            "text": "firebrat"
          },
          {
            "id": "c",
            "text": "earwig"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Thermobia domestica favors very warm sites. The common silverfish prefers cooler, damp areas and is more uniformly silver.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q14",
        "prompt": "Which kind of damage is most typical of silverfish?",
        "options": [
          {
            "id": "a",
            "text": "Irregular surface grazing on paper, book bindings, wallpaper paste and starched fabrics"
          },
          {
            "id": "b",
            "text": "Round exit holes in hardwood furniture"
          },
          {
            "id": "c",
            "text": "Holes chewed through wool sweaters"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Silverfish feed on starches and sugars, scraping the surface. Wool damage points to carpet beetles or clothes moths, and exit holes in wood to wood-boring beetles.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q15",
        "prompt": "A wingless, hump-backed cricket with very long antennae and legs jumps toward people in a damp basement and never chirps. It is most likely a",
        "options": [
          {
            "id": "a",
            "text": "house cricket"
          },
          {
            "id": "b",
            "text": "field cricket"
          },
          {
            "id": "c",
            "text": "camel (cave) cricket"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Camel crickets have no wings, so they cannot chirp, and they need humid places. House and field crickets have wings and males chirp.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q16",
        "prompt": "Large numbers of field crickets are gathering around a store entrance in late summer at night. Which change will reduce them the most?",
        "options": [
          {
            "id": "a",
            "text": "Switch to yellow or sodium-vapor lighting, or move lights away from the doors, and seal gaps under the doors"
          },
          {
            "id": "b",
            "text": "Put cockroach gel bait inside"
          },
          {
            "id": "c",
            "text": "Add brighter white lights at the entrance"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Many night-flying and wandering insects are drawn to white and ultraviolet light. Less attractive lighting and tight door seals cut down the numbers that end up inside.",
        "difficulty": "applied"
      },
      {
        "id": "ace-9-q17",
        "prompt": "Earwigs coming indoors in large numbers usually point to",
        "options": [
          {
            "id": "a",
            "text": "a breeding population inside the walls"
          },
          {
            "id": "b",
            "text": "moist mulch, leaf litter or other damp shelter right against the foundation"
          },
          {
            "id": "c",
            "text": "stored food in the pantry"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Earwigs shelter in damp outdoor debris and wander in at night. Reducing moisture and clutter along the foundation, plus sealing gaps, gives lasting control.",
        "difficulty": "applied"
      },
      {
        "id": "ace-9-q18",
        "prompt": "In spring, tiny red mites with very long front legs crawl over sunny walls and windowsills and leave red smears when crushed. They are most likely",
        "options": [
          {
            "id": "a",
            "text": "bird mites"
          },
          {
            "id": "b",
            "text": "chiggers"
          },
          {
            "id": "c",
            "text": "clover mites"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Bryobia clover mites feed on lawn grasses and other plants and invade in cool weather. They do not bite people.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q19",
        "prompt": "Which long-term step is most often recommended to stop clover mite invasions?",
        "options": [
          {
            "id": "a",
            "text": "Keep a strip next to the foundation, about 18 to 24 inches wide, bare or covered with gravel instead of grass"
          },
          {
            "id": "b",
            "text": "Fertilize the lawn more heavily"
          },
          {
            "id": "c",
            "text": "Treat the indoor carpets"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Lush, well-fertilized turf right against the wall supports large mite populations. A plant-free strip discourages them from crossing to the building.",
        "difficulty": "applied"
      },
      {
        "id": "ace-9-q20",
        "prompt": "Shiny black, fast-running beetles show up in a garage near outdoor lights at night. They are predators and do not breed indoors. They are most likely",
        "options": [
          {
            "id": "a",
            "text": "confused flour beetles"
          },
          {
            "id": "b",
            "text": "ground beetles (Carabidae)"
          },
          {
            "id": "c",
            "text": "carpet beetles"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Ground beetles are beneficial outdoor predators that wander in by accident. Exclusion and changes to lighting are enough.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q21",
        "prompt": "Yellowish-green beetles with a dark stripe along the edge of each wing cover are overwintering in a house shaded by large elm trees. They are most likely",
        "options": [
          {
            "id": "a",
            "text": "multicolored Asian lady beetles"
          },
          {
            "id": "b",
            "text": "cucumber beetles"
          },
          {
            "id": "c",
            "text": "elm leaf beetles"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Elm leaf beetles skeletonize elm leaves in summer and move into nearby buildings for the winter. They are a nuisance and do not reproduce indoors.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q22",
        "prompt": "A spider with a tiny body and extremely long, thin legs shakes its loose web rapidly when touched. It is most likely a",
        "options": [
          {
            "id": "a",
            "text": "cellar spider (Pholcidae)"
          },
          {
            "id": "b",
            "text": "wolf spider"
          },
          {
            "id": "c",
            "text": "brown recluse"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Cellar spiders vibrate their webs to confuse predators. They are harmless, and removing webs and reducing the insects they feed on controls them.",
        "difficulty": "id"
      },
      {
        "id": "ace-9-q23",
        "prompt": "Which of these pests is NOT considered an occasional invader, because it normally lives and reproduces indoors?",
        "options": [
          {
            "id": "a",
            "text": "Millipede"
          },
          {
            "id": "b",
            "text": "German cockroach"
          },
          {
            "id": "c",
            "text": "Boxelder bug"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Occasional invaders live outdoors and come in only temporarily, usually because of weather. German cockroaches complete their whole life cycle inside buildings.",
        "difficulty": "recall"
      },
      {
        "id": "ace-9-q24",
        "prompt": "Swarms of mayflies and caddisflies cover a lakeside restaurant's lit windows on summer nights. What is the most useful long-term step?",
        "options": [
          {
            "id": "a",
            "text": "Treat the lake water with insecticide"
          },
          {
            "id": "b",
            "text": "Fog the dining room every night"
          },
          {
            "id": "c",
            "text": "Reduce or change the exterior lighting and close or screen openings during emergence periods"
          }
        ],
        "correctOptionId": "c",
        "answerText": "These aquatic insects emerge in short bursts and are drawn to lights. Treating natural waters is generally inappropriate, and managing lights addresses the attraction.",
        "difficulty": "applied"
      }
    ]
  },
  {
    "id": "ace-10",
    "title": "Module 10. Stored Product Pests",
    "questionCount": 25,
    "questions": [
      {
        "id": "ace-10-q1",
        "prompt": "Silk webbing and frass in the top layer of a bag of birdseed point most strongly to which pest?",
        "options": [
          {
            "id": "a",
            "text": "A moth larva, such as Indianmeal moth"
          },
          {
            "id": "b",
            "text": "A rice weevil"
          },
          {
            "id": "c",
            "text": "A cigarette beetle"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Indianmeal moth larvae spin silk as they feed on the surface of stored foods, leaving webbing and frass. Weevils develop inside kernels and leave no webbing.",
        "difficulty": "applied"
      },
      {
        "id": "ace-10-q2",
        "prompt": "A larva covered in long bristly hairs is found in a pet food storage room. Which beetle family is it most likely from?",
        "options": [
          {
            "id": "a",
            "text": "Dermestidae (dermestid or carpet beetles)"
          },
          {
            "id": "b",
            "text": "Tenebrionidae (flour beetles)"
          },
          {
            "id": "c",
            "text": "Curculionidae (weevils)"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Hairy larvae are typical of dermestids. Flour beetle larvae are smooth and wireworm-like, and weevil larvae are legless grubs that live inside kernels.",
        "difficulty": "id"
      },
      {
        "id": "ace-10-q3",
        "prompt": "Which stored product pest develops inside individual whole kernels, so an infestation is often missed until adults emerge?",
        "options": [
          {
            "id": "a",
            "text": "Rice or granary weevil"
          },
          {
            "id": "b",
            "text": "Sawtoothed grain beetle"
          },
          {
            "id": "c",
            "text": "Cigarette beetle"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Rice and granary weevils are internal feeders: the larva grows hidden inside a single kernel. Sawtoothed grain beetles feed externally on broken grain and processed foods.",
        "difficulty": "id"
      },
      {
        "id": "ace-10-q4",
        "prompt": "Extension guidance for heat-treating a small infested food package at home is to hold it at about",
        "options": [
          {
            "id": "a",
            "text": "130°F for at least 30 minutes"
          },
          {
            "id": "b",
            "text": "200°F for 10 minutes"
          },
          {
            "id": "c",
            "text": "98°F for 24 hours"
          }
        ],
        "correctOptionId": "a",
        "answerText": "About 130°F for at least 30 minutes kills stored product pests in a small package. Freezing at 0°F for about four days is the other common option.",
        "difficulty": "recall"
      },
      {
        "id": "ace-10-q5",
        "prompt": "The FIRST step in controlling a stored product pest infestation is",
        "options": [
          {
            "id": "a",
            "text": "applying a residual insecticide to all cabinet surfaces."
          },
          {
            "id": "b",
            "text": "locating and disposing of all infested material."
          },
          {
            "id": "c",
            "text": "installing pheromone traps throughout the facility."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Locating and disposing of all infested material. Without source removal, populations regenerate from the source regardless of other treatments.",
        "difficulty": "applied"
      },
      {
        "id": "ace-10-q6",
        "prompt": "A snout beetle from a bin of whole wheat cannot fly, has elongated pits on the pronotum and no light spots on its wing covers. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "rice weevil"
          },
          {
            "id": "b",
            "text": "cowpea weevil"
          },
          {
            "id": "c",
            "text": "granary weevil"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Sitophilus granarius has lost the ability to fly and has oval pits and plain wing covers. The rice weevil flies, has round pits and four faint light spots.",
        "difficulty": "id"
      },
      {
        "id": "ace-10-q7",
        "prompt": "Whole grain kernels with small, neat, round exit holes most strongly suggest",
        "options": [
          {
            "id": "a",
            "text": "Indian meal moth larvae"
          },
          {
            "id": "b",
            "text": "sawtoothed grain beetles"
          },
          {
            "id": "c",
            "text": "an internal feeder, such as a Sitophilus weevil"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Internal feeders develop inside the kernel and chew out as adults. Sawtoothed grain beetles and Indian meal moths feed on the outside of grains or on processed food.",
        "difficulty": "applied"
      },
      {
        "id": "ace-10-q8",
        "prompt": "A tiny humpbacked beetle with its head tucked under has smooth wing covers and saw-toothed antennae. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "drugstore beetle"
          },
          {
            "id": "b",
            "text": "red flour beetle"
          },
          {
            "id": "c",
            "text": "cigarette beetle"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Lasioderma serricorne has serrate antennae and unmarked wing covers. The drugstore beetle has rows of grooves on the wing covers and a loose three-segmented antennal club.",
        "difficulty": "id"
      },
      {
        "id": "ace-10-q9",
        "prompt": "Small, light-brown, humpbacked beetles are flying around a home kitchen. What is the most productive first step?",
        "options": [
          {
            "id": "a",
            "text": "Inspect spices such as paprika and chili powder, along with dry pet food, dried flowers and other dry goods"
          },
          {
            "id": "b",
            "text": "Spray the pantry shelves with a residual insecticide"
          },
          {
            "id": "c",
            "text": "Check the wood floors for exit holes"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Cigarette and drugstore beetles infest an unusually wide range of dry products, and red spices are a classic source. Finding and discarding the infested item comes first.",
        "difficulty": "applied"
      },
      {
        "id": "ace-10-q10",
        "prompt": "A flat, slender, brown beetle with six tooth-like projections along each side of the thorax is found in oatmeal. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "foreign grain beetle"
          },
          {
            "id": "b",
            "text": "sawtoothed grain beetle"
          },
          {
            "id": "c",
            "text": "confused flour beetle"
          }
        ],
        "correctOptionId": "b",
        "answerText": "The saw-like teeth on the thorax identify Oryzaephilus. Its flat body helps it squeeze into poorly sealed packages.",
        "difficulty": "id"
      },
      {
        "id": "ace-10-q11",
        "prompt": "Two reddish-brown flour beetles look alike. One has antennae ending in an abrupt three-segmented club; the other's antennae thicken gradually toward the tip. The first one is most likely the",
        "options": [
          {
            "id": "a",
            "text": "red flour beetle (Tribolium castaneum)"
          },
          {
            "id": "b",
            "text": "confused flour beetle (Tribolium confusum)"
          },
          {
            "id": "c",
            "text": "foreign grain beetle (Ahasverus advena)"
          }
        ],
        "correctOptionId": "a",
        "answerText": "The abrupt club marks the red flour beetle, which also flies. The confused flour beetle's club is gradual, and it generally does not fly.",
        "difficulty": "id"
      },
      {
        "id": "ace-10-q12",
        "prompt": "Freezing is a common non-chemical way to disinfest small packages of stored food. Extension guidance generally recommends",
        "options": [
          {
            "id": "a",
            "text": "about 0°F (-18°C) for roughly four days"
          },
          {
            "id": "b",
            "text": "32°F for one night"
          },
          {
            "id": "c",
            "text": "a household refrigerator (about 40°F) for one day"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Several days at deep-freeze temperatures kills all life stages of common pantry pests. Refrigerator temperatures only slow insects down.",
        "difficulty": "recall"
      },
      {
        "id": "ace-10-q13",
        "prompt": "A small moth has front wings that are pale grayish-tan near the body and coppery reddish-brown on the outer part. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "Mediterranean flour moth"
          },
          {
            "id": "b",
            "text": "webbing clothes moth"
          },
          {
            "id": "c",
            "text": "Indian meal moth"
          }
        ],
        "correctOptionId": "c",
        "answerText": "The two-tone front wing is the field mark for Plodia interpunctella. Mediterranean flour moths are gray with wavy dark bands, and webbing clothes moths are evenly golden.",
        "difficulty": "id"
      },
      {
        "id": "ace-10-q14",
        "prompt": "Pheromone traps used to monitor Indian meal moths catch mainly",
        "options": [
          {
            "id": "a",
            "text": "males responding to a synthetic copy of the female sex pheromone"
          },
          {
            "id": "b",
            "text": "females looking for egg-laying sites"
          },
          {
            "id": "c",
            "text": "crawling larvae"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Female moths release the sex pheromone, and traps imitate it to attract males. Catches show where activity is concentrated but do not replace finding the infested product.",
        "difficulty": "recall"
      },
      {
        "id": "ace-10-q15",
        "prompt": "Silken cocoons are found where the wall meets the ceiling, several feet from an infested pantry. What best explains this?",
        "options": [
          {
            "id": "a",
            "text": "A second moth species is breeding in the ceiling"
          },
          {
            "id": "b",
            "text": "Full-grown Indian meal moth larvae often wander well away from their food before pupating"
          },
          {
            "id": "c",
            "text": "Clothes moths are feeding on the paint"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Wandering mature larvae are a common clue to a pantry infestation. The food source still has to be found and removed.",
        "difficulty": "applied"
      },
      {
        "id": "ace-10-q16",
        "prompt": "In a flour mill, larvae spin so much silk that they clog machinery. The adults are gray moths with wavy black lines across the front wings. The pest is most likely the",
        "options": [
          {
            "id": "a",
            "text": "Angoumois grain moth"
          },
          {
            "id": "b",
            "text": "Mediterranean flour moth"
          },
          {
            "id": "c",
            "text": "casemaking clothes moth"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Ephestia kuehniella is a classic mill pest because its larvae web heavily in flour and meal. The Angoumois grain moth feeds inside whole kernels.",
        "difficulty": "id"
      },
      {
        "id": "ace-10-q17",
        "prompt": "Small buff moths with narrow, heavily fringed, pointed hind wings are emerging from a decorative ear of dried corn. They are most likely",
        "options": [
          {
            "id": "a",
            "text": "Indian meal moths"
          },
          {
            "id": "b",
            "text": "Angoumois grain moths"
          },
          {
            "id": "c",
            "text": "webbing clothes moths"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Sitotroga cerealella larvae develop inside whole kernels, including popcorn and ornamental corn. The adults' pointed, fringed hind wings help identify them.",
        "difficulty": "applied"
      },
      {
        "id": "ace-10-q18",
        "prompt": "Which Trogoderma species is a serious quarantine pest that U.S. inspectors watch for at ports of entry?",
        "options": [
          {
            "id": "a",
            "text": "Warehouse beetle (Trogoderma variabile)"
          },
          {
            "id": "b",
            "text": "Khapra beetle (Trogoderma granarium)"
          },
          {
            "id": "c",
            "text": "Black carpet beetle (Attagenus unicolor)"
          }
        ],
        "correctOptionId": "b",
        "answerText": "The khapra beetle is one of the world's most destructive stored-grain pests and is not established in the U.S. Its larvae are hard to tell from warehouse beetle larvae without an expert.",
        "difficulty": "recall"
      },
      {
        "id": "ace-10-q19",
        "prompt": "Dark beetles with a pale band across the front half of the wing covers, dotted with dark spots, appear in a home where a mouse recently died in a wall. They are most likely",
        "options": [
          {
            "id": "a",
            "text": "spider beetles"
          },
          {
            "id": "b",
            "text": "cigarette beetles"
          },
          {
            "id": "c",
            "text": "larder beetles (Dermestes lardarius)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Larder beetles are dermestids that feed on dead animals, dried meats and pet food. Removing the carcass or food source is the main control.",
        "difficulty": "id"
      },
      {
        "id": "ace-10-q20",
        "prompt": "A golden-brown, carrot-shaped larva with a long tuft of hairs at its tail end is found under a wool rug. It is most likely a",
        "options": [
          {
            "id": "a",
            "text": "varied carpet beetle larva"
          },
          {
            "id": "b",
            "text": "hide beetle larva"
          },
          {
            "id": "c",
            "text": "black carpet beetle larva"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Attagenus larvae are shiny, tapered and end in a long tail tuft. Varied carpet beetle larvae are short, broad and bristly, and hide beetle larvae are larger with two hooks at the tail.",
        "difficulty": "id"
      },
      {
        "id": "ace-10-q21",
        "prompt": "A small, evenly golden moth with a tuft of reddish hairs on its head shies away from light, and silk tunnels are found on a wool coat. It is most likely the",
        "options": [
          {
            "id": "a",
            "text": "webbing clothes moth"
          },
          {
            "id": "b",
            "text": "casemaking clothes moth"
          },
          {
            "id": "c",
            "text": "Indian meal moth"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Tineola bisselliella larvae spin silk tunnels and patches on animal-fiber items. Casemaking clothes moth larvae carry a portable case, and the adults have faint dark spots.",
        "difficulty": "id"
      },
      {
        "id": "ace-10-q22",
        "prompt": "During a humid summer, tiny pale, soft-bodied insects appear in damp stored papers and on cereal boxes. Which response targets the cause?",
        "options": [
          {
            "id": "a",
            "text": "Treat with a residual crack and crevice spray only"
          },
          {
            "id": "b",
            "text": "Reduce the humidity and moisture that let molds grow, and throw out moldy materials"
          },
          {
            "id": "c",
            "text": "Set pheromone traps for moths"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Psocids (booklice) feed largely on microscopic molds that grow in high humidity. Drying the area out removes their food supply.",
        "difficulty": "applied"
      },
      {
        "id": "ace-10-q23",
        "prompt": "Thousands of tiny reddish-brown beetles appear in a newly built home with no infested food in it. They are most likely",
        "options": [
          {
            "id": "a",
            "text": "foreign grain beetles feeding on mold growing on damp new lumber"
          },
          {
            "id": "b",
            "text": "drugstore beetles from the pantry"
          },
          {
            "id": "c",
            "text": "rice weevils from the attic"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Ahasverus advena is a mold feeder often seen in new construction while building materials dry out. As the structure dries, the problem ends.",
        "difficulty": "applied"
      },
      {
        "id": "ace-10-q24",
        "prompt": "A small beetle with a shiny, globe-shaped body and long legs, which looks like a tiny spider, is scavenging in a cool storeroom. It is most likely a",
        "options": [
          {
            "id": "a",
            "text": "sawtoothed grain beetle"
          },
          {
            "id": "b",
            "text": "lady beetle"
          },
          {
            "id": "c",
            "text": "spider beetle"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Spider beetles are scavengers on many dried plant and animal materials and tolerate cool temperatures well. Like all beetles, they have complete metamorphosis.",
        "difficulty": "id"
      },
      {
        "id": "ace-10-q25",
        "prompt": "Stored dried beans have round holes, and the small, stout beetles found with them have no long snout. They are best described as",
        "options": [
          {
            "id": "a",
            "text": "true weevils in Curculionidae"
          },
          {
            "id": "b",
            "text": "bean weevils, which are seed beetles (Bruchinae) in the leaf beetle family, not true weevils"
          },
          {
            "id": "c",
            "text": "drugstore beetles"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Bean and cowpea weevils develop inside individual seeds and can keep reinfesting stored legumes. Once a separate family, Bruchidae, they are now a subfamily of Chrysomelidae.",
        "difficulty": "id"
      }
    ]
  },
  {
    "id": "ace-11",
    "title": "Module 11. Wood Destroying Insects",
    "questionCount": 26,
    "questions": [
      {
        "id": "ace-11-q1",
        "prompt": "Why can a termite worker not digest wood for a while right after it molts?",
        "options": [
          {
            "id": "a",
            "text": "It sheds the hindgut lining and its gut microbes at the molt and must get them back from nestmates"
          },
          {
            "id": "b",
            "text": "Its mandibles do not harden until it feeds"
          },
          {
            "id": "c",
            "text": "Workers only eat fungus after molting"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Lower termites lose their gut symbionts with each molt and regain them by feeding on material passed from nestmates. Those microbes do much of the work of breaking down cellulose.",
        "difficulty": "applied"
      },
      {
        "id": "ace-11-q2",
        "prompt": "Termites are found in attic framing of a coastal Southern California home. There is no soil contact and no mud tubes. Which group is most likely?",
        "options": [
          {
            "id": "a",
            "text": "Drywood termites"
          },
          {
            "id": "b",
            "text": "Eastern subterranean termites"
          },
          {
            "id": "c",
            "text": "Dampwood termites"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Drywood termites live entirely inside dry, sound wood with no soil contact and build no mud tubes. Subterranean termites need soil contact, and dampwood termites need wood with a high moisture content.",
        "difficulty": "applied"
      },
      {
        "id": "ace-11-q3",
        "prompt": "True powderpost beetles (subfamily Lyctinae, family Bostrichidae) attack",
        "options": [
          {
            "id": "a",
            "text": "softwoods only."
          },
          {
            "id": "b",
            "text": "hardwoods only."
          },
          {
            "id": "c",
            "text": "both hard and softwoods equally."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Hardwoods only. True powderpost beetles need the large starch-filled pores of hardwoods. Other bostrichids (false powderpost beetles) and anobiids attack both.",
        "difficulty": "id"
      },
      {
        "id": "ace-11-q4",
        "prompt": "Which Formosan subterranean termite character most helps distinguish it from eastern subterranean termites?",
        "options": [
          {
            "id": "a",
            "text": "Formosan soldiers have smooth mandibles and a round head."
          },
          {
            "id": "b",
            "text": "Formosan colonies have a high percentage of soldiers (~10%) and soldiers have a teardrop-shaped head."
          },
          {
            "id": "c",
            "text": "Formosan termites only swarm during daylight hours."
          }
        ],
        "correctOptionId": "b",
        "answerText": "10% soldiers with teardrop-shaped head. Reticulitermes soldiers have smooth mandibles and a rectangular head. Formosan termites also swarm at night (not day).",
        "difficulty": "id"
      },
      {
        "id": "ace-11-q5",
        "prompt": "Carpenter ants differ from termites in that carpenter ants",
        "options": [
          {
            "id": "a",
            "text": "eat wood to obtain nutrition."
          },
          {
            "id": "b",
            "text": "excavate wood to create nesting galleries but do not consume it for nutrition."
          },
          {
            "id": "c",
            "text": "build mud tubes to travel between the soil and wood."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Excavate but do not eat wood. Termites consume wood for nutrition. Mud tubes are a termite behavior (subterranean), not a carpenter ant behavior.",
        "difficulty": "id"
      },
      {
        "id": "ace-11-q6",
        "prompt": "Drywood termite fecal pellets are best described as",
        "options": [
          {
            "id": "a",
            "text": "soft, moist pellets that clump together with mud."
          },
          {
            "id": "b",
            "text": "hard, dry, elongate-oval pellets with six concave sides."
          },
          {
            "id": "c",
            "text": "fine silky powder resembling flour."
          }
        ],
        "correctOptionId": "b",
        "answerText": "Hard, dry, elongate-oval pellets with six concave sides. These distinctive pellets are diagnostic for drywood termite activity and do not change in shape or size over time.",
        "difficulty": "id"
      },
      {
        "id": "ace-11-q7",
        "prompt": "Which termite caste does most of the feeding and causes the damage to wood?",
        "options": [
          {
            "id": "a",
            "text": "Primary reproductives"
          },
          {
            "id": "b",
            "text": "Soldiers"
          },
          {
            "id": "c",
            "text": "Workers"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Workers forage, feed the other castes, build tunnels and tend the young. Soldiers defend the colony and need workers to feed them.",
        "difficulty": "recall"
      },
      {
        "id": "ace-11-q8",
        "prompt": "On a warm spring morning after rain, dark-bodied termite swarmers emerge inside a Midwest home. The most likely genus is",
        "options": [
          {
            "id": "a",
            "text": "Coptotermes"
          },
          {
            "id": "b",
            "text": "Reticulitermes"
          },
          {
            "id": "c",
            "text": "Incisitermes"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Eastern subterranean termites usually swarm by day in spring, and their swarmers are dark. Formosan termites swarm at dusk or night and are drawn to lights.",
        "difficulty": "applied"
      },
      {
        "id": "ace-11-q9",
        "prompt": "On a humid May evening in New Orleans, clouds of yellowish-brown termite swarmers gather around porch lights. They are most likely",
        "options": [
          {
            "id": "a",
            "text": "eastern subterranean termites"
          },
          {
            "id": "b",
            "text": "dampwood termites"
          },
          {
            "id": "c",
            "text": "Formosan subterranean termites"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Formosan termites swarm in very large numbers at dusk in late spring and are attracted to lights. They are established along the Gulf Coast and in other southern areas.",
        "difficulty": "applied"
      },
      {
        "id": "ace-11-q10",
        "prompt": "Subterranean termites build mud shelter tubes mainly to",
        "options": [
          {
            "id": "a",
            "text": "store food for the winter"
          },
          {
            "id": "b",
            "text": "keep themselves moist and protected from predators while traveling between soil and wood"
          },
          {
            "id": "c",
            "text": "draw swarmers to the surface"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Workers dry out quickly and are vulnerable in the open, so they travel inside tubes of soil and saliva. Finding tubes on a foundation is a key inspection clue.",
        "difficulty": "recall"
      },
      {
        "id": "ace-11-q11",
        "prompt": "Drywood termites are active throughout attic framing and in several areas that cannot be reached. Which treatment is most likely to eliminate every colony?",
        "options": [
          {
            "id": "a",
            "text": "A liquid termiticide barrier in the soil around the foundation"
          },
          {
            "id": "b",
            "text": "In-ground bait stations"
          },
          {
            "id": "c",
            "text": "Whole-structure fumigation"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Drywood termites live entirely in the wood and never touch soil, so soil barriers and in-ground baits do not reach them. Fumigation treats every piece of wood at once, though it leaves no residual.",
        "difficulty": "applied"
      },
      {
        "id": "ace-11-q12",
        "prompt": "Large termites are found only in a section of rotting, water-soaked wood under a leaking window. They have no soil contact or mud tubes. Which step matters most?",
        "options": [
          {
            "id": "a",
            "text": "Fix the leak and replace the decayed wood"
          },
          {
            "id": "b",
            "text": "Apply a soil barrier around the whole house"
          },
          {
            "id": "c",
            "text": "Fumigate the entire structure"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Dampwood termites need wood with a very high moisture content. Eliminating the moisture and the decayed wood usually ends the infestation.",
        "difficulty": "applied"
      },
      {
        "id": "ace-11-q13",
        "prompt": "In Arizona, a technician finds mud tubes hanging down from a ceiling, not attached to any wall. These drop tubes are typical of",
        "options": [
          {
            "id": "a",
            "text": "carpenter ants"
          },
          {
            "id": "b",
            "text": "western drywood termites"
          },
          {
            "id": "c",
            "text": "desert subterranean termites (Heterotermes aureus)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Heterotermes aureus is the dominant subterranean species in parts of the desert Southwest and is known for tubes that hang from overhead wood. Drywood termites never build mud tubes.",
        "difficulty": "id"
      },
      {
        "id": "ace-11-q14",
        "prompt": "A termite soldier has mandibles with prominent teeth along the inner edge. It most likely belongs to",
        "options": [
          {
            "id": "a",
            "text": "Reticulitermes (eastern subterranean)"
          },
          {
            "id": "b",
            "text": "Coptotermes (Formosan)"
          },
          {
            "id": "c",
            "text": "Kalotermitidae (drywood termites)"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Drywood and dampwood soldiers have toothed mandibles. Subterranean termite soldiers in the family Rhinotermitidae have mandibles without teeth.",
        "difficulty": "id"
      },
      {
        "id": "ace-11-q15",
        "prompt": "A termite swarmer's front wing has three or more heavy, dark veins along the leading edge. This points to",
        "options": [
          {
            "id": "a",
            "text": "a subterranean termite (Rhinotermitidae)"
          },
          {
            "id": "b",
            "text": "a drywood termite (Kalotermitidae)"
          },
          {
            "id": "c",
            "text": "a winged carpenter ant"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Subterranean swarmers have only two strong veins along the front edge. Drywood swarmers have more, which helps when only shed wings are found.",
        "difficulty": "id"
      },
      {
        "id": "ace-11-q16",
        "prompt": "Which of these soil termiticides is non-repellent?",
        "options": [
          {
            "id": "a",
            "text": "Bifenthrin"
          },
          {
            "id": "b",
            "text": "Fipronil"
          },
          {
            "id": "c",
            "text": "Permethrin"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Termites cannot detect fipronil, so they tunnel into treated soil and are killed; imidacloprid and chlorantraniliprole are other non-repellents. Pyrethroids such as bifenthrin and permethrin repel termites and create a barrier instead.",
        "difficulty": "recall"
      },
      {
        "id": "ace-11-q17",
        "prompt": "Why do termite bait systems usually take weeks to months to eliminate a colony?",
        "options": [
          {
            "id": "a",
            "text": "The slow-acting growth inhibitor must be eaten and shared through the colony, and it works only when termites molt"
          },
          {
            "id": "b",
            "text": "The baits release their active ingredient only after a swarm"
          },
          {
            "id": "c",
            "text": "The bait repels termites at first and attracts them later"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Delayed action is deliberate: fast-killing toxicants would cause foragers to die near the station before spreading the bait. Stations must be monitored and refilled during that time.",
        "difficulty": "recall"
      },
      {
        "id": "ace-11-q18",
        "prompt": "Which condition most increases the risk of subterranean termites?",
        "options": [
          {
            "id": "a",
            "text": "Wooden siding and trim touching the soil"
          },
          {
            "id": "b",
            "text": "Eighteen inches of clearance between soil and wood"
          },
          {
            "id": "c",
            "text": "A dry, well-ventilated crawlspace"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Direct wood-to-soil contact gives termites a hidden route straight into the structure. Other conducive conditions include moisture problems, leftover form boards and mulch piled against the foundation.",
        "difficulty": "applied"
      },
      {
        "id": "ace-11-q19",
        "prompt": "Fine, talc-like powder is sifting out of tiny round holes in new oak flooring. The most likely cause is",
        "options": [
          {
            "id": "a",
            "text": "drywood termites"
          },
          {
            "id": "b",
            "text": "old house borers"
          },
          {
            "id": "c",
            "text": "lyctine powderpost beetles"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Lyctine beetles, now a subfamily of Bostrichidae, leave flour-fine frass and attack starchy hardwoods, often arriving in new lumber. Drywood termites leave hard pellets, and old house borers make large oval holes in softwood.",
        "difficulty": "id"
      },
      {
        "id": "ace-11-q20",
        "prompt": "Pine joists in a humid crawlspace in the Southeast have many round holes about 1/16 to 1/8 inch across and gritty frass with small pellets. The most likely pest is",
        "options": [
          {
            "id": "a",
            "text": "anobiid beetles"
          },
          {
            "id": "b",
            "text": "lyctine powderpost beetles"
          },
          {
            "id": "c",
            "text": "carpenter bees"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Anobiids attack both softwoods and hardwoods, favor damp wood and can keep reinfesting it. Lyctines prefer hardwoods and leave powdery frass with no pellets.",
        "difficulty": "applied"
      },
      {
        "id": "ace-11-q21",
        "prompt": "For an anobiid infestation in crawlspace framing, the most important long-term step is to",
        "options": [
          {
            "id": "a",
            "text": "lower the wood's moisture with ventilation, a vapor barrier or dehumidification, along with a labeled borate treatment if needed"
          },
          {
            "id": "b",
            "text": "put bait stations in the soil"
          },
          {
            "id": "c",
            "text": "spray the exit holes once with a pyrethroid"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Anobiids depend on elevated wood moisture. Drying the wood makes it unsuitable for them, and borates can protect bare wood.",
        "difficulty": "applied"
      },
      {
        "id": "ace-11-q22",
        "prompt": "Pine framing has oval exit holes about 1/4 to 3/8 inch across, galleries with ripple-like marks on the walls, and tightly packed powdery frass. The most likely pest is the",
        "options": [
          {
            "id": "a",
            "text": "false powderpost beetle"
          },
          {
            "id": "b",
            "text": "old house borer"
          },
          {
            "id": "c",
            "text": "carpenter bee"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Hylotrupes bajulus is a longhorn beetle (Cerambycidae) that bores in seasoned softwood, and its larvae can take several years to develop. Carpenter bee holes are perfectly round and about 1/2 inch.",
        "difficulty": "id"
      },
      {
        "id": "ace-11-q23",
        "prompt": "Borate wood treatments, such as disodium octaborate tetrahydrate, must be applied to",
        "options": [
          {
            "id": "a",
            "text": "painted or varnished wood, because the finish holds them in place"
          },
          {
            "id": "b",
            "text": "bare, unsealed wood that the solution can soak into"
          },
          {
            "id": "c",
            "text": "the soil next to the foundation"
          }
        ],
        "correctOptionId": "b",
        "answerText": "Borates diffuse into raw wood, and paint or sealer blocks them. They are water-soluble, so treated wood exposed to rain can lose the treatment.",
        "difficulty": "recall"
      },
      {
        "id": "ace-11-q24",
        "prompt": "A cylindrical beetle whose head is hidden from above under a hood-like pronotum emerges from imported hardwood, leaving round holes and coarse, tightly packed frass. It is most likely a",
        "options": [
          {
            "id": "a",
            "text": "longhorn beetle"
          },
          {
            "id": "b",
            "text": "anobiid beetle"
          },
          {
            "id": "c",
            "text": "bostrichid (false powderpost) beetle"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Bostrichids usually infest wood that is fairly fresh or still has bark and seldom reinfest dry, finished lumber. The hooded pronotum is their key feature.",
        "difficulty": "id"
      },
      {
        "id": "ace-11-q25",
        "prompt": "Perfectly round holes about 1/2 inch across appear on the underside of bare softwood fascia boards, with coarse sawdust below and large, shiny bees hovering nearby in spring. The most likely pest is",
        "options": [
          {
            "id": "a",
            "text": "old house borers"
          },
          {
            "id": "b",
            "text": "bumble bees"
          },
          {
            "id": "c",
            "text": "carpenter bees"
          }
        ],
        "correctOptionId": "c",
        "answerText": "Female Xylocopa bore nesting tunnels in exposed, unpainted wood. Their abdomen is shiny and mostly hairless, unlike the fuzzy bumble bee, and painting the wood discourages them.",
        "difficulty": "id"
      },
      {
        "id": "ace-11-q26",
        "prompt": "Piles of shed wings, all the same size and shape, are found on an indoor windowsill. This most likely means",
        "options": [
          {
            "id": "a",
            "text": "a termite swarm has occurred, possibly from a colony in or under the structure"
          },
          {
            "id": "b",
            "text": "carpenter ants have been nesting in the windowsill"
          },
          {
            "id": "c",
            "text": "moths have emerged from stored food"
          }
        ],
        "correctOptionId": "a",
        "answerText": "Termite swarmers break off their four equal-length wings soon after flight. Ant swarmers have front wings larger than hind wings and often keep them longer.",
        "difficulty": "applied"
      }
    ]
  }
];
