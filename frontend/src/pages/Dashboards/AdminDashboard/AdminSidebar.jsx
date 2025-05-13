// src/components/admin/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Gauge,
  Users2,
  GraduationCap,
  LayoutList,
  BookOpen,
  ClipboardList,
  DollarSign,
  BarChart2,
  StickyNote,
  Megaphone,
  Settings,
  UserCircle,
  LogOut,
} from "lucide-react";

const sidebarItems = [
    { id: 1, name: "Dashboard", icon: <Gauge size={20} />, path: "/adminDashboard" },
    { id: 2, name: "Students", icon: <Users2 size={20} />, path: "/adminDashboard/students" },
    { id: 3, name: "Teachers", icon: <GraduationCap size={20} />, path: "/adminDashboard/teachers" },
    { id: 4, name: "Classes", icon: <LayoutList size={20} />, path: "/adminDashboard/classes" },
    { id: 5, name: "Subjects", icon: <BookOpen size={20} />, path: "/adminDashboard/subjects" },
    { id: 6, name: "Assignments", icon: <ClipboardList size={20} />, path: "/adminDashboard/assignments" },
    { id: 7, name: "Fees", icon: <DollarSign size={20} />, path: "/adminDashboard/fees" },
    { id: 8, name: "Results", icon: <BarChart2 size={20} />, path: "/adminDashboard/results" },
    { id: 9, name: "Notes", icon: <StickyNote size={20} />, path: "/adminDashboard/notes" },
    { id: 10, name: "Announcements", icon: <Megaphone size={20} />, path: "/adminDashboard/announcements" },
    { id: 11, name: "Settings", icon: <Settings size={20} />, path: "/adminDashboard/settings" },
    { id: 12, name: "Profile", icon: <UserCircle size={20} />, path: "/adminDashboard/profile" },
    { id: 13, name: "Structures", icon: <UserCircle size={20} />, path: "/adminDashboard/schoolStructure" },
    { id: 14, name: "Logout", icon: <LogOut size={20} />, path: "/" },
  ];
  

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {sidebarItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;

