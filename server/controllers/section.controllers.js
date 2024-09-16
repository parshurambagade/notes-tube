// controllers/sectionController.js

import Section from "../models/section.model.js";

// Create Section
export const createSection = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id; // Assuming the user ID is available in the request object

    const newSection = new Section({
      name,
      createdBy: userId,
    });

    await newSection.save();
    res.status(201).json(newSection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Section
export const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const section = await Section.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Section
export const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findByIdAndDelete(id);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json({ message: "Section deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Sections
export const getSections = async (req, res) => {
  try {
    const sections = await Section.find().populate("createdBy", "name");
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
