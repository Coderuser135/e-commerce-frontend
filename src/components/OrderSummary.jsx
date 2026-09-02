import React from 'react'
import { useSelector } from 'react-redux'

const OrderSummary = () => {
    const card = useSelector(state => state.admin.card)
    const totalAmout = card.reduce((acc, current) => {
        return acc + (current?.productsId?.discountPrice * current?.quentity)
    }, 0)
    let discountPrice = 0
    if (totalAmout >= 50000) {
        discountPrice = (totalAmout * 25) / 100
    } else if (totalAmout >= 25000) {
        discountPrice = (totalAmout * 15) / 100
    } else {
        discountPrice = (totalAmout * 5) / 100
    }
    let shippingPrice = 0
    if (totalAmout >= 25000) {
        shippingPrice = 500
    }
    return (
        <div className='w-80 h-92 rounded-xl mb-100 bg-[#cac9c9] hover:scale-x-105 hover:scale-y-110 transition-all duration-300 ease-in-out flex flex-col text-black'>
            <div className='w-full px-5 mt-2'>
                <h1 className='text-xl font-mono'>Order Summary</h1>
            </div>
            <div className='w-full flex justify-center items-center'>
                <div className='border-[0.1px] w-75 border-gray-400'></div>
            </div>
            <div className='h-full w-full mt-2 flex flex-col gap-2 px-2'>
                <div className='w-full'>
                    <h1 className='text-[18px]'>Item ({card.length})</h1>
                </div>
                {/* item image */}
                <div className='w-full h-35 flex flex-col gap-2'>
                    {card.slice(0, 2).map((item) => {
                        return (
                            <div key={item?._id} className='h-15 w-full flex justify-between items-center bg-[#c2bfbf] rounded-lg px-1'>
                                <div className='flex gap-2 items-center'>
                                    <div className='h-12 w-15 bg-[#524e4e] rounded-lg'>
                                        <img src={item?.productsId?.image} className='h-12 w-15 rounded-lg' />
                                    </div>
                                    <div>
                                        <h1 className='text-[16.5px] font-sans'>{item?.quentity} x {item?.productsId?.category}</h1>
                                    </div>
                                </div>
                                <div>
                                    <h1 className='text-[18px] font-mono'>₹{item?.productsId?.discountPrice}</h1>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='w-full flex justify-center items-center'>
                    <div className='border-[0.1px] w-75 border-gray-400'></div>
                </div>
                <div className='flex flex-col w-fulljustify-center items-center gap-2'>
                    <div className='w-full flex items-center justify-between text-[16px] font-mono'>
                        <div>SubTotal</div>
                        <div>₹{totalAmout}</div>
                    </div>
                    <div className='w-full flex items-center justify-between text-[16px] font-mono'>
                        <div className='text-[green]'>Discout({totalAmout >= 50000 ? "25%" : totalAmout >= 25000 ? "15%" : "5%"})</div>
                        <div className='text-[green]'>-₹{discountPrice}</div>
                    </div>
                    <div className='w-full flex items-center justify-between text-[16px] font-mono'>
                        <div>Shpping</div>
                        <div className='text-[#093577]'>{totalAmout >= 25000 ? "₹500" : "Free"}</div>
                    </div>
                    <div className='w-full flex items-center justify-between text-[16px] font-mono'>
                        <div>Total</div>
                        <div>₹{totalAmout - discountPrice + shippingPrice}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
