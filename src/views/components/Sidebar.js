import React, { useEffect, useState } from "react";
import { FaStumbleuponCircle } from "react-icons/fa6";
import { RiCloseLargeLine, RiGroupLine, RiMenuFold2Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";

function useCheckActivePath(path) {
  const location = useLocation();
  return location.pathname === path;
}

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActiveRoot = useCheckActivePath("/");
  const isActiveDashboard = useCheckActivePath("/dashboard");
  const isDashboard = isActiveRoot || isActiveDashboard;
  return (
    <>
      <div className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <FaStumbleuponCircle size={60} />
            </div>
            <h1>
              <span className="text-primary">L</span>ogo
            </h1>
          </div>
          <div className="sidebar-item">
            <Link
              to="/"
              className={`sidebar-link ${isDashboard ? "active-link" : ""}`}
            >
              <RxDashboard />
              Dashboard
            </Link>
          </div>

          <div className="sidebar-item">
            <Link
              to="/subscribers"
              className={`sidebar-link ${
                useCheckActivePath("/subscribers") ? "active-link" : ""
              }`}
            >
              <RiGroupLine />
              Subscribers
            </Link>
          </div>
        </div>
      </div>
      <button
        className={`toggle-sidebar-btn ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <RiCloseLargeLine /> : <RiMenuFold2Line />}
      </button>
    </>
  );
};

export default Sidebar;
