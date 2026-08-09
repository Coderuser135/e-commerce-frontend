import React, { use } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminRoute = () => {
    const user = useSelector(state => state.auth.user)
    console.log(user)
    if(user.role !== "admin"){
        toast.error("This Data Only Admin Access")
        return <Navigate to={"/home"}/>
    }
    return <Outlet />
}

export default AdminRoute
