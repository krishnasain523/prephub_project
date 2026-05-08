const express=require("express");
const router=express.Router();
const courses=require("../models/courses/courseschema");
const lectures=require("../models/courses/lectureschema");
const sections=require("../models/courses/sectionschema");
const asynchandler=require("../midleware/asynchandler")



// coures crud
router.post("/course",asynchandler(async(req,res)=>{
const{title,price,intro,validity,instructor,instructor_img}=req.body;
const newcourse=new courses(title,price,intro,validity,instructor,instructor_img);
await newcourse.save();
res.json({massage:"courses created successfully",success:true},newcourse);
}))

router.get("/course",asynchandler(async(req,res)=>{
    const Courses= await courses.find({});
    if(!Courses)
    {
        res.status(404).json({massage:"courses not listed",success:false});
    }
    res.status(200).json({success:true});
}))

router.get("/course/:courseid",asynchandler(async(req,res)=>{
    const{id}=req.params()
    const Course= await courses.findById({id});
    if(!Course)
    {
        res.status(404).json({massage:"course not find",success:false});
    }
    res.status(200).json({success:true},Course);
}))
router.patch("/course/:courseid",asynchandler(async(req,res)=>{
    const{id}=req.params()
    const updatecourse= await courses.findByIdAndUpdate(id,req.body,{new:true,runValidators: true});
    if(!updatecourse)
    {
        res.status(404).json({massage:"course not find",success:false});
    }
    res.status(200).json({success:true,course:up});
}))



router.delete("/course/:courseid",asynchandler(async(req,res)=>{
    const{id}=req.params()
    const Course= await courses.findByIdAndDelete(id);
    if(!Course)
    {
        res.status(404).json({massage:"course not find",success:false});
    }
    res.status(200).json({success:true},Course);
}))

// section crud
router.post("/course/:courseid/section",asynchandler(async(req,res)=>{
    const{id}=req.params;
    const newsection=new sections(req.body)
    await newsection.save();
    res.json({massage:"courses created successfully",success:true},newsection);
}))

router.get("/course/:courseid/section",asynchandler(async(req,res)=>{
    const{id}=req.params;
    const section=await sections.find({course_id:id})
    res.json({massage:"courses created successfully",success:true},newsection);
}))
router.patch("/course/:courseid/section/:sectionid",asynchandler(async(req,res)=>{
    const{sectionid,courseid}=req.params;
    const updatedsection=await sections.findByIdAndUpdate({_id:sectionid,course_id:courseid},{new:true,runValidators:true})
    res.json({success:true,updatedsection});
}))



module.exports=router