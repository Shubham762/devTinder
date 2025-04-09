const express=require('express');
const app=express();


app.use("/user",[(req,res,next)=>{
    console.log("printed")
    //res.send("  Route Handler1! ") 
    next();
}],
(req,res,next)=>{
   // res.send("Route Handler2");
    console.log("Route Handler2!")
    next();
},
(req,res,next)=>{
   // res.send("Route Handler3");
    console.log("Route Handler3")
    next();
},
(req,res,next)=>{
    res.send("Route Handler4");
    console.log("Route Handler4!");
    //next();
}
)


app.listen(7777,()=>{
    console.log("listenng 7777 successfully ...")
})