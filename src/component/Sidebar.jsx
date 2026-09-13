import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosSearch } from "react-icons/io"
import { IoLogOutOutline, IoSettingsOutline, IoChevronDown, IoChatbubbleOutline, IoPeopleOutline, IoFolderOutline, IoGridOutline } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { serverUrl } from '../config'
import { clearUserData, setSelectedUser } from '../redux/userSlice'
import gsap from 'gsap'
// Removed useGSAP import; using useEffect for animation
import { useTheme } from '../context/ThemeContext'

const Sidebar = () => {
    const { userData, otherUsers, onlineUser, selectedUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const listRef = useRef(null)

    const defaultAvatar = "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80"

    const usersToShow = (otherUsers || []).map((user) => ({
        ...user,
        isOnline: onlineUser ? onlineUser.includes(user._id) : false
    }))

    const filteredUsers = usersToShow.filter((user) =>
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.userName?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const onlineUsers = filteredUsers.filter(u => u.isOnline);
    const offlineUsers = filteredUsers.filter(u => !u.isOnline);

    React.useEffect(() => {
        if (listRef.current && filteredUsers.length > 0) {
            gsap.from(".sidebar-user-item", {
                y: 10,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.out"
            });
        }
    }, [filteredUsers]);

    const handleLogout = async () => {
        try {
            await api.post('/api/auth/logout', {}, { withCredentials: true })
            dispatch(clearUserData())
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <aside className={`w-full md:w-[280px] h-full flex flex-col shrink-0 bg-[var(--color-sidebar-bg)] border-r border-[var(--color-border-subtle)] z-20 ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
            
            {/* Header */}
            <div className='h-[68px] px-4 flex items-center justify-between border-b border-[var(--color-border-subtle)] shrink-0'>
                <div className='flex items-center gap-2 hover:bg-[#1E2430] p-1.5 -ml-1.5 rounded-md transition-colors cursor-default'>
                    <div className='w-6 h-6 flex items-center justify-center text-[var(--color-primary)]'>
                        <span className="text-xl leading-none font-bold">◈</span>
                    </div>
                    <span className='font-bold text-[var(--color-text-primary)]'>ChatFlow</span>
                </div>
            </div>

            {/* Search */}
            <div className='p-4 shrink-0'>
                <div className='relative group'>
                    <IoIosSearch className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors' />
                    <input
                        type="text"
                        placeholder='Search conversations...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full h-9 pl-9 pr-14 rounded-md bg-[#0B0D12] border border-[var(--color-border-subtle)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_1px_var(--color-primary)] transition-all'
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)] bg-[#11141B] text-[10px] font-medium text-[var(--color-text-muted)]">Ctrl</kbd>
                        <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 rounded border border-[var(--color-border-subtle)] bg-[#11141B] text-[10px] font-medium text-[var(--color-text-muted)]">K</kbd>
                    </div>
                </div>
            </div>

            {/* Navigation & Lists */}
            <div className='flex-1 overflow-y-auto px-2 space-y-6 pb-4'>
                
                {/* Direct Messages */}
                <div ref={listRef}>
                    {onlineUsers.length > 0 && (
                        <div className="mb-6">
                            <div className="px-2 mb-3 flex items-center justify-between">
                                <h3 className="text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Online</h3>
                                <span className="text-[10px] font-bold bg-[#1E2430] text-[var(--color-text-secondary)] px-1.5 py-0.5 rounded-md">{onlineUsers.length}</span>
                            </div>
                            
                            <div className='space-y-0.5'>
                                {onlineUsers.map((user) => {
                                    const isSelected = selectedUser?._id === user?._id
                                    return (
                                        <div
                                            key={user?._id || user?.email}
                                            onClick={() => dispatch(setSelectedUser(user))}
                                            className={`sidebar-user-item group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                                                isSelected
                                                    ? 'bg-[#1E2430]'
                                                    : 'hover:bg-[#1E2430]'
                                            }`}
                                        >
                                            <div className='relative shrink-0'>
                                                <img
                                                    src={user?.image || defaultAvatar}
                                                    alt={user?.name || 'User'}
                                                    className='w-8 h-8 rounded-full object-cover border border-transparent group-hover:border-[var(--color-border-subtle)] transition-colors'
                                                />
                                                {user?.isOnline && (
                                                    <span className='absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[var(--color-sidebar-bg)] group-hover:ring-[#1E2430] transition-colors'></span>
                                                )}
                                            </div>

                                            <div className='flex-1 min-w-0 flex flex-col justify-center'>
                                                <h3 className={`font-semibold text-[13px] tracking-wide truncate transition-colors ${
                                                    isSelected ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
                                                }`}>
                                                    {user?.name || 'User'}
                                                </h3>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Offline Users */}
                    {offlineUsers.length > 0 && (
                        <div>
                            <div className="px-2 mb-3 flex items-center justify-between">
                                <h3 className="text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest opacity-60">Offline</h3>
                                <span className="text-[10px] font-bold bg-[#1E2430] text-[var(--color-text-secondary)] px-1.5 py-0.5 rounded-md opacity-60">{offlineUsers.length}</span>
                            </div>
                            
                            <div className='space-y-0.5'>
                                {offlineUsers.map((user) => {
                                    const isSelected = selectedUser?._id === user?._id
                                    return (
                                        <div
                                            key={user?._id || user?.email}
                                            onClick={() => dispatch(setSelectedUser(user))}
                                            className={`sidebar-user-item group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors opacity-50 hover:opacity-100 ${
                                                isSelected
                                                    ? 'bg-[#1E2430] opacity-100'
                                                    : 'hover:bg-[#1E2430]'
                                            }`}
                                        >
                                            <div className='relative shrink-0'>
                                                <img
                                                    src={user?.image || defaultAvatar}
                                                    alt={user?.name || 'User'}
                                                    className='w-8 h-8 rounded-full object-cover border border-transparent group-hover:border-[var(--color-border-subtle)] transition-colors grayscale'
                                                />
                                            </div>

                                            <div className='flex-1 min-w-0 flex flex-col justify-center'>
                                                <h3 className={`font-semibold text-[13px] tracking-wide truncate transition-colors ${
                                                    isSelected ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
                                                }`}>
                                                    {user?.name || 'User'}
                                                </h3>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {filteredUsers.length === 0 && (
                        <p className='text-xs text-[var(--color-text-muted)] px-2 italic'>No users found</p>
                    )}
                </div>

                {/* Minimal Developer Credit */}
                <div className="mt-6 mb-3 flex items-center justify-center">
                    <p className="text-[11px] text-[#64748B] flex items-center gap-1">
                        Developed by 
                        <span className="font-medium cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:text-[#8B5CF6] hover:drop-shadow-[0_0_4px_rgba(139,92,246,0.3)]">
                            Supain
                        </span>
                    </p>
                </div>

            </div>

            {/* Current User Bottom Bar */}
            <div className="p-3 border-t border-[var(--color-border-subtle)] bg-[#0B0D12]">
                <div className="flex items-center gap-2">
                    <div className='relative shrink-0 cursor-pointer' onClick={() => navigate('/profile')}>
                        <img
                            src={userData?.image || defaultAvatar}
                            alt="Me"
                            className='w-9 h-9 rounded-md object-cover hover:opacity-80 transition-opacity'
                        />
                        <span className='absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[#0B0D12]'></span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{userData?.name || 'Me'}</p>
                        <p className="text-xs text-[var(--color-text-muted)] truncate">Online</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <button onClick={handleLogout} className="w-8 h-8 rounded flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-status-error)] hover:bg-[#1E2430] transition-colors" title="Sign Out">
                            <IoLogOutOutline className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

        </aside>
    )
}

export default Sidebar
