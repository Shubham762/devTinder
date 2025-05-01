const express=require('express');
const connectDB=require('../src/config/database')
const app=express();
const user=require('../src/models/user');
const { validateSignUpData }=require('../src/utils/validation');
const bcrypt = require('bcrypt');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const {userAuth}=require('./middlewares/auth');
const e = require('express');

app.use(express.json());
app.use(cookieParser());
app.post("/signup",async(req,res)=>{
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

app.post("/login",async(req,res)=>{
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
        res.send("User logged in successfully");
      }
      else{
        res.status(401).send({ message: "Invalid password", error: "Invalid crdentials" });
      }
   }
    catch(err){
        res.status(400).send({ message: "Error while login with data", error: err.message });
    }
})

app.get("/profile",userAuth,async(req,res)=>{
    try{
        const userfortokenid=req.user;
        res.send(userfortokenid);
    }
    catch(err){
      res.status(400).send({ message: "Error while fetching data", error: err.message });
    }
})

app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
      const user=req.user;
      console.log("Sending connection request");
      res.send(user.firstName+"  Connection request sent successfully");
})

connectDB().then(()=>{
    console.log("Database connected");
    app.listen(7777,()=>{
        console.log("listenng 7777 successfully ...");
    })
})
.catch((err)=>{
    console.log("database not connected");
})

