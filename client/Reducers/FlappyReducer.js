import { UpdateGame, UpdateScore, GameOver, Start, Flap, Uuid, HighScores, NameUpdate  } from '../../shared/Constants/FlappyActionTypes';
import * as gc from '../Constants/GameConstants';
import { hasLanded } from '../GameFunctions';


const initialState = {
  lastUpdateTime: 0,
  flappyY: 200,
  highScore: 0,
  jumpCount: 0,
  score: 0,
  startTime: 0,
  isTimerRunning: false,
  velocity: 0,
  pillarList: [
    {
      startTime: 0,
      currentX: gc.firstPillarX,
      posX: gc.firstPillarX,
      gapTop: 200
    }
  ]
};

function sineWavePosition(timeDelta) {
  return gc.startY + (30 * Math.sin(timeDelta / 300));
}

function getNewVelocity(timeDelta, velocity, flappyY) {
  if (velocity > gc.maxDownVelocity) {
    return gc.maxDownVelocity;
  } else if (hasLanded(flappyY)) {
    return 0;
  } else {
    return velocity - (timeDelta * gc.gravity);
  }
}

export function getNewFlappy(timestamp, timeDelta, velocity, flappyY, jumpCount, isTimerRunning) {
  if (!isTimerRunning && jumpCount < 1) {
    return sineWavePosition(timestamp, jumpCount);
  } else {
    let newY = flappyY + (velocity * timeDelta / 8);
    if (newY > (gc.bottomY - gc.flappyHeight)) {
      return gc.bottomY - gc.flappyHeight;
    } else {
      return newY;
    }
  }
}

function newPillar(currentTime, posX) {
  return {
    startTime: currentTime,
    posX: posX,
    currentX: posX,
    gapTop: (60 + Math.floor(Math.random() * (gc.bottomY - 120 - gc.pillarGap)))
  };
}

function pillarsInWorld(pillarList) {
  return pillarList.filter(pillar => pillar.currentX > -gc.pillarWidth);
}

function translate(startPosition, velocity, time) {
  return Math.floor(startPosition + (time * velocity));
}

function translatePillars(pillarList, timeSinceStart) {
  return pillarList.map(pillar => {
    pillar.currentX = translate(pillar.posX, gc.horizVel, timeSinceStart);
    return pillar;
  });
}

function getNewPillarPositions(pillarList, currentTime, startTime, isTimerRunning) {
  if (!isTimerRunning) {
    return pillarList;
  }
  let newPillars = translatePillars(pillarList, (currentTime - startTime))
    .filter(pillar => { return pillar.currentX > -gc.pillarWidth; });

  if (newPillars.length < 3) {
    const latestPillar = newPillars[newPillars.length -1];
    const newPill = newPillar(currentTime, gc.pillarSpacing + (latestPillar.posX));
    newPillars.push(newPill);
  }

  return newPillars;
}

function getNewBorderPosition(currentTime, isTimerRunning) {
  if (!isTimerRunning) {
    return 0;
  }

  return translate(0, gc.horizVel, currentTime) % 23
}

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case UpdateGame:
      const { velocity, flappyY, jumpCount, pillarList, isTimerRunning, startTime, lastUpdateTime } = state;
      const { timestamp } = action;
      const timeDelta = timestamp - lastUpdateTime;

      const newVelocity = (!isTimerRunning && jumpCount < 1) ? 0 : getNewVelocity(timeDelta, velocity, flappyY);
      return {
        ...state,
        lastUpdateTime: timestamp,
        flappyY: getNewFlappy(timestamp, timeDelta, velocity, flappyY, jumpCount, isTimerRunning),
        velocity: newVelocity,
        pillarList: getNewPillarPositions(pillarList, timestamp, startTime, isTimerRunning),
        borderPosition: getNewBorderPosition(timestamp, isTimerRunning)
      };

    case UpdateScore:
      let { score } = action;
      return {
        ...state,
        score,
        highScore: (score > state.highScore) ? score : state.highScore
      };

    case GameOver:
      let newHighScore = (action.score > state.highScore) ? action.score : state.highScore;
      return {
        ...state,
        isTimerRunning: false,
        highScore: newHighScore
      };

    case Start:
      return {
        ...state,
        jumpCount: 0,
        flappyY: 200,
        score: 0,
        velocity: -gc.jumpVel,
        isTimerRunning: true,
        pillarList: initialState.pillarList,
        startTime: performance.now(),
        lastUpdateTime: performance.now()
      };

    case Flap:
      if ( ! state.isTimerRunning) { return state; }
      return {
        ...state,
        jumpCount: state.jumpCount + 1,
        velocity: -gc.jumpVel
      };

    default:
      return state;
  }
}