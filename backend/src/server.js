import express from 'express';
import { ENV } from './config/env.js';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import notificationRouter from './routes/notification.route.js';
import { arcjetMiddleware } from './middleware/arcjet.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware({}));
app.use(arcjetMiddleware);

//user main router
app.use('/api/users',userRouter);
//post main router
app.use('/api/post',postRouter);
//comment main router
app.use('/api/comment',commentRouter);
//Notification main router
app.use('/api/notification',notificationRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
})
//error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

 if (ENV.NODE_ENV === "production") {
  app.listen(ENV.PORT, () => {
    console.log("Server is running on port 5000");
    connectDB();
  });
 }


//For vercel deployment
export default app