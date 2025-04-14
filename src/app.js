const express=require('express');
const app=express();
const { adminAuth,userAuth }=require('./middlewares/auth')

app.use("/admin",adminAuth);
app.get("/user/data",userAuth,(req,res)=>{
    res.send("User Data sent");
})
app.get("/user/login",(req,res)=>{
    res.send("User logged in successfully");
})
app.get("/admin/getAllData",(req,res)=>{
      res.send("All admin Data");
});
app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deleted the user");
})

app.get("/getUserData",(req,res)=>{
  // throw new Error;
   res.send("user data sent")
})
app.get("/",(error,req,res,next)=>{ ///oder of the parameter matteres here
   if(error){
    res.status(500).send("Something went wrong");
   }

 })

app.listen(7777,()=>{
    console.log("listenng 7777 successfully ...");
})