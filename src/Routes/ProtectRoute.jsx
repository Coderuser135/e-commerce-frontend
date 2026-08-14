import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = () => {
    const token = useSelector(state => state.auth.token)
    if (!token) {
        return <Navigate to={"/login"} replace />
    }
    return <Outlet />
}

export default ProtectRoute
