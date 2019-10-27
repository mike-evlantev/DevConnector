import React, { Fragment } from "react";

const NotFound = () => {
  return (
    <Fragment>
      <h5 className="large text-primary">
        <i className="fas fa-exclamation-triangle"></i> Page Not Found
      </h5>
      <p>The page you are looking for does not exist</p>
    </Fragment>
  );
};

export default NotFound;
