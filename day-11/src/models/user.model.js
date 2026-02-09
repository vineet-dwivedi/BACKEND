const mongo = require('mongoose');
const userSchema = new mongo.Schema({
    name: String,
    em: {
        type: String,
        unique: [true, "This email already exsist"]
    },
    pass: String
})

const userModel = mongo.model("users", userSchema);
module.exports = userModel;