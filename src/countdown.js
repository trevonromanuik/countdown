import React, { Component } from 'react';

export default class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = this.calculateState();
    this.poll();
  }

  render() {
    return !this.state.completed ? (
      <div className="countdown">
        {this.state.hours}
        :
        {this.state.minutes}
        :
        {this.state.seconds}
      </div>
    ) : (
      <div className="countdown">
        {this.props.message || 'Countdown Complete!'}
      </div>
    );
  }

  calculateState() {

    let t = this.props.dt - Date.now();
    if (t < 0) return { completed: true };
    
    let hours = Math.floor(t / 3600000);
    t -= hours * 3600000;

    let minutes = Math.floor(t / 60000);
    t -= minutes * 60000;

    let seconds = Math.ceil(t / 1000);
    t -= seconds * 1000;

    return { 
      hours: this.pad(hours), 
      minutes: this.pad(minutes), 
      seconds: this.pad(seconds)
    };

  }

  pad(n) {
    if (n < 10) return `0${n}`;
    return `${n}`;
  }

  poll() {
    setTimeout(() => {
      this.setState(this.calculateState());
      if (!this.state.completed) {
          this.poll();
      }
    }, 100);
  }

}