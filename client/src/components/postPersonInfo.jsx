import React, { useLayoutEffect, useState, useRef, useEffect} from 'react';
import {setProfileToFind} from "../state/index.jsx"
import { Link, useNavigate} from 'react-router-dom';
import defaultProfilePicture from "../assets/images/defaultProfileImage.png"
import { useDispatch, useSelector } from 'react-redux';

const postPersonInfo = (props) => {

    const stop = useRef(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const getProfileImage = async (id) => {
            try {
                const profileImageResponse = await fetch(`http://localhost:3001/profileImage/${id}/profilePicture`, {
                    method: 'GET',
                });
                const profileImage = await profileImageResponse.json();
                // console.log(profileImage);
                setProfileImagePath("http://localhost:3001/images/" + profileImage[0].file);
            } catch (e) {
                setProfileImagePath(defaultProfilePicture);
                // console.log("get profile picture error: " + e);
            }
            }
            getProfileImage(props.post.userId);
    },[])

    const [profileImagePath, setProfileImagePath] = useState("");

  const navigate = useNavigate();

    const searchProfile = (id) => {
        if (stop.current) return console.log("stop navigate");
        dispatch(
            setProfileToFind({
                id: id
            })
        )
        navigate(`profile/${id}`)
      }

  return (
    <div className='flex space-x-2'>
        <img className='max-w-[2.5rem] rounded-lg' src={profileImagePath === ""? defaultProfilePicture : profileImagePath} alt="profileImage" />
        <button onClick={()=>{stop.current = false; searchProfile(props.post.userId)}}>
            <div className='flex space-x-2'>
                <h1 className=''>{props.post.firstName}</h1>
                <h1 className=''>{props.post.lastName}</h1>
            </div>
            <h2 className=' text-left text-gray-400/50 text-sm'>{props.post.createdAt.split("T")[0]}</h2>
        </button>
    </div>
  )
}

export default postPersonInfo
