import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

function ResumStat(props) {
  const { projets, users, tasks } = props;

  let nbProj, nbUsers, nbTasks;
  if (projets !== null) {
    nbProj = projets.length;
  }
  if (users !== null) {
    nbUsers = users.length;
  }
  if (tasks !== null) {
    nbTasks = tasks.length;
  }
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3 className="text-center">vue d'enssemble</h3>
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="card-title col">
              <h5>Projets</h5>
            </div>
            <div className="card-title col">
              <h5>Taches</h5>
            </div>
            <div className="card-title col">
              <h5>Utilisateurs</h5>
            </div>
          </div>
          <div className="row text-center">
            <div className="card-title col">
              <h5>{nbProj}</h5>
            </div>
            <div className="card-title col">
              <h5>{nbTasks}</h5>
            </div>
            <div className="card-title col">
              <h5>{nbUsers}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  let users;
  let projets;
  let tasks;

  try {
    tasks = state.firestore.ordered.Tasks;
    users = state.firestore.ordered.users;
    projets = state.firestore.ordered.Project;
  } catch (err) {
    console.error(err);
  }

  return {
    tasks: tasks ? tasks : null,
    auth: state.firebase.auth,
    users: users ? users : null,
    projets: projets ? projets : null,
  };
};

export default compose(
  firestoreConnect([
    { collection: 'Tasks', orderBy: ['createdAt', 'desc'] },
    { collection: 'users', orderBy: ['lastName', 'desc'] },
    { collection: 'Project', orderBy: ['createdAt', 'desc'] },
  ]),
  connect(mapStateToProps)
)(ResumStat);
