import mongoose, { Schema } from 'mongoose';

// Define the Section schema
const sectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Notes',
    },
  ],
}, {
  timestamps: true, 
});

// Export the Section model
export default mongoose.model('Section', sectionSchema);
