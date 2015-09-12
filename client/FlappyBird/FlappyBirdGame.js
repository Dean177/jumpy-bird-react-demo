import '!style!css!less!../resources/styles/JumpyBird.less';
import React, { Component, PropTypes } from 'react';
import * as gc from './../Constants/GameConstants';
import { flap, startGame } from './../ActionCreators/Flappy';
import Flappy from './Flappy';
import { Space } from './../Constants/KeyCodes';

class JumpyBird extends Component {
  static propTypes = {
    gameState: PropTypes.shape({
      flappyY: PropTypes.number,
      pillarList: PropTypes.array,
      isTimerRunning: PropTypes.boolean,
      jumpCount: PropTypes.number,
      borderPosition: PropTypes.number,
      velocity: PropTypes.number,
      score: PropTypes.number,
      highScore: PropTypes.number
    }),
    dispatch: PropTypes.func
  };


  constructor(props) {
    super(props);

    this.handleKeyPress = (event) => {
      if (event.keyCode === Space) {
        this.props.dispatch(flap(this.props.gameState.isTimerRunning));
      }
    };

    this.handleClick = (event) => {
      event.preventDefault();
      this.props.dispatch(flap(this.props.gameState.isTimerRunning));
    };

    this.startGame = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.props.dispatch(startGame());
    };
  }

  getPillar ({ currentX, posX, gapTop }) {
    let upperHeight = gapTop;
    let lowerHeight = gc.bottomY - gapTop - gc.pillarGap;
    return (
      <div key={posX} className="pillars">
        <div className="pillar pillar-upper" style={{ left: currentX, height: upperHeight }}/>
        <div className="pillar pillar-lower" style={{ left: currentX, height: lowerHeight }}/>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    const {
      flappyY,
      pillarList,
      isTimerRunning,
      jumpCount,
      borderPosition,
      velocity,
      score,
      highScore,
    } = this.props.gameState;

    const pillars = pillarList.map(this.getPillar);
    const buttonText = (jumpCount >= 1) ? "RESTART" : "START";

    return (
      <div className="board" onClick={this.handleClick}>
        <h1 className="score">{score}</h1>
        { ( ! isTimerRunning) ? <a className="start-button" onClick={this.startGame}>{buttonText}</a> : <span /> }
        <div>
          {pillars}
        </div>
        <Flappy x={gc.flappyX} y={flappyY} velocity={velocity} />
        <div className="scrolling-border" style={{ backgroundPosition: borderPosition }}/>
        <h3 className="jump-count">Flaps: {jumpCount}</h3>
        <h3 className="high-score">High Score: {highScore}</h3>
      </div>
    );
  }
}

export default JumpyBird
