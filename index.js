import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000;

app.get('/',(req,res) => {
    res.status(200).json({
        success:true,
        message:'hello'
    });
});
connectDB()

app.listen(PORT,()=>{
    console.log(`Hell on Port : ${PORT}`);
});
