import express from "express";
import { createPost, deletePost, getAllPosts, getOnePost, getUserPosts, LikePost } from "../contellers/post.controller.js";
import { productRouter } from "../middleware/auth.middleware.js";

const router = express.Router();    

//pubile routes
router.get("/", getAllPosts);
router.get("/:postId", getOnePost);
router.get("/:username",getUserPosts);

//protected routes
router.post("/create", productRouter , createPost );
router.post('/like/:postId', productRouter, LikePost); 
router.post("/delete/:postId", productRouter, deletePost);

export default router;