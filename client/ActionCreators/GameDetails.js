import { socket } from './../App';
import { Uuid, HighScores, NameUpdate  } from '../../shared/Constants/FlappyActionTypes';


export function highScores(highScores) {
  return {
    type: HighScores,
    highScores
  }
}

export function getUuid(uuid) {
  return {
    type: Uuid,
    uuid
  }
}

export function nameUpdate(name, uuid) {
  socket.emit(NameUpdate, {name, uuid});
  return {
    type: NameUpdate,
    name
  }
}