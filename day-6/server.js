const app = require("./src/app");
const mongoose = require("mongoose")

function connectToDB(){
    ("")
    .then(()=>{
        console.log("Connected to DB")
    })
}

connectToDB()

app.listen(3000, ()=>{
    console.log("server is running on port 3000!!")
});