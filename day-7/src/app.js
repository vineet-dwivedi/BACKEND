const express = require("express");
const noteModel = require("./models/notes.model")
const app = express();
app.use(express.json());

// POST
app.post("/notes",(req,res)=>{
    const {title,description} = req.body
    noteModel.create({
        title , descripition
    })
    res.status(201).json({
        message: "Note Created",
        note
    })
})

// GET
app.get("/notes",async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message: "GOTT",
        notes
    })
})

module.exports =app;