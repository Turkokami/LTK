/**
 * photos.ts — field photography.
 *
 * Two kinds of photo live here:
 *   - OWNER PHOTOS (placeholder: false, credit "LTK member photo") — real jobs from the crew.
 *     EXIF, including GPS, is stripped when they are added. Keep doing that.
 *   - PLACEHOLDERS (placeholder: true) from Wikimedia Commons under free licences (CC0, public
 *     domain, CC BY, CC BY-SA). CC BY and BY-SA require the credit line <Photo> renders, so
 *     never strip a placeholder's caption. Replace them all before launch.
 *
 * To swap in an owner photo: save it (EXIF stripped) under public/photos/field/, point src at
 * it, update width/height/alt, set credit "LTK member photo", license "Owner supplied",
 * source null, placeholder false. `position` is the CSS object-position for cropped frames.
 *
 * Each field has two: `hero` shows what the field is, `work` shows the day-to-day.
 */

export interface FieldPhoto {
  src: string;
  /** Describes what is in the frame. Never "photo of". */
  alt: string;
  width: number;
  height: number;
  credit: string;
  license: string;
  /** Commons file page (licence + author). Null for owner-supplied photos. */
  source: string | null;
  placeholder: boolean;
  /** CSS object-position when the frame is cropped, e.g. 'center 30%'. */
  position?: string;
}

export const FIELD_PHOTOS: Record<string, { hero: FieldPhoto; work: FieldPhoto }> = {
  'general-pest': {
    hero: {
      src: "/photos/field/tech-respirator.jpg",
      alt: "A technician in a respirator, headlamp cap and Tyvek suit beside a hose reel outside a house",
      width: 1202,
      height: 1600,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 30%",
    },
    work: {
      src: "/photos/field/rat-bait-station.jpg",
      alt: "A roof rat in an opened bait station against a house foundation",
      width: 739,
      height: 1600,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 45%",
    },
  },
  'termite-wdo': {
    hero: {
      src: "/photos/community/termites-wdo/p358.jpg",
      alt: "Massive free-standing mud tube rising from a wood floor to the bottom of an interior door casing",
      width: 1280,
      height: 960,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 60%",
    },
    work: {
      src: "/photos/community/termites-wdo/t8-2.jpg",
      alt: "Close view of a door frame opened up to show wood eaten into thin layers lined with soil",
      width: 960,
      height: 1280,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
  },
  'wildlife-control': {
    hero: {
      src: "/photos/field/trap-trailer.jpg",
      alt: "A work trailer stocked with cage traps, catch poles and nets",
      width: 1600,
      height: 739,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
    },
    work: {
      src: "/photos/community/wildlife/p236.jpg",
      alt: "Young raccoon inside a green wire cage trap resting on attic insulation",
      width: 960,
      height: 1280,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
  },
  'falconry-abatement': {
    hero: {
      src: "/photos/fields/falconry-abatement-hero.jpg",
      alt: "A falconer releasing a peregrine falcon for a bird-clearance flight on an air base airfield",
      width: 1280,
      height: 1024,
      credit: "Kenn Mann, U.S. Air Force",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Falkner.jpg",
      placeholder: true,
      position: "center 40%",
    },
    work: {
      src: "/photos/community/bats-birds/p478.jpg",
      alt: "Steel and glass canopy structure with lattice beams and light poles against a cloudy sky",
      width: 1280,
      height: 721,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
  },
  'bird-abatement': {
    hero: {
      src: "/photos/community/bats-birds/p394-3.jpg",
      alt: "Two patches of dropping stains on eave trim above a brick wall under the roofline",
      width: 1280,
      height: 960,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
    work: {
      src: "/photos/community/exclusion/p476.jpg",
      alt: "Bird spikes on a patio beam with nesting material caught among them",
      width: 960,
      height: 1280,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
  },
  'k9-detection': {
    hero: {
      src: "/photos/fields/k9-detection-hero.jpg",
      alt: "A detector dog searching packages on a conveyor at the USDA National Detector Dog Training Center",
      width: 1280,
      height: 853,
      credit: "U.S. Department of Agriculture",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Secretary_Perdue_visits_APHIS_Detector_Dog_Trainers_and_Trainees_(20190404-OSEC-LSC-0214).jpg",
      placeholder: true,
      position: "center 50%",
    },
    work: {
      src: "/photos/fields/k9-detection-work.jpg",
      alt: "A detector dog working along a wall of stacked boxes with its handler",
      width: 1280,
      height: 853,
      credit: "U.S. Department of Agriculture",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Secretary_Perdue_visits_APHIS_Detector_Dog_Trainers_and_Trainees_(20190404-OSEC-LSC-0309).jpg",
      placeholder: true,
      position: "center 55%",
    },
  },
  'exclusion': {
    hero: {
      src: "/photos/field/vent-bait-station.jpg",
      alt: "A new steel-mesh crawlspace vent cover installed next to a tamper-resistant bait station, with the old damaged vent set aside",
      width: 1600,
      height: 1600,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
    },
    work: {
      src: "/photos/field/vent-frame-install.jpg",
      alt: "A vent cover frame being fitted around an open crawlspace vent in a block foundation",
      width: 1600,
      height: 1600,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
    },
  },
  'insulation': {
    hero: {
      src: "/photos/field/crawlspace-insulation-damage.jpg",
      alt: "Torn, sagging fiberglass insulation hanging from joists over a dirty vapor barrier in a crawlspace",
      width: 739,
      height: 1600,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 35%",
    },
    work: {
      src: "/photos/field/crawlspace-tech.jpg",
      alt: "A technician in a white suit and headlamp working under the joists of a crawlspace",
      width: 1600,
      height: 739,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
    },
  },
  'fumigation': {
    hero: {
      src: "/photos/community/fumigation/p347.jpg",
      alt: "Rows of wrapped palletized bags inside a green tarp fumigation enclosure, two workers at the far end",
      width: 1280,
      height: 960,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
    work: {
      src: "/photos/fields/fumigation-hero.jpg",
      alt: "A building fully tented in striped fumigation tarps",
      width: 1280,
      height: 960,
      credit: "Missvain",
      license: "CC BY 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Fumigation_tent_in_Sonoma_-_January_2024_-_Sarah_Stierch.jpg",
      placeholder: true,
    },
  },
  'commercial-food-safety': {
    hero: {
      src: "/photos/fields/commercial-food-safety-hero.jpg",
      alt: "Workers on the floor of a food processing plant",
      width: 1280,
      height: 853,
      credit: "U.S. Department of Agriculture",
      license: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:The_processing_plant_at_Lakota_Foods_(15690553980).jpg",
      placeholder: true,
    },
    work: {
      src: "/photos/community/rodents/p542.jpg",
      alt: "A multi-catch rodent trap set along the wall of a commercial kitchen",
      width: 592,
      height: 1280,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
  },
  'mosquito-vector': {
    hero: {
      src: "/photos/community/mosquito-vector/p288.jpg",
      alt: "Upturned irrigation valve box lid with every grid cell holding standing rainwater and leaves",
      width: 1280,
      height: 960,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
    work: {
      src: "/photos/community/gear/g37.jpg",
      alt: "Green and white battery backpack sprayer with a handheld mister gun connected by hose on asphalt",
      width: 960,
      height: 1280,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
  },
  'turf-ornamental': {
    hero: {
      src: "/photos/fields/turf-ornamental-hero.jpg",
      alt: "A tractor-mounted sprayer misting young trees in a nursery row",
      width: 1280,
      height: 850,
      credit: "U.S. Environmental Protection Agency",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:412_DSP_Pesticide_010_-_DPLA_-_999aef58d8e73b263c95a3d39578fcd3.jpg",
      placeholder: true,
    },
    work: {
      src: "/photos/community/gear/g1.jpg",
      alt: "White Lesco backpack sprayer tank on display beside a second white jug in a supply store",
      width: 960,
      height: 1280,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
  },
  'bed-bugs': {
    hero: {
      src: "/photos/field/bed-bug-nymphs.jpg",
      alt: "An adult bed bug beside a cluster of nymphs, cast skins and eggs",
      width: 726,
      height: 960,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 40%",
    },
    work: {
      src: "/photos/community/stinging-insects/p563-2.jpg",
      alt: "Reddish-brown bed bug on a white mattress seam near a cast skin and dark fecal spots",
      width: 960,
      height: 1280,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
  },
  'management': {
    hero: {
      src: "/photos/community/gear/g48.jpg",
      alt: "Four backpack sprayers lined up in a pickup bed, ready for the day",
      width: 1280,
      height: 960,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 55%",
    },
    work: {
      src: "/photos/community/gear/g11.jpg",
      alt: "A work van loaded with an ATV and gear for a job",
      width: 960,
      height: 1280,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
  },
  'auditor': {
    hero: {
      src: "/photos/community/sanitation-conducive/p405-5.jpg",
      alt: "Grease and debris under a commercial kitchen prep line, the kind of finding an audit catches",
      width: 1280,
      height: 960,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
    work: {
      src: "/photos/community/sanitation-conducive/p405-4.jpg",
      alt: "Grease built up along the edge of a stainless cooking station",
      width: 960,
      height: 1280,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 40%",
    },
  },
  'ownership': {
    hero: {
      src: "/photos/fields/ownership-hero.jpg",
      alt: "Pest control service trucks parked in a lot",
      width: 1280,
      height: 658,
      credit: "Dwight Burdette",
      license: "CC BY 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Eradico_Pest_Control_service_vehicle_Ypsilanti_Township_Michigan.JPG",
      placeholder: true,
    },
    work: {
      src: "/photos/community/gear/g26-2.jpg",
      alt: "Garage floor crowded with milk crates of bottles, buckets, bags, and sprayer wands mid-reorganization",
      width: 960,
      height: 1280,
      credit: "LTK member photo",
      license: "Owner supplied",
      source: null,
      placeholder: false,
      position: "center 50%",
    },
  },
};

/**
 * Front-page group cards. Chosen for how they read at a wide 2:1 crop, not just for the
 * first field in the group. LTK library first; groups without an entry fall back to their
 * lead field's hero photo.
 */
export const GROUP_PHOTOS: Record<string, FieldPhoto> = {
  structural: { src: "/photos/community/termites-wdo/p358.jpg", alt: "A huge termite mud tube running up an interior wall from the floor", width: 1280, height: 960, credit: "LTK member photo", license: "Owner supplied", source: null, placeholder: false, position: "center 45%" },
  wildlife: { src: "/photos/community/commercial-monitoring/p266-3.jpg", alt: "A squirrel caught in a cage trap set on a roof", width: 1280, height: 964, credit: "LTK member photo", license: "Owner supplied", source: null, placeholder: false, position: "center 50%" },
  building: { src: "/photos/field/vent-screen-installed.jpg", alt: "A new steel mesh vent screen installed in a foundation vent", width: 1600, height: 1600, credit: "LTK member photo", license: "Owner supplied", source: null, placeholder: false, position: "center 50%" },
  outdoor: { src: "/photos/community/gear/g37.jpg", alt: "A battery backpack mister ready for a mosquito treatment", width: 960, height: 1280, credit: "LTK member photo", license: "Owner supplied", source: null, placeholder: false, position: "center 45%" },
  business: { src: "/photos/community/gear/g48.jpg", alt: "Four backpack sprayers lined up in a pickup bed, ready for the day", width: 1280, height: 960, credit: "LTK member photo", license: "Owner supplied", source: null, placeholder: false, position: "center 55%" },
};

export function fieldPhotos(slug: string) {
  return FIELD_PHOTOS[slug];
}

/** "From the field" — owner photos that don't belong to one field page. */
export const FIELD_GALLERY: (FieldPhoto & { caption: string })[] = [
  { caption: "Wasp season", ...{
    src: "/photos/field/wasp-nest-porch-light.jpg",
    alt: "A paper wasp nest built inside a porch light fixture",
    width: 739,
    height: 1600,
    credit: "LTK member photo",
    license: "Owner supplied",
    source: null,
    placeholder: false,
    position: "center 40%",
  } },
  { caption: "Swarm call", ...{
    src: "/photos/field/honeybee-swarm.jpg",
    alt: "A honeybee swarm clustered in the fork of a tree",
    width: 900,
    height: 1600,
    credit: "LTK member photo",
    license: "Owner supplied",
    source: null,
    placeholder: false,
  } },
  { caption: "After the crawl", ...{
    src: "/photos/field/suited-tech-after-crawl.jpg",
    alt: "A technician in a mud-covered Tyvek suit and respirator after a crawlspace job",
    width: 739,
    height: 1600,
    credit: "LTK member photo",
    license: "Owner supplied",
    source: null,
    placeholder: false,
    position: "center 30%",
  } },
  { caption: "Tight squeeze", ...{
    src: "/photos/field/crawlspace-tech-closeup.jpg",
    alt: "A technician in a respirator and suit squeezing through a tight crawlspace",
    width: 1600,
    height: 739,
    credit: "LTK member photo",
    license: "Owner supplied",
    source: null,
    placeholder: false,
  } },
  { caption: "Before", ...{
    src: "/photos/field/vent-damaged-before.jpg",
    alt: "A crushed, rusted crawlspace vent pulled away from the foundation: an open door for rodents",
    width: 1600,
    height: 1600,
    credit: "LTK member photo",
    license: "Owner supplied",
    source: null,
    placeholder: false,
  } },
  { caption: "After", ...{
    src: "/photos/field/vent-screen-installed.jpg",
    alt: "The same opening sealed with a heavy steel-mesh vent cover",
    width: 1600,
    height: 1600,
    credit: "LTK member photo",
    license: "Owner supplied",
    source: null,
    placeholder: false,
  } },
  { caption: "The trap rack", ...{
    src: "/photos/field/cage-traps.jpg",
    alt: "Cage traps in every size stacked in the work trailer",
    width: 1600,
    height: 739,
    credit: "LTK member photo",
    license: "Owner supplied",
    source: null,
    placeholder: false,
  } },
  { caption: "Loaded for the day", ...{
    src: "/photos/field/trap-trailer-tall.jpg",
    alt: "The trailer rack: cage traps, bait stations, catch poles and nets",
    width: 739,
    height: 1600,
    credit: "LTK member photo",
    license: "Owner supplied",
    source: null,
    placeholder: false,
  } },
];

/** Every placeholder (licensed third-party) photo on the site, for the credits list. */
export const ALL_FIELD_PHOTOS = Object.entries(FIELD_PHOTOS)
  .flatMap(([field, p]) => [
    { field, ...p.hero },
    { field, ...p.work },
  ])
  .filter((p) => p.placeholder);
