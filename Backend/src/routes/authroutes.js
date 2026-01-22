const express=require("express");
const router=express.Router();
const authmiddleware=require("../midleware/authmiddleware")
const {register,login}=require("../cantrolars/authcontroler");
const asynchandler = require("../midleware/asynchandler");
router.post("/register", asynchandler( register))
router.post("/login", asynchandler(login))
router.get("/me",authmiddleware, (req,res)=>{
  return res.json({ user:req.user});
})

module.exports=router;