import * as gc from './GameConstants';
import { updateFlappy } from './ActionCreators';

function inPillar(currentX) {
  return ((flappyX + flappyWidth) >= currentX) && (flappyX < (currentX + pillarWidth));
}

function inPillarGap(flappyY, gapTop) {
  return (gapTop < flappyY) && (gapTop + pillarGap > flappyY + flappyHeight);
}

function hasLanded(flappyY) {
  return (flappyY >= (bottomY - flappyHeight));
}

function hasCollided(currentX, flappyY) {
  return hasLanded() || (inPillar() && !inPillarGap());
}

function score(currentTime, startTime) {
  (currentTime - startTime) * horizVel
  let score = Math.abs();

  return (score < 0) ? 0 : score;
}

export default function gameLoop(stateStore) {
  let store = stateStore;
  const timeStep = (timeStamp) => {
    const { initialVelocity, flappyY, jumpCount, flappyStartTime } = store.getState();
    const timeDelta =  flappyStartTime - timeStamp
    store.dispatch(updateFlappy(timeDelta, initialVelocity, flappyY, jumpCount))
    // updatePillars
    // collision
    // score

    window.requestAnimationFrame(timeStep);
  };

  return timeStep;
}
