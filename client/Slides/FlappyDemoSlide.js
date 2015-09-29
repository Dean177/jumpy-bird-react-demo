import '!style!css!less!../resources/styles/JumpyBird.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlappyBirdGame from '../FlappyBird/FlappyBirdGame';
import GameDetails from '../FlappyBird/GameDetails';

@connect(state => state)
class FlappyDemoSlide extends Component {
  render() {
    const { flappy, gameDetails, dispatch } = this.props;

    return (
      <div className="flappy-slide">
        <FlappyBirdGame gameState={flappy} dispatch={dispatch} />
        <GameDetails gameDetails={gameDetails} dispatch={dispatch} />
      </div>
    );
  }
}

export default FlappyDemoSlide
