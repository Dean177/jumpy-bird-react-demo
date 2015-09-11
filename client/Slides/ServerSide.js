import React, { Component } from 'react';

export default class ServerSide extends Component {
  render() {
    return (
      <div className="universe-slide">
        <h1>Server side & client side rendering</h1>
        <ul>
          <li>React.render produces a string which can be served to the client on the page request.</li>
          <li>Server side rendering + html5 history api means no downsides</li>
          <li>Server side page response</li>
          <li>React gets bootstrapped</li>
        </ul>
      </div>
    );
  }
}