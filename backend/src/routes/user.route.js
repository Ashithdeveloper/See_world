import express from "express";
import {
  followUser,
  getCurrentUserId,
  getUserProfile,
  syncUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { productAuth } from "../middleware/auth.middleware.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();
const product = new ClerkExpressRequireAuth();

//public routes
router.get("/profile/:username", product,getUserProfile);

//protected routes
router.post("/sync", , syncUser);
router.put("/update", productAuth, updateUserProfile);
router.get("/me", productAuth, getCurrentUserId);
router.post("/follow/:userId", productAuth, followUser);

export default router;
