const express=require("express");
const router=express.Router();
const subjects =require("../models/subjectschema")
const topics =require("../models/topicschema")
const mcqs =require("../models/mcqschema");
const expresserr = require("../../utils/expresserr");
const {verifyadmin}=require("../midleware/rolemiddleware")
const asynchandler=require("../midleware/asynchandler");
const { genrateanswer } = require("../config/gemini");
router.post("/subject",verifyadmin,asynchandler(async(req,res)=>
{
         const{name}=req.body;      
          const newsubject=await subjects.create({name});
        res.status(201).json(newsubject,{massege:"subject created"});
        
}));

router.get("/subjects",asynchandler(async(req,res)=>
{        
         const subject=await subjects.find();
        if(subject.length===0)
        {
              throw new expresserr(404,"subjects not initailized");
        }
        res.json(subject);
       
}))
router.get("/subjects/:id",asynchandler(async(req,res)=>
{        const {id}=req.params;
         const subject=await subjects.findById(id);
        if(subject.length===0)
        {
              throw new expresserr(404,"subject not find");
        }
        res.json(subject);
       
}))
router.post("/subjects/:id/startquiz",asynchandler(async(req,res)=>{
const {topic,catagory,difficultylevel}=req.body;
const prompt=`
Do NOT wrap the response in markdown or triple backticks.
Return raw JSON only.
Generate 20 MCQ questions.

Category: ${catagory}
Topic: ${topic}
Difficulty: ${difficultylevel}

Return the response in the following JSON format ONLY:

{
  "mcqs": [
    {
      "id": 1,
      "question": "Question text here",
      "options": {
        "a": "Option A",
        "b": "Option B",
        "c": "Option C",
        "d": "Option D"
      },
      "correctAnswer": "b"
    }
  ]
}
`;
const answer=await genrateanswer(prompt);
res.status(200).json({answer});    
}))
module.exports=router;