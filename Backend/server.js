import dotenv from "dotenv";
dotenv.config(); // <-- Moved right here to line 2!

import express from "express";
import cors from "cors";
import "./jobs/reminderJob.js";

import connectDB from "./config/db.js";
// ... the rest of your code remains exactly the same

import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerHub backend is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.use(
  "/api/applications",
  applicationRoutes
);

app.get("/", (req, res) => {
  res.send("CareerHub API Running...");
});

// Error Middleware

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});