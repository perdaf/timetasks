import React from 'react';
import logo from '../../logo-white.png';

import SignInLink from './signInLink';
import SignOutLink from './signOutLink';

import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3 py-2">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt={logo}
            className="logo"
            style={{ height: '70px' }}
          />
        </Link>
        <div>
          <ul className="nav-bar nav mr-auto">
            <SignInLink />
            <SignOutLink />
          </ul>
        </div>
      </div>
    </nav>
  );
}
