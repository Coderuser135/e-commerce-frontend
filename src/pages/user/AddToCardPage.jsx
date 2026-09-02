import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddToCardItem from '../../components/AddToCard'
import { useNavigate } from 'react-router-dom'
import OrderSummary from '../../components/OrderSummary'

const AddToCardPage = () => {
  const card = useSelector(state => state.admin.card)
  const nevigate = useNavigate()
  const shoppingHandler = () => {
    return nevigate("/products-all")
  }
  const checkOutNavigateHandler = () => {
    return nevigate("/checkout")
  }
  return (
    <div className='min-h-screen w-full bg-[#afadbb] flex flex-col px-6 gap-2 text-[#c2bfbf]'>
      {/* buttons item */}
      <div className='flex justify-end transition-all duration-150 ease-in-out items-ceter mt-5 top-20 right-6'>
        <div className='flex gap-5'>
          <div>
            <button onClick={checkOutNavigateHandler} className='h-12 w-48 bg-[#087908] active:scale-95 hover:scale-105 transition-all duration-150 ease-in-out hover:shadow-xl shadow-[#292828] rounded-[10px] text-[18px] text-white'>Checkout to  Process</button>
          </div>
          <div>
            <button onClick={shoppingHandler} className='h-12 w-40 bg-[#087908] active:scale-95 hover:scale-105 transition-all duration-150 ease-in-out hover:shadow-xl shadow-[#292828] rounded-[10px] text-[18px] text-white'>Shopping Now</button>
          </div>
        </div>
      </div>
      <div className='flex flex-col lg:flex lg:flex-row mb-5 gap-50 mt-5'>
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
        {/* order summary */}
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

export default AddToCardPage
