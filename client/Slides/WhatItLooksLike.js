import '!style!css!../resources/styles/solarized_dark.css';

import React, { Component } from 'react';
import Highlight from 'react-highlight';

export default class WhatItLooksLike extends Component {
  render() {
    return (
      <div className="text-slide">
        <Highlight className='javascript'>
          {`
import React, { Component } from 'react';
import HighLight from 'react-highlight';

export default class WhatItLooksLike extends Component {
  render() {
    return (
      <div className="text-slide">
        <Highlight className='javascript'>
          {"code snippet to be highlighted"}
        </Highlight>
      </div>
    );
  }
}
          `}
        </Highlight>
      </div>
    );
  }
}