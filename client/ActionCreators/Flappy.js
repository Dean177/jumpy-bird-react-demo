import { socket } from './../App';
import { UpdateGame, UpdateScore, GameOver, Start, Flap } from '../../shared/Constants/FlappyActionTypes';
import * as gc from './../Constants/GameConstants';
import { jump, crash, coin } from './../resources/sounds/index';

export function updateGame(timestamp) {
  return {
    type: UpdateGame,
    timestamp
  }
}

export function startGame() {
  return {
    type: Start
  }
}

export function flap(isTimerRunning) {
  if (isTimerRunning) {
    jump.pause();
    jump.currentTime = 0;
    jump.play();
  }

  return {
    type: Flap,
    time: performance.now()
  };
}

export function updateScore(oldScore, newScore, highScore, uuid) {
  if (newScore > oldScore) {
    coin.play();
  }
  if (newScore > highScore) {
    socket.emit(UpdateScore, { uuid, score: newScore });
  }
  return {
    type: UpdateScore,
    score: newScore
  }
}

export function gameOver() {
  crash.play();
  return {
    type: GameOver
  }
}