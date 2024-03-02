import React, { useState , useEffect} from 'react'
import { MdOutlineAddReaction } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from './SocketContext';

const likeSection = (props) => {

    const [postLikesToShow, setPostLikes] = useState(props.likes);

    const {postLikes, postIdWithLike} = useSocketContext();

    let user = null;
    try {
        user = useSelector((state) => state.user);
    } catch (e){
        console.log("error from redux: " + e);
    }

    const likePost = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://social-media-jok9.onrender.com/posts/${props.id}/like`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user._id}),
        });
    }

    useEffect(() => {
        if (JSON.stringify(props.id) === JSON.stringify(postIdWithLike)){
            setPostLikes(postLikes);
        }
    },[postLikes])

  return (
    <div>
        <form onSubmit={likePost}>
            <button type='submit' >
                <div className='flex items-center space-x-3'>
                    <MdOutlineAddReaction color={user === null? 'black' :  JSON.stringify(postLikesToShow).includes(user._id)? 'red' :  'black'} size={18}/>
                    <p className=''>{Object.keys(postLikesToShow).length}</p>
                </div>
            </button>
        </form>
    </div>
  )
}

export default likeSection
