import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { markNotificationAsRead } from '../../redux/NotificationRedux';

function NotificationShow() {
    const dispatch = useDispatch();
    const NotificationData = useSelector(state => state.notification.data)

    const handleNotificationClick = (notification) => {
        if (notification.read === false) {
            dispatch(markNotificationAsRead(notification._id));
        }
    };

    return (
        <>
            <div className='text-black text-base'>
                <h1 className='text-xl'>Notificatiion</h1>
                {
                    NotificationData.map((data, index) => {
                        return (
                            <div key={index} onClick={()=>handleNotificationClick(data)} className={data.read === false ? 'bg-slate-200 hover:bg-slate-300 duration-200 cursor-pointer w-full h-auto py-4 border-b border-slate-400 flex flex-col justify-center px-10 mb-2' : 'bg-white text-slate-400 hover:bg-slate-300 duration-200 cursor-pointer w-full h-auto py-4 border-b border-slate-400 flex flex-col justify-center px-10 mb-2'} >
                                <div className='text-lg font-semibold' >
                                    {data.type}
                                </div>
                                <div className=''>
                                    {data.content}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default NotificationShow