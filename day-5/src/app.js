const express = require("express");
const app = express();
const notes = [];
app.use(express.json());
//POST;
app.post("/notes", (req,res)=>{
    console.log(req.body);
    notes.push(req.body)
    res.status(201).json({
        message: "Note Created"
    })
})

//GET
app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes:notes
    })
})
//DELETE 
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.status(204).json({
        message: "Deleted sucessfully"
    })
})
//PATCH
app.patch("/notes/:index",(req,res)=>
{
    notes[req.params.index].description = req.body.description

    res.status(200).json({
        message: "Updated"
    })
})
module.exports = app;