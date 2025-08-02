import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json()); 


const google = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = google.getGenerativeModel({ model: "gemini-2.5-flash" })

const getResponse = async function (text) {
    try {
        const result = await model.generateContent("Keep the answer short and clear. "+text);
       
        const raw = result.response.text();

        // Remove all bold markdown formatting
        const cleaned = raw.replace(/\*\*(.*?)\*\*/g, '$1');
        return raw
    } catch (error) {
        console.error("Error fetching response from Gemini:", error);
        return "Sorry, I encountered an error.";
    }
};


app.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Message is required!" });
    }

    const response = await getResponse(prompt);
    res.json({ response });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
