import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true   
}))



app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static('public'));
app.use(cookieParser());




// routes import

import userRouter from './routes/user.routes.js';

// routes declaration
app.use('users', userRouter);









export default app;



