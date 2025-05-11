const express=require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter=express.Router();


//Get all the connection request for pending users

userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
       const loggedInUser=req.user;
       const connectionRequests=await ConnectionRequest.find({
           toUserId:loggedInUser._id,
           status:"interested"
       }).populate("fromUserId","firstName lastName photoUrl about skills");
   // }).populate("fromUserId",["firstName","lastName"]);  bothe are same as line 15 
     res.json({
        message:"Connection requests fetched successfully",
        data:connectionRequests
     })
    }

    catch(err){
        res.status(400).send({ message: "Error while fetching connection request data", error: err.message });
      }
})



module.exports=userRouter;