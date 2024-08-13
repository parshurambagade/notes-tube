// controllers/noteController.js

import Notes from "../models/notes.model.js";
import { YoutubeTranscript } from "youtube-transcript";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPT_FOR_NOTES_GENERATION } from "../constants.js";
import User from '../models/user.model.js';
import Section from '../models/section.model.js';

// Create Note
export const generateNotes = async (req, res) => {
  try {
    const { videoId } = req.body;

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
    res.json({ content: text });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const saveNotes = async (req,res) => {
  try{
    const { title, thumbnail, content, videoId, createdBy, section } = req.body;

    const notes = new Notes({
      title,
      thumbnail,
      content,
      videoId,
      createdBy,
      section
    });

    // Save the note
    const newNotes = await notes.save();

    // Update the user's notes array
    await User.findByIdAndUpdate(
      createdBy,
      { $push: { notes: newNotes._id } }, // Push the new note's ID into the user's notes array
      { new: true } // Return the updated user document
    );

     // Update the section' notes array
     await Section.findByIdAndUpdate(
      section,
      { $push: { notes: newNotes._id } }, // Push the new note's ID into the user's notes array
      { new: true } // Return the updated user document
    );


    // Respond with the new note
    res.status(201).json({newNotes, message:"Notes saved successfully"});

  }catch(err){
    res.status(500).json({ message: err.message });
  }
}

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

// Delete Notes
export const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const notes = await Notes.findByIdAndDelete(id);
    if (!notes) {
      return res.status(404).json({ message: "Notes not found" });
    }

    res.json({ message: "Notes deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find()
      .populate("createdBy", "name")
      .populate("section", "name");
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllNotes = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
