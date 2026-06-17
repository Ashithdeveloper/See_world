import User from "../models/user.model.js";
import asyncHandler from "express-async-handler"
import { createClerkClient } from "@clerk/express";
import Notification from "../models/notification.model.js";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});
console.log("process.env.CLERK_SECRET_KEY", process.env.CLERK_SECRET_KEY);
console.log("process.env.CLERK_PUBLISHABLE_KEY", process.env.CLERK_PUBLISHABLE_KEY);

// get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
})


//update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.auth;

  const user = await User.findOneAndUpdate({ clerkId: userId }, req.body, { new: true });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
})


//syncUser on database
export const syncUser = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  console.log("user Id ", userId);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // check if user already exists
  const existingUser = await User.findOne({ clerkId: userId });
  if (existingUser) {
    return res.status(200).json({
      user: existingUser,
      message: "User already synced"
    });
  }

  // fetch user from Clerk
  const clerkUser = await clerkClient.users.getUser(userId);

  const userData = {
    clerkId: userId,
    email: clerkUser.emailAddresses[0].emailAddress,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
    profilePicture: clerkUser.imageUrl || "",
  };

  const user = await User.create(userData);

  return res.status(201).json({
    user,
    message: "User created successfully",
  });
});

//get current user id 
export const getCurrentUserId = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  console.log("user Id ", userId);
  const user = await User.findOne({ clerkId: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
})
//follow and unfollow
export const followUser = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  const { targetUserId } = req.params;

  if (userId === targetUserId)
    return res.status(400).json({ error: "You cannot follow yourself" });

  const currentUser = await User.findOne({ clerkId: userId });
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser)
    return res.status(404).json({ error: "User not found" });

  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    // unfollow
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { following: targetUserId },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: currentUser._id },
    });
  } else {
    // follow
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { following: targetUserId },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $push: { followers: currentUser._id },
    });

    //send notification
    await Notification.create({
      from: currentUser._id,
      to: targetUserId,
      type: "follow",
    });
  }

  res.status(200).json({
    message: isFollowing
      ? "User unfollowed successfully"
      : "User followed successfully",
  });
});