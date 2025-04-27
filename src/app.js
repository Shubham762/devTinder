const express=require('express');
const connectDB=require('../src/config/database')
const app=express();
const user=require('../src/models/user');
app.use(express.json());
app.post("/signup",async(req,res)=>{
    const User=new user(req.body);
    try{
        await User.save();
        res.send("User added successfully!!")
    }
    catch(err){
        res.status(400).send({ message: "Error while saving data", error: err.message });
    }

});

app.get("/getuserone",async(req,res)=>{
    const userLastname=req.body.lastName;
    try{
        const userdetails=await user.findOne({lastName:userLastname});
        res.send(userdetails);
    }
    catch(err){
      res.status(400).send({ message: "Error while fetching data", error: err.message });
    }
  })

app.get("/getuser",async(req,res)=>{
    const userLastname=req.body.lastName;
    try{
        const userdetails=await user.find({lastName:userLastname});
        res.send(userdetails);
    }
    catch(err){
      res.status(400).send({ message: "Error while fetching data", error: err.message });
    }
  })

  app.delete("/deleteuser",async(req,res)=>{
    const userId=req.body.userId;
    try{
        const usertodelete=await user.findByIdAndDelete({_id:userId});
        res.status(200).send("User Deleted successfully");
    }
    catch(err){
      res.status(400).send({ message: "Error while deleting user", error: err.message });
    }
  })


app.get("/feed",async(req,res)=>{
    try{
       const alluserdeatisles=await user.find({});
       res.send(alluserdeatisles);
    }
    catch(err){
        res.status(400).send({ message: "Error while fetching data", error: err.message });
    }

})

app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    const ALLOWED_UPDATE=["photoUrl","about","gender","age","skills","password"];
    const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATE.includes(k));
    if(!isUpdateAllowed){
        return res.status(400).send("Error while updating data");
    }
    if(data?.skills.length>10)  {
        return res.status(400).send("skills can not be greater than 10");
    }
    try{
        const newuser=await user.findByIdAndUpdate({_id:userId},data,{returnDocument:"before",runValidators:true});
        // console.log("user",newuser)
        res.send("User updated successfully");
     }
     catch(err){
         res.status(400).send({ message: "Error while updating user", error: err.message });
     }
 
})

connectDB().then(()=>{
    console.log("Database connected");
    app.listen(7777,()=>{
        console.log("listenng 7777 successfully ...");
    })
})
.catch((err)=>{
    console.log("database not connected");
})

