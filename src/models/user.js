const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
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
        default:"https://lh3.googleusercontent.com/ogw/AF2bZyiv4t1qnMIYDOFOxSWXu8Nk2zSYNYEVviE6lcpHLpLI5OrO=s32-c-mo",
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


// dont use arrow function for below function that will not work as this wwere refering to userSchema
userSchema.methods.getJWT=async function (){
    const user=this;
    const token= await jwt.sign({userId:user._id},"Dev@Tinder$12345",{expiresIn:"7d"});
    return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}

module.exports=mongoose.model("User",userSchema);
