import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import profileImageRoute from "./routes/profileImages.js"
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { createProfilePicture } from "./controllers/profileImages.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
import {app, server} from "./socket/socket.js"
import exp from "constants";
import { createPostPicture } from "./controllers/postImages.js";
import postImageRoute from "./routes/postImages.js";

// configuration
const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename);
const __dirname = path.resolve();
dotenv.config();

app.use(express.json());
app.use(express.static(path.join(__dirname,"client")), express.static("public"))
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"50mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"50mb", extended: true}));
app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, "public/images")));

// file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({storage: storage});

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.post("/posts", bodyParser.json(), createPost);
app.post("/profilePicture", upload.single("file"), createProfilePicture);
app.post("/postPicture", upload.single("file"), createPostPicture);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/profileImage", profileImageRoute);
app.use("/postImage", postImageRoute);

app.get("*", (req,res) => {
    res.sendfile(path.join(__dirname,"client", "dist", "index.html"))
})

//  MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect("mongodb+srv://thomascchun1901:Abc123def0_0@cluster0.toginma.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{ 
    server.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
 
    // ADD DEMO DATA
    // User.insertMany(users); 
    // Post.insertMany(posts);
}).catch((error) => console.log(`ERROR: ${error}: did not work`));