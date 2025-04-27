const validator=require('validator');
const validateSignUpData=(req)=>{
    console.log(req.body)
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName){
        return new Error("Name is not valid!");
    }
    else if(!validator.isEmail(emailId)){
        return new Error("Email is not valid!");
    }
    else if(!validator.isStrongPassword(password)){
        return new Error("Password is not strong!");
    }
   
}

module.exports={
    validateSignUpData,
}