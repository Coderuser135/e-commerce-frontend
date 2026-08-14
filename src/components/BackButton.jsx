import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiArrowGoBackLine } from "react-icons/ri";

const BackButton = ({nevigatePage}) => {
    const nevigate = useNavigate()
    const backButtonHandler = () => {
        nevigate(nevigatePage)
    }
  return (
    <div className='w-[95%] m-auto h-5 flex items-center'>
          <div>
            <h1><RiArrowGoBackLine className='text-4xl text-[#a0a0a0] shadow-2xl font-bold' onClick={backButtonHandler}/></h1>
          </div>

    </div>
  )
}

export default BackButton
