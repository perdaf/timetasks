import React, { Component } from 'react';
import TimeDisplay from './TimeDisplay';
import ButtonTimer from './ButtonTimer';
import '../../scss/timer.scss';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timingEvents: [],
      nonce: 0, // juste la pour forcé le rendu par modification d'un state
      startCount: false,
    };

    this.timeInterval = null;
    //bind function if you write old way function: addTimerEvent() {...}
    // this.addTimerEvent = this.addTimerEvent.bind(this);
  }
  startInterval = () => {
    // si setInterva exit et n'es pas nul on le kill
    if (this.timeInterval != null) {
      clearInterval(this.timeInterval);
    }
    // le state startCount es passer a true/false par addTimeEvent
    // si true on demarre le setInterval
    if (this.state.startCount) {
      this.timeInterval = setInterval(this.tick, 1000);
    }
  };

  // tick es lancer avec un setInterval (startInterval) et va 'forcé' le rendu
  // en updatant la valeur du state nonce
  tick = () => {
    this.setState(prevState => ({ nonce: prevState.nonce + 1 }));
  };

  componentDidMount() {
    this.startInterval();
  }

  addTimerEvent = () => {
    // on recup la valeur inversse du state startCount
    let stCount = !this.state.startCount;
    this.setState(
      {
        timingEvents: [...this.state.timingEvents, new Date()],
        startCount: stCount,
      },
      () => {
        // setState es une fonction async donc startInterval es lancer en callback
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
