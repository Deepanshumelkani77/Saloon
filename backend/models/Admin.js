const mongoose = require("mongoose");

const adminSchema=new mongoose.Schema({
username:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:false}, 
image:{type:String},
phone_no:Number,
address:{type:String},
gender:{type:String},
dob:{type:Date},
//for goofle login
googleId:{type:String}, 
bio:{type:String}


})

const Admin=mongoose.model("Admin",adminSchema)
module.exports=Admin