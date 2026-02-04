const express = require("express");
const noteModel = require("./models/note.model")
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());


app.post("/api/notes",async (req,res)=>{
    const{title,description} = req.body;
    await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"Note Created",
    })
})

app.get("/api/notes",async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Note Fetched",
        notes
    })
})

app.delete("/api/notes/:id", async (req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(204).json({
        message: "Note deleted"
    })
})

app.patch("api/notes/:id", async (req,res)=>{
    const id = req.params.id
    const {descripition} = req.body
    await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message: "Updated"
    })
})
module.exports = app;