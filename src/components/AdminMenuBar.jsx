import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FiHome } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const AdminMenuBar = () => {
  const menuBar = useSelector(state => state.admin.menuBar)
  return (
    <div className={`sticky top-15 max-h-[91vh] z-20 w-80 flex flex-col gap-2 bg-[#184e77] text-white transition-all text-[18px] font-medium font-serif px-4`}>
      <div className='h-20 w-full flex justify-center items-center'>
        <div className='h-full w-full flex gap-2 justify-center items-center text-white'>
          {/* Store Logo */}
          <div>
            <FiHome className='text-[2rem] text-[#d6c25d]' />
          </div>
          {/* Store Details */}
          <div className='h-full w-full flex flex-col justify-center'>
            <div>
              <h1 className='font-bold font-serif'>NPM STORE</h1>
            </div>
            <h1 className='text-[12px] font-bold font-serif'>ADMIN PANEL</h1>
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
          <div className='flex items-center h-10 w-full rounded-[10px] gap-2 px-2'>
            {/* Dashboard Logo */}
            <div>
              <h1><MdDashboard className='text-2xl' /></h1>
            </div>
            <div>
              Dashboard
            </div>
          </div>
        </div>
      </NavLink>
      <div className='flex flex-col gap-1'>
        <NavLink
          to={'/adminPannel/create-products'}
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500' : ""} py-1.5 px-2 rounded-[10px]`
          }
        >Create Products</NavLink>
      </div>
      <div className='flex flex-col gap-1'>
        <NavLink
          to={'/adminPannel/all-products'}
          className={({ isActive }) =>
            `${isActive ? 'bg-blue-500' : ""} py-1.5 px-2 rounded-[10px]`
          }
        >All Products</NavLink>
      </div>
    </div>
  )
}

export default AdminMenuBar
