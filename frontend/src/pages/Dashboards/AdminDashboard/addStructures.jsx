import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import axios from 'axios';

function SchoolManagement() {
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [dormitories, setDormitories] = useState([]);
  const [newSubject, setNewSubject] = useState({ name: '', code: '' });
  const [newDepartment, setNewDepartment] = useState('');
  const [newDormitory, setNewDormitory] = useState('');
  const [selectedDepartmentSubjects, setSelectedDepartmentSubjects] = useState([]);

 

  const fetchSubjects = async () => {
    const response = await api.get('/api/setUp/subjects');
    setSubjects(response.data);
  };

  const fetchDepartments = async () => {
    const response = await api.get('/api/setUp/departments');
    setDepartments(response.data);
  };

  const fetchDormitories = async () => {
    const response = await api.get('/api/setUp/dormitories');
    setDormitories(response.data);
  };

  const addSubject = async () => {
    await api.post('/api/setUp/subjects', newSubject);
    setNewSubject({ name: '', code: '' });
    fetchSubjects();
  };

  const deleteSubject = async (id) => {
    await api.delete(`/api/setUp/subjects/${id}`);
    fetchSubjects();
  };

  const addDepartment = async () => {
    const response = await api.post('/api/setUp/departments', { name: newDepartment });
    const departmentId = response.data.id;
    // Assign selected subjects to the new department
    await Promise.all(
      selectedDepartmentSubjects.map(subjectId =>
        api.put(`/api/setUp/subjects/${subjectId}`, { department_id: departmentId })
      )
    );
    setNewDepartment('');
    setSelectedDepartmentSubjects([]);
    fetchDepartments();
    fetchSubjects();
  };

  const addDormitory = async () => {
    await api.post('/api/setUp/dormitories', { name: newDormitory });
    setNewDormitory('');
    fetchDormitories();
  };

  const deleteDormitory = async (id) => {
    await api.delete(`/api/setUp/dormitories/${id}`);
    fetchDormitories();
  };

  return (
    <div>
      {/* Subjects Section */}
      <div>
        <h2>Subjects</h2>
        <input
          type="text"
          placeholder="Subject Name"
          value={newSubject.name}
          onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subject Code"
          value={newSubject.code}
          onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
        />
        <button onClick={addSubject}>Add Subject</button>
        <ul>
          {subjects.map(subject => (
            <li key={subject.id}>
              {subject.name} ({subject.code})
              <span
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => deleteSubject(subject.id)}
              >
                🗑️
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Departments Section */}
      <div>
        <h2>Departments</h2>
        <input
          type="text"
          placeholder="Department Name"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
        />
        <h3>Select Subjects for Department</h3>
        <ul>
          {subjects.map(subject => (
            <li key={subject.id}>
              <input
                type="checkbox"
                checked={selectedDepartmentSubjects.includes(subject.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDepartmentSubjects([...selectedDepartmentSubjects, subject.id]);
                  } else {
                    setSelectedDepartmentSubjects(selectedDepartmentSubjects.filter(id => id !== subject.id));
                  }
                }}
              />
              {subject.name} {subject.department_id ? `(Assigned to Department ID: ${subject.department_id})` : '(Unassigned)'}
            </li>
          ))}
        </ul>
        <button onClick={addDepartment}>Add Department</button>
      </div>

      {/* Dormitories Section */}
      <div>
        <h2>Dormitories</h2>
        <input
          type="text"
          placeholder="Dormitory Name"
          value={newDormitory}
          onChange={(e) => setNewDormitory(e.target.value)}
        />
        <button onClick={addDormitory}>Add Dormitory</button>
        <ul>
          {dormitories.map(dormitory => (
            <li key={dormitory.id}>
              {dormitory.name}
              <span
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => deleteDormitory(dormitory.id)}
              >
                🗑️
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SchoolManagement;
