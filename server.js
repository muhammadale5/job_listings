import mongoose from "mongoose";
import dotenv from "dotenv";

import { app } from "./app.js";

// Load environment variables from .env file
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
})();

// Set the port from environment variable or default to 3000
// Start the server
const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
