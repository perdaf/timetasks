import React, { Component } from 'react';
import formatDuration from 'format-duration';

class TimeDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // timingEvents: this.props.timingEvents,
      taskElaps: this.props.timeElaps,
    };
  }

  componentDidMount() {
    this.setState({
      taskElaps: this.props.timeElaps || 0,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.timeElaps) !==
      JSON.stringify(prevProps.timeElaps)
    ) {
      this.updateStateTimerDisplay();
    }
  }

  updateStateTimerDisplay() {
    this.setState({ taskElaps: this.props.timeElaps }, () => {
      console.log('timerdisplay create >>>', this.state.taskElaps);
    });
  }

  // calcTime = (events, elapsed) => {
  //   // console.log('events >>> ', events);
  //   // console.log('elapsed >>> ', elapsed);

  //   for (let i = 0; i < events.length; i += 2) {
  //     const start = events[i];
  //     const stop = events[i + 1] || new Date();

  //     elapsed += stop - start;
  //   }

  //   return elapsed;
  // };
  render() {
    // console.log('%c props >>> ', 'background:#222; color: #bada55');
    // console.log(this.props);

    return (
      <div>
        <span>{formatDuration(this.state.taskElaps)}</span>
      </div>
    );
  }
}

export default TimeDisplay;
