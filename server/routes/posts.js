import express from "express";
import {getFeedPosts, getUserPosts, likePost, commentPost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router =express.Router();

// READ
// router.get("/", verifyToken, getFeedPosts);
router.get("/", getFeedPosts);
// router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:userId/posts", getUserPosts);

// UPDATE
// router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/like", likePost);
router.patch("/:id/comment", commentPost);

export default router