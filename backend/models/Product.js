const mongoose = require("mongoose");
const productSchema=new mongoose.Schema({

    name:{type:String,required:true},
    image:{type:String},
    size:{type:Number},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    for:{type:String,required:true},
    brand:{type:String},
    count:{type:Number,default:0}
})

const Product=mongoose.model("Product",productSchema);
module.exports=Product;