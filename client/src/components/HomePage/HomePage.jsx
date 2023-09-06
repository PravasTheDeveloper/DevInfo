import React, { useEffect, useState } from 'react'
import NavBar from '../Navbar/NavBar'
import { useNavigate } from 'react-router-dom';
import Loader from '../LoadingScreen';
import PostStatus from './PostStatus';
import PostWindow from '../PostWindow/PostWindow';
import { useDispatch, useSelector } from 'react-redux';
import PostDataShow from './PostDataShow';
import { fetchAuthData } from '../../redux/UserAuthData';
import { fetchData } from '../../redux/PostShowRedux';


function HomePage() {

  const navigate = useNavigate()
  const [loader, setloader] = useState(true)
  // const [DataStatus, setDataStatus] = useState([])
  // const [postWindowStatus, setpostWindowStatus] = useState(true)
  const postWindow = useSelector(state => state.postwindow.postWindowStatus);
  const UserAuthData = useSelector(state => state.userauth.userData);
  const feedData = useSelector(state => state.postdata.data);

  const dispatch = useDispatch()

  const PostData = async (e) => {
    // e.preventDefault();
    setloader(true)
    const res = await fetch("/about", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.status != 200) {
      navigate("/login")
    } else {
      setTimeout(() => {
        setloader(false)
      }, 1 * 1000);
    }
  }

  // const findData = async (e) => {
  //   const res = await fetch("/feed", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });
  //   const data = await res.json()
  //   setDataStatus(data)
  // }

  useEffect(() => {
    PostData()
    dispatch(fetchData())
    // findData()
  }, [])

  return (
    <>
      {loader == true ? <Loader /> :
        <>
          <NavBar />
          <div className='flex flex-col justify-center items-center w-[700px] h-auto container mx-auto '>
            <PostStatus />
            {feedData.map((data, index) => {
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
          {
            postWindow === true ? <PostWindow /> : null
          }

        </>}
    </>
  )
}

export default HomePage