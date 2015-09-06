import React, { Component } from 'react';

export default class ViewFunctionState extends Component {
  render() {
    return (
      <div className="text-slide">
        <p>React = (state) => View</p>
        <p>
          Components are Just Like Functions
        </p>
        <p>
          React components are very simple. You can think of them as functions that take in state and render HTML. With this in mind, components are easy to reason about.
        </p>
        <p>
          A better separation of concerns (not just a separation of languages)
          Markup and the code that generates it are intimately tied together.
          Additionally, display logic is often very complex and using template languages to express it becomes cumbersome.
          Don't use templating languages, use an actual language (CoffeeScript, TypeScript, Clojure, ScalaJs...)
        </p>
      </div>
    );
  }
}