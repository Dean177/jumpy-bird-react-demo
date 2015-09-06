import '!style!css!../resources/styles/solarized_dark.css';
import Highlight from 'react-highlight';
import React, { Component } from 'react';

export default class Architecture extends Component {
  render() {
    return (
      <div className="text-slide">
        <div className="text-slide">
          <p>redux: http://rackt.github.io/redux/index.html</p>
          <p>redux = (state, action) => state</p>
          <Highlight className='ascii' >
          {`
 _________               ____________              ___________
|         |             |            |            |           |
| Action  |------------>|  Reducer   |----------->|   State   |
|_________|             |____________|            |___________|
     ?                                                  |
     |                                                  |
     |                                                  |
     |                                                  |
     |                                                  |
 ____|________                ___________               |
|   User       |             |   React   |              |
| interactions | <---------- |   Views   |<------------ |
|______________|             |___________|
          `}
          </Highlight>
        </div>
      </div>
    );
  }
}