const express=require('express');
const app=express();

app.use("/",(req,res)=>{
    res.send("Hello from varanasi dashboard🙏!")
})
app.use("/test",(req,res)=>{
    res.send("Hello world!")
})
app.use("/hello",(req,res)=>{
    res.send("Hello hello hello!✌️")
})
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})