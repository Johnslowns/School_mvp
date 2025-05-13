// src/pages/Home.js
import React from "react";
import Navbar from "../components/Navbar";
import StatsSection from "../components/StatsSection";


const Home = () => {
  return (
    <div>
    
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Gatugi Girls</h1>
          <p>Empowering students for a brighter future.</p>
        </div>
      </header>
      <section className="highlights">
        <div className="highlight">
          <h2>Upcoming Events</h2>
          <p>Stay tuned for our Science Fair on June 10th!</p>
        </div>
        <div className="highlight">
          <h2>Admissions Open</h2>
          <p>Enroll now for the 2025 academic year.</p>
        </div>
        <div className="highlight">
          <h2>Student Achievements</h2>
          <p>Congratulations to our national debate champions!</p>
        </div>
      </section>
      <StatsSection/>
    </div>
  );
};

export default Home;
