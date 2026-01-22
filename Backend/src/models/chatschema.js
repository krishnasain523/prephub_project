const mongoose=require("mongoose");
const massegeschema=mongoose.Schema({
    role:{type:String,enum:["user","assestent"]},
    content:{type:String,required:true},
    timestamps:{type:Date,
        default:Date.now
    }
})

const chatschema=mongoose.Schema({
    threadid:{type:String,required:true,unique:true},
    question:{type:String,
        required:true,
        default:"new chat"
    },
    massege:[massegeschema],

    
},{timestamps:true});

module.exports=mongoose.model("Chat",chatschema);
