const jwt=require("jsonwebtoken");

const verifyuser=(req,res,next)=>{
    let token;
         token=req.cookies.token;
         console.log(token)
         if(!token)
         {
          return res.json({massege:" you must loged in first"});
            console.log("must login");
         }
         try{
            const decode=jwt.verify(token,process.env.token_secret);
            req.user=decode;
            console.log("the decoded user is", req.user);
            next();
         }

         catch(err)
         {
            return res.json({massege:"token is not valid"})
         }
     
}
module.exports=verifyuser;