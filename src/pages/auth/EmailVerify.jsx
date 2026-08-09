import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, verifyOtp } from "../../Store/slice/auth.reduer.js";
import { useNavigate } from "react-router-dom";

const EmailVerify = ({ onComplete }) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const dispatch = useDispatch()
    const nevigate = useNavigate()
    const email = JSON.parse(localStorage.getItem("email"))
    const otpEmail = JSON.parse(localStorage.getItem("otpEmail"))
    const registerEmail = useSelector(state => state.auth.registerEmail)
    const emailVerifyStatus = useSelector(state => state.auth.status)
    const verifyOtpStats = useSelector(state => state.auth.verifyOtpStats)
    const otpVerifyStatus = useSelector(state => state.auth.otpVerifyStatus)
    const inputRefs = useRef([]);
    // Check if the entire 6-digit OTP is filled out
    const isOtpComplete = otp.join("").length === 6;

    // Handle digit input and auto-forward focus
    const handleChange = (element, index) => {
        const value = element.value;
        if (isNaN(Number(value))) return; // Only allow numeric characters

        const newOtp = [...otp];
        // Take only the last character if a user types over an existing digit
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Auto-focus next input box
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }

        // Trigger completion callback if all 6 digits are filled
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === 6 && onComplete) {
            onComplete(combinedOtp);
        }
    };
    const otpDigit = otp[0] + otp[1] + otp[2] + otp[3]+ otp[4] + otp[5]
    // Handle backspace navigation
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                // If current field is empty, move focus back and clear it
                const newOtp = [...otp];
                newOtp[index - 1] = "";
                setOtp(newOtp);
                inputRefs.current[index - 1].focus();
            } else {
                // If current field has a value, just clear it
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };

    // Handle full 6-digit paste event
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();

        // Check if pasted content is a 6-digit number
        if (/^\d{6}$/.test(pastedData)) {
            const pastedOtp = pastedData.split("");
            setOtp(pastedOtp);

            // Focus the last input box
            inputRefs.current[5].focus();

            if (onComplete) {
                onComplete(pastedData);
            }
        }
    };

    const verifyEmailHandler =  () => {
         dispatch(verifyEmail({
            email: email || registerEmail,
            otp: otpDigit
        }))
    }
    const otpVerifyHandler = async () => {
        if(!otpEmail){
            return nevigate("/sendOtp-email")
        }
       const response = await dispatch(verifyOtp({
            otp: otpDigit,
            email: otpEmail
        })).unwrap()
        if(response === 200){
            return nevigate("/resetPassword")
            localStorage.removeItem("otpEmail")
        }
    }
    useEffect(() => {
        if(emailVerifyStatus === 200){
            localStorage.removeItem("email")
            nevigate("/login")
        }
    }, [verifyEmailHandler, dispatch])

    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center bg-[#FFE2E2]">
                <div className="flex flex-col items-center justify-center p-8 bg-[#dad2d2] rounded-2xl shadow-xl max-w-md mx-auto my-10 border-2 border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter Verification Code</h2>
                    <p className="text-sm text-gray-500 mb-6 text-center">
                        We have sent a 6-digit code to your device.
                    </p>

                    {/* OTP Inputs Row */}
                    <div className="flex gap-2 sm:gap-3 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={1}
                                value={digit}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                className="w-12 h-14 text-xl font-semibold text-center text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <button
                        disabled={!isOtpComplete}
                        onClick={email ? verifyEmailHandler : otpVerifyHandler}
                        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${isOtpComplete
                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-[0.98]"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Verify OTP
                    </button>
                </div>
            </div>

        </>
    );
}

export default EmailVerify
