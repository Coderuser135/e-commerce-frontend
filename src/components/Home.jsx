import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Store/slice/auth.reduer.js'
import { useNavigate } from 'react-router-dom'
import userImage from "../assets/userImage.jpg"

const Home = () => {
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  console.log(user)
  const logoutHandler = async () => {
    const response = await dispatch(logout()).unwrap()
    if(response === 200){
      window.location.reload()
    }
  }
    return (
        <div className='min-h-screen min-w-screen flex flex-col justify-center items-center bg-[#666565] gap-2'>
            <div className='w-80 border-2 border-solid border-[#696969] rounded-xl shadow-2xl flex flex-col gap-2 px-5 py-5 text-[#8b8a8a] font-serif font-extrabold justify-center items-center'>
                <div className='h-[6.9rem] w-[6.9rem] border-2 border-solid border-white rounded-full mb-2'>
                    <img src={userImage} alt='user image' className='h-full w-full rounded-full' />
                </div>
                <div className='py-2 w-full border border-solid border-[#696969] rounded-xl shadow-2xl px-2'>
                    <h1>Full Name: {user?.fullName}</h1>
                </div>
                <div className='py-2 w-full border border-solid border-[#696969] rounded-xl shadow-2xl px-2'>
                    <h1>Email: {user?.email}</h1>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <button onClick={logoutHandler} className='px-5 py-2 bg-[#1073e6] text-white rounded-xl active:scale-105'>logout 💨</button>
            </div>
        </div>
    )
}

export default Home
