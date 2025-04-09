import mongoose from "mongoose";

const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    role: {
      type: String,
      enum: {
        values: [ROLES.USER, ROLES.ADMIN],
        message: 'Role must be either "user" or "admin"'
      },
      required: [true, 'Role is required'],
      default: ROLES.USER
    },
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full Name is required"]
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
