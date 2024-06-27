import React from "react";
import moment from "moment";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p className="text-light"> {moment().format("dddd, MMMM D, YYYY")}</p>
    </div>
  );
};

export default Dashboard;
