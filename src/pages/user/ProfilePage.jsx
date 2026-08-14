import React from 'react'
import { useSelector } from 'react-redux'
import userImage from "../../assets/userImage.jpg"
import BackButton from '../../components/BackButton'

const ProfilePage = () => {
  const user = useSelector(state => state.auth.user)
  console.log(user)
  return (
    /* Responsive update: keep the profile page centered with safe mobile padding and prevent horizontal overflow. */
    <div className='min-h-screen w-full flex flex-col relative justify-center items-center bg-[#F7EAE0] px-3 py-8 overflow-x-hidden'>
      {/* Responsive update: position the back button safely within the mobile viewport. */}
      <div className='absolute top-3 left-3 sm:top-5 sm:left-5'>
        <div>
          <BackButton nevigatePage={"/"}/>
        </div>
      </div>
      {/* Responsive update: scale the profile heading for mobile screens. */}
      <div className='mb-4 sm:mb-2 pt-4'>
        <h1 className='text-xl sm:text-2xl font-serif'>Your Profile</h1>
      </div>
      {/* Responsive update: make the profile card fluid on phones while keeping the existing desktop width. */}
      <div className='w-full max-w-[18.75rem] min-h-[25rem] bg-[#F7EAE0] shadow-2xl shadow-black hover:shadow-2xl hover:shadow-amber-500 rounded-2xl flex flex-col hover:scale-105 transition-all duration-300 ease-in-out'>
        <div className='h-30 relative bg-blue-500 w-full rounded-tl-2xl rounded-tr-2xl flex justify-center items-center'>
          {/* Responsive update: keep the profile image proportional and centered on small screens. */}
          <div className='h-28 w-28 absolute top-8 border-6 border-blue-500 bg-white rounded-full flex justify-center items-center'>
            <div>
              <img src={user.userImage !== null ? user.userImage : userImage} className='h-24 w-24 rounded-full object-cover' />
            </div>
          </div>
          {/* Responsive update: use fluid information rows instead of fixed widths that can overflow on mobile. */}
          <div className='h-auto w-full absolute top-35 px-3 sm:px-4 flex justify-center flex-col items-center gap-2'>
            <div className='flex flex-wrap gap-1 sm:gap-2 items-center hover:border hover:scale-102 transition-all duration-100 ease-in-out hover:shadow-2xl hover:shadow-black w-full min-w-0 px-2 h-auto min-h-10 py-2 rounded-xl text-sm sm:text-base break-words'>
              <div className='shrink-0'>Email: </div>
              <div className='min-w-0 break-all'>{user.email}</div>
            </div>
            <div className='flex flex-wrap gap-1 sm:gap-2 items-center hover:border hover:scale-102 transition-all duration-100 ease-in-out hover:shadow-2xl hover:shadow-black w-full min-w-0 px-2 h-auto min-h-10 py-2 rounded-xl text-sm sm:text-base break-words'>
              <div className='shrink-0'>Full Name: </div>
              <div className='min-w-0 break-words'>{user.fullName}</div>
            </div>
            <div className='flex flex-wrap gap-1 sm:gap-2 items-center hover:border hover:scale-102 transition-all duration-100 ease-in-out hover:shadow-2xl hover:shadow-black w-full min-w-0 px-2 h-auto min-h-10 py-2 rounded-xl text-sm sm:text-base'>
              <div className='shrink-0'>Verify: </div>
              <div className={`${user.isVerify === true ? "bg-green-600" : "bg-red-500"} min-w-10 px-1 flex justify-center items-center rounded-xs text-white text-xs sm:text-sm`}>{user.isLogin === true ? "True" : "False"}</div>
            </div>
            <div className='flex flex-wrap gap-1 sm:gap-2 items-center hover:border hover:scale-105 transition-all duration-100 ease-in-out hover:shadow-2xl hover:shadow-black w-full min-w-0 px-2 h-auto min-h-10 py-2 rounded-xl text-sm sm:text-base'>
              <div className='shrink-0'>Login: </div>
              <div className={`${user.isLogin === true ? "bg-green-600" : "bg-red-500"} min-w-10 px-1 flex justify-center items-center rounded-xs text-white text-xs sm:text-sm`}>{user.isLogin === true ? "True" : "False"}</div>
            </div>
            <div className='flex flex-wrap gap-1 sm:gap-2 items-center hover:border hover:scale-102 transition-all duration-100 ease-in-out hover:shadow-2xl hover:shadow-black w-full min-w-0 px-2 h-auto min-h-10 py-2 rounded-xl text-sm sm:text-base break-words'>
              <div className='shrink-0'>Role: </div>
              <div className='min-w-0 break-words'>{user.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
