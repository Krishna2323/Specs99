const mongoose=require("mongoose");


const connectToDb= ()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,UseUnifiedTopology:true}).then((data)=>{
        console.log(`Mongo DB Connected With Server ${data.connection.host}`);
    })
}

module.exports=connectToDb;