import React, { useEffect, useState } from "react";
import moment from "moment";
import DataTable from "./components/DataTable";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsFetching(true);
      try {
        // Load users.json
        const usersResponse = await fetch("users.json");
        const users = await usersResponse.json();
        setUsers(users);

        // Load subscribers.json
        const subscribersResponse = await fetch("subscriptions.json");
        const subscribers = await subscribersResponse.json();
        setSubscriptions(subscribers);

        setIsFetching(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsFetching(false);
      }
    };

    loadData();
  }, []);

  const tableHeaders = [
    { name: "first_name", label: "First Name", type: "text" },
    { name: "last_name", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
    {
      name: "join_date",
      label: "Join Date",
      type: "date",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* <h1>Dashboard</h1>
      <p className="text-light"> {moment().format("dddd, MMMM D, YYYY")}</p> */}

      <div className="dashboard-left">
        <div className="dashboard-box">
          <small>Total Users</small>
          <h1>500</h1>
        </div>

        <div className="dashboard-box">
          <small>Total Subscribers</small>
          <h1>320</h1>
        </div>
      </div>
      <div className="dashboard-right">
        <div className="dashboard-box">
          <small>Joined this month</small>
          <DataTable
            tableHeaders={tableHeaders}
            tableData={users}
            handleRowClick={() => {}}
            loading={isFetching}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
