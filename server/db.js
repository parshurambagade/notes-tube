// getting-started.js
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();

export default async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected to MongoDB"));
    }catch(err){
        console.log(err);
    }
}