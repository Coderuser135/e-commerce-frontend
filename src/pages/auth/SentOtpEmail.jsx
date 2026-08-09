import React, { useEffect } from 'react'
import { useState } from 'react';
import emailIcon from "../../assets/emailIcon.jpg"
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtpEmail } from '../../Store/slice/auth.reduer.js';
import { toast } from 'react-toastify';
import ButtonLoading from '../../components/ButtonLoading.jsx';

const SendOtpEmail = () => {
  const nevigate = useNavigate()
  const dispatch = useDispatch()
  const sendOtpEmailStatus = useSelector(state => state.auth.sendOtpStatus)
  const accessToken = useSelector(state => state.auth.token)
  const loading = useSelector(state => state.auth.loading)
  const [email, setEmail] = useState("")
  const [savedEmail, setSavedEmail] = useState(() => {
    const savedEmailInput = localStorage.getItem("otpEmail")
    return savedEmailInput ? JSON.parse(savedEmailInput) : ""
  })
  const inputDataHandler = (e) => {
    setEmail(e.target.value)
  }
  const sendOtpHandler = () => {
    if(!email){
      return toast.error("Email fields is required")
    }
    if(!email.includes("@gmail.com")){
      return toast.error("Plese check email formate")
    }
    dispatch(sendOtpEmail(email))
  }
  useEffect(() => {
    if(sendOtpEmailStatus === 200){
        setSavedEmail(email)
        localStorage.setItem("otpEmail", JSON.stringify(savedEmail))
        nevigate("/email-verifyMessage")
    }
  }, [sendOtpHandler, dispatch])
  return (
    <div className={`min-h-screen max-w-screen bg-[#FFE2E2] flex flex-col justify-center items-center`}>
      <div className='w-70 border-bl-2 border-br-2 border-solid  border-[#dad2d2] rounded-xl shadow-2xl bg-[#eedcdc] active:scale-105 transition-all duration-75 relative pb-5'>
        {/* lock icon */}
        <div className='h-28 w-full border-2 border-solid border-blue-600 bg-blue-600 rounded-tl-xl rounded-tr-xl flex justify-center mb-16'>
          <div className='h-5 w-full mt-5 flex justify-center items-center'>
            <h1 className='text-2xl text-white font-sans'>SEND OTP</h1>
          </div>
          <div className='h-25 w-25 rounded-full absolute top-15'>
            <div>
              <img src={emailIcon} className='aspect-square object-contain rounded-full' />
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
          {/* Login button */}
          <div>
            <button disabled={loading} onClick={sendOtpHandler} className='py-1.5 w-full border rounded-2xl text-[16px] text-white bg-blue-500 mt-2 font-medium'>{loading === true ? <ButtonLoading /> : "Send OTP"}</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SendOtpEmail