import React, { useEffect } from 'react'
import { useState } from 'react';
import emailIcon from "../../assets/emailIcon.jpg"
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtpEmail } from '../../features/Store/reducers/auth.reducer.js';
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
  const inputDataHandler = (e) => setEmail(e.target.value)
  const sendOtpHandler = () => {
    if(!email) return toast.error("Email fields is required")
    if(!email.includes("@gmail.com")) return toast.error("Plese check email formate")
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
    /* Responsive update: keep the OTP request screen inside the viewport with mobile-safe padding. */
    <div className='min-h-screen w-full px-4 py-6 bg-[#FFE2E2] flex flex-col justify-center items-center overflow-x-hidden'>
      {/* Responsive update: use a fluid card width on phones and preserve the compact desktop card. */}
      <div className='w-full max-w-[19rem] sm:max-w-[17.5rem] border-bl-2 border-br-2 border-solid border-[#dad2d2] rounded-xl shadow-2xl bg-[#eedcdc] relative pb-5'>
        {/* lock icon */}
        {/* Responsive update: scale the header and email image on small screens. */}
        <div className='h-28 w-full border-2 border-solid border-blue-600 bg-blue-600 rounded-tl-xl rounded-tr-xl flex justify-center mb-16'>
          <div className='h-5 w-full mt-5 flex justify-center items-center'><h1 className='text-xl sm:text-2xl text-white font-sans'>SEND OTP</h1></div>
          <div className='h-20 w-20 sm:h-25 sm:w-25 rounded-full absolute top-14 sm:top-15'><img src={emailIcon} className='w-full h-full aspect-square object-contain rounded-full' /></div>
        </div>
        {/* Responsive update: keep the email input and button fluid with touch-friendly controls. */}
        <div className='w-full px-4 flex flex-col gap-2'>
          <div className='flex relative'>
            <div className='absolute top-2.25 left-2'><h1 className='text-xl text-gray-500'><MdEmail /></h1></div>
            <input type='text' placeholder='Email' name='email' value={email} onChange={inputDataHandler} className='h-10 w-full min-w-0 border-[1.5px] rounded-[5px] border-[#979595] px-8 text-sm sm:text-base focus:outline-none' />
          </div>
          {/* Responsive update: make the send button comfortable to tap on mobile. */}
          <button disabled={loading} onClick={sendOtpHandler} className='min-h-10 py-2 w-full border rounded-2xl text-sm sm:text-[16px] text-white bg-blue-500 mt-2 font-medium'>{loading === true ? <ButtonLoading /> : "Send OTP"}</button>
        </div>
      </div>
    </div>
  )
}

export default SendOtpEmail