import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NavBar from '../Navbar/NavBar';
import UserAuthData, { fetchAuthData } from '../../redux/UserAuthData';
import { useDispatch } from 'react-redux';
import { AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { PiShareFat } from 'react-icons/pi';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import SpinnerLoaders from '../Loaders/SpinnerLoaders';
import CommentSection from './CommentSection';

function PostShowOne() {
    const [DataStatus, setDataStatus] = useState([])
    const [hashtags, sethashtags] = useState([])
    const [Images, setImages] = useState([])
    const dispatch = useDispatch()
    const paramId = useParams().id
    const [loader, setloader] = useState(true)
    const [CommentSectionshow, setCommentSectionshow] = useState(false)
    const [CommentData, setCommentData] = useState([])

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

    const findData = async (e) => {
        const response = await fetch('/singlepost', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                paramId
            })
        });
        const data = await response.json()
        setDataStatus(data)
        sethashtags(data.hashtags)
        setImages(data.images)
        setCommentData(data.comments)
        console.log(data)
    }

    useEffect(() => {
        findData()
        dispatch(fetchAuthData())
        setTimeout(() => {
            setloader(false)
        }, 2000);

    }, [])

    // console.log(DataStatus)
    return (
        <>
            <NavBar />
            {loader === true ? <SpinnerLoaders /> : null}
            <div className='w-full h-auto my-20'>
                <div className='w-[700px] h-auto bg-white mx-auto rounded p-5'>
                    <div className='w-full h-auto  border-b border-slate-300'>
                        <div className='w-full h-auto flex items-center mb-4'>
                            <div className='w-10 h-10 overflow-hidden rounded-full'>
                                <img src={DataStatus.profile_pic === "male.gif" || DataStatus.profile_pic === "female.gif" ? `/anonimusprofilepic/${DataStatus.profile_pic}` : `/uploads/profiles/${DataStatus.author}/profileelement/${DataStatus.profile_pic}`} className='w-full h-full' alt={`${DataStatus.profile_pic}`} />
                                <img src="" alt="" />
                            </div>
                            {/* {DataStatus.profile_pic} */}
                            <div className='ml-5'>
                                <div className='w-full font-semibold text-[16px]'>
                                    {DataStatus.userName}
                                </div>
                                <div className='text-[12px]'>
                                    {formatTime(DataStatus.createdAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pt-4 w-full h-full'>
                        <div className='w-full h-auto'>
                            <div className='w-full h-auto flex flex-wrap mt-5'>
                                {
                                    hashtags.map((data, indx) => {
                                        return <div key={indx} className='w-auto mr-2 bg-cyan-600 px-2 py-1 rounded-full text-white  mb-2' alr={`${data}`}>{data}</div>
                                    })
                                }
                            </div>
                            <div className='my-4'>
                                {DataStatus.title}
                            </div>
                            <div className={DataStatus.code === "" ? "hidden" : 'Code__Font'}>
                                <CodeMirror
                                    value={DataStatus.code}
                                    extensions={[javascript({ jsx: true })]}
                                    theme={dracula}
                                    readOnly={true}
                                    maxHeight='400px'
                                />
                            </div>
                            <div>
                                {
                                    Images.map((data, indx) => {
                                        return (
                                            <Link to={`/postImageShow/${DataStatus.author}/${data}`}>
                                                <img key={indx} src={`/uploads/profiles/${DataStatus.author}/postUpload/${data}`} alt={`${data}`} className='my-10 rounded' />
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-[40px] bg-white mt-5 flex justify-around items-center text-slate-600'>
                        <div className='text-2xl flex items-center hover:bg-slate-200 px-10 py-1 rounded duration-200 cursor-pointer'>
                            <AiOutlineLike className='mt-[-5px] mr-2' />
                            <div className='text-base font-semibold'>
                                Like
                            </div>
                        </div>
                        <div className='text-2xl flex items-center hover:bg-slate-200 px-10 py-1 rounded duration-200 cursor-pointer' onClick={() => { setCommentSectionshow(!CommentSectionshow) }}>
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
                    {/* Comment Section */}
                    {
                       <CommentSection id={DataStatus.id} comments={CommentData} />
                    }
                </div>

            </div>

        </>
    )
}

export default PostShowOne