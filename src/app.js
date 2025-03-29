const express=require('express');
const app=express();

// app.use("/",(req,res)=>{
//     res.send("Hello from varanasi dashboard🙏!")
// })

// app.use("/test/2",(req,res)=>{
//     res.send("abcd")
// })
// app.use("/user",(req,res)=>{
//     res.send("Hello world!")
// })
// app.use("/hello",(req,res)=>{
//     res.send("Hello hello hello!✌️")
// })
// app.listen(3000,()=>{
//     console.log("server is running on port 3000");
// })

// app.use("/",(req,res)=>{
//     res.send("Hello from varanasi dashboard🙏!")
// })

app.get("/user",(req,res)=>{
    res.send({
        firstName:"Shubham",
        lastName:"Tiwari"
    })
})
app.post("/user",(req,res)=>{
   // console.log("data saved successfully")
  res.send("Data is saved successfully in the database")
})
app.delete("/user",(req,res)=>{
    res.send("Data deleted successfully!😍")
})
app.use("/user",(req,res)=>{
    res.send("Hello world!")
})
app.use("/test",(req,res)=>{
    res.send("Hello world!")
})


app.listen(7777,()=>{
    console.log("listenng 7777 successfully ...")
})