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
      src: "/photos/fields/termite-wdo-hero.jpg",
      alt: "Termite-damaged wood siding and framing at the base of a structure",
      width: 1280,
      height: 960,
      credit: "Alton",
      license: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Termite_damage.JPG",
      placeholder: true,
    },
    work: {
      src: "/photos/fields/termite-wdo-work.jpg",
      alt: "A termite worker moving through damaged wood",
      width: 1280,
      height: 960,
      credit: "Derk29",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Silent_Dismantler_Beneath_the_Grain_(Termite).jpg",
      placeholder: true,
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
      src: "/photos/fields/wildlife-control-work.jpg",
      alt: "A raccoon caught in a live cage trap next to a house",
      width: 1280,
      height: 790,
      credit: "Infrogmation",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Louisiana_Raccoon_in_catch-trap,_31_March_2026_-_5.jpg",
      placeholder: true,
    },
  },
  'falconry-abatement': {
    hero: {
      src: "/photos/fields/falconry-abatement-hero.jpg",
      alt: "A falconer holding a Harris hawk on a gloved fist beside site workers in high-visibility vests",
      width: 1280,
      height: 960,
      credit: "Yair Haklai",
      license: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Bird_man-london.jpg",
      placeholder: true,
    },
    work: {
      src: "/photos/fields/falconry-abatement-work.jpg",
      alt: "A hawk in flight over trees",
      width: 1280,
      height: 808,
      credit: "Peter K Burian",
      license: "CC BY 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Red-tailed_Hawk_Falconry_2857.jpg",
      placeholder: true,
    },
  },
  'bird-abatement': {
    hero: {
      src: "/photos/fields/bird-abatement-hero.jpg",
      alt: "Anti-bird spikes installed along a building roofline",
      width: 1200,
      height: 900,
      credit: "Luigi Chiesa",
      license: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Chiodi_antipiccione.jpg",
      placeholder: true,
    },
    work: {
      src: "/photos/fields/bird-abatement-work.jpg",
      alt: "Bird spikes along a ledge above pigeon droppings",
      width: 1280,
      height: 854,
      credit: "Vasyatka1",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Bird_control_spikes_in_MSQ_(1).jpg",
      placeholder: true,
    },
  },
  'k9-detection': {
    hero: {
      src: "/photos/fields/k9-detection-hero.jpg",
      alt: "A detection dog searching a storage room lined with appliances",
      width: 1280,
      height: 853,
      credit: "Pierre Courtejoie",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Military_working_dog_and_handler_practice_explosives_detection_140729-A-BD610-043.jpg",
      placeholder: true,
    },
    work: {
      src: "/photos/fields/k9-detection-work.jpg",
      alt: "A handler directing a detection dog to sniff along a counter",
      width: 1280,
      height: 853,
      credit: "U.S. Air Force photo by Senior Airman Sydney Franklin",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Handler,_detection_dog_team_up_for_52nd_Security_Forces_Squadron_certification_in_time_for_the_holidays_(9458675).jpg",
      placeholder: true,
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
      src: "/photos/fields/fumigation-hero.jpg",
      alt: "A building fully tented in striped fumigation tarps",
      width: 1280,
      height: 960,
      credit: "Missvain",
      license: "CC BY 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Fumigation_tent_in_Sonoma_-_January_2024_-_Sarah_Stierch.jpg",
      placeholder: true,
    },
    work: {
      src: "/photos/fields/fumigation-work.jpg",
      alt: "Workers in protective suits applying treatment to stacked timber",
      width: 1280,
      height: 944,
      credit: "Francis Maugard, Département de la Santé des Forêts, Bugwood.org",
      license: "CC BY 3.0 us",
      source: "https://commons.wikimedia.org/wiki/File:Insecticide_pine_logs_ips_sexdentatus.jpg",
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
      src: "/photos/fields/commercial-food-safety-work.jpg",
      alt: "A rodent bait station beside a public waste bin",
      width: 1280,
      height: 895,
      credit: "Naturpuur",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Rodent_Control_station_at_the_waste_container_in_Trieste,_Italy.jpg",
      placeholder: true,
    },
  },
  'mosquito-vector': {
    hero: {
      src: "/photos/fields/mosquito-vector-hero.jpg",
      alt: "A pickup truck fogging for mosquitoes along a residential street",
      width: 1280,
      height: 850,
      credit: "Agência Brasília",
      license: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Fumac%C3%AAs_aplicam_inseticida_em_toda_Brazl%C3%A2ndia_nesta_quarta-feira_(24)_(25150489591)_(2).jpg",
      placeholder: true,
    },
    work: {
      src: "/photos/fields/mosquito-vector-work.jpg",
      alt: "Two workers using thermal foggers along a tree line",
      width: 1280,
      height: 875,
      credit: "Naval Surface Warriors",
      license: "CC BY-SA 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Public_health_officers_on_Rote_Island,_demonstrate_how_to_use_thermal_foggers,_used_to_kill_infectious_mosquitos.jpg",
      placeholder: true,
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
      src: "/photos/fields/turf-ornamental-work.jpg",
      alt: "A worker filling a backpack sprayer at the edge of a field",
      width: 1280,
      height: 853,
      credit: "Danjuma Anthony",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:A_farmer_fetching_water_in_a_muddy_pond_to_mix_spraying_chemical_(herbicide)_07.jpg",
      placeholder: true,
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
      src: "/photos/fields/bed-bugs-work.jpg",
      alt: "A bed bug crawling across fabric fibres",
      width: 1280,
      height: 848,
      credit: "Gilles San Martin from Namur, Belgium",
      license: "CC BY-SA 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Cimex_lectularius_(bed_bug)_(5975912718).jpg",
      placeholder: true,
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
      src: "/photos/fields/ownership-work.jpg",
      alt: "A row of company service vans parked in a fleet lot",
      width: 1280,
      height: 960,
      credit: "Michael Gil from Toronto, ON, Canada",
      license: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Canada_Post_fleet_2010.jpg",
      placeholder: true,
    },
  },
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
