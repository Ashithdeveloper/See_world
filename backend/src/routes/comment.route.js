import express from "express";
import { createComment, deleteComment, getComments } from "../contellers/comment.controller.js";
import { productAuth } from "../middleware/auth.middleware.js";

const router = express.Router();


//pubile routes
router.get("/post/:postId",getComments);

//protected routes
router.post("/:postId",productAuth, createComment);
router.post("/delete/:commentId",productAuth, deleteComment);


export default router;