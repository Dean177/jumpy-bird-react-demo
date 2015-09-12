import { hasCollided, getScore } from './GameFunctions';
import { updateGame, gameOver, updateScore } from './ActionCreators/Flappy';


export default function gameLoop(stateStore) {
  let store = stateStore;

  const timeStep = (timeStamp) => {
    store.dispatch(updateGame(timeStamp));
    const state = store.getState();
    const { flappyY, pillarList, isTimerRunning, startTime, score, highScore } = state.flappy;

    if (isTimerRunning) {
      store.dispatch(updateScore(score, getScore(timeStamp - startTime), highScore, state.gameDetails.uuid));
      if (hasCollided(pillarList, flappyY)) {
        store.dispatch(gameOver());
      }
    }

    window.requestAnimationFrame(timeStep);
  };

  return timeStep;
}