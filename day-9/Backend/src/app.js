const express = require("express");
const cors = require("cors");
const path = require("path");

const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());
app.use(cors());

//FIXED STATIC FOLDER
app.use(express.static(path.join(__dirname, "..", "public")));

app.post("/api/notes", async (req, res) => {
  try {
    const { title, about, age } = req.body;

    const note = await noteModel.create({ title, about, age });

    res.status(201).json({
      message: "Note Created",
      note,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await noteModel.find();

    res.status(200).json({
      message: "Notes Fetched",
      notes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted Successfully",
      id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { about, age } = req.body;

    await noteModel.findByIdAndUpdate(id, { about, age });

    res.status(200).json({
      message: "Updated Successfully",
      id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});


module.exports = app;
