const express=require("express")
const cors=require("cors")  //it is use for fetch data from database in frontend 

//app config
const app=express();
const port=1000;
app.listen(port,()=>{
    console.log("server is running",port);
})
