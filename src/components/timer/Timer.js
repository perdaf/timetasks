import React, { Component } from 'react';
// import formatDuration from 'format-duration';
import TimeDisplay from './TimeDisplay';

import ButtonTimer from './ButtonTimer';

import { connect } from 'react-redux';
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
    // if timer dont stop
    if (this.timeInterval != null) {
      clearInterval(this.timeInterval);
    }

    // console.log('total time elaps >>> ', this.state.totalTimeElaps);

    const TimeToSave = this.state.totalTimeElaps * 1000 + this.state.baseTime;
    this.props.EditTimeTask(TimeToSave, this.props.taskId);
  }

  componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (newProps.taskElapsTime !== prevProps.taskElapsTime) {
      this.setState({
        timerDisplay: this.props.taskElapsTime,
        baseTime: this.props.taskElapsTime,
      });
    }
  }

  saveTime = prevProps => {
    // stop interval if exist
    if (this.timeInterval != null) {
      clearInterval(this.timeInterval);
    }
    // calc the time elapsed
    const TimeToSave = this.state.totalTimeElaps * 1000 + this.state.baseTime;

    // compare time to see if it's change
    if (TimeToSave !== this.props.taskElapsTime) {
      // save time
      this.props.EditTimeTask(TimeToSave, this.props.taskId);
      // reset state
      // this.forceUpdate();
      this.setState({
        timerDisplay: this.props.taskElapsTime,
        baseTime: this.props.taskElapsTime,
        totalTimeElaps: 0,
        startCount: false,
        timingEvents: [],
      });
    } else {
      console.log('temp identique');
    }
  };

  resetTimer = () => {
    // console.log('reset timer', );
    if (this.timeInterval != null) {
      clearInterval(this.timeInterval);
    }
    this.setState({
      timerDisplay: this.props.taskElapsTime,
      totalTimeElaps: 0,
      startCount: false,
      timingEvents: [],
    });
  };

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
      totalTimeElaps: prevState.totalTimeElaps + 1,
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
  };

  render() {
    return (
      <div className="d-flex align-items-center flex-column justify-content-between">
        <div className="d-flex flex-row m-3">
          <TimeDisplay timeElaps={this.state.timerDisplay} />
          <ButtonTimer
            className="align-self-center"
            handleClick={this.addTimerEvent}
            timingEvents={this.state.timingEvents}
          />
        </div>
        <div>
          <button className="btn btn-info mb-3 mr-3" onClick={this.saveTime}>
            Save Time
          </button>
          <button className="btn btn-danger mb-3" onClick={this.resetTimer}>
            Reset Timer
          </button>
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

export default connect(
  null,
  mapDispatchToProps
)(Timer);
