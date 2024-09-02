// controllers/userController.js

import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';
// import Section from '../models/section.model.js';

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

     // Save the user
     const savedUser = await user.save();

    const token = generateToken(savedUser);

    res.cookie('authToken', token, { maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ message: 'User registered successfully', savedUser   });
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

    const token = generateToken(savedUser);

    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
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
