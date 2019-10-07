import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line
  }, [getProfiles]);

  // Split all profiles into groups of 3
  const groupSize = 3;
  const groupedProfiles = profiles.reduce((groupArray, prof, index) => {
    const groupIndex = Math.floor(index / groupSize);
    if (!groupArray[groupIndex]) {
      groupArray[groupIndex] = []; // start a new group
    }

    groupArray[groupIndex].push(prof);
    return groupArray;
  }, []);

  return (
    <div className="mt-3">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <p className="text-primary">Connect with Developers</p>
          {groupedProfiles.length > 0 ? (
            groupedProfiles.map((group, i) => (
              <div key={i} className="row">
                {group.map((profile, i) => (
                  <div key={i} className="col-xl-4 mb-2">
                    <ProfileItem key={profile._id} profile={profile} />
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No profiles found</p>
          )}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
