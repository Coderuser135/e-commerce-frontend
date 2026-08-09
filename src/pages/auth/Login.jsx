import React, { useEffect } from 'react'
import { useState } from 'react';
import lockIcon from "../../assets/image.jpg"
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Store/slice/auth.reduer.js';
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
    <div className={`min-h-screen max-w-screen bg-[#FFE2E2] flex flex-col justify-center items-center`}>
      <div className='h-95 w-70 border-bl-2 border-br-2 border-solid  border-[#dad2d2] rounded-xl shadow-2xl bg-[#eedcdc] active:scale-105 transition-all duration-75 relative'>
        {/* lock icon */}
        <div className='h-28 w-full border-2 border-solid border-blue-600 bg-blue-600 rounded-tl-xl rounded-tr-xl flex justify-center mb-16'>
          <div className='h-5 w-full mt-5 flex justify-center items-center'>
            <h1 className='text-2xl text-white font-sans'>LOGIN</h1>
          </div>
          <div className='h-25 w-25 bg-[#D3D4C0] rounded-full absolute top-15'>
            <div>
              <img src={lockIcon} className='aspect-square object-contain rounded-full' />
            </div>
          </div>
        </div>
        {/* input fields */}
        <div className='w-full px-4 flex flex-col gap-2'>
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
              className='h-9 w-full border-[1.5px] rounded-[5px] border-[#979595] px-8 focus:outline-none' />
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
              className='h-9 w-full border-[1.5px] rounded-[5px] border-[#979595] px-8 focus:outline-none' />
            {/* show password icon */}
            <div className='absolute top-2.25 right-2'>
              <button onClick={showPasswordHandler} className='text-xl text-gray-500'>{showPassword ? <FaRegEye /> : <FaEyeSlash />}</button>
            </div>
            <div className='flex justify-end'>
              <button onClick={sendOtpEmailRouteHandler} className='text-[15px] font-sans mt-[1.5px] text-gray-600'>Forget password?</button>
            </div>
          </div>
          {/* Login button */}
          <div>
            <button disabled={loading} onClick={loginHandler} className='py-1.5 w-full border rounded-2xl text-[16px] text-white bg-blue-500 mt-2 font-medium'>{loading === true ? <ButtonLoading /> : "Login"}</button>
          </div>
          {/* singup routes */}
          <div className='h-full w-full flex justify-center items-center'>
            <div>
              <h1 className='text-[13.5px] font-sans text-gray-600'>Don't have an account? <Link to={"/"} className='text-blue-600'>Sign up here</Link></h1>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
