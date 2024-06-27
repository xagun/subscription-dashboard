import React, { useState, useEffect } from "react";
import usersData from "../data/users.json";
import subscriptionsData from "../data/subscriptions.json";
import Modal from "./components/Modal";
import moment from "moment";
import { isSubscriptionExpired } from "../lib/utils";
import { BiSort } from "react-icons/bi";
import { PiCaretDownBold } from "react-icons/pi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterCountry, setFilterCountry] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

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

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination control display logic
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedUsers.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    if (
      number === 1 ||
      number === currentPage ||
      number === currentPage - 1 ||
      number === currentPage + 1 ||
      number === Math.ceil(sortedUsers.length / itemsPerPage)
    ) {
      return (
        <button
          key={number}
          className={currentPage === number ? "active" : ""}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      );
    } else if (number === currentPage - 2 || number === currentPage + 2) {
      return (
        <span key={number} className="ellipsis">
          ...
        </span>
      );
    }
    return null;
  });

  if (isFetching) return "Loading....";

  return (
    <div className="user-list-container">
      <h1>Subscribers</h1>
      <div className="search-filter">
        <div className="search-select">
          Search by:
          <div className="custom-select">
            <select
              value={sortField}
              onChange={(e) => sortUsers(e.target.value, sortDirection)}
            >
              <option value="" disabled>
                Select a field
              </option>
              <option value="first_name">First Name</option>
              <option value="last_name">Last Name</option>
              <option value="join_date">Join Date</option>
            </select>
            <PiCaretDownBold className="custom-caret" />
          </div>
        </div>
        <input
          value={filterCountry}
          onChange={(e) => filterUsersByCountry(e.target.value)}
          placeholder="Filter by country"
        />

        {/* Pagination controls */}
        <div className="pagination">
          {currentPage !== 1 && (
            <button onClick={() => paginate(currentPage - 1)}>Previous</button>
          )}
          {renderPageNumbers}
          {currentPage !== Math.ceil(sortedUsers.length / itemsPerPage) && (
            <button onClick={() => paginate(currentPage + 1)}>Next</button>
          )}
        </div>
      </div>
      <div role="region" aria-label="data table" className="responsive-table">
        <table>
          <thead>
            <tr>
              <th scope="col">
                <div className="theader">
                  <div>First Name</div>
                  <div
                    onClick={() =>
                      sortUsers(
                        "first_name",
                        sortDirection === "asc" ? "desc" : "asc"
                      )
                    }
                  >
                    <div className="filter-arrow">
                      <BiSort />
                    </div>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="theader">
                  <div>Last Name</div>
                  <div
                    onClick={() =>
                      sortUsers(
                        "last_name",
                        sortDirection === "asc" ? "desc" : "asc"
                      )
                    }
                  >
                    <div className="filter-arrow">
                      <BiSort />
                    </div>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="theader">
                  <div>Username</div>
                  <div
                    onClick={() =>
                      sortUsers(
                        "username",
                        sortDirection === "asc" ? "desc" : "asc"
                      )
                    }
                  >
                    <div className="filter-arrow">
                      <BiSort />
                    </div>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="theader">
                  <div>Email</div>
                  <div
                    onClick={() =>
                      sortUsers(
                        "email",
                        sortDirection === "asc" ? "desc" : "asc"
                      )
                    }
                  >
                    <div className="filter-arrow">
                      <BiSort />
                    </div>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="theader">
                  <div>Country</div>
                  <div
                    onClick={() =>
                      sortUsers(
                        "country",
                        sortDirection === "asc" ? "desc" : "asc"
                      )
                    }
                  >
                    <div className="filter-arrow">
                      <BiSort />
                    </div>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="theader">
                  <div>Join Date</div>
                  <div
                    onClick={() =>
                      sortUsers(
                        "join_date",
                        sortDirection === "asc" ? "desc" : "asc"
                      )
                    }
                  >
                    <div className="filter-arrow">
                      <BiSort />
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((user) => (
              <tr key={user.id} onClick={() => handleUserClick(user)}>
                <td data-label="First Name">{user.first_name}</td>
                <td data-label="Last Name">{user.last_name}</td>
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
            <>
              <div>
                {isSubscriptionExpired(userSubscription.expires_on)
                  ? "Expired"
                  : "Active"}
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
