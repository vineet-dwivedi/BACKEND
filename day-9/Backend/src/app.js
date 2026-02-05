const express = require("express");
const cors = require("cors");
const noteModel = require("./models/notes.model")
const app = express();
app.use(express.json());
app.use(cors());

//Post
app.post("/api/notes",async (req,res)=>{
    const{title,about,age} = req.body;
    await noteModel.create({
        title,about,age
    })
    res.status(201).json({
        message:"Note Created",
    })
})

//Get
app.get("/api/notes", async (req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message:"Note Fetched",
        notes
    })
})

//Delete
app.delete("/api/notes/:id",async (req,res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);

    res.status(204).json({
        message: "Deleted Successfully",
        id
    })
})

//Patch
app.patch("/api/notes/:id", async (req,res)=>{
    const id = req.params.id;
    const {about,age} = req.body
    await noteModel.findByIdAndUpdate(id,{about,age});

    res.status(200).json({
        message: "Updated Succesfully",
        id
    })
})

module.exports = app;