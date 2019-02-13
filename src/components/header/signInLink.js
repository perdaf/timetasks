import React from 'react';
import './signlinkin.scss';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authAction';

const SignInLink = props => {
  const { user, auth } = props;

  const projectTaskByRole = () => {
    if (user.role === 'admin') {
      return (
        <li className="nav-item dropdown">
          <button
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Projets/Taches
          </button>
          <div className="dropdown-menu bg-dark">
            <NavLink to="/add-project" className="dropdown-item text-light">
              <i className="fas fa-plus" /> Ajouter un Projet
            </NavLink>
            <NavLink to="/add-task" className="dropdown-item text-light">
              <i className="fas fa-plus" /> Ajouter une Tache
            </NavLink>
          </div>
        </li>
      );
    } else {
      return (
        <li className="nav-item dropdown">
          <button
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Tache
          </button>
          <div className="dropdown-menu bg-dark">
            <NavLink to="/add-task" className="dropdown-item text-light">
              <i className="fas fa-plus" /> Ajouter une Tache
            </NavLink>
          </div>
        </li>
      );
    }
  };
  return (
    <React.Fragment>
      {/* <li className="nav-item">
        <NavLink to="/" className="nav-link text-light">
          <i className="fas fa-home" /> Home
        </NavLink>
      </li> */}
      {projectTaskByRole()}
      <li className="nav-item">
        <NavLink to="/about" className="nav-link text-light">
          A propos
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink
          to={`/user-detail/${auth.uid}`}
          className="nav-link text-light font-weight-bold bg-primary pastille"
        >
          {user.initials}
        </NavLink>
      </li>

      <li className="nav-item">
        <button className="nav-link text-light" onClick={props.onLogOut}>
          Logout
        </button>
      </li>
    </React.Fragment>
  );
};
const mapStateToProps = state => {
  // console.log('header > State >>>', state);
  return {
    user: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(signOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInLink);
