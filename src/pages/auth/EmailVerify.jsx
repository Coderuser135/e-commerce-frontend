import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, verifyOtp } from "../../features/Store/reducers/auth.reducer.js";
import { useNavigate } from "react-router-dom";
import ButtonLoading from "../../components/ButtonLoading.jsx";

const EmailVerify = ({ onComplete }) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const loading = useSelector(state => state.auth.loading)
    const dispatch = useDispatch()
    const nevigate = useNavigate()
    const email = JSON.parse(localStorage.getItem("email"))
    const otpEmail = JSON.parse(localStorage.getItem("otpEmail"))
    const registerEmail = useSelector(state => state.auth.registerEmail)
    const emailVerifyStatus = useSelector(state => state.auth.status)
    const verifyOtpStats = useSelector(state => state.auth.verifyOtpStats)
    const otpVerifyStatus = useSelector(state => state.auth.otpVerifyStatus)
    const inputRefs = useRef([]);
    const isOtpComplete = otp.join("").length === 6;
    const handleChange = (element, index) => {
        const value = element.value;
        if (isNaN(Number(value))) return;
        const newOtp = [...otp]; newOtp[index] = value.substring(value.length - 1); setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1].focus();
        const combinedOtp = newOtp.join(""); if (combinedOtp.length === 6 && onComplete) onComplete(combinedOtp);
    };
    const otpDigit = otp[0] + otp[1] + otp[2] + otp[3]+ otp[4] + otp[5]
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            if (!otp[index] && index > 0) { newOtp[index - 1] = ""; setOtp(newOtp); inputRefs.current[index - 1].focus(); }
            else { newOtp[index] = ""; setOtp(newOtp); }
        }
    };
    const handlePaste = (e) => {
        e.preventDefault(); const pastedData = e.clipboardData.getData("text").trim();
        if (/^\d{6}$/.test(pastedData)) { const pastedOtp = pastedData.split(""); setOtp(pastedOtp); inputRefs.current[5].focus(); if (onComplete) onComplete(pastedData); }
    };
    const verifyEmailHandler = () => dispatch(verifyEmail({ email: email || registerEmail, otp: otpDigit }))
    const otpVerifyHandler = async () => {
        if(!otpEmail) return nevigate("/sendOtp-email")
        const response = await dispatch(verifyOtp({ otp: otpDigit, email: otpEmail })).unwrap()
        if(response === 200){ localStorage.removeItem("otpEmail"); return nevigate("/resetPassword") }
    }
    useEffect(() => { if(emailVerifyStatus === 200){ localStorage.removeItem("email"); nevigate("/login") } }, [emailVerifyStatus, nevigate])
    return (
        /* Responsive update: keep the OTP verification screen centered with safe mobile padding. */
        <div className='min-h-screen w-full px-3 py-6 flex justify-center items-center bg-[#FFE2E2] overflow-x-hidden'>
            {/* Responsive update: make the verification card fluid on phones and preserve a comfortable desktop width. */}
            <div className='w-full max-w-[28rem] flex flex-col items-center justify-center p-5 sm:p-8 bg-[#dad2d2] rounded-2xl shadow-xl mx-auto border-2 border-gray-100'>
                <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center'>Enter Verification Code</h2>
                <p className='text-xs sm:text-sm text-gray-500 mb-5 sm:mb-6 text-center'>We have sent a 6-digit code to your device.</p>
                {/* Responsive update: shrink OTP boxes on phones so all six fields fit without horizontal scrolling. */}
                <div className='flex gap-1.5 xs:gap-2 sm:gap-3 mb-5 sm:mb-6 w-full justify-center'>
                    {otp.map((digit, index) => (
                        <input key={index} type='text' inputMode='numeric' autoComplete='one-time-code' maxLength={1} value={digit} ref={(el) => (inputRefs.current[index] = el)} onChange={(e) => handleChange(e.target, index)} onKeyDown={(e) => handleKeyDown(e, index)} onPaste={handlePaste} className='w-10 h-12 sm:w-12 sm:h-14 text-lg sm:text-xl font-semibold text-center text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100' />
                    ))}
                </div>
                {/* Responsive update: use a touch-friendly full-width verify button. */}
                <button disabled={!isOtpComplete} onClick={email ? verifyEmailHandler : otpVerifyHandler} className={`w-full min-h-11 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${isOtpComplete ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-[0.98]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>{loading === true ? <ButtonLoading /> : "Verify OTP"}</button>
            </div>
        </div>
    );
}

export default EmailVerify
