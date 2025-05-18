const pool = require("../db");
const schoolSetupModel = require("../models/schoolSetupModel");

// 1. Get all class levels
const getAllClassLevels = async (req, res) => {
  try {
    const levels = await schoolSetupModel.getAllClassLevels();
    res.json(levels);
  } catch (error) {
    console.error("Error fetching class levels:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 2. Get all streams for a specific class level
const getStreamsForClassLevel = async (req, res) => {
  const { id } = req.params;
  try {
    const streams = await schoolSetupModel.getStreamsForClassLevel(id);
    res.json(streams);
  } catch (error) {
    console.error("Error fetching streams:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 3. Create new class level and its streams
const createClassLevelWithStreams = async (req, res) => {
  const { levelName, streams } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const classLevelId = await schoolSetupModel.insertClassLevel(levelName, client);

    for (const stream of streams) {
      await schoolSetupModel.insertStream(stream.name, classLevelId, client);
    }

    await client.query('COMMIT');
    res.status(201).json({ message: "Class level and streams created" });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error creating class level:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
};

// 4. Update class level and its streams
const updateClassLevelWithStreams = async (req, res) => {
  const { id } = req.params;
  const { levelName, streams } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await schoolSetupModel.updateClassLevelName(id, levelName, client);
    await schoolSetupModel.deleteStreamsForClassLevel(id, client);

    for (const stream of streams) {
      await schoolSetupModel.insertStream(stream.name, id, client);
    }

    await client.query('COMMIT');
    res.json({ message: "Class level and streams updated" });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error updating class level:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
};

// 5. Delete a class level
const deleteClassLevel = async (req, res) => {
  const { id } = req.params;
  try {
    await schoolSetupModel.deleteClassLevel(id);
    res.json({ message: "Class level deleted" });
  } catch (error) {
    console.error("Error deleting class level:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await schoolSetupModel.getAllSubjects();
    res.json(subjects);
  } catch (err) {
    console.error("Error fetching subjects:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createSubject = async (req, res) => {
  const { name, code } = req.body;
  try {
    await schoolSetupModel.insertSubject(name, code);
    res.status(201).json({ message: "Subject created" });
  } catch (err) {
    console.error("Error creating subject:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteSubject = async (req, res) => {
  const { id } = req.params;
  try {
    await schoolSetupModel.deleteSubject(id);
    res.json({ message: "Subject deleted" });
  } catch (err) {
    console.error("Error deleting subject:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateSubjectDepartment = async (req, res) => {
  const { id } = req.params;
  const { department_id } = req.body;
  try {
    await schoolSetupModel.updateSubjectDepartment(id, department_id);
    res.json({ message: "Subject department updated" });
  } catch (err) {
    console.error("Error updating subject:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// === DEPARTMENTS ===
const getAllDepartments = async (req, res) => {
  try {
    const departments = await schoolSetupModel.getAllDepartments();
    res.json(departments);
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createDepartment = async (req, res) => {
  const { name } = req.body;
  try {
    const id = await schoolSetupModel.insertDepartment(name);
    res.status(201).json({ message: "Department created", id });
  } catch (err) {
    console.error("Error creating department:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// === DORMITORIES ===
const getAllDormitories = async (req, res) => {
  try {
    const dorms = await schoolSetupModel.getAllDormitories();
    res.json(dorms);
  } catch (err) {
    console.error("Error fetching dormitories:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createDormitory = async (req, res) => {
  const { name } = req.body;
  try {
    await schoolSetupModel.insertDormitory(name);
    res.status(201).json({ message: "Dormitory created" });
  } catch (err) {
    console.error("Error creating dormitory:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteDormitory = async (req, res) => {
  const { id } = req.params;
  try {
    await schoolSetupModel.deleteDormitory(id);
    res.json({ message: "Dormitory deleted" });
  } catch (err) {
    console.error("Error deleting dormitory:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  getAllClassLevels,
  deleteClassLevel,
  getStreamsForClassLevel,
  updateClassLevelWithStreams,
  createClassLevelWithStreams,
  getAllSubjects,
  createSubject,
  deleteSubject,
  updateSubjectDepartment,

  getAllDepartments,
  createDepartment,

  getAllDormitories,
  createDormitory,
  deleteDormitory
};
