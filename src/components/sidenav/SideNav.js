import React from 'react';
import './sidenav.scss';

import { NavLink } from 'react-router-dom';

const SideNav = () => {
  return (
    <nav className="sidenav">
      <div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to="/users-page">
              Liste des utilisateurs <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/tasks-page">
              Lsite des taches
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/projects-page">
              Lsite des projets
            </NavLink>
          </li>
        </ul>

        {/* <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <NavLink className="d-flex align-items-center text-muted" to="#" />
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <NavLink className="nav-link active" to="#">
              Dashboard <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="#">
              Orders
            </NavLink>
          </li>
        </ul> */}
      </div>
    </nav>
  );
};

export default SideNav;
