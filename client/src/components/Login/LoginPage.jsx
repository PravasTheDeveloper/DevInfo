import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../LoadingScreen';
import { AiOutlineUserAdd, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';

function LoginPage() {
    const navigate = useNavigate()
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loader, setloader] = useState(true)
    const [showPassword, setshowPassword] = useState(true)

    const loginUser = async (e) => {
        // e.preventDefault();

        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            }),
            credentials: "include"

        })

        const data = res.status;

        if (data === 400 || !data) {
            Swal.fire(
                'Invalid Incradintial',
                'Please Try Again',
                'error')
        } else {
            Swal.fire(
                'Login Successful',
                'Redirecting to Home Page',
                'success')
                setTimeout(() => {
                    navigate("/");
                } , 1000)
            
        }
    }

    const PostData = async (e) => {
        // e.preventDefault();

        const res = await fetch("/about", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json()
        // console.log(res.status)
        if (res.status === 200) {
            setTimeout(() => {
                setloader(false)
                navigate("/")
            }, 1 * 1000);
        } else {
            setTimeout(() => {
                setloader(false)
            }, 1 * 1000);
        }
    }
    useEffect(() => {
        PostData()
    }, [])
    return (
        <>
            {loader == true ? <Loader /> :
                <div className='w-full h-screen Login__Page__Styling flex justify-center items-center select-none'>
                    <div className='bg-white w-[400px] p-14 rounded box__Shadow__Card'>
                        <div className='flex justify-center text-5xl'>
                            <div className='bg-slate-700 w-16 h-16 flex justify-center items-center rounded-full text-white'>
                                <AiOutlineUserAdd />
                            </div>
                        </div>
                        <div className='text-4xl text-slate-700 my-10 text-center'>
                            LOG IN
                        </div>
                        <div className='w-full mb-5'>
                            <div className='text-sm text-slate-500 ml-5'>
                                Email:
                            </div>
                            <input type="text" name='email' value={email} onChange={(e) => { setemail(e.target.value) }} className='border border-slate-400 w-full h-10 rounded-full outline-none px-4' placeholder='example@gmail.com' autoComplete='off' />
                        </div>
                        <div className='w-full mb-10'>
                            <div className='text-sm text-slate-500 ml-5'>
                                Password:
                            </div>
                            <div className='w-full relative'>
                                <input type={showPassword === true ? "password" : "text"} name='password' value={password} onChange={(e) => { setpassword(e.target.value) }} className='border border-slate-400  w-full h-10 rounded-full outline-none p-4' placeholder='********' autoComplete='off' />
                                <div className='h-full text-2xl cursor-pointer absolute top-0 right-3 flex items-center'>
                                    {showPassword === true ? <AiOutlineEye onClick={() => { setshowPassword(!showPassword) }} /> : <AiOutlineEyeInvisible onClick={() => { setshowPassword(!showPassword) }} />}
                                </div>
                            </div>

                        </div>
                        <div className='w-full select-none'>
                            <button onClick={() => { loginUser() }} className='bg-slate-600 w-full text-white h-10 rounded-full'>Sign In</button>
                        </div>
                        <div className='flex justify-center mt-5 '>
                            <Link className='text-cyan-500 underline' to={"/login"}>Forget Password</Link>
                        </div>
                        <div className='flex justify-center mt-5 '>
                            Already Have an account ? <Link className='text-cyan-500 underline' to={"/signup"}>Sign Up Now</Link>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default LoginPage