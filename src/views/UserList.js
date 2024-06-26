import React, { useState, useEffect } from "react";
import usersData from "../data/users.json";
import subscriptionsData from "../data/subscriptions.json";
import Modal from "./components/Modal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterCountry, setFilterCountry] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

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

  const sortUsers = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };

  const filterUsersByCountry = (country) => {
    setFilterCountry(country);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    openModal();
  };

  const filteredUsers = users.filter((user) =>
    filterCountry ? user.country.includes(filterCountry) : true
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const userSubscription = selectedUser
    ? subscriptions.find((sub) => sub.user_id == selectedUser.id)
    : null;

  if (isFetching) return "Loading....";

  return (
    <div className="">
      <label>
        Sort by:
        <select
          value={sortField}
          onChange={(e) => sortUsers(e.target.value, sortDirection)}
        >
          <option value="">Select a field</option>
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="join_date">Join Date</option>
        </select>
      </label>
      <label>
        Direction:
        <select
          value={sortDirection}
          onChange={(e) => sortUsers(sortField, e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <label>
        Filter by country:
        <input
          type="text"
          value={filterCountry}
          onChange={(e) => filterUsersByCountry(e.target.value)}
        />
      </label>
      <div role="region" aria-label="data table" className="primary">
        <table>
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Country</th>
              <th scope="col">Join Date</th>
            </tr>
          </thead>

          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} onClick={() => handleUserClick(user)}>
                <td data-label="First Name">{user.first_name}</td>
                <td data-label="Last Name"> {user.last_name}</td>
                <td data-label="Username">{user.username}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Country">{user.country}</td>
                <td data-label="Join Date">
                  {new Date(user.join_date * 1000).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal header="Subscription Details" onClose={closeModal}>
          {selectedUser && userSubscription ? (
            <div>
              <p>
                <strong>Name:</strong> {selectedUser.first_name}{" "}
                {selectedUser.last_name}
              </p>
              <p>
                <strong>Package:</strong> {userSubscription.package}
              </p>
              <p>
                <strong>Expires on:</strong> {userSubscription.expires_on}
              </p>
            </div>
          ) : (
            <div>Not subscribed yet</div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default UserList;
