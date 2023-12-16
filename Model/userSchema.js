import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_on: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
