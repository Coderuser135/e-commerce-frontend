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
      <div className='h-full w-full px-5'>
        {/* E-Commerce store banner */}
        <div>
          <img src={bannerImage} />
        </div>
        {/* Products category */}
        <div className='flexflex-col gap-1'>
          <div className='flex justify-between items-center pt-4'>
            <div>
              <h1 className='text-xl font-sans font-medium text-[#413f3f] px-2 mb-2'>Category</h1>
            </div>
            <div>
              <button onClick={allProductsCategoryHandler} className='text-xl text-blue-500 font-medium font-sans py-2 px-5'>see all</button>
            </div>
          </div>
          {/* Products Category  */}
          <div className='grid grid-cols-5 gap-4  m-auto w-full z-10'>
            <ProductsCategory />
          </div>
        </div>
        <div className='flex flex-col gap-2 mt-5'>
          <div className='flex flex-col gap-4 m-auto w-full z-10'>
            <div className='flex flex-col gap-2 itmes-center'>
              {/* see all */}
              <div className='flex justify-between items-center px-2'>
                <div>
                  <h1 className='text-2xl font-sans font-bold text-[#413f3f]'>Electronics</h1>
                </div>
                <div>
                  <button onClick={() => {
                    electronicsCategoryHandler("Electronics")
                  }} className='text-xl text-blue-500 font-medium font-sans px-5 py-2 border border-[white]'>see all</button>
                </div>
              </div>
              {/* products category */}
              <div className='flex items-center gap-4'>
                {electronicsCategory.slice(0, 4).map((item) => {
                  return (
                    <div key={item._id} >
                      <Card details={item} />
                    </div>
                  )
                })}
              </div>
            </div>
            {/* products list */}
            <div className='flex flex-col'>
              <div className='flex justify-between items-center px-2'>
                <div>
                  <h1 className='text-2xl font-sans font-bold text-[#413f3f]'>Produtcs Lists</h1>
                </div>
                <div>
                  <button onClick={seeAllProductsHandler} className='text-xl text-blue-500 font-medium font-sans px-5'>see all</button>
                </div>
              </div>
              <div className='mt-2'>
                <ProductSlider products={ProductsStore} />
              </div>
            </div>
            {/* products category */}
            <div className='flex flex-col gap-2 itmes-center'>
              {/* see all */}
              <div className='flex justify-between items-center px-2'>
                <div>
                  <h1 className='text-2xl font-sans font-bold text-[#413f3f]'>Accessories</h1>
                </div>
                <div>
                  <button onClick={accessoriesCategoryHandler} className='text-xl text-blue-500 font-medium font-sans px-5 py-2'>see all</button>
                </div>
              </div>
              {/* products category */}
              <div className='flex items-center gap-4'>
                {accessoriesCategory.slice(0, 4).map((item) => {
                  return (
                    <div key={item._id} >
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
      <div className='h-[22rem] w-[15rem] rounded-[10px] flex flex-col shadow-2xl'>
        {/* Add BookMark */}
        <div className='w-full h-8 rounded-tl-[10px] rounded-tr-[10px] flex justify-between items-center px-2'>
          <div>
            <h1 className='text-[15px] font-bold font-sans text-[#5f5353]'>{details.category}</h1>
          </div>
          <div>
            <button className='text-[20px] py-1.25'><FaRegHeart className='text-[#3d3b3b]' /></button>
          </div>
        </div>
        {/* Products Images */}
        <div onClick={() => {
          productsCardHandler(details)
        }} className='h-40 w-full flex justify-center bg-[#eceaea]'>
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
              <h1><FaStar className='text-[green]' /></h1>
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
            <button onClick={addToCardHandler} className='py-2 px-[5.8rem] bg-blue-500 text-white rounded-lg font-medium active:scale-95 transition-all 2s active:bg-blue-600 active:shadow-2xl'>ADD</button>
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
          <div onClick={() => {
            productsCategoryHandler(item)
            console.log(item)
          }} key={item} className='h-62 w-54 flex flex-col rounded-xl shadow-2xl'>
            {/* Products List Category Image */}
            <div className='h-50 w-full rounded-tl-xl rounded-tr-xl flex justify-center bg-[#cac8c8]'>
              <img key={item.id} src={findImage} className='aspect-square object-contain rounded-2xl' />
            </div>
            <div className='flex-1 rounded-bl-xl rounded-br-xl flex justify-center items-center bg-[#f0ebeb]'>
              <h1 className='text-xl font-medium'>{item.toUpperCase()}</h1>
            </div>

          </div>
        )
      })}
    </>
  )
}

const ProductSlider = ({ products }) => {
  // Scroll container ka reference
  const sliderRef = useRef(null);

  // Left & Right Scroll Handlers
  const handleScroll = (direction) => {
    if (sliderRef.current) {
      // 300px ya card ki width ke hisab se scroll amount set karein
      const scrollAmount = direction === "left" ? -320 : 320;

      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth", // Smooth sliding animation
      });
    }
  };

  return (
    <div className="relative w-full mx-auto p-4 group">
      {/* Left Button */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition border"
      >
        <FaAngleLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* Main Horizontal Scroll Container */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.slice(0, 20).map((product) => (
          <Card details={product} key={product._id} />
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition border"
      >
        <FaChevronRight className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
};


export default ProductsPage;
