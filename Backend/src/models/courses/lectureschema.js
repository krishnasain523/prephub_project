const mongoose=require("mongoose");
const lectureschema=mongoose.Schema({
course_id:{type:mongoose.Schema.Types.ObjectId,ref:"Course"},
section_id:{type:mongoose.Schema.Types.ObjectId,ref:"Section"},
title:{type:String,unique:true},
duration:{type:Number,required:true},
ispreview:{type:Boolean},
vedio_key:{type:String},
})
module.exports=mongoose.model("Lecture",lectureschema);
