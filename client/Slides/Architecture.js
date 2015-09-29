import archDiagramUrl from '../resources/images/architecture-diagram.png';
import Highlight from 'react-highlight';
import React, { Component } from 'react';

export default class Architecture extends Component {
  render() {
    return (
      <div className="text-slide">
        <p><a href="http://rackt.github.io/redux/index.html" target="__blank">Redux</a></p>
        <p>Reducer = (state, action) => state</p>
        <img className="arch-diagram" src={archDiagramUrl} />
      </div>
    );
  }
}