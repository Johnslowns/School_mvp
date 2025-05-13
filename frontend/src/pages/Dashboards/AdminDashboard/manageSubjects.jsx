import React, { useState } from "react";

// Static Subjects Data
const staticSubjects = [
  // Sciences
  { name: "Physics", department: "Sciences", teacher: "Mr. Ochieng", students: 45, status: "Active" },
  { name: "Biology", department: "Sciences", teacher: "Ms. Akinyi", students: 42, status: "Active" },
  { name: "Chemistry", department: "Sciences", teacher: "Mr. Kiptoo", students: 40, status: "Active" },
  { name: "Environmental Science", department: "Sciences", teacher: "Ms. Wambui", students: 38, status: "Inactive" },

  // Humanities
  { name: "Geography", department: "Humanities", teacher: "Mr. Kariuki", students: 45, status: "Active" },
  { name: "History", department: "Humanities", teacher: "Ms. Chege", students: 43, status: "Active" },
  { name: "CRE", department: "Humanities", teacher: "Mr. Onyango", students: 41, status: "Active" },
  { name: "Business Studies", department: "Humanities", teacher: "Ms. Muthoni", students: 44, status: "Active" },

  // Technicals
  { name: "Home Science", department: "Technicals", teacher: "Ms. Njoki", students: 40, status: "Active" },
  { name: "Agriculture", department: "Technicals", teacher: "Mr. Wafula", students: 42, status: "Active" },
  { name: "Computer Studies", department: "Technicals", teacher: "Ms. Atieno", students: 43, status: "Active" },
  { name: "Art and Design", department: "Technicals", teacher: "Mr. Gikonyo", students: 39, status: "Inactive" },

  // Languages
  { name: "English", department: "Languages", teacher: "Mr. Mutiso", students: 50, status: "Active" },
  { name: "Kiswahili", department: "Languages", teacher: "Ms. Chebet", students: 48, status: "Active" },
  { name: "French", department: "Languages", teacher: "Mr. Njoroge", students: 46, status: "Active" },
  { name: "German", department: "Languages", teacher: "Ms. Wanja", students: 47, status: "Inactive" },
];

const ManageSubjects = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const departments = ["All", "Sciences", "Humanities", "Technicals", "Languages"];

  // Filter the subjects based on the selected department and search term
  const filteredSubjects = staticSubjects.filter(
    (subject) =>
      (selectedDepartment === "All" || subject.department === selectedDepartment) &&
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="subjects-page">
      <h2 className="title">Subjects</h2>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="left-controls">
          <select
            className="department-dropdown"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="search-input"
            placeholder="Search Subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="add-subject-btn">Add Subject</button>
      </div>

      {/* Subjects List */}
      <div className="subjects-list">
        {filteredSubjects.map((subject, index) => (
          <div className="subject-card" key={index}>
            <h3>{subject.name}</h3>
            <p><strong>Department:</strong> {subject.department}</p>
            <p><strong>Teacher:</strong> {subject.teacher}</p>
            <p><strong>Students:</strong> {subject.students}</p>
            <p className={`status-tag ${subject.status === "Active" ? "active" : "inactive"}`}>
              {subject.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSubjects;
