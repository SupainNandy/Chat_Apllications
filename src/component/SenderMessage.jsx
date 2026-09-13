import React, { useRef } from 'react'
import { IoCheckmarkDone, IoTrashOutline, IoEllipsisHorizontal } from 'react-icons/io5'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const SenderMessage = ({ image, message, avatar, onDelete, time }) => {
    const msgRef = useRef();

    useGSAP(() => {
        gsap.from(msgRef.current, { y: 10, opacity: 0, duration: 0.3, ease: "power2.out" });
    }, []);

    return (
        <div ref={msgRef} className="flex w-full justify-end group">
            <div className="flex flex-row-reverse items-end max-w-[85%] md:max-w-[75%] gap-2">
                {/* Avatar */}
                <img 
                    src={avatar} 
                    alt="Me" 
                    className="w-7 h-7 rounded-full object-cover shrink-0 hidden sm:block" 
                />

                {/* Message Bubble Container */}
                <div className="flex flex-col items-end gap-1">
                    
                    {/* Hover Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-200">
                        <button onClick={onDelete} className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-status-error)] hover:bg-[#1E2430] transition-colors cursor-pointer" title="Delete">
                            <IoTrashOutline className="w-4 h-4" />
                        </button>
                        <button className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[#1E2430] transition-colors cursor-pointer" title="More">
                            <IoEllipsisHorizontal className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="bg-[var(--color-msg-user)] text-white px-4 py-2.5 rounded-[14px] rounded-br-sm shadow-sm">
                        {image && (
                            <img 
                                src={image} 
                                alt="attachment" 
                                className="w-full max-w-[240px] rounded-lg mb-2 object-cover border border-white/10" 
                            />
                        )}
                        {message && (
                            <p className="text-[14px] leading-relaxed whitespace-pre-wrap break-words font-medium">
                                {message}
                            </p>
                        )}
                    </div>
                    
                    {/* Metadata */}
                    <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] text-[var(--color-text-muted)] font-medium">
                            {time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <IoCheckmarkDone className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SenderMessage