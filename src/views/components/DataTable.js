import React, { useState } from "react";
import { BiSort } from "react-icons/bi";
import { PiCaretDownBold } from "react-icons/pi";
import { GrNext, GrPrevious } from "react-icons/gr";
import moment from "moment";

const DataTable = ({
  tableHeaders,
  tableData,
  handleRowClick,
  loading,
  filter,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState("");
  const [searchField, setSearchField] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const sortData = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };

  const searchData = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = tableData.filter((user) =>
    searchField ? user[searchField].includes(searchQuery) : true
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber == "0") {
      setCurrentPage("");
    } else if (pageNumber === "") {
      setCurrentPage("");
    } else {
      setCurrentPage(parseInt(pageNumber));
    }
  };

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
      number === currentPage - 2 ||
      number === currentPage + 2 ||
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
    } else if (number === currentPage - 3 || number === currentPage + 3) {
      return (
        <span key={number} className="ellipsis">
          ...
        </span>
      );
    }
    return null;
  });

  const goToPage = (e) => {
    // let pageNo = parseInt(e.target.value);
    paginate(e.target.value);
  };

  return (
    <>
      {filter && (
        <div className="search-filter">
          <div className="search-select">
            Search by:
            <div className="custom-select">
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
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
          <input
            value={searchQuery}
            onChange={searchData}
            placeholder="Search keyword"
          />

          <div className="pagination-container">
            Goto{" "}
            <input
              type="number"
              onChange={goToPage}
              // min={0}
              value={currentPage}
            />
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <GrPrevious />
              </button>
              <div className="pagination-pages">{renderPageNumbers}</div>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(sortedUsers.length / itemsPerPage)
                }
              >
                <GrNext />
              </button>
            </div>
          </div>
        </div>
      )}
      <div role="region" aria-label="data table" className="responsive-table">
        <table>
          <thead>
            <tr>
              {tableHeaders.map((column) => (
                <th scope="col" key={column.name}>
                  <div className="theader">
                    <div>{column.label}</div>
                    <div
                      onClick={() =>
                        sortData(
                          column.name,
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
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  {[...Array(itemsPerPage)].map((_, index) => (
                    <div key={index} className="fade-div"></div>
                  ))}
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((user) => (
                <tr key={user.id} onClick={() => handleRowClick(user)}>
                  {tableHeaders.map((header) => (
                    <td key={header.name}>
                      {header.type === "date"
                        ? moment(
                            new Date(user.join_date * 1000).toLocaleString()
                          ).format("ll")
                        : user[header.name]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
