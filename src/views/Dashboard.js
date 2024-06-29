import React, { useEffect, useState } from "react";
import moment from "moment";
import DataTable from "./components/DataTable";
import { isSubscriptionExpired } from "../lib/utils";

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

  const activeUsers = users.filter((user) => user.active == 1).length;
  const inactiveUsers = users.filter((user) => user.active == 0).length;

  const activeSubscriptions = subscriptions.filter(
    (sub) => !isSubscriptionExpired(sub.expires_on)
  ).length;
  const expiredSubscriptions = subscriptions.filter((sub) =>
    isSubscriptionExpired(sub.expires_on)
  ).length;

  const packageCounts = subscriptions.reduce((acc, subscription) => {
    const pkg = subscription.package;
    if (acc[pkg]) {
      acc[pkg]++;
    } else {
      acc[pkg] = 1;
    }
    return acc;
  }, {});

  const packages = Object.entries(packageCounts).map(([pkg, count]) => ({
    package: pkg,
    count: count,
  }));

  const packageHeader = [
    { name: "package", label: "Package Name", type: "text" },
    { name: "count", label: "Count", type: "text" },
  ];

  return (
    <>
      <div className="dashboard-container">
        {/* <h1>Dashboard</h1>
      <p className="text-light"> {moment().format("dddd, MMMM D, YYYY")}</p> */}

        <div className="dashboard-left">
          <div className="dashboard-column">
            <div className="dashboard-box custom-box-shadow">
              <div>
                <small>Users</small>
                <div className="subscription-detail">
                  <h1>{users.length}</h1>
                  <div className="subscription-desc">
                    <div className="subscription-status">
                      <span className="active-subscription custom-box-shadow"></span>
                      <span className="expired-subscription custom-box-shadow"></span>
                    </div>
                    <div className="subscription-status ">
                      <span>
                        {activeUsers} <small>Active</small>
                      </span>
                      <span>
                        {inactiveUsers} <small>Inactive</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-box custom-box-shadow">
              <div>
                <small>Subscriptions</small>
                <div className="subscription-detail">
                  <h1>{subscriptions.length}</h1>
                  <div className="subscription-desc">
                    <div className="subscription-status">
                      <span className="active-subscription custom-box-shadow"></span>
                      <span className="expired-subscription custom-box-shadow"></span>
                    </div>
                    <div className="subscription-status ">
                      <span>
                        {activeSubscriptions} <small>Active</small>
                      </span>
                      <span>
                        {expiredSubscriptions} <small>Expired</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="package-table custom-box-shadow">
            <h1>Subscribed packages</h1>
            <DataTable
              tableHeaders={packageHeader}
              tableData={packages}
              handleRowClick={() => {}}
              loading={false}
            />
          </div>
        </div>

        <div className="dashboard-right">
          <div className="dashboard-box custom-box-shadow">
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
    </>
  );
};

export default Dashboard;
