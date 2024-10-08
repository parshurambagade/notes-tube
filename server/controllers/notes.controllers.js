// controllers/noteController.js

import Notes from "../models/notes.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { JWT_SECRET, PROMPT_FOR_NOTES_GENERATION } from "../constants.js";
import User from "../models/user.model.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import { fetchYouTubeTranscript } from "../transcript.helper.js";




// Create Note
export const generateNotes = async (req, res) => {
  try {
    const { videoId, userId } = req.body;
    if(!videoId) {
      return res.status(400).json({ error: "Video ID and transcript are required" });
    }
    if (!videoId) {
      return res.status(400).json({ error: "Video ID is required" });
    }

    if (userId) {
      const existingNotes = await Notes.findOne({ videoId, createdBy: userId });
      if (existingNotes) {
        return res.status(400).json({
          message: "Notes for this video already exist",
          notes: existingNotes,
        });
      }
    }

    // Make a request to the YouTube Data API to fetch video details
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`,
      {
        params: {
          part: "snippet",
          id: videoId,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const videoDetails = response.data.items[0];
    // const transcript = await fetchYouTubeTranscript(videoId);
    const transcript = await fetchYouTubeTranscript(videoId)
    

    // console.log("Transcript: ", transcript);
    // const combinedTranscript = transcript.reduce((acc, cur) => {
    //   return acc + cur.text + " ";
    // });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = PROMPT_FOR_NOTES_GENERATION + transcript;

    if (prompt.length > 25000) {
      res.status(400).json({ message: "Video length is too long" });
    } else {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      res.json({ content: text, videoDetails: videoDetails });
    }
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
};

export const saveNotes = async (req, res) => {
  try {
    const { title, thumbnail, content, videoId } = req.body;

    if (!title || !thumbnail || !content || !videoId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const token = req.cookies.authToken;

    const verified = jwt.verify(token, JWT_SECRET);
    const userId = verified.userId;

    if(!token){
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Check if notes with the same videoId already exist
    const existingNotes = await Notes.findOne({ videoId, createdBy: userId });

    if (existingNotes) {
      return res
        .status(400)
        .json({ message: "Notes for this video already exist", notesId: existingNotes._id });
    }

    // Now save the note with the correct sectionId
    const newNotes = new Notes({
      title,
      thumbnail,
      content,
      videoId,
      createdBy: userId,
    });

    const savedNotes = await newNotes.save();

    // Update the user's notes array to include the newly created note's ID
    await User.findByIdAndUpdate(
      userId,
      { $push: { notes: savedNotes._id } },
      { new: true } // Optionally return the updated document if needed
    );
    

    res
      .status(200)
      .json({ message: "Notes saved successfully", notes: savedNotes });
  } catch (error) {
    console.error("Error saving note:", error);
    res
      .status(500)
      .json({ message: "Error saving note", error: error.message });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const { notesId } = req.params;

    if (!notesId) {
      return res.status(400).json({ message: "Notes ID is required" });
    }

    const authToken = req.cookies.authToken;
    const verified = jwt.verify(authToken, JWT_SECRET);
    const userId = verified.userId;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const notes = await Notes.findById(notesId);

    if (!notes) {
      return res.status(404).json({ message: "Notes not found" });
    }

    if (notes.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this note." });
    }

    // Remove the note ID from the user's notes array
    await User.updateOne({ _id: userId }, { $pull: { notes: notesId } });

    // Delete the note itself
    await notes.deleteOne();

    return res.status(200).json({ message: "Notes deleted successfully." });
  } catch (error) {
    console.error("Error deleting notes:", error);
    res.status(500).json({ message: "Failed to delete notes" });
  }
};

// Update Note
export const updateNotes = async (req, res) => {
  try {
    const { notesId } = req.params;
    const { content } = req.body;

    const authToken = req.cookies.authToken;
    const verified = jwt.verify(authToken, JWT_SECRET);
    const userId = verified.userId;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!notesId) {
      return res.status(400).json({ message: "Notes ID is required" });
    }

    if (!content.length) {
      return res.status(400).json({ message: "Content is required" });
    }

    const notes = await Notes.findByIdAndUpdate(
      notesId,
      { content },
      { new: true }
    );

    if (!notes) {
      return res.status(404).json({ message: "Notes not found" });
    }

    res
      .status(200)
      .json({ message: "Notes updated successfully", notesId: notes._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const { notesId } = req.params;
    const authToken = req.cookies.authToken;
    const verified = jwt.verify(authToken, JWT_SECRET);
    const userId = verified.userId;

    if (!authToken) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!notesId) {
      return res.status(400).json({ message: "Notes ID is required" });
    }

    // Find the notes with the notesID
    const notes = await Notes.findById(req.params.notesId);

    // If no notes are found, return a 404 response
    if (!notes) {
      return res.status(404).json({
        message:
          "Notes not found or you are not authorized to view these notes!",
      });
    }

    // Return the found notes
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch notes", error: error.message });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const authToken = req.cookies.authToken;

    if (!authToken)
      return res.status(401).json({ message: "Not authenticated" });

    const verified = jwt.verify(authToken, JWT_SECRET);

    const { userId } = req.params;

    if (userId !== verified.userId)
      return res.status(401).json({ message: "Not authenticated" });

    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    const notes = await Notes.find({ createdBy: userId });

    if (!notes) return res.status(404).json({ message: "Notes not found" });

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchNotes = async (req, res) => {
  const { query } = req.query;

  const authToken = req.cookies.authToken;
  const verified = jwt.verify(authToken, JWT_SECRET);
  const userId = verified.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const results = await Notes.find({
      createdBy: userId,
      title: { $regex: query, $options: "i" }, // Case-insensitive partial match
    }).limit(5); // Limit results for autocomplete

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error fetching search results" });
  }
};
