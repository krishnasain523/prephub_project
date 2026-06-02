const mongoose=require("mongoose");
const courseschema= new mongoose.Schema({
createdby:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
title:{type:String,unique:true},
price:{type:Number,required:true},
introurl:{type:String},
img:{type:String},
validity:{type:Date},
instructor:{type:String},
instructor_img:{type:String},
})
module.exports=mongoose.model("Course",courseschema);