import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import JumpyBird from './JumpyBird';
import Reducer from './Reducer';
import gameLoop from './gameLoop';

const store = createStore(Reducer);

window.requestAnimationFrame((time) => {
  gameLoop(store)(time);
})

React.render(
  (<Provider store={store}>
    {() => <JumpyBird />}
  </Provider>),
  document.getElementById('jumpy-bird')
);
