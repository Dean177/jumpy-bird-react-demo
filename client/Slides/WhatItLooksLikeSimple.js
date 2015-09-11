import '!style!css!../resources/styles/solarized_dark.css';
import React, { Component } from 'react';
import Highlight from 'react-highlight';

export default class WhatItLooksLikeSimple extends Component {
  render() {
    return (
      <div className="code-slide">
        <p>
          You can think of React components as functions that take in state and render HTML.
        </p>
        <Highlight className='javascript'>
          {`
  import Tank, { getFish } from 'Tank';

  // Using an ES2015 (ES6) arrow function:
  const Aquarium = (props) => {
    var fish = getFish(props.species);
    return <Tank>{fish}</Tank>;
  };

  // Or with destructuring and an implicit return, simply:
  const Aquarium = ({species}) => (
    <Tank>
      {getFish(species)}
    </Tank>
  );

  export default Aquarium
            `}
        </Highlight>
      </div>
    );
  }
}