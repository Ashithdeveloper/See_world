import express from 'express';
import { ENV } from './config/env.js';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(clerkMiddleware({}));

//user main router
app.use('/api/users',userRouter);
//post main router
app.use('/api/post',postRouter);



//error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});


app.listen(ENV.PORT, () =>{
    console.log('Server is running on port 5000');
    connectDB();
})