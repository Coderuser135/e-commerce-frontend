import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { deleteProducts } from '../../features/Store/reducers/admin.reducer.js';
import { setDeletePopup, setEditDataStore } from '../../features/Store/slice/admin.slice.js';
import { setCloseDeletePopup } from '../../features/Store/slice/admin.slice.js';

const AdminProductsPage = () => {
  const productsStore = useSelector(state => state.products.productsStore)
  const menuBar = useSelector(state => state.admin.menuBar)
  const deletePopup = useSelector(state => state.admin.deletePopup)
  return (
    /* Responsive update: make the admin product page use viewport-safe padding and prevent horizontal overflow. */
    <div className='min-h-[91vh] w-full p-2 flex flex-col gap-2 px-3 sm:px-5 lg:px-6 py-3 sm:py-4 overflow-x-hidden'>
      {deletePopup && <DeletePopups />}
      <div>
        {/* Responsive update: scale the product count heading for mobile. */}
        <h1 className='font-serif text-lg sm:text-xl'>All Products: ({productsStore.length})</h1>
      </div>
      {
        productsStore.length === 0 ? (<div className='min-h-[60vh] w-full flex justify-center items-center'>
          {/* Responsive update: use a smaller empty-state heading on narrow screens. */}
          <h1 className='text-xl sm:text-2xl font-bold font-serif text-[#222121]'>NO Products</h1>
        </div>) : null
      }
      {/* Responsive update: product cards use 2 columns on phones, 3 on tablets, and adapt desktop columns to the sidebar state. */}
      <div className={`${menuBar === true ? `gap-3 sm:gap-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4`: `gap-3 sm:gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}`}>
        {productsStore.map((item) => {
          return (
            <ProductsCard key={item._id} details={item} />
          )
        })}
      </div>
    </div>
  )
}

const ProductsCard = ({ details }) => {
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const deletePopupHandler = (details) => {
    dispatch(setDeletePopup(details))
  }
  const editDataHandler = () => {
    dispatch(setEditDataStore(details))
    nevigate("/adminPannel/products-update")
  }
  return (
    <>
      {/* Responsive update: make the product card fluid within each grid column and cap its desktop width. */}
      <div className='h-[22rem] w-full max-w-[15rem] min-w-0 mx-auto rounded-[10px] flex flex-col shadow-2xl overflow-hidden'>
        {/* Add BookMark */}
        <div className='w-full h-8 rounded-tl-[10px] rounded-tr-[10px] flex justify-between items-center px-2 shrink-0'>
          <div>
            <button onClick={() => {
              editDataHandler(details)
            }} className='text-[20px] font-bold font-sans text-[#2dadf7] p-1'><MdOutlineEdit /></button>
          </div>
          <div>
            <button onClick={() => {
              deletePopupHandler(details)
            }} className='text-[20px] py-1.25 p-1'><MdOutlineDelete className='text-[#f71010]' /></button>
          </div>
        </div>
        {/* Products Images */}
        {/* Responsive update: keep product images inside the fluid card width on mobile. */}
        <div className='h-36 sm:h-40 w-full flex justify-center bg-[#eceaea] shrink-0'>
          <img src={details.image} className='w-full h-full aspect-square object-contain' />
        </div>
        {/* Products Details */}
        <div className='flex-1 min-w-0 rounded-bl-[10px] rounded-br-[10px] flex flex-col gap-1 px-2'>
          {/* Products Rating */}
          <div className='flex justify-between items-center w-16 bg-[#dad6d6] relative bottom-8.5 left-px px-2 rounded-[5px] shadow-2xl gap-[3.5px] shrink-0'>
            <div>
              <h1 className='font-bold'>{details.rating}</h1>
            </div>
            <div>
              <h1><MdOutlineStar className='text-[green]' /></h1>
            </div>
          </div>
          {/* Products Title */}
          <div className='bottom-4 relative min-w-0'>
            {/* Responsive update: allow product titles to shrink/wrap safely on narrow cards. */}
            <h1 className='text-gray font-serif truncate w-full text-sm sm:text-base'>{details.title}</h1>
          </div>
          {/* Products Description */}
          <div className='min-w-0'>
            {/* Responsive update: use available card width instead of a fixed description width. */}
            <h1 className='truncate w-full font-serif relative bottom-4 text-xs sm:text-[15px] text-[#252525]'>{details.description}</h1>
          </div>
          {/* Products Price */}
          {/* Responsive update: keep prices compact and readable on small product cards. */}
          <div className='flex justify-between items-center w-full max-w-[6rem] relative bottom-2 text-base sm:text-xl gap-2 shrink-0'>
            <div>
              <h1 className='line-through text-[#5a5858] font-extralight'>₹{details.orginalPrice}</h1>
            </div>
            <div>
              <h1 className='text-[#1a1919]'>₹{details.discountPrice}</h1>
            </div>
          </div>
          {/* Responsive update: make the admin ADD button fill the card instead of using a fixed desktop-only width. */}
          <div className='flex justify-center items-center mt-auto pb-2 w-full'>
            <button className='w-full py-2 px-2 bg-blue-500 text-white rounded-lg font-medium active:scale-95 transition-all 2s active:bg-blue-600 active:shadow-2xl'>ADD</button>
          </div>
        </div>
      </div>
    </>
  )
}

export const DeletePopups = () => {
  const dispatch = useDispatch()
  const deletePopup = useSelector(state => state.admin.deletePopup)
  const cancalDeletePopupHandler = () => {
    dispatch(setCloseDeletePopup())
  }
  const deleteProductsHandler = async () => {
    await dispatch(deleteProducts(deletePopup._id))
    dispatch(setCloseDeletePopup())

  }
  return (
    <>
      {/* Responsive update: keep the confirmation modal inside the viewport with mobile-safe padding. */}
      <div className='h-screen w-full bg-black/35 z-20 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 px-4'>
        {/* Responsive update: use a fluid modal width on phones and a capped width on larger screens. */}
        <div className='h-auto min-h-44 w-full max-w-[30rem] rounded-2xl flex flex-col items-center p-4 justify-center gap-5 bg-[#252424]'>
          {/* Responsive update: scale the confirmation text for narrow screens and keep it centered. */}
          <h1 className='text-base sm:text-xl font-serif font-bold text-white text-center'>Are You Sure Delete this</h1>
          {/* Responsive update: make action buttons responsive and touch-friendly without fixed desktop width. */}
          <div className='w-full max-w-80 flex justify-center gap-3 sm:justify-between items-center'>
            <div>
              <button onClick={cancalDeletePopupHandler} className='px-5 sm:px-8 py-2 bg-[#707a70] text-white rounded-xl'>Cancel</button>
            </div>
            <div>
              <button onClick={deleteProductsHandler} className='px-8 sm:px-12 py-2 bg-[#d61710] text-white rounded-xl'>Ok</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProductsPage
