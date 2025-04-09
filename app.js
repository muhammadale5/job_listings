import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

import jobRouter from "./routes/job.route.js";
import userRouter from "./routes/user.route.js";

// Initialize the Express app
export const app = express();

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.use(morgan("dev")); // Logs HTTP requests to the console
app.use(bodyParser.json()); // Parses incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data

app.use("/api/v1/users", userRouter);
app.use("/api/v1/job", jobRouter);

//http://localhost:3000/api/v1/users
