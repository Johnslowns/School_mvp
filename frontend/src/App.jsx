// src/App.js
import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// Placeholder imports for other pages
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import StudentLife from "./pages/StudentLife";
import News from "./pages/News";
import Contact from "./pages/Contact";
import StudDashboard from "./pages/Dashboards/StudentsDashboard/StudDashboard";
import DashboardHome from "./pages/Dashboards/StudentsDashboard/DashboardHome";
import Subjects from "./pages/Dashboards/StudentsDashboard/Subjects";
import Assignments from "./pages/Dashboards/StudentsDashboard/Assignments";
import FeeStatement from "./pages/Dashboards/StudentsDashboard/FeeStatement";
import Results from "./pages/Dashboards/StudentsDashboard/Results";
import Notes from "./pages/Dashboards/StudentsDashboard/Notes";
import Profile from "./pages/Dashboards/StudentsDashboard/Profile";
import Penalties from "./pages/Dashboards/StudentsDashboard/Penalties";
import AdminDashboard from "./pages/Dashboards/AdminDashboard/adminDashboard";
import TeacherDashboard from "./pages/Dashboards/TeachersDashboard/teacherDashboard";
import AdminHome from "./pages/Dashboards/AdminDashboard/adminHome";
import ManageStudents from "./pages/Dashboards/AdminDashboard/manageStudents";
import ManageTeachers from "./pages/Dashboards/AdminDashboard/manageTeachers";
import ManageClasses from "./pages/Dashboards/AdminDashboard/ManageClasses";
import ManageSubjects from "./pages/Dashboards/AdminDashboard/manageSubjects";
import ManageAssignments from "./pages/Dashboards/AdminDashboard/manageAssignments";
import ManageFees from "./pages/Dashboards/AdminDashboard/manageFees";
import ManageResults from "./pages/Dashboards/AdminDashboard/manageResults";
import ManageNotes from "./pages/Dashboards/AdminDashboard/ManageNotes";
import Announcements from "./pages/Dashboards/AdminDashboard/manageAnnouncements";
import AdminSettings from "./pages/Dashboards/AdminDashboard/adminSettings";
import AdminProfile from "./pages/Dashboards/AdminDashboard/adminProfile";
import ManageClassLevels from "./pages/Dashboards/AdminDashboard/manageClassLevels";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/student-life" element={<StudentLife />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/teacherDashboard" element={<TeacherDashboard/>} />


        <Route path="/adminDashboard" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="/adminDashboard/students" element={<ManageStudents />} />
          <Route path="/adminDashboard/teachers" element={<ManageTeachers />} />
          <Route path="/adminDashboard/classes" element={<ManageClasses />} />
          <Route path="/adminDashboard/subjects" element={<ManageSubjects />} />
          <Route path="/adminDashboard/assignments" element={<ManageAssignments />} />
          <Route path="/adminDashboard/fees" element={<ManageFees />} />
          <Route path="/adminDashboard/results" element={<ManageResults />} />
          <Route path="/adminDashboard/notes" element={<ManageNotes />} />
          <Route path="/adminDashboard/announcements" element={<Announcements />} />
          <Route path="/adminDashboard/settings" element={<AdminSettings />} />
          <Route path="/adminDashboard/profile" element={<AdminProfile />} />
          <Route path="/adminDashboard/schoolStructure" element={<ManageClassLevels />} />
        </Route>


        <Route path="/studentDashboard" element={<StudDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="/studentDashboard/subjects" element={<Subjects />} />
          <Route path="/studentDashboard/assignments" element={<Assignments />} />
          <Route path="/studentDashboard/fees" element={<FeeStatement />} />
          <Route path="/studentDashboard/results" element={<Results />} />
          <Route path="/studentDashboard/notes" element={<Notes />} />
          <Route path="/studentDashboard/profile" element={<Profile />} />
          <Route path="/studentDashboard/penalties" element={<Penalties />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

