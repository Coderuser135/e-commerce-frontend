import React, { useState } from 'react';
import Category from '../../components/Category';
import bannerImage from "../../assets/bannerImage.jpg"
import { FaRegHeart } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useHref, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const ProductsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const ProductsStore = useSelector(state => state.products.productsStore)
  const errorMessage = useSelector(state => state.products.error)
  console.log(errorMessage)
  const seeAllProductsHandler = () => {
    nevigate('/products-all')
  }
  const allProductsCategoryHandler = () => {
    nevigate('/products-category')
  }
  const electronicsCategoryHandler = (category) => {
    nevigate(`/products-category/${category}`)
  }
  const accessoriesCategoryHandler = () => {
    nevigate(`/products-category/Accessories`)
  }
  const electronicsCategory = ProductsStore.filter(item => item.category === "Electronics")
  const accessoriesCategory = ProductsStore.filter(item => item.category === "Accessories")
  return (
    <>
      <Category />
      {/* Responsive update: use viewport-safe horizontal padding on mobile and larger spacing from tablet upward. */}
      <div className='h-full w-full px-3 sm:px-5 lg:px-8'>
        {/* Responsive update: make the store banner scale to the viewport without overflowing. */}
        <div className='w-full overflow-hidden rounded-lg'>
          <img src={bannerImage} className='w-full h-auto max-h-72 sm:max-h-80 lg:max-h-96 object-cover object-center' />
        </div>
        {/* Products category */}
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center pt-4 gap-2'>
            <div>
              {/* Responsive update: scale section heading for smaller screens. */}
              <h1 className='text-lg sm:text-xl font-sans font-medium text-[#413f3f] px-2 mb-2'>Category</h1>
            </div>
            <div>
              {/* Responsive update: keep action button compact on mobile while remaining touch-friendly. */}
              <button onClick={allProductsCategoryHandler} className='text-sm sm:text-xl text-blue-500 font-medium font-sans py-2 px-3 sm:px-5'>see all</button>
            </div>
          </div>
          {/* Responsive update: category cards use 2 columns on phones, 3 on tablets and 5 on desktop. */}
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 m-auto w-full z-10'>
            <ProductsCategory />
          </div>
        </div>
        <div className='flex flex-col gap-2 mt-5'>
          <div className='flex flex-col gap-2 sm:gap-4 m-auto w-full z-10'>
            <div className='flex flex-col gap-2 items-center'>
              {/* see all */}
              <div className='flex justify-between items-center w-full px-2 gap-2'>
                <div>
                  {/* Responsive update: section title scales down on narrow screens. */}
                  <h1 className='text-xl sm:text-2xl font-sans font-bold text-[#413f3f]'>Electronics</h1>
                </div>
                <div>
                  <button onClick={() => {
                    electronicsCategoryHandler("Electronics")
                  }} className='text-sm sm:text-xl text-blue-500 font-medium font-sans px-2 sm:px-5 py-2'>see all</button>
                </div>
              </div>
              {/* Responsive update: product cards wrap into multiple rows on small screens instead of overflowing. */}
              <div className='w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 justify-items-center'>
                {electronicsCategory.slice(0, 4).map((item) => {
                  return (
                    <div key={item._id} className='w-full flex justify-center min-w-0'>
                      <Card details={item} />
                    </div>
                  )
                })}
              </div>
            </div>
            {/* products list */}
            <div className='flex flex-col'>
              <div className='flex justify-between items-center px-2 gap-2'>
                <div>
                  {/* Responsive update: product list heading scales for mobile. */}
                  <h1 className='text-xl sm:text-2xl font-sans font-bold text-[#413f3f]'>Produtcs Lists</h1>
                </div>
                <div>
                  <button onClick={seeAllProductsHandler} className='text-sm sm:text-xl text-blue-500 font-medium font-sans px-2 sm:px-5'>see all</button>
                </div>
              </div>
              <div className='mt-2'>
                <ProductSlider products={ProductsStore} />
              </div>
            </div>
            {/* products category */}
            <div className='flex flex-col gap-2 items-center'>
              {/* see all */}
              <div className='flex justify-between items-center w-full px-2 gap-2'>
                <div>
                  {/* Responsive update: section title scales down on narrow screens. */}
                  <h1 className='text-xl sm:text-2xl font-sans font-bold text-[#413f3f]'>Accessories</h1>
                </div>
                <div>
                  <button onClick={accessoriesCategoryHandler} className='text-sm sm:text-xl text-blue-500 font-medium font-sans px-2 sm:px-5 py-2'>see all</button>
                </div>
              </div>
              {/* Responsive update: accessory cards use a responsive grid instead of a fixed-width flex row. */}
              <div className='w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 justify-items-center'>
                {accessoriesCategory.slice(0, 4).map((item) => {
                  return (
                    <div key={item._id} className='w-full flex justify-center min-w-0'>
                      <Card details={item} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Card = ({ details }) => {
  const nevigate = useNavigate()
  const dispath = useDispatch()
  const targetHref = useHref(`/products`)
  const productsCardHandler = (details) => {
    // nevigate(`/products/${details._id}`)
    // window.open(targetHref + `/${details._id}`, 'products_viwers', 'noopener,noreferrer');
    nevigate(`/products/${details._id}`)
  }
  const addToCardHandler = () => {
    dispath(setProductCardCount())
  }
  return (
    <>
      {/* Responsive update: card width is fluid on phones while capped at the existing desktop size. */}
      <div className='h-[22rem] w-full max-w-[15rem] min-w-0 rounded-[10px] flex flex-col shadow-2xl overflow-hidden'>
        {/* Add BookMark */}
        <div className='w-full h-8 rounded-tl-[10px] rounded-tr-[10px] flex justify-between items-center px-2 shrink-0'>
          <div className='min-w-0'>
            <h1 className='text-[13px] sm:text-[15px] font-bold font-sans text-[#5f5353] truncate'>{details.category}</h1>
          </div>
          <div className='shrink-0'>
            <button className='text-[20px] py-1.25'><FaRegHeart className='text-[#3d3b3b]' /></button>
          </div>
        </div>
        {/* Products Images */}
        <div onClick={() => {
          productsCardHandler(details)
        }} className='h-40 w-full flex justify-center bg-[#eceaea] shrink-0'>
          <img src={details.image} className='w-full h-full aspect-square object-contain' />
        </div>
        {/* Products Deatils */}
        <div className='flex-1 rounded-bl-[10px] rounded-br-[10px] flex flex-col gap-1 px-2 min-w-0'>
          {/* Products Rating */}
          <div className='flex justify-between items-center w-16 bg-[#dad6d6] relative bottom-8.5 left-px px-2 rounded-[5px] shadow-2xl gap-[3.5px] shrink-0'>
            <div>
              <h1 className='font-bold'>{details.rating}</h1>
            </div>
            <div>
              <h1><FaStar className='text-[green]' /></h1>
            </div>
          </div>
          {/* Products Title */}
          <div className='bottom-4 relative min-w-0'>
            <h1 className='text-gray font-serif truncate w-full'>{details.title}</h1>
          </div>
          {/* Products Descraption */}
          <div className='min-w-0'>
            <h1 className='truncate w-full font-serif relative bottom-4 text-[15px] text-[#252525]'>{details.description}</h1>
          </div>
          {/* Products Price */}
          <div className='flex justify-between items-center w-full max-w-[5.8rem] relative bottom-2 text-lg sm:text-xl gap-2 shrink-0'>
            <div>
              <h1 className='line-through text-[#5a5858] font-extralight'>₹{details.orginalPrice}</h1>
            </div>
            <div>
              <h1 className='text-[#1a1919]'>₹{details.discountPrice}</h1>
            </div>
          </div>
          {/* Responsive update: ADD button fills the available card width instead of using a fixed horizontal padding. */}
          <div className='flex justify-center items-center mt-auto pb-2 w-full'>
            <button onClick={addToCardHandler} className='w-full py-2 px-2 bg-blue-500 text-white rounded-lg font-medium active:scale-95 transition-all 2s active:bg-blue-600 active:shadow-2xl'>ADD</button>
          </div>
        </div>
      </div>
    </>
  )
}

const ProductsCategory = () => {
  const productsStore = useSelector(state => state.products.productsStore)
  const upiqueCategory = [...new Set(productsStore.map((item) => item.category))]
  const nevigate = useNavigate()
  const productsCategoryHandler = (item) => {
    nevigate(`/products-category/${item}`)
  }
  return (
    <>
      {upiqueCategory.slice(0, 4).map((item) => {
        const findImage = productsStore.find(products => products.category === item)?.image;
        return (
          /* Responsive update: category card width fills its responsive grid column instead of using a fixed width. */ 
          < div onClick={() => {
        productsCategoryHandler(item)
      }} key={item} className='h-52 sm:h-62 w-full min-w-0 flex flex-col rounded-xl shadow-2xl overflow-hidden'>
      {/* Products List Category Image */}
      <div className='h-40 sm:h-50 w-full rounded-tl-xl rounded-tr-xl flex justify-center bg-[#cac8c8]'>
        <img key={item._id} src={findImage} className='w-full h-full aspect-square object-contain rounded-2xl' />
      </div>
      <div className='flex-1 rounded-bl-xl rounded-br-xl flex justify-center items-center bg-[#f0ebeb] px-2'>
        {/* Responsive update: category label scales down and wraps safely on narrow screens. */}
        <h1 className='text-sm sm:text-xl font-medium text-center break-words'>{item.toUpperCase()}</h1>
      </div>
    </div >
        )
      })}
    </>
  )
}

const ProductSlider = ({ products }) => {
  const sliderRef = useRef(null);

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;

      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    /* Responsive update: keep the slider within the viewport and reduce mobile padding. */
    <div className="relative w-full mx-auto p-2 sm:p-4 group">
      {/* Responsive update: position slider controls safely at the viewport edges. */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition border"
      >
        <FaAngleLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
      </button>

      {/* Responsive update: cards keep their size inside a horizontal overflow container on small screens. */}
      <div
        ref={sliderRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth py-2 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.slice(0, 20).map((product) => (
          <div key={product._id} className="shrink-0 w-[calc(50vw-1.25rem)] max-w-[15rem] min-w-[10.5rem] sm:w-[15rem]">
            <Card details={product} />
          </div>
        ))}
      </div>

      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition border"
      >
        <FaChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
      </button>
    </div>
  );
};

export default ProductsPage;
