 const adminAuth=(req,res,next)=>{
    const token="xyz";
    const isAdminiAuthorized=token ==="xyz"
    if(!isAdminiAuthorized){
        res.status(401).send("admin Unauthrized request");
    }
    else{
        next();
    }
}

const userAuth=(req,res,next)=>{
    const token="xyz";
    const isAdminiAuthorized=token ==="xyz"
    if(!isAdminiAuthorized){
        res.status(401).send("user Unauthrized request");
    }
    else{
        next();
    }
}


module.exports={
    adminAuth,
    userAuth
}