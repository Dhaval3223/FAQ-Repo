const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//@desc Register  new user
//route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields.')
  }

  //Check if userExists already
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400)
    throw new Error('User already exists.')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  //Create userExists
  const user = await User.create({
    name,
    email,
    password:hashPassword
  })

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid data.')
  }

  res.json({ message: 'Register user' })
})

//@desc Authenticate a user
//route POST /api/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials.')
  }

  res.json({ message: 'Login user' })
  throw new Error('Invalid user data')
})

//@desc Get user data
//route POST /api/me
// @access Pricate
const getMe = asyncHandler(async (req, res) => {
  res.json(req.user)
})

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { 
    expiresIn: '10d', 
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}