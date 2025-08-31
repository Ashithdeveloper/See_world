import express from "express";
import { productAuth } from "../middleware/auth.middleware.js";
import {
  deleteNotification,
  getNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", productAuth, getNotifications);
router.get("/delete/:notificationId", productAuth, deleteNotification);

export default router;
