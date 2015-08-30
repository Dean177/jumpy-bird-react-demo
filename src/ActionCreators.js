import ActionTypes from './ActionTypes';
import * as gc from './GameConstants';

export function flap() {
  // TODO play sound
  return {
    type: ActionTypes.Flap
  };
}

export function startGame(timestamp) {
  // window.requestAnimationFrame((time) => {})

  return {
    type: ActionTypes.Reset,
    timestamp
  }
}

function sineWavePosition(timeDelta) {
  return gc.startY + (30 * Math.sin(timeDelta / 300));
}

export function updateFlappy(timeDelta, initialVelocity, flappyY, jumpCount) {
  let newY;
  if (jumpCount > 0) {
    let currentVelocity = initialVelocity - (timeDelta * gc.gravity);
    flappyY - currentVelocity;
    if (newY > (gc.bottomY - gc.flappyHeight)) {
      newY = bottomY - gc.flappyHeight;
    }
  } else {
    newY = sineWavePosition(timeDelta);
  }

  return {
    type: ActionTypes.UpdateFlappy,
    newY
  }

}

function randInt(n) {

}

function newPillar(currTime, posX) {
  return {
    startTime: currTime,
    posX: posX,
    curX: posX,
    gapTop: (60 + randInt(gc.bottomY - 120 - gc.pillarGap))
  };
}

export function updatePillars(pillarList, currentTime) {
  if (pillarList.length < 3) {
    pillarList.push(newPillar(currentTime, gc.pillarSpacing + (pillarList[pillarList.length - 1].curX)))
  }

  return {
    type: ActionTypes.UpdatePillars
  }
}
