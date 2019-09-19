import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    console.log("Registered successfully");
  };

  return (
    <div className="row">
      <div className="col-md"></div>
      <div className="col-md">
        <div className="form-container">
          <h5 className="text-center">Sign In</h5>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
              />
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
            <input
              type="submit"
              value="Sign In"
              className="btn btn-outline-primary float-right"
            />
          </form>
        </div>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
      <div className="col-md"></div>
    </div>
  );
};

export default Login;
