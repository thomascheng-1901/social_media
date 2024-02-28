import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from '../state';

const Header = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    let user = null;
    try {
        user = useSelector((state) => state.user);
    } catch (e){
        console.log("error from redux: " + e);
    }

    function logOut(){
        dispatch(
            setLogOut()
        );
        navigate("/");
    }

    return (
        <div className='w-full min-h-[50px] bg-white flex items-center'>
            <Link to="/" className='text-[#67e8f9] ml-3'>PostYourPosts</Link>
            <div className='w-full'></div>
            <ul className='flex justify-between space-x-10 mr-3 '>
                {user === null && 
                    <Link to="signup">
                        SIGNUP
                    </Link>
                }
                {user !== null && 
                    <li className='hover:text-gray-400 '>
                        <Link to={"createPost"}>
                            CREATE
                        </Link>
                    </li>
                }
                {user !== null && 
                    <li className='hover:text-gray-400 '>
                        <button onClick={logOut}>
                            LOGOUT
                        </button>
                    </li>
                }
            </ul>
        </div>
        
    )
}

export default Header
