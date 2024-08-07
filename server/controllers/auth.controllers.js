// controllers/userController.js

import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';

// Registration
export const register = async (req, res) => {
  try {
    console.log("Registering a user!");

    const { username, email, password } = req.body;
    
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);                                                                                   
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user
    user = new User({         
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    
    // const registeredUser = await User.findOne({ email });
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', user, token   });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};  

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({message: 'User logged in successfully', token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Logout
export const logout = (req, res) => {
  // Invalidate the token (client-side operation)
  res.json({ message: 'User logged out successfully' });
};
