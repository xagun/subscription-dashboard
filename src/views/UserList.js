import React, { useState, useEffect } from "react";
import usersData from "../data/users.json";
import subscriptionsData from "../data/subscriptions.json";
import Modal from "./components/Modal";
import moment from "moment";
import { isSubscriptionExpired } from "../lib/utils";
import { BiSort } from "react-icons/bi";
import { PiCaretDownBold } from "react-icons/pi";
import { GrNext, GrPrevious } from "react-icons/gr";
import DataTable from "./components/DataTable";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  // const [sortField, setSortField] = useState("");
  // const [sortDirection, setSortDirection] = useState("asc");
  // const [filterCountry, setFilterCountry] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(8);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const handleRowClick = (user) => {
    setSelectedUser(user);
    openModal();
  };
  const userSubscription = selectedUser
    ? subscriptions.find((sub) => sub.user_id == selectedUser.id)
    : null;

  // if (isFetching) return "Loading....";

  const tableHeaders = [
    { name: "first_name", label: "First Name" },
    { name: "last_name", label: "Last Name" },
    { name: "username", label: "Username" },
    { name: "email", label: "Email" },
    { name: "country", label: "Country" },
    {
      name: "join_date",
      label: "Join Date",
    },
  ];

  return (
    <div className="user-list-container">
      <h1>Subscribers</h1>
      <DataTable
        tableHeaders={tableHeaders}
        tableData={users}
        handleRowClick={handleRowClick}
        loading={isFetching}
      />

      {isModalOpen && (
        <Modal header="Subscription Details" onClose={closeModal}>
          {selectedUser && userSubscription ? (
            <>
              <div className="subscription-validity">
                <span className="badge subscription-expired">
                  {isSubscriptionExpired(userSubscription.expires_on)
                    ? "Expired"
                    : "Active"}
                </span>
              </div>
              <p>
                <strong>Name:</strong> {selectedUser.first_name}{" "}
                {selectedUser.last_name}
              </p>
              <p>
                <strong>Package:</strong> {userSubscription.package}
              </p>
              <p>
                <strong>Expires on:</strong>{" "}
                {moment(userSubscription.expires_on).format("lll")}
              </p>
            </>
          ) : (
            <div>This user has not subscribed to any plan yet!!</div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default UserList;
