import React from "react"

const ButtonLoading = () => {
  return (
    <>
      <div className='flex justify-center items-center'>
        <div className="text-center">
          <div
            className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-[#dad2d2] mx-auto"
          ></div>
        </div>
      </div>
    </>
  )
}

export default ButtonLoading
