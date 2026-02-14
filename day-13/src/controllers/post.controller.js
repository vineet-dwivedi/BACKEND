const postModel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const {toFile} = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken')

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body,req.file);

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: 'Token not provided, Unauthorized access'
        })
    }

    let decode = null;

    try{
         const decode = jwt.verify(token.process.env.JWT_KEY)
    } catch(err){
        return res.status(401).json({
            message: 'User Not Authorized'
        })
    }
   

    console.log(decode);

    const file = await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer),'file'),
        fileName : 'Test',
        folder: 'insta'
    })

    res.send(file);

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decode.id
    })

    res.status(201).json({
        message: 'Post Created',
        post
    })
}

module.exports = {createPostController};