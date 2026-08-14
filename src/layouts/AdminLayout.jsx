import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from "../components/AdminNavbar"
import { useDispatch, useSelector } from 'react-redux'
import AdminMenuBar from '../components/AdminMenuBar'
import { getProducts } from '../features/Store/reducers/products.reducer.js'

const AdminLayout = () => {
  const menuBar = useSelector(state => state.admin.menuBar)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts({
      bearerToken: user?.accessToken
    }))
  }, [])
  return (
    <div className='min-h-screen relative h-full w-full flex flex-col bg-[#d6d3d3]'>
      {/* admin navbar */}
      <div className='h-full w-full sticky top-0 z-20'>
        <AdminNavbar />
      </div>
      {/* admin route page & menu bar */}
      <div className='h-full z-10 w-full flex bg-[#d6d3d3]'>
        {menuBar && <AdminMenuBar />}
        <div className='min-h-screen w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
