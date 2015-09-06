import React, { Component } from 'react';

export default class TimeTravel extends Component {
  render() {
    return (
      <div className="text-slide">
        <a href="https://www.youtube.com/watch?v=xsSnOQynTHs">Awesome talk on developer tools possible</a>
        <a href="https://github.com/gaearon/redux-devtools"> TimeTravel</a>
        <div className="dev-tools-gif" />
      </div>
    );
  }
}