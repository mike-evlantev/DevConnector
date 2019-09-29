import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
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

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const handleSocialInputsToggle = () => {
    toggleSocialInputs(!displaySocialInputs);
  };

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram
    });
    // eslint-disable-next-line
  }, [loading]);

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

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <div className="container">
      <h5 className="large text-primary text-center">Create Your Profile</h5>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <select
            name="status"
            className="form-control"
            value={status}
            onChange={onChange}
          >
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
              value={company}
              onChange={onChange}
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
              value={website}
              onChange={onChange}
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
              value={location}
              onChange={onChange}
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
              value={githubusername}
              onChange={onChange}
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
            value={skills}
            onChange={onChange}
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
            value={bio}
            onChange={onChange}
          ></textarea>
          <small className="form-text text-muted">
            Tell us a little about yourself
          </small>
        </div>

        <div className="my-2">
          <button
            onClick={handleSocialInputsToggle}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span className="ml-1 text-muted font-weight-light font-italic">
            Optional
          </span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  type="text"
                  name="twitter"
                  className="form-control fontAwesome"
                  placeholder="&#xf099; twitter"
                  value={twitter}
                  onChange={onChange}
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  type="text"
                  name="facebook"
                  className="form-control fontAwesome"
                  placeholder="&#xf082; facebook"
                  value={facebook}
                  onChange={onChange}
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
                  value={youtube}
                  onChange={onChange}
                />
              </div>
              <div className="form-group col-md-4">
                <input
                  type="text"
                  name="linkedin"
                  className="form-control fontAwesome"
                  placeholder="&#xf08c; linkedin"
                  value={linkedin}
                  onChange={onChange}
                />
              </div>
              <div className="form-group col-md-4">
                <input
                  type="text"
                  name="instagram"
                  className="form-control fontAwesome"
                  placeholder="&#xf16d; instagram"
                  value={instagram}
                  onChange={onChange}
                />
              </div>
            </div>
          </Fragment>
        )}
        <Link to="/dashboard" className="btn btn-light">
          Go Back
        </Link>
        <input type="submit" className="btn btn-primary float-right" />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
