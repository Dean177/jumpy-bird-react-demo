import { Uuid, HighScores, NameUpdate  } from '../../shared/Constants/FlappyActionTypes';


const initialState = {
  name: "New Player",
  uuid: null,
  highScores: []
};

export default function PlayerDetailsReducer(state = initialState, action) {
  switch (action.type) {
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