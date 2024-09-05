// controllers/userController.js
import { configDotenv } from 'dotenv';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';
// import Section from '../models/section.model.js';

configDotenv();

const generateToken = (savedUser) => {
  const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);
  return token;
}

// Check Authentication Status
export const checkAuthStatus = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const verified = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(verified.userId); // Correct use of await

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({user: { username: user.username, email: user.email, _id: user._id}});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


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

    // Generate JWT Token
    const token = generateToken(savedUser);

    // Set token in cookies, note: "httpOnly: true" makes it inaccessible to JavaScript
    res.cookie('authToken', token, { 
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,              // Can't be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production' // Secure in production
    });

    // Return user data (without password) and success message
    res.status(201).json({ message: 'User registered successfully', user: { username, email, _id: savedUser._id }});
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
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.cookie('authToken', token, { 
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,              // Can't be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production' // Secure in production
    });
    res.json({message: 'User logged in successfully', user: {email, username: user.username, _id: user.__v}});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Logout
export const logout = (req, res) => {
  // Invalidate the token (client-side operation)
  res.cookie('authToken', "");
  res.json({ message: 'User logged out successfully' });
};
