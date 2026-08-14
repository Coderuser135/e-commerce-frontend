import React from 'react'
import { useSelector } from 'react-redux'
import userImage from "../../assets/userImage.jpg"
import BackButton from '../../components/BackButton'

const ProfilePage = () => {
  const user = useSelector(state => state.auth.user)
  console.log(user)
  return (
    <div className='min-h-screen flex flex-col relative justify-center items-center bg-[#F7EAE0]'>
      <div className='absolute top-5 left-5'>
        <div>
          <BackButton nevigatePage={"/"}/>
        </div>
      </div>
      <div className='mb-2'>
        <h1 className='text-2xl font-serif'>Your Profile</h1>
      </div>
      <div className='h-100 w-75 bg-[#F7EAE0] shadow-2xl shadow-black hover:shadow-2xl hover:shadow-amber-500 rounded-2xl flex flex-col hover:scale-105 transition-all duration-300 ease-in-out'>
        <div className='h-30 relative bg-blue-500 w-full rounded-tl-2xl rounded-tr-2xl flex justify-center items-center'>
          <div className='h-28 w-28 absolute top-8 border-6 border-blue-500 bg-white rounded-full flex justify-cente items-center'>
            <div>
              <img src={user.userImage !== null ? user.userImage : userImage} className='h-24 w-26 rounded-full' />
            </div>
          </div>
          <div className='h-60 w-full absolute top-35 flex justify-center flex-col items-center gap-2'>
            <div className='flex gap-2 items-center hover:border hover:scale-102 transition-all duration-100 ease-in-out hover:shadow-2xl hover:shadow-black w-70 px-2 h-10 rounded-xl'>
              <div>Email: </div>
              <div>{user.email}</div>
            </div>
            <div className='flex gap-2 items-center hover:border hover:scale-102 transition-all duration-100 ease-in-out hover:shadow-2xl hover:shadow-black w-70 px-2 h-10 rounded-xl'>
              <div>Full Name: </div>
              <div>{user.fullName}</div>
            </div>
            <div className='flex gap-2 items-center hover:border hover:scale-102 transition-all duration-100 ease-in-out hover:shadow-2xl hover:shadow-black w-70 px-2 h-10 rounded-xl'>
              <div>Verify: </div>
              <div className={`${user.isVerify === true ? "bg-green-600" : "bg-red-500"} w-10 flex justify-center itmes-center rounded-xs text-white`}>{user.isLogin === true ? "True" : "False"}</div>
            </div>
            <div className='flex gap-2 items-center hover:border hover:scale-105 transition-all duration-100 ease-in-out hover:shadow-2xl hover:shadow-black w-70 px-2 h-10 rounded-xl'>
              <div>Login: </div>
              <div className={`${user.isLogin === true ? "bg-green-600" : "bg-red-500"} w-10 flex justify-center itmes-center rounded-xs text-white`}>{user.isLogin === true ? "True" : "False"}</div>
            </div>
              <div className='flex gap-2 items-center hover:border hover:scale-102 transition-all duration-100 ease-in-out hover:shadow-2xl hover:shadow-black w-70 px-2 h-10 rounded-xl'>
              <div>Role: </div>
              <div>{user.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
