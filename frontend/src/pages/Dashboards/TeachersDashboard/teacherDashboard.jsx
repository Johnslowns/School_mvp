// Dashboard.js
import React from "react";
import { Outlet } from "react-router-dom";
import TeachersSidebar from "./teacherSidebar";


const TeacherDashboard = () => {
  return (
    <div className="dashboard-container">
      
      <TeachersSidebar />

     
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherDashboard;