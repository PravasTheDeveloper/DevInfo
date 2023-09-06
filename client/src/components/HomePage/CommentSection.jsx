import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoSend } from 'react-icons/io5';
import { fetchData } from '../../redux/PostShowRedux';
import { Link, useParams } from 'react-router-dom';

function CommentSection({ id, comments }) {

    const link = window.location.href;

    const dispatch = useDispatch()

    const UserAuthData = useSelector(state => state.userauth.userData);
    const [CommentValue, setCommentValue] = useState("")

    const handleComment = (e) => {
        setCommentValue(e.target.value)
    }

    const handlesubmit = async () => {
        const response = await fetch("/addcomment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ CommentValue, id }),
        });

        if (response.status == 200) {
            dispatch(fetchData())
            setCommentValue("")
        }
    }

    return (
        <>
            <div className={link == "http://localhost:3000" ? 'w-full h-[200px] mt-5' : 'w-full h-auto mt-5'}>
                <div className={link == "http://localhost:3000/" ? 'w-full h-[130px] overflow-hidden' : 'w-full h-auto'}>
                    <Link to={`/postshowing/${id}`}>
                        {comments.map((data, index) => {
                            return (
                                <div key={index} className='h-auto w-[400px] flex mb-5'>
                                    <div className='w-[40px] h-[40px] bg-red-50 rounded-full mr-4 overflow-hidden'>
                                        <img src={data.profile_pic === "male.gif" || data.profile_pic === "female.gif" ? `/anonimusprofilepic/${data.profile_pic}` : `/uploads/profiles/${data.user}/profileelement/${data.profile_pic}`} className='w-full h-full' alt={`${data.profile_pic}`} />
                                    </div>
                                    <div className='h-auto flex-1 bg-slate-200 p-3 px-6 rounded-xl'>
                                        <div className='text-sm font-semibold'>
                                            {data.username}
                                        </div>
                                        <div>
                                            {data.content}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Link>
                </div>
                <div className='w-full h-[70px] relative flex items-center'>
                    <div className='w-[40px] h-[40px] bg-red-50 rounded-full mr-4 overflow-hidden'>
                        <img src={UserAuthData.profile_pic === "male.gif" || UserAuthData.profile_pic === "female.gif" ? `/anonimusprofilepic/${UserAuthData.profile_pic}` : `/uploads/profiles/${UserAuthData._id}/profileelement/${UserAuthData.profile_pic}`} className='w-full h-full' alt={`${UserAuthData.profile_pic}`} />
                    </div>
                    <div className='h-[40px] flex-1'>
                        <input className='w-full h-full bg-slate-200 rounded-full outline-none text-[14px] px-5' type="text" placeholder="Write your comment" onChange={handleComment} value={CommentValue} />
                        <div className='w-auto h-full flex items-center right-2 text-cyan-600 text-xl absolute top-0 cursor-pointer hover:text-cyan-500'>
                            <IoSend onClick={handlesubmit} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default CommentSection