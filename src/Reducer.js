import Actions from './ActionTypes';

const horizVel = -0.15;
const gravity = 0.05;
const jumpVel = 18;
const startY = 312;
const bottomY = 561;
const flappyX = 212;
const flappyWidth = 57;
const flappyHeight = 41;
const pillarSpacing = 324;
const pillarGap = 158;
const pillarWidth = 86;

const initialState = {
  timerRunning: false,
  jumpCount: 0,
  initialVelocity: 0,
  startTime: 0,
  jumpyStartTime: 0,
  birdY: 300,
  pillarList: [{
    startTime: 0,
    posX: 900,
    curX: 900,
    gapTop: 200
  }]
}

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

function newPillar(currTime, posX) {
  return {
    startTime: currTime,
    posX: posX,
    curX: posX,
    gapTop: 100 // TODO
  };
}

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case Actions.Reset:
      return initialState;
    case Actions.Flap:

    default:
      return state;
  }
}
