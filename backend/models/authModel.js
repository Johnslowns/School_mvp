const pool = require('../db');

// Create a new user
const createUser = async (full_name, registration_number, passwordHash, role) => {
  const query = `
    INSERT INTO users (full_name, registration_number, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, full_name, registration_number, role
  `;
  const values = [full_name, registration_number, passwordHash, role];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Create a student
const createNewStudent = async ({ subjects_taken, hostel_name, classId, guardianContact }, user_id) => {
  const query = `
    INSERT INTO students (user_id, subjects_taken, hostel_name, class_id, guardian_contact)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [user_id, subjects_taken, hostel_name, classId, guardianContact];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

// Create a teacher
const createNewTeacher = async (
  { subjectSpeciality, department, gender, isClassTeacher, classAssignedId },
  user_id
) => {
  const query = `
    INSERT INTO teachers (user_id, subject_speciality, department, gender, is_class_teacher, class_assigned_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [user_id, subjectSpeciality, department, gender, isClassTeacher, classAssignedId || null];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
};

// Create an admin
const createNewAdmin = async ({ position, gender }, user_id) => {
  const query = `
    INSERT INTO admins (user_id, position, gender)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [user_id, position, gender];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};
// Get a user by email
const getUserByRegistration = async (registration_number) => {
  const query = 'SELECT * FROM users WHERE registration_number = $1';
  const { rows } = await pool.query(query, [registration_number]);
  return rows[0];
};

// Store refresh token in sessions table
const createSession = async (userId, refreshToken, expiresAt) => {
  const query = `
    INSERT INTO sessions (user_id, refresh_token, expires_at)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [userId, refreshToken, expiresAt]);
  return rows[0];
};

// Check if refresh token exists in sessions
const getSessionByToken = async (userId, refreshToken) => {
  const query = `
    SELECT * FROM sessions 
    WHERE user_id = $1 AND refresh_token = $2;
  `;
  const { rows } = await pool.query(query, [userId, refreshToken]);
  return rows[0];
};


const deleteSession = async (refreshToken) => {
  const query = `
    DELETE FROM sessions 
    WHERE refresh_token = $1
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [refreshToken]);
  return rows[0];
};

// Export the functions
module.exports = {
  createUser,
  createNewStudent,
  createNewTeacher,
  createNewAdmin,
  getUserByRegistration,
  createSession,
  getSessionByToken,
  deleteSession
};