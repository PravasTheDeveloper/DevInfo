import React, { useEffect, useRef, useState } from 'react'
import { AiFillCode, AiOutlineCamera } from 'react-icons/ai';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { BiVideo } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux';
import { closeCodeUploadBar, closePostWindow, openCodeUploadBar, openPostWindow, opencloseCodeUploadBar } from '../../redux/PostWindowRedux';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from "@uiw/codemirror-theme-dracula"
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"
import { ToastContainer, toast } from "react-toastify"

function PostWindow() {
    const [code, setcode] = useState('')
    const [title, settitle] = useState('')
    const [wordCound, setwordCound] = useState(0)
    const [hashtags, setHashtags] = useState();
    const [allhastags, setallhastags] = useState([])
    const [nonHashtagsText, setNonHashtagsText] = useState('');
    const dispatch = useDispatch()
    const codeuploadstatus = useSelector(state => state.postwindow.codeUploadStatus);
    const [ImageUploadStatus, setImageUploadStatus] = useState(false)
    const navigate = useNavigate()
    const UserAuthData = useSelector(state => state.userauth.userData)
    const [selectedImages, setSelectedImages] = useState([]);
    const [ImageToUpload, setImageToUpload] = useState([]);
    const ImageRef = useRef(null)
    const [ImageDeletebutton, setImageDeletebutton] = useState(false)

    const onChange = React.useCallback((value, viewUpdate) => {
        setcode(value);
    }, []);

    const handleRefClick = () => {
        ImageRef.current.click()
    }

    const countWords = (inputText) => {
        const words = inputText.trim().split(/\s+/);
        return words.filter(word => word !== '').length;
    }

    const handleImageChange = async (event) => {
        const files = event.target.files;
        setSelectedImages([...selectedImages, ...files]);
        setImageToUpload([...ImageToUpload, ...files]);
        setImageUploadStatus(false)
        setImageDeletebutton(true)
    };

    const handleRemoveImage = (index) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };

    const handleTextChange = event => {
        const newText = event.target.value;

        setwordCound(countWords(newText));

        const newHashtags = newText.match(/#\w+/g);
        setHashtags(newHashtags);

        if (newText.match(/#\w+/g)) {
            if (event.key === ' ') {
                setallhastags([...allhastags, hashtags[0]])
            }
        }
        // console.log(allhastags)


        const newNonHashtagsText = newText.replace(/#(\w+)/g, '');
        setNonHashtagsText(newNonHashtagsText);

        const cleanedTitle = newText.replace(/#\w+\s/g, '');
        settitle(cleanedTitle);
    };

    const handleDeleteImageSection = () => {
        setSelectedImages([])
        setImageDeletebutton(false)
    }

    const uploadPost = async () => {
        if (selectedImages.length > 10) {
            toast.warn("You Can't Post More Then 10 Image", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            if (!title && !code) {
                toast.warn("You Can't Post Empty Feild", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                const formData = new FormData();
                formData.append('code', code)
                formData.append('title', title)


                allhastags.forEach(tag => {
                    formData.append('hashtags', tag.trim());
                });

                for (let i = 0; i < ImageToUpload.length; i++) {
                    formData.append('images', ImageToUpload[i]);
                }

                try {
                    const response = await fetch('/postupload', {
                        method: 'POST',
                        body: formData
                    });

                    if (response.status === 200) {
                        Swal.fire(
                            'SUCCESS',
                            'Post Successful',
                            'success'
                        )
                    } else {
                        toast.warn("Something went Wrong", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                } catch (error) {
                    toast.warn(`Something went Wrong${error}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }

                formData.forEach(function (value, key) {
                    formData.delete(key);
                });

                setSelectedImages([])
                setImageToUpload([])
                settitle("")
                setallhastags([])
                dispatch(closePostWindow())
                dispatch(closeCodeUploadBar())
            }

        }

    }

    return (
        <>
            <div className='w-full h-screen bg-white-5 absolute top-0 left-0 flex justify-center items-center'>
                <div className='w-[600px] h-auto bg-white rounded-md shadow-xl relative'>
                    <div className='border-slate-300 border-b w-full'>
                        <h1 className='text-xl font-semibold py-3 text-center'>Create Post</h1>
                    </div>
                    <div className='px-5 mt-5 w-full h-full'>
                        <div className='w-full h-full'>
                            <div className='w-full h-full flex items-center'>
                                <div className='w-10 h-10 rounded-full overflow-hidden'>
                                    {/* <img src={UserAuthData.profile_pic === "posterUpload.gif" ? "/anonimusprofilepic/posterUpload.gif" : `uploads/profiles/${UserAuthData._id}/profileelement/${UserAuthData.profile_pic}`} className='w-full h-full' alt="" /> */}
                                    <img src={UserAuthData.profile_pic === "male.gif" || UserAuthData.profile_pic === "female.gif" ? `/anonimusprofilepic/${UserAuthData.profile_pic}` : `uploads/profiles/${UserAuthData._id}/profileelement/${UserAuthData.profile_pic}`} className='w-full h-full' alt="" />

                                </div>
                                <div className='font-semibold text-slate-600 ml-2'>
                                    Mithun Sarkar
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full px-5 mt-5'>
                        <div className='w-full flex flex-wrap'>
                            {
                                allhastags.map((data, indx) => {
                                    return <div key={indx} className='w-auto mr-2 bg-cyan-600 px-2 py-1 rounded-full text-white  mb-2'>{data}</div>
                                })
                            }
                        </div>
                        <textarea name="title" id="myDiv" onChange={handleTextChange} onKeyDown={handleTextChange} value={title} className={codeuploadstatus === true || ImageUploadStatus === true || selectedImages.length > 0 ? "w-full h-[50px] text-lg outline-none text-slate-600" : wordCound < 35 ? `w-full min-h-[250px] max-h-[250px] text-3xl outline-none text-slate-600` : wordCound < 110 ? `w-full min-h-[250px] max-h-[250px] text-lg outline-none text-slate-600` : `w-full min-h-[250px] max-h-[250px] text-sm outline-none text-slate-600`}
                            placeholder='Write Your Post Title for Hashtag use #HASH then space'>
                        </textarea>
                    </div>
                    {
                        codeuploadstatus === true ? <div className='w-full h-full px-5 mt-5 relative'>

                            <CodeMirror
                                value=""
                                height='400px'
                                extensions={[javascript({ jsx: true })]}
                                theme={dracula}
                                onChange={onChange}
                            />
                            <div className='w-6 h-6 rounded-full flex justify-center items-center bg-slate-500 absolute top-[-10px] right-2 cursor-pointer text-white' onClick={() => { dispatch(closeCodeUploadBar()) }}>
                                <RxCross2 />
                            </div>
                        </div>
                            : null
                    }
                    <div className='h-full w-full px-5'>
                        <div className={ImageUploadStatus === true ? `w-full h-[400px] px-5 mt-5 bg-slate-200 relative` : "hidden"}>
                            <input type="file" ref={ImageRef} multiple onChange={handleImageChange} className='hidden' />
                            <div className='w-full h-full flex flex-col justify-center items-center text-slate-800 cursor-pointer' onClick={handleRefClick}>
                                <div className='w-16 h-16 bg-slate-300 flex justify-center items-center rounded-full text-5xl'>
                                    <AiOutlineCamera />
                                </div>
                                <div className='text-lg font-semibold mt-5'>
                                    Add Photos
                                </div>
                            </div>
                            <div className='w-6 h-6 rounded-full flex justify-center items-center bg-slate-500 absolute top-[-10px] right-[-10px] cursor-pointer text-white' onClick={() => { setImageUploadStatus(false) }}>
                                <RxCross2 />
                            </div>
                        </div>
                        <div className='w-full h-full relative'>
                            <div className={selectedImages.length <= 2 ? 'h-auto w-full flex' : "hidden"}>
                                {selectedImages.map((image, index) => (
                                    <div key={index} className="image-preview w-full m-1">
                                        <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className={selectedImages.length === 1 ? 'w-full h-auto' : selectedImages === 2 ? 'w-2 h-auto' : null} />
                                    </div>
                                ))}
                            </div>
                            <div className={selectedImages.length >= 3 ? 'h-auto w-full' : "hidden"}>
                                <div className='w-full h-full flex'>

                                    {selectedImages.splice(0, 2).map((image, index) => (
                                        <div key={index} className="image-preview w-full m-1">
                                            <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className={'w-full h-auto'} />

                                        </div>
                                    ))}
                                </div>
                                <div className='w-full h-full flex'>
                                    {selectedImages.splice(0, 2).map((image, index) => (
                                        <div key={index} className="image-preview w-full m-1">
                                            <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className={"w-full h-auto"} />


                                        </div>
                                    ))}
                                    {selectedImages.splice(0, 1).map((image, index) => (
                                        <div key={index} className="image-preview w-full relative m-1">
                                            <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className={"last_image_style"} />
                                            <div className='w-full h-full absolute top-0 left-0 bg-salate-05 flex justify-center items-center text-5xl text-slate-800'>
                                                +{selectedImages.length}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={ImageDeletebutton == true ? 'w-6 h-6 rounded-full flex justify-center items-center bg-slate-500 absolute top-[10px] right-[10px] cursor-pointer text-white' : "hidden"} onClick={handleDeleteImageSection}>
                                <RxCross2 />
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[60px]  px-5 mt-5'>
                        <div className='border h-full flex items-center justify-between font-semibold text-slate-600 px-5'>
                            <div>
                                Add to your post
                            </div>
                            <div className='flex'>
                                <button className='flex rounded items-center justify-center hover:bg-slate-200 duration-100 text-slate-600 font-semibold cursor-pointer p-3' onClick={() => { dispatch(opencloseCodeUploadBar()); setImageUploadStatus(false) }}  ><AiFillCode className='text-3xl text-sky-600' /></button>
                                <div className='flex rounded items-center justify-center hover:bg-slate-200 duration-100 text-slate-600 font-semibold cursor-pointer p-3 mx-5' onClick={() => { setImageUploadStatus(true); dispatch(closeCodeUploadBar()) }} ><HiOutlinePhotograph className='text-3xl text-teal-500' /></div>
                                <div className='flex rounded items-center justify-center hover:bg-slate-200 duration-100 text-slate-600 font-semibold cursor-pointer p-3' ><BiVideo className='text-3xl text-rose-400' /></div>
                            </div>
                        </div>
                    </div>
                    <div className='p-5' onClick={() => { uploadPost() }}>
                        <button className='bg-blue-500 w-full py-2 rounded-md font-semibold text-white'>Post</button>
                    </div>
                    <div className='w-7 h-7 rounded-full flex justify-center items-center text-xl text-white absolute top-[-10px] right-[-10px] cursor-pointer bg-rose-600' onClick={() => { dispatch(closePostWindow()) }}>
                        <RxCross2 />
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default PostWindow