import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();

  // Show / Hide password
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  // let userData = useSelector(state=>state.user)
  // console.log(userData)

  // =================================
  // Yup Validation
  // =================================
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // =================================
  // Formik
  // =================================
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Get email and password
        const email = values.email;
        const password = values.password;

        // Data that we send to backend
        const loginData = {
          email: email,
          password: password,
        };

        console.log("Login Data:", loginData);

        // Send request to backend
        const response = await axios.post(
          `${serverUrl}/api/auth/login`,
          loginData,
          {
            withCredentials: true,
          }
        );

        // Backend response
        console.log("Login Response:", response.data);
        dispatch(setUserData(response.data.user))
        // Login successful
        alert("Login Successful!");


        // Go to home page
        navigate("/");

      } catch (error) {
        console.log("Login Error:", error);

        // Backend returned an error
        if (error.response) {
          console.log(
            "Backend Error:",
            error.response.data
          );

          alert(
            error.response.data.message ||
            "Invalid email or password"
          );

        } else {
          // Server/network error
          alert(
            "Something went wrong. Please try again."
          );
        }

      } finally {
        // Stop loading
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full min-h-screen bg-slate-200 flex justify-center items-center p-4">

      {/* Main Card */}
      <div className="w-full max-w-[500px] min-h-[550px] bg-white rounded-lg shadow-lg shadow-gray-400 flex flex-col overflow-hidden">

        {/* =================================
            Header
        ================================= */}
        <div className="w-full h-[200px] bg-[#19cdff] rounded-b-[40%] shadow-lg shadow-gray-400 flex items-center justify-center">

          <h1 className="text-gray-600 font-bold text-[30px]">
            Welcome Back
          </h1>

        </div>

        {/* =================================
            Login Form
        ================================= */}
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col items-center gap-[20px] pt-8 pb-8"
        >

          {/* =================================
              Email
          ================================= */}
          <div className="w-[90%]">

            <label className="block mb-2 text-gray-600 font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-[50px] px-4 outline-none border-2 rounded-lg shadow-lg shadow-gray-300 text-[17px] ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-[#20c7ff]"
              }`}
            />

            {/* Email Error */}
            {formik.touched.email &&
              formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}

          </div>

          {/* =================================
              Password
          ================================= */}
          <div className="w-[90%]">

            <label className="block mb-2 text-gray-600 font-semibold">
              Password
            </label>

            <div className="relative w-full">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full h-[50px] px-4 pr-[70px] outline-none border-2 rounded-lg shadow-lg shadow-gray-300 text-[17px] ${
                  formik.touched.password &&
                  formik.errors.password
                    ? "border-red-500"
                    : "border-[#20c7ff]"
                }`}
              />

              {/* Show / Hide Password */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold hover:text-[#20c7ff] transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            {/* Password Error */}
            {formik.touched.password &&
              formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}

          </div>

          {/* =================================
              Forgot Password
          ================================= */}
          <div className="w-[90%] flex justify-end">

            <span
              onClick={() =>
                navigate("/forgot-password")
              }
              className="text-[#20c7ff] font-semibold cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>

          </div>

          {/* =================================
              Login Button
          ================================= */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-[200px] mt-2 py-3 font-bold bg-[#19cdff] text-white text-[18px] rounded-lg shadow-lg shadow-gray-300 hover:bg-[#0fb8e8] hover:shadow-inner transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting
              ? "Logging In..."
              : "Login"}
          </button>

          {/* =================================
              Sign Up
          ================================= */}
          <p className="text-gray-600">

            Don't have an account?{" "}

            <span
              onClick={() => navigate("/signup")}
              className="text-[#20c7ff] font-bold cursor-pointer hover:underline"
            >
              Sign Up
            </span>

          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;