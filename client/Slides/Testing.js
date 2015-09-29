import '!style!css!../resources/styles/solarized_dark.css';
import React, { Component } from 'react';
import Highlight from 'react-highlight';

export default class Testing extends Component {
  render() {
    return (
      <div className="code-slide">
        <h1><a href="https://facebook.github.io/jest/docs/tutorial-react.html" target="_blank">Testing</a></h1>
        <p>Testing components is simple, they are just functions</p>
        <p>Testing reducers is simple, they are just functions</p>

        <Highlight className='javascript'>
          {`
describe('CheckboxWithLabel', function() {
  it('changes the text after click', function() {
    var React = require('react/addons');
    var CheckboxWithLabel = require('../CheckboxWithLabel.js');
    var TestUtils = React.addons.TestUtils;

    // Render a checkbox with label in the document
    var checkbox = TestUtils.renderIntoDocument(
      <CheckboxWithLabel labelOn="On" labelOff="Off" />
    );

    // Verify that it's Off by default
    var label = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'label');
    expect(React.findDOMNode(label).textContent).toEqual('Off');

    // Simulate a click and verify that it is now On
    var input = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'input');
    TestUtils.Simulate.change(input);
    expect(React.findDOMNode(label).textContent).toEqual('On');
  });
});
            `}
        </Highlight>
      </div>
    );
  }
}