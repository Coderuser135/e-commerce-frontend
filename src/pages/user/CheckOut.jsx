import React, { useState } from 'react'

const CheckOut = () => {
    const [inputData, setInputData] = useState({
        firstName: "",
        lastName: "",
        city: "",
        address: "",
        country: "",
        pinCode: ""
    })
    const setInputDataHandler = (e) => {
        const { name, value } = e.target
        setInputData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const {firstName, lastName, city, address, country, pinCode} = inputData
    return (
        <div className='min-h-screen w-full flex flex-col items-center bg-[#ddc7f0]'>
            <div className='mt-10'>
                <h1 className='text-xl font-mono'>CheckOut & Payment Info</h1>
            </div>
            <div className='h-90 w-100 rounded-lg mt-5 shadow-lg shadow-[#464545] hover:scale-102 transition-all duration-150 ease-in-out flex flex-col gap-4 px-6 py-2'>
                <div className='flex justify-between items-center gap-2'>
                    <div>
                        <label className='flex flex-col gap-1 font-serif'>
                            FirstName
                            <input
                                type='text'
                                onChange={setInputDataHandler}
                                name='firstName'
                                value={firstName}
                                placeholder='First'
                                className='border-[0.1px] h-9 w-full px-2 rounded-md focus:outline-none focus:shadow-md shadow-[#b6b4b4] border-[#8d8888]' />
                        </label>
                    </div>
                    <div>
                        <label className='flex flex-col gap-1 font-serif'>
                            LastName
                            <input
                                type='text'
                                onChange={setInputDataHandler}
                                name='lastName'
                                value={lastName}
                                placeholder='Last'
                                className='border-[0.1px] h-9 w-full px-2 rounded-md focus:outline-none focus:shadow-md shadow-[#b6b4b4] border-[#8d8888]' />
                        </label>
                    </div>

                </div>
                <div className='flex flex-col gap-1'>
                    <div className='px-1'>
                        <h1 className='text-[16.5px] font-mono text-[#6e6d6d]'>Shipping Address</h1>
                    </div>

                    <div className='flex flex-col gap-2 justify-center items-center border px-2 h-40 border-[#8d8888] rounded-lg'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between items-center gap-2'>
                                <div>
                                    <label>
                                        <h1 className='text-[15px] font-mono text-[#474747]'>City</h1>
                                        <input
                                            type='text'
                                            onChange={setInputDataHandler}
                                            name='city'
                                            value={city}
                                            placeholder='City'
                                            className='border-[0.1px] h-9 w-full px-2 mt-1 rounded-md focus:outline-none focus:shadow-md shadow-[#b6b4b4] border-[#8d8888]' />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <h1 className='text-[15px] font-mono text-[#474747]'>Country</h1>
                                        <select onChange={setInputDataHandler} name='country' value={country} className='border-[0.1px] h-9 w-40 px-2 rounded-md focus:outline-none focus:shadow-md shadow-[#b6b4b4] border-[#8d8888]'>
                                            <option value={""}>country</option>
                                            <option value={"india"}>India</option>
                                            <option value={"america"}>America</option>
                                            <option value={"indonetia"}>Indonetia</option>
                                            <option value={"russia"}>Russia</option>
                                            <option value={"london"}>London</option>
                                            <option value={"koria"}>Koria</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-2'>
                                <div>
                                    <label>
                                        <h1 className='text-[15px] font-mono text-[#474747]'>Address</h1>
                                        <input
                                            type='text'
                                            onChange={setInputDataHandler}
                                            name='address'
                                            value={address}
                                            placeholder='Address'
                                            className='border-[0.1px] h-9 w-full px-2 rounded-md focus:outline-none focus:shadow-md shadow-[#b6b4b4] border-[#8d8888]' />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <h1 className='text-[15px] font-mono text-[#474747]'>PinCode</h1>
                                        <input
                                            type='text'
                                            onChange={setInputDataHandler}
                                            name='pinCode'
                                            value={pinCode}
                                            placeholder='PinCode'
                                            className='border-[0.1px] h-9 w-full px-2 rounded-md focus:outline-none focus:shadow-md shadow-[#b6b4b4] border-[#8d8888]' />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <button className='h-10.5 w-50 rounded-lg text-white bg-[#4e4eec] active:bg-[#3c3ce7] active:scale-105 transition-all duration-150 ease-in-out active:shadow-md shadow-[#b6b4b4]'>Pay Now</button>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
