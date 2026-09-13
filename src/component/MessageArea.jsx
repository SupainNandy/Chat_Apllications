import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";
import SenderMessage from "./SenderMessage";
import ReciverMessage from "./ReciverMessage";
import { serverUrl } from "../config";
import axios from "axios";
import { 
  IoMenuOutline, 
  IoEllipsisVertical,
  IoMicOutline,
  IoImageOutline,
  IoCloseOutline
} from "react-icons/io5";
import { RiSendPlane2Fill, RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const MessageArea = () => {
  const dispatch = useDispatch();
  const { selectedUser, userData, onlineUser, socket } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  
  const messagesEndRef = useRef(null);
  const emptyStateRef = useRef(null);
  const pickerRef = useRef(null);
  const imageInputRef = useRef(null);

  const defaultAvatar = "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80";
  const isChatSelected = Boolean(selectedUser);
  const isOnline = selectedUser && onlineUser ? onlineUser.includes(selectedUser._id) : false;

  useGSAP(() => {
    if (!isChatSelected && emptyStateRef.current) {
        gsap.from(emptyStateRef.current, { scale: 0.95, opacity: 0, duration: 0.5, ease: "power2.out" });
    }
  }, [isChatSelected]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (e) => {
        if (pickerRef.current && !pickerRef.current.contains(e.target)) {
            setShowPicker(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }
  };

  const onEmojiClick = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if ((!input.trim() && !backendImage) || isSending || !selectedUser) return;

    try {
      setIsSending(true);
      const formData = new FormData();
      if (input.trim()) formData.append("message", input);
      if (backendImage) formData.append("image", backendImage);

      const result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData, {
        withCredentials: true
      });

      dispatch(setMessages([...messages, result.data.data]));
      setInput("");
      setBackendImage(null);
      setFrontendImage(null);
      setShowPicker(false);
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`${serverUrl}/api/message/delete/${messageId}`, { withCredentials: true });
      dispatch(setMessages(messages.filter((msg) => msg._id !== messageId)));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  useEffect(() => {
    socket?.on("newMessage", (message) => {
      if (selectedUser?._id === message.sender) {
        dispatch(setMessages([...messages, message]));
      }
    });
    socket?.on("messageDeleted", (messageId) => {
      dispatch(setMessages(messages.filter((msg) => msg._id !== messageId)));
    });
    return () => {
      socket?.off("newMessage");
      socket?.off("messageDeleted");
    };
  }, [messages, dispatch, socket, selectedUser]);

  const getDateLabel = (dateString) => {
    if (!dateString) return "Today";
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  const renderMessages = () => {
    let lastDate = null;
    
    if (!messages || messages.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-muted)] py-12 gap-3">
          <div className="w-12 h-12 rounded-full bg-[#1E2430] flex items-center justify-center text-[var(--color-text-secondary)]">
            <span className="text-xl">👋</span>
          </div>
          <div className="text-center">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">No messages yet</h3>
              <p className="text-xs mt-1">Send a message to start the conversation.</p>
          </div>
        </div>
      );
    }

    return messages.map((message, index) => {
      const messageDate = new Date(message.createdAt || new Date()).toDateString();
      let showDateSeparator = false;
      
      if (messageDate !== lastDate) {
        showDateSeparator = true;
        lastDate = messageDate;
      }

      const isSender = message.sender === userData?._id;

      return (
        <React.Fragment key={message._id || index}>
          {showDateSeparator && (
            <div className="flex items-center justify-center my-6">
                <div className="bg-[#1E2430] text-[var(--color-text-secondary)] text-[11px] font-semibold px-3 py-1 rounded-full border border-[var(--color-border-subtle)]">
                    {getDateLabel(message.createdAt)}
                </div>
            </div>
          )}
          {isSender ? (
            <SenderMessage
              image={message.image}
              message={message.message}
              avatar={userData?.image || defaultAvatar}
              time={message.createdAt}
              onDelete={() => handleDeleteMessage(message._id)}
            />
          ) : (
            <ReciverMessage
              image={message.image}
              message={message.message}
              avatar={selectedUser?.image || defaultAvatar}
              time={message.createdAt}
              onDelete={() => handleDeleteMessage(message._id)}
            />
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <main className={`flex-1 h-full flex flex-col min-w-0 bg-[var(--color-chat-bg)] ${selectedUser ? 'flex' : 'hidden md:flex'}`}>
      
      {/* Header */}
      {isChatSelected && (
        <header className="h-[68px] shrink-0 px-4 flex items-center justify-between border-b border-[var(--color-border-subtle)] bg-[var(--color-app-bg)]/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            {/* Mobile Back Button */}
            <button 
              onClick={() => dispatch(setSelectedUser(null))}
              className="w-8 h-8 rounded-md flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[#1E2430] md:hidden transition-colors"
            >
              <IoMenuOutline className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <img src={selectedUser?.image || defaultAvatar} alt={selectedUser?.name} className="w-10 h-10 rounded-full object-cover group-hover:opacity-90 transition-opacity" />
                {isOnline && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[var(--color-status-online)] ring-2 ring-[var(--color-app-bg)]" />}
              </div>
              <div>
                <h2 className="font-bold text-[15px] text-[var(--color-text-primary)] leading-tight">{selectedUser?.name}</h2>
                <p className="text-[12px] text-[var(--color-text-secondary)]">{isOnline ? 'Online' : 'Offline'}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button className="w-8 h-8 rounded-md flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[#1E2430] transition-colors" title="More">
              <IoEllipsisVertical className="w-5 h-5" />
            </button>
          </div>
        </header>
      )}

      {/* Messages */}
      <div className="flex-1 min-h-0 flex flex-col relative overflow-hidden">
        {!isChatSelected ? (
          <div ref={emptyStateRef} className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
            <div className="w-16 h-16 rounded-2xl bg-[#1E2430] flex items-center justify-center mb-6 text-[var(--color-primary)]">
              <span className="text-4xl leading-none font-bold">◈</span>
            </div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Start a conversation</h2>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">Select a conversation from the sidebar or start a new direct message.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {renderMessages()}
            <div ref={messagesEndRef} className="h-2" />
          </div>
        )}
      </div>

      {/* Composer */}
      {isChatSelected && (
        <div className="w-full shrink-0 px-4 pb-6 pt-2 bg-[var(--color-chat-bg)] relative">
          
          {/* Emoji Picker Popover */}
          {showPicker && (
              <div ref={pickerRef} className="absolute bottom-24 left-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <EmojiPicker 
                      onEmojiClick={onEmojiClick} 
                      theme="dark"
                      autoFocusSearch={false}
                  />
              </div>
          )}

          <div className="relative max-w-4xl mx-auto">
            {/* Image Preview */}
            {frontendImage && (
                <div className="mb-3 relative inline-block animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <img src={frontendImage} alt="preview" className="h-32 rounded-xl border border-[var(--color-border-subtle)] object-cover shadow-lg" />
                    <button 
                        type="button" 
                        onClick={() => { setFrontendImage(null); setBackendImage(null); }} 
                        className="absolute -top-2 -right-2 bg-[#EF4444] text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                    >
                        <IoCloseOutline className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Composer Input Area */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-[#1E2430] border border-[var(--color-border-subtle)] rounded-xl p-1.5 focus-within:border-[var(--color-primary)] focus-within:shadow-[0_0_0_1px_var(--color-primary)] transition-all">
              
              <div className="flex items-center gap-1 shrink-0 pl-1">
                  <button type="button" onClick={() => setShowPicker(!showPicker)} className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border-subtle)] transition-colors cursor-pointer">
                      <RiEmojiStickerLine className="w-5 h-5" />
                  </button>
                  <button type="button" onClick={() => imageInputRef.current?.click()} className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border-subtle)] transition-colors cursor-pointer">
                      <IoImageOutline className="w-5 h-5" />
                  </button>
              </div>

              <input type="file" ref={imageInputRef} hidden accept="image/*" onChange={handleImageChange} />

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message @${selectedUser?.userName || selectedUser?.name}`}
                className="flex-1 min-w-0 bg-transparent text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] border-none outline-none py-2.5 h-10 px-3"
              />

              <div className="flex items-center gap-1 shrink-0 pr-1">
                  {!input.trim() ? (
                      <button type="button" className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border-subtle)] transition-colors cursor-pointer">
                          <IoMicOutline className="w-5 h-5" />
                      </button>
                  ) : (
                      <button 
                        type="submit" 
                        disabled={isSending}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <RiSendPlane2Fill className="w-4 h-4 ml-0.5" />
                      </button>
                  )}
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default MessageArea;
