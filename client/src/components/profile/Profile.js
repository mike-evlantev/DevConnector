import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import { getProfileByUserId } from "../../actions/profile";

const Profile = ({
  getProfileByUserId,
  profile: { profile, loading },
  auth: { isAuthenticated, authLoading, user },
  match
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id);
    // eslint-disable-next-line
  }, [getProfileByUserId, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="card">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
          <div className="mt-2">
            <Link to="/profiles" className="btn btn-light">
              Go Back
            </Link>
            {isAuthenticated && !authLoading && user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark float-right">
                Edit
              </Link>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileByUserId }
)(Profile);
