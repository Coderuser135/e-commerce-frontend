import React from 'react'
import { useState } from 'react';
import { CiFilter } from "react-icons/ci";
import { FiBox } from "react-icons/fi";
import { GoChevronRight } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';


const OrderPage = () => {
    const getSingleOrderItem = useSelector(state => state.admin.getSingleOrderItem)
    const dispatch = useDispatch()
    const [filterUrl, setFilterUrl] = useState({
        url: "All"
    })
    const filterOrderItem = (status) => {
        const filterOrderItemData = getSingleOrderItem.filter((item) => item?.status === status)
        return filterOrderItemData
    }
    const filterAllHandler = () => {
        setFilterUrl((prev) => ({
            ...prev,
            url: "All"
        }))
    }
    const filterProcessingHandler = () => {
        setFilterUrl((prev) => ({
            ...prev,
            url: "Processing"
        }))
    }
    const filterDeliveredHandler = () => {
        setFilterUrl((prev) => ({
            ...prev,
            url: "Delivered"
        }))
    }
    const filterShippedHandler = () => {
        setFilterUrl((prev) => ({
            ...prev,
            url: "Shipped"
        }))
    }
    const filterCancelledHandler = () => {
        setFilterUrl((prev) => ({
            ...prev,
            url: "Cancelled"
        }))
    }
    const filterData = filterUrl.url === "All" ? getSingleOrderItem : filterOrderItem(filterUrl.url)
    return (
        <div className='min-h-screen w-full bg-[#e4e1e1] flex flex-col px-6 gap-4'>
            <div className='w-full flex flex-col mt-5'>
                <div>
                    <h1 className='text-xl font-medium'>My Orders</h1>
                </div>
                <div>
                    <h1 className='text-[13.5px] text-[#4e4e4e]'>Track and manage your order history</h1>
                </div>
            </div>
            <div className='h-15 w-full border mb-5 border-[#9ea0a0] shadow-xl flex items-center px-5 rounded-xl gap-5'>
                <div className='flex items-center gap-1'>
                    <div>
                        <h1 className='text-xl text-[#0077ff]'><CiFilter /></h1>
                    </div>
                    <div>
                        <h1 className='font-medium'>Filter by status:</h1>
                    </div>
                </div>
                {/* filter buttons  */}
                <div className='flex gap-2 items-center'>
                    <button onClick={filterAllHandler} className={`py-1.5 px-5 border ${filterUrl.url === "All" ? "bg-[#4080e0] text-white" : "bg-[#94b2e056] border-[#aeaef0]"} rounded-[10px] font-medium`}>All</button>
                    <button onClick={filterProcessingHandler} className={`py-1.5 px-5 border ${filterUrl.url === "Processing" ? "bg-[#4080e0] text-white" : "bg-[#94b2e056] border-[#aeaef0]"} rounded-[10px] font-medium`}>Processing</button>
                    <button onClick={filterShippedHandler} className={`py-1.5 px-5 border ${filterUrl.url === "Shipped" ? "bg-[#4080e0] text-white" : "bg-[#94b2e056] border-[#aeaef0]"} rounded-[10px] font-medium`}>Shipped</button>
                    <button onClick={filterDeliveredHandler} className={`py-1.5 px-5 border ${filterUrl.url === "Delivered" ? "bg-[#4080e0] text-white" : "bg-[#94b2e056] border-[#aeaef0]"} rounded-[10px] font-medium`}>Delivered</button>
                    <button onClick={filterCancelledHandler} className={`py-1.5 px-5 border ${filterUrl.url === "Cancelled" ? "bg-[#4080e0] text-white" : "bg-[#94b2e056] border-[#aeaef0]"} rounded-[10px] font-medium`}>Cancelled</button>
                </div>
            </div>
            {filterData.length < 1 || filterData.length === 0 ? <div className='w-full flex items-center justify-center'><div className='flex justify-center items-center gap-4 h-14 w-50 rounded-md shadow-2xl bg-[#cccaca]'>
                <div><h1 className='text-4xl'><FiBox /></h1></div>
                <div><h1 className='text-xl font-medium'>No Orders</h1></div>
            </div>
            </div>

                :
                <div className='w-full flex flex-col gap-4 mb-10'>

                    {filterData.map((item) => {
                        return (
                            <div key={item?._id} className='h-58 w-full bg-[#dddddd] shadow-xl shadow-[#d6d6d6] border border-[#bbbaba] rounded-xl flex flex-col gap-2'>
                                <div className='flex items-center justify-between px-4'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='mt-2 w-105 flex justify-between items-center'>
                                            <div className='w-72 flex justify-between items-center'>
                                                <div>
                                                    <h1 className='font-medium'>Order ID:</h1>
                                                </div>
                                                <div>
                                                    <h1 className='font-medium'>#{item?._id}</h1>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className={`py-0.5 px-5 border 
                                    ${item?.status === "Pending" ? "border-[#eeaa8b] text-[#df381b] bg-[#ee927631]" :
                                                        item?.status === "Shipped" ? "border-[#88bbeb] text-[#094f7e] bg-[#78d4f031]" :
                                                            item?.status === "Cancelled" ? "border-[#121312] text-[#131212] bg-[#eaebea31]" :
                                                                item?.status === "Delivered" ? "border-[#8bee8b] text-[#077a07] bg-[#76ee7631]" : "border-[#ee8bac] text-[#7a074a] bg-[#ee76da31]"} rounded-md`}>{item?.status}</h1>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <div>
                                                <h1 className='text-[12.5px] font-medium text-[#424040]'>  {new Date(item?.createdAt).toLocaleString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: '2-digit'
                                                })}</h1>
                                            </div>
                                            <div>
                                                <h1 className='h-1 w-1 border rounded-full bg-black'></h1>
                                            </div>
                                            <div>
                                                <h1 className='text-[12.5px] font-medium text-[#424040]'>{item.orderItems.length} Items</h1>
                                            </div>
                                            <div>
                                                <h1 className='h-1 w-1 border rounded-full bg-black'></h1>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <h1 className='text-[12.5px] font-medium text-[#424040]'>Total Amount:</h1>
                                                <h1 className='text-[12.5px] font-medium text-[#131212]'>₹{item?.totalPrice}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex items-center gap-1 py-1.5 px-4 hover:scale-105 active:scale-95 transition-all duration-150 ease-in-out active:shadow-2xl border rounded-md border-[#2e2e96] text-[#2e2e96] font-medium'>
                                            <div>
                                                <h1>View Details</h1>
                                            </div>
                                            <div>
                                                <h1><GoChevronRight /></h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='h-25 px-4 border border-l-0 border-r-0 border-[#bbbaba] w-full flex items-center gap-6'>
                                    {item?.orderItems.slice(0, 5).map((orderItem) => {
                                        return (
                                            <div key={orderItem?._id} className='flex items-center py-1 px-2 rounded-md gap-2'>
                                                <div className='border h-13.5 border-[#a7a4a4b6] bg-[#bdbcbc54] rounded-md w-15'>
                                                    <img src={orderItem.image} className='aspect-video object-contain h-full w-full p-1' />
                                                </div>
                                                <div className='w-30 flex flex-col text-[13px] font-medium text-[#1b1b1b]'>
                                                    <div>
                                                        <h1 className='w-30 truncate '>{orderItem.title}</h1>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div>
                                                            <h1>Qty: {orderItem.quentity}</h1>
                                                        </div>
                                                        <div>
                                                            <h1 className='h-1 w-1 rounded-full bg-black'></h1>
                                                        </div>
                                                        <div>
                                                            <h1>₹{orderItem.price}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='h-12 flex items-center gap-2 px-4'>
                                    <div className='w-100 border-r mb-2 border-[#bbbaba] flex flex-col text-[15px] font-mono'>
                                        <div>
                                            <h1>Payment Method</h1>
                                        </div>
                                        <div>
                                            <h1>UPI</h1>
                                        </div>
                                    </div>
                                    <div className='w-100 flex flex-col text-[15px] font-mono'>
                                        <div>
                                            <h1>Shipping Address</h1>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <h1>{item?.fullName},</h1>
                                            <h1 className='truncate'>{item?.shippingAddress?.address},</h1>
                                            <h1>{item?.shippingAddress?.city},</h1>
                                            <h1>{item?.shippingAddress?.state},</h1>
                                            <h1>{item?.shippingAddress?.country}-</h1>
                                            <h1>{item?.shippingAddress?.pinCode}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default OrderPage
