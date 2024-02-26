import express from "express";
import { createProfilePicture, getProfilePicture } from "../controllers/profileImages.js";
import { createPostPicture, getPostPicture } from "../controllers/postImages.js";

const router = express.Router();

router.post("/createPostPicture", createPostPicture);
// router.get("/:userId/profilepicture", getProfilePicture);
router.get("/:postId/postpicture", getPostPicture);

export default router;