import React, { useLayoutEffect, useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import PostImage from "../assets/images/blog1.jpg"
import CommentSection from "./commentSection.jsx"
import LikeSection from './likeSection.jsx';
import PostPersonInfo from './postPersonInfo.jsx';
import defaultProfilePicture from "../assets/images/defaultProfileImage.png"
import {setProfileToFind} from "../state/index.jsx"
import { Link, useNavigate} from 'react-router-dom';
import PostImageSection from './postImageSection.jsx';

const HomePage = () => {

    const form = useRef();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [posts, setPosts] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);

    let user = null;
    let token = null;
    try {
        user = useSelector((state) => state.user);
        token = useSelector((state) => state.token);
    } catch (e){
        console.log("error from redux: " + e);
    }

    const [profileImagePath, setProfileImagePath] = useState("");

    useLayoutEffect(() => {
        getFeedPosts();
        if (user){
          getProfileImage(user._id);
        }
        alertBox();
    }, []);

    const alertBox = () => {
      var alerted = localStorage.getItem('alerted') || '';
      if (alerted != 'yes') {
        alert("You can click on users' name to view their personal profile 😊");
        localStorage.setItem('alerted','yes');
      }
    }

    const getProfileImage = async (id) => {
      try {
        const profileImageResponse = await fetch(`http://localhost:3001/profileImage/${id}/profilePicture`, {
            method: 'GET',
        });
        const profileImage = await profileImageResponse.json();
        setProfileImagePath("http://localhost:3001/images/" + profileImage[0].file);
    } catch (e) {
        setProfileImagePath(defaultProfilePicture)
        console.log("get profile picture error: " + e);
    } 
    }

  const getFeedPosts = async () => {
    try {
      const postsResponse = await fetch('http://localhost:3001/posts', {
        method: 'GET',
      });
      const posts = await postsResponse.json();
      let result = posts.map((post) => ({
        id: post._id,
        userId: post.userId,
        firstName: post.firstName,
        lastName: post.lastName,
        location: post.location,
        picturePath: post.picturePath,
        userPicturePath: post.userPicturePath,
        likes: post.likes,
        comments: post.comments,
        __v: post.__v,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        description: post.description
      }));
      let new_obj= []
      let position = 0;
      for (var i = result.length-1; i >= 0; --i){
        new_obj[position] = result[i];
        position += 1;
      }
      setPosts(new_obj);
    } catch (e) {
      console.log('Fetch posts error: ' + e);
    }
  };


  const searchProfile = (id) => {
    if (stop.current) return console.log("stop navigate");
    dispatch(
        setProfileToFind({
            id: id
        })
    )
    navigate(`profile/${id}`)
  }

  let postPosition = 0;

  return (
    <div className=' flex justify-evenly h-screen'>
      
          {
            user !== null && 
            <div className='w-[30%] h-[30%] bg-white text-black text-center space-y-4 p-2 mt-10'>
                  <button onClick={()=>{stop.current = false; searchProfile(user._id)}}>
                    <div className=' flex space-x-2 h-[43px]'><img className='max-w-[2.5rem] min-w-[2.5rem] rounded-lg' src={profileImagePath}></img><p>{user.firstName} {user.lastName}</p></div>
                  </button>
                  <div className='flex items-center space-x-5'><FaLocationDot/><h1>{user.location}</h1></div>
                  <div className='flex items-center space-x-5'><MdWork /><h1>{user.occupation}</h1></div>
            </div>
          }
      <div className='w-[60%] space-y-5 mt-10 '>
        {
            posts.map((post) => 
               <div key={post.id} className='bg-white p-2 space-y-3'>
                <PostPersonInfo post = {post} profilePage = {false}/>
                <p className=''>{post.description}</p>
                <PostImageSection post = {post} profilePage = {false}/>
                <div className=''>
                    <LikeSection likes = {post.likes} id={post.id}></LikeSection>
                    <CommentSection comments ={post.comments} id={post.id}></CommentSection>
                </div>
                </div>
            )
        }
              <div className='h-[10px]'></div>
      </div>
    </div>
  );
};

export default HomePage;