import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";


const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  // let userData=useSelector((state=>state.user))
  // console.log(userData)

  // Yup Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .required("Username is required"),

    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
  try {
    // 1. Get values from the form
    const username = values.username;
    const name = values.name;
    const email = values.email;
    const password = values.password;

    // 2. Create the data that we want to send to backend
    const userData = {
      userName: username,
      name: name,
      email: email,
      password: password,
    };

    // 3. Send POST request to backend
    const response = await axios.post(
      `${serverUrl}/api/auth/create`,
      userData,
      {
        withCredentials: true,
      }
    );

    // 4. Check the response
    console.log("Server Response:", response.data);

    dispatch(setUserData(response.data.user || response.data))

    // 5. Show success message
    alert("Signup Successful!");
    

    // 6. Go to login page
    navigate("/login");

  } catch (error) {
    // 7. If something goes wrong
    console.log("Signup Error:", error);

    // 8. Check if backend sent an error
    if (error.response) {
      console.log("Backend Error:", error.response.data);

      alert(
        error.response.data.message || "Signup failed"
      );
    } else {
      // Network or other error
      alert("Something went wrong. Please try again.");
    }

  } finally {
    // 9. Stop the loading state
    setSubmitting(false);
  }
},
  });

  return (
    <div className="w-full min-h-screen bg-slate-200 flex justify-center items-center p-4">
      <div className="w-full max-w-[500px] min-h-[600px] bg-white rounded-lg shadow-lg shadow-gray-400 flex flex-col gap-[30px] overflow-hidden">

        {/* Header */}
        <div className="w-full h-[200px] bg-[#19cdff] rounded-b-[40%] shadow-lg shadow-gray-400 flex items-center justify-center">
          <h1 className="text-gray-600 font-bold text-[30px]">
            Welcome to <span className="text-white">Chartly</span>
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col items-center gap-[20px] pb-8"
        >

          {/* Username */}
          <div className="w-[90%]">
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-[50px] px-4 outline-none border-2 rounded-lg shadow-lg shadow-gray-300 text-[17px] ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : "border-[#20c7ff]"
              }`}
            />

            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Name */}
          <div className="w-[90%]">
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-[50px] px-4 outline-none border-2 rounded-lg shadow-lg shadow-gray-300 text-[17px] ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-[#20c7ff]"
              }`}
            />

            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="w-[90%]">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-[50px] px-4 outline-none border-2 rounded-lg shadow-lg shadow-gray-300 text-[17px] ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-[#20c7ff]"
              }`}
            />

            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="w-[90%]">
            <div className="relative w-full h-[50px] rounded-lg shadow-lg shadow-gray-300">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full h-full px-4 pr-16 outline-none border-2 rounded-lg text-[17px] ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-[#20c7ff]"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#20c7ff] transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-[200px] mt-[20px] py-[10px] font-bold bg-[#19cdff] text-white text-[18px] rounded-lg shadow-lg shadow-gray-300 hover:bg-[#0fb8e8] hover:shadow-inner transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Login */}
          <p className="cursor-pointer">
            Already have an account?{" "}
            <span
              className="text-[#20c7ff] font-bold"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default SignUp;