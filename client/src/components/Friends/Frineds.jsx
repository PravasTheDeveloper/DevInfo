import React, { useEffect, useState } from 'react'
import FindFriends from './FindFriends'
import ComponentLoader from '../Loaders/ComponentLoader'

function Frineds() {
    const [loader, setloader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setloader(false)
        }, 3000);
    }, [])
    

    return (
        <>
            <div className='w-[400px] bg-white z-50 h-[500px] left-[-140px] absolute top-12 shadow-xl rounded-md p-5'>
                <div className='w-full h-full'>
                    <FindFriends />
                </div>
                {loader === true ? <ComponentLoader /> :null }
            </div>
            
        </>
    )
}

export default Frineds