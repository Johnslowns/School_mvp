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

module.exports = {
  getAllClassLevels,
  getStreamsForClassLevel,
  insertClassLevel,
  insertStream,
  updateClassLevelName,
  deleteStreamsForClassLevel,
  deleteClassLevel,
};
