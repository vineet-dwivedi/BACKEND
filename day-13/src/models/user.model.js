const mongo = require('mongoose');
const userSchema = new mongo.Schema({
    username:{
        type: String,
        unique: [true , "This username already exsist"],
        required: [true, "Username required"]
    },
    email:{
        type: String,
        unique: [true, "This email already exsist"],
        required: [true, "Email required"]
    },
    password:{
        type: String,
        required: [true, "Password required"]
    },
    bio: String,
    profileImage:{
        type: String,
        default: "https://ik.imagekit.io/vyukxce/download.jpg"
    }
})

const userModel = mongo.model("users", userSchema);

module.exports = userModel;