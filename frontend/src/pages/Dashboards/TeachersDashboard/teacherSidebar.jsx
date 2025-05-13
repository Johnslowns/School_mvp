// src/components/dashboard/TeachersSidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Gauge,
  BookOpen,
  Users,
  ClipboardList,
  CheckSquare,
  CalendarCheck,
  BarChart2,
  StickyNote,
  UserCircle,
  LogOut,
} from "lucide-react";

// Predefined teacher sidebar items
const teacherSidebarItems = [
  { id: 1, name: "Dashboard", icon: <Gauge size={20} />, path: "" },
  { id: 2, name: "My Subjects", icon: <BookOpen size={20} />, path: "subjects" },
  { id: 3, name: "My Students", icon: <Users size={20} />, path: "students" },
  { id: 4, name: "Assignments", icon: <ClipboardList size={20} />, path: "assignments" },
  { id: 5, name: "Attendance", icon: <CheckSquare size={20} />, path: "attendance" },
  { id: 6, name: "Timetable", icon: <CalendarCheck size={20} />, path: "timetable" },
  { id: 7, name: "Grades / Results", icon: <BarChart2 size={20} />, path: "grades" },
  { id: 8, name: "Notes & Resources", icon: <StickyNote size={20} />, path: "notes" },
  { id: 9, name: "Profile", icon: <UserCircle size={20} />, path: "profile" },
  { id: 10, name: "Logout", icon: <LogOut size={20} />, path: "/" },
];

const TeachersSidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {teacherSidebarItems.map((item) => (
          <Link
            key={item.id}
            to={`/dashboard/${item.path}`}
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

export default TeachersSidebar;
