import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { paymentVerify } from '../../features/Store/reducers/admin.reducer.js'
import { toast } from 'react-toastify'
import ButtonLoading from '../../components/ButtonLoading.jsx'
import Razorpay from "razorpay"
import OrderSummary from '../../components/OrderSummary.jsx'
import api from '../../configs/api.config.js'

const CheckOut = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const card = useSelector(state => state.admin.card)
    const loading = useSelector(state => state.admin.loading)
    const paymentVerifyStatus = useSelector(state => state.admin.paymentVerifyStatus)
    const navigate = useNavigate()
    const [inputData, setInputData] = useState({
        firstName: "",
        lastName: "",
        city: "",
        address: "",
        country: "",
        state: "",
        phone: "",
        pinCode: ""
    })
    const setInputDataHandler = (e) => {
        const { name, value } = e.target
        setInputData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const { firstName, lastName, city, address, country, pinCode, state, phone } = inputData
    const checkOutInputData = {
        name: firstName + lastName,
        shippingAddress: {
            city,
            address,
            country,
            state,
            pinCode,
            phone
        }
    }
    let paymentStatus = null
    const paymentHandler = async () => {
        if (!firstName || !lastName || !city || !address || !country || !pinCode || !state || !phone) {
            return toast.error("All order fields are required")
        }
        if (card.length === 0) {
            return toast.error("No Products Card Item")
        }
        const createPaymentOrder = await api.post(`/api/order/payment/createOrder`, checkOutInputData, { headers: { Authorization: `Bearer ${user?.accessToken}` } })
        if (createPaymentOrder.status !== 200) return
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: createPaymentOrder?.data?.amount,
            currency: "INR",
            name: "NPM Store",
            description: "Products Item Order Payment",
            order_id: createPaymentOrder?.data?.paymentOrderId,
            handler: async (response) => {
                console.log(response)
                const verifyData = {
                    name: firstName + lastName,
                    shippingAddress: {
                        city,
                        address,
                        country,
                        state,
                        pinCode,
                        phone
                    },
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                }
                const paymentVerifyDataStatus = await dispatch(paymentVerify({
                    verifyData,
                    bearerToken: user?.accessToken
                })).unwrap()
                if (paymentVerifyDataStatus === 201 || paymentVerifyDataStatus === 200) {
                    setInputData({
                        firstName: "",
                        lastName: "",
                        city: "",
                        address: "",
                        country: "",
                        state: "",
                        phone: "",
                        pinCode: ""
                    })
                    return navigate("/products")
                }
            }
        }
        const razorpay = new window.Razorpay(options)
        razorpay.open()
        console.log("hello")
        console.log(paymentStatus)
    }
    return (
        <div className='min-h-screen w-full flex flex-col items-center bg-[#ddc7f0]'>
            <div className='mt-10'>
                <h1 className='text-xl font-mono'>CheckOut & Payment Info</h1>
            </div>
            <div className='flex mt-5 h-110 gap-10'>
                <div className='w-100 rounded-lg shadow-lg shadow-[#464545] hover:scale-102 transition-all duration-150 ease-in-out flex flex-col gap-4 px-6 py-4'>
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

                        <div className='flex flex-col gap-2 justify-center items-center border px-2 border-[#8d8888] rounded-lg py-2'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex justify-between items-center gap-2'>
                                    <div>
                                        <label>
                                            <h1 className='text-[15px] font-mono text-[#474747]'>State</h1>
                                            <select onChange={setInputDataHandler} name='state' value={state} className='border-[0.1px] h-9 w-40 px-2 rounded-md focus:outline-none focus:shadow-md shadow-[#b6b4b4] border-[#8d8888]'>
                                                <option value={""}>State</option>
                                                <option value={"bihar"}>Bihar</option>
                                                <option value={"himachal predesh"}>Himachal predesh</option>
                                                <option value={"sikkim"}>Sikkim</option>
                                                <option value={"gandhighar"}>Gandhighar</option>
                                                <option value={"arunachal predesh"}>Arunachal predesh</option>
                                                <option value={"ganjtok"}>Ganjtok</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <h1 className='text-[15px] font-mono text-[#474747]'>Country</h1>
                                            <select onChange={setInputDataHandler} name='country' value={country} className='border-[0.1px] h-9 w-40 px-2 rounded-md focus:outline-none focus:shadow-md shadow-[#b6b4b4] border-[#8d8888]'>
                                                <option value={""}>Country</option>
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
                                <div>
                                    <label>
                                        <h1 className='text-[15px] font-mono text-[#474747]'>Address</h1>
                                        <textarea
                                            type='text'
                                            onChange={setInputDataHandler}
                                            name='address'
                                            value={address}
                                            placeholder='Address....'
                                            className='border-[0.1px] h-9 w-full px-2 rounded-md focus:outline-none focus:shadow-md shadow-[#b6b4b4] border-[#8d8888]' />
                                    </label>
                                </div>
                                <div className='flex justify-between items-center gap-2'>
                                    <div>
                                        <label>
                                            <h1 className='text-[15px] font-mono text-[#474747]'>Phone</h1>
                                            <input
                                                type='number'
                                                onChange={setInputDataHandler}
                                                name='phone'
                                                value={phone}
                                                placeholder='Phone'
                                                className='border-[0.1px] h-9 w-32 px-2 mt-1 rounded-md focus:outline-none focus:shadow-md shadow-[#b6b4b4] border-[#8d8888]' />
                                        </label>
                                    </div>
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
                                            <h1 className='text-[15px] font-mono text-[#474747]'>PinCode</h1>
                                            <input
                                                type='number'
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
                        <button onClick={paymentHandler} className='h-10.5 w-50 rounded-lg text-white bg-[#4e4eec] active:bg-[#3c3ce7] active:scale-105 transition-all duration-150 ease-in-out active:shadow-md shadow-[#b6b4b4]'>{loading === true ? <ButtonLoading /> : "Pay Now"}</button>
                    </div>
                </div>
                <div>
                    <OrderSummary />
                </div>
            </div>

        </div>
    )
}

export default CheckOut
