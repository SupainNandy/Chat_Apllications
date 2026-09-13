import React, { useRef, useState } from "react";
import { IoCameraOutline, IoArrowBack, IoPersonOutline, IoAtOutline, IoMailOutline, IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import { serverUrl } from "../config.js";
import { setUserData } from "../redux/userSlice.js";
import { useTheme } from "../context/ThemeContext";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState(userData?.name || "");
  const [frontendImage, setFrontendImage] = useState(
    userData?.image ||
      "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80"
  );
  const [backend, setBackend] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBackend(file);
    const imageUrl = URL.createObjectURL(file);
    setFrontendImage(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);

      if (backend) {
        formData.append("image", backend);
      }

      const result = await axios.put(
        `${serverUrl}/api/user/profile`,
        formData,
        {
          withCredentials: true,
        }
      );

      dispatch(setUserData(result.data.user));
      if (result.data.user?.image) {
        setFrontendImage(result.data.user.image);
      }

      navigate("/");
    } catch (error) {
      console.error("Profile Update Error:", error);
      alert(
        error.response?.data?.message || "Profile update failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 via-slate-50 to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950/20 relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Top Controls Bar */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
          title="Back to chat"
        >
          <IoArrowBack className="w-5 h-5" />
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          {theme === "dark" ? (
            <IoSunnyOutline className="w-5 h-5 text-amber-400" />
          ) : (
            <IoMoonOutline className="w-5 h-5 text-slate-700" />
          )}
        </button>
      </div>

      {/* Profile Card */}
      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl p-6 sm:p-8 transition-all my-12">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center mb-6 tracking-tight">
          Your Profile
        </h1>

        {/* Profile Avatar Uploader */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group cursor-pointer" onClick={() => imageInputRef.current?.click()}>
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 ring-4 ring-cyan-500/40 shadow-xl group-hover:ring-cyan-500 transition-all">
              <img
                src={frontendImage}
                alt="Profile"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <IoCameraOutline className="w-8 h-8" />
            </div>
            <div className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900 group-hover:scale-110 transition-transform">
              <IoCameraOutline className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-3">
            Tap photo to change avatar
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          hidden
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImage}
        />

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 ml-1">
              Full Name
            </label>
            <div className="relative">
              <IoPersonOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-medium"
              />
            </div>
          </div>

          {/* Username Field (Read-only) */}
          <div>
            <div className="flex items-center justify-between mb-1.5 ml-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Username
              </label>
              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                Permanent
              </span>
            </div>
            <div className="relative">
              <IoAtOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={userData?.userName || ""}
                readOnly
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/40 text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed font-medium"
              />
            </div>
          </div>

          {/* Email Field (Read-only) */}
          <div>
            <div className="flex items-center justify-between mb-1.5 ml-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Email
              </label>
              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                Permanent
              </span>
            </div>
            <div className="relative">
              <IoMailOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="email"
                value={userData?.email || ""}
                readOnly
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/40 text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed font-medium"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;