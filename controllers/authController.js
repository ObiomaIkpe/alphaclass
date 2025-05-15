const User = require('../models/userSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber} = req.body;
  
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Check if user already exists
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });
       
    await newUser.save();
    return res.status(201).json({ message: 'User created successfully', user: newUser });
  }
  catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


const login = async(req, res) => {
  // Get user credentials from request body
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      throw new Error('User not found');
    }
    const isPasswordValid = await user.comparePassword(password, user.password);
    if(!isPasswordValid){
      throw new Error('Invalid password');
    }
    // generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '24h', // Token expires in 24 hours
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: true,
    maxAge: 3600000,
  })
  // return response
  return res.status(200).json({
    message: 'Login successful',
    token,
    user       
    })
    
  } catch (error) {
    console.error("Error logging in user:", error);
        throw error;
  }
}


module.exports = {signUp, login}