import express from 'express';
import { ENV } from './config/env.js';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/user.route.js";


const app = express();

app.use(cors());

app.use(express.json());

app.use(clerkMiddleware({}));

app.use('/api/users',userRouter);

app.listen(ENV.PORT, () =>{
    console.log('Server is running on port 5000');
    connectDB();
})