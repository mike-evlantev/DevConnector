import React, { Fragment } from "react";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  return (
    <Fragment>
      {bio && (
        <ul className="list-group list-group-flush text-center">
          <li className="list-group-item">
            <h6 className="card-title">About {name}</h6>
            <p className="card-text">{bio}</p>
          </li>
          <li className="list-group-item">
            <h6 className="card-title">Skills</h6>
            <ul className="list-inline">
              {skills &&
                skills.map((skill, i) => (
                  <li key={i} className="list-inline-item">
                    <i className="fas fa-check"></i> {skill}
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      )}
    </Fragment>
  );
};

export default ProfileAbout;
