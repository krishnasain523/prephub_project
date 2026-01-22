const mongoose=require("mongoose");
const topicschema=mongoose.Schema({
    name:{type:String,required:true},
    sub_id:{type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:true
    }
})
module.exports=mongoose.model("Topic",topicschema);