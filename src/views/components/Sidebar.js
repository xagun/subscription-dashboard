import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function useCheckActivePath(path) {
  const location = useLocation();
  return location.pathname === path;
}

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <ul>
          <li>
            <Link
              to="/"
              className={`sidebar-link ${
                useCheckActivePath("/") ? "active-link" : ""
              }`}
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/users"
              className={`sidebar-link ${
                useCheckActivePath("/users") ? "active-link" : ""
              }`}
            >
              Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
