import React, { useEffect, useState } from 'react'
import defaultProfilePicture from "../assets/images/defaultProfileImage.png"

const postImageSection = (props) => {

    useEffect(() => {
        if (props.profilePage){
            getPostImage(props.post._id);
        } else {
            getPostImage(props.post.id);
        }
    },[])

    const getPostImage = async (id) => {
        try {
          const postImageResponse = await fetch(`https://social-media-jok9.onrender.com/postImage/${id}/postPicture`, {
              method: 'GET',
          });
          const postImage = await postImageResponse.json();
          setPostImagePath("https://social-media-jok9.onrender.com/images/" + postImage[0].file);
        //   return "https://social-media-jok9.onrender.com/images/" + postImage[0].file;
      } catch (e) {
          console.log("get post picture error: " + e);
          setPostImagePath(defaultProfilePicture);

      } 
    }

    const [postImagePath, setPostImagePath] = useState("")

  return (
    <div>
        <img className='rounded-2xl ' src={postImagePath} alt="postImage" />
    </div>
  )
}

export default postImageSection
