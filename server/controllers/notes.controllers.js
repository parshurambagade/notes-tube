// controllers/noteController.js

import Notes from "../models/notes.model.js";
import { YoutubeTranscript } from "youtube-transcript";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPT_FOR_NOTES_GENERATION } from "../constants.js";
import User from '../models/user.model.js';
import axios from "axios";
// import Section from '../models/section.model.js';

// Create Note
export const generateNotes = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    // Make a request to the YouTube Data API to fetch video details
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        part: 'snippet',
        id: videoId,
        key: process.env.YOUTUBE_API_KEY,
      }
    });

    const videoDetails = response.data.items[0];

    // console.log(videoDetails);

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const combinedTranscript = transcript.reduce((acc, cur) => {
      return acc + cur.text + " ";
    });
    console.log(combinedTranscript);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = PROMPT_FOR_NOTES_GENERATION + combinedTranscript;
    console.log("Prompt length: ", prompt.length);

    if(prompt.length > 25000){
      res.status(400).json({ message: "Video length is too long" });
    }else{
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text);
    res.json({ content: text, videoDetails: videoDetails });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const saveNotes = async (req, res) => {
  try {
    const { title, thumbnail, content, videoId, createdBy } = req.body;

    // Now save the note with the correct sectionId
    const newNotes = new Notes({
      title,
      thumbnail,
      content,
      videoId,
      createdBy
    });
    
    // Check if notes with the same videoId already exist
    const existingNotes = await Notes.findOne({ videoId, createdBy });

    if (existingNotes) {
      return res.status(400).json({ message: 'Notes for this video already exist' });
    }


    // Update the user's notes array to include the newly created note's ID
    await User.findByIdAndUpdate(
      createdBy, 
      { $push: { notes: savedNotes._id } },
      { new: true }  // Optionally return the updated document if needed
    );

    const savedNotes = await newNotes.save();

    // Update the user's notes array to include the newly created note's ID
    await User.findByIdAndUpdate(
      createdBy, 
      { $push: { notes: savedNotes._id } },
      { new: true }  // Optionally return the updated document if needed
    );

    res.status(200).json({ message: 'Notes saved successfully', note: savedNotes });
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ message: 'Error saving note', error: error.message });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const { videoId, userId } = req.params;

    // Find the note with the specified videoId and createdBy userId
    const notes = await Notes.findOne({ videoId, createdBy: userId });

    // If no note is found, return a 404 response
    if (!notes) {
      return res.status(404).json({ message: 'Notes not found or you are not authorized to delete this note.' });
    }

    // Remove the note ID from the user's notes array
    await User.updateOne(
      { _id: userId },
      { $pull: { notes: notes._id } }
    );

    // Delete the note itself
    await notes.deleteOne();

    return res.status(200).json({ message: 'Notes deleted successfully.' });
  } catch (error) {
    console.error('Error deleting notes:', error);
    res.status(500).json({ message: 'Failed to delete notes' });
  }
};



// Update Note
export const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, videoLink } = req.body;

    const notes = await Notes.findByIdAndUpdate(
      id,
      { title, content, videoLink },
      { new: true }
    );

    if (!notes) {
      return res.status(404).json({ message: "Notes not found" });
    }

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//TODO: fix the logic of getNotes controller
// Get Notes
export const getNotes = async (req, res) => { 
  try {
    const { videoId, userId} = req.body;

    // Find the notes with the specified videoId and createdBy userId
    const notes = await Notes.findOne({ videoId, createdBy: userId });

    // If no notes are found, return a 404 response
    if (!notes) {
      return res.status(404).json({ message: 'Notes not found or you are not authorized to view these notes!' });
    }

    // Return the found notes
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Failed to fetch notes', error: error.message });
  }
};


export const getAllNotes = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
