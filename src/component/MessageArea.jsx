import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { RiEmojiStickerFill, RiSendPlane2Fill } from "react-icons/ri";
import { FiImage } from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage";
import ReciverMessage from "./ReciverMessage";

const MessageArea = () => {
  let [showPicker,setShowPicker] = useState(false)
  const navigate = useNavigate();
  const { selectedUser, userData } = useSelector((state) => state.user);
  const [input,setInput] = useState("")
  let dispatch=useDispatch()

  const onEmojiClick=(e)=>{
    setInput(prev=>prev+e.emoji)
    setShowPicker(false)
  }

  const defaultAvatar = "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80";

  const activeUser = selectedUser || userData;
  const isChatSelected = Boolean(selectedUser);

  return (
    <div className="lg:w-[70%] w-full h-full bg-slate-100 border-l-2 border-gray-300 hidden lg:flex lg:flex-col">
      <div className="relative w-full h-[90px] shrink-0 bg-[#2e9dc2] rounded-b-[28px] shadow-lg px-5 flex items-center">
        <div
          onClick={() => setSelectedUser(null)}
          className="absolute top-5 left-5 w-[40px] h-[40px] bg-white rounded-full shadow-md flex justify-center items-center cursor-pointer hover:bg-[#20c7ff] hover:text-white transition"
        >
          <IoArrowBack className="w-[22px] h-[22px]" />
        </div>

        <div className="ml-16 flex items-center gap-3 text-white">
          <div className="w-[48px] h-[48px] shrink-0 rounded-full overflow-hidden border-2 border-white bg-gray-200 flex justify-center items-center shadow-md">
            <img
              src={activeUser?.image || defaultAvatar}
              alt="user profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-semibold text-lg">{activeUser?.name || "Select a user"}</h3>
            <p className="text-xs text-slate-100">
              {isChatSelected ? (activeUser?.isOnline ? "online" : "offline") : "welcome"}
            </p>
          </div>
        </div>
        
      </div>
    
      <div className="flex-1 min-h-0 p-4">
        {!isChatSelected ? (
          <div className="w-full h-full flex flex-col justify-center items-center text-slate-500">
            <h1 className="font-semibold text-4xl text-slate-700">Welcome</h1>
            <span className="mt-2 text-lg">{userData?.name || "User"}</span>
          </div>
        ) : (
          <div className="w-full h-full rounded-2xl bg-white/60 flex flex-col p-4 overflow-y-auto gap-4">
            <SenderMessage className="w-fit max-w-[500px] px-[20px] py-[10px] bg-[#1797c2] text-white text-[19px] rounded-2xl rounded-tr-none ml-auto shadow-md" />
            <ReciverMessage className="w-fit max-w-[500px] px-[20px] py-[10px] bg-white text-slate-700 text-[19px] rounded-2xl rounded-tl-none mr-auto shadow-md" />
            
          </div>
        )}
        
      </div>

       {selectedUser && 
        <div className="w-full lg:w-[70%]  lg:h-[100px] fixed-bottom-[20px] item-center justify-center">
          <form className="w-[95%] max-w-[60%] h-[60px] bg-[#1797c2] mx-auto rounded-full flex items-center justify-between relative">
            <div className="flex items-center justify-between">
              <RiEmojiStickerFill onClick={() => setShowPicker((prev) => !prev)} className='w-[25px] h-[25px] text-white cursor-pointer ml-5 '/>
              {showPicker && (
                <div className="absolute bottom-[75px] left-0 z-50">
                  <EmojiPicker onEmojiClick={onEmojiClick}/>
                </div>
              )}
              
            </div>
            <div className="flex items-center gap-3">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter Message..." className="bg-transparent text-white placeholder-white border-none outline-none " />
            </div>
            <div className="flex items-center gap-3">
              <FaImage className='w-[25px] h-[25px] text-white cursor-pointer '/>
            </div>
            <div>
              <RiSendPlane2Fill className='w-[25px] h-[25px] text-white cursor-pointer mr-5 '/>
            </div>
          </form>
        </div>
       }

    </div>
  );
};

export default MessageArea;
