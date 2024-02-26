import {React, useRef, useState, useEffect} from 'react'
import {useNavigate, Navigate} from "react-router-dom"
import {duplicateUserOnSignUp} from "./constants.jsx"
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {setLogin} from "../state/index.jsx"

const SignUpPage = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const form = useRef();

    const [errorMessage, setErrorMessage] = useState("");

    const [imagePath, setImagePath] = useState("");
 
    const SignUp = async (e) => {
        // firstName, lastName, email, password, picturePath, friends, location, occupation

        e.preventDefault();
        const formData = new FormData();
        formData.append("firstName", e.target.firstName.value);
        formData.append("lastName", e.target.lastName.value);
        formData.append("email", e.target.email.value);
        formData.append("password", e.target.password.value);
        formData.append("picturePath", "");
        formData.append("friends", []);
        formData.append("location", e.target.location.value);
        formData.append("occupation", e.target.occupation.value);
        try {
            const savedUserResponse = await fetch(
                "http://localhost:3001/auth/register",
                {
                method: "POST",
                body: formData,
                }
            );
            const savedUser = await savedUserResponse.json();
            console.log("saveduser = " + JSON.stringify(savedUser));
            if (!("error" in savedUser)){
                navigate("/");
                dispatch(
                    setLogin({
                        user: savedUser
                    })
                )
            } else {
                if (savedUser["error"].includes(duplicateUserOnSignUp)){
                    setErrorMessage("Account already registered");
                }
            }

            const formData2 = new FormData();
            formData2.append("file", file);
            formData2.append("id",savedUser._id);

            console.log("upload file name = " + file.name);

            const profileImageResponse = await fetch(
                "http://localhost:3001/profilePicture",
                {
                    method: "POST",
                    // headers: { "Content-Type": 'multipart/form-data' },
                    body: formData2,
                }
            );
            const profileImage = await profileImageResponse.json();
            console.log("Upload profile picture successfully: " + Object.values(profileImage));

            // try {
            //     const profileImageResponse = await fetch(`http://localhost:3001/profileImage/${savedUser._id}/profilePicture`, {
            //         method: 'GET',
            //     });
            //     const profileImage = await profileImageResponse.json();
            //     console.log(profileImage);
            // } catch (e) {
            //     console.log("get profile picture error: " + e);
            // }

        } catch (e){
            console.log("Upload profile picture error: " + e);
        }
    }

    const [file, setfile] = useState();

    return (
        <div className='flex justify-center items-center mb-10'>
            <form ref={form} onSubmit={SignUp} action="" className='w-[80%]  mt-[5%]'>
                <div className='space-y-5 text-center'>
                    <div className='space-y-2'>
                        <h1 className='font-bold'>Name</h1>
                        <div className='space-x-2 flex '>
                            <input className='w-full placeholder:text-center' placeholder='Enter your first name' name='firstName' type="text" />
                            <input className='w-full placeholder:text-center' placeholder='Enter your last name' name='lastName' type="text" />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <h1 className='font-bold'>Email</h1>
                        <input placeholder='Enter your email' className="w-full placeholder:text-center" name='email' />
                    </div>
                    <div className='space-y-2'>
                        <h1 className='font-bold'>Password</h1>
                        <input placeholder="Enter your password" className="w-full placeholder:text-center" name='password' />
                    </div>
                    <div className='space-y-2'>
                        <h1 className='font-bold'>Location</h1>
                        <input placeholder="Enter your password" className="w-full placeholder:text-center" name='location' />
                    </div>
                    <div className='space-y-2'>
                        <h1 className='font-bold'>Occupation</h1>
                        <input placeholder="Enter your password" className="w-full placeholder:text-center" name='occupation' />
                    </div>
                    <div className='space-y-2'>
                        <p className='font-bold'>Choose an image as your profile picture</p>
                        <input type = "file" name = "file" onChange = {e => {setfile(e.target.files[0]); }}/>
                    </div>
                    <button type='submit' className='bg-white px-4 py-1 rounded-2xl hover:bg-gray-300'>
                        SIGNUP
                    </button>
                    <div className='font-bold text-xl'>
                        {errorMessage}
                    </div>
                    <div>
                        Already have an account? Go to <Link to="/login" className='underline hover:text-gray-400'>LOGIN</Link> page
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUpPage
