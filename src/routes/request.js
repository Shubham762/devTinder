const express=require('express');   

const requestsRouter=express.Router();
const { userAuth }=require('../middlewares/auth');
const ConnectionRequest=require('../models/connectionRequest');
const User=require('../models/user');

requestsRouter.post("/request/send/:status/:touserId",userAuth,async (req,res)=>{
   try{    
           //console.log(req.params.touserId)
           const fromUserId=req.user?._id;
           const toUserId=req.params?.touserId;
           const status=req.params.status;
           const isAllowedStatus=["ignored","interested"];
           if(!isAllowedStatus.includes(status)){
               return res.status(400).json({ message: "Invalid status type :"+status });
           }
           const toUser=await User.findById(toUserId);
           if(!toUser){
               return res.status(400).json({ message: "User not found" });
           }

           // check for an existing connection if alredy exists
           const existingRequest=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
           });
           if(existingRequest){
               return res.status(400).json({ message: "Connection request already exists" });
           }

           const connectionRequest=new ConnectionRequest({
               fromUserId,
               toUserId,
               status
           });
           const data=await connectionRequest.save();
           res.json({
            message:req.user.firstName+" is "+status+" in "+toUser.firstName,
            data
           })
   }
   catch(err){
       console.log(err);
       res.status(400).send({ message: "Error while sending connection request", error: err.message });
   }
});




requestsRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const logedInUser=req.user; 
        const { status , requestId }=req.params;
      
        const isAllowedStatus=["accepted","rejected"];  
        if(!isAllowedStatus.includes(status)){
            return res.status(400).json({ message: "Invalid status type :"+status });
        }
        const connectionRequest=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:logedInUser._id,
            status:"interested",
        });
        if(!connectionRequest){
            return res.status(400).json({ message: "Connection request not found" });
        }
           connectionRequest.status=status;
           const data=await connectionRequest.save();
        res.json({
            message:logedInUser.firstName+" is "+status+" the request from "+connectionRequest.fromUserId.firstName,
            data
           })
       
    } 
    catch(err){
        res.status(400).send({ message: "Error while reviewing connection request", error: err.message });
    }
      
})




module.exports=requestsRouter;