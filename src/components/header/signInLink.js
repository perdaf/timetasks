import React from 'react';
import './signlinkin.scss';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authAction';

const SignInLink = props => {
  const { user, auth } = props;
  return (
    <React.Fragment>
      <li className="nav-item">
        <NavLink to="/" className="nav-link text-light">
          <i className="fas fa-home" /> Home
        </NavLink>
      </li>
      <li className="nav-item dropdown">
        <button
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          // role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Project/task
        </button>
        <div className="dropdown-menu bg-dark">
          <NavLink to="/add-project" className="dropdown-item text-light">
            <i className="fas fa-plus" /> Add Project
          </NavLink>
          <NavLink to="/add-task" className="dropdown-item text-light">
            <i className="fas fa-plus" /> Add Task
          </NavLink>
        </div>
      </li>
      <li className="nav-item">
        <NavLink to="/about" className="nav-link text-light">
          About
        </NavLink>
      </li>
      <li className="nav-item">
        <a href="#/" className="nav-link text-light" onClick={props.onLogOut}>
          Logout
        </a>
      </li>
      <li className="nav-item">
        <NavLink
          to={`/user-detail/${auth.uid}`}
          className="nav-link text-light font-weight-bold bg-primary rounded-circle"
          style={{
            display: 'inlinBlock',
            margin: '0',
            padding: '0',
            boxSizing: 'border-box',
            position: 'relative',
            width: '45px',
            height: '45px',
            lineHeight: '40px',
            textAlign: 'center',
            fontSize: '1.5rem',
            top: '-5px',
            textTransform: 'uppercase',
          }}
        >
          {user.initials}
        </NavLink>
      </li>
    </React.Fragment>
  );
};
const mapStateToProps = state => {
  console.log('header > State >>>', state);
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
