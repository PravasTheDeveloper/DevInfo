import React from 'react'
import { useParams } from 'react-router-dom'

function PostImageShow() {
    const userId = useParams().id
    const imageId = useParams().image
    return (
        <div className='w-full min-h-screen flex justify-center items-center bg-gray-500'>
            <img  src={`/uploads/profiles/${userId}/postUpload/${imageId}`} alt={`${imageId}`} className='rounded w-[80%] my-10' />
        </div>
    )
}

export default PostImageShow