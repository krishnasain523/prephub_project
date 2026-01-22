const express=require("express");
const router=express.Router();
const verifytoken=require("../midleware/authmiddleware")
const {autherizedrole}=require("../midleware/rolemiddleware")
router.post("/user",verifytoken,autherizedrole("admin","user"),(req,res)=>{
    res.json({massege:"welcome user"})
});
router.post("/admin",verifytoken,autherizedrole("admin"),(req,res)=>{
    res.json({massege:"welcome admin"})
});

module.exports=router;