import Post from "../models/Post.js";
import User from "../models/User.js";
import { io } from "../socket/socket.js";

// CREATE
export const createPost = async (req, res) => {
    try {
      console.log(req.body);
      const { userId, description, picturePath, user } = req.body;
      console.log("give me this 2: " + userId);
      // const user = await User.findById(userId);
      console.log("give me this 3: " + JSON.stringify(user));
      const newPost = new Post({
        userId: userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: [],
      });
      console.log("give me this 4");
      await newPost.save();
      // grab all the posts
    //   const posts = await Post.find();
      res.status(201).json(newPost);
    } catch (err) {
      console.log(err);
      res.status(409).json({ message: err.message });
    }
  };

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err){
        res.status(404).json({message: err.message})
    }
}

export const getUserPosts = async (req, res) => {
    try{
        const {userId} = req.params;
        const posts = await Post.find({userId});
        res.status(200).json(posts);
    } catch (err){
        res.status(404).json({message: err.message})
    }
}

// UPDATE
export const likePost = async (req, res) => {
    console.log("is this called");
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if (isLiked){
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true},
        );
        io.emit("leaveLike", [id, [...post.likes]]);
        res.status(200).json(updatedPost);
    } catch (err){
        res.status(404).json({message: err.message})
    }
}

export const commentPost = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId, comment} = req.body;
        const post = await Post.findById(id);
        const currentComments = post.comments;
        const length = currentComments.length;
        currentComments.push(JSON.stringify(comment).replace(/"/g, ''));
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {comments: currentComments},
            {new: true},
        );
        io.emit("leaveComment", [id, [...currentComments]]);
        res.status(200).json(updatedPost);
    } catch (err){
        console.log("err: " + err);
        res.status(404).json({message: err.message})
    }
}