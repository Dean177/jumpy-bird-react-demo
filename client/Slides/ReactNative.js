import React, { Component } from 'react';
import reactNativeUrl from '../resources/images/ReactNative.png';

export default class ReactNative extends Component {
  render() {
    return (
      <div className="text-slide">
        <img className="reactNatve" src={reactNativeUrl} />
        <h2><a href="https://facebook.github.io/react-native/" target="_blank">React Native</a></h2>
      </div>
    );
  }
}