const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req,res)=>{
    const{name,gmail,password} = req.body;

    const isUserAlreadyExsist = await userModel.findOne({gmail});

    if(isUserAlreadyExsist){
        return res.status(400).json({
            message: "Email Already Taken",
        })
    }

    const user = await userModel.create({
        name, gmail, password
    })

    const token = jwt.sign({
        id:user._id,
        gmail:user.gmail
    },
    process.env.JWT_SECRET
)

    res.cookie("jwt_token", token)    

    res.status(201).json({
        message: 'User Created',
        user,
        token
    })
})

// "/api/auth/register";
//  "/api/auth" is prefix;

module.exports = authRouter;