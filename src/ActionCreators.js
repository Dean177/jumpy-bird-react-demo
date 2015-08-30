import ActionTypes from './ActionTypes';
import * as gc from './GameConstants';

export function flap() {
  // TODO play sound
  return {
    type: ActionTypes.Flap,
    time: performance.now()
  };
}

export function startGame() {
  return {
    type: ActionTypes.Start
  }
}

function sineWavePosition(timeDelta) {
  return gc.startY + (30 * Math.sin(timeDelta / 300));
}

export function updateFlappy(timeDelta, initialVelocity, flappyY, jumpCount) {
  let newY;
  if (jumpCount < 1) {
    newY = sineWavePosition(timeDelta);
  } else {
    let currentVelocity = initialVelocity + (timeDelta * gc.gravity);

    newY = flappyY - currentVelocity;
    if (newY > (gc.bottomY - gc.flappyHeight)) {
      newY = gc.bottomY - gc.flappyHeight;
    }
  }

  return {
    type: ActionTypes.UpdateFlappy,
    newY
  }

}

function randInt(n) {
  return Math.floor(Math.random() * n);
}

function newPillar(currTime, posX) {
  return {
    startTime: currTime,
    posX: posX,
    curX: posX,
    gapTop: (60 + randInt(gc.bottomY - 120 - gc.pillarGap))
  };
}

function pillarsInWorld() {
  return 3;
}

export function updatePillars(pillarList, currentTime) {

  if (pillarsInWorld() < 3) {
    pillarList.push(newPillar(currentTime, gc.pillarSpacing + (pillarList[pillarList.length - 1].currentX)))
  }

  return {
    type: ActionTypes.UpdatePillars,
    pillars: pillarList
  }
}

export function gameOver() {
  console.log("Crashed");
  return {
    type: ActionTypes.GameOver
  }
}
