import React from 'react'
import { Card } from './ProductsPage'
import { useSelector } from 'react-redux'
import BackButton from '../../components/BackButton'

const AllProductsPage = () => {
  const productsStore = useSelector(state => state.products.productsStore)
  return (
    <>
      {/* Responsive update: use smaller horizontal padding on mobile and comfortable spacing on larger screens. */}
      <div className='min-h-screen w-full flex flex-col px-3 sm:px-6 py-3 sm:py-4 gap-2 bg-[#e7e2e2] overflow-x-hidden'>
        {/* Responsive update: keep the back button area compact and touch-friendly on small screens. */}
        <div className='w-20 h-9 flex items-center'>
          <BackButton nevigatePage={'/'}/>
        </div>
        <div>
          {/* Responsive update: scale the page heading for mobile while keeping the desktop hierarchy. */}
          <h1 className='text-lg sm:text-xl font-bold font-serif text-[#181717]'>All Products ({productsStore.length})</h1>
        </div>
        {/* Responsive update: product grid uses 2 columns on phones, 3 on tablets and 5 on desktop. */}
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 m-auto justify-items-center'>
          {productsStore.map((item) => {
            return (
              <div key={item?._id} className='w-full flex justify-center min-w-0'>
                <Card details={item} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default AllProductsPage
