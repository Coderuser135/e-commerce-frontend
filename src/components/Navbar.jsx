import React, { useEffect, useRef, useState } from "react";
import { FiHome, FiSearch } from "react-icons/fi";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { TfiAngleDown } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userImage from "../assets/userImage.jpg"
import ButtonLoading from "./ButtonLoading.jsx";
import { toast } from "react-toastify";
import InfoCard from "./InfoCard.jsx";
import ProfileInfoCard from "./ProfileInfoCard.jsx";

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
export default Navbar