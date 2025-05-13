import React, { useState } from "react";

const formLevels = ["All", "Form 4", "Form 3", "Form 2"];

const staticClasses = [
  // Form 4
  { name: "Form 4A", teacher: "Mr. Ochieng", students: 45, stream: "4A", level: "Form 4", status: "Active" },
  { name: "Form 4B", teacher: "Ms. Wambui", students: 42, stream: "4B", level: "Form 4", status: "Active" },
  { name: "Form 4C", teacher: "Mr. Kariuki", students: 43, stream: "4C", level: "Form 4", status: "Inactive" },
  

  // Form 3
  { name: "Form 3A", teacher: "Mr. Kiptoo", students: 40, stream: "3A", level: "Form 3", status: "Active" },
  { name: "Form 3B", teacher: "Ms. Njoki", students: 39, stream: "3B", level: "Form 3", status: "Inactive" },
  { name: "Form 3C", teacher: "Mr. Onyango", students: 41, stream: "3C", level: "Form 3", status: "Active" },
  

  // Form 2
  { name: "Form 2A", teacher: "Ms. Akinyi", students: 38, stream: "2A", level: "Form 2", status: "Active" },
  { name: "Form 2B", teacher: "Mr. Wafula", students: 41, stream: "2B", level: "Form 2", status: "Inactive" },
  { name: "Form 2C", teacher: "Ms. Atieno", students: 37, stream: "2C", level: "Form 2", status: "Active" },
  { name: "Form 2D", teacher: "Mr. Gikonyo", students: 39, stream: "2D", level: "Form 2", status: "Active" },

  // Form 1
  
];


export default function ManageClasses() {
  const [selectedForm, setSelectedForm] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClasses = staticClasses.filter((cls) => {
    const matchesForm = selectedForm === "All" || cls.level === selectedForm;
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || cls.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesForm && matchesSearch;
  });

  return (
    <div className="class-manager">
      <h2 className="title">Classes</h2>

      {/* Filter bar */}
      <div className="filter-bar">
        <select className="form-dropdown" value={selectedForm} onChange={(e) => setSelectedForm(e.target.value)}>
          {formLevels.map((form) => (
            <option key={form} value={form}>
              {form}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="search-input"
          placeholder="Search by name or teacher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="add-btn">Add Class</button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="class-table">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Class Teacher</th>
              <th>Students</th>
              <th>Stream</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((cls, index) => (
              <tr key={index}>
                <td>{cls.name}</td>
                <td>{cls.teacher}</td>
                <td>{cls.students}</td>
                <td>{cls.stream}</td>
                <td>
                  <span className={`status-tag ${cls.status === "Active" ? "active" : "inactive"}`}>
                    {cls.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
