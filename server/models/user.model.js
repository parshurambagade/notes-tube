import mongoose, {Schema} from "mongoose";
import { DEFAULT_PROFILE_PIC } from "../constants";

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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