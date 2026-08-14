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
      {/* Responsive update: keep the product detail page within the viewport and scale outer spacing for mobile. */}
      <div className='min-h-screen w-full flex flex-col justify-center items-center gap-2 px-3 sm:px-6 py-4 sm:py-5 bg-[#e7e2e2] overflow-x-hidden'>
        {/* Responsive update: keep the back action accessible and aligned with the content on small screens. */}
        <div className='w-full max-w-[60rem]'>
          <BackButton nevigatePage={'/'}/>
        </div>
        {/* Responsive update: make the product card fluid on phones and preserve a capped desktop width. */}
        <div className='w-full max-w-[60rem] min-h-[38rem] sm:min-h-[42rem] rounded-[10px] flex flex-col shadow-2xl overflow-hidden'>
          {/* Add BookMark */}
          <div className='w-full min-h-11 sm:h-12 rounded-tl-[10px] rounded-tr-[10px] flex justify-between items-center px-3 sm:px-4 gap-2'>
            <div className='min-w-0'>
              {/* Responsive update: reduce category typography on mobile and prevent long text overflow. */}
              <h1 className='text-base sm:text-[20px] font-bold font-sans text-[#5f5353] truncate'>{singleProduct?.category}</h1>
            </div>
            <div className='shrink-0'>
              {/* Responsive update: keep the favorite button comfortably tappable on mobile. */}
              <button className='text-xl sm:text-[25px] py-1 px-1'><FaHeart className='text-[#3d3b3b]' /></button>
            </div>
          </div>
          {/* Products Images */}
          {/* Responsive update: image area uses a responsive height instead of a fixed desktop-only height. */}
          <div className='h-56 sm:h-72 md:h-80 w-full flex justify-center bg-[#eceaea] shrink-0 px-2'>
            <img src={singleProduct?.image} className='w-full h-full aspect-square object-contain' />
          </div>
          {/* Products Details */}
          <div className='flex-1 rounded-bl-[10px] rounded-br-[10px] flex flex-col gap-1 px-3 sm:px-5 pb-4 min-w-0'>
            {/* Products Rating */}
            <div className='flex gap-2 items-center h-8 w-20 bg-[#dad6d6] relative bottom-4 sm:bottom-12 left-px px-2 rounded-[5px] shadow-2xl shrink-0'>
              <div>
                <h1 className='font-bold text-base sm:text-xl'>{singleProduct?.rating}</h1>
              </div>
              <div>
                <h1><MdOutlineStar className='text-[green] text-lg sm:text-xl' /></h1>
              </div>
            </div>
            {/* Products Title */}
            <div className='relative -mt-1 sm:-mt-2 min-w-0'>
              {/* Responsive update: scale product title and allow it to wrap on narrow screens. */}
              <h1 className='text-gray font-serif text-lg sm:text-xl font-medium break-words'>{singleProduct?.title}</h1>
            </div>
            {/* Products Description */}
            <div className='min-w-0'>
              {/* Responsive update: remove the fixed width and let the description use the available viewport width. */}
              <h1 className='font-serif text-sm sm:text-[15px] text-[#252525] w-full break-words'>{singleProduct?.description}</h1>
            </div>
            {/* Products Price */}
            <div className='flex flex-wrap gap-3 sm:gap-5 items-center w-full relative text-xl sm:text-2xl mt-2'>
              <div>
                <h1 className='line-through text-[#5a5858] font-extralight'>₹{singleProduct?.orginalPrice}</h1>
              </div>
              <div>
                <h1 className='text-[#1a1919]'>₹{singleProduct?.discountPrice}</h1>
              </div>
            </div>
            {/* Add to Cart */}
            {/* Responsive update: stack action buttons on narrow screens and use full-width touch-friendly controls. */}
            <div className='flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-5 w-full max-w-[25rem] mx-auto mt-4 py-2'>
              <button className='py-2.5 px-6 sm:px-10 w-full sm:w-auto bg-blue-500 text-white rounded-lg font-medium text-sm sm:text-base active:scale-95 transition-transform'>Buy</button>
              <button className='py-2.5 px-6 sm:px-10 w-full sm:w-auto bg-blue-500 text-white rounded-lg font-medium text-sm sm:text-base active:scale-95 transition-transform'>ADD</button>
            </div>
          </div>
        </div>
        {/* Related Products Category */}
        {/* Responsive update: related products use responsive padding, typography and grid columns. */}
        <div className='h-full w-full max-w-[80rem] flex flex-col gap-2 px-1 sm:px-6 py-4 sm:py-5 mt-3 sm:mt-5'>
          <h1 className='text-lg sm:text-[20px] font-bold font-sans text-[#5f5353]'>Related Products</h1>
          {/* Responsive update: show 2 cards on phones, 3 on tablets and 4 on desktop. */}
          <div className='h-full w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 justify-items-center'>
            {filterProductsCategory.slice(0, 8).map((item) => {
              return(
                <div key={item._id} className='w-full min-w-0 flex justify-center'>
                  <Card details={item}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default SingleProductsPage
