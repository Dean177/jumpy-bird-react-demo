import '!style!css!less!./resources/styles/app.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gc from './GameConstants';
import { flap, startGame } from './ActionCreators';

@connect((state) => state)
export default class JumpyBird extends Component {
  constructor(props) {
    super(props);

    this.handleClick = (event) => {
      event.preventDefault();
      this.props.dispatch(flap());
    }

    this.startGame = (event) => {
      event.preventDefault();
      this.props.dispatch(startGame());
    }
  }

  getPillar({ currentX, posX, gapTop }) {
    let upperHeight = gapTop
    let lowerHeight = gc.bottomY - gapTop - gc.pillarGap
    return (
      <div key={posX} className="pillars">
        <div className="pillar pillar-upper" style={{ left: currentX, height: upperHeight }}/>
        <div className="pillar pillar-lower" style={{ left: currentX, height: lowerHeight }}/>
      </div>
    );
  }

  getScore (currentTime, startTime) {
    let currentX = (currentTime - startTime) * gc.horizVel;
    let score = Math.floor((currentX - 544) / gc.pillarSpacing) -3;

    return (score < 0) ? 0 : score;
  }

  render() {
    const {
      flappyY,
      pillarList,
      dispatch,
      timerRunning,
      jumpCount,
      borderPosition,
      startTime
    } = this.props;

    const pillars = pillarList.map(this.getPillar);
    const score = this.getScore(performance.now(), startTime);
    const buttonText = (jumpCount >= 1) ? "RESTART" : "START";

    return (
      <div className="board" onClick={this.handleClick}>
        <h1 className="score">{score}</h1>
        { ( ! timerRunning) ? <a className="start-button" onClick={this.startGame}>{buttonText}</a> : <span /> }
        <div>
          {pillars}
        </div>
        <div className="flappy" style={{ top: flappyY }} />
        <div className="scrolling-border" style={{ backgroundPosition: borderPosition }}/>
        <h3 className="jump-count">{jumpCount}</h3>
      </div>
    );
  }
}
