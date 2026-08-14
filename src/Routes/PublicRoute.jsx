import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
    const token = useSelector(state => state.auth.token)
    if (token) {
        return <Navigate to={"/products"} replace />
    }
    return <Outlet />
}
export default PublicRoute
