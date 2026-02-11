const mongo = require('mongoose');
const userSchema = new mongo.Schema({
    name:String,
    em:{
        type:String,
        unique:[true,"Email already exsist"]
    },
    pass:String
})


const userModel = mongo.model("users",userSchema);

module.exports = userModel;