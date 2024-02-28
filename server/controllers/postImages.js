import PostImage from "../models/postImages.js";

// CREATE
export const createPostPicture = async (req, res) => {
    try {
    
        const {
            file, id
        } = req.body;
      const newPostPicture = new PostImage({
        postId: id,
        file: req.file.filename
      });
      await newPostPicture.save();
      res.status(201).json(newPostPicture); 
    } catch (err) {
      console.log(err);
      res.status(409).json({ message: err.message });
    }
  };

export const getPostPicture = async (req, res) => {
    try {
        const {postId} = req.params;    
      const postImage = await PostImage.find({postId});
      res.status(200).json(postImage);
    } catch (err){
        console.log("get post picture failed");
        res.status(404).json({message: err.message});
    }
}