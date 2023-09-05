import React from 'react'
import {Link} from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='w-full h-screen flex justify-around items-center flex-col'>
      <img src='./404ErrorPage.svg' className='h-[70%]' />
      <Link to="/" className='bg-cyan-800 py-3 px-10 text-white rounded-full' >Go To Home Page</Link>
    </div>
  )
}

export default ErrorPage