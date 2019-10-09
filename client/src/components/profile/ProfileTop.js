import React, { Fragment } from "react";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div>
      <div className="card">
        <img
          src={avatar}
          className="mx-auto d-block avatar-lg rounded-circle"
          alt="avatar"
        />
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <p className="lead">
            {status}
            {website ? (
              <Fragment>
                {company && (
                  <span>
                    {" "}
                    at{" "}
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {company}
                    </a>
                  </span>
                )}
              </Fragment>
            ) : (
              <Fragment>{company && <span> at {company}</span>}</Fragment>
            )}
            {}
          </p>
          <p className="card-text">
            <small className="text-muted">
              {location && <span>{location}</span>}
            </small>
          </p>
          <div className="btn-group" role="group" aria-label="First group">
            {social && social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fab fa-twitter"></i>
              </a>
            )}
            {social && social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            )}
            {social && social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            )}
            {social && social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fab fa-youtube"></i>
              </a>
            )}
            {social && social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fab fa-instagram"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTop;
