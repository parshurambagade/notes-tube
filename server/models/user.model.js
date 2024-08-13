import mongoose, {Schema} from "mongoose";
import { DEFAULT_PROFILE_PIC } from "../constants.js";

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure that emails are unique
      match: /.+\@.+\..+/, // Basic email format validation
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String, 
      default: DEFAULT_PROFILE_PIC,
    },
    sections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Notes',
      },
    ],
  }, {
    timestamps: true,
  });
  
export default mongoose.model('User', userSchema);