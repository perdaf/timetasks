import React from 'react';

import moment from 'moment';
import 'moment-duration-format';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Task = props => {
  const { tasks } = props;

  if (tasks.length > 0) {
    return tasks.map((task, index) => {
      return (
        <Link
          to={`/task-detail/${task.id}`}
          className="list-group-item list-group-item-action mb-2"
          key={index}
        >
          <div className="row">
            <div className="col-lg-8">
              <h5 className="mb-1 font-weight-bold">{task.name}</h5>
              {props.role === 'admin' && (
                <small>
                  create by <b>{task.createdBy}</b>
                </small>
              )}
            </div>
            <div className="col-lg border-right border-left d-flex align-items-center justify-content-center">
              <h6>{task.thj || '--'} &euro;</h6>
            </div>
            <div className="col-lg-2 d-flex align-items-center justify-content-center">
              <h6>
                {moment
                  .duration(task.elapsTime, 'milliseconds')
                  .format('hh:mm:ss', { trim: false })}
              </h6>
            </div>
          </div>
        </Link>
      );
    });
  } else {
    return (
      <div>
        <h2 className="text-dark text-center">Aucune tache</h2>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log('ownProps >>>', ownProps);
  const role = ownProps.role;
  const createdBy = ownProps.creator;
  const tasks = state.firestore.ordered.Tasks;

  // filter result firestore Tasks whith the user auth name
  return {
    tasks: tasks
      ? tasks.filter(task => {
          if (role === 'admin') {
            return task;
          } else {
            return task.createdBy === createdBy;
          }
        })
      : [],
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'Tasks', orderBy: ['createdAt', 'desc'] }])
)(Task);
