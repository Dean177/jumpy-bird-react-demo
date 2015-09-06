import React, { Component } from 'react';

export default class HowItWorks extends Component {
  render() {
    return (
      <div className="text-slide">
        <ul>
          <li>re-renders the entire* component tree to its own virtual dom implementation</li>
          <li>Diffs the current dom to find the minimal change set</li>
          <li>Mutates the DOM using this change set.</li>
        </ul>
      </div>
    );
  }
}