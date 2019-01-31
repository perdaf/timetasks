import React, { Component } from 'react';
import formatDuration from 'format-duration';

class TimeDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      affTime: 0,
      time: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.timeElaps !== prevProps.timeElaps) {
      // console.log('PROPS NON IDENTIQUE >>>', this.props.timeElaps);
      let time = formatDuration(this.props.timeElaps);
      this.setState({
        affTime: this.props.timeElaps,
        time,
      });
      // console.log('update >>>', this.state.time);
    }
  }

  render() {
    // console.log('TimerDisplay time >>>', this.state.time);

    return (
      <div>
        <span className="display-4 font-weight-bold my-2">
          {this.state.time}
        </span>
      </div>
    );
  }
}

export default TimeDisplay;
