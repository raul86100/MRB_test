import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../component/sideBar";
import "./index.scss";

function Layout() {
  return (
    <div className="adminsidebar">
      <Sidebar Admin={true} />
      <div className="adminoutlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
