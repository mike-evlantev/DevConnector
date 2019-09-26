import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <p className="h1">DevConnector</p>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="btn-toolbar">
            <Link to="/register">
              <button type="button" className="btn btn-outline-info mr-2">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button type="button" className="btn btn-outline-light">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
