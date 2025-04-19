const mongoose=require('mongoose');
const connectDB= async ()=>{
    await mongoose.connect("mongodb+srv://tiwarishubham16750:a97Bxmx5XeFQzNPR@namastenode.8wbvi.mongodb.net/devTinder");
    
}

module.exports=connectDB

