import React, { Component } from 'react';

export default class HowItWorks extends Component {
  render() {
    return (
      <div className="text-slide">
        <p>React = (state) => View</p>
        <ul>
          <li>On every change of state and props re-renders the entire view </li>
          <ul>
            <li>Doesn't that just kill performance?</li>
            <li>Doesn't mess up scrolling?</li>
            <li>Doesn't that mean needlessly tearing down and rebuilding DOM?</li>
          </ul>
          <li>Diffs the current dom to find the minimal change set (Isn't tree-diffing O(n^3)?)</li>
          <li>Mutates the DOM using this change set.</li>
        </ul>
      </div>
    );
  }
}