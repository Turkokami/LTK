/**
 * inspection-spots.ts — the twelve exterior spots in Inspection Hunt: the problem, why it
 * matters for pests, the fix, and what the fixed version looks like. `box` is the hit area
 * in the game's 1000×600 scene.
 */

export interface InspectionSpot {
  id: string;
  area: string;
  issue: string;
  why: string;
  fix: string;
  fine: string;
  box: [number, number, number, number]; // x, y, w, h hit area
}

export const INSPECTION_SPOTS: InspectionSpot[] = [
  { id: 'tree', area: 'Tree by the roof', issue: 'Tree limbs touching the roof', why: 'Branches over the roof are a highway for roof rats, squirrels and ants straight onto the house.', fix: 'Trim limbs back several feet from the roofline.', fine: 'Limbs are trimmed back from the roof — nothing to climb across.', box: [150, 150, 190, 90] },
  { id: 'gutter', area: 'Gutter', issue: 'Clogged gutter overflowing', why: 'Overflow soaks the fascia and the soil at the foundation — moisture that draws termites, ants and roaches.', fix: 'Clean the gutters and keep them flowing.', fine: 'Gutter is clean and draining.', box: [520, 236, 262, 70] },
  { id: 'downspout', area: 'Downspout', issue: 'Downspout dumping at the foundation', why: 'Water pooling against the foundation keeps the soil wet — prime conditions for subterranean termites.', fix: 'Add an extension or splash block to carry water away from the house.', fine: 'An extension carries roof water away from the foundation.', box: [738, 380, 98, 112] },
  { id: 'door', area: 'Front door', issue: 'Daylight under the door', why: 'A house mouse can squeeze through a gap of about ¼ inch.', fix: 'Fit a door sweep and check the threshold.', fine: 'Door sweep seals the bottom of the door.', box: [445, 448, 80, 36] },
  { id: 'shrub', area: 'Shrubs', issue: 'Shrubs grown up against the house', why: 'Dense plants against the siding hold moisture and give ants, spiders and rodents cover right at the wall.', fix: 'Trim plants back so there’s a clear gap between foliage and siding.', fine: 'Shrubs are trimmed low and back from the siding.', box: [236, 362, 104, 120] },
  { id: 'mulch', area: 'Mulch bed', issue: 'Mulch piled up against the foundation', why: 'Deep mulch against the wall holds moisture and can hide termite tubes or bridge over a treated zone.', fix: 'Keep mulch thin and pulled back from the foundation.', fine: 'Mulch is thin and pulled back from the wall.', box: [340, 432, 104, 58] },
  { id: 'pipe', area: 'Pipe into the wall', issue: 'Gap around a pipe entering the wall', why: 'Utility penetrations are one of the top entry points for mice, roaches and ants.', fix: 'Pack the gap with copper mesh or similar exclusion material, then seal.', fine: 'The pipe penetration is sealed tight.', box: [522, 382, 48, 48] },
  { id: 'vent', area: 'Crawlspace vent', issue: 'Torn crawlspace vent screen', why: 'An open vent is a front door into the crawlspace for rats, mice and wildlife.', fix: 'Replace the screen with heavy-gauge hardware cloth.', fine: 'Vent screen is intact.', box: [594, 442, 72, 34] },
  { id: 'ac', area: 'AC unit', issue: 'AC condensate dripping at the foundation', why: 'A constant drip keeps the soil wet against the house — attractive to termites, ants and roaches.', fix: 'Extend the condensate line so it drains away from the foundation.', fine: 'The condensate line drains away from the house.', box: [674, 412, 64, 80] },
  { id: 'firewood', area: 'Firewood', issue: 'Firewood stacked against the house', why: 'Woodpiles harbour termites, carpenter ants, spiders and rodents — and this one is touching the wall.', fix: 'Stack firewood off the ground and away from the structure.', fine: 'Firewood is up on a rack and away from the wall.', box: [112, 410, 124, 76] },
  { id: 'bucket', area: 'Bucket', issue: 'Bucket holding standing water', why: 'Mosquitoes can go from egg to adult in about a week in standing water.', fix: 'Dump, flip or cover containers — tip and toss every week.', fine: 'The bucket is flipped over — no standing water.', box: [906, 426, 68, 60] },
  { id: 'trash', area: 'Trash can', issue: 'Trash can with the lid off', why: 'Open garbage feeds rats, raccoons and flies.', fix: 'Keep tight-fitting lids closed.', fine: 'The trash can lid is closed.', box: [840, 392, 62, 94] },
];
