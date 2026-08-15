import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

const AllProductsCategory = () => {
    const productsStore = useSelector(state => state.products.productsStore)
    const upiqueCategory = [...new Set(productsStore.map((item) => item.category))]
    const nevigate = useNavigate()
    const productsCategoryHandler = (item) => {
        nevigate(`/products-category/${item}`)
    }
    return (
        <>
            {/* Responsive update: keep the back action inside a mobile-safe container. */}
            <div className='px-3 sm:px-6 pt-3'>
                <h1>
                    <BackButton nevigatePage={"/"} />
                </h1>
            </div>
            {/* Responsive update: reduce horizontal padding on phones while preserving comfortable desktop spacing. */}
            <div className='flex flex-col px-3 sm:px-6 mb-5'>
                <div>
                    {/* Responsive update: scale the page heading for smaller screens. */}
                    <h1 className='text-lg sm:text-xl font-serif py-4'>All Catrogry</h1>
                </div>
                {/* Responsive update: category cards use 2 columns on phones, 3 on tablets and 5 on desktop. */}
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 m-auto w-full z-10'>
                    {upiqueCategory.map((item) => {
                        const findImage = productsStore.find(products => products.category === item)?.image;
                        return (
                            <div onClick={() => {
                                productsCategoryHandler(item)
                            }} key={item} className='h-52 sm:h-62 w-full min-w-0 flex flex-col rounded-xl shadow-2xl overflow-hidden'>
                                {/* Products List Category Image */}
                                {/* Responsive update: image area scales with the card and remains contained on mobile. */}
                                <div className='h-40 sm:h-50 w-full rounded-tl-xl rounded-tr-xl flex justify-center bg-[#cac8c8]'>
                                    <img src={findImage} className='w-full h-full aspect-square object-contain rounded-2xl' />
                                </div>
                                <div className='flex-1 rounded-bl-xl rounded-br-xl flex justify-center items-center bg-[#f0ebeb] px-2'>
                                    {/* Responsive update: use mobile-friendly typography and safe wrapping for category names. */}
                                    <h1 className='text-sm sm:text-xl font-medium text-center break-words'>{item?.toUpperCase()}</h1>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default AllProductsCategory
