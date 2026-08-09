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
import { register } from '../../Store/slice/auth.reduer.js';
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
    <div className={`min-h-screen max-w-screen bg-[#8FA28A] flex flex-col justify-center items-center`}>
      <div className='pb-4 w-70 border-bl-2 bg-[#19445a] border-br-2 border-solid  border-[#dad2d2] rounded-xl shadow-2xl active:scale-105 transition-all duration-75'>
        {/* lock icon */}
        <div className='h-36 w-full rounded-tl-xl rounded-tr-xl flex flex-col justify-center mb-4 gap-2'>
          <div className='h-5 w-full mt-5 flex justify-center items-center'>
            <h1 className='text-2xl text-white font-sans'>SIGN UP</h1>
          </div>
          <div className='w-full flex justify-center'>
            <div className='h-20 w-20 bg-[#D3D4C0] mt-2'>
              <div>
                <img src={signupIcon} className='aspect-square object-contain rounded-full' />
              </div>
            </div>
          </div>
        </div>
        {/* input fields */}
        <div className='w-full px-4 flex flex-col gap-2'>
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
              className='h-9 w-full border-[1.5px] rounded-lg border-white bg-white px-8 focus:outline-none' />
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
              className='h-9 w-full border-[1.5px] rounded-lg border-white bg-white px-8 focus:outline-none' />
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
              className='h-9 w-full border-[1.5px] rounded-lg border-white bg-white px-8 focus:outline-none' />
            {/* show password icon */}
            <div className='absolute top-2.25 right-2'>
              <button onClick={showPasswordHandler} className='text-xl text-gray-500'>{showPassword ? <FaRegEye /> : <FaEyeSlash />}</button>
            </div>
          </div>
          {/* Login button */}
          <div>
            <button onClick={registerAccountHandler} disabled={loading} className='py-1.5 w-full rounded-2xl text-[16px] text-[#E1E100] bg-[#FF8F00] mt-2 font-medium'>{loading === true ? <ButtonLoading /> : "Create Account"}</button>
          </div>
          {/* singup routes */}
          <div className='h-full w-full flex justify-center items-center'>
            <div>
              <h1 className='text-[13.5px] font-sans text-gray-600'>Already have an account? <Link to={"/login"} className='text-[#FF8F00]'>Login here</Link></h1>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signup
