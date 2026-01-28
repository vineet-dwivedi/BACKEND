//Nodemon installation(npx nodemon <filename>).
const express = require("express");
const app = express();

//How to show anything in server webpage.
app.get("/",(req,res)=>{
    res.send("Hey There!!");
})
app.get("/home",(req,res)=>{
    res.send("This Is Home!!");
})
app.listen(3000);
