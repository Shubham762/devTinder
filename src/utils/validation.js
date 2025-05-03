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

module.exports={
    validateSignUpData,
    validateEditProfileData
}