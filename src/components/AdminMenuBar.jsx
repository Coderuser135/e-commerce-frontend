import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FiHome } from "react-icons/fi";
import { TbCubePlus } from "react-icons/tb";
import { SiHackthebox } from "react-icons/si";
import { MdDashboard } from "react-icons/md";

const AdminMenuBar = () => {
  const menuBar = useSelector(state => state.admin.menuBar)
  return (
    <>
      {/* Responsive update: desktop keeps a sidebar, while mobile turns it into a compact overlay so it does not squeeze the page content. */}
      <div className={`fixed lg:sticky top-15 left-0 h-[calc(100vh-3.75rem)] max-h-[calc(100vh-3.75rem)] z-30 w-[min(20rem,85vw)] lg:w-80 flex flex-col gap-2 bg-[#184e77] text-white transition-all duration-300 text-base sm:text-[18px] font-medium font-serif px-3 sm:px-4 overflow-y-auto shadow-2xl ${menuBar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className='h-20 w-full flex justify-center items-center shrink-0'>
          <div className='h-full w-full flex gap-2 justify-center items-center text-white'>
            {/* Store Logo */}
            <div className='shrink-0'>
              <FiHome className='text-2xl sm:text-[2rem] text-[#d6c25d]' />
            </div>
            {/* Store Details */}
            <div className='h-full w-full min-w-0 flex flex-col justify-center'>
              <div>
                <h1 className='font-bold font-serif truncate'>NPM STORE</h1>
              </div>
              <h1 className='text-[11px] sm:text-[12px] font-bold font-serif'>ADMIN PANEL</h1>
            </div>
          </div>
        </div>
        {/* Admin Dashboard */}
        <NavLink
          to={'/adminPannel/dashboard'}
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500 rounded-bl-xl rounded-tr-xl' : ""} font-serif`
          }
        >
          <div className='w-full flex justify-center'>
            <div className='flex items-center min-h-10 w-full rounded-[10px] gap-2 px-2 py-2'>
              {/* Dashboard Logo */}
              <div className='shrink-0'>
                <h1><MdDashboard className='text-xl sm:text-2xl' /></h1>
              </div>
              <div className='truncate'>
                Dashboard
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          to={'/adminPannel/create-products'}
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500 rounded-bl-xl rounded-tr-xl' : ""} font-serif`
          }
        >
          <div className='w-full flex justify-center'>
            <div className='flex items-center min-h-10 w-full rounded-[10px] gap-2 px-2 py-2'>
              {/* Dashboard Logo */}
              <div className='shrink-0'>
                <h1><TbCubePlus className='text-xl sm:text-2xl' /></h1>
              </div>
              <div className='truncate'>
                Create
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          to={'/adminPannel/all-products'}
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500 rounded-bl-xl rounded-tr-xl' : ""} font-serif`
          }
        >
          <div className='w-full flex justify-center'>
            <div className='flex items-center min-h-10 w-full rounded-[10px] gap-2 px-2 py-2'>
              {/* Dashboard Logo */}
              <div className='shrink-0'>
                <h1><SiHackthebox className='text-xl sm:text-2xl' /></h1>
              </div>
              <div className='truncate'>
                Products
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  )
}

export default AdminMenuBar
