import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddToCardItem from '../../components/AddToCard'
import { useNavigate } from 'react-router-dom'

const AddToCardPage = () => {
  const card = useSelector(state => state.admin.card)
  const nevigate = useNavigate()
  const shoppingHandler = () => {
    return nevigate("/products-all")
  }
  const totalAmout = card.reduce((acc, current) => {
    return acc + (current?.productsId?.discountPrice * current?.quentity)
  }, 0)
  console.log(card)
  let discountPrice = 0
  if (totalAmout >= 50000) {
    discountPrice = (totalAmout * 25) / 100
  } else if(totalAmout >= 25000) {
    discountPrice = (totalAmout * 15) / 100
  } else{
    discountPrice = (totalAmout * 5) / 100
  }
  let shippingPrice = 0
  if(totalAmout >= 25000){
    shippingPrice = 500
  }
  const checkOutNavigateHandler = () => {
    return nevigate("/checkout")
  }
  return (
    <div className='min-h-screen w-full bg-[#afadbb] flex flex-col px-6 gap-2 text-[#c2bfbf]'>
      {/* buttons item */}
      <div className='flex justify-end transition-all duration-150 ease-in-out items-ceter mt-5 fixed top-20 right-6'>
        <div className='flex gap-5'>
          <div>
            <button onClick={checkOutNavigateHandler} className='h-12 w-48 bg-[#087908] active:scale-95 hover:scale-105 transition-all duration-150 ease-in-out hover:shadow-xl shadow-[#292828] rounded-[10px] text-[18px] text-white'>Checkout to  Process</button>
          </div>
          <div>
            <button onClick={shoppingHandler} className='h-12 w-40 bg-[#087908] active:scale-95 hover:scale-105 transition-all duration-150 ease-in-out hover:shadow-xl shadow-[#292828] rounded-[10px] text-[18px] text-white'>Shopping Now</button>
          </div>
        </div>
      </div>
      <div className='w-full flex relative mb-5 gap-50 mt-22'>
        {card.length < 1 || card.length === 0 ?
          <div className='min-h-105 w-150 flex flex-col justify-center items-center gap-4'>
            <div>
              <h1 className='text-xl font-bold text-black'>No Shopping Item</h1>
            </div>
            <div>
              <button onClick={shoppingHandler} className='h-12 w-40 bg-[#087908] active:scale-95 hover:scale-105 transition-all duration-150 ease-in-out hover:shadow-xl shadow-[#292828] rounded-[10px] text-[18px] text-white'>Shopping Now</button>
            </div>
          </div> :
          <div className='h-full w-150 flex flex-col gap-2 pl-20'>
            {card.map((item) => {
              return (
                <AddToCardItem item={item} key={item?._id} />
              )
            })}
          </div>
        }
        <div className='w-80 h-92 rounded-xl fixed top-35 right-50 bottom-0 mt-10 mb-100 bg-[#cac9c9] flex flex-col text-black'>
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
                <div>Subtotal</div>
                <div>₹{totalAmout}</div>
              </div>
              <div className='w-full flex items-center justify-between text-[16px] font-mono'>
                <div className='text-[green]'>Discout({totalAmout >= 50000 ? "25%" : totalAmout >= 25000 ? "15%": "5%"})</div>
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
      </div>
    </div>
  )
}

export default AddToCardPage
