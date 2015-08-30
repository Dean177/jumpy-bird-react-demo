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

  render() {
    const {
      flappyY,
      pillarList,
      dispatch,
      timerRunning,
      jumpCount,
      borderPosition
    } = this.props;

    let pillars = pillarList.map(({ currentX, posX, gapTop }) => {
      let upperHeight = gapTop
      let lowerHeight = gc.bottomY - gapTop - gc.pillarGap
      return (
        <div key={posX} className="pillars">
          <div className="pillar pillar-upper" style={{ left: currentX, height: upperHeight }}/>
          <div className="pillar pillar-lower" style={{ left: currentX, height: lowerHeight }}/>
        </div>
      );
    })

    const buttonText = (jumpCount >= 1) ? "RESTART" : "START";

    return (
      <div className="board" onClick={this.handleClick}>
        <h1 className="score">{jumpCount}</h1>
        { ( ! timerRunning) ? <a className="start-button" onClick={this.startGame}>{buttonText}</a> : <span /> }
        <div>
          {pillars}
        </div>
        <div className="flappy" style={{ top: flappyY }} />
        <div className="scrolling-border" style={{ backgroundPosition: borderPosition }}/>
      </div>
    );
  }
}
