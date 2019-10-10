import React, { Fragment } from "react";
import Moment from "react-moment";

const ProfileEducation = ({ profile: { education } }) => {
  return (
    <Fragment>
      {education && education.length > 0 && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <h6 className="card-title text-center">Education</h6>
            {education.map((edu, i) => (
              <div key={i}>
                <span>
                  <strong>{edu.degree}</strong> - {edu.fieldOfStudy} <br />
                  {edu.school}
                </span>
                <p>
                  <small className="text-muted">
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
                    {!edu.to ? (
                      "Now"
                    ) : (
                      <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                    )}
                  </small>
                </p>
                <p>{edu.description}</p>
              </div>
            ))}
          </li>
        </ul>
      )}
    </Fragment>
  );
};

export default ProfileEducation;
