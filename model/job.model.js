import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },
    image: {
      type: String, // Could store URL or file path
      trim: true,
      default: null,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: [2, "Tags must be at least 2 characters long"],
        maxlength: [30, "Tags cannot exceed 30 characters"],
      },
    ],
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    pay: {
      type: Number,
      required: [true, "Pay amount is required"],
      min: [0, "Pay cannot be negative"],
      validate: {
        validator: Number.isFinite,
        message: "Pay must be a valid number",
      },
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
