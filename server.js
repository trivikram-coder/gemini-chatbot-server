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


const google = new GoogleGenerativeAI("AIzaSyC9I_shDAtWEEOIrskA8QmlIXEbl8WrL-k");
const model = google.getGenerativeModel({ model: "gemini-2.5-flash" })

const getResponse = async function (text) {
    try {
        const result = await model.generateContent(text);
        return result.response.text();
    } catch (error) {
        console.error("Error fetching response from Gemini:", error);
        return "Sorry, I encountered an error.";
    }
};


app.post("/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required!" });
    }

    const response = await getResponse(message);
    res.json({ response });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
