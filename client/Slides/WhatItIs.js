import React, { Component } from 'react';

export default class WhatItIs extends Component {
  render() {
    return (
      <div className="text-slide">
        <p>What is it?</p>
        <ul>
          <li>Just the view layer</li>
          <li>More than just a templating layer, Component based architecture. <a href="https://www.polymer-project.org/1.0/">Web components suck.</a></li>
          <li>Simple and declarative</li>
          <li>A strong alternative to data binding frameworks (think angular & ember, sort of knockout)</li>
        </ul>
      </div>
    );
  }
}