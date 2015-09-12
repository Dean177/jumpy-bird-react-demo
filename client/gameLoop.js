import { hasCollided, getScore } from './GameFunctions';
import { updateGame, gameOver, updateScore } from './ActionCreators/Flappy';


export default function gameLoop(stateStore) {
  let store = stateStore;

  const timeStep = (timeStamp) => {
    store.dispatch(updateGame(timeStamp));
    const state = store.getState().flappy;
    const { flappyY, pillarList, timerRunning, startTime, score, highScore, uuid, name } = state;
    if (timerRunning) {
      store.dispatch(updateScore(score, getScore(timeStamp - startTime), highScore, uuid, name));
      if (hasCollided(pillarList, flappyY)) {
        store.dispatch(gameOver())
      }
    }

    window.requestAnimationFrame(timeStep);
  };

  return timeStep;
}