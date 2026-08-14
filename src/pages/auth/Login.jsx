import React, { useEffect } from 'react'
import { useState } from 'react';
import lockIcon from "../../assets/image.jpg"
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/Store/reducers/auth.reducer.js';
import { toast } from 'react-toastify';
import ButtonLoading from '../../components/ButtonLoading.jsx';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const loading = useSelector(state => state.auth.loading)
  console.log(loading)
  const nevigate = useNavigate()
  const dispatch = useDispatch()
  const loginStatus = useSelector(state => state.auth.status)
  const [inputData, setInputData] = useState({
    email: "",
    password: ""
  })
  const inputDataHandler = (e) => {
    const { value, name } = e.target
    setInputData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const { email, password } = inputData
  const showPasswordHandler = () => {
    setShowPassword(!showPassword)
  }
  const loginHandler = () => {
    if(loading === true) return
    if(!email || !password){
      return toast.error("Email or Password is required")
    }
    if(!email.includes("@gmail.com")){
      return toast.error("Plese check your email formate")
    }
    dispatch(login(inputData))
  }
  const sendOtpEmailRouteHandler = () => {
    nevigate("/sendOtp-email")
  }
  return (
    /* Responsive update: keep the login page viewport-safe with mobile-friendly horizontal padding. */
    <div className={`min-h-screen w-full bg-[#FFE2E2] flex flex-col justify-center items-center px-4 py-6 sm:px-6`}>
      {/* Responsive update: login card uses fluid width on phones and the original capped width on larger screens. */}
      <div className='w-full max-w-[17.5rem] sm:max-w-[19rem] border-bl-2 border-br-2 border-solid border-[#dad2d2] rounded-xl shadow-2xl bg-[#eedcdc] active:scale-105 transition-all duration-75 relative overflow-hidden'>
        {/* lock icon */}
        {/* Responsive update: scale the header and icon slightly for smaller screens while preserving the original visual hierarchy. */}
        <div className='h-28 sm:h-32 w-full border-2 border-solid border-blue-600 bg-blue-600 rounded-tl-xl rounded-tr-xl flex justify-center mb-16'>
          <div className='h-5 w-full mt-5 flex justify-center items-center'>
            <h1 className='text-xl sm:text-2xl text-white font-sans'>LOGIN</h1>
          </div>
          <div className='h-24 w-24 sm:h-25 sm:w-25 bg-[#D3D4C0] rounded-full absolute top-14 sm:top-15'>
            <div>
              <img src={lockIcon} className='w-full h-full aspect-square object-contain rounded-full' />
            </div>
          </div>
        </div>
        {/* input fields */}
        {/* Responsive update: keep form controls comfortably sized and full-width within the mobile card. */}
        <div className='w-full px-4 sm:px-5 flex flex-col gap-2 pb-5'>
          {/* email fields */}
          <div className='flex relative'>
            {/* email icon */}
            <div className='absolute top-2.25 left-2'>
              <h1 className='text-xl text-gray-500'><MdEmail /></h1>
            </div>
            <input
              type='text'
              placeholder='Email'
              name='email'
              value={email}
              onChange={inputDataHandler}
              className='h-10 w-full min-w-0 border-[1.5px] rounded-[5px] border-[#979595] px-8 text-sm sm:text-base focus:outline-none' />
          </div>
          {/* password fields */}
          <div className='flex flex-col relative'>
            {/* lock icon */}
            <div className='absolute top-2.25 left-2'>
              <h1 className='text-xl text-gray-500'><IoIosLock /></h1>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Password'
              name='password'
              value={password}
              onChange={inputDataHandler}
              className='h-10 w-full min-w-0 border-[1.5px] rounded-[5px] border-[#979595] px-8 pr-10 text-sm sm:text-base focus:outline-none' />
            {/* show password icon */}
            <div className='absolute top-2.25 right-2'>
              <button onClick={showPasswordHandler} className='text-xl text-gray-500 p-0.5'>{showPassword ? <FaRegEye /> : <FaEyeSlash />}</button>
            </div>
            <div className='flex justify-end'>
              {/* Responsive update: keep the recovery action readable without increasing the card width on mobile. */}
              <button onClick={sendOtpEmailRouteHandler} className='text-sm sm:text-[15px] font-sans mt-[1.5px] text-gray-600 py-1'>Forget password?</button>
            </div>
          </div>
          {/* Login button */}
          <div>
            {/* Responsive update: use a touch-friendly button height on mobile. */}
            <button disabled={loading} onClick={loginHandler} className='py-2 w-full min-h-10 border rounded-2xl text-sm sm:text-[16px] text-white bg-blue-500 mt-2 font-medium'>{loading === true ? <ButtonLoading /> : "Login"}</button>
          </div>
          {/* singup routes */}
          <div className='h-full w-full flex justify-center items-center text-center px-1'>
            <div>
              {/* Responsive update: allow the signup message to wrap naturally on narrow screens. */}
              <h1 className='text-xs sm:text-[13.5px] font-sans text-gray-600 leading-5'>Don't have an account? <Link to={"/"} className='text-blue-600'>Sign up here</Link></h1>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
