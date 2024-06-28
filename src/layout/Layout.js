import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../views/components/Sidebar";
import { BiChevronRight } from "react-icons/bi";

const Layout = () => {
  const location = useLocation();

  const pathName = location.pathname;

  return (
    <div className="main-layout">
      <Sidebar />

      <div className="dashboard-layout">
        <div className="header-container">
          <div className="page-header">
            App <BiChevronRight />{" "}
            <span className="text-primary">
              {pathName === "/" ? "Dashboard" : pathName.replace("/", "")}
            </span>
          </div>
          <div className="header-right">
            <div className="header">
              <span className="header-title">Welcome back</span>
              <span className="header-username">Tony Bahadur Stark</span>
            </div>
            <div className="header-img">
              <img src="./user.png" alt="user profile" />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
