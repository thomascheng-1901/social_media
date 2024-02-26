import ProfileImage from "../models/profileImages.js"

// CREATE
export const createProfilePicture = async (req, res) => {
    try {
    
        const {
            file, id
        } = req.body;
      const newProfilePicture = new ProfileImage({
        userId: id,
        file: req.file.filename
      });
      await newProfilePicture.save();
      res.status(201).json({message: "successful"});
    } catch (err) {
      console.log(err);
      res.status(409).json({ message: err.message });
    }
  };

export const getProfilePicture = async (req, res) => {
    try {
        const {userId} = req.params;    
      const profileImage = await ProfileImage.find({userId});
      res.status(200).json(profileImage);
    } catch (err){
        console.log("get picture failed");
        res.status(404).json({message: err.message});
    }
}