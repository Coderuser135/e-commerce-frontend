import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { setDeletePopup, setEditDataStore } from '../../features/Store/slice/admin.slice.js';
import { deleteProducts } from '../../features/Store/reducers/admin.reducer.js';
const AdminSingleProductsCategory = () => {
  const productsStore = useSelector(state => state.products.productsStore)
  const productsCategory = useParams()
  const menuBar = useSelector(state => state.admin.menuBar)
  const deletePopup = useSelector(state => state.admin.deletePopup)
  const filterProducts = productsStore.filter((item) => item.category === productsCategory.category)
  console.log(filterProducts)
  return (
    <div className='h-full min-h-[91vh] w-full p-2 flex flex-col gap-2 px-6 py-4'>
      {deletePopup && <DeletePopups />}
      <div>
        <h1 className='font-serif text-xl'>{productsCategory.category}: ({filterProducts.length})</h1>
      </div>
          {
            productsStore.length === 0 ? (<div className='h-[80vh] w-full flex justify-center items-center'>
              <h1 className='text-2xl font-bold font-serif text-[#222121]'>NO Products</h1>
            </div>) : null
          }
      <div className={`${menuBar === true ? `gap-4 grid grid-cols-4`: `gap-4 grid grid-cols-5`}`}>
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
      <div className='h-88 w-60 rounded-[10px] flex flex-col shadow-2xl'>
        {/* Add BookMark */}
        <div className='w-full h-8 rounded-tl-[10px] rounded-tr-[10px] flex justify-between items-center px-2'>
          <div>
            <h1 onClick={() => {
              editDataHandler(details)
            }} className='text-[20px] font-bold font-sans text-[#2dadf7]'><MdOutlineEdit /></h1>
          </div>
          <div>
            <button onClick={() => {
              deletePopupHandler(details)
            }} className='text-[20px] py-1.25'><MdOutlineDelete className='text-[#f71010]' /></button>
          </div>
        </div>
        {/* Products Images */}
        <div className='h-40 w-full flex justify-center bg-[#eceaea]'>
          <img src={details.image} className='aspect-square object-contain' />
        </div>
        {/* Products Deatils */}
        <div className='flex-1  rounded-bl-[10px] rounded-br-[10px] flex-col gap-1 px-2'>
          {/* Products Rating */}
          <div className='flex justify-between items-center w-16 bg-[#dad6d6] relative  bottom-8.5 left-px px-2 rounded-[5px] shadow-2xl gap-[3.5px]'>
            <div>
              <h1 className='font-bold'>{details.rating}</h1>
            </div>
            <div>
              <h1><MdOutlineStar className='text-[green]' /></h1>
            </div>
          </div>
          {/* Products Title */}
          <div className='bottom-4 relative'>
            <h1 className='text-gray font-serif truncate w-30'>{details.title}</h1>
          </div>
          {/* Products Descraption */}
          <div>
            <h1 className='truncate w-50 font-serif relative bottom-4 text-[15px] text-[#252525]'>{details.description}</h1>
          </div>
          {/* Products Price */}
          <div className=' flex justify-between items-center w-[5.8rem] relative bottom-2 text-xl gap-2'>
            <div>
              <h1 className='line-through text-[#5a5858] font-extralight'>₹{details.orginalPrice}</h1>
            </div>
            <div>
              <h1 className='text-[#1a1919]'>₹{details.discountPrice}</h1>
            </div>
          </div>
          {/* Add to Card */}
          <div className='flex justify-center items-center'>
            <button className='py-2 px-[5.8rem] bg-blue-500 text-white rounded-lg font-medium active:scale-95 transition-all 2s active:bg-blue-600 active:shadow-2xl'>ADD</button>
          </div>
        </div>
      </div>
    </>
  )
}
export const DeletePopups = () => {
  const dispatch = useDispatch()
  const deletePopup = useSelector(state => state.adminSlice.deletePopup)
  const cancalDeletePopupHandler = () => {
    dispatch(setCloseDeletePopup())
  }
  const deleteProductsHandler = async () => {
    await dispatch(deleteProducts(deletePopup._id))
    dispatch(setCloseDeletePopup())

  }
  return (
    <>
      <div className='h-screen w-full bg-black/35 z-20 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0'>
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

export default AdminSingleProductsCategory
