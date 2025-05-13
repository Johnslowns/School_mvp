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

module.exports = {
  getAllClassLevels,
  deleteClassLevel,
  getStreamsForClassLevel,
  updateClassLevelWithStreams,
  createClassLevelWithStreams
};
