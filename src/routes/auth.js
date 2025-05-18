const express=require('express');
const authRouter=express.Router();
const { validateSignUpData }=require('../utils/validation');
const user=require('../models/user');
const bcrypt = require('bcrypt');

authRouter.post("/signup",async(req,res)=>{
    try{
    //validation of data 
    const error =validateSignUpData(req);
    //encrypt password
    const { firstName, lastName, emailId, password }=req.body;
    const passwordHash=await bcrypt.hash(password,10);
    if(error){
        return res.status(400).send(error.message);
    }
    const User=new user({
        firstName,
        lastName,
        emailId,
        password:passwordHash
    });
  
        await User.save();
        res.send("User added successfully!!")
    }
    catch(err){
        res.status(400).send({ message: "Error while saving data", error: err.message });
    }

});


authRouter.post("/login",async(req,res)=>{
    try{
       const {emailId,password}=req.body;
       if(!emailId || !password){
         throw new Error("Email and password is required");
       }
       const currentuser=await user.findOne({emailId});
       if(!currentuser){  
         throw new Error("Invalid crdentials");
       }
       const isPasswordValid=currentuser.validatePassword(password);
       if(isPasswordValid){
         //create JWT token 
         const token=await currentuser.getJWT();
         res.cookie("token",token,{expires:new Date(Date.now()+86400000),httpOnly:true});
         res.send({ message: "Logged In succssesfully", data: currentuser });
       }
       else{
         res.status(401).send({ message: "Invalid password", error: "Invalid crdentials" });
       }
    }
     catch(err){
         res.status(400).send({ message: "Error while login with data", error: err.message });
     }
 })


 authRouter.post("/logout",async(request,res)=>{
       res.cookie("token",null,
       {
        expires:new Date(Date.now()),
    });
       res.send("User logged out successfully");
 })



module.exports=authRouter;