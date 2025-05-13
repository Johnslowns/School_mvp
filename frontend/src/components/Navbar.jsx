import React from "react";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Gatugi Girls</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/academics">Academics</a></li>
        <li><a href="/admissions">Admissions</a></li>
        <li><a href="/student-life">Student Life</a></li>
        <li><a href="/news">News & Events</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/studentdashboard">Students</a></li>
        <li><a href="/adminDashboard">Admin</a></li>
        <li><a href="/teacherDashboard">Teachers</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

