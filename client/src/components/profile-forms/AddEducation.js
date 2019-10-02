import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  // Disables the 'to' date if 'current' is true
  const [toDateDisabled, toggleToDateDisabled] = useState(false);
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onCurrentChange = e => {
    setFormData({ ...formData, current: !current });
    toggleToDateDisabled(!toDateDisabled);
  };
  const onSubmit = e => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <div className="container">
      <h5 className="large text-primary text-center">Add Education</h5>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp that
        you have attended
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit}>
        <div className="form-row align-items-center">
          <div className="form-group col-md-9">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              className="form-control"
              value={school}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group col-md-3">
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                name="current"
                value={current}
                checked={current}
                onChange={onCurrentChange}
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="currentCheckbox">
                Current School
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            className="form-control"
            value={degree}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldOfStudy"
            className="form-control"
            value={fieldOfStudy}
            onChange={onChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>From</label>
            <input
              type="date"
              name="from"
              className="form-control"
              value={from}
              onChange={onChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>To</label>
            <input
              type="date"
              name="to"
              className="form-control"
              value={to}
              onChange={onChange}
              disabled={toDateDisabled ? "disabled" : ""}
            />
          </div>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={onChange}
            className="form-control"
          ></textarea>
        </div>
        <Link to="/dashboard" className="btn btn-light">
          Go Back
        </Link>
        <input type="submit" className="btn btn-primary float-right" />
      </form>
    </div>
  );
};

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));
