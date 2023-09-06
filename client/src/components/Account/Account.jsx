import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../Navbar/NavBar';
import { fetchAuthData } from '../../redux/UserAuthData';
import { AiOutlineCamera } from 'react-icons/ai';
import PostDataShow from '../HomePage/PostDataShow';
import PostWindow from '../PostWindow/PostWindow';
import { openPostWindow } from '../../redux/PostWindowRedux';
import AccountEdit from './AccountEdit';
import { Link, useParams } from 'react-router-dom';

function Account() {

  const paramId = useParams().id

  const [DataStatus, setDataStatus] = useState([])
  const [Posteddata, setPosteddata] = useState([])
  const dispatch = useDispatch();
  const [AccountEditBar, setAccountEditBar] = useState(false)
  const UserAuthData = useSelector(state => state.userauth.userData);
  const PostWindowStatus = useSelector(state => state.postwindow.postWindowStatus)

  // const findData = async (e) => {
  //   const res = await fetch("/showprofilecode", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });
  //   const data = await res.json()
  //   setDataStatus(data)
  // }

  const findData = async (e) => {
    const response = await fetch(`/userdataprofile/${paramId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    setDataStatus(data.user)
  }

  const findPostData = async (e) => {
    const response = await fetch(`/userposteddata/${paramId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    setPosteddata(data)
  }



  useEffect(() => {
    findData()
    findPostData()
  }, [])

  return (
    <>
      <NavBar />
      <div className='min-h-screen w-full container mx-auto mt-10'>
        <div className='w-auto h-auto bg-white rounded-md shadow-xl relative overflow-hidden'>

          {UserAuthData._id === DataStatus._id ?

            <Link to={"/uploadprofilepic"} className='w-[1584px] h-[396px] bg-white shadow-xl group relative'>
              <img src={DataStatus.poster_pic === "posterUpload.gif" ? "/anonimusprofilepic/posterUpload.gif" : `/uploads/profiles/${DataStatus._id}/profileelement/${DataStatus.poster_pic}`} className='w-full h-full' alt="" />
              <div className="w-full h-full profilePicHoverstyle absolute top-0 left-0 cursor-pointer group-hover:flex ease-in duration-200 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center text-[100px]">
                <AiOutlineCamera className='text-white' />
              </div>
            </Link>
            :
            <div className='w-[1584px] h-[396px] bg-white shadow-xl group relative'>
              <img src={DataStatus.poster_pic === "posterUpload.gif" ? "/anonimusprofilepic/posterUpload.gif" : `/uploads/profiles/${DataStatus._id}/profileelement/${DataStatus.poster_pic}`} className='w-full h-full' alt="" />
            </div>
          }
          {UserAuthData._id === DataStatus._id ?
            <Link to={"/uploadprofilepic"} className='w-[200px] h-[200px] z-50 rounded-full absolute bottom-0 left-10 overflow-hidden group mb-2'>
              <img src={DataStatus.profile_pic === "male.gif" ? "/anonimusprofilepic/male.gif" : DataStatus.profile_pic === "female.gif" ? "./anonimusprofilepic/female.gif" : `/uploads/profiles/${DataStatus._id}/profileelement/${DataStatus.profile_pic}`} alt="Profile" className='w-full h-full -z-50' />
              <div className="w-full h-full profilePicHoverstyle absolute  top-0 left-0 cursor-pointer group-hover:flex ease-in duration-200 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center text-[100px]">
                <AiOutlineCamera className='text-white' />
              </div>
            </Link>
            :
            <div className='w-[200px] h-[200px] z-50 rounded-full absolute bottom-0 left-10 overflow-hidden group mb-2'>
              <img src={DataStatus.profile_pic === "male.gif" ? "/anonimusprofilepic/male.gif" : DataStatus.profile_pic === "female.gif" ? "./anonimusprofilepic/female.gif" : `/uploads/profiles/${DataStatus._id}/profileelement/${DataStatus.profile_pic}`} alt="Profile" className='w-full h-full -z-50' />
            </div>
          }
          <div className='w-[70%] h-[30%] ml-[400px] mt-5 mb-10 bg-white flex '>
            <div className='w-2/3 '>
              <h1 className='text-2xl font-semibold'>{DataStatus.name}</h1>
              <p className='text-slate-500'>{DataStatus.email}</p>
              <p className='text-slate-500'>{DataStatus.profession}</p>
            </div>
            <div className='w-2/3 h-auto ml-[400px] mt-5 mb-10 flex '>
              <button className='w-auto h-10 bg-cyan-500 px-5 rounded-full text-white' onClick={() => { dispatch(openPostWindow()) }}>
                Add Post
              </button>
              <button className='w-auto h-10 bg-cyan-500 px-5 rounded-full text-white ml-5' onClick={() => { setAccountEditBar(true) }}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className='h-auto max-w-[800px] mx-auto mt-20'>
          {Posteddata.map((data, index) => {
            return <PostDataShow
              key={index}
              id={data._id}
              author={data.author}
              images={data.images}
              hashtag={data.hashtags}
              title={data.title}
              code={data.code}
              name={data.userName}
              date={data.createdAt}
              profile_pic={data.profile_pic}
              likes={data.likes}
              comments={data.comments}
            />
          })}
        </div>
      </div>
      {
        PostWindowStatus === true ? <PostWindow /> : null
      }
      {
        AccountEditBar === true ?
          <div className='h-screen w-full bg-salate-05 fixed top-0 left-0 z-50 flex justify-center items-center'>
            <div className='h-screen w-full bg-salate-05 fixed top-0 left-0 z-50 flex justify-center items-center' onClick={() => { setAccountEditBar(false) }}>

            </div>
            <AccountEdit />
          </div>
          : null
      }

    </>
  )
}

export default Account