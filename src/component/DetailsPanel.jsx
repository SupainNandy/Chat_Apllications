import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IoCloseOutline, IoNotificationsOutline, IoDocumentTextOutline, IoImageOutline, IoStarOutline } from "react-icons/io5"
import { setSelectedUser } from '../redux/userSlice'

const DetailsPanel = ({ isOpen, onClose }) => {
    const { selectedUser, onlineUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    if (!selectedUser) return null

    const defaultAvatar = "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80"
    const isOnline = onlineUser ? onlineUser.includes(selectedUser._id) : false

    return (
        <aside className={`absolute xl:relative right-0 top-0 w-[300px] h-full flex-shrink-0 bg-[var(--color-sidebar-bg)] border-l border-[var(--color-border-subtle)] flex flex-col z-30 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'}`}>
            {/* Header */}
            <div className="h-[68px] px-4 flex items-center justify-between border-b border-[var(--color-border-subtle)] shrink-0 bg-[var(--color-app-bg)]">
                <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">Conversation</h2>
                <button 
                    onClick={onClose}
                    className="w-8 h-8 rounded-md flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border-subtle)] transition-colors xl:hidden"
                    title="Close Details"
                >
                    <IoCloseOutline className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Profile Section */}
                <div className="p-6 flex flex-col items-center border-b border-[var(--color-border-subtle)]">
                    <div className="relative mb-4">
                        <img 
                            src={selectedUser.image || defaultAvatar} 
                            alt={selectedUser.name} 
                            className="w-24 h-24 rounded-full object-cover border-2 border-[var(--color-border-subtle)]"
                        />
                        {isOnline && (
                            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[var(--color-status-online)] ring-4 ring-[var(--color-sidebar-bg)]" title="Online"></span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] text-center truncate w-full">{selectedUser.name}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">@{selectedUser.userName}</p>
                    {isOnline && (
                        <div className="mt-3 px-3 py-1 bg-[#1A2624] text-[var(--color-status-online)] text-xs font-medium rounded-full flex items-center gap-1.5 border border-[#183626]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-online)]"></span>
                            Online
                        </div>
                    )}
                </div>

                {/* Info Sections */}
                <div className="p-4 space-y-6">
                    
                    {/* Shared Media Mock */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Shared Media</h4>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-square rounded-md bg-[#1E2430] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-primary)] transition-colors cursor-pointer">
                                    <IoImageOutline className="w-5 h-5" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Files Mock */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Files</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1E2430] cursor-pointer transition-colors group">
                                <div className="w-8 h-8 rounded bg-[#1E2430] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-app-bg)] transition-colors">
                                    <IoDocumentTextOutline className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-[var(--color-text-primary)] truncate">project-guidelines.pdf</p>
                                    <p className="text-xs text-[var(--color-text-secondary)]">2.4 MB</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1E2430] cursor-pointer transition-colors group">
                                <div className="w-8 h-8 rounded bg-[#1E2430] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-app-bg)] transition-colors">
                                    <IoDocumentTextOutline className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-[var(--color-text-primary)] truncate">design-assets.fig</p>
                                    <p className="text-xs text-[var(--color-text-secondary)]">14.1 MB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Settings Mock */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-[#1E2430] cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                                <IoStarOutline className="w-5 h-5 text-[var(--color-text-secondary)]" />
                                <span className="text-sm text-[var(--color-text-primary)]">Starred Messages</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-[#1E2430] cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                                <IoNotificationsOutline className="w-5 h-5 text-[var(--color-text-secondary)]" />
                                <span className="text-sm text-[var(--color-text-primary)]">Notifications</span>
                            </div>
                            <span className="text-xs font-medium text-[var(--color-text-secondary)] bg-[#1E2430] px-2 py-0.5 rounded">Enabled</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </aside>
    )
}

export default DetailsPanel
