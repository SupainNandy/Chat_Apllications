import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoIosSearch } from "react-icons/io"

const Sidebar = () => {
    const { userData } = useSelector((state) => state.user)
    const [search, setSearch] = useState(false)

    return (
        <div className='lg:w-[30%] w-full h-full bg-slate-200'>
            <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-lg flex items-center justify-start px-[20px]'>
                <h1 className='text-white font-bold text-[30px]'>chat</h1>
            </div>

            <div className='flex items-center gap-4 px-4 mt-[-60px]'>
                <div className='w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-white bg-gray-200 flex justify-center items-center shadow-md'>
                    <img
                        src={userData?.image || "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80"}
                        alt="profile"
                        className='w-full h-full object-cover'
                    />
                </div>
                <h1 className='text-lg font-semibold'>Hi, {userData?.name || 'User'}</h1>
            </div>

            <div className='flex items-center gap-3 px-4 mt-5'>
                {!search && (
                    <button
                        type='button'
                        onClick={() => setSearch(true)}
                        className='w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center shadow-md cursor-pointer'
                    >
                        <IoIosSearch className='w-[25px] h-[25px] text-gray-600'/>
                    </button>
                )}
                {search && (
                    <div className='relative w-full'>
                        <input
                            type="text"
                            placeholder='Check Active'
                            autoFocus
                            className='w-full h-[45px] rounded-full border border-gray-300 bg-white px-4 pr-10 text-sm outline-none focus:border-[#20c7ff]'
                        />
                        <button
                            type='button'
                            onClick={() => setSearch(false)}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600 hover:text-gray-900 font-medium cursor-pointer'
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar