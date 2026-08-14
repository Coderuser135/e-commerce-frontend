import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

const AdminProductsCategory = () => {
    const productsStore = useSelector(state => state.products.productsStore)
    const upiqueCategory = [...new Set(productsStore.map((item) => item.category))]
    const menuBar = useSelector(state => state.admin.menuBar)
    const nevigate = useNavigate()
    const productsCategoryHandler = (item) => {
        nevigate(`/adminPannel/products-category/${item}`)
    }
    return (
        <>
            <div className='flex flex-col px-6 mb-5'>
                <div>
                    <h1 className='text-xl font-serif py-4'>All Catrogry</h1>
                </div>
                <div className={`${menuBar === true ? `grid grid-cols-4 gap-4  m-auto w-full z-10`: `grid grid-cols-5 gap-4  m-auto w-full z-10`}`}>
                    {upiqueCategory.map((item, index) => {
                        const findImage = productsStore.find(products => products.category === item)?.image;
                        return (
                            
                                <div onClick={() => {
                                    productsCategoryHandler(item)
                                }} key={index} className='h-62 w-54 flex flex-col mb-4 rounded-xl shadow-2xl'>
                                    {/* Products List Category Image */}
                                    <div className='h-50 w-full rounded-tl-xl rounded-tr-xl flex justify-center bg-[#cac8c8]'>
                                        <img src={findImage} className='aspect-square object-contain rounded-2xl' />
                                    </div>
                                    <div className='flex-1 rounded-bl-xl rounded-br-xl flex justify-center items-center bg-[#f0ebeb]'>
                                        <h1 className='text-xl font-medium'>{item.toUpperCase()}</h1>
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
