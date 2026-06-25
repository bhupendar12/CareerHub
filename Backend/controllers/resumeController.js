import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const reviewResume = async (req, res) => {

  try {

    const { resumeText } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: `
Analyze this resume and provide:

1. Strengths
2. Weaknesses
3. Missing Skills
4. Improvement Suggestions
5. ATS Score out of 100

Resume:

${resumeText}
          `,
        },
      ],
    });

    res.json({
      review:
        completion.choices[0].message.content,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};