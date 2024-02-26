import React, { useEffect, useState } from 'react'
import defaultProfilePicture from "../assets/images/defaultProfileImage.png"

const postImageSection = (props) => {

    useEffect(() => {
        console.log(props.post);
        if (props.profilePage){
            getPostImage(props.post._id);
        } else {
            getPostImage(props.post.id);
        }
    },[])

    const getPostImage = async (id) => {
        try {
            console.log("getpostimage = " + id);
          const postImageResponse = await fetch(`http://localhost:3001/postImage/${id}/postPicture`, {
              method: 'GET',
          });
          const postImage = await postImageResponse.json();
          console.log("postimage = " + postImage[0].file);
          setPostImagePath("http://localhost:3001/images/" + postImage[0].file);
        //   return "http://localhost:3001/images/" + postImage[0].file;
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
