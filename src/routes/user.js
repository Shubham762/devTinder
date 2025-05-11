const express=require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter=express.Router();

const USER_SAFE_DATA="firstName lastName photoUrl about skills";


//Get all the connection request for pending users

userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
       const loggedInUser=req.user;
       const connectionRequests=await ConnectionRequest.find({
           toUserId:loggedInUser._id,
           status:"interested"
       }).populate("fromUserId",USER_SAFE_DATA);
   // }).populate("fromUserId",["firstName","lastName"]);  bothe are same as line 15 
     res.json({
        message:"Connection requests fetched successfully",
        data:connectionRequests
     })
    }

    catch(err){
        res.status(400).send({ message: "Error while recieving connection request data", error: err.message });
      }
});


userRouter.get("/user/Connections",userAuth,async(req,res)=>{
    try{  
        const loggedInUser=req.user;
         const connectionRequests=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
         }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
       // console.log(connectionRequests);
         const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
         })
         res.json({
            message:"Connection requests fetched successfully",
            data
         })
    }
    catch(err){
        res.status(400).send({ message: "Error while fetching connection request data", error: err.message });
      }
})



module.exports=userRouter;