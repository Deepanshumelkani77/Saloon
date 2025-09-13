const mongoose = require("mongoose");
const productSchema=new mongoose.Schema({

    name:{type:String,required:true},
    image:{type:String},
    size:{type:Number},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    for:{type:String,required:true}
})

const Product=mongoose.model("Product",productSchema);
module.export=Product;