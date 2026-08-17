import React from "react"
import { useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
import { RiAdminLine } from "react-icons/ri";
import { FaBorderStyle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const InfoCard = ({ role, setShowCard }) => {
    const nevigate = useNavigate()
    const profileHandler = () => {
        nevigate("/my-profile")
        setShowCard(false)
    }
    const adminPannelHandler = () => {
        nevigate("/adminPannel")
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
                    <div onClick={adminPannelHandler} className="h-10 w-full flex items-center gap-2 p-1 hover:bg-[#e2f1f0] hover:border active:scale-95 transition-all duration-75 hover:scale-105 hover:shadow-xl active:select-none active:shadow-[#d3cfcf] ease-in-out rounded-[10px]">
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

export default InfoCard