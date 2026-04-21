const dotenv = require("dotenv");
dotenv.config();

const sendPrompt = async (text) => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: "Keep it short. " + text,
          },
        ],
      }),
    });

    const data = await res.json();

    if (data.error) {
      console.error("API Error:", data.error.message);
      return data.error.message;
    }

    return data?.choices?.[0]?.message?.content || "No response";

  } catch (err) {
    console.error(err);
    return "Server error";
  }
};

module.exports = sendPrompt;