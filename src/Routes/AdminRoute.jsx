import React, { use } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminRoute = () => {
    const user = useSelector(state => state.auth.user)
    if(user.role !== "admin"){
        toast.error("This Page Only Admin Access")
        return <Navigate to={"/products"}/>
    }
    return <Outlet />
}

export default AdminRoute
