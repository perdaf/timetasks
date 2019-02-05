import React from 'react';

import moment from 'moment';
import 'moment-duration-format';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const ProjectListe = props => {
  const { user, project } = props;

  const userName = projCreator => {
    const usercreator = user.filter(user => user.id === projCreator);
    // console.log('USERCREATOR >>>', usercreator);
    if (usercreator.length > 0) {
      return usercreator[0].lastName + ' ' + usercreator[0].firstName;
    } else {
      return '--';
    }
  };

  if (project.length > 0) {
    return project.map((item, index) => (
      <Link
        to={`/project-detail/${item.id}`}
        className="list-group-item list-group-item-action mb-2"
        key={index}
      >
        <div className="row">
          <div className="col-sm-4 align-items-end">
            <h5 className="mb-1 font-weight-bold text-truncate">{item.name}</h5>
            {props.role === 'admin' && (
              <small>
                create by <b>{userName(item.createdBy)}</b>
              </small>
            )}
          </div>
          <div className="col-sm-4 border-right border-left d-flex align-items-center justify-content-center">
            <h6>{item.desc}</h6>
          </div>
          <div className="col-sm-3 d-flex align-items-center justify-content-center">
            <h6>{moment(item.deadLine).format('DD-MM-YYYY')}</h6>
          </div>
        </div>
      </Link>
    ));
  } else {
    return (
      <div>
        <h2 className="text-dark text-center">Aucun projets</h2>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  // console.log('STATE >>>', state);
  const users = state.firestore.ordered.users;
  const projects = state.firestore.ordered.Project;

  return {
    project: projects ? projects : [],
    task: state.firestore.ordered.Tasks,
    auth: state.firebase.auth,
    user: users ? users : [],
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'Tasks', orderBy: ['createdAt', 'desc'] },
    { collection: 'users', orderBy: ['lastName', 'desc'] },
    { collection: 'Project', orderBy: ['createdAt', 'desc'] },
  ])
)(ProjectListe);
