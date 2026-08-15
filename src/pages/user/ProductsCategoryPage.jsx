import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card } from './ProductsPage'
import BackButton from '../../components/BackButton'

const ProductsCategoryPage = () => {
    const productsStore = useSelector(state => state.products.productsStore)
    const params = useParams()
    const category = params.category
    const productsCategory = productsStore.filter((item) => {
        if (item?.category === category) {
            return item
        }
    })
    console.log(productsCategory)
    return (
        <>
            {/* Responsive update: use viewport-safe horizontal padding for mobile and larger spacing from tablet upward. */}
            <div className='min-h-screen w-full px-3 sm:px-6 py-4 sm:py-5 flex flex-col gap-2 bg-[#e7e2e2] overflow-x-hidden'>
                {/* Responsive update: keep the back button easy to reach on small touch screens. */}
                <div className='w-20 h-8 flex items-center shrink-0'>
                    <BackButton nevigatePage={'/'} />
                </div>
                {/* Responsive update: scale category heading and allow long category names to wrap. */}
                <h1 className='text-base sm:text-xl font-medium font-serif break-words'>Category: {category} ({productsCategory?.length})</h1>
                {/* Responsive update: use 2 columns on phones, 3 on tablets and 5 on desktop. */}
                <div className='h-full w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 justify-items-center'>
                    {productsCategory.map((item) => {
                        return (
                            <div key={item?._id} className='w-full min-w-0 flex justify-center'>
                                <Card details={item} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ProductsCategoryPage
