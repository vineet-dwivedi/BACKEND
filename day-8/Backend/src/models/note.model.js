const mongo = require("mongoose");
const noteSchema = new mongo.Schema({
    title : String,
    description : String,
})

const noteModel = mongo.model("notes", noteSchema);

module.exports = noteModel;