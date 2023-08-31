import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from "@uiw/codemirror-theme-dracula"
import { useSelector } from 'react-redux';
import { AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { PiShareFat } from 'react-icons/pi';
import { Link } from 'react-router-dom';

function PostDataShow({ name, images, code, date, title, hashtag , id , profile_pic , author}) {
    const UserAuthData = useSelector(state => state.userauth.userData);

    function formatTime(timestamp) {
        const now = new Date();
        const uploadedTime = new Date(timestamp);
        const timeDifference = now - uploadedTime;

        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (minutes <= 60) {
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        } else if (hours <= 24) {
            return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else if (days <= 30) {
            return `${days} day${days === 1 ? '' : 's'} ago`;
        } else {
            return uploadedTime.toLocaleString(); // Show the full timestamp if more than 30 days
        }
    }
    // console.log(images)

    return (
        <>
            <div className='w-full h-auto bg-white shadow-xl rounded-md mb-10 p-5'>
                <div className='w-full h-12 flex items-center'>
                    <div className='w-10 h-10 overflow-hidden rounded-full'>
                        <img src={profile_pic === "male.gif" ||profile_pic === "female.gif" ? `./anonimusprofilepic/${profile_pic}` : `uploads/profiles/${author}/profileelement/${profile_pic}`} className='w-full h-full' alt={`${profile_pic}`} />
                    </div>
                    <div className='ml-5'>
                        <div className='w-full font-semibold text-[16px]'>
                            {name}
                        </div>
                        <div className='text-[12px]'>
                            {formatTime(date)}
                        </div>
                    </div>
                </div>
                <Link to={`/postshowing/${id}`} className='bg-black'>
                    
                    <div className='w-full h-auto flex flex-wrap mt-5'>
                        {
                            hashtag.map((data, indx) => {
                                return <div key={indx} className='w-auto mr-2 bg-cyan-600 px-2 py-1 rounded-full text-white  mb-2'>{data}</div>
                            })
                        }
                    </div>

                    <div className='my-5'>
                        {title}
                    </div>
                    <div className='w-full h-full cursor-pointer'>
                        <div className={images.length === 1 ? "w-full h-auto" : "hidden"}>
                            {
                                images.map((data, indx) => {
                                    return <img key={indx} src={`/uploads/profiles/${author}/postUpload/${images}`} alt="" />
                                })
                            }
                        </div>
                        <div className={images.length === 2 ? "w-full h-auto flex" : "hidden"}>
                            {
                                images.map((data, indx) => {
                                    return <div key={indx} className='w-full h-[200px]'>
                                        <img  src={`/uploads/profiles/${author}/postUpload/${data}`} alt="" className='mb-3 w-full p-5 h-full' />
                                    </div>
                                })
                            }
                        </div>
                        <div className={images.length === 3 ? "w-full h-auto" : "hidden"}>
                            <div className='w-full h-[200px]  overflow-hidden'>
                                <img src={`/uploads/profiles/${author}/postUpload/${images[0]}`} alt="" className='mb-3 w-full h-auto' />
                            </div>

                            <div className='flex'>
                                <img src={`/uploads/profiles/${author}/postUpload/${images[1]}`} alt="" className='w-1/2 p-5 pl-0' />
                                <img src={`/uploads/profiles/${author}/postUpload/${images[2]}`} alt="" className='w-1/2 p-5 pr-0' />
                            </div>
                        </div>
                        <div className={images.length === 4 ? "w-full h-auto" : "hidden"}>
                            <div className='w-full h-[200px]  overflow-hidden'>
                                <img src={`/uploads/profiles/${author}/postUpload/${images[0]}`} alt="" className='mb-3 w-full h-auto' />
                            </div>

                            <div className='flex'>
                                <img src={`/uploads/profiles/${author}/postUpload/${images[1]}`} alt="" className='w-1/3 p-5 pl-0' />
                                <img src={`/uploads/profiles/${author}/postUpload/${images[2]}`} alt="" className='w-1/3 py-5' />
                                <img src={`/uploads/profiles/${author}/postUpload/${images[3]}`} alt="" className='w-1/3 p-5 pr-0' />
                            </div>
                        </div>
                        <div className={images.length === 5 ? "w-full h-auto" : "hidden"}>
                            <div className='w-full h-[200px] flex'>
                                <img src={`/uploads/profiles/${author}/postUpload/${images[0]}`} alt="" className='mb-3 w-1/2 h-full p-5 pl-0 pb-0' />
                                <img src={`/uploads/profiles/${author}/postUpload/${images[1]}`} alt="" className='w-1/2 h-full p-5 pr-0 pb-0' />
                            </div>

                            <div className='flex'>
                                <img src={`/uploads/profiles/${author}/postUpload/${images[2]}`} alt="" className='w-1/3 p-5 pl-0' />
                                <img src={`/uploads/profiles/${author}/postUpload/${images[3]}`} alt="" className='w-1/3 py-5' />
                                <img src={`/uploads/profiles/${author}/postUpload/${images[4]}`} alt="" className='w-1/3 p-5 pr-0' />
                            </div>
                        </div>
                        <div className={images.length > 5 ? "w-full h-auto" : "hidden"}>
                            <div className='w-full h-[200px] flex'>
                                <img src={`/uploads/profiles/${author}/postUpload/${images[0]}`} alt="" className='mb-3 w-1/2 h-full p-5 pl-0 pb-0' />
                                <img src={`/uploads/profiles/${author}/postUpload/${images[1]}`} alt="" className='w-1/2 h-full p-5 pr-0 pb-0' />
                            </div>

                            <div className='flex h-[200px]'>
                                <img src={`/uploads/profiles/${author}/postUpload/${images[2]}`} alt="" className='w-1/3 p-5 pl-0 pb-0' />
                                <img src={`/uploads/profiles/${author}/postUpload/${images[3]}`} alt="" className='w-1/3 py-5 pr-5  pb-0' />
                                <div className='relative w-1/3 h-[180px] mt-5 overflow-hidden'>
                                    <img src={`/uploads/profiles/${author}/postUpload/${images[4]}`} alt="" className='w-full h-full' />
                                    <div className='spinerLoadingStyle w-full h-[180px] absolute top-0 left-0 text-slate-300 text-7xl flex justify-center items-center select-none'>
                                        + {images.length - 5}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={code === "" ? "hidden" : 'Code__Font'}>
                        <CodeMirror
                            value={code}
                            extensions={[javascript({ jsx: true })]}
                            theme={dracula}
                            readOnly={true}
                            maxHeight='400px'
                        />
                    </div>
                </Link>
                <div className='w-full h-[40px] bg-white mt-5 flex justify-around items-center text-slate-600'>
                    <div className='text-2xl flex items-center hover:bg-slate-200 px-10 py-1 rounded duration-200 cursor-pointer'>
                        <AiOutlineLike className='mt-[-5px] mr-2' />
                        <div className='text-base font-semibold'>
                            Like
                        </div>
                    </div>
                    <div className='text-2xl flex items-center hover:bg-slate-200 px-10 py-1 rounded duration-200 cursor-pointer'>
                        <BiCommentDetail className='mt-[2px] mr-2' />
                        <div className='text-base font-semibold'>
                            Comment
                        </div>
                    </div>
                    <div className='text-2xl flex items-center hover:bg-slate-200 px-10 py-1 rounded duration-200 cursor-pointer'>
                        <PiShareFat className='mt-[-5px] mr-2' />
                        <div className='text-base font-semibold'>
                            Share
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostDataShow