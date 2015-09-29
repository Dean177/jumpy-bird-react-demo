import React, { Component } from 'react';

export default class TimeTravel extends Component {
  render() {
    return (
      <div className="text-slide">
        <a href="https://github.com/gaearon/redux-devtools" target="_blank">Redux dev tools</a> & <a href="https://www.youtube.com/watch?v=xsSnOQynTHs" target="_blank">The talk demonstrating them</a>
        <div className="dev-tools-gif" />
      </div>
    );
  }
}