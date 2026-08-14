import React from 'react'
import { MdMenu } from "react-icons/md"
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { TfiAngleDown } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux';
import { setMenuBar } from '../features/Store/slice/admin.slice.js';

const AdminNavbar = () => {
  const menuBar = useSelector(state => state.admin.menuBar)
  const dispatch = useDispatch()
  const menubarHandler = () => {
    dispatch(setMenuBar())
  }
  return (
    <>
      {/* Responsive update: make the admin header fluid on mobile and preserve its desktop height. */}
      <div className='min-h-15 w-full bg-[#e9e4e4] px-3 sm:px-6 py-2 text-base sm:text-xl font-serif shadow-2xl overflow-x-hidden'>
        <div className='min-h-11 w-full flex justify-between items-center gap-2 bg-[#e9e4e4]'>
          {/* Responsive update: keep the menu control and dashboard title compact on small screens. */}
          <div className='flex items-center gap-2 sm:gap-3.75 min-w-0'>
            <button onClick={menubarHandler} aria-label='Toggle admin menu' className='p-1 sm:p-2 rounded-md active:scale-95 shrink-0'><MdMenu className='text-xl sm:text-2xl' /></button>
            <h1 className='truncate'>Dashboard</h1>
          </div>
          {/* Responsive update: reduce admin action spacing and icon sizes to avoid mobile overflow. */}
          <div className='flex items-center gap-2 sm:gap-4 shrink-0'>
            <IoIosNotifications className='text-xl sm:text-[25px]' />
            <div className='flex items-center gap-1.5 sm:gap-2'>
              <CgProfile className='text-xl sm:text-[25px]' />
              {/* Responsive update: hide the admin label on narrow screens so controls stay inside the viewport. */}
              <h1 className='hidden sm:block text-base sm:text-[18px]'>Admin</h1>
            </div>
            <button className='p-1 sm:p-2' aria-label='Open admin menu'><TfiAngleDown className='text-xs sm:text-base' /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminNavbar
