import React, { Component } from 'react';

export default class Testing extends Component {
  render() {
    return (
      <div className="text-slide">
        <h1>Testing</h1>
        <p>Testing complicated knockout views is a nightmare because of the dependency chains</p>
        <p>Testing components is simple, they are just functions</p>
        <p>Testing reducers is simple, they are just functions</p>
        <p>https://facebook.github.io/jest/docs/tutorial-react.html</p>
      </div>
    );
  }
}