const express=require('express');

const profileRouter=express.Router();
const { userAuth }=require('../middlewares/auth');



profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const userfortokenid=req.user;
        res.send(userfortokenid);
    }
    catch(err){
      res.status(400).send({ message: "Error while fetching data", error: err.message });
    }
});


module.exports=profileRouter;
