import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
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

export default Landing;
