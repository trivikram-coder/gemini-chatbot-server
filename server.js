const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routes=require("./Routes/routes")

const connectDb = require("./Util/db");
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json()); 
app.use("/",routes)
app.get("/",(req,res)=>{
    res.send("GEMINI AI SERVICE IS RUNNING🚀🚀🚀")
})
connectDb()

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
