const mongo = require("mongoose");
const userSchema = new mongo.Schema({
    name : String,
    gmail : {
        type : String,
        unique : [true, "This Email Already Exists"],
    },
    password : String,
})

const userModel = mongo.model("users", userSchema);
module.exports = userModel;


