const express= require("express");
const User= require("../model/User")
const jwt= require("jsonwebtoken")
const bcrypt= require("bcrypt")
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const env= require("dotenv");
express().use(cookieParser())
require("dotenv").config()
const passport= require("../controller/passport")
const session = require('express-session');




// Register Route
const regUser = async(req,res)=>{
const {fullname,email,password,earnType}= req.body;
try {
    const existingUser = await User.findOnne({ email });
    if (!existingUser) {

        const salt = bcrypt.genSaltSync(9); 
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            earnType,
        });
        res.json({msg: 'New User Created Successfully'})
    }else{
        res.json({error: 'User Already Exist', success:false})
    }
    
} catch (error) {
    console.error(error);
    res.json({msg: 'Server Error'})
    
}};

// Post Login
    const logUser= async(req,res)=>{
        const{email,password}= req.body;
        try{
            const user=  await User.findOne({email});
            if (!user) {
               return res.status(401).json({msg: 'User not found'})
            }
            const comparePassword= await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return res.status(401).json({msg: 'incorrect password'})
            }
            const token = jwt.sign({id: user._id}, process.env.secret_key,{
                expiresIn: '1h'
            });
            res.json({msg:'login successful', token, success:true})
        }catch (error){
            console.error(error);
            res.status(500).json({ error: 'An error occurred during login', success: false });
        }
    }

  


module.exports={
    regUser,
    logUser
}