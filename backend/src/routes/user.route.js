import express from 'express';
import { followUser, getCurrentUserId, getUserProfile, syncUser, updateUserProfile } from '../contellers/user.controller.js';
import { productRouter } from '../middleware/auth.middleware.js';

const router = express.Router();
//public routes
router.get("/profile/:username", getUserProfile )

//protected routes
router.post("/sync", productRouter, syncUser);
router.put("/update", productRouter,updateUserProfile )
router.get("/me", productRouter, getCurrentUserId );
router.post("/follow/:userId", productRouter, followUser);

export default router;