import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Hacker News
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item m-2">
              <NavLink className="nav-link" exact to="/">
                Top Stories
              </NavLink>
            </li>
            <li className="nav-item m-2">
              <NavLink className="nav-link" to="/newstories">
                New Stories
              </NavLink>
            </li>
            <li className="nav-item m-2">
              <NavLink className="nav-link" to="/beststories">
                Best Stories
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
);

export default Header;
