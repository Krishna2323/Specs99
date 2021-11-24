const sendToken=(user,statustCode,res)=>{
    const token = user.getJWTtoken();

    const options ={
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE * 24*60*60*1000
        ),
        httpOnly:true
    };

    res.status(statustCode).cookie("token",token,options).json({success:true,user,token})




}

module.exports=sendToken;