const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErr=require("../middleware/catchAsyncErr");
const jwt=require("jsonwebtoken")
const User = require("../modals/userModal")


exports.isAuthenticated=catchAsyncErr(async(req,res,next)=>{
const {token}=req.cookies;
if(!token){
    return next(new ErrorHandler("Please Login To Access This Resource",401));
}

const decodedData=jwt.verify(token,process.env.JWT_SECRET);

req.user= await User.findById(decodedData.id);

next();

})


exports.authRoles=(...roles)=>{
return (req,res,next)=>{
if(!roles.includes(req.user.role)){
    return next(
        new ErrorHandler(`Roles:${req.user.role} is not allowed to access this resource `,403)
    )

}
next();

}
}

