
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config({
    path: './.env'
});



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server is runnning on port ${process.env.PORT }`);
    })
})
.catch((error)=>{
    console.log("Failed to connect to the database:",error);

})



































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