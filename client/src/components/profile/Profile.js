import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
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
  }, [getProfileByUserId]);

  return (
    <div>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <div>
          Profile{" "}
          <Link to="/profiles" className="btn btn-light">
            Go Back
          </Link>
          {isAuthenticated && !authLoading && user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-dark float-right">
              Edit
            </Link>
          )}
        </div>
      )}
    </div>
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
