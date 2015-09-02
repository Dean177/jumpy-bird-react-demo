import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import Reducer from './Reducer';
import gameLoop from './gameLoop';
import JumpyBird from './JumpyBird';

const store = createStore(Reducer);
const onNewFrame = gameLoop(store);
export const socket = io.connect('http://localhost:9000');

window.requestAnimationFrame(onNewFrame);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <JumpyBird />}
      </Provider>
    );
  }
}