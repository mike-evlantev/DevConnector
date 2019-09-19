import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import AuthContext from "../../context/auth/authContext";
// import ContactContext from "../../context/contact/contactContext";

const Navbar = ({ title, icon }) => {
  const { isAuthenticated, logout, user } = {}; //useContext(AuthContext);
  const { clearContacts } = {}; //useContext(ContactContext);
  const handleLogout = () => {
    logout();
    clearContacts();
  };
  const authLinks = (
    <Fragment>
      <li className="nav-item dropdown">
        <button
          className="btn btn-light nav-link dropdown-toggle"
          id="navbarDropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-user"></i> {user && user.name}
        </button>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {/*TODO: */}
          {/* <a className="dropdown-item" href="#">
            Profile
          </a>
          <div className="dropdown-divider"></div> */}
          <Link className="nav-link" to="/login" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className="hide-sm">Logout</span>
          </Link>
        </div>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className={icon} /> {title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: "DevConnector",
  icon: "fas fa-code"
};
export default Navbar;
