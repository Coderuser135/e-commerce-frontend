import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { setDeletePopup, setEditDataStore, setCloseDeletePopup } from '../../features/Store/slice/admin.slice.js';
import { deleteProducts } from '../../features/Store/reducers/admin.reducer.js';
const AdminSingleProductsCategory = () => {
  const productsStore = useSelector(state => state.products.productsStore)
  const productsCategory = useParams()
  const menuBar = useSelector(state => state.admin.menuBar)
  const deletePopup = useSelector(state => state.admin.deletePopup)
  const filterProducts = productsStore.filter((item) => item.category === productsCategory.category)
  console.log(filterProducts)
  return (
    /* Responsive update: keep the category page inside the viewport with responsive padding. */
    <div className='min-h-[91vh] w-full p-2 flex flex-col gap-2 px-3 sm:px-5 lg:px-6 py-3 sm:py-4 overflow-x-hidden'>
      {deletePopup && <DeletePopups />}
      <div>
        {/* Responsive update: scale the category title on mobile. */}
        <h1 className='font-serif text-lg sm:text-xl break-words'>{productsCategory.category}: ({filterProducts.length})</h1>
      </div>
      {
        productsStore.length === 0 ? (<div className='min-h-[60vh] w-full flex justify-center items-center'>
          {/* Responsive update: use a smaller empty-state heading on mobile. */}
          <h1 className='text-xl sm:text-2xl font-bold font-serif text-[#222121]'>NO Products</h1>
        </div>) : null
      }
      {/* Responsive update: use 2 columns on phones, 3 on tablets, and adaptive desktop columns. */}
      <div className={`${menuBar === true ? `gap-3 sm:gap-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4`: `gap-3 sm:gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}`}>
        {filterProducts.map((item) => {
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
    nevigate('/adminPannel/products-update')
  }
  return (
    <>
      {/* Responsive update: make the admin product card fluid inside each responsive grid column. */}
      <div className='h-[22rem] w-full max-w-[15rem] min-w-0 mx-auto rounded-[10px] flex flex-col shadow-2xl overflow-hidden'>
        <div className='w-full h-8 rounded-tl-[10px] rounded-tr-[10px] flex justify-between items-center px-2 shrink-0'>
          <div>
            {/* Responsive update: use padded icon buttons for comfortable touch interaction on mobile. */}
            <button onClick={() => editDataHandler(details)} className='text-[20px] font-bold font-sans text-[#2dadf7] p-1'><MdOutlineEdit /></button>
          </div>
          <div>
            <button onClick={() => deletePopupHandler(details)} className='text-[20px] py-1.25 p-1'><MdOutlineDelete className='text-[#f71010]' /></button>
          </div>
        </div>
        {/* Responsive update: scale image height down on phones while keeping it fluid. */}
        <div className='h-36 sm:h-40 w-full flex justify-center bg-[#eceaea] shrink-0'>
          <img src={details.image} className='w-full h-full aspect-square object-contain' />
        </div>
        <div className='flex-1 min-w-0 rounded-bl-[10px] rounded-br-[10px] flex flex-col gap-1 px-2'>
          <div className='flex justify-between items-center w-16 bg-[#dad6d6] relative bottom-8.5 left-px px-2 rounded-[5px] shadow-2xl gap-[3.5px] shrink-0'>
            <div><h1 className='font-bold'>{details.rating}</h1></div>
            <div><h1><MdOutlineStar className='text-[green]' /></h1></div>
          </div>
          <div className='bottom-4 relative min-w-0'>
            {/* Responsive update: let the title use the available card width with mobile-friendly typography. */}
            <h1 className='text-gray font-serif truncate w-full text-sm sm:text-base'>{details.title}</h1>
          </div>
          <div className='min-w-0'>
            {/* Responsive update: remove the fixed description width so narrow cards do not overflow. */}
            <h1 className='truncate w-full font-serif relative bottom-4 text-xs sm:text-[15px] text-[#252525]'>{details.description}</h1>
          </div>
          {/* Responsive update: keep price text compact and readable on mobile cards. */}
          <div className='flex justify-between items-center w-full max-w-[6rem] relative bottom-2 text-base sm:text-xl gap-2 shrink-0'>
            <div><h1 className='line-through text-[#5a5858] font-extralight'>₹{details.orginalPrice}</h1></div>
            <div><h1 className='text-[#1a1919]'>₹{details.discountPrice}</h1></div>
          </div>
          {/* Responsive update: make the ADD button fluid instead of using a fixed desktop-only width. */}
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
      {/* Responsive update: add mobile-safe modal padding and keep the overlay inside the viewport. */}
      <div className='h-screen w-full bg-black/35 z-20 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 px-4'>
        {/* Responsive update: make the confirmation dialog fluid on phones and capped on desktop. */}
        <div className='h-auto min-h-44 w-full max-w-[30rem] rounded-2xl flex flex-col items-center p-4 justify-center gap-5 bg-[#252424]'>
          <h1 className='text-base sm:text-xl font-serif font-bold text-white text-center'>Are You Sure Delete this</h1>
          {/* Responsive update: use touch-friendly buttons with responsive spacing instead of fixed desktop widths. */}
          <div className='w-full max-w-80 flex justify-center gap-3 sm:justify-between items-center'>
            <div><button onClick={cancalDeletePopupHandler} className='px-5 sm:px-8 py-2 bg-[#707a70] text-white rounded-xl'>Cancel</button></div>
            <div><button onClick={deleteProductsHandler} className='px-8 sm:px-12 py-2 bg-[#d61710] text-white rounded-xl'>Ok</button></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSingleProductsCategory
