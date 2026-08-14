import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return(
        <>
        {/* Responsive update: footer content changes from a single wide row to a responsive grid. */}
        <div className='w-full flex flex-col bg-[#978F66] text-[#E4D6A9] mt-5'>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-5 sm:px-8 lg:px-20 pb-10 pt-5'>
                {/* Responsive update: prevent fixed text width from causing horizontal overflow. */}
                <div className='flex flex-col gap-1 min-w-0'>
                    <div>
                        <h1 className='text-xl font-bold'>Funda E-Commerce</h1>
                    </div>
                    <div className='w-full max-w-50 text-base sm:text-lg lg:text-xl font-sans'>
                        <h1 className='break-words'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptate</h1>
                    </div>
                </div>

                <div className='flex flex-col gap-1 min-w-0'>
                    <div>
                        <h1 className='text-xl font-bold'>Quick Links</h1>
                    </div>
                    <div className='flex flex-col gap-1 text-base sm:text-lg lg:text-xl'>
                        <h1>Home</h1>
                        <h1>About</h1>
                        <h1>Contact</h1>
                        <h1>Help</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-1 min-w-0'>
                    <div>
                        <h1 className='text-xl font-bold'>Shop Now</h1>
                    </div>
                    <div className='flex flex-col gap-1 text-base sm:text-lg lg:text-xl'>
                        <h1>New Products</h1>
                        <h1>Clother Item</h1>
                        <h1>Fruits Item</h1>
                        <h1>Show Item</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-1 min-w-0 text-base sm:text-lg lg:text-xl'>
                    <div>
                        <h1 className='text-xl font-bold'>Research Us</h1>
                    </div>
                    <div className='flex flex-col gap-1 break-words'>
                        <h1>+91 4545545454</h1>
                        <h1 className='break-all'>Hello@gamil.com</h1>
                    </div>
                </div>
            </div>
            {/* Responsive update: bottom bar stacks on mobile and becomes a row on larger screens. */}
            <div className='w-full min-h-10 bg-[#B0BA99] flex flex-col sm:flex-row items-center px-5 sm:px-8 lg:px-20 py-2 sm:py-0 gap-2 sm:gap-4 justify-between'>
                <div>
                    <h1 className='text-sm sm:text-[18px] font-medium text-[#e2dddd] text-center'>© All Documents Registed</h1>
                </div>
                {/* Responsive update: social icons remain centered and fit within narrow screens. */}
                <div className='flex justify-center items-center gap-5 text-xl text-[#e2dddd]'>
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