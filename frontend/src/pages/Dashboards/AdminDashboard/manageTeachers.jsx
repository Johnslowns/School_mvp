import React, { useState } from 'react';

// Departments
const departments = ["All", "Sciences", "Languages", "Humanities", "Technicals"];

// Static teacher data
const staticTeachers = [
  { name: "Mr. James Mwangi", department: "Sciences", subject: "Physics" },
  { name: "Mrs. Grace Wanjiru", department: "Languages", subject: "English" },
  { name: "Ms. Nancy Otieno", department: "Humanities", subject: "History" },
  { name: "Mr. Peter Kamau", department: "Technicals", subject: "Computer" },
  { name: "Mr. Dennis Oloo", department: "Sciences", subject: "Biology" },
  { name: "Ms. Caroline Achieng", department: "Languages", subject: "Kiswahili" },
  { name: "Mr. John Karanja", department: "Sciences", subject: "Chemistry" },
  { name: "Mrs. Judith Wanja", department: "Humanities", subject: "CRE" },
  { name: "Mr. Elijah Maina", department: "Technicals", subject: "Electricity" },
  { name: "Ms. Leah Njeri", department: "Languages", subject: "English" },
]

export default function ManageTeachers() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic
  const filteredTeachers = staticTeachers.filter((teacher) => {
    const matchesDepartment = selectedDept === "All" || teacher.department === selectedDept;
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="teacher-manager">
      <h2 className="title">Teachers</h2>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="left-controls">
          <div className="dept-buttons">
            {departments.map((dept) => (
              <button
                key={dept}
                className={`dept-btn ${selectedDept === dept ? "active" : ""}`}
                onClick={() => setSelectedDept(dept)}
              >
                {dept}
              </button>
            ))}
          </div>

          <input
            type="text"
            className="search-input"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="add-teacher-btn">Add Teacher</button>
      </div>

      {/* Teachers Table */}
      <div className="table-container">
        <table className="teacher-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher, index) => (
              <tr key={index}>
                <td>{teacher.name}</td>
                <td>{teacher.department}</td>
                <td>{teacher.subject}</td>
                <td>
                  <span className="status-tag active">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}