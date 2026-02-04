const app = require("./src/app");
require("dotenv").config()
const Connected = require("./src/config/database")

const mongoose = require("mongoose")

Connected();
app.listen(3000,()=>{
    console.log("Server is running on port 3000!!")
})