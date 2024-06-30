import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h4>Page Not found</h4>
      <p>Oh it looks like you got lost in the internet</p>
      <Link to="/">Go to dashboard</Link>
    </div>
  );
};

export default NotFound;
