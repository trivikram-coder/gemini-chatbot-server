const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv=require("dotenv")
dotenv.config()
const google = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = google.getGenerativeModel({ model: "gemini-2.5-flash-lite" })

const sendPrompt = async function (text) {
    try {
        const result = await model.generateContent("Keep the answer short and clear. "+text);
       
        const raw = result.response.text();

        // Remove all bold markdown formatting
        const cleaned = raw.replace(/\*\*(.*?)\*\*/g, '$1');
        return raw
    } catch (error) {
        console.error("Error fetching response from Gemini:", error);
        return "Your day limit has been exceeded please buy a tier";
    }
};
module.exports=sendPrompt