const express = require('express');
const authRouter = express.Router();
const userModel = require("../models/user.model");
const crypto = require('crypto');
const jwt  = require('jsonwebtoken');

authRouter.post("/register", async (req,res)=>{
      const{name,em,pass} = req.body;
      const emailAlreadyExsist = await userModel.findOne({em})

      if(emailAlreadyExsist){
        return res.status(200).json({
            message: 'User Registered'
        });
      }

       const user = await userModel.create({
            name,em,pass: crypto.createHash('sha256').update(pass).digest('hex')
        })

        const token = jwt.sign({
            id: user._id
        },process.env.JWT_KEY , {expiresIn:"1h"})

        res.cookie("token",token);
        res.status(201).json({
            message:"User registered succesfully",
            user:{
                name: user.name,
                em: user.em
            }
        })
})

authRouter.get("/get-me", async (req,res)=>{
    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findById(decode.id);

    res.json({
        name: user.name,
        em: user.em
    })
})

authRouter.post("/login", async (req,res)=>{
    const {em,pass} = req.body;
    const user = await userModel.findOne({em})
    if(!user){
        return res.status(404).json({
            message: 'User not found'
        })
    }

    const hash = crypto.createHash('sha256').update(pass).digest('hex')

    const isPasswordMatched = hash === user.pass;

    if(!isPasswordMatched){
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_KEY,{expiresIn:'1h'})

    res.cookie("token", token)
    res.json({
        message: "User logged in",
        user:{
            name: user.name,
            em: user.em
        }
    })
})

module.exports = authRouter;