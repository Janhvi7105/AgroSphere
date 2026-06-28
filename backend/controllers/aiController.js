import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const prompt = `
You are AgroSphere AI.

You are an agriculture expert.

Answer ONLY agriculture-related questions.

Reply in the SAME language used by the farmer.

Keep answers short (under 120 words).

Farmer Question:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      answer: response.text,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI Error",
    });
  }
};