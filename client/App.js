import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { getUuid, highScores } from './ActionCreators';
import io from 'socket.io-client';
import Reducer from './Reducer';
import gameLoop from './gameLoop';
import JumpyBird from './JumpyBird';
import Slides from './Slides';

const store = createStore(Reducer);
const onNewFrame = gameLoop(store);
export const socket = io.connect(`http://${window.location.hostname}:9000`);
socket.on('uuid', (uuid) => { store.dispatch(getUuid(uuid)); });
socket.on('highScores', (newHighScores) => { store.dispatch(highScores(newHighScores)); });

window.requestAnimationFrame(onNewFrame);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() =>
          <Slides>
            <JumpyBird />
          </Slides>
        }
      </Provider>
    );
  }
}