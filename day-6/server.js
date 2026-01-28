const app = require("./src/app");
const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect("mongodb+srv://vineet:Qm3FxHssxJjNwtmQ@cluster0.ddssukv.mongodb.net/day-6")
    .then(()=>{
        console.log("Connected to DB")
    })
}

connectToDB()

app.listen(3000, ()=>{
    console.log("server is running on port 3000!!")
});