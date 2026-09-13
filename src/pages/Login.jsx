import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { serverUrl } from "../config";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline, IoArrowBackOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const container = useRef();

  useGSAP(() => {
      gsap.from(".auth-anim", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 });
  }, { scope: container });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(
          `${serverUrl}/api/auth/login`,
          {
            email: values.email,
            password: values.password,
          },
          {
            withCredentials: true,
          }
        );

        dispatch(setUserData(response.data.user || response.data));
        navigate("/");
      } catch (error) {
        console.error("Login Error:", error);
        alert(
          error.response?.data?.message ||
          "Invalid email or password. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleGoogleSignIn = async () => {
      try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          
          const response = await axios.post(`${serverUrl}/api/auth/google`, {
              email: user.email,
              name: user.displayName,
              photoURL: user.photoURL,
          }, { withCredentials: true });

          dispatch(setUserData(response.data.user || response.data));
          navigate("/");
      } catch (error) {
          console.error("Google Sign-In Error:", error);
          if (error.code !== "auth/popup-closed-by-user") {
              alert("Google Sign-In failed. Please try again.");
          }
      }
  };

  return (
    <div ref={container} className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#0B0D12] text-[var(--color-text-primary)] font-sans relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-[var(--color-primary)]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Back Button */}
      <Link to="/" className="absolute top-6 left-6 sm:top-10 sm:left-10 auth-anim flex items-center justify-center w-11 h-11 rounded-full bg-[#1E2430] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-all shadow-lg hover:-translate-x-1 cursor-pointer">
          <IoArrowBackOutline className="w-5 h-5" />
      </Link>

      {/* Brand Header */}
      <Link to="/" className="auth-anim flex items-center gap-2 text-[var(--color-primary)] mb-10">
          <span className="text-3xl leading-none font-bold">◈</span>
          <span className="font-bold text-2xl text-[var(--color-text-primary)] tracking-tight">ChatFlow</span>
      </Link>

      {/* Main Glass Card */}
      <div className="auth-anim w-full max-w-md bg-[#11141B] backdrop-blur-2xl rounded-3xl border border-[var(--color-border-subtle)] shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Log in to continue your conversations.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          
          {/* Email Field */}
          <div className="auth-anim">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5 ml-1">
              Email Address
            </label>
            <div className="relative">
              <IoMailOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full h-12 pl-11 pr-4 rounded-xl bg-[#1E2430] border text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-all font-medium ${
                  formik.touched.email && formik.errors.email
                    ? "border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20"
                    : "border-[var(--color-border-subtle)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                }`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-[#EF4444] text-xs mt-1.5 ml-1 font-medium">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="auth-anim">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <IoLockClosedOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full h-12 pl-11 pr-12 rounded-xl bg-[#1E2430] border text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-all font-medium ${
                  formik.touched.password && formik.errors.password
                    ? "border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20"
                    : "border-[var(--color-border-subtle)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition p-1 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IoEyeOffOutline className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-[#EF4444] text-xs mt-1.5 ml-1 font-medium">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="auth-anim pt-2">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full h-12 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-xl shadow-lg shadow-[var(--color-primary)]/20 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {formik.isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
          </div>

          <div className="auth-anim my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-[var(--color-border-subtle)] after:mt-0.5 after:flex-1 after:border-t after:border-[var(--color-border-subtle)]">
              <p className="mx-4 mb-0 text-center text-xs text-[var(--color-text-secondary)] font-medium">OR</p>
          </div>

          <button
              type="button"
              onClick={handleGoogleSignIn}
              style={{ display: "flex", opacity: 1, visibility: "visible" }}
              className="w-full min-h-[48px] h-12 bg-[#1E2430] hover:bg-[#252B36] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-3"
          >
              <FcGoogle className="w-5 h-5" />
              <span>Continue with Google</span>
          </button>

          {/* Sign Up Navigation */}
          <p className="auth-anim text-center text-sm text-[var(--color-text-secondary)] pt-4 border-t border-[var(--color-border-subtle)] mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[var(--color-primary)] font-bold hover:text-[var(--color-primary-hover)] transition-colors"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;