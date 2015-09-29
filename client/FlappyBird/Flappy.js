import React, { Component, PropTypes } from 'react';

class Flappy extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired
  };

  render() {
    const { x, y, velocity } = this.props;
    return (
      <div className="flappy" style={{
          left: x,
          top: y,
          //transform: `rotate(${velocity*10}deg)`
          transform: `rotate(${velocity*4}deg)`
        }}></div>
    );
  }
}

export default Flappy