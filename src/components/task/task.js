import React, { Component } from 'react';
import Timer from '../timer/Timer';

class Task extends Component {
  state = {
    showTaskDetail: this.props.showTaskDetail,
  };

  onShowClick = () => {
    this.setState({
      showTaskDetail: !this.state.showTaskDetail,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.showTaskDetail !== prevProps.showTaskDetail) {
      this.setState({
        showTaskDetail: this.props.showTaskDetail,
      });
    }
  }

  render() {
    const { taskId, taskElapsTime, taskDesc, taskName } = this.props;
    const { showTaskDetail } = this.state;

    return (
      <div className="card mb-3">
        <div
          className="card-header text-dark d-flex align-items-center"
          style={{ maxHeight: '45px' }}
        >
          <div className="p-2">
            <h4>{taskName}</h4>
          </div>
          <i
            className="fas fa-angle-down fa-2x p-2"
            style={{ cursor: 'pointer' }}
            onClick={this.onShowClick}
          />
          <div className="ml-auto p-2">
            <Timer taskId={taskId} taskElapsTime={taskElapsTime} />
          </div>
        </div>
        {showTaskDetail ? (
          <div className="card-body text-center">
            <p className="card-text text-dark">{taskDesc}</p>
            <button
              className="btn btn-secondary mx-2"
              onClick={() => this.props.btnEditHandler(taskId)}
            >
              edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.props.btnDeleteHandler(taskId)}
            >
              delete
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Task;
