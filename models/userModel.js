import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minLength: [3, "Name must be at least 3 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email address"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters"],
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
