import React, { useRef, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import { BsArrowRight } from 'react-icons/bs'
import AvatarEditor from 'react-avatar-editor';
import { useEffect } from 'react';
import SpinnerLoaders from '../Loaders/SpinnerLoaders';
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom"

function ProfilePicUpload() {
    const [uploadPictureBar, setuploadPictureBar] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [editor, setEditor] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef(null)
    const [DataStatus, setDataStatus] = useState({})
    const [loaders, setloaders] = useState(false)
    const [uploadPosterBar, setuploadPosterBar] = useState(false)

    const navigate = useNavigate()

    const handleFileClick = () => {
        inputRef.current.click()
    }
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragOver(false);
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            setSelectedFile(event.dataTransfer.files[0]);
        }
    };

    const handleCrop = async () => {
        if (!editor) {
            alert("No file detected")
        }
        else {
            const canvas = editor.getImageScaledToCanvas();
            const resizedDataURL = canvas.toDataURL();
            const blob = await fetch(resizedDataURL).then((r) => r.blob());

            const formData = new FormData();
            formData.append('profilePic', blob);

            const uploadprofilepic = await fetch('/uploadprofilepic', {
                method: 'POST',
                body: formData,
            });

            if (uploadprofilepic.status === 200) {
                Swal.fire(
                    'Upload Sucessfully',
                    'Profile Picture Uploaded',
                    'success')
            } else {
                Swal.fire(
                    'Error',
                    'Somgething went wrong',
                    'error')
            }

            setSelectedFile(null);
            setuploadPictureBar(false);
        }
        findData()
    };

    const posterUpload = async () => {

        if (!selectedFile) {
            Swal.fire(
                'No File Selected',
                'Please Select An Image',
                'error')
        } else {
            const formData = new FormData()
            formData.append("posterimage", selectedFile)

            try {
                const response = await fetch('/uploadposter', {
                    method: 'POST',
                    body: formData,
                });

                if (response.status === 200) {
                    Swal.fire(
                        'Upload Sucessfully',
                        'Profile Picture Uploaded',
                        'success')
                } else {
                    Swal.fire(
                        'Error',
                        'Somgething went wrong',
                        'error')
                }
            } catch (error) {
                console.error('Error:', error);
            }

            setSelectedFile(null);
            setuploadPosterBar(false)
            findData()
        }

    }

    const findData = async (e) => {
        setloaders(true)
        const res = await fetch("/about", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json()
        // console.log(res.status)

        if (res.status === 401) {
            navigate("/")
        } else {
            setDataStatus(data)
        }
        setTimeout(() => {
            setloaders(false)
        }, 1000);

    }

    useEffect(() => {
        findData()
    }, [])

    return (
        <>
            <div className='w-full h-screen flex justify-center items-center select-none'>
                <div className='w-auto absolute top-[100px] right-[200px]'>
                    <Link to="/"><button className='bg-sky-300 hover:bg-sky-400 duration-150 text-lg flex items-center px-2 py-2 rounded-full z-50'>Go To Home Page<BsArrowRight className='ml-2' /></button>
                    </Link>
                </div>
                <div className='w-auto h-auto bg-white rounded-md shadow-xl relative overflow-hidden'>
                    <div className='w-[1584px] h-[396px] bg-white shadow-xl group relative'>

                        <img src={DataStatus.poster_pic === "posterUpload.gif" ? "./anonimusprofilepic/posterUpload.gif" : `uploads/profiles/${DataStatus._id}/profileelement/${DataStatus.poster_pic}`} className='w-full h-full' alt="" />
                        <div className="w-full h-full profilePicHoverstyle absolute top-0 left-0 cursor-pointer group-hover:flex ease-in duration-200 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center text-[100px]" onClick={() => { setuploadPosterBar(true) }}>
                            <AiOutlineCamera className='text-white' />
                        </div>
                    </div>
                    <div className='w-[300px] h-[300px] z-50 rounded-full absolute bottom-0 left-10 overflow-hidden group mb-2'>
                        <img src={DataStatus.profile_pic === "male.gif" ? "./anonimusprofilepic/male.gif" : DataStatus.profile_pic === "female.gif" ? "./anonimusprofilepic/female.gif" : `uploads/profiles/${DataStatus._id}/profileelement/${DataStatus.profile_pic}`} alt="Profile" className='w-full h-full -z-50' />
                        <div className="w-full h-full profilePicHoverstyle absolute  top-0 left-0 cursor-pointer group-hover:flex ease-in duration-200 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center text-[100px]" onClick={() => { setuploadPictureBar(true) }}>
                            <AiOutlineCamera className='text-white' />
                        </div>
                    </div>
                    <div className='w-[40%] h-[30%] ml-[400px] mt-5 mb-10 bg-white'>
                        <h1 className='text-2xl font-semibold'>{DataStatus.name}</h1>
                        <p className='text-slate-500'>{DataStatus.email}</p>
                        <p className='text-slate-500'>{DataStatus.profession}</p>
                    </div>
                </div>
            </div>

            < div className={uploadPictureBar === false ? 'w-full h-screen profilePicHoverstyle absolute top-0 left-0 z-50 hidden justify-center items-center select-none opacity-0' : 'w-full h-screen profilePicHoverstyle absolute top-0 left-0 z-50 flex justify-center items-center select-none opacity-100 duration-500 transition-opacity'}>
                <div className='w-full h-full absolute top-0 left-0 profilePicHoverstyle' onClick={() => { setuploadPictureBar(false) }}>

                </div>
                <div className={`w-[700px] h-[400px] rounded-xl p-10 z-50 relative ${dragOver ? "bg-slate-700" : "bg-white"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                    <div
                        className={dragOver ? 'w-full h-full border-4 rounded-xl border-dashed border-sky-600 flex flex-col justify-center items-center' : 'w-full h-full border-4 rounded-xl border-dashed border-slate-600 flex flex-col justify-center items-center'}
                    // className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
                    >

                        <div className='w-auto h-[50%] flex justify-center items-center'>
                            <img src="./ImageUpload/UploadImageIcon.png" className='h-full w-auto cursor-pointer' alt="" onClick={handleFileClick} />
                            <input type="file" accept="image/*"
                                onChange={handleFileChange}
                                ref={inputRef}
                                className='hidden'
                            />
                        </div>
                        <div className={`${dragOver ? "text-white" : "text-sky-900"}`}>
                            <div className='text-2xl font-semibold text-center mt-5 cursor-pointer'>
                                Drop Your Image Here Or , <span className='text-sky-500 hover:underline' onClick={handleFileClick}>Browse</span>
                            </div>
                            <div className='text-slate-400 text-center mt-3'>
                                Support JPG , PNG
                            </div>
                        </div>
                    </div>
                    <div className='w-7 h-7 bg-rose-500 rounded-full text-white flex justify-center items-center absolute top-[-10px] right-[-10px] text-lg cursor-pointer' onClick={() => { setuploadPictureBar(false) }}>
                        <RxCross2 />
                    </div>
                </div>
                {selectedFile && (
                    <div className='w-full h-screen profilePicHoverstyle z-50 absolute top-0 left-0 flex items-center justify-center '>
                        <div className='w-[500px] h-[500px] bg-white flex flex-col items-center justify-center rounded-xl'>
                            <AvatarEditor
                                ref={(ref) => setEditor(ref)}
                                image={selectedFile}
                                className='w-full'
                                border={50}
                                color={[0, 0, 0, 0.8]}
                                scale={1}
                            />
                            <button onClick={handleCrop} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Crop and Save Avatar</button>
                        </div>
                    </div>
                )}
            </div >
            < div className={uploadPosterBar === false ? 'w-full h-screen profilePicHoverstyle absolute top-0 left-0 z-50 hidden justify-center items-center select-none opacity-0' : 'w-full h-screen profilePicHoverstyle absolute top-0 left-0 z-50 flex justify-center items-center select-none opacity-100 duration-500 transition-opacity'}>
                <div className='w-full h-full absolute top-0 left-0 profilePicHoverstyle' onClick={() => { setuploadPosterBar(false) }}>

                </div>
                <div className={`w-[700px] h-[400px] rounded-xl p-10 z-50 relative ${dragOver ? "bg-slate-700" : "bg-white"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                    <div
                        // className='w-full h-full border-4 rounded-xl border-dashed border-slate-600 flex flex-col justify-center items-center'
                        className={dragOver ? 'w-full h-full border-4 rounded-xl border-dashed border-sky-600 flex flex-col justify-center items-center' : 'w-full h-full border-4 rounded-xl border-dashed border-slate-600 flex flex-col justify-center items-center'}

                    >

                        <div className='w-auto h-[50%] flex justify-center items-center'>
                            <img src="./ImageUpload/UploadImageIcon.png" className='h-full w-auto cursor-pointer' alt="" onClick={handleFileClick} />
                            <input type="file" accept="image/*"
                                onChange={handleFileChange}
                                ref={inputRef}
                                className='hidden'
                            />
                        </div>
                        <div className={`${dragOver ? "text-white" : "text-sky-900"}`}>
                            <div className='text-2xl font-semibold text-center mt-5 cursor-pointer'>
                                Drop Your Image Here Or , <span className='text-sky-500 hover:underline' onClick={handleFileClick}>Browse</span>
                            </div>
                            <div className='text-slate-400 text-center mt-3'>
                                Support JPG , PNG
                            </div>
                        </div>
                        <div className=''>
                            <button className='bg-cyan-500 mt-5 px-10 py-2 rounded-full text-white' onClick={posterUpload} >UPLOAD</button>
                        </div>
                    </div>

                    <div className='w-7 h-7 bg-rose-500 rounded-full text-white flex justify-center items-center absolute top-[-10px] right-[-10px] text-lg cursor-pointer' onClick={() => { setuploadPosterBar(false) }}>
                        <RxCross2 />
                    </div>
                </div>

            </div >
            {loaders === true ? <SpinnerLoaders /> : null}
        </>
    )
}

export default ProfilePicUpload