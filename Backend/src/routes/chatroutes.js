const express = require('express')
const router = express.Router()
const chats = require('../models/chatschema')
const { genratetext, genrateanswer, genrateimage } = require('../config/gemini')
const asynchandler = require('../midleware/asynchandler')
const verifyuser = require('../midleware/authmiddleware')
const expresserr = require('../../utils/expresserr')
// create chat
router.post(
  '/chat',
  asynchandler(async (req, res) => {
    const { question, threadid } = req.body // data must be a string
    if (!question || typeof question !== 'string') {
      return res
        .status(400)
        .json({ error: "Request body must contain a string field 'data'" })
    }
    const answer = await genrateanswer(question)
    if (answer.error === 'quota') {
      return res.json({
        massege: 'AI quota exceeded. Please wait a few seconds and try again.'
      })
    }
    let chat = await chats.findOne({threadid})
    if (!chat) {
      chat = new chats({
        threadid,
        question,
        massege: [
          { role: 'user', content: question },
          { role: 'assestent', content: answer }
        ]
      })
    } else {
      chat.massege.push({ role: 'user', content: question })
      chat.massege.push({ role: 'assestent', content: answer })
    }
    await chat.save()
    res.json({ answer, chat })
  })
)
// show all chats
router.get(
  '/chat',
  asynchandler(async (req, res) => {
    const chat = await chats.find().sort({ createdAt: -1 })
    // if (chat.length === 0) {
    //   throw new expresserr(402, 'chats is not initailized')
    // }

    //  const updatedChats = await Promise.all(
    //     chat.map(async (ch) => {
    //       const questionhanding = await genratetext(ch.question);
    //       ch.question = questionhanding;
    //       return ch;
    //     })
    //   );

    res.json({ chat })
  })
)
// show perticuler chat
router.get(
  '/chat/:threadid',
  verifyuser,
  asynchandler(async (req, res) => {
    const { threadid } = req.params
    const chat = await chats.findOne({ threadid })
    res.json({ massege:chat.massege })
  })
)
// delete particuler chat
router.delete(
  '/chat/:threadid',
  verifyuser,
  asynchandler(async (req, res) => {
    const { threadid } = req.params
    await chats.deleteOne({ threadid})
    res.json({ massege: `${threadid} chat deleted` })
  })
)
module.exports = router
