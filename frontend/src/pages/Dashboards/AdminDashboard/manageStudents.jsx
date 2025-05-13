import React,{useState} from 'react'


const formLevels = ["Form 4", "Form 3", "Form 2", "Form 1"];
const streams = {
  "Form 4": ["4A", "4B", "4C", "4D"],
  "Form 3": ["3A", "3B", "3C"],
  "Form 2": ["2A", "2B"],
  "Form 1": ["1A"],
};

const staticStudents = [
  { name: "Alice Mwangi", admission: "ADM001", class: "4A", grade: "A-" },
  { name: "Brian Otieno", admission: "ADM002", class: "4A", grade: "B+" },
  { name: "Caroline Wambui", admission: "ADM003", class: "4A", grade: "A" },
];

export default function ManageStudents() {

    const [selectedForm, setSelectedForm] = useState("Form 4");
    const [selectedStream, setSelectedStream] = useState("4A");
    const [searchTerm, setSearchTerm] = useState("");
  
    return (
      <div className="student-manager">
        <h2 className="title">Students</h2>
  
        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="left-controls">
            <select
              className="form-dropdown"
              value={selectedForm}
              onChange={(e) => {
                const newForm = e.target.value;
                setSelectedForm(newForm);
                setSelectedStream(streams[newForm][0]);
              }}
            >
              {formLevels.map((form) => (
                <option key={form} value={form}>
                  {form}
                </option>
              ))}
            </select>
  
            <div className="stream-buttons">
              {streams[selectedForm].map((stream) => (
                <button
                  key={stream}
                  className={`stream-btn ${stream === selectedStream ? "active" : ""}`}
                  onClick={() => setSelectedStream(stream)}
                >
                  {stream}
                </button>
              ))}
            </div>
  
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
  
          <button className="add-student-btn">Add Student</button>
        </div>
  
        {/* Student Table */}
        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Admission No</th>
                <th>Class</th>
                <th>Overall Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {staticStudents
                .filter((student) =>
                  student.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.admission}</td>
                    <td>{student.class}</td>
                    <td>{student.grade}</td>
                    <td>
                      <span
                        className={`status-tag ${student.status === "Active" ? "active" : "inactive"}`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  