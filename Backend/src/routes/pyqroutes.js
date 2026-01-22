const express=require("express");
const router=express.Router();
const companys=require("../models/companyschema");
const pyqs=require("../models/pyqschema");
const expresserr = require("../../utils/expresserr");
const asynchandler=require("../midleware/asynchandler")
const {uploadcloudinary}=require("../config/cloudconfig")
const multer=require("multer");
const verifyuser=require("../midleware/authmiddleware")
const{verifyadmin}=require("../midleware/rolemiddleware");
const upload=require("../midleware/multer");
router.post("/company",verifyadmin,asynchandler(async(req,res)=>{
        const{name}=req.body;
        const newcompany=await companys.create({name});
        res.status(202).json({massege:"company listed"},newcompany);
        
}))
router.post("company/:company_id/pyq",verifyuser,verifyadmin,upload.single("pdf"),asynchandler(async(req,res)=>{
        const {company_id}=req.params;
        const {name,year,comp_name}=req.body;
        const localfilepath=req.file.path;
        const result=await uploadcloudinary(localfilepath);
        const file_url=result.secure_url;
        const newpyq=await pyqs.create({name,year,file_url,comp_name,company_id})
        console.log(newpyq);
         res.status(202).json({massege:"pyq uploaded"},newpyq);

}))
router.get("/company/:company_id/pyq",asynchandler(async(req,res)=>{
       const{company_id}=req.params;
       console.log(company_id);
       const pyq=await pyqs.find({company_id});
       if(pyq.length===0)
       {
        throw new expresserr(404," pyq not available");
       }
       res.json(pyq);
    
}))
router.get("/company",asynchandler(async(req,res)=>{
    const company=await companys.find();
    if(company.length===0 )
    {
         throw new expresserr(404," company not initilaized")
    }
    res.json(company);
}))

module.exports=router