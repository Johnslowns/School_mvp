// Dashboard.js
import React from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";


const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      
      <AdminSidebar />

     
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
