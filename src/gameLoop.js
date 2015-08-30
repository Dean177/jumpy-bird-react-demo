import * as gc from './GameConstants';
import { updateFlappy, updatePillars, gameOver } from './ActionCreators';

function inPillar(currentX) {
  return ((gc.flappyX + gc.flappyWidth) >= currentX) && (gc.flappyX < (currentX + gc.pillarWidth));
}

function inPillarGap(flappyY, gapTop) {
  return (gapTop < flappyY) && (gapTop + pillarGap > flappyY + flappyHeight);
}

function hasLanded(flappyY) {
  return (flappyY >= (gc.bottomY - gc.flappyHeight));
}

function hasCollided(currentX, flappyY) {
  return hasLanded() || (inPillar() && !inPillarGap());
}

export default function gameLoop(stateStore) {
  let store = stateStore;

  const timeStep = (timeStamp) => {
    const { initialVelocity, flappyY, jumpCount, flappyStartTime, pillarList } = store.getState();
    const timeDelta =  flappyStartTime - timeStamp
    store.dispatch(updateFlappy(timeDelta, initialVelocity, flappyY, jumpCount))
    store.dispatch(updatePillars(pillarList, timeStamp));

    if (hasCollided()) {
      store.dispatch(gameOver())
    }
    // collision

    window.requestAnimationFrame(timeStep);
  };

  return timeStep;
}
