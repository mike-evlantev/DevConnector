import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div className="row">
      <div className="col-md"></div>
      <div className="col-md">
        <div className="form-container">
          <h5 className="text-center">Create account</h5>
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
                value={name}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
              />
              <small className="form-text text-muted">
                Have a Gravat? Enter your Gravatar email for a profile image
              </small>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password2"
                placeholder="Confirm password"
                value={password2}
                onChange={onChange}
              />
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="btn btn-outline-primary float-right"
            />
          </form>
        </div>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
      <div className="col-md"></div>
    </div>
  );
};

export default connect(
  null,
  { setAlert, register }
)(Register);
