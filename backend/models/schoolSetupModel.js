const pool = require("../db");

// 1. Get all class levels
const getAllClassLevels = async () => {
  const result = await pool.query("SELECT * FROM class_levels ORDER BY id");
  return result.rows;
};

// 2. Get all streams for a specific class level
const getStreamsForClassLevel = async (id) => {
  const result = await pool.query(
    "SELECT * FROM streams WHERE class_level_id = $1 ORDER BY id",
    [id]
  );
  return result.rows;
};

// 3. Insert a new class level and return insertId
const insertClassLevel = async (levelName, client) => {
  const result = await client.query(
    "INSERT INTO class_levels (name) VALUES ($1) RETURNING id",
    [levelName]
  );
  return result.rows[0].id;
};

// 4. Insert a stream under a class level
const insertStream = async (streamName, classLevelId, client) => {
  await client.query(
    "INSERT INTO streams (name, class_level_id) VALUES ($1, $2)",
    [streamName, classLevelId]
  );
};

// 5. Update class level name
const updateClassLevelName = async (id, newName, client) => {
  await client.query(
    "UPDATE class_levels SET name = $1 WHERE id = $2",
    [newName, id]
  );
};

// 6. Delete all streams for a class level
const deleteStreamsForClassLevel = async (id, client) => {
  await client.query("DELETE FROM streams WHERE class_level_id = $1", [id]);
};

// 7. Delete class level
const deleteClassLevel = async (id) => {
  await pool.query("DELETE FROM class_levels WHERE id = $1", [id]);
};


// === SUBJECTS ===
const getAllSubjects = async () => {
  const result = await pool.query("SELECT * FROM subjects ORDER BY id");
  return result.rows;
};

const insertSubject = async (name, code) => {
  await pool.query(
    "INSERT INTO subjects (name, code) VALUES ($1, $2)",
    [name, code]
  );
};

const deleteSubject = async (id) => {
  await pool.query("DELETE FROM subjects WHERE id = $1", [id]);
};

const updateSubjectDepartment = async (id, departmentId) => {
  await pool.query(
    "UPDATE subjects SET department_id = $1 WHERE id = $2",
    [departmentId, id]
  );
};

// === DEPARTMENTS ===
const getAllDepartments = async () => {
  const result = await pool.query("SELECT * FROM departments ORDER BY id");
  return result.rows;
};

const insertDepartment = async (name) => {
  const result = await pool.query(
    "INSERT INTO departments (name) VALUES ($1) RETURNING id",
    [name]
  );
  return result.rows[0].id;
};

const assignSubjectToDepartment = async (departmentId, subjectId) => {
  return await db.query('UPDATE subjects SET department_id = ? WHERE id = ?', [departmentId, subjectId]);
};




// === DORMITORIES ===
const getAllDormitories = async () => {
  const result = await pool.query("SELECT * FROM dormitories ORDER BY id");
  return result.rows;
};

const insertDormitory = async (name) => {
  await pool.query("INSERT INTO dormitories (name) VALUES ($1)", [name]);
};

const deleteDormitory = async (id) => {
  await pool.query("DELETE FROM dormitories WHERE id = $1", [id]);
};

module.exports = {
  getAllClassLevels,
  getStreamsForClassLevel,
  insertClassLevel,
  insertStream,
  updateClassLevelName,
  deleteStreamsForClassLevel,
  deleteClassLevel,
  getAllSubjects,
  insertSubject,
  deleteSubject,
  updateSubjectDepartment,

  getAllDepartments,
  insertDepartment,

  getAllDormitories,
  insertDormitory,
  deleteDormitory
};
