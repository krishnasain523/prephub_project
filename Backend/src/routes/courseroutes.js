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
    const{courseid}=req.params()
    const Course= await courses.findByIdAndDelete(courseid);
    if(!Course)
    {
        res.status(404).json({massage:"course not find",success:false});
    }
    res.status(200).json({success:true},Course);
}))

// section crud
router.post("/course/:courseid/section",asynchandler(async(req,res)=>{
    const{courseid}=req.params;
    const newsection=new sections({course_id:courseid,...req.body})
    await newsection.save();
    res.status(200).json({massage:"courses created successfully",success:true,newsection});
}))

router.get("/course/:courseid/section",asynchandler(async(req,res)=>{
    const{courseid}=req.params;
    const section=await sections.find({course_id:courseid})
    res.status(200).json({massage:"courses created successfully",success:true,data:section});
}))
router.patch("/course/:courseid/section/:sectionid",asynchandler(async(req,res)=>{
    const{sectionid,courseid}=req.params;
    const updatedsection=await sections.findByIdAndUpdate({_id:sectionid,course_id:courseid},req.body,{new:true,runValidators:true})
    res.status(200).json({success:true,data:updatedsection});
}))

// lecture crud
router.post("/course/:courseid/section/:sectionid/lecture",asynchandler(async(req,res)=>{
    const{courseid,sectionid}=req.params;
    const newlecture=new lectures({course_id:courseid,section_id:sectionid,...req.body})
    await newlecture.save();
    res.status(200).json({massage:"courses created successfully",success:true,data:newlecture});
}))

router.get("/course/:courseid/section/:sectionid/lecture",asynchandler(async(req,res)=>{
    const{sectionid}=req.params;
    const alllectures=await lectures.find({section_id:sectionid})
    res.status(200).json({massage:"courses created successfully",success:true,data:alllectures});
}))
router.patch("/course/:courseid/section/:sectionid/lecture/:lectureid",asynchandler(async(req,res)=>{
    const{courseid,sectionid,lectureid}=req.params;
    const updatedlecture=await lectures.findOneAndUpdate({_id:lectureid,course_id:courseid,section_id:sectionid},req.body,{new:true,runValidators:true})
    if(!updatedlecture)
    {
         res.status(404).json({success:false,massage:"lecture not found"});
    }
    res.status(200).json({success:true,data:updatedlecture});
}))
module.exports=router