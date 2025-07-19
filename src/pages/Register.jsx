import React, { useState, useEffect } from 'react'
import "../index.css"
import { useNavigate } from "react-router-dom";
import { supabase } from "../context/Supabase";
import { toast } from 'react-toastify';
import { useAuth } from '../context/Auth';

function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false); // Used to expand the green overlay
    const [shiftOverlay, setShiftOverlay] = useState(false); // Used to shift the overlay from left to right
    const [shiftForm, setShiftForm] = useState(false); // used to shift the form
    const [showRightImage, setShowRightImage] = useState(false);
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [state, setState] = useState("Log");

    const {SignUpNewUser, GoogleSignIn, signInUser} = useAuth();

    // Toggle Transition 
    const toggleMode = () => {
        if (!isSignUpMode) {
            // Going to Sign Up
            setShow(true);

            setTimeout(() => {
                setShiftOverlay(true);
                setShiftForm(true);
                setShowRightImage(true);
            }, 1000);

            setIsSignUpMode(true);
        } else {
            // Going back to Log In
            setShiftForm(false);
            setShiftOverlay(false);
            setShowRightImage(false);

            setTimeout(() => {
                setShow(false)
                setIsSignUpMode(false);
            }, 1000);
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data?.user) {
                navigate("/");
            }
        };
        checkUser();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result;

        try {
            {
                result = state === "Log" ? 
                await signInUser(email, password) 
                : await SignUpNewUser(email, password, name)

            }

            if(result.success){
                toast.success("Success!")
                navigate("/")
            }else{
                toast.error(result.error.message)
            }

        } catch (err) {
            toast.error(err.message)
        }
    };

    const handleGoogleSignIn = async () => {
        let result = await GoogleSignIn();

         if(result.success){
                toast.success("Success!")
                navigate("/")
            }else{
                toast.error(result.error.message)
            }
    }



    return (
        <div className='bg-[#F5F5F5] h-[calc(100vh-58px)] flex items-center justify-center px-4 overflow-hidden py-7'>
            <div className='bg-white w-full max-w-6xl h-full overflow-hidden shadow-lg'>
                <div className='flex h-full relative'>

                    {/* Green Overlay */}
                    <div className={`
                        absolute top-0 ${shiftOverlay ? 'left-1/2' : 'left-0'} h-full bg-[#A9C5BB] z-20
                        transition-all duration-1000 ease-in-out
                        ${show ? 'w-full' : 'w-1/2'} 
                    `}></div>

                    {/* left side */}
                    <div className={`h-full w-1/2 z-30 overflow-hidden`}>
                        <img src="../../login2.png" className={`w-full h-full object-cover ${show ? '-translate-x-full' : '-translate-x-0'}
                        transition-transform duration-1000 ease-in-out`} alt="login" />
                    </div>

                    {/* right side */}
                    <div className={`w-1/2 flex flex-col items-center overflow-hidden ${shiftForm ? 'z-30' : 'z-10'}
                        ${isSignUpMode ? 'absolute' : 'relative'} transition-all duration-1000 ease-in-out`}>

                        <div className='flex flex-col justify-center items-center'>
                            <h2 className='text-center my-10 font-pacifico text-3xl'> Readora </h2>
                            <h3 className='text-center mb-12 font-montserrat font-bold text-gray-500 text-lg'> Welcome to Readora </h3>

                            {/* Form Content */}
                            <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
                                {
                                    isSignUpMode && (<div className='relative h-20 leading-10 w-[350px]'>
                                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                            className='border-b w-full absolute leading-10 outline-none p-1 pt-2 mb-6 my-input z-10 bg-transparent' />
                                        <label className='absolute px-2 py-1 labelline'> Enter your Name </label>
                                    </div>)
                                }
                                <div className='relative h-20 leading-10 w-[350px]'>
                                    <input type="eamil" required value={email} onChange={(e) => setEmail(e.target.value)}
                                        className='border-b w-full absolute leading-10 outline-none p-1 pt-2 mb-6 my-input z-10 bg-transparent' />
                                    <label className='absolute px-2 py-1 labelline'> Enter your Email </label>
                                </div>
                                <div className='relative h-20 leading-10 w-[350px]'>
                                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                        className='border-b w-full absolute leading-10 outline-none p-1 pt-2 mb-6 my-input z-10 bg-transparent' />
                                    <label className='absolute px-2 py-1 labelline'> Enter your Password </label>
                                </div>

                                <button type="submit" className='block bg-gray-500  text-white px-5 py-2 rounded-full my-3 mx-auto'
                                    onClick={() => setState(state === "Log" ? "Sign" : "Log")}>
                                    {isSignUpMode ? "Sign up" : "Sign in "}
                                </button>

                            </form>
                            <div className="flex items-center w-52 gap-3 mt-4">
                                <div className="border-t-2 border-gray-500 flex-grow"></div>
                                <h2 className='text-gray-500 text-md pb-1'>or</h2>
                                <div className="border-t-2 border-gray-500 flex-grow"></div>
                            </div>

                            {
                                isSignUpMode ? (" ") : (<button className='px-5 py-2 rounded-full mx-auto my-6 flex gap-2' onClick={handleGoogleSignIn}> <img src="../../google.png" alt="google" className="w-8 h-8 pb-1" /> Sign in with Google </button>)
                            }

                            <p className='mt-4'>
                                {isSignUpMode ? "Already have an account?" : "Don't have an account?"}
                                <span
                                    className='text-indigo-500 underline cursor-pointer ml-1'
                                    onClick={toggleMode}
                                >
                                    {isSignUpMode ? "Log In" : "Create Account"}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Sliding image from right into right panel */}
                    {show && (
                        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden z-30">
                            <img
                                src="../../login2.png"
                                alt="login"
                                className={`
                                    w-full h-full object-cover transform transition-transform duration-500 delay-75 ease-in-out
                                     ${showRightImage ? 'translate-x-0' : 'translate-x-full'}
                                `}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;