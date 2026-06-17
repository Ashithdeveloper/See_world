import express from 'express';
import { ENV } from './config/env.js';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import notificationRouter from './routes/notification.route.js';
import { arcjetMiddleware } from './middleware/arcjet.middleware.js';


const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);
app.use(express.json());

// Note: clerkMiddleware() is applied per-route (not globally) for Express 5 compatibility
app.use(arcjetMiddleware);

app.get("/debug", (req, res) => {
  console.log("Debug route hit!");
  res.json({ ok: true });
});
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

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${ENV.PORT || 5000}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};



startServer();
