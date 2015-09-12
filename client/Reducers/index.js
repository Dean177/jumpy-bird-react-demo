import { combineReducers } from 'redux';
import flappy from './flappyReducer';
import slides from './slidesReducer';
import gameDetails from './gameDetailsReducer';

export default combineReducers({ flappy, slides, gameDetails });