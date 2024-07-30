// controllers/noteController.js

import Notes from '../models/notes.model.js';

// Create Note
export const generateNotes = async (req, res) => {
  try {
    const { title, content, videoLink, sectionId } = req.body;
    const userId = req.user._id; // Assuming the user ID is available in the request object

    const newNotes = new Notes({
      title,
      content,
      createdBy: userId,
      videoLink,
      section: sectionId,
    });

    await newNotes.save();
    res.status(201).json(newNotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
      return res.status(404).json({ message: 'Notes not found' });
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
      return res.status(404).json({ message: 'Notes not found' });
    }

    res.json({ message: 'Notes deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find().populate('createdBy', 'name').populate('section', 'name');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllNotes = async (req, res) => {
    try{

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

