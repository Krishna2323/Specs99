const express = require("express");
const app = express();
const ErrorHandler=require("./utils/errorHandler");
const middleware=require("./middleware/error")
const product=require("./routes/productsRoute");
const user =require("./routes/usersRoute");
const order=require("./routes/ordersRoute")
const payment = require("./routes/paymentRoute");
const path=require("path")


if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"})

}

const cookies=require("cookie-parser")
const fileUpload=require("express-fileupload")
const bodyParser=require("body-parser")




app.use(express.json());
app.use(cookies())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())

// Routes Imports

app.use("/api/vi", payment);

app.use("/api/vi",product)
app.use("/api/vi",user)
app.use("/api/vi",order)

app.use(middleware);

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res)=>{
    res.sendFile((path.resolve(__dirname,"../frontend/build/index.html")));
});



module.exports=app