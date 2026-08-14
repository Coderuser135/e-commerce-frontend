import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/Store/reducers/auth.reducer.js'
import { useNavigate } from 'react-router-dom'
import userImage from "../assets/userImage.jpg"

const Home = () => {
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  console.log(user)
  const logoutHandler = async () => {
    const response = await dispatch(logout()).unwrap()
  }
    return (
        /* Responsive update: use viewport-safe width/padding and responsive spacing for mobile, tablet and desktop. */
        <div className='min-h-screen w-full flex flex-col justify-center items-center bg-[#666565] gap-2 px-3 py-6 sm:px-5'>
            {/* Responsive update: card width now scales on small screens instead of staying fixed at 20rem. */}
            <div className='w-full max-w-80 border-2 border-solid border-[#696969] rounded-xl shadow-2xl flex flex-col gap-2 px-4 sm:px-5 py-5 text-[#8b8a8a] font-serif font-extrabold justify-center items-center'>
                {/* Responsive update: keep the profile image fluid while preserving its intended size. */}
                <div className='h-24 w-24 sm:h-[6.9rem] sm:w-[6.9rem] border-2 border-solid border-white rounded-full mb-2 shrink-0'>
                    <img src={userImage} alt='user image' className='h-full w-full rounded-full object-cover' />
                </div>
                {/* Responsive update: allow long user information to wrap instead of overflowing on narrow screens. */}
                <div className='py-2 w-full min-w-0 border border-solid border-[#696969] rounded-xl shadow-2xl px-2 break-words'>
                    <h1 className='break-words'>Full Name: {user?.fullName}</h1>
                </div>
                {/* Responsive update: email text can wrap safely on mobile screens. */}
                <div className='py-2 w-full min-w-0 border border-solid border-[#696969] rounded-xl shadow-2xl px-2 break-words'>
                    <h1 className='break-words'>Email: {user?.email}</h1>
                </div>
            </div>
            {/* Responsive update: keep the action area centered and touch-friendly on mobile. */}
            <div className='w-full flex justify-center items-center'>
                <button onClick={logoutHandler} className='px-5 py-2 bg-[#1073e6] text-white rounded-xl active:scale-105'>logout 💨</button>
            </div>
        </div>
    )
}

export default Home
