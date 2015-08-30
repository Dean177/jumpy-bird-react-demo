import * as gc from './GameConstants';
import { updateBorder, updateFlappy, updatePillars, updateScore, gameOver } from './ActionCreators';

function inPillar({ currentX }) {
  return ((gc.flappyX + gc.flappyWidth) >= currentX) && (gc.flappyX < (currentX + gc.pillarWidth));
}

function inPillarGap(flappyY, { gapTop }) {
  return (gapTop < flappyY) && (gapTop + gc.pillarGap > flappyY + gc.flappyHeight);
}

function hasLanded(flappyY) {
  return flappyY >= (gc.bottomY - gc.flappyHeight);
}

function hasCollided(pillarList, flappyY) {
  let isInPillar = pillarList
    .map((pillar) => { return inPillar(pillar) && !inPillarGap(flappyY, pillar); })
    .reduce((acc, inPill) => { return acc || inPill;});

  return  hasLanded(flappyY) || isInPillar;
}

function getScore(flightTime) {
  let flightDistance = (flightTime * -gc.horizVel);
  let score = -2 + Math.floor((flightDistance + gc.firstPillarX) / (gc.pillarSpacing));

  return (score < 0) ? 0 : score;
}

export default function gameLoop(stateStore) {
  let store = stateStore;

  const timeStep = (timeStamp) => {
    const { initialVelocity, flappyY, jumpCount, flappyStartTime, pillarList, timerRunning, startTime, score } = store.getState();
    const timeDelta =  flappyStartTime - timeStamp;
    store.dispatch(updateFlappy(timeDelta, initialVelocity, flappyY, jumpCount));
    if (timerRunning) {
      if (hasCollided(pillarList, flappyY)) {
        store.dispatch(gameOver())
      }

      store.dispatch(updatePillars(pillarList, timeStamp, startTime));
      store.dispatch(updateBorder(timeStamp));
      store.dispatch(updateScore(score, getScore(timeStamp - startTime)));
    }

    window.requestAnimationFrame(timeStep);
  };

  return timeStep;
}
