import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../views/components/Sidebar";

const Layout = () => {
  return (
    <div className="main-layout">
      <Sidebar />

      <div className="dashboard-layout">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
