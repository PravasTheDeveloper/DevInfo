import React from 'react'
import { AiFillCode } from 'react-icons/ai';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { BiVideo } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { openCodeUploadBar, openPostWindow } from '../../redux/PostWindowRedux';

function PostStatus() {
    const postWindow = useSelector(state => state.postwindow.postWindowStatus);
    const dispatch = useDispatch()
    const UserAuthData = useSelector(state => state.userauth.userData);

    return (
        <>
            <div className='w-full bg-white h-auto mt-10 rounded shadow-xl px-10 p-5 pt-8 mb-10'>
                <div className='flex'>
                    <div className='w-10 h-10 overflow-hidden rounded-full'>
                        <img src={UserAuthData.profile_pic === "male.gif" || UserAuthData.profile_pic === "female.gif" ? `/anonimusprofilepic/${UserAuthData.profile_pic}` : `uploads/profiles/${UserAuthData._id}/profileelement/${UserAuthData.profile_pic}`} className='w-full h-full' alt="" />
                    </div>
                    <div className='flex-1 h-10 ml-5'>
                        <input type="text" className='border w-full h-full rounded-full bg-slate-100 px-5 outline-none' placeholder='print("Write Your Today Work")' onClick={() => { dispatch(openPostWindow()) }} />
                    </div>
                </div>
                <div className='flex mt-10 pt-5 text-lg border-t border-slate-300'>
                    <div className='flex-1 flex py-2 rounded items-center justify-center hover:bg-slate-200 duration-100 text-slate-600 font-semibold cursor-pointer' onClick={() => { dispatch(openCodeUploadBar()); dispatch(openPostWindow()) }}><AiFillCode className='text-3xl text-sky-600 mr-2' />Put Code</div>
                    <div className='flex-1 flex py-2 rounded items-center justify-center hover:bg-slate-200 duration-100 text-slate-600 font-semibold cursor-pointer mx-5' onClick={() => { dispatch(openPostWindow()) }}><HiOutlinePhotograph className='text-3xl text-teal-500  mr-2' />Image</div>
                    <div className='flex-1 flex py-2 rounded items-center justify-center hover:bg-slate-200 duration-100 text-slate-600 font-semibold cursor-pointer' onClick={() => { dispatch(openPostWindow()) }}><BiVideo className='text-3xl text-rose-400  mr-2' />Video</div>
                </div>
            </div>
        </>
    )
}

export default PostStatus