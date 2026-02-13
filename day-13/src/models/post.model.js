const mongo = require('mongoose');
const postSchema = new mongo.Schema({
    caption:{
        type: String,
        default: ""
    },
    imgUrl:{
        type: String,
        required:[true, 'imgUrl is required for creating an post']
    },
    user:{
        ref: "users",
        type: mongo.Schema.Types.ObjectId,
        required: [true, 'User id required for creating post']
    }
})

const postModel = mongo.model("posts", postSchema);

module.exports = postModel;