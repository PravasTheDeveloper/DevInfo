import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineCodeSandbox, AiOutlineHome, AiOutlineBell, AiFillSetting } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Frineds from '../Friends/Frineds';
import NotificationPenel from '../Notification/NotificationPenel';

function NavBar() {

    const [profileBarToggle, setprofileBarToggle] = useState(false)
    const UserAuthData = useSelector(state => state.userauth.userData);
    const navigate = useNavigate()
    const [friendsSection, setfriendsSection] = useState(false)
    const [Notification, setNotification] = useState(false)

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                credentials: 'include', // Send cookies
            });

            if (response.status === 200) {
                // Logout successful, optionally clear local app state
                // Redirect the user to the login page
                navigate("/login")
            } else {
                // Handle logout error
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Handle error if needed
        }
    };


    return (
        <>
            <div className='h-[6vh] w-full bg-slate-700 flex items-center text-white'>
                <div className='flex justify-between container mx-auto'>
                    <Link to={"/"} className='Logo__Font flex items-center'>
                        <AiOutlineCodeSandbox className='text-4xl' /> DevInfo
                    </Link>
                    <div className='flex items-center text-2xl'>
                        <div className='flex justify-center relative group' onClick={() => { setprofileBarToggle(false) }}>
                            <Link to={"/"} className='w-10 h-10 bg-slate-500 hover:bg-slate-400 hover:text-slate-700 cursor-pointer duration-300 text-white flex justify-center items-center rounded-full'><AiOutlineHome /></Link>
                            <div className='absolute px-3 py-1 group-hover:flex justify-center hidden ease-in duration-500 items-center text-base text-slate-200 bg-zinc-600 bottom-[-50px] shadow-xl rounded z-50'>
                                Home
                            </div >
                        </div>

                        <div className='flex justify-center relative group ml-10' onClick={() => { setprofileBarToggle(false) }}>
                            <div className='w-10 h-10 bg-slate-500 hover:bg-slate-400 hover:text-slate-700 cursor-pointer duration-300 text-white flex justify-center items-center rounded-full' onClick={() => { setfriendsSection(!friendsSection) ; setNotification(false) ; setprofileBarToggle(false) }}><BsPeople /></div>
                            <div className='absolute px-3 py-1 group-hover:flex justify-center hidden ease-in duration-500 items-center text-base text-slate-200 bg-zinc-600 bottom-[-50px] shadow-xl rounded z-50'>
                                Frinds
                            </div>
                            {friendsSection === true ? <Frineds /> : null}
                        </div>

                        <div className='flex justify-center relative group ml-10' onClick={() => { setprofileBarToggle(false) }}>
                            <div className='w-10 h-10 bg-slate-500 hover:bg-slate-400 hover:text-slate-700 cursor-pointer duration-300 text-white flex justify-center items-center rounded-full' onClick={()=>{ setNotification(!Notification) ; setprofileBarToggle(false) ;setfriendsSection(false) }}><AiOutlineBell /></div>
                            <div className='absolute px-3 py-1 group-hover:flex justify-center hidden ease-in duration-500 items-center text-base text-slate-200 bg-zinc-600 bottom-[-50px] shadow-xl rounded z-50'>
                                Notification
                            </div>
                            {Notification === true ? <NotificationPenel /> : null}
                        </div>

                        <div className='flex justify-center relative ml-10'>
                            <div className='group'>
                                <div className='w-10 h-10 bg-slate-500 hover:bg-slate-400 hover:text-slate-700 cursor-pointer duration-300 text-white flex justify-center items-center rounded-full overflow-hidden' onClick={() => { setprofileBarToggle(!profileBarToggle) ; setNotification(false) ;setfriendsSection(false) }}>
                                    <img src={UserAuthData.profile_pic === "male.gif" || UserAuthData.profile_pic === "female.gif" ? `/anonimusprofilepic/${UserAuthData.profile_pic}` : `/uploads/profiles/${UserAuthData._id}/profileelement/${UserAuthData.profile_pic}`} className='w-full h-full' alt="" />
                                </div>
                                <div className='absolute px-3 py-1 group-hover:flex justify-center hidden ease-in duration-100 items-center text-base text-slate-200 bg-zinc-600 bottom-[-50px] shadow-xl rounded z-50'>
                                    Profile
                                </div>
                            </div>
                            < div className={profileBarToggle === false ? 'w-[300px] h-auto absolute bg-slate-100 top-[60px] right-0 rounded-md shadow-xl p-5 hidden' : 'w-[300px] h-auto absolute bg-slate-100 top-[60px] right-0 rounded-md shadow-xl p-5'} >
                                <div className='w-full h-[60px] bg-white hover:bg-slate-200 rounded-xl shadow-lg flex items-center px-4 cursor-pointer'>
                                    <div className='w-[40px] h-[40px] bg-slate-800 rounded-full overflow-hidden mr-5'>
                                        <img src={UserAuthData.profile_pic === "male.gif" || UserAuthData.profile_pic === "female.gif" ? `/anonimusprofilepic/${UserAuthData.profile_pic}` : `./uploads/profiles/${UserAuthData._id}/profileelement/${UserAuthData.profile_pic}`} className='w-full h-full' alt="" />
                                    </div>
                                    <div className='text-slate-600 text-base font-semibold'>
                                        {UserAuthData.name}
                                    </div>
                                </div>
                                <div className='w-full h-[60px] text-slate-600 hover:bg-slate-200 mt-5 rounded-xl flex items-center px-4 cursor-pointer'>
                                    <div className='w-[40px] h-[40px] flex justify-center items-center bg-slate-300 rounded-full overflow-hidden mr-5'>
                                        <AiFillSetting />
                                    </div>
                                    <div className='text-slate-600 text-base font-semibold'>
                                        Setting
                                    </div>
                                </div>
                                <div className='w-full h-[60px] text-slate-600 hover:bg-slate-200 rounded-xl flex items-center px-4 cursor-pointer'>
                                    <div className='w-[40px] h-[40px] flex justify-center items-center bg-slate-300 rounded-full overflow-hidden mr-5'>
                                        <HiOutlineLogout />
                                    </div>
                                    <div className='text-slate-600 text-base font-semibold' onClick={handleLogout}>
                                        Log Out
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar
