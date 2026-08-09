import React, { useState } from 'react'
import resetPasswordImage from "../../assets/resetPasswordImage.jpg"
import { MdLockReset } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../Store/slice/auth.reduer.js';
import ButtonLoading from '../../components/ButtonLoading.jsx';

const ResetPassword = () => {
    const dispath = useDispatch()
    const nevigate = useNavigate()
    const loading = useSelector(state => state.auth.loading)
    const [inputData, setInputData] = useState({
        newPassword: "",
        confirmPassword: "",
        showPassword: ""
    })
    const { newPassword, confirmPassword, showPassword } = inputData
    const email = JSON.parse(localStorage.getItem("otpEmail"))
    const inputHandler = (e) => {
        const { name, type, value, checked } = e.target
        setInputData((prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        })))
    }
    const resetPasswordHandler = async () => {
        if(loading === true) return
        if(newPassword !== confirmPassword){
            return toast.error("newPassword not match confirmPassword")
        }
        if (!email) {
            toast.error("your email is not fount sendEmail now")
            return nevigate("/sendOtp-email")
        }
        const response = await dispath(resetPassword({
            newPassword,
            confirmPassword,
            email
        })).unwrap()
        if(response === 200){
            localStorage.removeItem("otpEmail")
            return nevigate("/login")
        }
    }
    return (
        <div className={`min-h-screen max-w-screen bg-[#FFE2E2] flex flex-col justify-center items-center`}>
            <div className='w-70 border-bl-2 border-br-2 border-solid  border-[#dad2d2] rounded-xl shadow-2xl bg-[#eedcdc] active:scale-105 transition-all duration-75 relative pb-5'>
                {/* lock icon */}
                <div className='h-28 w-full border-2 border-solid border-blue-600 bg-blue-600 rounded-tl-xl rounded-tr-xl flex justify-center mb-16'>
                    <div className='h-5 w-full mt-5 flex justify-center items-center'>
                        <h1 className='text-2xl text-white font-sans'>Reset Password</h1>
                    </div>
                    <div className='h-25 w-25 rounded-full absolute top-15'>
                        <div>
                            <img src={resetPasswordImage} className='aspect-square object-contain rounded-full' />
                        </div>
                    </div>
                </div>
                {/* input fields */}
                <div className='w-full px-4 flex flex-col gap-2'>
                    {/* newPassword fields */}
                    <div className='flex relative'>
                        {/* email icon */}
                        <div className='absolute top-2.25 left-2'>
                            <h1 className='text-xl text-gray-500'><MdLockReset /></h1>
                        </div>
                        <input
                            type={showPassword === true ? "text" : "password"}
                            placeholder='New Password'
                            onChange={inputHandler}
                            name='newPassword'
                            className='h-9 w-full border-[1.5px] rounded-[5px] border-[#979595] px-8 focus:outline-none' />
                    </div>
                    {/* confirmPassword fields */}
                    <div className='flex relative'>
                        {/* email icon */}
                        <div className='absolute top-2.25 left-2'>
                            <h1 className='text-xl text-gray-500'><MdLockReset /></h1>
                        </div>
                        <input
                            type={showPassword === true ? "text" : "password"}
                            placeholder='Confirm Password'
                            onChange={inputHandler}
                            name='confirmPassword'
                            className='h-9 w-full border-[1.5px] rounded-[5px] border-[#979595] px-8 focus:outline-none' />
                    </div>
                    {/* show password */}
                    <div className='ml-2 flex items-center'>
                        <label htmlFor='checkbox' className='flex items-center'>
                            <div>
                                <input name="showPassword" type='checkbox' onChange={inputHandler} id='checkbox' className='h-3.5 w-3.5 mr-2' />
                            </div>
                            <div>
                                <h1 className='text-[14px] font-mono'>Show Password</h1>
                            </div>
                        </label>
                    </div>
                    {/* Login button */}
                    <div>
                        <button disabled={loading} onClick={resetPasswordHandler} className='py-1.5 w-full rounded-2xl text-[16px] text-white bg-blue-500 mt-2 font-medium'>{loading === true ? <ButtonLoading /> : "Reset Password"}</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ResetPassword
