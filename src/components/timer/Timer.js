import React, { Component } from 'react';
// import formatDuration from 'format-duration';
import TimeDisplay from './TimeDisplay';

import ButtonTimer from './ButtonTimer';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { editElapsTimeTask } from '../../store/actions/taskAction';
class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timingEvents: [],
      startCount: false,
      timerDisplay: 0,
      baseTime: 0,
      totalTimeElaps: 0,
    };

    this.timeInterval = null;
  }

  componentDidMount() {
    this.setState({
      timerDisplay: this.props.taskElapsTime,
      baseTime: this.props.taskElapsTime,
    });
  }

  componentWillUnmount() {
    console.log('total time elaps >>> ', this.state.totalTimeElaps);
    const TimeToSave = (this.state.totalTimeElaps * 1000) + this.state.baseTime;
    this.props.EditTimeTask(TimeToSave, this.props.taskId);
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
  tick = () => {
    this.setState(prevState => ({
      timerDisplay: prevState.timerDisplay + 1000,
      totalTimeElaps: prevState.totalTimeElaps + 1
    }));
  };

  addTimerEvent = () => {
    // on recup la valeur inversse du state startCount
    const stCount = !this.state.startCount;
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

    if (!stCount) {
      // let elapsed_time = this.state.baseTime;
      // // -------------------------------------------------------
      // for (let i = 0; i < this.state.timingEvents.length; i += 2) {
      //   const start = this.state.timingEvents[i];
      //   const stop = this.state.timingEvents[i + 1] || new Date();
      //   elapsed_time += stop - start;
      // }
      // this.setState({ totalTimeElaps: elapsed_time });
      // this.props.EditTimeTask(elapsed_time, this.props.taskId);
    }
  };

  render() {
    return (
      <div className="d-flex align-items-center">
        <div className="timer-display">
          <TimeDisplay timeElaps={this.state.timerDisplay} />
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

const mapDispatchToProps = dispatch => {
  return {
    EditTimeTask: (elapstime, id) => dispatch(editElapsTimeTask(elapstime, id)),
  };
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: 'Tasks' }])
)(Timer);
