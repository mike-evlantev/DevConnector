import React, { Fragment } from "react";
import Moment from "react-moment";

const ProfileExperience = ({ profile: { experience } }) => {
  return (
    <Fragment>
      {experience && experience.length > 0 && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <h6 className="card-title text-center">Experience</h6>
            {experience.map((exp, i) => (
              <div key={i}>
                <span>
                  <strong>{exp.title}</strong> - {exp.company}
                </span>
                <p>
                  <small className="text-muted">
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
                    {!exp.to ? (
                      "Now"
                    ) : (
                      <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    )}
                  </small>
                </p>
                <p>{exp.description}</p>
              </div>
            ))}
          </li>
        </ul>
      )}
    </Fragment>
  );
};

export default ProfileExperience;
