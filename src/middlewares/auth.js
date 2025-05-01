const jwt=require('jsonwebtoken');
const User=require('../models/user');
const userAuth= async(req,res,next)=>{
   // read the token from request cookies
   try {
   const {token}=req.cookies;
   if(!token){
       throw new Error("Token not valid");
   }
   const decodedObj=await jwt.verify(token,"Dev@Tinder$12345");
   const {userId}=decodedObj;
   const user=await User.findById(userId);
   if(!user){
        throw new Error("User not found");
   }
   req.user=user;
   next();
}
catch (error) {
    res.status(400).send({ message: "Unauthorized", error: error.message });
}
}


module.exports={
    userAuth
}