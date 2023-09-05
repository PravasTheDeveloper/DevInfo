import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfileData, setUserData } from '../../redux/UserAuthData';
import { RxCross2 } from 'react-icons/rx';
import Swal from 'sweetalert2';
import { fetchNotificationData } from '../../redux/NotificationRedux';

function AccountEdit() {
    const status = useSelector((state) => state.userauth.status);
    const NotificationData = useSelector(state => state.notification.data)



    const dispatch = useDispatch()

    const [changePasswordWindow, setchangePasswordWindow] = useState(false)
    const [passwordSection, setpasswordSection] = useState({
        old_pass: '',
        new_pass: '',
        c_pass: ''
    })

    const [OpenBarWindow, setOpenBarWindow] = useState({
        name: false,
        email: false,
        phone: false,
        profession: false,
        gender: false
    })

    const UserAuthData = useSelector(state => state.userauth.userData)

    const handleChangeData = (e) => {
        let name = e.target.name
        let value = e.target.value

        const updatedUserData = { ...UserAuthData, [name]: value };
        dispatch(setUserData(updatedUserData));

    }

    const handleGenderChange = (e) => {
        let value = e.target.value;

        const updatedUserData = { ...UserAuthData, gender: value };
        dispatch(setUserData(updatedUserData));

    }

    const handlepassword = (e) => {
        let name = e.target.name
        let value = e.target.value

        setpasswordSection({ ...passwordSection, [name]: value })
    }

    const postPassword = async (e) => {
        // e.preventDefault();

        const { old_pass, new_pass, c_pass } = passwordSection;

        if (new_pass === c_pass) {
            try {
                const response = await fetch('/changepassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other headers your API requires
                    },
                    body: JSON.stringify({ old_pass, new_pass }),
                });

                if (response.status === 200) {
                    Swal.fire(
                        'SUCCESS',
                        'Password Change Successfull',
                        'success'
                    )
                    setchangePasswordWindow(false)
                    setTimeout(() => {
                        dispatch(fetchNotificationData())
                    }, 1000);
                } else if (response.status === 401) {
                    Swal.fire(
                        'Error',
                        'Old Password wrong',
                        'error'
                    )
                } else if (response.status === 402) {
                    Swal.fire(
                        'Error',
                        'Old And New Password not be same',
                        'error'
                    )
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            Swal.fire(
                'Error',
                'Password and Confirm Password Must be same',
                'error'
            )
        }
    }

    const handleProfileUpdate = (e) => {
        dispatch(changeProfileData(UserAuthData));

        if (status === 200) {
            Swal.fire(
                'SUCCESS',
                'Details Change Successfull',
                'success'
            )
            setTimeout(() => {
                dispatch(fetchNotificationData())
            }, 1000);

        } else {
            Swal.fire(
                'Error',
                'Details Change Failed',
                'error'
            )
        }
    };

    return (
        <>
            <div className='bg-white w-[900px] h-auto rounded-lg p-12 relative z-50'>
                <div className='w-full h-full flex text-slate-600'>
                    <div className='w-1/2 h-full'>
                        <div className='mb-5 relative w-full h-full'>
                            <div className='text-lg font-semibold '>
                                Name :
                            </div>
                            <div className='h-10 flex items-center'>
                                {
                                    OpenBarWindow.name === true ? <input type="text" name='name' className='h-full w-[70%] border-b-2 border-slate-400 outline-none' value={UserAuthData.name} onChange={handleChangeData} /> : <div className='cursor-pointer' onClick={() => { setOpenBarWindow({ name: true }) }}>{UserAuthData.name}</div>
                                }
                            </div>
                            <div className='text-2xl absolute right-5 top-0 h-full flex items-center text-slate-600' onClick={() => { setOpenBarWindow({ name: true }) }}>
                                <div className='bg-slate-200 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer'>
                                    <BiEdit />
                                </div>
                            </div>
                        </div>

                        <div className='mb-5 relative w-full h-full'>
                            <div className='text-lg font-semibold'>
                                Phone :
                            </div>
                            <div className='h-10 flex items-center'>
                                {
                                    OpenBarWindow.phone === true ? <input type="text" name='phone' className='h-full w-[70%] border-b-2 border-slate-400 outline-none' value={UserAuthData.phone} onChange={handleChangeData} /> : <div className='cursor-pointer' onClick={() => { setOpenBarWindow({ phone: true }) }}>{UserAuthData.phone}</div>
                                }
                            </div>
                            <div className='text-2xl absolute right-5 top-0 h-full flex items-center text-slate-600' onClick={() => { setOpenBarWindow({ phone: true }) }}>
                                <div className='bg-slate-200 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer'>
                                    <BiEdit />
                                </div>
                            </div>
                        </div>
                        <div className='mb-5 relative w-full h-full' onClick={() => { setchangePasswordWindow(true) }}>
                            <div className='text-lg font-semibold'>
                                Password :
                            </div>
                            <div>
                                *******
                            </div>
                            <div className='text-2xl absolute right-5 top-0 h-full flex items-center text-slate-600'>
                                <div className='bg-slate-200 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer'>
                                    <BiEdit />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='w-1/2 h-full'>
                        <div className='mb-5 relative w-full h-full'>
                            <div className='text-lg font-semibold'>
                                Email :
                            </div>
                            <div className='h-10 flex items-center'>
                                {
                                    OpenBarWindow.email === true ? <input type="text" name='email' className='h-full w-[70%] border-b-2 border-slate-400 outline-none' value={UserAuthData.email} onChange={handleChangeData} /> : <div className='cursor-pointer' onClick={() => { setOpenBarWindow({ email: true }) }}>{UserAuthData.email}</div>
                                    // OpenBarWindow.email === true ? <input type="text" name='email' className='h-full w-[70%]' value={UserAuthData.email} onChange={handleChangeData} /> : UserAuthData.email
                                }
                            </div>
                            <div className='text-2xl absolute right-5 top-0 h-full flex items-center text-slate-600' onClick={() => { setOpenBarWindow({ email: true }) }}>
                                <div className='bg-slate-200 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer'>
                                    <BiEdit />
                                </div>
                            </div>
                        </div>

                        <div className='mb-5 relative w-full h-full'>
                            <div className='text-lg font-semibold'>
                                Profession :
                            </div>
                            <div className='h-10 flex items-center'>
                                {
                                    OpenBarWindow.profession === true ? <input type="text" name='profession' className='h-full w-[70%] border-b-2 border-slate-400 outline-none' value={UserAuthData.profession} onChange={handleChangeData} /> : <div className='cursor-pointer' onClick={() => { setOpenBarWindow({ profession: true }) }}>{UserAuthData.profession}</div>
                                }
                            </div>
                            {/* <div>
                                    {UserAuthData.profession}
                                </div> */}
                            <div className='text-2xl absolute right-5 top-0 h-full flex items-center text-slate-600' onClick={() => { setOpenBarWindow({ profession: true }) }}>
                                <div className='bg-slate-200 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer'>
                                    <BiEdit />
                                </div>
                            </div>
                        </div>
                        <div className='mb-5 relative w-full h-full '>
                            {OpenBarWindow.gender === true ?

                                <div className='w-full h-full mb-5 '>
                                    <div className='text-lg font-semibold'>
                                        Gender :
                                    </div>
                                    <div>
                                        <label className='ml-0'>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={UserAuthData.gender === "male"}
                                                onChange={(e) => handleGenderChange(e)}
                                            />
                                            Male
                                        </label>
                                        <label className='ml-4'>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={UserAuthData.gender === "female"}
                                                onChange={(e) => handleGenderChange(e)}
                                            />
                                            Female
                                        </label>
                                        <label className='ml-4'>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="other"
                                                checked={UserAuthData.gender === "other"}
                                                onChange={(e) => handleGenderChange(e)}
                                            />
                                            Other
                                        </label>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className='text-lg font-semibold'>
                                        Gender :
                                    </div>
                                    <div>
                                        {UserAuthData.gender}
                                    </div>
                                </div>
                            }
                            <div className='text-2xl absolute right-5 top-0 h-full flex items-center text-slate-600' onClick={() => { setOpenBarWindow({ gender: true }) }}>
                                <div className='bg-slate-200 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer'>
                                    <BiEdit />
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
                <button className='bg-cyan-500 px-6 py-3 rounded-lg text-white' onClick={(e) => { handleProfileUpdate() }}>
                    Update Details
                </button>

                <div className='w-6 h-6 rounded-full flex justify-center items-center bg-rose-500 absolute top-[-10px] right-[-10px] cursor-pointer text-white'>
                    <RxCross2 />
                </div>
            </div>
            {
                changePasswordWindow === true ?

                    <div className='w-full h-screen fixed top-0 right-0 z-50 bg-salate-05 flex justify-center items-center'>
                        <div className='w-[500px] h-auto bg-white rounded-md p-10 relative'>
                            <div className='w-full h-full'>
                                <div className='mb-5'>
                                    <div className='text-sm font-semibold text-slate-600'>
                                        Old Password
                                    </div>
                                    <div>
                                        <input type="text" name='old_pass' onChange={handlepassword} className='border w-full h-10' />
                                    </div>
                                </div>
                                <div className='mb-5'>
                                    <div className='text-sm font-semibold text-slate-600'>
                                        New Password
                                    </div>
                                    <div>
                                        <input type="text" name='new_pass' onChange={handlepassword} className='border w-full h-10' />
                                    </div>
                                </div>
                                <div className='mb-5'>
                                    <div className='text-sm font-semibold text-slate-600'>
                                        Retype New Password
                                    </div>
                                    <div>
                                        <input type="text" name='c_pass' onChange={handlepassword} className='border w-full h-10' />
                                    </div>
                                </div>
                                <div className='mb-0'>
                                    <button className='bg-cyan-500 w-full rounded-md py-2 text-white' onClick={() => { postPassword() }}>UPDATE PASSWORD</button>
                                </div>
                            </div>
                            <div className='w-6 h-6 rounded-full flex justify-center items-center bg-rose-500 absolute top-[-10px] right-[-10px] cursor-pointer text-white' onClick={() => { setchangePasswordWindow(false) }}>
                                <RxCross2 />
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default AccountEdit