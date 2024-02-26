import mongoose from "mongoose";

const postImageSchema = mongoose.Schema(
    {
        postId:{
            type: String,
            required: true,
        },
        file:{
            type: String,
            default: "",
        }
    }, {timestamps: true}
);

const PostImage = mongoose.model("PostImage", postImageSchema);

export default PostImage;