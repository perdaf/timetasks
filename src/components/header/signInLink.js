import React from 'react';

import { NavLink } from 'react-router-dom';

export default function SignInLink() {
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
        <NavLink to="/logout" className="nav-link text-light">
          Logout
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/userDetail"
          className="nav-link text-light font-weight-bold bg-primary rounded-circle"
          style={{
            display: 'inlinBlock',
            position: 'relative',
            width: '45px',
            textIndent: '-3px',
            fontSize: '1.5rem',
            top: '-5px',
          }}
        >
          SP
        </NavLink>
      </li>
    </React.Fragment>
  );
}
