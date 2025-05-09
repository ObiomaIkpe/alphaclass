const User = require('../models/userSchema');

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, dateOfBirth} = req.body;
  
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
      dateOfBirth,
    
    });
    await newUser.save();
    return res.status(201).json({ message: 'User created successfully', user: newUser });
  }
  catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}