const express=require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter=express.Router();
const User=require('../models/user');

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
});



userRouter.get("/feed", userAuth , async(req, res)=>{
     try{
         const loggedInUser=req.user;
         const page=parseInt(req.query.page) || 1;
         let limit=parseInt(req.query.limit) || 10;
          limit = limit > 50 ? 50 : limit
         const skip=(page-1)*limit;
         const connectionRequests=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
         }).select("fromUserId toUserId");
       // }).select("fromUserId toUserId").populate("fromUserId" , "firstName").populate("toUserId" ,"firstName");
       
            const hideUserFromFeed=new Set();
            connectionRequests.forEach((request)=>{
            hideUserFromFeed.add(request.fromUserId.toString());
            hideUserFromFeed.add(request.toUserId.toString());
         })
        // console.log(hideUserFromFeed);
         const users=await User.find({
            $and:[
                {_id:{$nin: Array.from(hideUserFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
         }).select(USER_SAFE_DATA).skip(skip).limit(limit);
         res.json({
            message:"feed  fetched successfully",
            data:users
         });
     }
     catch(err){
        res.status(400).send({ message: "Error while fetching feed api data", error: err.message });
      }

})



module.exports=userRouter;