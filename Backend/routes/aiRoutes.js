import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Groq from "groq-sdk";
import multer from "multer";
import * as pdfParse from "pdf-parse";

const router = express.Router();
const upload = multer();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post(
  "/resume-review",
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please upload a resume PDF",
        });
      }

      // PDF -> Text

      const data = await pdfParse.default(req.file.buffer);
      const resumeText = data.text;

      const prompt = `
Analyze this resume and provide:

1. Strengths
2. Weaknesses
3. Missing Skills
4. Improvement Suggestions
5. ATS Score out of 100

Resume:

${resumeText}
`;

      const response =
        await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.5,
        });

      const review =
        response.choices[0].message.content;

      res.json({
        review,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Failed to analyze resume",
      });
    }
  }
);

export default router;

