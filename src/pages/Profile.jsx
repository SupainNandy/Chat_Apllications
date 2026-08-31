import React, { useRef, useState } from "react";
import { IoCameraOutline, IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { serverUrl } from "../config.js";
import { setUserData } from "../redux/userSlice.js";

const Profile = () => {
  // Get user data from Redux
  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Name state
  const [name, setName] = useState(userData?.name || "");

  // Frontend image preview
  const [frontendImage, setFrontendImage] = useState(
    userData?.image ||
      "https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80"
  );

  // Image file for backend
  const [backend, setBackend] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // File input reference
  const image = useRef();

  // ========================================
  // Handle Image
  // ========================================
  const handleImage = (e) => {
    // Get selected file
    const file = e.target.files[0];

    // If no file selected
    if (!file) {
      return;
    }

    // Save image file
    setBackend(file);

    // Create image preview
    const imageUrl = URL.createObjectURL(file);

    setFrontendImage(imageUrl);
  };

  // ========================================
  // Handle Form Submit
  // ========================================
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();

    try {
      setLoading(true);

      // Create FormData
      const formData = new FormData();

      // Add name
      formData.append("name", name);

      // Add image only if user selected one
      if (backend) {
        formData.append("image", backend);
      }

      // Send request to backend
      const result = await axios.put(
        `${serverUrl}/api/user/profile`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Profile Updated:", result.data);

      // Update Redux user data
      dispatch(setUserData(result.data.user));

      // Update frontend image
      if (result.data.user?.image) {
        setFrontendImage(result.data.user.image);
      }

      alert("Profile updated successfully!");

    } catch (error) {
      console.log("Profile Update Error:", error);

      if (error.response) {
        console.log("Backend Error:", error.response.data);

        alert(
          error.response.data.message ||
            "Profile update failed"
        );
      } else {
        alert("Something went wrong. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center items-center p-4 relative">

      {/* ========================================
          Back Button
      ======================================== */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 w-[45px] h-[45px] bg-white rounded-full shadow-md flex justify-center items-center cursor-pointer hover:bg-[#20c7ff] hover:text-white transition"
      >
        <IoArrowBack className="w-[25px] h-[25px]" />
      </div>

      {/* ========================================
          Profile Image
      ======================================== */}
      <div className="relative mb-8">

        {/* Image */}
        <div
          onClick={() => image.current.click()}
          className="w-[180px] h-[180px] bg-white rounded-full border-4 border-[#20c7ff] shadow-lg shadow-gray-400 flex justify-center items-center overflow-hidden cursor-pointer"
        >
          <img
            src={frontendImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Camera Button */}
        <div
          onClick={() => image.current.click()}
          className="absolute bottom-2 right-2 w-[45px] h-[45px] bg-[#20c7ff] rounded-full flex justify-center items-center shadow-md cursor-pointer hover:bg-[#0fb8e8] transition"
        >
          <IoCameraOutline className="w-[25px] h-[25px] text-white" />
        </div>

      </div>

      {/* ========================================
          Hidden File Input
      ======================================== */}
      <input
        type="file"
        hidden
        accept="image/*"
        ref={image}
        onChange={handleImage}
      />

      {/* ========================================
          Form
      ======================================== */}
      <div className="w-full max-w-[450px] bg-white p-6 rounded-xl shadow-lg shadow-gray-300">

        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Edit Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          {/* ========================================
              Name
          ======================================== */}
          <div>
            <label className="block mb-2 text-gray-600 font-semibold">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[50px] px-4 outline-none border-2 border-gray-200 rounded-lg shadow-sm text-[17px] focus:border-[#20c7ff]"
            />
          </div>

          {/* ========================================
              Username
          ======================================== */}
          <div>
            <label className="block mb-2 text-gray-600 font-semibold">
              Username
            </label>

            <input
              type="text"
              value={userData?.userName || ""}
              placeholder="Username"
              readOnly
              className="w-full h-[50px] px-4 outline-none border-2 border-gray-200 bg-gray-100 rounded-lg shadow-sm text-[17px] text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* ========================================
              Email
          ======================================== */}
          <div>
            <label className="block mb-2 text-gray-600 font-semibold">
              Email
            </label>

            <input
              type="email"
              value={userData?.email || ""}
              placeholder="Email"
              readOnly
              className="w-full h-[50px] px-4 outline-none border-2 border-gray-200 bg-gray-100 rounded-lg shadow-sm text-[17px] text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* ========================================
              Save Button
          ======================================== */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[50px] bg-[#20c7ff] text-white font-bold text-[17px] rounded-lg shadow-md hover:bg-[#0fb8e8] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Profile;