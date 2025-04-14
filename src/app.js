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

app.listen(7777,()=>{
    console.log("listenng 7777 successfully ...");
})