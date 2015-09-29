import { Next, Previous, Goto } from '../../shared/Constants/SlidesActionTypes';

const initialState = {
  slideNumber: 0
};

export default function slidesReducer(state = initialState, action) {
  switch (action.type) {
    case Next:
      return { slideNumber: state.slideNumber + 1 };

    case Previous:
      return { slideNumber: state.slideNumber - 1 };

    case Goto:
      return {
        slideNumber: action.slideNumber
      };

    default:
      return state;
  }
}