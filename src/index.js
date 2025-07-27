import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import connectDB from "./db";







connectDB();


































/*

import expreess from "express";

const app = expreess();


(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERRR",error)
            throw error;

        })
        app.listen(process.env.PORT,()=>{
            console.log(`Serving on port${process.env.PORt}`);

        })

        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error: ",error)
        
    }

})()
*/