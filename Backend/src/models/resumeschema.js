const mongoose=require("mongoose");
const resumeschema=mongoose.Schema({
user_id:{type:mongoose.Schema.Types.ObjectId,
    ref:"User",
},
overall_score:{type:Number},
skill_score:{type:Number},
exprience_score:{type:Number},
education_score:{type:Number},
matched_skill:[{type:String}],
missing_skill:[{type:String}],
 matched_softskill:[{type:String}],
 required_softskill:[{type:String}],
missing_softskill:[{type:String}],
weakness:{type:String},
improvement_sugestions:[]


},{timestamps:true});

module.exports=mongoose.model("Resume",resumeschema);