const express = require("express");
const app = express();

//Learning about API
app.use(express.json());
const notes = [];

//Using POSTMAN
app.post("/notes", (req,res) =>
{
    console.log(req.body);
    notes.push(req.body);
    res.send("note created");
})

app.get("/notes", (req,res)=>{
    res.send(notes)
})
app.listen(3000,()=>{
    console.log("Server is running!!")
})