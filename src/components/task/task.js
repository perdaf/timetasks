import React, { Component } from 'react';
import Timer from '../timer/Timer';

// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { firestoreConnect } from 'react-redux-firebase';

class Task extends Component {
  state = {
    showTaskDetail: false,
  };

  onShowClick = () => {
    this.setState({
      showTaskDetail: !this.state.showTaskDetail,
    });
  };

  render() {
    const { taskId, taskElapsTime, taskDesc, taskName } = this.props;
    const showTaskDetail = this.state.showTaskDetail;

    return (
      <div className="card mb-3">
        <div className="card-header text-dark d-flex align-items-center">
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

// const mapStateToProps = (state, ownProps) => {
//   const id = ownProps.taskId;
//   const tasks = state.firestore.data.Tasks;
//   const task = tasks ? tasks[id] : null;

//   return {
//     task: task,
//   };
// };

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([{ collection: 'Tasks' }])
// )(Task);

export default Task;
