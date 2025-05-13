// Dashboard.js
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const StudDashboard = () => {
  return (
    <div className="dashboard-container">
      
      <Sidebar />

     
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default StudDashboard;
