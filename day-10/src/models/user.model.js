const mongo = require("mongoose");
const userSchema = new mongo.Schema({
    name : String,
    gmail : String,
    password : String,
})

const userModel = ("users", userSchema);
module.exports = userModel;