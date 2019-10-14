import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div>
      <div className="card flex-sm-row mb-gutter">
        <Link to={`/profile/${_id}`}>
          <img
            className="avatar-md text-center rounded-circle"
            src={avatar}
            alt="gravatar"
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-truncate">{name}</h5>
          <p className="card-text text-truncate">
            {status} <br /> {company && <span>at {company}</span>}
            <br />
            <small className="text-muted">
              {location && <span>{location}</span>}
            </small>
          </p>
          <span>
            {" "}
            Skills:
            {skills.slice(0, 4).map((skill, i) => (
              <span key={i} className="badge badge-pill badge-primary ml-1">
                {skill.toLowerCase()}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
