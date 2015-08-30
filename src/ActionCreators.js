import ActionTypes from './ActionTypes';
import * as gc from './GameConstants';
import { jump, crash, coin } from './resources/sounds/index';

export function startGame() {
  return {
    type: ActionTypes.Start
  }
}

export function flap(timerRunning) {
  if (timerRunning) {
    jump.pause();
    jump.currentTime = 0;
    jump.play();
  }
  return {
    type: ActionTypes.Flap,
    time: performance.now()
  };
}

function sineWavePosition(timeDelta) {
  return gc.startY + (30 * Math.sin(timeDelta / 300));
}

export function updateFlappy(timeDelta, initialVelocity, flappyY, jumpCount) {
  let newY;
  let velocity = initialVelocity;
  if (jumpCount < 1) {
    newY = sineWavePosition(timeDelta);
  } else {
    velocity = initialVelocity + (timeDelta * gc.gravity);
    if (velocity < gc.maxVelocity) { velocity = gc.maxVelocity; }
    newY = flappyY - velocity;
    if (newY > (gc.bottomY - gc.flappyHeight)) {
      newY = gc.bottomY - gc.flappyHeight;
      velocity = 0;
    }
  }

  return {
    type: ActionTypes.UpdateFlappy,
    newY,
    velocity
  };
}

function randInt(n) {
  return Math.floor(Math.random() * n);
}

function newPillar(currTime, posX) {
  return {
    startTime: currTime,
    posX: posX,
    currentX: posX,
    gapTop: (60 + randInt(gc.bottomY - 120 - gc.pillarGap))
  };
}

function pillarsInWorld(pillarList) {
  return pillarList.filter(pillar => pillar.currentX > -gc.pillarWidth);
}

function translate(startPosition, velocity, time) {
  return Math.floor(startPosition + (time * velocity));
}

function translatePillars(pillarList, timeDelta) {
  return pillarList.map(pillar => {
      pillar.currentX = translate(pillar.posX, gc.horizVel, timeDelta);
      return pillar;
  });
}

export function updatePillars(pillarList, currentTime, startTime) {
  let newPillars = translatePillars(pillarList, (currentTime - startTime))
    .filter(pillar => { return pillar.currentX > -gc.pillarWidth; });

  if (newPillars.length < 3) {
    const latestPillar = newPillars[newPillars.length -1];
    const newPill = newPillar(currentTime, gc.pillarSpacing + (latestPillar.posX));
    newPillars.push(newPill);
  }

  return {
    type: ActionTypes.UpdatePillars,
    pillars: newPillars
  }
}

export function updateBorder(currentTime) {
  return {
    type: ActionTypes.UpdateBorder,
    borderPosition: translate(0, gc.horizVel, currentTime) % 23
  }
}

export function updateScore(oldScore, newScore) {
  if (newScore > oldScore) {
    coin.play();
  }
  return {
    type: ActionTypes.UpdateScore,
    score: newScore
  }
}

export function gameOver() {
  crash.play();
  return {
    type: ActionTypes.GameOver
  }
}