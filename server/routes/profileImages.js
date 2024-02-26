import express from "express";
import {login} from "../controllers/auth.js";
import { createProfilePicture, getProfilePicture } from "../controllers/profileImages.js";

const router = express.Router();

router.post("/createProfilePicture", createProfilePicture);
// router.get("/:userId/profilepicture", getProfilePicture);
router.get("/:userId/profilepicture", getProfilePicture);

export default router;