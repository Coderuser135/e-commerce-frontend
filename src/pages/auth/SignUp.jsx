import React, { useEffect } from 'react'
import { useState } from 'react';
import lockIcon from "../../assets/image.jpg"
import signupIcon from "../../assets/signupIcon.jpg"
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { register } from '../../features/Store/reducers/auth.reducer.js';
import Loading from '../../components/Loading.jsx';
import { toast } from 'react-toastify';
import ButtonLoading from '../../components/ButtonLoading.jsx';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const registerEmail = useSelector(state => state.auth.registerEmail)
  const token = useSelector(state => state.auth.token)
  const loading = useSelector(state => state.auth.loading)
  console.log(loading)
  console.log(token)
  const [storeEmail, setEmail] = useState(() => {
    const savedEmail = localStorage.getItem("email")
    return savedEmail ? JSON.parse(savedEmail) : ""
  })
  console.log(storeEmail)
  const dispath = useDispatch()
  const nevigate = useNavigate()
  const status = useSelector(state => state.auth.status)
  const [inputData, setInputData] = useState({
    fullName: "",
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
  const { fullName, email, password } = inputData
  const showPasswordHandler = () => {
    setShowPassword(!showPassword)
  }
  const registerAccountHandler = async () => {
    if(!fullName || !email || !password){
      return toast.error("All fields are required")
    }
    if(!email.includes("@gmail.com")){
      return toast.error("Plese check gmail formate")
    }
    if(loading === true) return
    try {
     const response =  await dispath(register(inputData)).unwrap()
      if(response.status === 201 || response?.success){
        localStorage.setItem("email", JSON.stringify(email))
        nevigate("/email-verifyMessage")
      }
    } catch (error) {
      console.log(`signup api call error: ${error.message}`)
    }
  }
  return (
    /* Responsive update: keep the signup page centered with safe mobile padding and natural vertical scrolling. */
    <div className={`min-h-screen w-full bg-[#8FA28A] flex flex-col justify-center items-center px-4 py-6 sm:px-6`}>
      {/* Responsive update: make the signup card fluid on phones while retaining a readable maximum width. */}
      <div className='pb-5 w-full max-w-[17.5rem] sm:max-w-[19rem] border-bl-2 bg-[#19445a] border-br-2 border-solid border-[#dad2d2] rounded-xl shadow-2xl active:scale-105 transition-all duration-75 overflow-hidden'>
        {/* lock icon */}
        {/* Responsive update: scale the header/icon and heading for mobile readability. */}
        <div className='h-32 sm:h-36 w-full rounded-tl-xl rounded-tr-xl flex flex-col justify-center mb-4 gap-2'>
          <div className='h-5 w-full mt-5 flex justify-center items-center'>
            <h1 className='text-xl sm:text-2xl text-white font-sans'>SIGN UP</h1>
          </div>
          <div className='w-full flex justify-center'>
            <div className='h-20 w-20 bg-[#D3D4C0] mt-2'>
              <div>
                <img src={signupIcon} className='w-full h-full aspect-square object-contain rounded-full' />
              </div>
            </div>
          </div>
        </div>
        {/* input fields */}
        {/* Responsive update: use full-width controls with comfortable mobile tap height and responsive text sizing. */}
        <div className='w-full px-4 sm:px-5 flex flex-col gap-2'>
          {/* fullName fields */}
          <div className='flex relative'>
            {/* email icon */}
            <div className='absolute top-2.25 left-2'>
              <h1 className='text-[16px] text-gray-500'><FaUser /></h1>
            </div>
            <input
              type='text'
              placeholder='Full Name'
              value={fullName}
              onChange={inputDataHandler}
              name="fullName"
              className='h-10 w-full min-w-0 border-[1.5px] rounded-lg border-white bg-white px-8 text-sm sm:text-base focus:outline-none' />
          </div>
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
              className='h-10 w-full min-w-0 border-[1.5px] rounded-lg border-white bg-white px-8 text-sm sm:text-base focus:outline-none' />
          </div>
          {/* password fields */}
          <div className='flex relative'>
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
              className='h-10 w-full min-w-0 border-[1.5px] rounded-lg border-white bg-white px-8 pr-10 text-sm sm:text-base focus:outline-none' />
            {/* show password icon */}
            <div className='absolute top-2.25 right-2'>
              <button onClick={showPasswordHandler} className='text-xl text-gray-500 p-0.5'>{showPassword ? <FaRegEye /> : <FaEyeSlash />}</button>
            </div>
          </div>
          {/* Login button */}
          <div>
            {/* Responsive update: make the primary action touch-friendly and consistent across phone/tablet/desktop. */}
            <button onClick={registerAccountHandler} disabled={loading} className='py-2 min-h-10 w-full rounded-2xl text-sm sm:text-[16px] text-[#E1E100] bg-[#FF8F00] mt-2 font-medium'>{loading === true ? <ButtonLoading /> : "Create Account"}</button>
          </div>
          {/* singup routes */}
          <div className='h-full w-full flex justify-center items-center text-center px-1 pb-1'>
            <div>
              {/* Responsive update: allow the account message to wrap cleanly on narrow screens. */}
              <h1 className='text-xs sm:text-[13.5px] leading-5 font-sans text-gray-600'>Already have an account? <Link to={"/login"} className='text-[#FF8F00]'>Login here</Link></h1>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signup
