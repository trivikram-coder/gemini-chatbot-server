const { OpenRouter } = require("@openrouter/sdk");
const dotenv = require("dotenv");

dotenv.config();

// 🔍 Debug (remove later)
console.log("API KEY:", process.env.OPENROUTER_API_KEY);

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const sendPrompt = async function (text) {
  try {
    const completion = await openRouter.chat.send({
      chatRequest: {
        model: "openai/gpt-4o-mini", // 💰 cheaper + good
        max_tokens: 300, // 🔥 avoid credit error
        messages: [
          {
            role: "user",
            content: "Keep it short. " + text,
          },
        ],
      },
    });

    // ✅ Handle API error safely
    if (completion.error) {
      console.error("API Error:", completion.error.message);
      return completion.error.message;
    }

    // ✅ Safe response access
    const raw = completion?.choices?.[0]?.message?.content || "No response";

    return raw.replace(/\*\*(.*?)\*\*/g, "$1");

  } catch (error) {
    console.error("Error:", error);
    return "Something went wrong.";
  }
};

module.exports = sendPrompt;