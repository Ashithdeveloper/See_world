import express from "express";
import {
  followUser,
  getCurrentUserId,
  getUserProfile,
  syncUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { productAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

//public routes
router.get("/profile/:username", getUserProfile);

//protected routes
router.post("/sync", productAuth, syncUser);
router.put("/update", productAuth, updateUserProfile);
router.get("/me", productAuth, getCurrentUserId);
router.post("/follow/:userId", productAuth, followUser);

export default router;
