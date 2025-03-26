import express from 'express';
import jwt from 'jsonwebtoken';

const app=express();
const data=
    {
        username:"Alla Vikram",
        email:"allatrivikram@gmail.com"
    }

const token=jwt.sign(data,"secretkey",{expiresIn:"1h"})
console.log(token)
jwt.verify(token,"secretkey",(err,decode)=>{
    if(err){
        console.log(err.message)
    }
    else{
        console.log(decode)
    }
})
app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000")
})