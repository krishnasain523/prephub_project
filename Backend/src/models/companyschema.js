const mongoose=require("mongoose");
const companyschema=mongoose.Schema({
name:{type:String,unique:true},
})
module.exports=mongoose.model("Company",companyschema);