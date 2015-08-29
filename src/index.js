import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import JumpyBird from './JumpyBird';
import Reducer from './Reducer';

const store = createStore(Reducer);

React.render(
  (<Provider store={store}>
    {() => <JumpyBird />}
  </Provider>),
  document.getElementById('jumpy-bird')
);
