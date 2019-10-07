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
              <a href={social.twitter} className="btn btn-secondary">
                <i className="fab fa-twitter"></i>
              </a>
            )}

            <button type="button" className="btn btn-secondary">
              2
            </button>
            <button type="button" className="btn btn-secondary">
              3
            </button>
            <button type="button" className="btn btn-secondary">
              4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTop;
