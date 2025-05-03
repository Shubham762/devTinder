const express=require('express');   

const requestsRouter=express.Router();
const { userAuth }=require('../middlewares/auth');


requestsRouter.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    const user=req.user;
    res.send(user.firstName+"  Connection request sent successfully");
})




module.exports=requestsRouter;