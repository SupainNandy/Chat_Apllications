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
        <div className='lg:w-[30%] w-full h-full bg-slate-50 border-r border-slate-200 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20'>
            {/* Header Area */}
            <div className='w-full shrink-0 bg-white px-6 py-5 flex items-center justify-between border-b border-slate-100'>
                <h1 className='text-slate-800 font-extrabold text-2xl tracking-tight'>Chats</h1>
                
                <div
                    className='flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors'
                    onClick={() => navigate('/profile')}
                >
                    <div className='flex flex-col items-end hidden xl:flex'>
                        <span className='text-sm font-bold text-slate-700'>{userData?.name || 'User'}</span>
                        <span className='text-[10px] text-green-500 font-bold uppercase tracking-wider'>Online</span>
                    </div>
                    <div className='w-11 h-11 rounded-full overflow-hidden border-2 border-[#20c7ff] shadow-sm relative'>
                        <img
                            src={userData?.image || defaultAvatar}
                            alt="profile"
                            className='w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 rounded-full border border-black/10'></div>
                    </div>
                </div>
            </div>

            <div className='px-6 mt-6 flex-1 flex flex-col min-h-0 pb-6'>
                {/* Search Bar */}
                <div className='relative shrink-0 mb-6'>
                    <IoIosSearch className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                    <input
                        type="text"
                        placeholder='Search messages...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full h-[50px] pl-12 pr-10 rounded-2xl bg-white border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#20c7ff]/50 focus:border-[#20c7ff] transition-all shadow-sm text-slate-700 placeholder-slate-400 font-medium'
                    />
                    {searchTerm && (
                        <button
                            type='button'
                            onClick={() => setSearchTerm('')}
                            className='absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition'
                        >
                            ×
                        </button>
                    )}
                </div>

                {/* Contacts List */}
                <div className='flex-1 flex flex-col min-h-0'>
                    <div className='flex items-center justify-between mb-4 shrink-0 px-1'>
                        <h2 className='text-xs font-bold uppercase tracking-widest text-slate-400'>Recent Conversations</h2>
                        <span className='bg-[#20c7ff]/10 text-[#20c7ff] text-[10px] font-bold px-2 py-1 rounded-md'>
                            {filteredUsers.length}
                        </span>
                    </div>

                    <div className='space-y-2 flex-1 overflow-y-auto pr-1'>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div
                                    key={user?._id || user?.email}
                                    onClick={() => dispatch(setSelectedUser(user))}
                                    className='group flex items-center gap-4 bg-white hover:bg-slate-100 rounded-2xl p-3 cursor-pointer transition-all duration-200 border border-slate-100 hover:border-slate-200 hover:shadow-sm'
                                >
                                    <div className='relative shrink-0'>
                                        <div className='w-14 h-14 rounded-full overflow-hidden bg-slate-200 shadow-inner'>
                                            <img
                                                src={user?.image || defaultAvatar}
                                                alt={user?.name || 'User'}
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                        {user?.isOnline && (
                                            <span
                                                className='absolute bottom-0 right-0 block w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-sm'
                                                title='Online'
                                            />
                                        )}
                                    </div>

                                    <div className='flex-1 min-w-0'>
                                        <div className='flex justify-between items-baseline mb-1'>
                                            <p className='font-bold text-slate-800 truncate text-[15px] group-hover:text-[#20c7ff] transition-colors'>
                                                {user?.name || 'Unknown User'}
                                            </p>
                                            <p className='text-[10px] font-medium text-slate-400'>
                                                {user?.isOnline ? 'Now' : ''}
                                            </p>
                                        </div>
                                        <p className='text-[13px] text-slate-500 truncate'>
                                            {user?.isOnline ? 'Active right now' : 'Offline'}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='flex flex-col items-center justify-center h-full text-slate-400 gap-2'>
                                <IoIosSearch className='w-8 h-8 opacity-50' />
                                <p className='text-sm font-medium'>No users found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    type='button'
                    onClick={handleLogout}
                    className='mt-6 shrink-0 w-full flex items-center justify-center gap-3 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-red-500 hover:to-rose-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group'
                >
                    <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span className='tracking-wide'>Sign Out</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar