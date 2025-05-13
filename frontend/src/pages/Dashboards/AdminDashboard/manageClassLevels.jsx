import React, { useState, useEffect } from "react";
import api from "../../../api/axios";


const ManageClassLevels = () => {
  const [classLevels, setClassLevels] = useState([]);
  const [selectedLevelId, setSelectedLevelId] = useState(null);
  const [levelName, setLevelName] = useState("");
  const [streams, setStreams] = useState([{ name: "" }]);

  useEffect(() => {
    api.get("/api/setUp/class-levels")
      .then((res) => setClassLevels(res.data))
      .catch((err) => console.error("Failed to fetch class levels", err));
  }, []);

  const handleLevelSelect = (e) => {
    const selectedId = e.target.value;
    const selected = classLevels.find((lvl) => lvl.id === parseInt(selectedId));
    if (selected) {
      setSelectedLevelId(selected.id);
      setLevelName(selected.name);
      api.get(`/api/setUp/class-levels/${selected.id}/streams`)
        .then((res) => setStreams(res.data))
        .catch(() => setStreams([{ name: "" }]));
    } else {
      setSelectedLevelId(null);
      setLevelName("");
      setStreams([{ name: "" }]);
    }
  };

  const handleLevelNameChange = (e) => {
    setLevelName(e.target.value);
    setSelectedLevelId(null);
    setStreams([{ name: "" }]);
  };

  const handleStreamChange = (index, value) => {
    const updated = [...streams];
    updated[index].name = value;
    setStreams(updated);
  };

  const addStreamField = () => {
    setStreams([...streams, { name: "" }]);
  };

  const removeStreamField = (index) => {
    const updated = [...streams];
    updated.splice(index, 1);
    setStreams(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { levelName, streams };
      if (selectedLevelId) {
        await api.put(`/api/setUp/class-levels/${selectedLevelId}`, payload);
        alert("Class level and streams updated.");
      } else {
        await api.post("/api/setUp/class-levels", payload);
        alert("Class level and streams created.");
      }
    } catch (error) {
      console.error("Error saving class level/streams", error);
      alert("Error saving class level/streams.");
    }
    setSelectedLevelId(null)
    setLevelName("")
    setStreams([{ name: '' }])
  };

  return (
    <div className="manage-container">
      <h2 className="title">Manage Class Levels & Streams</h2>

      <div className="field-group">
        <label>Select Existing Class Level:</label>
        <select onChange={handleLevelSelect} className="input-select">
          <option value="">-- Select --</option>
          {classLevels.map((lvl) => (
            <option key={lvl.id} value={lvl.id}>
              {lvl.name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="field-group">
          <label>Class Level Name:</label>
          <input
            type="text"
            value={levelName}
            onChange={handleLevelNameChange}
            className="input-text"
            placeholder="e.g., Form 2"
            required
          />
        </div>

        <div className="field-group">
          <label>Streams:</label>
          {streams.map((stream, index) => (
            <div key={index} className="stream-row">
              <input
                type="text"
                value={stream.name}
                onChange={(e) => handleStreamChange(index, e.target.value)}
                placeholder="e.g., Joy"
                className="input-text flex-grow"
                required
              />
              {streams.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStreamField(index)}
                  className="btn remove-btn"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addStreamField} className="btn add-btn">
            + Add Stream
          </button>
        </div>

        <button type="submit" className="btn submit-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default ManageClassLevels;
