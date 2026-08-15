import React from 'react'
import { BsFillBoxFill } from "react-icons/bs";
import { FaFolderClosed } from "react-icons/fa6";
import { IoBagAddSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdOutlineEdit, MdOutlineDelete, MdOutlineStar } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setEditDataStore, setCloseDeletePopup, setDeletePopup } from '../../features/Store/slice/admin.slice.js';
import { deleteProducts } from '../../features/Store/reducers/admin.reducer.js';

const AdminPannelHomePage = () => {
  const productsStore = useSelector(state => state.products.productsStore)
  const deletePopup = useSelector(state => state.admin.deletePopup)
  const productsCategory = [...new Set(productsStore.map((item) => item?.category))]
  const nevigate = useNavigate()
  return (
    <div className='min-h-[90vh] h-full w-full p-3 sm:p-5 flex flex-col gap-2 mb-20 overflow-x-hidden'>
      {deletePopup && <DeletePopup />}
      {/* Responsive update: dashboard summary cards wrap on mobile instead of keeping four fixed-width cards in one row. */}
      <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 py-2'>
        <SummaryCard onClick={() => nevigate('/adminPannel/all-products')} icon={<BsFillBoxFill className='text-[1.4rem] sm:text-[1.8rem] text-white' />} title='Total Products' value={productsStore.length} />
        <SummaryCard onClick={() => nevigate('/adminPannel/products-category')} icon={<FaFolderClosed className='text-[1.4rem] sm:text-[1.8rem] text-white' />} title='Total Category' value={productsCategory.length} />
        <SummaryCard onClick={() => nevigate('/adminPannel/create-products')} icon={<IoBagAddSharp className='text-[1.4rem] sm:text-[1.8rem] text-white' />} title='Create Products' value={productsStore.length} />
        <SummaryCard onClick={() => nevigate('/adminPannel/all-products')} icon={<FaEdit className='text-[1.4rem] sm:text-[1.8rem] text-white' />} title='Edit Products' value='' />
      </div>
      {/* Responsive update: recent-products header keeps its controls visible without horizontal overflow on narrow screens. */}
      <div className='min-h-12 w-full flex justify-between items-center gap-2 border border-solid border-[#e4e0e0] p-2 mt-3 sm:mt-4 rounded-[5px] bg-[#d6d5d5]'>
        <h1 className='font-serif text-base sm:text-[18px] truncate'>Recent Products</h1>
        <button onClick={() => nevigate('/adminPannel/all-products')} className='shrink-0 border border-solid border-[#356fec] rounded-sm px-3 py-1 font-serif text-sm sm:text-base text-[#356fec]'>View All</button>
      </div>
      <ProductsTitle />
      <div className='w-full flex flex-col justify-center items-center gap-1.5'>
        {productsStore.length === 0 ? <div className='h-40 sm:h-60 w-full flex justify-center items-center'><h1 className='text-xl sm:text-2xl font-bold font-serif text-[#222121]'>NO Products</h1></div> : null}
        {productsStore.slice(0, 5).map((item) => <Products key={item._id} details={item} />)}
      </div>
    </div>
  )
}

const SummaryCard = ({ onClick, icon, title, value }) => (
  <div onClick={onClick} className='min-h-24 sm:h-25 w-full min-w-0 flex items-center justify-center gap-2 sm:gap-4 px-2 bg-[#e9e4e4] rounded-[10px] shadow-2xl cursor-pointer'>
    <div className='h-10 w-10 sm:h-12 sm:w-12 shrink-0 flex justify-center items-center bg-[#0096c7] rounded-[10px]'>{icon}</div>
    <div className='min-w-0 flex flex-col'><h1 className='text-xs sm:text-[15px] font-serif truncate'>{title}</h1><h1 className='text-lg sm:text-[1.4rem] font-medium'>{value}</h1></div>
  </div>
)

export const DeletePopup = () => {
  const dispatch = useDispatch()
  const deletePopup = useSelector(state => state.admin.deletePopup)
  const cancalDeletePopupHandler = () => dispatch(setCloseDeletePopup())
  const deleteProductsHandler = async () => { await dispatch(deleteProducts(deletePopup._id)); dispatch(setCloseDeletePopup()) }
  return <div className='h-screen w-full bg-black/35 flex justify-center items-center fixed inset-0 z-50 px-4'>
    {/* Responsive update: confirmation dialog uses a fluid mobile width and stacked actions on narrow screens. */}
    <div className='w-full max-w-[30rem] min-h-48 rounded-2xl flex flex-col items-center p-4 justify-center gap-5 bg-[#252424]'>
      <h1 className='text-base sm:text-xl text-center font-serif font-bold text-white'>Are You Sure Delete this</h1>
      <div className='w-full max-w-80 flex flex-col sm:flex-row gap-2 sm:justify-between items-stretch sm:items-center'>
        <button onClick={cancalDeletePopupHandler} className='w-full sm:w-auto px-8 py-2 bg-[#707a70] text-white rounded-xl'>Cancel</button>
        <button onClick={deleteProductsHandler} className='w-full sm:w-auto px-12 py-2 bg-[#d61710] text-white rounded-xl'>Ok</button>
      </div>
    </div>
  </div>
}

export const ProductsTitle = () => <div className='hidden sm:flex h-10 w-full items-center justify-between border border-solid border-[#e2dede] p-2 bg-[#d6d5d5] rounded-[5px]'>
  <div className='w-18'><h1 className='font-serif text-base sm:text-[18px]'>Image</h1></div><div className='w-30 flex justify-center'><h1 className='font-serif text-[18px]'>Rating</h1></div><div className='w-40 flex justify-center'><h1 className='font-serif text-[18px]'>Category</h1></div><div className='w-30 flex justify-center'><h1 className='font-serif text-[18px]'>Price</h1></div><div className='w-45 flex justify-center'><h1 className='font-serif text-[18px]'>Actions</h1></div>
</div>

export const Products = ({ details }) => {
  const nevigate = useNavigate(); const dispatch = useDispatch()
  return <div className='w-full min-h-20 sm:h-14 border border-solid border-[#e6e3e3] flex flex-wrap sm:flex-nowrap justify-between items-center gap-2 p-2 font-serif rounded-lg bg-[#e4e0e0] shadow-2xl'>
    {/* Responsive update: product rows become compact cards on mobile, avoiding fixed desktop column widths. */}
    <div className='h-12 w-14 sm:w-18 shrink-0 rounded-[5px] bg-[#e9e4e4] flex justify-center items-center'><img src={details.image} alt='' className='h-10 w-10 object-contain' /></div>
    <div className='flex justify-center items-center gap-0.5 w-auto sm:w-30'><MdOutlineStar className='text-[#e9c46a] text-xl' /><h1>{details.rating}</h1></div>
    <div className='flex-1 min-w-20 sm:w-30 sm:flex-none text-center truncate'><h1>{details.category}</h1></div>
    <div className='flex justify-center items-center gap-0.5 w-auto sm:w-30'><h1>{details.discountPrice}</h1></div>
    <div className='h-full w-full sm:w-45 flex justify-end sm:justify-between items-center sm:px-8'><button onClick={() => { dispatch(setEditDataStore(details)); nevigate('/adminPannel/products-update') }} className='w-10 flex justify-center items-center text-xl text-[#356fec] font-bold p-2'><MdOutlineEdit /></button><button onClick={() => dispatch(setDeletePopup(details))} className='w-10 flex justify-center items-center text-xl font-bold text-[#d41515] p-2'><MdOutlineDelete /></button></div>
  </div>
}

export default AdminPannelHomePage
