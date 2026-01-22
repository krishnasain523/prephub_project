const mongoose=require("mongoose");
const subjectschema=mongoose.Schema({
subid:{type:String},
name:{type:String,required:true},
code:{type:String},
difficultyLevels:{enum:["easy","mediam","hard"]},
topics:[{type:String,required:true}],
},{timestamps:true})
module.exports=mongoose.model("Subject",subjectschema);