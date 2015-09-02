import React, { Component, PropTypes } from 'react';

class Flappy extends Component {
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

Flappy.propTypes = {
    y: PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired
};

export default Flappy
