import { UpdateGame, UpdateScore, GameOver, Start, Flap, Uuid, HighScores, NameUpdate  } from '../../shared/Constants/FlappyActionTypes';
import * as gc from '../Constants/GameConstants';
import { hasLanded } from '../GameFunctions';


const initialState = {
  lastUpdateTime: 0,
  flappyY: 200,
  highScore: 0,
  jumpCount: 0,
  name: "New Player",
  score: 0,
  startTime: 0,
  timerRunning: false,
  uuid: null,
  velocity: 0,
  highScores: [],
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
  if (hasLanded(flappyY)) {
    return 0;
  } else if (velocity > gc.maxDownVelocity) {
    return gc.maxDownVelocity;
  } else {
    return velocity - ((timeDelta * gc.gravity) / 20);
  }
}

export function getNewFlappy(timestamp, timeSinceLastUpdate, velocity, flappyY, jumpCount, timerRunning) {
  if (!timerRunning && jumpCount < 1) {
    return sineWavePosition(timestamp, jumpCount);
  } else {
    let newY = flappyY - (velocity * timeSinceLastUpdate / 50);
    console.log("y change", flappyY - newY, "distance to travel", timeSinceLastUpdate * velocity);
    if (hasLanded(newY)) {
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

function getNewPillarPositions(pillarList, currentTime, startTime) {
  let newPillars = translatePillars(pillarList, (currentTime - startTime))
    .filter(pillar => { return pillar.currentX > -gc.pillarWidth; });

  if (newPillars.length < 3) {
    const latestPillar = newPillars[newPillars.length -1];
    const newPill = newPillar(currentTime, gc.pillarSpacing + (latestPillar.posX));
    newPillars.push(newPill);
  }

  return newPillars;
}

function getNewBorderPosition(currentTime) {
  return translate(0, gc.horizVel, currentTime) % 23
}

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case UpdateGame:
      const { timestamp } = action;
      const { velocity, flappyY, jumpCount, pillarList, timerRunning, startTime, lastUpdateTime } = state;
      const timeSinceLastUpdate = timestamp - lastUpdateTime;

      let newPillarList;
      let borderPosition;
      let newVelocity;
      if (timerRunning) {
        newPillarList = getNewPillarPositions(pillarList, timestamp, startTime);
        borderPosition = getNewBorderPosition(timestamp);
        newVelocity = getNewVelocity(timeSinceLastUpdate, state.velocity, flappyY);
      } else {
        newPillarList = pillarList;
        borderPosition = 0;
        newVelocity = 0;
      }

      let newY = getNewFlappy(timestamp, timeSinceLastUpdate, newVelocity, flappyY, jumpCount, timerRunning);

      return {
        ...state,
        lastUpdateTime: timestamp,
        flappyY: newY,
        velocity: newVelocity,
        pillarList: newPillarList,
        borderPosition
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
        timerRunning: false,
        highScore: newHighScore
      };

    case Start:
      return {
        ...state,
        jumpCount: 0,
        score: 0,
        velocity: gc.jumpVel,
        timerRunning: true,
        startTime: performance.now(),
        lastUpdateTime: performance.now()
      };

    case Flap:
      if ( ! state.timerRunning) { return state; }
      return {
        ...state,
        jumpCount: state.jumpCount + 1,
        velocity: gc.jumpVel
      };

    case Uuid:
      if (state.uuid) { return state; }
      return {
        ...state,
        uuid: action.uuid
      };

    case HighScores:
      return {
        ...state,
        highScores: action.highScores
      };

    case NameUpdate:
      return {
        ...state,
        name: action.name
      };

    default:
      return state;
  }
}