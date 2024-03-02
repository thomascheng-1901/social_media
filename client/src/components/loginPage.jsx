import {React, useState, useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {setLogin} from "../state/index.jsx"
import {useNavigate, Navigate} from "react-router-dom"

const LoginPage = () => {

    const navigate = useNavigate();

    const form = useRef();

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState("");
 
    const LogIn = async (e) => {
        e.preventDefault();
        if (e.target.email.value && e.target.password.value){
            var obj = new Object();
        obj.email = e.target.email.value;
        obj.password = e.target.password.value;
        var jsonString= JSON.stringify(obj);
        const loggedInResponse = await fetch("https://social-media-jok9.onrender.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonString,
        });
        const loggedIn = await loggedInResponse.json();
        if (!("error" in loggedIn)){
            if ("msg" in loggedIn){
                setErrorMessage(loggedIn["msg"])
            } else {
                // log in successful
                navigate("/");
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token
                    })
                )
            }
        } else {
            // setErrorMessage("Something wrong has occured, please try again later");
        }
        } else {
            setErrorMessage("Please enter all info");
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <form ref={form} onSubmit={LogIn} action="" className='w-[80%] mt-[5%]'>
                <div className='space-y-5 text-center'>
                    <div className='space-y-2'>
                        <h1 className='font-bold'>Email</h1>
                        <input placeholder='Enter your email' className="w-full placeholder:text-center" name='email' />
                    </div>
                    <div className='space-y-2'>
                        <h1 className='font-bold'>Password</h1>
                        <input placeholder="Enter your password" className="w-full placeholder:text-center" name='password' />
                    </div>
                    <button type='submit' className='bg-white px-4 py-1 rounded-2xl hover:bg-gray-300'>
                        LOGIN
                    </button>
                    <div className='font-bold text-xl text-red-500'>
                        {errorMessage}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
