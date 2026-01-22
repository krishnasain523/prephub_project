const expresserr = require("../../utils/expresserr");

const autherizedrole=(...allowedrole)=>
{
    return  (req,res,next)=>{
            if(!allowedrole.includes(req.user.role))
            {
                res.status(404).json({massege:"accesss denied"});
            }
            next();
        }
    
}
const verifyadmin=()=>{
    return(req,res,next)=>{
        if(req.user.role!="admin")
        {
 throw new expresserr(404,"only admin can access");
        }
        next();
    }
}
module.exports={autherizedrole,verifyadmin};