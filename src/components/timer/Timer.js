import React, { Component } from 'react';
import TimeDisplay from './TimeDisplay';
import ButtonTimer from './ButtonTimer';
import '../../scss/timer.scss';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timingEvents: [],
      nonce: 0,
      startCount: false,
    };

    this.timeInterval = null;
    //bind function if you write old way function: addTimerEvent() {...}
    // this.addTimerEvent = this.addTimerEvent.bind(this);
  }
  startInterval = () => {
    // console.log('fct setInterval', this.state);
    if (this.timeInterval != null) {
      // console.log('clear setInterval');
      clearInterval(this.timeInterval);
    }
    if (this.state.startCount) {
      // console.log('start setInterval');
      this.timeInterval = setInterval(this.tick, 1000);
    }
  };

  tick = () => {
    this.setState(prevState => ({ nonce: prevState.nonce + 1 }));
  };

  componentDidMount() {
    this.startInterval();
  }

  // functions ----------
  addTimerEvent = () => {
    // console.log('fct addTimer >>>');
    let stCount = !this.state.startCount;
    this.setState(
      {
        timingEvents: [...this.state.timingEvents, new Date()],
        startCount: stCount,
      },
      () => {
        // setState es une fonction async donc callback
        this.startInterval();
      }
    );
  };

  render() {
    return (
      <div className="timer">
        <div className="timer-display">
          <TimeDisplay timingEvents={this.state.timingEvents} />
        </div>
        <div className="timer-button">
          <ButtonTimer
            handleClick={this.addTimerEvent}
            timingEvents={this.state.timingEvents}
          />
        </div>
      </div>
    );
  }
}
