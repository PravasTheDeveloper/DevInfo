import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../LoadingScreen';
import { AiOutlineUserSwitch, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const navigate = useNavigate()
    const [loader, setloader] = useState(false)
    const [showPassword, setshowPassword] = useState(true)
    const [selectedGender, setSelectedGender] = useState("");

    const [userData, setuserData] = useState({
        name: "", email: "", phone: "", profession: "", password: "", cpassword: "", gender: ""
    })

    let name, value;

    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;

        if (name === "gender") {
            setSelectedGender(value);
        } else {
            setuserData({ ...userData, [name]: value });
        }
    }


    const PostData = async (e) => {
        // e.preventDefault();
        const { name, email, phone, profession, password, cpassword } = userData;

        if (!name || !email || !phone || !profession || !password || !cpassword) {
            toast.error('Please Fill All The Feild', {
                position: "top-right",
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            if (password !== cpassword) {
                toast.error('Password And Confirm Password Must be Same', {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                const res = await fetch("/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name, email, phone, profession, password, cpassword, gender: selectedGender
                    })
                });

                const data = await res.json();

                console.log(res.status);
                if (res.status === 422) {
                    toast.warn('Email is already exists', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (res.status === 200) {
                    Swal.fire(
                        'Registration Successful',
                        'Redirecting to Login Page',
                        'success'
                    )
                    navigate("/uploadprofilepic");
                } else {
                    Swal.fire(
                        'Something went Wrong',
                        'Try Again',
                        'error'
                    )
                }
            }
        }

    }

    console.log(selectedGender)

    return (
        <>
            {loader == true ? <Loader /> :
                <div className='w-full 2xl:h-screen h-auto SignUp__Page__Styling flex justify-center items-center select-none'>
                    <div className='bg-white w-[500px] p-14 rounded box__Shadow__Card my-20 2xl:my-0'>
                        <div className='flex justify-center text-5xl'>
                            <div className='bg-slate-700 w-16 h-16 flex justify-center items-center rounded-full text-white'>
                                <AiOutlineUserSwitch />
                            </div>
                        </div>
                        <div className='text-4xl text-slate-700 my-10 text-center'>
                            SIGN UP
                        </div>
                        <div className='w-full mb-5'>
                            <div className='text-sm text-slate-500 ml-5'>
                                Name:
                            </div>
                            <input type="text" name='name' value={userData.name} onChange={handleInput} className='border border-slate-400 w-full h-10 rounded-full outline-none px-4' placeholder='Pravas Chandra' autoComplete='off' />
                        </div>
                        <div className='w-full mb-5'>
                            <div className='text-sm text-slate-500 ml-5'>
                                Email:
                            </div>
                            <input type="text" name='email' value={userData.email} onChange={handleInput} className='border border-slate-400 w-full h-10 rounded-full outline-none px-4' placeholder='example@gmail.com' autoComplete='off' />
                        </div>
                        <div className='w-full mb-5'>
                            <div className='text-sm text-slate-500 ml-5'>
                                Phone:
                            </div>
                            <input type="text" name='phone' value={userData.phone} onChange={handleInput} className='border border-slate-400 w-full h-10 rounded-full outline-none px-4' placeholder='01XXXXXXXXX' autoComplete='off' />
                        </div>
                        <div className='w-full mb-5'>
                            <div className='text-sm text-slate-500 ml-5'>
                                Profession:
                            </div>
                            <input type="text" name='profession' value={userData.profession} onChange={handleInput} className='border border-slate-400 w-full h-10 rounded-full outline-none px-4' placeholder='Software Engineer' autoComplete='off' />
                        </div>
                        <div className='w-full mb-5 flex'>
                            <div className='text-base text-slate-500 ml-5'>
                                Gender:
                            </div>
                            <label className='ml-4'>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={selectedGender === "male"}
                                    onChange={() => setSelectedGender("male")}
                                />
                                Male
                            </label>
                            <label className='ml-4'>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={selectedGender === "female"}
                                    onChange={() => setSelectedGender("female")}
                                />
                                Female
                            </label>
                            <label className='ml-4'>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={selectedGender === "other"}
                                    onChange={() => setSelectedGender("other")}
                                />
                                Other
                            </label>
                        </div>

                        <div className='w-full mb-5'>
                            <div className='text-sm text-slate-500 ml-5'>
                                Password:
                            </div>
                            <div className='w-full relative'>
                                <input type={showPassword === true ? "password" : "text"} name='password' value={userData.password} onChange={handleInput} className='border border-slate-400  w-full h-10 rounded-full outline-none p-4' placeholder='********' autoComplete='off' />
                                <div className='h-full text-2xl cursor-pointer absolute top-0 right-3 flex items-center'>
                                    {showPassword === true ? <AiOutlineEye onClick={() => { setshowPassword(!showPassword) }} /> : <AiOutlineEyeInvisible onClick={() => { setshowPassword(!showPassword) }} />}
                                </div>
                            </div>
                        </div>
                        <div className='w-full mb-10'>
                            <div className='text-sm text-slate-500 ml-5'>
                                Confirm Password:
                            </div>
                            <div className='w-full relative'>
                                <input type={showPassword === true ? "password" : "text"} name='cpassword' value={userData.cpassword} onChange={handleInput} className='border border-slate-400  w-full h-10 rounded-full outline-none p-4' placeholder='********' autoComplete='off' />
                                <div className='h-full text-2xl cursor-pointer absolute top-0 right-3 flex items-center'>
                                    {showPassword === true ? <AiOutlineEye onClick={() => { setshowPassword(!showPassword) }} /> : <AiOutlineEyeInvisible onClick={() => { setshowPassword(!showPassword) }} />}
                                </div>
                            </div>
                        </div>
                        <div className='w-full select-none'>
                            <button onClick={() => { PostData() }} className='bg-slate-600 w-full text-white h-10 rounded-full'>Sign Up</button>
                        </div>
                        <div className='flex justify-center mt-5 '>
                            Already Have an account ? <Link className='text-cyan-500 underline' to={"/login"}>Log In Now</Link>
                        </div>
                    </div>
                </div>}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default SignUp