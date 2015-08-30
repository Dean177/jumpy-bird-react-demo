import Actions from './ActionTypes';
import * as gc from './GameConstants';


const initialState = {
  timerRunning: false,
  jumpCount: 0,
  initialVelocity: 0,
  startTime: 0,
  flappyStartTime: 0,
  flappyY: 200,
  pillarList: [
    { startTime: 0, currentX: 450, posX: 450, gapTop: 200 }
  ]
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case Actions.UpdateFlappy:
      console.log(action);
      return {
        ...state,
        flappyY: action.newY
      };

    case Actions.Reset:
      return {
        ...initialState,
        timerRunning: true
      };

    case Actions.Flap:
      let newState = {
        ...state,
        jumpCount: state.jumpCount + 1,
        initialVelocity: gc.jumpVel,
        flappyStartTime: action.currentTime
      };

      return newState;

    default:
      return state;
  }
}
