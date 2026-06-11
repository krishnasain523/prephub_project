const express = require('express')
const router = express.Router()
const multer = require('multer')
const pdfParse = require('pdf-parse')
const asynchandler = require('../midleware/asynchandler')
const { uploadcloudinary } = require('../config/cloudconfig')
const { genratetext, genrateanswer } = require('../config/gemini')
const upload = multer({ storage: multer.memoryStorage() })
const resume = require('../models/resumeschema')
const verifyuser = require('../midleware/authmiddleware')
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
Do not include explanation. and give me sugestion whats new should i write in resume in imrovement_sugestions in easy(english) language 
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
        "weakness":" "//tell weakness brefly in 2-3 lines,
        "improvement_sugestions":[length should be <=4 ]
        }
       resumetext:${resumetext}
       description:${description}
   `
    const result = await genrateanswer(promt)

   

    if (
      !result ||
      result?.error === 'quota' ||
      result?.error === 'api_error' ||
      result?.error === 'empty_response' ||
      result?.error === 'server_error'
    ) {
      const fallbackResume = {
        overall_score: 60,
        skill_score: 25,
        exprience_score: 20,
        education_score: 15,
        matched_skill: ['JavaScript'],
        missing_skill: ['React', 'Node.js'],
        matched_softskill: ['Communication'],
        required_softskill: ['Communication', 'Teamwork'],
        missing_softskill: ['Teamwork'],
        weakness:
          'AI analysis is currently unavailable. This is a fallback response.',
        improvement_sugestions: [
          'Add more project details',
          'Add technical skills section',
          'Highlight achievements',
          'Tailor resume to job description'
        ]
      }

      return res.status(200).json({
        message: 'Fallback analysis generated',
        data: fallbackResume
      })
    }
     try {
     const resumeinfo = JSON.parse(result.trim())
    } catch (err) {
      console.log('Invalid JSON:', result)
      return res.status(500).json({ error: 'Invalid JSON from AI' })
    }
    const skill_score =
      ((resumeinfo.matched_skill.length || 0) /
        (resumeinfo.totalrequired_skill.length || 1)) *
      40
    const experience_ratio =
      resumeinfo.required_years > 0
        ? resumeinfo.experience_years / resumeinfo.required_years
        : 1
    const ratio = Math.min(experience_ratio, 1)
    const exprience_score = ratio * 30
    const education_score = resumeinfo.education_relevent ? 15 : 5
    const overall_score = skill_score + exprience_score + education_score

    const saveresume = await resume.create({
      overall_score: Math.round(overall_score),
      skill_score: Math.round(skill_score),
      exprience_score: Math.round(exprience_score),
      education_score: Math.round(education_score),
      matched_skill: resumeinfo.matched_skill,
      missing_skill: resumeinfo.missing_skill,

      matched_softskill: resumeinfo.matched_softskill,
      required_softskill: resumeinfo.required_softskill,
      missing_softskill: resumeinfo.missing_softskill,
      weakness: resumeinfo.weakness,
      improvement_sugestions: resumeinfo.improvement_sugestions
    })
    console.log(saveresume)
    res.json({ massage: 'resume score saved', data: saveresume })
  })
)
router.get(
  '/upload/resume',
  asynchandler(async (req, res) => {
    const latestresume = await resume.findOne().sort({ createdAt: -1 })
    res.json(latestresume)
  })
)
module.exports = router
