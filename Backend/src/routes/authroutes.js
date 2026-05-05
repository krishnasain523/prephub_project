const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authmiddleware = require('../midleware/authmiddleware')
const { register, login } = require('../cantrolars/authcontroler')
const asynchandler = require('../midleware/asynchandler')
const passport = require('passport')
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
)
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign(req.user, process.env.token_secret, {
      expiresIn: '7d'
    })
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none'
    })
    res.redirect(`${process.env.frontendurl}/dashboard`)
  }
)
router.post('/register', asynchandler(register))
router.post('/login', asynchandler(login))
router.post(
  '/logout',
  asynchandler(async (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })
    res.json({ massege: 'logout successfully' })
  })
)
router.get('/me', authmiddleware, (req, res) => {
  return res.json({ user: req.user })
})

module.exports = router
