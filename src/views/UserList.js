import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import moment from "moment";
import { isSubscriptionExpired } from "../lib/utils";
import { PiCaretDownBold } from "react-icons/pi";
import DataTable from "./components/DataTable";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const searchData = (e) => {
    const { name, value } = e.target;

    if (name === "fromDate") {
      setFromDate(value);
      setToDate("");
    } else if (name === "toDate") {
      setToDate(value);
    } else {
      setSearchQuery(value);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (searchField === "join_date") {
      const joinDate = parseInt(user.join_date, 10) * 1000; // Convert to milliseconds
      const from = new Date(fromDate).getTime();
      const to = new Date(toDate).getTime();

      return (!fromDate || joinDate >= from) && (!toDate || joinDate <= to);
    } else {
      return searchField
        ? user[searchField].toLowerCase().includes(searchQuery.toLowerCase())
        : true;
    }
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const loadData = async () => {
      setIsFetching(true);
      try {
        // Load users.json
        const usersResponse = await fetch("users.json");
        const users = await usersResponse.json();
        users.forEach((user) => {
          user.name =
            user.first_name + " " + user.middle_name + " " + user.last_name;
        });
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

  const handleRowClick = (user) => {
    setSelectedUser(user);
    openModal();
  };
  const userSubscription = selectedUser
    ? subscriptions.find((sub) => sub.user_id == selectedUser.id)
    : null;

  // if (isFetching) return "Loading....";

  const tableHeaders = [
    { name: "name", label: "Name" },
    { name: "username", label: "Username" },
    { name: "email", label: "Email" },
    { name: "country", label: "Country" },
    {
      name: "join_date",
      label: "Join Date",
      type: "date",
    },
  ];

  return (
    <div className="user-list-container">
      <div className="search-filter">
        <div className="search-select">
          Search by:
          <div className="custom-select">
            <select
              value={searchField}
              onChange={(e) => {
                setSearchField(e.target.value);
              }}
            >
              <option value="" disabled>
                Select a field
              </option>
              {tableHeaders.map((th) => (
                <option key={th.name} value={th.name}>
                  {th.label}
                </option>
              ))}
            </select>
            <PiCaretDownBold className="custom-caret" />
          </div>
        </div>
        {searchField === "join_date" ? (
          <div className="date-range">
            <div>
              {" "}
              <span>From: </span>
              <input
                type="date"
                name="fromDate"
                value={fromDate}
                onChange={searchData}
                placeholder="From"
              />
            </div>
            <div>
              <span>To: </span>
              <input
                type="date"
                name="toDate"
                value={toDate}
                onChange={searchData}
                placeholder="To"
                min={fromDate}
                max={moment().format("YYYY-MM-DD")}
                disabled={fromDate === ""}
              />
            </div>
          </div>
        ) : (
          <input
            type="text"
            value={searchQuery}
            onChange={searchData}
            placeholder="Search keyword"
          />
        )}
      </div>

      <DataTable
        tableHeaders={tableHeaders}
        tableData={filteredUsers}
        handleRowClick={handleRowClick}
        loading={isFetching}
        pagination={true}
      />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="user-desc">
            <h1 className="primary-header text-primary">User details</h1>
            <div className="subscription-desc">
              <p>
                <small>Name :</small> {selectedUser.name}
              </p>
              <p>
                <small>Email :</small> {selectedUser.email}
              </p>
              <p>
                <small>Address :</small>{" "}
                {selectedUser.address + ", " + selectedUser.country}
              </p>
              <p>
                <small>Date joined :</small>{" "}
                {moment(
                  new Date(selectedUser.join_date * 1000).toLocaleString()
                ).format("ll")}
              </p>
              <p>
                <small> User status :</small>{" "}
                <span
                  className={`badge ${
                    selectedUser.active == 1
                      ? "subscription-active"
                      : "subscription-expired"
                  }`}
                >
                  {selectedUser.active == 1 ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
          </div>
          <h1 className="primary-header text-primary"> Subscription details</h1>

          {selectedUser && userSubscription ? (
            <div className="subscription-detail">
              <div className="subscription-desc">
                <p>
                  <small>Package :</small> {userSubscription.package}
                </p>
                <p>
                  <small>Expires on :</small>{" "}
                  {moment(userSubscription.expires_on).format("lll")}
                </p>
                <p>
                  <small>Subscription status:</small>{" "}
                  <span className="badge subscription-expired">
                    {isSubscriptionExpired(userSubscription.expires_on)
                      ? "Expired"
                      : "Active"}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="not-subscribed">
              This user has not subscribed to any plan yet!!
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default UserList;
