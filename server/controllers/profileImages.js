import ProfileImage from "../models/profileImages.js"

// CREATE
export const createProfilePicture = async (req, res) => {
    try {
    
        const {
            file, id
        } = req.body;
        console.log(req.body);
        console.log("file = ");
        console.log(req.file);
        console.log("id = ");
        console.log(id);
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
        console.log("getting pictures id = " + userId);
    
      const profileImage = await ProfileImage.find({userId});
      res.status(200).json(profileImage);
    } catch (err){
        console.log("get picture failed");
        res.status(404).json({message: err.message});
    }
}