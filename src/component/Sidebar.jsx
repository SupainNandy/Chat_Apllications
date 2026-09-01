import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosSearch } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../config'
import { clearUserData, setSelectedUser } from '../redux/userSlice'

const Sidebar = () => {
    const { userData, otherUsers } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search, setSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const defaultAvatar = "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80"

    const usersToShow = (otherUsers || []).map((user) => ({
        ...user,
        isOnline: user?.isOnline ?? true
    }))

    const filteredUsers = usersToShow.filter((user) =>
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleLogout = async () => {
        try {
            await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true })
            dispatch(clearUserData())
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='lg:w-[30%] w-full h-full bg-slate-200'>
            <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-lg flex items-center justify-start px-[20px]'>
                <h1 className='text-white font-bold text-[30px]'>chat</h1>
            </div>

            <div
                className='flex items-center gap-4 px-4 mt-[-60px] cursor-pointer'
                onClick={() => navigate('/profile')}
            >
                <div className='w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-white bg-gray-200 flex justify-center items-center shadow-md' >
                    <img
                        src={userData?.image || defaultAvatar}
                        alt="profile"
                        className='w-full h-full object-cover'
                    />
                </div>
                <h1 className='text-lg font-semibold'>Hi, {userData?.name || 'User'}</h1>
            </div>

            <div className='px-4 mt-5'>
                <div className='flex items-center gap-3'>
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
                                placeholder='Search friends'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                                className='w-full h-[45px] rounded-full border border-gray-300 bg-white px-4 pr-10 text-sm outline-none focus:border-[#20c7ff]'
                            />
                            <button
                                type='button'
                                onClick={() => {
                                    setSearch(false)
                                    setSearchTerm('')
                                }}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600 hover:text-gray-900 font-medium cursor-pointer'
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>

                <div className='mt-5'>
                    <h2 className='text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3'>Active now</h2>

                    <div className='space-y-3 max-h-[340px] overflow-y-auto'>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div
                                    key={user?._id || user?.email}
                                    onClick={() => dispatch(setSelectedUser(user))}
                                    className='flex items-center gap-3 bg-white rounded-2xl p-2 shadow-sm cursor-pointer hover:bg-slate-50'
                                >
                                    <div className='relative'>
                                        <div className='w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-white bg-gray-200 flex justify-center items-center'>
                                            <img
                                                src={user?.image || defaultAvatar}
                                                alt={user?.name || 'User'}
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                        <span
                                            className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white ${user?.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                                            title={user?.isOnline ? 'Online' : 'Offline'}
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <p className='font-medium text-slate-700'>{user?.name || 'Unknown User'}</p>
                                        <p className='text-xs text-slate-500'>
                                            {user?.isOnline ? 'online' : 'offline'}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-sm text-slate-500'>No other users found</p>
                        )}
                    </div>
                </div>

                <button
                    type='button'
                    onClick={handleLogout}
                    className='mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-full shadow-md transition'
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar