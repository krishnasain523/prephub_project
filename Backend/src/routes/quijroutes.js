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
const prompt = `
Return ONLY valid raw JSON.
Do NOT wrap the entire response in markdown.

Generate 20 MCQ questions.

Category: ${catagory}
Topic: ${topic}
Difficulty: ${difficultylevel}

STRICT FORMATTING RULES:

1. If a question contains code, wrap the code inside triple backticks.
2. Automatically detect and specify the correct language after the backticks 
   (e.g., javascript, java, python, cpp, c, html, css, sql).
3. NEVER write the language name alone on a separate line.
4. ALWAYS use this exact format for code:

\`\`\`language
code here
\`\`\`

5. Escape newline characters using \\n inside JSON strings.
6. Keep the JSON structure exactly as specified.
7. Do NOT wrap the entire response in markdown.

Return the response strictly in this format:

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