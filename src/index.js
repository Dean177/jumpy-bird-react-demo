import React from 'react';
import { createRedux } from 'redux';
import { Provider } from 'react-redux';
import JumpyBird from './JumpyBird';
import Reducer from './Reducer';

const redux = createRedux({ JumpyReducer: Reducer });

React.render(
  (<Provider redux={redux}>
    {() => <JumpyBird />}
  </Provider>),
  document.getElementById('jumpy-bird')
);
