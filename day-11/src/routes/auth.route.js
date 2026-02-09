const express = require('express');
const authRouter = express.Router();
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const crypto = require('crypto')


authRouter.post("/register", async (req,res)=>{
    const {name, em, pass} = req.body;
    const isUserAlreadyExsist = await userModel.findOne({em});

    if(isUserAlreadyExsist){
        return res.status(400).json({
            message: "Email Already Taken",
        })
    }

    const hash = crypto.createHash("md5").update(pass).digest("hex")

    const user = await userModel.create({
        name, em, pass: hash
    })

    const token = jwt.sign({
        id:user._id,
        em: user.em
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

authRouter.post("/protected" , (req,res)=>{
    console.log(req.cookies);

    res.status(200).json({
        message: "This is a protected route"
    })
})

authRouter.post("/login", async (req,res)=>{
      const {em,pass} = req.body
      const user = await userModel.findOne({em})

      if(!user){
         return res.status(404).json({
            message: "User not found with this email"
         })
      }

      const isPasswordMatched = user.pass === crypto.createHash("md5").update(pass).digest("hex")

      if(!isPasswordMatched){
        return res.status(401).json({
            message: 'Invaild pass'
        })
      }

      const token  = jwt.sign({
        id: user._id,
      }, process.env.JWT_SECRET)

      res.cookie("jwt_token",token)
      res.status(200).json({
        message:'user logged in',
        user,
        token
      })
})
module.exports = authRouter;
