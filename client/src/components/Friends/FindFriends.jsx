import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsPeople } from 'react-icons/bs';

function FindFriends() {

    const [Users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/users-not-followed", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await res.json();
                setUsers(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const handleFollowReq = async (id) => {
        try {
            const res = await fetch("/followuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    id
                })
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            console.log(res)
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        
    }

    return (
        <>

            {   Users.length < 1 ? <div className='text-black w-full h-full flex justify-center items-center text-base flex-col'> <div className='text-6xl text-slate-400 mb-5'><BsPeople /></div> No People to show </div> : 
                Users.map((data, index) => {
                    return (
                        <div className='w-full h-[70px] bg-slate-200 text-black flex items-center px-5 border-b border-slate-300'>
                            <Link to={`/account/${data._id}`} className='bg-red-900 w-[50px] h-[50px] rounded-full overflow-hidden mr-5'>
                                <img src={data.profile_pic === "male.gif" || data.profile_pic === "female.gif" ? `/anonimusprofilepic/${data.profile_pic}` : `/uploads/profiles/${data._id}/profileelement/${data.profile_pic}`} className='w-full h-full' alt="" />
                            </Link>
                            <div className='w-auto'>
                                <Link to={`/account/${data._id}`} className='text-base font-semibold mb-2 w-full overflow-hidden'>
                                    {data.name}
                                </Link>
                                <div>
                                    <div className='text-sm' onClick={()=>handleFollowReq(data._id)}>
                                        <button className='bg-sky-500 rounded w-[100px] py-1'>Follow</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })
            }

        </>
    )
}

export default FindFriends