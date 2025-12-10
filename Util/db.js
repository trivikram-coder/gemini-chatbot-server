const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const connectDb=()=>{
    mongoose.connect(process.env.URL)
    .then(console.log("MongoDb connected successfully 🚀🚀🚀"))
    .catch(err=>console.log(err))
}
module.exports=connectDb;