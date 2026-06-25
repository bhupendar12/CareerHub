import express from "express";
import { reviewResume } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/review", reviewResume);

export default router;