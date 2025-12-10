const express=require("express")
const app=express()
const sendPrompt=require("../Util/aiService")
const message=require("../Model/message")
app.use(express.json())
app.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Message is required!" });
    }

   
    const response = await sendPrompt(prompt);
     const db = new message({
        message: prompt,
        response:response,
        time: Date.now()
    });
    await db.save()
    res.json({ response });
    
});
app.get("/",async(req,res)=>{
    res.send("Ai service is running")
    
})
module.exports=app