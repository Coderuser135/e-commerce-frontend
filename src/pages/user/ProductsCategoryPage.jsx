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
        if (item.category === category) {
            return item
        }
    })
    console.log(productsCategory)
    return (
        <>
            <div className='h-full w-full px-6 py-5 flex flex-col gap-2 bg-[#e7e2e2]'>
                <div className='w-20 h-8 flex items-center'>
                    <BackButton nevigatePage={'/'} />
                </div>
                <h1 className='text-xl font-medium font-serif'>Category: {category} ({productsCategory.length})</h1>
                <div className='h-full w-full grid grid-cols-5 gap-5'>
                    {productsCategory.map((item) => {
                        return (
                            <Card key={item._id} details={item} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ProductsCategoryPage
