import React, { useState } from 'react'
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
      <div className='h-15 w-full bg-[#e9e4e4] px-6 text-xl font-serif shadow-2xl'>
        <div className='h-full w-full flex justify-between items-center bg-[#e9e4e4]'>
          <div className='flex justify-between items-center gap-3.75'>
            <div>
              <button onClick={menubarHandler}><h1><MdMenu /></h1></button>
            </div>
            <div>
              <h1>Dashboard</h1>
            </div>
          </div>
          <div className='flex justify-between items-center gap-4'>
            <div>
              <h1 className='text-[25px]'><IoIosNotifications /></h1>
            </div>
            <div className='flex justify-between items-center gap-2'>
              <h1 className='text-[25px]'><CgProfile /></h1>
              <h1 className='text-[18px]'>Admin</h1>
            </div>
            <div>
              <h1><TfiAngleDown /></h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminNavbar
