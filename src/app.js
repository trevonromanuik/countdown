import React, { Component } from 'react';
import './app.css';

import Countdown from './countdown'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.calculateState();
  }

  render() {
    return (
      <div className="app">
        {this.state.dt ? (
          <Countdown
            dt={this.state.dt}
            message={this.state.message}
          />
        ) : (
          'Missing dt'
        )}
      </div>
    );
  }

  calculateState() {
    let split = window.location.search.substring(1).split('&');
    let params = {};
    split.forEach((pair) => {
      let s = pair.split('=');
      if (s.length < 2) return;
      switch(s[0]) {
        case 'dt':
          let dt = parseInt(s[1], 10);
          if (!isNaN(dt)) params.dt = dt;
          break;
        case 'm':
          params.message = window.decodeURIComponent(s[1]);
          break;
        default:
          break;
      }
    });
    return params;
  }
}
