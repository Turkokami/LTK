/**
 * lookalikes.ts — Lookalike Showdown pairs. Each clue is a field-ID feature that tells one of
 * two commonly confused pests from the other, with the reason shown after the answer.
 * Features are the standard extension / ACE identification characters; keep every clue a
 * feature a tech could actually check on the job.
 */

export interface LookalikeClue {
  clue: string;
  /** 'a' or 'b' — which of the pair the clue describes. */
  answer: 'a' | 'b';
  why: string;
}

export interface LookalikePair {
  id: string;
  a: string;
  b: string;
  clues: LookalikeClue[];
}

export const LOOKALIKES: LookalikePair[] = [
  {
    id: 'swarmers',
    a: 'Termite swarmer',
    b: 'Flying ant',
    clues: [
      { clue: 'Elbowed antennae', answer: 'b', why: 'Ants have elbowed antennae; termite antennae are straight and bead-like.' },
      { clue: 'Broad waist, no pinch between thorax and abdomen', answer: 'a', why: 'Termites are thick-waisted; ants have a narrow, pinched waist.' },
      { clue: 'Front wings noticeably longer than the hind wings', answer: 'b', why: 'Ant wings are unequal; termite wings are all about the same length.' },
      { clue: 'Four equal-length wings that reach well past the body and break off easily', answer: 'a', why: 'Termite swarmers shed their equal-sized wings soon after flight, often leaving piles at windows.' },
    ],
  },
  {
    id: 'roaches',
    a: 'German cockroach',
    b: 'American cockroach',
    clues: [
      { clue: 'Two dark parallel stripes on the shield behind the head', answer: 'a', why: 'Two dark stripes on the pronotum are the German cockroach’s calling card.' },
      { clue: 'About 1½–2 inches long and reddish-brown', answer: 'b', why: 'American cockroaches are the big ones; Germans run around half an inch.' },
      { clue: 'Pale yellowish band around the edge of the shield behind the head', answer: 'b', why: 'American cockroaches have a light band rimming the pronotum.' },
      { clue: 'Lives almost entirely indoors, in kitchens and bathrooms', answer: 'a', why: 'Germans are indoor pests tied to food, warmth and moisture; Americans favour sewers, basements and steam tunnels.' },
    ],
  },
  {
    id: 'bed-bat',
    a: 'Bed bug',
    b: 'Bat bug',
    clues: [
      { clue: 'Hairs on the shield behind the head are longer than the width of its eye', answer: 'b', why: 'Under magnification, bat bugs have longer fringe hairs on the pronotum than bed bugs.' },
      { clue: 'Found with bats roosting in the attic or wall void', answer: 'b', why: 'Bat bugs follow bats; the fix starts with excluding the bats.' },
      { clue: 'Hairs on the shield behind the head are shorter than the width of its eye', answer: 'a', why: 'Short pronotal hairs point to the bed bug.' },
    ],
  },
  {
    id: 'bed-carpet',
    a: 'Bed bug',
    b: 'Carpet beetle (adult)',
    clues: [
      { clue: 'Hard wing covers, rounded body and can fly to windows', answer: 'b', why: 'Adult carpet beetles are round, winged beetles, often found on windowsills.' },
      { clue: 'Flat, oval and wingless; feeds only on blood', answer: 'a', why: 'Bed bugs never have functional wings and feed on blood.' },
      { clue: 'Mottled pattern of tiny coloured scales on the back', answer: 'b', why: 'Varied carpet beetles carry a patchwork of white, brown and yellowish scales.' },
    ],
  },
  {
    id: 'mouse-rat',
    a: 'House mouse',
    b: 'Young Norway rat',
    clues: [
      { clue: 'Head and feet look too big for the body', answer: 'b', why: 'Young rats have oversized heads and feet; mice are proportioned small.' },
      { clue: 'Droppings about ⅛–¼ inch with pointed ends', answer: 'a', why: 'Mouse droppings are small and pointed; Norway rat droppings run around ¾ inch with blunt ends.' },
      { clue: 'Large ears relative to a small head', answer: 'a', why: 'House mice have big ears for their head size.' },
    ],
  },
  {
    id: 'rats',
    a: 'Norway rat',
    b: 'Roof rat',
    clues: [
      { clue: 'Tail longer than its head and body combined', answer: 'b', why: 'Roof rats have long tails for balance; a Norway rat’s tail is shorter than head plus body.' },
      { clue: 'Blunt nose, small ears, heavy body; burrows along foundations', answer: 'a', why: 'Norway rats are stocky burrowers.' },
      { clue: 'Pointed nose, large ears; nests up high in attics and trees', answer: 'b', why: 'Roof rats are slender climbers.' },
      { clue: 'Droppings with blunt, capsule-shaped ends', answer: 'a', why: 'Norway rat droppings are blunt; roof rat droppings are pointed and spindle-shaped.' },
    ],
  },
  {
    id: 'spiders',
    a: 'Brown recluse',
    b: 'Wolf spider',
    clues: [
      { clue: 'Six eyes arranged in three pairs', answer: 'a', why: 'Recluse spiders have six eyes in pairs; most spiders, wolf spiders included, have eight.' },
      { clue: 'Large, hairy, often striped; hunts on the ground at night', answer: 'b', why: 'Wolf spiders are hairy, patterned ground hunters.' },
      { clue: 'Plain legs with no bands or spines, and a violin-shaped mark behind the eyes', answer: 'a', why: 'Uniform legs plus the violin mark point to a recluse — confirm with the eye pattern.' },
      { clue: 'Two large eyes facing forward above a row of four small ones', answer: 'b', why: 'That eye arrangement is classic wolf spider.' },
    ],
  },
  {
    id: 'stingers',
    a: 'Yellowjacket',
    b: 'Honey bee',
    clues: [
      { clue: 'Smooth, shiny body with bright yellow and black bands', answer: 'a', why: 'Yellowjackets are nearly hairless and glossy.' },
      { clue: 'Fuzzy, golden-brown body', answer: 'b', why: 'Honey bees are hairy, built for carrying pollen.' },
      { clue: 'Barbed stinger; usually stings once and dies', answer: 'b', why: 'A honey bee’s barbed stinger stays in the skin.' },
      { clue: 'Builds a paper nest, often underground or in a wall void', answer: 'a', why: 'Yellowjackets make paper nests; honey bees build wax comb.' },
    ],
  },
  {
    id: 'termite-types',
    a: 'Drywood termites',
    b: 'Subterranean termites',
    clues: [
      { clue: 'Mud tubes running up the foundation', answer: 'b', why: 'Subterraneans need soil moisture and build mud tubes to reach wood.' },
      { clue: 'Small piles of hard, six-sided pellets below a kick-out hole', answer: 'a', why: 'Drywoods push out their distinctive faecal pellets.' },
      { clue: 'Lives entirely inside the wood, no soil contact needed', answer: 'a', why: 'Drywood colonies live in the wood they eat.' },
      { clue: 'Galleries packed with soil and mud', answer: 'b', why: 'Subterranean damage carries soil; drywood galleries are clean apart from pellets.' },
    ],
  },
  {
    id: 'wood-damage',
    a: 'Carpenter ant damage',
    b: 'Subterranean termite damage',
    clues: [
      { clue: 'Smooth, clean galleries that look sanded', answer: 'a', why: 'Carpenter ants excavate wood to nest — they don’t eat it — leaving clean, smooth tunnels.' },
      { clue: 'Piles of coarse sawdust mixed with insect parts', answer: 'a', why: 'That “frass” is carpenter ant debris pushed out of the nest.' },
      { clue: 'Wood eaten along the grain with mud lining the tunnels', answer: 'b', why: 'Subterraneans eat wood and plaster their galleries with soil.' },
    ],
  },
  {
    id: 'ticks',
    a: 'Blacklegged (deer) tick',
    b: 'American dog tick',
    clues: [
      { clue: 'Ornate shield with whitish-silver markings', answer: 'b', why: 'American dog ticks have a mottled white pattern on the scutum.' },
      { clue: 'Small, with a plain dark shield and no white markings', answer: 'a', why: 'Blacklegged ticks are small with a solid dark scutum (red-orange body behind it on females).' },
      { clue: 'The main vector of Lyme disease in the eastern US', answer: 'a', why: 'Blacklegged ticks transmit the Lyme disease bacterium.' },
    ],
  },
  {
    id: 'small-flies',
    a: 'Drain fly',
    b: 'Fungus gnat',
    clues: [
      { clue: 'Fuzzy, moth-like body with wings held roof-like over the back', answer: 'a', why: 'Drain (moth) flies are hairy and hold their wings tent-like.' },
      { clue: 'Slender, long-legged, mosquito-like', answer: 'b', why: 'Fungus gnats look like tiny mosquitoes.' },
      { clue: 'Breeds in the gelatinous film inside sink and floor drains', answer: 'a', why: 'Clean the drain film and drain flies stop.' },
      { clue: 'Breeds in damp potting soil and organic matter', answer: 'b', why: 'Overwatered houseplants are the classic fungus gnat source.' },
    ],
  },
  {
    id: 'swarmer-subs',
    a: 'Formosan subterranean',
    b: 'Eastern subterranean',
    clues: [
      { clue: 'Yellowish-brown swarmers that fly at night and gather at lights', answer: 'a', why: 'Formosan swarms happen at dusk and after dark, drawn to lights.' },
      { clue: 'Dark brown to black swarmers that fly in daytime in spring', answer: 'b', why: 'Eastern subterraneans typically swarm on warm spring days.' },
    ],
  },
  {
    id: 'moths',
    a: 'Indianmeal moth',
    b: 'Webbing clothes moth',
    clues: [
      { clue: 'Wings two-toned: coppery outer half, pale grey inner half', answer: 'a', why: 'The bicoloured wing is the Indianmeal moth’s giveaway.' },
      { clue: 'Plain golden-buff wings; hides from light', answer: 'b', why: 'Webbing clothes moths are uniformly straw-coloured and avoid light.' },
      { clue: 'Larvae feed on wool, fur and feathers', answer: 'b', why: 'Clothes moth larvae digest keratin in animal fibres.' },
      { clue: 'Larvae web up flour, cereal and dried pet food', answer: 'a', why: 'Indianmeal moths are the common pantry moth.' },
    ],
  },
];
