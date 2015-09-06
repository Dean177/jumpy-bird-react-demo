import React, { Component, PropTypes } from 'react';

class Flappy extends Component {
  static propTypes = {
    y: PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired
  };

  render() {
    const { y, velocity } = this.props;
    const rotation = `rotate(${velocity}deg)`;
    return (
      <div className="flappy" style={{
             top: y,
             transform: rotation
           }} />
    );
  }
}

export default Flappy