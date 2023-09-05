import React, { useEffect, useState } from 'react'
import ComponentLoader from '../Loaders/ComponentLoader';
import NotificationShow from './NotificationShow';
import { useSelector } from 'react-redux';

function NotificationPenel() {
    const NotificationLoading = useSelector(state => state.notification.loading)
    
    return (
        <>
            <div className='w-[400px] bg-white z-50 h-[90vh] right-[-140px] absolute top-12 shadow-xl rounded-md p-5'>
                <div className='w-full h-full'>
                    <NotificationShow />
                </div>
                {NotificationLoading === true ? <ComponentLoader /> : null}
            </div>

        </>
    )
}

export default NotificationPenel