import React from 'react'

const Loading = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center bg-[#FFE2E2]'>
            <div className="text-center">
                <div
                    className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
                ></div>
            </div>
        </div>
    )
}

export default Loading
