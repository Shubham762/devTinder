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
        conres.status(400).send("Error while saving data",err.message);
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

