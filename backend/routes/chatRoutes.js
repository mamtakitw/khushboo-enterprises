const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const Groq = require("groq-sdk");
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a helpful shopping assistant for Khushboo Enterprises, an e-commerce store. Help users find products, answer questions about orders, shipping, returns, and provide friendly shopping guidance. Keep responses short and helpful.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 300,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error("Groq Error:", error.message);
    res.status(500).json({ error: "AI service failed. Try again." });
  }
});

module.exports = router;