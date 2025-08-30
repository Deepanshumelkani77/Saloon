const express=require("express")
const cors=require("cors")  //it is use for fetch data from database in frontend 

//app config
const app=express();
const port=1000;
app.listen(port,()=>{
    console.log("server is running",port);
})




//database connection
const mongoose = require("mongoose");
 const connectDB = async () => {
    try {
      await mongoose.connect(
"mongodb+srv://deepumelkani123_db_user:bhumi77@cluster0.ghgjitk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      );
      console.log("database connected successfully");
    } catch (error) {
      console.error("Error connecting to database:", error);
    }
  };
//db connectin model
connectDB();

//deepumelkani123_db_user
//bhumi77