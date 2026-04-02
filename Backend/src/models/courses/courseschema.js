const mongoose=require("mongoose");
const courseschema=mongoose.Schema({
createdby:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
title:{type:String,unique:true},
price:{type:Number,required:true},
intro:{type:String},
validity:{type:Date},
instructor:{type:String},
instructor_img:{type:String},
})
module.exports=mongoose.model("Course",courseschema);