import React from 'react';
import logo from '../../logo-white.png';
import './header.scss';

import SignInLink from './signInLink';
import SignOutLink from './signOutLink';

import { connect } from 'react-redux';

const Header = props => {
  const { auth } = props;
  // if auth affiche les liens adequat
  const link = auth.uid ? <SignInLink /> : <SignOutLink />;
  return (
    <nav className="top-nav d-flex justify-content-between align-items-center">
      <div className="logo">
        <img
          src={logo}
          alt={logo}
          className="logo"
          style={{ height: '70px' }}
        />
      </div>
      <div className="top-menu">
        <ul className="navbar nav mr-auto">{link}</ul>
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
