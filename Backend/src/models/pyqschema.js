const mongoose=require("mongoose");
const pyqschema=mongoose.Schema({
name:{type:String},
year:{type:Number},
file_url:{type:String,unique:true},
comp_name:{type:String},
company_id:{type:mongoose.Schema.Types.ObjectId,ref:"company"}
})
module.exports=mongoose.model("Pyq",pyqschema);