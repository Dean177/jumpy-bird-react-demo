import '!style!css!less!./resources/styles/App.less';
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Uuid, HighScores } from '../shared/Constants/FlappyActionTypes';
import { Goto } from '../shared/Constants/SlidesActionTypes';
import { getUuid, highScores } from './ActionCreators/GameDetails';
import { gotoSlide } from './ActionCreators/Slides';
import io from 'socket.io-client';
import appReducer from './Reducers/index';
import gameLoop from './gameLoop';

import SlideWrapper from './SlideWrapper';
import OpeningSlide from './Slides/OpeningSlide';
import WhatItIs from './Slides/WhatItIs';
import WhatItLooksLikeComplicated from './Slides/WhatItLooksLikeComplicated';
import WhatItLooksLikeSimple from './Slides/WhatItLooksLikeSimple';
import HowItWorks from './Slides/HowItWorks';
import SoWhatAboutTheRest from './Slides/SoWhatAboutTheRest';
import Architecture from './Slides/Architecture';
import ImmutableData from './Slides/ImmutableData';
import FlappyDemoSlide from './Slides/FlappyDemoSlide';
import TimeTravel from './Slides/TimeTravel';
import Testing from './Slides/Testing';
import ServerSide from './Slides/ServerSide';
import WhoUsesIt from './Slides/WhoUsesIt';


const store = createStore(appReducer);
const onNewFrame = gameLoop(store);

export const socket = io.connect(`http://${window.location.hostname}:9000`);
socket.on(Uuid, (uuid) => { store.dispatch(getUuid(uuid)); });
socket.on(HighScores, (newHighScores) => { store.dispatch(highScores(newHighScores)); });
socket.on(Goto, (slideNumber) => { store.dispatch(gotoSlide(slideNumber))});

window.requestAnimationFrame(onNewFrame);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SlideWrapper>
          <OpeningSlide />
          <WhatItIs />
          <WhatItLooksLikeSimple />
          <WhatItLooksLikeComplicated />
          <HowItWorks />
          <SoWhatAboutTheRest />
          <Architecture />
          <ImmutableData />
          <FlappyDemoSlide />
          <TimeTravel />
          <Testing />
          <ServerSide />
          <WhoUsesIt />
        </SlideWrapper>
      </Provider>
    );
  }
}

export default App