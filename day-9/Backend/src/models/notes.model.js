const mongo = require("mongoose");
const noteSchema = new mongo.Schema({
    title: String,
    about: String,
    age: Number
})

const noteModel = mongo.model("notes", noteSchema);
module.exports = noteModel;