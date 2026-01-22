const users = require('../models/userschema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const checkuser = await users.findOne({ email })
    if (checkuser) {
      res.status(404).json({ massege: 'user already exits' })
    }
    const hashpassword = await bcrypt.hash(password, 10)
    const user = { username, password: hashpassword, email }
    if (!user) {
      res.json({ error: 'something went wrong' })
    }
    const newuser = await users.create(user)
    res.json({ massege: 'user registered' }, newuser)
  } catch (err) {
    console.log(err)
  }
}
const login = async (req, res) => {
  const { email, password } = req.body
  const user = await users.findOne({ email })
  console.log(user);
  if (!user) {
    const error = new Error('User not found')
    error.statusCode = 404
    throw error
  }
  const isuser = await bcrypt.compare(password, user.password)
  if (!isuser) {
    res.json({ massege: 'password incorrect' })
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.token_secret,
    { expiresIn: '1h' }
  )
     res.cookie("token", token, {
      httpOnly: true,  //  JavaScript can't access it
      secure: false,   // true if using HTTPS
      sameSite: "strict"
    });
 return res.status(200).json({massege:"login sucessful"});
}

module.exports = { register, login }
