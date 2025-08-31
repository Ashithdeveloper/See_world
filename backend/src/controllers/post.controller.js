import asyncHandler from "express-async-handler";
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Notification from "../models/notification.model.js";
import imagekit from "../config/imagekit.js"

//get all posts
export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("user", "username profilePicture firstName lastName").populate({
        path: "comments",
        populate: {
            path: "user",
            select: "username profilePicture firstName lastName"
        }
    })
    res.status(200).json(posts);
})

//get one post 
export const getOnePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("user", "username profilePicture firstName lastName").populate({
        path: "comments",
        populate: {
            path: "user",
            select: "username profilePicture firstName lastName"
        }
    })
    res.status(200).json(post);
});

//getUserPosts

export const getUserPosts = asyncHandler(asyncHandler(async (req, res) => {
    const { username } = req.params;
    const userPost = await Post.find({ username }).sort({ createdAt: -1 }).populate("user", "username profilePicture firstName lastName").populate({
        path: "comments",
        populate: {
            path: "user",
            select: "username profilePicture firstName lastName"
        }
    })
}));

//create post 
export const createPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { content , fileId ,image } = req.body;
  const user = await User.findOne({ clerkId: userId });
// user verfication 
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  //post verification
   if(!content && !image){
    return res.status(400).json({ message: "Content or image is required" });
   };
   //image verification fileId
   if(image){
    if(!fileId){
      return res.status(400).json({ message: "FileId is required" });
    }
   }
//create post
  const post = await Post.create({
    user: user._id,
    content,
    imageFileId: fileId,
    image,
  });
  
  const createdPost = await Post.findById(post._id).populate(
    "user",
    "username profilePicture firstName lastName"
  )

  res.status(201).json(createdPost);

})

//Like and unLink function 
export const LikePost = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const { postId } = req.params;

    const user = await User.findOne({ clerkId: userId });
    const post = await Post.findById(postId);

    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    if(!post){
      return res.status(404).json({ message: "Post not found" });
    }
    //ckeck the like or unlike 
    const isLiked  = post.likes.includes(user._id);
    //like or unlike add on database
    if(isLiked){
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: user._id }
      })
    }else{
      await Post.findByIdAndUpdate(postId, {
        $push: { likes: user._id }
      })
    }
    //Notification send 
    if(post.user.toString() !== user._id.toString()){
      const notification = await Notification.create({
        from: user._id,
        to: post.user,
        type: "like",
        post: post._id,
      });
    }
    //save 
    await post.save();
    res.status(200).json(post);
})

//delete post 
export const deletePost = asyncHandler(async (req, res) => {
   const { postId } = req.params;
   const { userId } = getAuth(req);
   const FileId = req.body.fileId;
   //check user
   const user = await User.findOne({ clerkId: userId });
   const post = await Post.findById(postId);
  //check user
  if(!user){
    return res.status(404).json({ message: "User not found" });
  }
  //check post
  if(!post){
    return res.status(404).json({ message: "Post not found" });
  }
  if(user._id.toString() !== post.user.toString()){
    return res.status(401).json({ message: "Unauthorized" });
  }
  //delete post and image in imagekit 
  if(FileId){
    //delete image
    await imagekit.deleteFile(FileId);
  }
  //delete post database
  await Post.findByIdAndDelete(postId);
  res.status(200).json({ message: "Post deleted successfully" });
});