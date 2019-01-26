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
      nonce: 0, // juste la pour forcé le rendu par modification d'un state
      startCount: false,
      timerDisplay: 0,
    };

    this.timeInterval = null;
    //bind function if you write old way function: addTimerEvent() {...}
    // this.addTimerEvent = this.addTimerEvent.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.taskElapsTime) !==
      JSON.stringify(prevProps.taskElapsTime)
    ) {
      this.updateStateTimerDisplay();
    }
  }

  updateStateTimerDisplay() {
    this.setState({ timerDisplay: this.props.taskElapsTime }, () => {
      console.log('timer create >>>', this.state.timerDisplay);
    });
  }

  componentDidMount() {
    console.log('timer create >>>', this.state.timerDisplay);
    this.setState({ timerDisplay: this.props.taskElapsTime }, () => {
      console.log('timer create >>>', this.state.timerDisplay);
    });
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
    this.setState(prevState => ({
      nonce: prevState.nonce + 1,
      timerDisplay: prevState.timerDisplay + 1,
    }));
  };

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

    if (!stCount) {
      let elapsed_time = this.props.taskElapsTime || 0;
      // -------------------------------------------------------
      for (let i = 0; i < this.state.timingEvents.length; i += 2) {
        const start = this.state.timingEvents[i];
        const stop = this.state.timingEvents[i + 1] || new Date();

        elapsed_time += stop - start;
      }

      this.props.EditTimeTask(elapsed_time, this.props.taskId);
    }
  };

  render() {
    return (
      <div className="d-flex align-items-center">
        <div className="timer-display">
          <TimeDisplay timeElaps={this.state.timerDisplay} />
          {this.state.timerDisplay}
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

// const mapStateToProps = (state, ownProps) => {
//   const id = ownProps.taskId;
//   const tasks = state.firestore.data.Tasks;
//   const task = tasks ? tasks[id] : null;

//   return {
//     task: task,
//   };
// };
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
