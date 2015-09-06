import { combineReducers } from 'redux';
import flappy from './flappyReducer';
import slides from './slidesReducer';

const appReducer = combineReducers({ flappy, slides });
export default appReducer;