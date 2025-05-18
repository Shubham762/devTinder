const express=require('express');
const profileRouter=express.Router();
const { userAuth }=require('../middlewares/auth');
const { validateEditProfileData }=require('../utils/validation');
const { validateNewPassowrdData }=require('../utils/validation');
const bcrypt = require('bcrypt');
const authRouter = require('./auth');



profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const userfortokenid=req.user;
        res.send({ message: "fetching profile data", data: userfortokenid });
    }
    catch(err){
      res.status(400).send({ message: "Error while fetching data", error: err.message });
    }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit data");
        }
       const loggedInUser=req.user;
        Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key]);
        await loggedInUser.save();
        res.json({ 
            message: `${loggedInUser.firstName} your profile is updated successfully`,
            data: loggedInUser
         }); 
    }
    catch(err){
      res.status(400).send({ message: "Error while fetching data for edit", error: err.message });
    }
})


profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try{
        if(!validateNewPassowrdData(req)){
            throw new Error("password is not strong enough");
        }
      // console.log("loginuser in  profile",req.body.password);
        const hashedPassword=await bcrypt.hash(req.body.password,10);
       // console.log("loginuser in  profile",hashedPassword);
        let loggedInUser=req.user;
       // console.log("loginuser in  ",loggedInUser);
        loggedInUser.password = hashedPassword;
         await loggedInUser.save();
        res.json({ 
            message: `${loggedInUser.firstName} your password is updated successfully`,
            data: loggedInUser
         }); 
    }
    catch(err){
      res.status(400).send({ message: "Error while calling forgot", error: err.message });
    }
})


module.exports=profileRouter;
