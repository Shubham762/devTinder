const express=require('express');
const profileRouter=express.Router();
const { userAuth }=require('../middlewares/auth');
const { validateEditProfileData }=require('../utils/validation');


profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const userfortokenid=req.user;
        res.send(userfortokenid);
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




module.exports=profileRouter;
