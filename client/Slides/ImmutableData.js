import React, { Component } from 'react';

export default class ImmutableData extends Component {
  render() {
    return (
      <div className="video-slide">
        <div className="video">
          <h1><a href="http://swannodette.github.io/mori/" target="__blank">Mori</a></h1>
          <iframe className="youtube" src="https://www.youtube.com/embed/SiFwRtCnxv4" frameborder="0" allowfullscreen></iframe>
        </div>
        <div className="video">
          <h1><a href="https://facebook.github.io/immutable-js/" target="__blank">Immutable Js</a></h1>
          <iframe className="youtube" src="https://www.youtube.com/embed/I7IdS-PbEgI" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    );
  }
}