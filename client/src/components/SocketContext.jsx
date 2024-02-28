import { createContext, useContext, useEffect, useState } from "react";
import {useSelector} from "react-redux"
import io from "socket.io-client"

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers]  = useState([]);
    const [comments, setComments] = useState(null);
    const [postIdWithComment, setPostIdWithComment] = useState(null);
    const [postLikes, setPostLikes] = useState(null);
    const [postIdWithLike, setPostIdWithLike] = useState(null);

    let currentUser = null;
    try {
        currentUser = useSelector((state) => state.user);
    } catch (e) {
        console.log("get current user error: " + e);
    }

    useEffect(() => {
        let socket;
        try {
            socket = io("http://localhost:3001",
            { transports : ['websocket'] },{
                query: {userId: currentUser._id}
            })
        } catch (e){
            socket = io("http://localhost:3001",
            { transports : ['websocket'] }
            // ,{query: {userId: currentUser._id}
            // }
            )
        }

        setSocket(socket);

        socket.on("leaveComment", (currentComments) => {
            setPostIdWithComment(currentComments[0]);
            setComments(currentComments[1]);
        })

        socket.on("leaveLike", (currentLikes) => {
            setPostIdWithLike(currentLikes[0]);
            setPostLikes(currentLikes[1]);
        })

        // return () => socket.close();
    },[])

    return (<SocketContext.Provider value={{socket, onlineUsers, comments, postIdWithComment, postLikes, postIdWithLike}}>
        {children}
        </SocketContext.Provider>)
}