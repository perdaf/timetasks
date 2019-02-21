import React from 'react';
import './task.scss';

import moment from 'moment';
import 'moment-duration-format';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const TaskListe = props => {
  const { task, user } = props;

  const userName = taskCreator => {
    const usercreator = user.filter(user => user.id === taskCreator);
    // console.log('USERCREATOR >>>', usercreator);
    if (usercreator.length > 0) {
      return usercreator[0].lastName + ' ' + usercreator[0].firstName;
    } else {
      return '--';
    }
  };

  if (task.length > 0) {
    return task.map((item, index) => (
      <Link
        to={`/task-detail/${item.id}`}
        className="taskItem my-3 text-dark"
        key={index}
      >
        <div
          className="card my-3 text-dark text-center"
          style={{ minHeight: '200px', width: '250px', margin: '0 15px 0' }}
        >
          <div className="card-header text-center">
            <h5 className="mb-1 font-weight-bold text-truncate">{item.name}</h5>
            {props.role === 'admin' && (
              <small>
                create by <b>{userName(item.createdBy)}</b>
                <br />
                le {moment(item.createdAt.toDate()).format('DD-MM-YYYY')}
              </small>
            )}
          </div>
          <div className="card-body text-center">
            TJ :<h6>{item.thj} &euro;</h6>
          </div>
          <div className="text-center">
            Temp passé sur la tache :
            <h6>
              {moment
                .duration(item.elapsTime, 'milliseconds')
                .format('hh:mm:ss', { trim: false })}
            </h6>
          </div>
        </div>
      </Link>
    ));
  } else {
    return (
      <div>
        <h2 className="text-dark text-center">Aucune tache</h2>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  // console.log('STATE >>>', state);
  const role = ownProps.role;
  const userUid = ownProps.creator;
  const tasks = state.firestore.ordered.Tasks;
  const users = state.firestore.ordered.users;

  // filter result firestore Tasks whith the user auth name
  return {
    task: tasks
      ? tasks.filter(task => {
          if (role === 'admin') {
            return task;
          } else {
            return task.createdBy === userUid;
          }
        })
      : [],
    auth: state.firebase.auth,
    user: users ? users : [],
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'Tasks',
      orderBy: ['createdAt', 'desc'],
      // limit: 3,
      // startAfter: 2,
    },
    { collection: 'users', orderBy: ['lastName', 'desc'] },
  ])
)(TaskListe);
