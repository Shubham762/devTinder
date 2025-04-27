const mongoose=require('mongoose');
const validator=require('validator');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid "+"-" + value)}
        }
        
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password id not strong "+"-" + value)}
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
          if(!["male","female","others"].includes(value)){
            throw new Error("Genter is not valid")
        }
    }
    },
    photoUrl:{
        type:String,
        default:"https://www.pngitem.com/middle/ixwxbwh_user-profile-dummy-hd-png-download/",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Email is not valid "+"-" + value)}
        }
    },
    about:{
        type:String,
        default:"this is the default about of the user"
    },
    skills:{
        type:[String]
    },
     
  },
  {
    timestamps:true
  }  
);

module.exports=mongoose.model("User",userSchema);
