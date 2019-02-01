import React from 'react';
import logo from '../../logo-white.png';

import SignInLink from './signInLink';
import SignOutLink from './signOutLink';

import { connect } from 'react-redux';

const Header = props => {
  const { auth } = props;
  const link = auth.uid ? <SignInLink /> : <SignOutLink />;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3 py-2">
      <div className="container">
        <img
          src={logo}
          alt={logo}
          className="logo"
          style={{ height: '70px' }}
        />
        <div>
          <ul className="nav-bar nav mr-auto">{link}</ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Header);
