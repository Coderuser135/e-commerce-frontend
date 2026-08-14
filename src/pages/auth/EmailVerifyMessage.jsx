import React from 'react'
import { SiMinutemailer } from "react-icons/si";
import { useNavigate } from "react-router-dom"

const EmailVerifyMessage = () => {
  const nevigate = useNavigate()
  const verifyEmailMessageHandler = () => {
    nevigate("/email-verify")
  }
  return (
    /* Responsive update: keep the verification message centered with safe mobile viewport padding. */
    <div className='min-h-screen w-full px-4 py-6 flex justify-center items-center bg-[#FFE2E2] overflow-x-hidden'>
      {/* Responsive update: use a fluid card width on phones and restore the desktop card size from sm upward. */}
      <div className='w-full max-w-[25rem] min-h-80 border-2 rounded-xl border-[#d3cccc] bg-[#dad2d2] flex flex-col justify-center items-center gap-2 shadow-2xl px-5 py-6 sm:px-8'>
        {/* Responsive update: scale the email icon for smaller screens while preserving the desktop visual hierarchy. */}
        <div className='h-20 w-20 sm:h-25 sm:w-25 rounded-full flex justify-center items-center bg-[#4361ee] shrink-0'>
          <h1 className='text-[3.5rem] sm:text-[4.5rem] text-white'><SiMinutemailer /></h1>
        </div>
        {/* Responsive update: keep the heading readable across mobile and desktop widths. */}
        <div>
          <h1 className='text-lg sm:text-xl font-medium text-center'>Check your email</h1>
        </div>
        {/* Responsive update: make the message width fluid so it never overflows on narrow screens. */}
        <div className='w-full max-w-[20rem] text-center font-sans text-sm sm:text-base leading-5'>
          <h1>Check your email for the 6 digit OTP and enter this OTP to verify your email.</h1>
        </div>
        <div className='w-full flex justify-center'>
          {/* Responsive update: make the verification button comfortably touchable while fitting the mobile card. */}
          <button onClick={verifyEmailMessageHandler} className='w-full max-w-52 min-h-10 py-2 px-6 rounded-lg font-sans mt-4 text-sm sm:text-base text-white bg-[#4361ee] active:scale-105 transition-all duration-105'>Verify Email</button>
        </div>
      </div>
    </div>
  )
}

export default EmailVerifyMessage
