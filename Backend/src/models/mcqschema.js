const mongoose=require("mongoose");
const mcqschema=mongoose.Schema({
question:{type:String,required:true,unique:true},
answer:{type:String,required:true},
options:[{type:String,unique:true,required:true}],
explanation:{type:String},
topic_id:{type:mongoose.Schema.Types.ObjectId,ref:"Topic"}
})
module.exports=mongoose.model("Mcq",mcqschema);
