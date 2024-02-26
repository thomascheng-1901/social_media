import React, {useRef, useState, useEffect}  from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from './SocketContext';

const commentSection = (props) => {

    const [commentsToShow, setCommentsToShow] = useState(props.comments);
    // console.log("commentsToShow= = " + commentsToShow);

    const {comments, postIdWithComment} = useSocketContext();
    // console.log("comments???: " + comments);
    // console.log("postId???: " + postIdWithComment);

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        if (JSON.stringify(props.id) === JSON.stringify(postIdWithComment)){
            setCommentsToShow(comments);
        }
        // const interval = setInterval(() => {
        //     if (comments !== null){
        //         console.log("fking comments: " + comments);
        //     }
        //     // if (postIdWithComment !== null) 
        // if (JSON.stringify(props.id) === JSON.stringify(postIdWithComment)){
        //     setCommentsToShow(comments);
        //     console.log("setCommentsToShow: " + comments);
        // }
        // }, 1000);

        // return () => {clearInterval(interval), console.log("clearn timer");};
    }, [comments]);

    let user = null;
    try {
        user = useSelector((state) => state.user);
    } catch (e){
        console.log("error from redux: " + e);
    }

    const [showComments, setShowComments] = useState(false);

    function toggle(){
        if (props.comments.length > 0)
        setShowComments(!showComments);
    }

    const [comment, setComments] = useState("");

    const handleTextArea = (e) => {
        const commentTextAreaValue = e.target.value;
        // console.log("handling: " + commentTextAreaValue);
        setComments(commentTextAreaValue);
      };

    let position = 0;

    const form = useRef();

    const leaveComment = async (e) => {
        e.preventDefault();
        console.log("leave comment at " + postIdWithComment);
        const response = await fetch(`http://localhost:3001/posts/${props.id}/comment`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user._id, comment: e.target.commentTextArea.value}),
        });
            e.target.commentTextArea.value = "";
        
        // window.location.reload();
    }

    return (
        <div className='w-full'>
            {!showComments  && <button onClick={toggle}>Comments: ({commentsToShow.length})</button>}
            {showComments  && <button onClick={toggle}><div className='text-left'><p>Comments: ({commentsToShow.length})</p>{commentsToShow.length > 0 && commentsToShow.map((c) => {position += 1; return <p key={c} className={position % 2 === 0?'text-black':'text-gray-400'}>{c}</p>})}</div></button>}
            {user !== null && <form ref={form} onSubmit={leaveComment}><textarea className='bg-gray-400/50 resize-none w-full mt-3' onChange={handleTextArea} name='commentTextArea' placeholder='Leave a comment'></textarea>{comment !== "" && <div className='text-center'><button type='submit' className='bg-gray-400/50 rounded-2xl px-3 py-1'>COMMENT</button></div> }</form>}
        </div>
    )
}

export default commentSection
