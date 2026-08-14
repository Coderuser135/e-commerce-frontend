import React, { useState } from 'react'
import { BsArrowReturnRight, BsFillBoxFill } from "react-icons/bs";
import { FaFolderClosed } from "react-icons/fa6";
import { IoBagAddSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineStar } from "react-icons/md";
import Image from '../../assets/download.jpg'
import { useNavigate } from 'react-router-dom';
import { setEditDataStore } from '../../features/Store/slice/admin.slice';


const AdminPannelHomePage = () => {
  const productsStore = useSelector(state => state.products.productsStore)
  const deletePopup = useSelector(state => state.admin.deletePopup)
  const productsCategory = [...new Set(productsStore.map((item) => item.category))]
  const nevigate = useNavigate()
  const totalProductsPageHandler = () => {
    nevigate('/adminPannel/all-products')
  }
  const createProductsHandler = () => {
    nevigate('/adminPannel/create-products')
  }
  const viewAllProductsHandler = () => {
    nevigate('/adminPannel/all-products')
  }
  const editProductsHandler = () => {
    nevigate('/adminPannel/all-products')
  }
  const categoryHandler = () => {
    nevigate('/adminPannel/products-category')
  }
  return (
    <>
      <div className='max-h-[90vh] h-full w-full p-5 flex flex-col gap-2 mb-20'>
        {deletePopup && <DeletePopup />}
        {/* Features Section */}
        <div className='h-25 w-full flex items-center gap-8 py-2'>
          {/* Total Produts */}
          <div onClick={totalProductsPageHandler} className='h-full w-48 flex items-center justify-center gap-4 px-1 bg-[#e9e4e4] rounded-[10px] shadow-2xl'>
            <div className='border border-solid border-blue-500 h-12 w-12 flex justify-center items-center bg-[#0096c7] rounded-[10px]'>
              <h1><BsFillBoxFill className='text-[1.8rem] text-white' /></h1>
            </div>
            <div className='flex flex-col'>
              <div>
                <h1 className='text-[15px] font-serif'>Total Products</h1>
              </div>
              <div>
                <h1 className='text-[1.4rem] font-medium'>{productsStore.length}</h1>
              </div>
            </div>
          </div>
          {/* Total Category */}
          <div onClick={categoryHandler} className='h-full w-48 flex items-center justify-center gap-4 px-1 bg-[#e9e4e4] rounded-[10px] shadow-2xl'>
            <div className='h-12 w-12 flex justify-center items-center bg-[#00c721] rounded-[10px]'>
              <h1><FaFolderClosed className='text-[1.8rem] text-white' /></h1>
            </div>
            <div className='flex flex-col'>
              <div>
                <h1 className='text-[15px] font-serif'>Total Category</h1>
              </div>
              <div>
                <h1 className='text-[1.4rem] font-medium'>{productsCategory.length}</h1>
              </div>
            </div>
          </div>
          {/* Add Products */}
          <div onClick={createProductsHandler} className='h-full w-48 flex items-center justify-center gap-4 px-1 bg-[#e9e4e4] rounded-[10px] shadow-2xl'>
            <div className='h-12 w-12 flex justify-center items-center bg-[#b9cc12] rounded-[10px]'>
              <h1><IoBagAddSharp className='text-[1.8rem] text-white' /></h1>
            </div>
            <div className='flex flex-col'>
              <div>
                <h1 className='text-[15px] font-serif'>Create Products</h1>
              </div>
              <div>
                <h1 className='text-[1.4rem] font-medium'>{productsStore.length}</h1>
              </div>
            </div>
          </div>
          {/* Edit Products */}
          <div onClick={editProductsHandler} className='h-full w-48 flex items-center justify-center gap-4 px-1 bg-[#e9e4e4] rounded-[10px] shadow-2xl'>
            <div className='h-12 w-12 flex justify-center items-center bg-[#3a99d8] rounded-[10px]'>
              <h1><FaEdit className='text-[1.8rem] text-white' /></h1>
            </div>
            <div className='flex flex-col'>
              <div>
                <h1 className='text-[15px] font-serif'>Edit Products</h1>
              </div>
            </div>
          </div>

        </div>
        {/* Products Section */}
        <div className='h-12 w-full flex justify-between items-center border border-solid border-[#e4e0e0] p-2 mt-4 rounded-[5px] bg-[#d6d5d5]'>
          <div>
            <h1 className='font-serif text-[18px]'>Recent Products</h1>
          </div>
          <div>
            <button onClick={viewAllProductsHandler} className='border  border-solid border-[#356fec] rounded-sm px-[12.2px] py-1 font-serif text-[#356fec]'>View All</button>
          </div>
        </div>
        <ProductsTitle />
        <div className='w-full flex flex-col justify-center items-center gap-1.5'>
          {/* NO Data Ui Section */}
          {
            productsStore.length === 0 ? (<div className='h-60 w-full flex justify-center items-center'>
              <h1 className='text-2xl font-bold font-serif text-[#222121]'>NO Products</h1>
            </div>) : null
          }
          {productsStore.slice(0, 5).map((item) => {
            return (
              <Products key={item._id} details={item} />
            )
          })}

        </div>
      </div>
    </>
  )
}
export const DeletePopup = () => {
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
      <div className='h-screen w-full bg-black/35 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0'>
        <div className='h-50 w-120 rounded-2xl flex flex-col items-center p-2 justify-center gap-5 bg-[#252424]'>
          <h1 className='text-xl font-serif font-bold text-white'>Are You Sure Delete this</h1>
          <div className='h-20 w-80 flex justify-between items-center'>
            <div>
              <button onClick={cancalDeletePopupHandler} className='px-8 py-2 bg-[#707a70] text-white rounded-xl'>Cancel</button>
            </div>
            <div>
              <button onClick={deleteProductsHandler} className='px-12 py-2 bg-[#d61710] text-white rounded-xl'>Ok</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export const ProductsTitle = () => {
  return (
    <>
      {/* Products Category */}
      <div className='h-10 w-full flex justify-between items-center border border-solid border-[#e2dede] p-2 bg-[#d6d5d5] rounded-[5px]'>
        {/* Products Image */}
        <div className='w-18'>
          <h1 className='font-serif text-[18px]'>Image</h1>
        </div>
        {/* Products Rating */}
        <div className='w-30 flex justify-center items-center'>
          <h1 className='font-serif text-[18px]'>Rating</h1>
        </div>
        {/* Products Category */}
        <div className='w-40 flex justify-center items-center'>
          <h1 className='font-serif text-[18px]'>Category</h1>
        </div>
        {/* Products Price */}
        <div className='w-30 flex justify-center items-center'>
          <h1 className='font-serif text-[18px]'>Price</h1>
        </div>
        {/* Products Actions */}
        <div className='w-45 flex justify-center items-center'>
          <h1 className='font-serif text-[18px]'>Actions</h1>
        </div>
      </div>

    </>
  )
}
export const Products = ({ details }) => {
  const nevigate = useNavigate()
  const dispatch = useDispatch()
  const deletePopupHandler = (details) => {
    dispatch(setDeletePopup(details))
  }
  const editPopupHandler = (details) => {
    dispatch(setEditDataStore(details))
    nevigate('/adminPannel/products-update')
  }
  return (
    <>
      <div className='h-14 w-full border border-solid border-[#e6e3e3] flex justify-between items-center p-2 font-serif rounded-lg bg-[#e4e0e0] shadow-2xl'>
        {/* Products Image */}
        <div className='h-12 w-18 rounded-[5px] bg-[#e9e4e4] flex justify-center items-center'>
          <img src={details.image} alt='' className='h-10 w-10' />
        </div>
        {/* Products Rating */}
        <div className='flex justify-center items-center gap-0.5 w-30'>
          <div>
            <h1><MdOutlineStar className='text-[#e9c46a] text-xl' /></h1>
          </div>
          <h1>{details.rating}</h1>
        </div>
        {/* Products Category */}
        <div className='flex justify-center items-center gap-0.5 w-30'>
          <h1>{details.category}</h1>
        </div>
        {/* Products Price */}
        <div className='flex justify-center items-center gap-0.5 w-30'>
          <h1>{details.discountPrice}</h1>
        </div>
        {/* Products Action */}
        <div className='h-full w-45 flex justify-between items-center px-8'>
          {/* Eidt Features */}
          <div className='w-18 flex justify-center items-center text-xl text-[#356fec] font-bold'>
            <button onClick={() => {
              editPopupHandler(details)
            }}><MdOutlineEdit /></button>
          </div>
          {/* Delete Features */}
          <div className='w-18 flex justify-center items-center text-xl font-bold text-[#d41515]'>
            <button onClick={() => {
              deletePopupHandler(details)
            }}><MdOutlineDelete /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminPannelHomePage

