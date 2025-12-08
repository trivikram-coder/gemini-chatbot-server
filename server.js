const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const message = require("./Model/message");
const mongoose = require("mongoose");
dotenv.config();

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json()); 

mongoose.connect(process.env.URL)
.then(()=>console.log("Mongodb connected succesfully"))
.catch(error=>console.log(error))
const google = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = google.getGenerativeModel({ model: "gemini-2.5-flash-lite" })

const getResponse = async function (text) {
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


app.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Message is required!" });
    }

   
    const response = await getResponse(prompt);
     const db = new message({
        message: prompt,
        response:response,
        time: Date.now()
    });
    await db.save()
    res.json({ response });
    
});
app.get("/",(req,res)=>{
    res.send("Ai service is running")
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
