import mongoose from "mongoose";

const profileImageSchema = mongoose.Schema(
    {
        userId:{
            type: String,
            required: true,
        },
        file:{
            type: String,
            default: "",
        }
    }, {timestamps: true}
);

const ProfileImage = mongoose.model("ProfileImage", profileImageSchema);

export default ProfileImage;