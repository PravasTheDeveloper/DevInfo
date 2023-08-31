import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

function SpinnerLoaders() {
    return (
        <div className='w-full h-screen absolute spinerLoadingStyle top-0 left-0 z-50 flex justify-center items-center'>
            <div className='w-[120px] h-[120px] bg-white rounded-full flex justify-center items-center shadow-2xl'>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        </div>
    )
}

export default SpinnerLoaders