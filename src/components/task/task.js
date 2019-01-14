import React, { Component } from 'react';
import Timer from '../timer/Timer';
import './task.scss';

export default class Task extends Component {
  render() {
    return (
      <div className="task">
        <div className="task-header">
          <h4>{this.props.taskName}</h4>
          <div className="pushRigth">
            <Timer taskElapsTime={this.props.taskElapsTime} />
          </div>
        </div>
        <div className="task-collapse">
          <p className="task-desc">{this.props.taskDesc}</p>
          <button
            className="btn btn-secondary pushRigth"
            onClick={() => this.props.btnEditHandler(this.props.taskId)}
          >
            edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.props.btnDeleteHandler(this.props.taskId)}
          >
            delete
          </button>
        </div>
      </div>
    );
  }
}
