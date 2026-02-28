const express = require('express')
const router = express.Router()
const multer = require('multer')
const pdfParse = require('pdf-parse')
const asynchandler = require('../midleware/asynchandler')
const { uploadcloudinary } = require('../config/cloudconfig')
const { genratetext } = require('../config/gemini')
const upload = multer({ storage: multer.memoryStorage() })
router.post(
  '/upload',
  upload.single('resume'),
  asynchandler(async (req, res) => {
    // console.log(pdfParse);
    const data = await pdfParse(req.file.buffer)
    const { description } = req.body
    const resumetext = data.text
    const promt = ` you are a advanced Ats (applicant tracking system)
        compare the following resume with job description
        Scoring Criteria & Weightage:
1. Technical Skills Match – 40%
2. Relevant Experience – 30%
3. Education Relevance – 15%
4. Soft Skills & Communication – 15%
        Instructions:
- dont give randomly response give after camparing both resume and description 

        Return STRICT valid JSON.
Do not include markdown.
Do not include explanation. and give me sugestion whats new should i write in resume in imrovement_sugestions
        {
        "totalrequired_skill":[which exits in description],
        "matched_skill":[which exits in both resume and description],
        "missing_skill":[which is not in resume but exits in description],
        "experience_years":number,
        "required_years":number,
        "education_relevent":boolean,
        "matched_softskill":[which exits in both resume and description],
        "required_softskill":[which exits in description],
         "missing_softskill":[which is not in resume but exits in description],
        "weakness":" ",
        "improvement_sugestions":[]
        }
       resumetext:${resumetext}
       description:${description}
   `
const result = await genratetext(promt);
if (!result) {
  return res.status(500).json({ error: "Empty AI response" });
}

let parsed;

try {
  parsed = JSON.parse(result.trim());
} catch (err) {
  console.log("Invalid JSON:", result);
  return res.status(500).json({ error: "Invalid JSON from AI" });
}

res.json(parsed);
  })
)

module.exports = router
