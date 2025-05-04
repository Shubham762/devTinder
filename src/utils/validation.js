const validator=require('validator');
const validateSignUpData=(req)=>{
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

const validateEditProfileData=(req)=>{
    const allowedEditFields=[
        "firstName",
        "lastName",
        "emailId",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills"
    ]
    const isEditAllowed=Object.keys(req.body).every((fields)=>allowedEditFields.includes(fields));
    return isEditAllowed;
}


const validateNewPassowrdData=(req)=>{
    const { password }=req.body;
     if(!validator.isStrongPassword(password)){
        return new Error("Password is not strong!");
    }
    return true;
}

module.exports={
    validateSignUpData,
    validateEditProfileData,
    validateNewPassowrdData
}