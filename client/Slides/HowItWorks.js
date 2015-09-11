import React, { Component } from 'react';

export default class HowItWorks extends Component {
  render() {
    return (
      <div className="text-slide">
        <p>React = (state) => View</p>
        <ul>
          <li>re-renders the entire view on every change of state and props</li>
          <ul>
            <li>Doesn't that just kill performance?</li>
            <li>Doesn't mess up scrolling?</li>
            <li>Doesn't that mean needlessly tearing down and rebuilding DOM?</li>
            <li>NO</li>
          </ul>
          <li>Diffs the current dom to find the minimal change set (Isnt tree-diffing O(n^3)?)</li>
          <li>Mutates the DOM using this change set.</li>
        </ul>
      </div>
    );
  }
}