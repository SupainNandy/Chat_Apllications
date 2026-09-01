import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageArea = () => {
  const navigate = useNavigate();
  const { selectedUser, userData } = useSelector((state) => state.user);
  let dispatch=useDispatch()

  const defaultAvatar = "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80";

  const activeUser = selectedUser || userData;
  const isChatSelected = Boolean(selectedUser);

  return (
    <div className="lg:w-[70%] w-full h-full bg-slate-100 border-l-2 border-gray-300 hidden lg:flex lg:flex-col">
      <div className="relative w-full h-[90px] bg-[#2e9dc2] rounded-b-[28px] shadow-lg px-5 flex items-center">
        <div
          onClick={() => setSelectedUser(null)}
          className="absolute top-5 left-5 w-[40px] h-[40px] bg-white rounded-full shadow-md flex justify-center items-center cursor-pointer hover:bg-[#20c7ff] hover:text-white transition"
        >
          <IoArrowBack className="w-[22px] h-[22px]" />
        </div>

        <div className="ml-16 flex items-center gap-3 text-white">
          <div className="w-[48px] h-[48px] rounded-full overflow-hidden border-2 border-white bg-gray-200 flex justify-center items-center shadow-md">
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

      <div className="flex-1 p-4">
        {!isChatSelected ? (
          <div className="w-full h-full flex flex-col justify-center items-center text-slate-500">
            <h1 className="font-semibold text-4xl text-slate-700">Welcome</h1>
            <span className="mt-2 text-lg">{userData?.name || "User"}</span>
          </div>
        ) : (
          <div className="w-full h-full rounded-2xl bg-white/60 flex items-center justify-center text-slate-400 text-sm">
            Start chatting with {activeUser?.name || "this user"}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageArea;
