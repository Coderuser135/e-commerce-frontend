import React from 'react'
import { Card } from './ProductsPage'
import { useSelector } from 'react-redux'
import BackButton from '../../components/BackButton'

const AllProductsPage = () => {
  const productsStore = useSelector(state => state.products.productsStore)
  return (
    <>
      <div className='h-full w-full flex flex-col px-6 py-4 gap-2 bg-[#e7e2e2]'>
        <div className='w-20 h-8 flex items-center'>
          <BackButton nevigatePage={'/'}/>
        </div>
        <div>
          <h1 className='text-xl font-bold font-serif text-[#181717]'>All Products ({productsStore.length})</h1>
        </div>
        <div className='w-full grid grid-cols-5 gap-4 m-auto'>
          {productsStore.map((item) => {
            return (
              <Card key={item._id} details={item} />
            )
          })}

        </div>
      </div>
    </>
  )
}

export default AllProductsPage
