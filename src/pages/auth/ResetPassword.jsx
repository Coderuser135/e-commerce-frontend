import React, { useState } from 'react'
import resetPasswordImage from "../../assets/resetPasswordImage.jpg"
import { MdLockReset } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../features/Store/reducers/auth.reducer.js';
import ButtonLoading from '../../components/ButtonLoading.jsx';

const ResetPassword = () => {
    const dispath = useDispatch()
    const nevigate = useNavigate()
    const loading = useSelector(state => state.auth.loading)
    const [inputData, setInputData] = useState({ newPassword: "", confirmPassword: "", showPassword: "" })
    const { newPassword, confirmPassword, showPassword } = inputData
    const email = JSON.parse(localStorage.getItem("otpEmail"))
    const inputHandler = (e) => {
        const { name, type, value, checked } = e.target
        setInputData((prev => ({ ...prev, [name]: type === "checkbox" ? checked : value })))
    }
    const resetPasswordHandler = async () => {
        if(loading === true) return
        if(newPassword !== confirmPassword) return toast.error("newPassword not match confirmPassword")
        if (!email) { toast.error("your email is not fount sendEmail now"); return nevigate("/sendOtp-email") }
        const response = await dispath(resetPassword({ newPassword, confirmPassword, email })).unwrap()
        if(response === 200){ localStorage.removeItem("otpEmail"); return nevigate("/login") }
    }
    return (
        /* Responsive update: keep the reset-password screen viewport-safe with mobile padding. */
        <div className='min-h-screen w-full px-4 py-6 bg-[#FFE2E2] flex flex-col justify-center items-center overflow-x-hidden'>
            {/* Responsive update: use a fluid card on phones and restore a compact fixed width from sm upward. */}
            <div className='w-full max-w-[19rem] sm:max-w-[17.5rem] border-bl-2 border-br-2 border-solid border-[#dad2d2] rounded-xl shadow-2xl bg-[#eedcdc] relative pb-5'>
                {/* lock icon */}
                {/* Responsive update: scale the header and image for smaller screens. */}
                <div className='h-28 w-full border-2 border-solid border-blue-600 bg-blue-600 rounded-tl-xl rounded-tr-xl flex justify-center mb-16'>
                    <div className='h-5 w-full mt-5 flex justify-center items-center'><h1 className='text-xl sm:text-2xl text-white font-sans'>Reset Password</h1></div>
                    <div className='h-20 w-20 sm:h-25 sm:w-25 rounded-full absolute top-14 sm:top-15'><img src={resetPasswordImage} className='w-full h-full aspect-square object-contain rounded-full' /></div>
                </div>
                {/* Responsive update: keep form controls fluid and touch-friendly on mobile. */}
                <div className='w-full px-4 flex flex-col gap-2'>
                    <div className='flex relative'>
                        <div className='absolute top-2.25 left-2'><h1 className='text-xl text-gray-500'><MdLockReset /></h1></div>
                        <input type={showPassword === true ? "text" : "password"} placeholder='New Password' onChange={inputHandler} name='newPassword' className='h-10 w-full min-w-0 border-[1.5px] rounded-[5px] border-[#979595] px-8 text-sm sm:text-base focus:outline-none' />
                    </div>
                    <div className='flex relative'>
                        <div className='absolute top-2.25 left-2'><h1 className='text-xl text-gray-500'><MdLockReset /></h1></div>
                        <input type={showPassword === true ? "text" : "password"} placeholder='Confirm Password' onChange={inputHandler} name='confirmPassword' className='h-10 w-full min-w-0 border-[1.5px] rounded-[5px] border-[#979595] px-8 text-sm sm:text-base focus:outline-none' />
                    </div>
                    <label htmlFor='checkbox' className='ml-2 flex items-center py-1 text-sm sm:text-[14px]'><input name='showPassword' type='checkbox' onChange={inputHandler} id='checkbox' className='h-4 w-4 mr-2' /><span className='font-mono'>Show Password</span></label>
                    {/* Responsive update: use a touch-friendly full-width reset button. */}
                    <button disabled={loading} onClick={resetPasswordHandler} className='min-h-10 py-2 w-full rounded-2xl text-sm sm:text-[16px] text-white bg-blue-500 mt-2 font-medium'>{loading === true ? <ButtonLoading /> : "Reset Password"}</button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
