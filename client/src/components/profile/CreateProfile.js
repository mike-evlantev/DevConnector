import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const CreateProfile = ({}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  return (
    <div className="container">
      <h5 classNameName="large text-primary text-center">
        Create Your Profile
      </h5>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form>
        <div className="form-group">
          <select name="status" className="form-control">
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text text-muted">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              type="text"
              placeholder="Company"
              name="company"
              className="form-control"
            />
            <small className="form-text text-muted">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              placeholder="Website"
              name="website"
              className="form-control"
            />
            <small className="form-text text-muted">
              Could be your own or a company website
            </small>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              type="text"
              placeholder="Location"
              name="location"
              className="form-control"
            />
            <small className="form-text text-muted">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              className="form-control"
            />
            <small className="form-text text-muted">
              Include your Github username to display your latest repos
            </small>
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            className="form-control"
          />
          <small className="form-text text-muted">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            className="form-control"
          ></textarea>
          <small className="form-text text-muted">
            Tell us a little about yourself
          </small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              type="text"
              name="twitter"
              className="form-control fontAwesome"
              placeholder="&#xf099; twitter"
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              name="facebook"
              className="form-control fontAwesome"
              placeholder="&#xf082; facebook"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <input
              type="text"
              name="youtube"
              className="form-control fontAwesome"
              placeholder="&#xf167; youtube"
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="text"
              name="linkedin"
              className="form-control fontAwesome"
              placeholder="&#xf08c; linkedin"
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="text"
              name="instagram"
              className="form-control fontAwesome"
              placeholder="&#xf16d; instagram"
            />
          </div>
        </div>
        <Link to="/dashboard">
          <button className="btn btn-light">Go Back</button>
        </Link>
        <input type="submit" className="btn btn-primary float-right" />
      </form>
    </div>
  );
};

export default CreateProfile;
