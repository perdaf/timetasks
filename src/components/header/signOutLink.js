import React from 'react';

import { NavLink } from 'react-router-dom';

export default function SignOutLink() {
  return (
    <React.Fragment>
      <li className="nav-item">
        <NavLink to="/signin" className="nav-link text-light">
          SignIn
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/signup" className="nav-link text-light">
          SignUp
        </NavLink>
      </li>
    </React.Fragment>
  );
}
