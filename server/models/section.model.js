import mongoose, { Schema } from "mongoose";

// Define the Section schema
const sectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Ensures that each section must have a name
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Ensures that each section must be associated with a creator
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notes", // Reference to the Notes model
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Export the Section model
export default mongoose.model("Section", sectionSchema);
