// src/components/dashboard/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Gauge,
  BookOpen,
  ClipboardList,
  DollarSign,
  BarChart2,
  StickyNote,
  UserCircle,
  AlertTriangle,
  LogOut,
} from "lucide-react";



const sidebarItems = [
  { id: 1, name: "Dashboard", icon: <Gauge size={20} />, path: "" },
  { id: 2, name: "My Subjects", icon: <BookOpen size={20} />, path: "subjects" },
  { id: 3, name: "Assignments", icon: <ClipboardList size={20} />, path: "/dashboard/assignments" },
  { id: 4, name: "Fee Statement", icon: <DollarSign size={20} />, path: "/dashboard/fees" },
  { id: 5, name: "Results", icon: <BarChart2 size={20} />, path: "/dashboard/results" },
  { id: 6, name: "Notes", icon: <StickyNote size={20} />, path: "/dashboard/notes" },
  { id: 7, name: "Profile", icon: <UserCircle size={20} />, path: "/dashboard/profile" },
  { id: 8, name: "Penalties", icon: <AlertTriangle size={20} />, path: "/dashboard/penalties" },
  { id: 9, name: "Logout", icon: <LogOut size={20} />, path: "/" },
];

const Sidebar = () => {
  const location = useLocation();

  return (

    <aside className="sidebar">
      <nav className="sidebar-nav">
      {sidebarItems.map((item) => (
          <Link
          key={item.id}
          to={item.path}
          className={`sidebar-link ${
              location.pathname.endsWith(item.path) ? "active" : ""
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

export default Sidebar;
