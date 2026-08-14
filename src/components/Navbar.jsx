import React, { useEffect, useRef, useState } from "react";
import { FiHome, FiSearch } from "react-icons/fi";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiAdminLine } from "react-icons/ri";
import { FaBorderStyle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { TfiAngleDown } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineFileUpload } from "react-icons/md";
import userImage from "../assets/userImage.jpg"
import { updatePassword, updateUserInfo } from "../features/Store/reducers/user.reducer.js";
import ButtonLoading from "./ButtonLoading.jsx";
import { toast } from "react-toastify";

const Navbar = () => {
    const user = useSelector(state => state.auth.user)
    const [showCard, setShowCard] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const setShowCardHandler = () => {
        setShowCard(!showCard)
    }
    const setShowProfileHandler = () => {
        setShowProfile(!showProfile)
    }
    return (
        <>
            <div className="w-full h-20 bg-[#978F66] flex justify-between p-2 px-6 items-center sticky top-0 left-0 right-0 z-20">
                {/* Home Bar */}
                <Link to={'/'}>
                    <div className="flex  items-center p-2 gap-2">
                        <h1><FiHome className="text-2xl text-[#f5725b] font-bold" /></h1>
                        <h1 className="text-2xl font-bold text-[tomato]">NPM <span className="text-[#E4D6A9] font-serif">STORE</span></h1>

                    </div>
                </Link>

                {/* Search Bar */}
                <div className="flex items-center gap-2 bg-[#E4D6A9] py-2 w-[25rem] rounded-[15px] pl-4">
                    <div>
                        <FiSearch className="text-xl" />
                    </div>
                    <div>
                        <input type="text" placeholder="Search Products & Category Items...." className="w-[20rem] h-[1.8rem] outline-none text-[gray] font-serif font-semibold" />
                    </div>

                </div>
                {/* Add to Card Bar & Other featutes*/}
                <div className="p-2 w-[20rem] flex justify-between items-center text-2xl text-[#E4D6A9]">
                    <div className="bg-[#ff826c] h-10 w-10 rounded-[5px] flex justify-center items-center flex-col hover:bg-[tomato] active:scale-120 transition-all ease-in 5s">
                        <button><FaShoppingCart /></button>
                    </div>
                    {/* user icon */}
                    <div className='flex justify-between items-center gap-4'>
                        <div>
                            <h1 className='text-[25px]'><IoIosNotifications /></h1>
                        </div>
                        <div className='flex justify-between items-center gap-2'>
                            <div onClick={setShowProfileHandler} className="h-7.5 w-7.5 rounded-full flex justify-around items-center bg-[#c5c5c5] shadow-2xl">
                                <img src={user.userImage !== null ? user.userImage : userImage} className="h-7.5 w-7.5 rounded-full"/>
                            </div>
                            <h1 className='text-[18px]'>{user?.role !== "admin" ? user.fullName : "Admin"}</h1>
                        </div>
                        <div>
                            <h1 onClick={setShowCardHandler} ><TfiAngleDown className={`text-[15px] ${showCard === true ? "rotate-180 transition-colors duration-1000 ease-in" : ""}`} /></h1>
                        </div>
                    </div>
                    {/* card info */}
                    <div className={`absolute top-28 right-5 opacity-0 ${showCard === true ? "-translate-y-10 opacity-100  transition-all duration-500 ease-in-out" : "translate-y-10 opacity-0 scale-75  transition-all duration-500 ease-in-out"}`}>
                        <InfoCard role={user.role} email={user.email} setShowCard={setShowCard} />
                    </div>
                    {/* user profile info card */}
                    <div className={`fixed top-0 right-0 opacity-50 ${showProfile === true ? "translate-x-0 opacity-100  transition-all duration-500 ease-in-out" : "translate-x-100 opacity-0 transition-all duration-500 ease-in-out"}`}>
                        <ProfileInfoCard setShowProfileHandler={setShowProfileHandler} user={user} />
                    </div>
                </div>


            </div>
        </>
    )
}

const InfoCard = ({ role, setShowCard }) => {
    const nevigate = useNavigate()
    const profileHandler = () => {
        nevigate("/my-profile")
        setShowCard(false)
    }
    return (
        <>
            <div className="h-68 w-60 border-2 rounded-2xl border-[#cfcfce] bg-[#F5F5DC] flex flex-col p-2 text-[#494848] pl-4 gap-2 items-center justify-center">
                {/* my profile */}
                <div onClick={profileHandler} className="h-10 w-full flex items-center gap-2 p-1 hover:bg-[#e2f1f0] hover:border active:scale-95 transition-all duration-75 hover:scale-105 hover:shadow-xl active:select-none active:shadow-[#d3cfcf] ease-in-out rounded-[10px]">
                    <div>
                        <h1 className="text-[20px]"><CgProfile /></h1>
                    </div>
                    <div>
                        <h1 className="text-[18px]">My Profile</h1>
                    </div>
                </div>
                {/* Admin */}
                {role === "admin" &&
                    <div className="h-10 w-full flex items-center gap-2 p-1 hover:bg-[#e2f1f0] hover:border active:scale-95 transition-all duration-75 hover:scale-105 hover:shadow-xl active:select-none active:shadow-[#d3cfcf] ease-in-out rounded-[10px]">
                        <div>
                            <h1 className="text-[20px]"><RiAdminLine /></h1>
                        </div>
                        <div>
                            <h1 className="text-[18px]">Admin</h1>
                        </div>
                    </div>
                }
                {/* Orders */}
                <div className="h-10 w-full flex items-center gap-2 p-1 hover:bg-[#e2f1f0] hover:border active:scale-95 transition-all duration-75 hover:scale-105 hover:shadow-xl active:select-none active:shadow-[#d3cfcf] ease-in-out rounded-[10px]">
                    <div>
                        <h1 className="text-[20px]"><FaBorderStyle /></h1>
                    </div>
                    <div>
                        <h1 className="text-[18px]">Orders</h1>
                    </div>
                </div>
                {/* Wishlist */}
                <div className="h-10 w-full flex items-center gap-2 p-1 hover:bg-[#e2f1f0] hover:border active:scale-95 transition-all duration-75 hover:scale-105 hover:shadow-xl active:select-none active:shadow-[#d3cfcf] ease-in-out rounded-[10px]">
                    <div>
                        <h1 className="text-[20px]"><FaRegHeart /></h1>
                    </div>
                    <div>
                        <h1 className="text-[18px]">Wishlist</h1>
                    </div>
                </div>
                {/* logout */}
                <div className="h-10 w-full flex items-center gap-2 p-1 hover:bg-[#e2f1f0] hover:border active:scale-95 transition-all duration-75 hover:scale-105 hover:shadow-xl active:select-none active:shadow-[#d3cfcf] ease-in-out rounded-[10px]">
                    <div>
                        <h1 className="text-[20px] text-[red]"><IoIosLogOut /></h1>
                    </div>
                    <div>
                        <h1 className="text-[18px] text-[red]">Logout</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

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
                        <h1>Profile</h1>
                    </div>
                    <div onClick={setShowProfileHandler} className="px-4 rounded-md hover:scale-105 hover:bg-black hover:text-red-500 active:scale-95 active:bg-black active:text-red-500 active:select-none">
                        <h1>X</h1>
                    </div>
                </div>
                {/* update profile info fields */}
                <div className="h-72 w-full flex flex-col mt-2">
                    <div className="h-20 w-full flex justify-around items-center">
                        <div className="h-20 w-20 border rounded-full bg-gray-200">
                            <img src={user.userImage !== null ? user.userImage : userImage} className="h-20 w-20 rounded-full" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-2">
                        <div>
                            <h1 className="text-[18px] font-mono text-white">{user.fullName}</h1>
                        </div>
                        <div>
                            <h1 className="text-[16px] font-sans text-[#a0a0a0]">{user.email}</h1>
                        </div>
                    </div>
                    {/* update name */}
                    <div className="h-full px-2 mt-2">
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
                <div className="h-72 w-full flex flex-col gap-2 px-2 mt-4">
                    <div>
                        <h1 className="text-[18px] text-white">Update Password</h1>
                    </div>
                    <div className="flex flex-col gap-2">
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
                        <div>
                            <button></button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Navbar