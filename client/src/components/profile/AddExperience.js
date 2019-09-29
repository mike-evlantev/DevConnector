import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  // Disables the 'to' date if 'current' is true
  const [toDateDisabled, toggleToDateDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onCurrentChange = e => {
    setFormData({ ...formData, current: !current });
    toggleToDateDisabled(!toDateDisabled);
  };
  const onSubmit = e => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <div className="container">
      <h5 className="large text-primary text-center">Add Experience</h5>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any programming positions
        that you have had in the past
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit}>
        <div className="form-row align-items-center">
          <div className="form-group col-md-9">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              className="form-control"
              value={title}
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
                Current Job
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            className="form-control"
            value={company}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            className="form-control"
            value={location}
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
            placeholder="Job Description"
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
  { addExperience }
)(withRouter(AddExperience));
