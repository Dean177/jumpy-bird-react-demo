import React, { Component, PropTypes } from 'react';
import { nameUpdate } from './../ActionCreators/GameDetails';


class JumpyBird extends Component {
  static propTypes = {
    gameDetails: PropTypes.shape({
      uuid: PropTypes.string,
      name: PropTypes.string
    }),
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.onNameChange = ({ target: { value } }) => {
      this.props.dispatch(nameUpdate(value, this.props.gameDetails.uuid));
    }
  }

  render() {
    const { name, highScores, } = this.props.gameDetails;
    const scores = highScores.map(({ uuid, name, score }) => <li key={uuid}>{`${name}: ${score}`}</li>);

    return (
      <div className="side-panel">
        <div className="name-entry">
          <label>Enter Name:</label>
          <input onChange={this.onNameChange} value={name}/>
        </div>
        <div className="high-scores">
          <h1>High Scores</h1>
          <ul className="scores">
            {scores}
          </ul>
        </div>
      </div>
    );
  }
}

export default JumpyBird
