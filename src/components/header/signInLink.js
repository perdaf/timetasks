import React from 'react';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authAction';

const SignInLink = props => {
  const { user } = props;
  return (
    <React.Fragment>
      <li className="nav-item">
        <NavLink to="/" className="nav-link text-light">
          <i className="fas fa-home" /> Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/add-task" className="nav-link text-light">
          <i className="fas fa-plus" /> Add Task
        </NavLink>
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
          to="/userDetail"
          className="nav-link text-light font-weight-bold bg-primary rounded-circle"
          style={{
            display: 'inlinBlock',
            boxSizing: 'border-box',
            position: 'relative',
            width: '51px',
            textIndent: '-3px',
            fontSize: '1.5rem',
            top: '-5px',
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
