import { UpdateGameEntities, UpdateScore, GameOver, Start, Flap, Uuid, HighScores, NameUpdate  } from '../../shared/Constants/FlappyActionTypes';
import * as gc from '../Constants/GameConstants';


const initialState = {
  flappyStartTime: 0,
  flappyY: 200,
  highScore: 0,
  initialVelocity: 0,
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

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case UpdateGameEntities:
      return {
        ...state,
        flappyY: action.newY,
        velocity: action.velocity,
        pillarList: action.pillars,
        borderPosition: action.borderPosition
      };

    case UpdateScore:
      let {score} = action;
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
        ...initialState,
        timerRunning: true,
        highScore: state.highScore,
        highScores: state.highScores,
        startTime: performance.now(),
        name: state.name,
        uuid: state.uuid
      };

    case Flap:
      if ( ! state.timerRunning) { return state; }
      let newState = {
        ...state,
        jumpCount: state.jumpCount + 1,
        initialVelocity: gc.jumpVel,
        flappyStartTime: action.time
      };

      return newState;

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
