import React from "react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from "recharts";


const enrollmentData = [
  { name: "Term 1", students: 180 },
  { name: "Term 2", students: 200 },
  { name: "Term 3", students: 220 },
  { name: "Term 4", students: 210 }
];

const dormOccupancy = [
  { name: "Lion", students: 40 },
  { name: "Elephant", students: 35 },
  { name: "Leopard", students: 30 },
  { name: "Buffalo", students: 45 },
  { name: "Rhino", students: 28 }
];

const subjectDistribution = [
  { name: "Languages", value: 120 },
  { name: "Sciences", value: 90 },
  { name: "Humanities", value: 75 },
  { name: "Technicals", value: 65 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Welcome, Admin</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Students</h3>
          <p>530</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Teachers</h3>
          <p>42</p>
        </div>
        <div className="dashboard-card">
          <h3>Dormitories</h3>
          <p>5</p>
        </div>
        <div className="dashboard-card">
          <h3>Subjects Offered</h3>
          <p>13</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Enrollment Trend</h3>
          <LineChart width={300} height={200} data={enrollmentData}>
            <Line type="monotone" dataKey="students" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>

        <div className="chart-container">
          <h3>Subject Distribution</h3>
          <PieChart width={300} height={200}>
            <Pie
              data={subjectDistribution}
              cx={150}
              cy={100}
              innerRadius={40}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
              label
            >
              {subjectDistribution.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>

        <div className="chart-container">
          <h3>Students per Dorm</h3>
          <BarChart width={300} height={200} data={dormOccupancy}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;