const mongoose=require("mongoose");
const sectionschema=mongoose.Schema({
course_id:{type:mongoose.Schema.Types.ObjectId,ref:"Course"},
title:{type:String,unique:true},
order:{type:String}
})
module.exports=mongoose.model("Section",sectionschema);