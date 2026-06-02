const express = require('express')
const router = express.Router()
const courses = require('../models/courses/courseschema')
const lectures = require('../models/courses/lectureschema')
const sections = require('../models/courses/sectionschema')
const asynchandler = require('../midleware/asynchandler')
const { data } = require('react-router')
const multer = require('multer')
const { uploadcloudinary } = require('../config/cloudconfig.js')
const upload = multer({ storage: multer.memoryStorage() })

// courses crud
router.post(
  '/course',
  upload.fields([
    { name: 'introvedio', maxCount: 1 },
    { name: 'instructor_img', maxCount: 1 },
    { name: 'img', maxCount: 1 }
  ]),
  asynchandler(async (req, res) => {
    console.log(req.files)
    const vdoresult = await uploadcloudinary(req.files.introvedio[0].buffer)
    const imgresult = await uploadcloudinary(req.files.instructor_img[0].buffer)
    const img1result = await uploadcloudinary(req.files.img[0].buffer)
    const newcourse = new courses({
      ...req.body,
      introurl: vdoresult.secure_url,
      instructor_img: imgresult.secure_url,
      img:img1result.secure_url
    })
    await newcourse.save()
    console.log(newcourse)
    res.json({
      massage: 'course uploaded successfully',
      success: true,
      data: newcourse
    })
  })
)

router.get(
  '/course',
  asynchandler(async (req, res) => {
    const Courses = await courses.find({})
    if (!Courses) {
      res.status(404).json({ massage: 'courses not listed', success: false })
    }
    res.status(200).json({ success: true, data: Courses })
  })
)

router.get(
  '/course/:courseid',
  asynchandler(async (req, res) => {
    const { courseid } = req.params
    const Course = await courses.findById(courseid)
    if (!Course) {
      res.status(404).json({ massage: 'course not find', success: false })
    }
    res.status(200).json({ success: true, data: Course })
  })
)
router.patch(
  '/course/:courseid',
  asynchandler(async (req, res) => {
    const { courseid } = req.params
    const updatecourse = await courses.findByIdAndUpdate(courseid, req.body, {
      new: true,
      runValidators: true
    })
    if (!updatecourse) {
      res.status(404).json({ massage: 'course not find', success: false })
    }
    res.status(200).json({ success: true, course: updatecourse })
  })
)

router.delete(
  '/course/:courseid',
  asynchandler(async (req, res) => {
    const { courseid } = req.params
    const Course = await courses.findByIdAndDelete(courseid)
    if (!Course) {
      res.status(404).json({ massage: 'course not find', success: false })
    }
    res.status(200).json({ success: true }, Course)
  })
)

// section crud
router.post(
  '/course/:courseid/section',
  asynchandler(async (req, res) => {
    const { courseid } = req.params
    const newsection = new sections({ course_id: courseid, ...req.body })
    await newsection.save()
    res
      .status(200)
      .json({
        massage: 'courses created successfully',
        success: true,
        data: newsection
      })
  })
)

router.get(
  '/course/:courseid/section',
  asynchandler(async (req, res) => {
    const { courseid } = req.params
    const section = await sections.find({ course_id: courseid })
    res
      .status(200)
      .json({
        massage: 'courses created successfully',
        success: true,
        data: section
      })
  })
)
router.patch(
  '/course/:courseid/section/:sectionid',
  asynchandler(async (req, res) => {
    const { sectionid, courseid } = req.params
    const updatedsection = await sections.findByIdAndUpdate(
      { _id: sectionid, course_id: courseid },
      req.body,
      { new: true, runValidators: true }
    )
    res.status(200).json({ success: true, data: updatedsection })
  })
)
router.delete(
  '/course/:courseid/section/:sectionid',
  asynchandler(async (req, res) => {
    const { sectionid } = req.params
    const section = await sections.findByIdAndDelete(sectionid)
    if (!section) {
      res.status(404).json({ massage: 'course not find', success: false })
    }
    res.status(200).json({ success: true })
  })
)
// lecture crud
router.post(
  '/course/:courseid/section/:sectionid/lecture',
  upload.single('vedio_key'),
  asynchandler(async (req, res) => {
    const { courseid, sectionid } = req.params
    const vdoresult = await uploadcloudinary(req.file.buffer)
    const newlecture = new lectures({
      course_id: courseid,
      section_id: sectionid,
      ...req.body,
      vedio_key: vdoresult.secure_url
    })
    await newlecture.save()
    res
      .status(200)
      .json({
        massage: 'lecture created successfully',
        success: true,
        data: newlecture
      })
  })
)

router.get(
  '/course/:courseid/section/:sectionid/lecture',
  asynchandler(async (req, res) => {
    const { sectionid } = req.params
    const alllectures = await lectures.find({ section_id: sectionid })
    res
      .status(200)
      .json({
        massage: 'courses created successfully',
        success: true,
        data: alllectures
      })
  })
)
router.patch(
  '/course/:courseid/section/:sectionid/lecture/:lectureid',
  asynchandler(async (req, res) => {
    const { courseid, sectionid, lectureid } = req.params
    const updatedlecture = await lectures.findOneAndUpdate(
      { _id: lectureid, course_id: courseid, section_id: sectionid },
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedlecture) {
      res.status(404).json({ success: false, massage: 'lecture not found' })
    }
    res.status(200).json({ success: true, data: updatedlecture })
  })
)

router.delete(
  '/course/:courseid/section/:sectionid/lecture/:lectureid',
  asynchandler(async (req, res) => {
    const { lectureid } = req.params
    const lecture = await lectures.findByIdAndDelete(lectureid)
    if (!lecture) {
      res.status(404).json({ massage: 'course not find', success: false })
    }
    res.status(200).json({ success: true })
  })
)
module.exports = router
