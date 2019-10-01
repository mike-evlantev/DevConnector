import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import Experience from "./Experience";
import Education from "./Education";
import DashboardActions from "./DashboardActions";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="container">
      <h5 className="large text-primary">Dashboard</h5>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {!loading && profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
        </Fragment>
      ) : (
        <Fragment>
          <p className="lead">You have not created a profile</p>
          <Link to="/create-profile" className="btn btn-primary">
            Create Profile
          </Link>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
