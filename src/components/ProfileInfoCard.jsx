import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updatePassword, updateUserInfo } from "../features/Store/reducers/user.reducer.js"
import { MdOutlineFileUpload } from "react-icons/md";
import ButtonLoading from "./ButtonLoading.jsx";
import { toast } from "react-toastify";
import userImage from "../assets/userImage.jpg"

const ProfileInfoCard = ({ setShowProfileHandler, user }) => {
    const fileRef = useRef(null)
    const [fullName, setFullName] = useState(user.fullName)
    const loading = useSelector(state => state.user.loading)
    const updatePasswordStatus = useSelector(state => state.user.status)
    const updatePasswordLoading = useSelector(state => state.user.updatePasswordLoading)
    console.log(loading)
    const dispatch = useDispatch()
    const [fileData, setFileData] = useState(null)
    const [inputPassword, setInputPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        showPassword: false
    })
    const setInputPasswordHandler = (e) => {
        const { name, value, type, checked } = e.target
        setInputPassword(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }
    const setFullNameHandlre = (e) => {
        setFullName(e.target.value)
    }
    const openFileHandler = () => {
        fileRef.current.click()
    }
    const fileHandler = (e) => {
        setFileData(e.target.files[0])
    }
    const updateUserInfoHandler = () => {
        if(fileData === null){
            return toast.error("Update profile image or name")
        }
        const formData = new FormData()
        formData.append("userImage", fileData)
        formData.append("fullName", fullName)
        dispatch(updateUserInfo({
            userInfo: formData,
            email: user.email,
            bearerToken: user.accessToken
        }))
    }
    const {currentPassword, newPassword, confirmPassword} = inputPassword
    const updatePasswordHandler = () => {
        if(!currentPassword || !newPassword || !confirmPassword){
            return toast.error("All fields are required")
        }
        if(newPassword !== confirmPassword){
            return toast.error("newPassword or confirmPassword is not match")
        }
        if(currentPassword.length < 8 || newPassword.length < 8 || confirmPassword.length < 8){
            return toast.error("Password length must less then 8 digit")
        }
        dispatch(updatePassword({
            data: inputPassword,
            email: user.email,
            bearerToken: user.accessToken
        }))
            setInputPassword({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
                showPassword: false
            })
    }
    return (
        <>
            <div className="h-screen w-80 bg-[#1B515E] px-4 py-2 flex flex-col gap-2">
                <div className="h-12 flex w-full justify-between items-center">
                    <div>
                        <h1 className="text-white">Profile</h1>
                    </div>
                    <div onClick={setShowProfileHandler} className="px-4 rounded-md hover:scale-105 hover:bg-black hover:text-red-500 active:scale-95 active:bg-black active:text-red-500 active:select-none">
                        <h1 className="text-white hover:text-red-500">X</h1>
                    </div>
                </div>
                {/* update profile info fields */}
                <div className="h-72 w-full flex flex-col mt-2">
                    <div className="h-20 w-full flex justify-around items-center">
                        <div className="h-20 w-20 border rounded-full bg-gray-200">
                            <img src={user?.userImage !== null ? user?.userImage : userImage} className="h-20 w-20 rounded-full" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-2">
                        <div>
                            <h1 className="text-[18px] font-mono text-white">{user?.fullName}</h1>
                        </div>
                        <div>
                            <h1 className="text-[16px] font-sans text-[#a0a0a0]">{user?.email}</h1>
                        </div>
                    </div>
                    {/* update name */}
                    <div className="h-full px-2 mt-2 text-white">
                        <h1 className="text-[18px] text-white mb-1">Update Profile</h1>
                        <input
                            type="text"
                            onChange={setFullNameHandlre}
                            value={fullName}
                            placeholder="Full Name"
                            className="text-[16px] h-8 w-full pl-2 rounded-md bg-[#424141] focus:outline-none transition-all duration-300 ease-in-out active:scale-95" />
                        <input type="file" onChange={fileHandler} ref={fileRef} className="hidden" />
                        <div className="mt-2">
                            <button onClick={openFileHandler} className="flex items-center gap-1 text-[#a0a0a0] hover:scale-105 transition-all duration-100 ease-in-out active:scale-95">
                                <div>
                                    <h1 className="text-[18px]"><MdOutlineFileUpload /></h1>
                                </div>
                                <div>
                                    <h1 className="text-[16px]">Upload Avatar</h1>
                                </div>
                            </button>
                        </div>
                        {/* update button */}
                        <div className="w-full flex justify-center items-center mt-4">
                            <button onClick={updateUserInfoHandler} className="w-48 h-10 bg-[#216583] text-white rounded-xl text-[16px] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">{loading === true ? <ButtonLoading /> : "Save Change"}</button>
                        </div>
                    </div>
                </div>
                {/* update password */}
                <div className="h-72 w-full flex flex-col gap-2 px-2 mt-4 text-white">
                    <div>
                        <h1 className="text-[18px] text-white">Update Password</h1>
                    </div>
                    <div className="flex flex-col gap-2 text-white">
                        <input
                            type={inputPassword.showPassword === true ? "text" : "password"}
                            value={inputPassword.currentPassword}
                            name="currentPassword"
                            onChange={setInputPasswordHandler}
                            placeholder="Current Password"
                            className="text-[16px] h-9 w-full pl-2 rounded-md bg-[#424141] focus:outline-none transition-all duration-300 ease-in-out active:scale-95" />
                        <input
                            type={inputPassword.showPassword === true ? "text" : "password"}
                            value={inputPassword.newPassword}
                            name="newPassword"
                            onChange={setInputPasswordHandler}
                            placeholder="New Password"
                            className="text-[16px] h-9 w-full pl-2 rounded-md bg-[#424141] focus:outline-none transition-all duration-300 ease-in-out active:scale-95" />
                        <div className="flex flex-col">
                            <input
                                type={inputPassword.showPassword === true ? "text" : "password"}
                                value={inputPassword.confirmPassword}
                                name="confirmPassword"
                                onChange={setInputPasswordHandler}
                                placeholder="Confirm Password"
                                className="text-[16px] h-9 w-full pl-2 rounded-md bg-[#424141] focus:outline-none transition-all duration-300 ease-in-out active:scale-95" />
                            {/* show password */}
                            <div className="px-2 mt-2">
                                <label htmlFor={"showPassword"} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="showPassword"
                                        onChange={setInputPasswordHandler}
                                        checked={inputPassword.showPassword}
                                        name="showPassword"
                                        className="h-4 w-4" />
                                    <h1 className="text-[15px] active:select-none">Show Password</h1>
                                </label>
                            </div>
                        </div>
                        {/* update button */}
                        <div className="w-full flex justify-center items-center mt-4">
                            <button onClick={updatePasswordHandler} className="w-48 h-10 bg-[#216583] text-white rounded-xl text-[16px] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">{updatePasswordLoading === true ? <ButtonLoading /> : "Update Password"}</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProfileInfoCard