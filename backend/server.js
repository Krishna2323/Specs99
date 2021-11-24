const app = require("./app");
const cloudinary = require("cloudinary")
 
const connectToDb=require("./config/database");

// Uncaught Error
process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down The Server Due To Uncaught Exception`);
    process.exit(1)
})


if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"})

}
connectToDb();
const port= process.env.LOCAL 


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
    
})


const server=app.listen(port,()=>{
    console.log(`SERVER RUNNING AT ${port}`);
})

 


 process.on("unhandledRejection",err=>{
      console.log(`Error: ${err.message}`);
      console.log(`Shutting Down The Server Due To Unhandaled Promise Rejection`);

      server.close(()=>{
          process.exit(1)
      })
 })