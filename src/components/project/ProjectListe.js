import React from 'react';
import './project.scss';

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
    // console.log('PROJECT', project);
    return project.map((item, index) => (
      <Link to={`/project-detail/${item.id}`} className="projItem" key={index}>
        <div
          className="card my-3 text-dark"
          style={{ minHeight: '200px', width: '250px', margin: '0 15px 0' }}
        >
          <div className="card-header text-center">
            <h5 className="mb-1 font-weight-bold text-truncate">{item.name}</h5>
            {props.role === 'admin' && (
              <small>
                create by <b>{userName(item.createdBy)}</b>
              </small>
            )}
          </div>
          <div className="card-body text-center">
            <div className=" text-truncate">
              Description :<h6>{item.desc}</h6>
            </div>
            <div>
              DeadLine :<h6>{moment(item.deadLine).format('DD-MM-YYYY')}</h6>
            </div>
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
    auth: state.firebase.auth,
    user: users ? users : [],
  };
};

export default compose(
  firestoreConnect([
    { collection: 'users', orderBy: ['lastName', 'desc'] },
    { collection: 'Project', orderBy: ['createdAt', 'desc'] },
  ]),
  connect(mapStateToProps)
)(ProjectListe);
