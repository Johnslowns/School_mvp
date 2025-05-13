import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, Legend } from "recharts";


const lineData = [
  { name: "Term 1", grade: 75 },
  { name: "Term 2", grade: 82 },
  { name: "Term 3", grade: 90 },
  { name: "Term 4", grade: 85 }
];

const pieData = [
  { name: "Completed", value: 6 },
  { name: "Pending", value: 3 },
];

const COLORS = ["#00C49F", "#FF8042"];

const barData = [
  { subject: "Math", score: 85 },
  { subject: "English", score: 78 },
  { subject: "Biology", score: 88 },
  { subject: "Chemistry", score: 82 },
  { subject: "History", score: 76 }
];

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <h2>Welcome, Student</h2>
      <div className="cards-container">
        <div className="card">Subjects: 5</div>
        <div className="card">Assignments Due: 3</div>
        <div className="card">Overall Grade: B+</div>
      </div>
      <div className="charts-container">
        <div className="chart-box">
          <h3>Performance Over Terms</h3>
          <LineChart width={300} height={200} data={lineData}>
            <Line type="monotone" dataKey="grade" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
        <div className="chart-box">
          <h3>Assignment Status</h3>
          <PieChart width={300} height={200}>
            <Pie
              data={pieData}
              cx={150}
              cy={100}
              innerRadius={40}
              outerRadius={70}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
        <div className="chart-box">
          <h3>Subject Scores</h3>
          <BarChart width={300} height={200} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
