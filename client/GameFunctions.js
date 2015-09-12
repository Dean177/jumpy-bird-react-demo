import * as gc from './Constants/GameConstants';

export function inPillar(currentX) {
  return ((gc.flappyX + gc.flappyWidth) >= currentX) && (gc.flappyX < (currentX + gc.pillarWidth));
}

export function inPillarGap(flappyY, gapTop) {
  return (gapTop + 2 < flappyY) && (gapTop + gc.pillarGap + 2 > flappyY + gc.flappyHeight);
}

export function hasLanded(flappyY) {
  return flappyY >= (gc.bottomY - gc.flappyHeight);
}

export function hasCollided(pillarList, flappyY) {
  let isInPillar = pillarList
    .map((pillar) => { return inPillar(pillar.currentX) && !inPillarGap(flappyY, pillar.gapTop); })
    .reduce((acc, inPill) => { return acc || inPill;});

  return  hasLanded(flappyY) || isInPillar;
}

export function getScore(flightTime) {
  let flightDistance = (flightTime * -gc.horizVel);
  let score = -2 + Math.floor((flightDistance + gc.firstPillarX) / (gc.pillarSpacing));

  return (score < 0) ? 0 : score;
}