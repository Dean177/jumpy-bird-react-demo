import '!style!css!../resources/styles/solarized_dark.css';
import React, { Component } from 'react';
import Highlight from 'react-highlight';

export default class WhatItLooksLikeSimple extends Component {
  render() {
    return (
      <div className="code-slide">
        <p>
          You can think of React components as functions that take in data and render HTML.
        </p>
        <p>
          Components can either be passed data (props), or materialize their own state and manage it over time (state)
        </p>
        <Highlight className='javascript'>
          {`
  import Tank, { getFish } from 'Tank';

  // Using an ES6 arrow function:
  const Aquarium = (props) => {
    var fish = getFish(props.species);
    return <Tank>{fish}</Tank>;
  };

  // With destructuring and an implicit return, simply:
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