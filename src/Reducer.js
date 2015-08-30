import Actions from './ActionTypes';
import * as gc from './GameConstants';


const initialState = {
  timerRunning: false,
  jumpCount: 0,
  initialVelocity: 0,
  startTime: 0,
  flappyStartTime: 0,
  flappyY: 200,
  velocity: 0,
  score: 0,
  highScore: 0,
  pillarList: [
    {
      startTime: 0,
      currentX: gc.firstPillarX,
      posX: gc.firstPillarX,
      gapTop: 200
    }
  ]
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case Actions.UpdateFlappy:
      return {
        ...state,
        flappyY: action.newY,
        velocity: action.velocity
      };

    case Actions.UpdatePillars:
      return {
        ...state,
        pillarList: action.pillars
      };

    case Actions.UpdateBorder:
      return {
        ...state,
        borderPosition: action.borderPosition
      };

    case Actions.UpdateScore:
      let {score} = action;
      return {
        ...state,
        score,
        highScore: (score > state.highScore) ? score : state.highScore
      };

    case Actions.GameOver:
      let newHighScore = (action.score > state.highScore) ? action.score : state.highScore;
      return {
        ...state,
        timerRunning: false,
        highScore: newHighScore
      };

    case Actions.Start:
      return {
        ...initialState,
        timerRunning: true,
        highScore: state.highScore,
        startTime: performance.now()
      };

    case Actions.Flap:
    if ( ! state.timerRunning) { return state; }
      let newState = {
        ...state,
        jumpCount: state.jumpCount + 1,
        initialVelocity: gc.jumpVel,
        flappyStartTime: action.time
      };

      return newState;

    default:
      return state;
  }
}
