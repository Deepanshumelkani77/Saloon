const mongoose = require("mongoose");
const productSchema=new mongoose.Schema({

    name:{type:String,required:true},
    image:{type:String},
    size:{type:Number},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    gender:{type:String,required:true,enum:['Men','Women','Unisex']}, // Changed from 'for' to 'gender'
    brand:{type:String},
    stock:{type:Number,default:0}, // Inventory/stock count
    count:{type:Number,default:0} // Purchase count for bestsellers
})

const Product=mongoose.model("Product",productSchema);
module.exports=Product;