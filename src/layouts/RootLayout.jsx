import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import api from '../configs/api.config.js'
import { logoutUser, setaccessToken, setUserData } from '../Store/slice/auth.slice.js'
import Loading from '../components/Loading.jsx'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const RootLayout = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        const refreshToken = await api.get("/api/auth/refresh-token", { withCredentials: true })
        console.log(refreshToken)
        dispatch(setaccessToken(refreshToken.data?.data?.accessToken))
        dispatch(setUserData(refreshToken.data?.data))
      } catch (error) {
        console.log(error.message)
        dispatch(logoutUser())
      } finally {
        setLoading(false)
      }
    }
    isAuthorized()
  }, [dispatch])
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <Outlet />
      <ToastContainer position='top-right' autoClose={3500}/>
    </>
  )
}

export default RootLayout
