import React, { useEffect, useRef, useState } from "react";
import { FiHome, FiSearch } from "react-icons/fi";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { TfiAngleDown } from "react-icons/tfi";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userImage from "../assets/userImage.jpg"
import ButtonLoading from "./ButtonLoading.jsx";
import { toast } from "react-toastify";
import InfoCard from "./InfoCard.jsx";
import AddToCardItem from "./AddToCard.jsx";
import ProfileInfoCard from "./ProfileInfoCard.jsx";
import { getAddToCard } from "../features/Store/reducers/admin.reducer.js";

const Navbar = () => {
    const user = useSelector(state => state.auth.user)
    const products = useSelector(state => state.products.productsStore)
    const [showAddToCard, setShowAddToCard] = useState(false)
    const dispatch = useDispatch()
    const card = useSelector(state => state.admin.card)
    const [showCard, setShowCard] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const setShowCardHandler = () => {
        setShowCard(!showCard)
    }
    const setShowProfileHandler = () => {
        console.log()
        setShowProfile(!showProfile)
    }
    const setShowAddToCardHandler = () => {
        setShowAddToCard(!showAddToCard)
    }
    return (
        <>
            {/* Responsive fix: mobile uses two rows; desktop explicitly places logo, search and actions in columns 1, 2 and 3. */}
            <div className="w-full min-h-20 bg-[#978F66] grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-1 items-center gap-2 p-2 px-3 sm:px-5 lg:px-6 sticky top-0 left-0 right-0 z-20">
                {/* Responsive fix: logo is explicitly placed in the left column on desktop. */}
                <div className="justify-self-start min-w-0 lg:col-start-1 lg:row-start-1">
                    <Link to={'/'} className="shrink-0">
                        <div className="flex items-center p-1 sm:p-2 gap-1.5 sm:gap-2">
                            <h1><FiHome className="text-xl sm:text-2xl text-[#f5725b] font-bold" /></h1>
                            <h1 className="text-xl sm:text-2xl font-bold text-[tomato]">NPM <span className="text-[#E4D6A9] font-serif">STORE</span></h1>
                        </div>
                    </Link>
                </div>

                {/* Responsive fix: search spans both mobile columns on row 2, but is explicitly centered in desktop column 2. */}
                <div className="col-span-2 row-start-2 lg:col-span-1 lg:row-start-1 lg:col-start-2 lg:justify-self-center w-full lg:w-[25rem] flex items-center gap-2 bg-[#E4D6A9] py-2 px-3 rounded-[15px] min-w-0">
                    <div className="shrink-0">
                        <FiSearch className="text-xl" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <input type="text" placeholder="Search Products & Category Items...." className="w-full h-7 outline-none bg-transparent text-[gray] font-serif font-semibold text-sm sm:text-base" />
                    </div>
                </div>

                {/* Responsive fix: action controls are explicitly placed in the right column on desktop and remain right-aligned in mobile column 2. */}
                <div className="justify-self-end flex items-center gap-2 sm:gap-3 lg:gap-4 text-xl sm:text-2xl text-[#E4D6A9] shrink-0 lg:col-start-3 lg:row-start-1">
                    <div className="h-18 w-10.25 relative flex flex-col justify-center">
                        {card?.length > 0 && <div className="absolute top-1 right-0 h-5 w-5 border rounded-full flex justify-center items-center bg-[#f3139d] border-[#ff826c]">
                            <h1 className="text-white text-[15px]">{card?.length > 0 ? card?.length : null}</h1>
                        </div>}
                        {/* add to card */}
                        <div className={`fixed top-0 right-0 transition-all duration-300 ease-in-out ${showAddToCard === true ? "translate-x-0 opacity-100" : "translate-x-100 opacity-0"}`}>
                            <AddToCard setShowAddToCardHandler={setShowAddToCardHandler} card={card} />
                        </div>
                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-[5px] flex justify-center items-center flex-col active:scale-95 transition-all">
                            <button onClick={setShowAddToCardHandler} aria-label="Shopping cart"><FaShoppingCart /></button>
                        </div>
                    </div>

                    <div className='flex items-center gap-2 sm:gap-3'>
                             <div>
                            <h1 onClick={setShowCardHandler} className="p-1 cursor-pointer"><TfiAngleDown className={`text-[13px] sm:text-[15px] hover:scale-150 ${showCard === true ? "rotate-180 transition-colors duration-1000 ease-in" : ""}`} /></h1>
                        </div>
                        <div>
                            <h1 className='text-[22px] sm:text-[25px]'><IoIosNotifications /></h1>
                        </div>
                        <div className='flex items-center gap-1.5 sm:gap-2'>
                            <div onClick={setShowProfileHandler} className="h-8 w-8 sm:h-7.5 sm:w-7.5 rounded-full flex justify-around items-center bg-[#c5c5c5] shadow-2xl shrink-0">
                                <img src={user.userImage !== null ? user.userImage : userImage} className="h-full w-full rounded-full object-cover" />
                            </div>
                            {/* Responsive fix: hide the user name on narrow screens so the action controls fit. */}
                            <h1 className='hidden sm:block text-[16px] sm:text-[18px] max-w-24 truncate'>{user?.role !== "admin" ? user.fullName : "Admin"}</h1>
                        </div>
                    </div>
                </div>

                {/* Responsive fix: dropdown remains aligned to the right and adjusts its vertical position for the mobile two-row navbar. */}
                <div className={`absolute top-30 sm:top-24 lg:top-20 right-3 sm:right-5 opacity-0 ${showCard === true ? "-translate-y-2 visible opacity-100 transition-all duration-500 ease-in-out" : "translate-y-2 opacity-0 hidden scale-75 transition-all duration-500 ease-in-out"}`}>
                    <InfoCard role={user.role} email={user.email} setShowCard={setShowCard} />
                </div>
                {/* user profile info card */}
                <div className={`fixed top-0 right-0 opacity-50 ${showProfile === true ? "translate-x-0 opacity-100 transition-all duration-500 ease-in-out" : "translate-x-100 opacity-0 transition-all duration-500 ease-in-out"}`}>
                    <ProfileInfoCard setShowProfileHandler={setShowProfileHandler} user={user} />
                </div>
            </div>
        </>
    )
}

const AddToCard = ({ setShowAddToCardHandler, card }) => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const shoppingHandler = () => {
        setShowAddToCardHandler()
        return navigate("/products-all")
    }
    const addToCardAllItemHandler = () => {
        setShowAddToCardHandler()
        return navigate("/addToCard")
    }
    return (
        <>
            <div className="min-h-screen lg:w-120 w-screen bg-gray-800 flex flex-col px-4">
                <div className="h-12 w-full flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold">Shopping Card</h1>
                    </div>
                    <div>
                        <button onClick={setShowAddToCardHandler} className="h-8 w-15 flex justify-center items-center text-xl text-white hover:border border-red-500 rounded-md hover:text-red-500 hover:bg-black">X</button>
                    </div>
                </div>
                {card.length === 0 &&
                    <div className="min-h-screen w-full flex flex-col justify-center items-center">
                        <div><h1>No item</h1> </div>
                        <div>
                            <button onClick={shoppingHandler} className="h-[2.8rem] w-40 active:shadow-2xl active:scale-95  transition-all duration-300 ease-in-out shadow-[#141414] bg-blue-500 rounded-lg text-[18px] mt-2 font-sans">Shopping Now</button>
                        </div>
                    </div>}
                {/* add to card */}
                <div className="h-full w-full flex flex-col justify-center items-center gap-2.5">
                    {card.slice(0, 4).map((item) => {
                        return (
                            <AddToCardItem item={item} key={item?._id}/>
                        )
                    })}
                    <div className="h-10 absolute bottom-0 w-80 mb-2 flex justify-between items-center">
                        <div>
                            <button onClick={addToCardAllItemHandler} className="h-10 w-35 rounded-md active:scale-95 transition-all duration-150 ease-in-out text-[18px] font-mono bg-[#7bacda62] text-white">All Item</button>
                        </div>
                        <div>
                            <button className="h-10 w-35 rounded-md active:scale-95 transition-all duration-150 ease-in-out text-[18px] font-mono bg-[#00b7ffa6] text-white">CheckOut</button>
                        </div>
                    </div>
                </div>



            </div>
        </>
    )
}
export default Navbar