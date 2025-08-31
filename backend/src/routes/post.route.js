import express from "express";
import { createPost, deletePost, getAllPosts, getOnePost, getUserPosts, LikePost } from "../contellers/post.controller.js";
import { productAuth } from "../middleware/auth.middleware.js";


const router = express.Router();    

//pubile routes
router.get("/", getAllPosts);
router.get("/:postId", getOnePost);
router.get("/:username",getUserPosts);

//protected routes
router.post("/create", productAuth , createPost );
router.post('/like/:postId', productAuth, LikePost); 
router.post("/delete/:postId", productAuth, deletePost);

export default router;