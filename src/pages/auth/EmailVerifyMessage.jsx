import React from 'react'
import { SiMinutemailer } from "react-icons/si";
import { useNavigate } from "react-router-dom"

const EmailVerifyMessage = () => {
  const nevigate = useNavigate()
  const verifyEmailMessageHandler = () => {
    nevigate("/email-verify")
  }
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-[#FFE2E2]'>
      <div className='h-80 w-100 border-2 rounded-xl border-[#d3cccc] bg-[#dad2d2] flex flex-col justify-center items-center gap-2 shadow-2xl'>
        <div className='h-25 w-25 rounded-full flex justify-center items-center bg-[#4361ee]'>
          <h1 className='text-[4.5rem] text-white'><SiMinutemailer /></h1>
        </div>
        <div>
          <h1 className='text-xl font-medium'>Check your email</h1>
        </div>
        <div className='w-80 text-center font-sans'>
          <h1>check your email 6 digit otp and fill this otp and verify your email</h1>
        </div>
        <div>
          <button onClick={verifyEmailMessageHandler} className='py-2 px-10 rounded-lg font-sans mt-4 text-white bg-[#4361ee] active:scale-105 transition-all duration-105'>Verify Email</button>
        </div>
      </div>
    </div>
  )
}

export default EmailVerifyMessage
