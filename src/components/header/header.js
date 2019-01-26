import React from 'react';
import logo from '../../logo-white.png';

import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3 py-2">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt={logo} className="logo" />
        </Link>
        <div>
          <ul className="nav-bar nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-light">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
