import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import { getSingleProducts } from '../../features/Store/reducers/products.reducer';
import { Card } from './ProductsPage';
import BackButton from '../../components/BackButton';

const SingleProductsPage = () => {
  const productsStore = useSelector(state => state.products.productsStore)
  console.log(productsStore)
  const bearerToken = useSelector(state => state.auth.token)
  const productCardCount = useSelector(state => state.products.productCardCount)
  const params = useParams()
  const nevigate = useNavigate()
  const productsCategoryId = productsStore.filter((item) => {
    if(params.id === item._id){
      return{
        item
      }
    }
  })
  console.log(productsCategoryId)
  const filterProductsCategory = productsStore.filter((item) => {
    if(productsCategoryId[0].category === item.category){
      return{
        item
      }
    }
  })
  const dispatch = useDispatch()
  const singleProduct = useSelector(state => state.products.singleProduct)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    dispatch(getSingleProducts({
      id: params.id,
      bearerToken: bearerToken
    }))
  }, [params.id])
  return (
    <>
      <div className='h-full w-full flex flex-col justify-center items-center gap-2 py-5 bg-[#e7e2e2]'>
        <BackButton nevigatePage={'/'}/>
        <div className='h-152 w-[50%] rounded-[10px] flex flex-col shadow-2xl'>
          {/* Add BookMark */}
          <div className='w-full h-12 rounded-tl-[10px] rounded-tr-[10px] flex justify-between items-center px-2'>
            <div>
              <h1 className='text-[20px] font-bold font-sans text-[#5f5353]'>{singleProduct?.category}</h1>
            </div>
            <div>
              <button className='text-[25px] py-1.25'><FaHeart className='text-[#3d3b3b]' /></button>
            </div>
          </div>
          {/* Products Images */}
          <div className='h-80 w-full flex justify-center bg-[#eceaea]'>
            <img src={singleProduct?.image} className='aspect-square object-contain' />
          </div>
          {/* Products Deatils */}
          <div className='flex-1  rounded-bl-[10px] rounded-br-[10px] flex-col gap-1 px-2'>
            {/* Products Rating */}
            <div className='flex gap-2 items-center h-8 w-20 bg-[#dad6d6] relative  bottom-12 left-px px-2 rounded-[5px] shadow-2xl'>
              <div>
                <h1 className='font-bold text-xl'>{singleProduct?.rating}</h1>
              </div>
              <div>
                <h1><MdOutlineStar className='text-[green] text-xl' /></h1>
              </div>
            </div>
            {/* Products Title */}
            <div className='bottom-4 relative'>
              <h1 className='text-gray font-serif text-xl'>{singleProduct?.title}</h1>
            </div>
            {/* Products Descraption */}
            <div>
              <h1 className='font-serif relative bottom-2 text-[15px] text-[#252525] w-120'>{singleProduct?.description}</h1>
            </div>
            {/* Products Price */}
            <div className=' flex justify-between items-center w-32 relative text-2xl'>
              <div>
                <h1 className='line-through text-[#5a5858] font-extralight'>₹{singleProduct?.orginalPrice}</h1>
              </div>
              <div>
                <h1 className='text-[#1a1919]'>₹{singleProduct?.discountPrice}</h1>
              </div>
            </div>
            {/* Add to Card */}
            <div className='flex justify-between items-center w-[25rem] m-auto py-5'>
              <button className='py-2 px-[4rem] bg-blue-500 text-white rounded-lg font-medium'>Buy</button>
              <button className='py-2 px-[4rem] bg-blue-500 text-white rounded-lg font-medium'>ADD</button>
            </div>
          </div>
        </div>
        {/* Related Products Category */}
        <div className='h-full w-full flex flex-col gap-2 px-6 py-5 mt-5'>
          <h1 className='text-[20px] font-bold font-sans text-[#5f5353]'>Related Products</h1>
          <div className='h-full w-full grid grid-cols-4 gap-4'>
            {filterProductsCategory.slice(0, 8).map((item) => {
              return(
                <Card key={item._id} details={item}/>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default SingleProductsPage
