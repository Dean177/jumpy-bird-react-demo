import React, { Component } from 'react';

export default class WhatItIs extends Component {
  render() {
    return (
      <div className="text-slide">
        <h1 className="Slide-title">So... What is it?</h1>
        <ul>
          <li>Simple and declarative</li>
          <li>Highly performant</li>
          <li>Just the (Component based) view layer</li>
        </ul>
      </div>
    );
  }
}