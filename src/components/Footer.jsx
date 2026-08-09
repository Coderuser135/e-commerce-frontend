import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return(
        <>
        <div className=' w-full flex flex-col bg-[#978F66] text-[#E4D6A9]'>
            <div className='w-full flex justify-between px-20 pb-10 pt-5'>
                <div className='flex flex-col gap-1'>
                    <div>
                        <h1 className='text-xl font-bold'>Funda E-Commerce</h1>
                    </div>
                    <div className='w-50 text-xl font-sans'>
                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptate</h1>
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <div>
                        <h1 className='text-xl font-bold'>Quick Links</h1>
                    </div>
                    <div className='flex flex-col gap-1 text-xl'>
                        <h1>Home</h1>
                        <h1>About</h1>
                        <h1>Contact</h1>
                        <h1>Help</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div>
                        <h1 className='text-xl font-bold'>Shop Now</h1>
                    </div>
                    <div className='flex flex-col gap-1 text-xl'>
                        <h1>New Products</h1>
                        <h1>Clother Item</h1>
                        <h1>Fruits Item</h1>
                        <h1>Show Item</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-1 text-xl'>
                    <div>
                        <h1 className='text-xl font-bold'>Research Us</h1>
                    </div>
                    <div className='flex flex-col gap-1 text-xl'>
                        <h1>+91 4545545454</h1>
                        <h1>Hello@gamil.com</h1>
                    </div>
                </div>
            </div>
            <div className='w-full h-10 bg-[#B0BA99] flex items-center px-20 justify-between'>
                <div>
                    <h1 className='text-[18px] font-medium text-[#e2dddd]'>© All Documents Registed</h1>
                </div>
                <div className='flex justify-between items-center text-xl w-35 text-[#e2dddd]'>
                    <h1><FaFacebookF /></h1>
                    <h1><FaTwitter /></h1>
                    <h1><MdEmail /></h1>
                    <h1><FaLinkedinIn /></h1>
                </div>
            </div>
        </div>
        </>
    )
}
export default Footer