import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

const AdminProductsCategory = () => {
    const productsStore = useSelector(state => state.products.productsStore)
    const upiqueCategory = [...new Set(productsStore.map((item) => item?.category))]
    const menuBar = useSelector(state => state.admin.menuBar)
    const nevigate = useNavigate()
    const productsCategoryHandler = (item) => {
        nevigate(`/adminPannel/products-category/${item}`)
    }
    return (
        <>
            {/* Responsive update: keep the admin category content inside the viewport on small screens. */}
            <div className='flex flex-col w-full min-w-0 px-3 sm:px-5 lg:px-6 mb-5 overflow-x-hidden'>
                <div>
                    {/* Responsive update: scale the admin heading for mobile while retaining the larger desktop size. */}
                    <h1 className='text-lg sm:text-xl font-serif py-3 sm:py-4'>All Catrogry</h1>
                </div>
                {/* Responsive update: use 2 columns on phones, 3 on tablets, and adapt desktop columns to the sidebar state. */}
                <div className={`${menuBar === true ? `grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 m-auto w-full z-10`: `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 m-auto w-full z-10`}`}>
                    {upiqueCategory.map((item, index) => {
                        const findImage = productsStore.find(products => products?.category === item)?.image;
                        return (
                            <div onClick={() => {
                                productsCategoryHandler(item)
                            }} key={index} className='h-52 sm:h-62 w-full min-w-0 flex flex-col mb-2 sm:mb-4 rounded-xl shadow-2xl overflow-hidden'>
                                {/* Responsive update: make the image area fluid so it follows the card width on mobile. */}
                                <div className='h-36 sm:h-50 w-full rounded-tl-xl rounded-tr-xl flex justify-center bg-[#cac8c8] shrink-0'>
                                    <img src={findImage} className='w-full h-full aspect-square object-contain rounded-2xl' />
                                </div>
                                <div className='flex-1 min-w-0 rounded-bl-xl rounded-br-xl flex justify-center items-center bg-[#f0ebeb] px-2'>
                                    {/* Responsive update: reduce category typography on mobile and safely wrap long names. */}
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

export default AdminProductsCategory
