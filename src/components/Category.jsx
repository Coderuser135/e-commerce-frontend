import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBorderAll } from "react-icons/fa";

const Category = () => {
    const productsDetails = useSelector(stete => stete.products.productsStore)
    const singleProductsCategory = [...new Set(productsDetails.map(item => item.category))]
    const nevigete = useNavigate()
    const categoryHandler = (item) => {
        nevigete(`/products-category/${item}`)
    }
    const seeAllProductsHandler = () => {
        nevigete('/products-all')
    }
    return (
        <>
            {/* Responsive update: make the category bar horizontally scrollable on mobile instead of forcing all categories into the viewport. */}
            <div className="py-2 sm:py-[10px] w-full bg-[#B0BA99] flex items-start gap-3 sm:gap-5 sticky top-20 px-3 sm:px-6 z-15 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex flex-col justify-center items-center gap-1 shrink-0">
                    {/* Responsive update: keep category icons compact on small screens while preserving the desktop size. */}
                    <div onClick={seeAllProductsHandler} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex justify-center items-center">
                        <h1><FaBorderAll className="h-6 w-6 sm:h-8 sm:w-8"/></h1>
                    </div>
                    {/* Responsive update: use a readable mobile label size and a fixed narrow label width to avoid layout growth. */}
                    <button className="text-[#666363] font-bold font-mono text-xs sm:text-[16.9px] active:scale-95 truncate w-20 sm:w-28">All Products</button>
                </div>
                {singleProductsCategory.slice(0, 10).map((item) => {
                    const findProductsImage = productsDetails.find(products => products.category === item)?.image
                    return (
                        <div key={item} onClick={() => {
                            categoryHandler(item)
                        }} className="flex flex-col justify-center items-center gap-1 shrink-0">
                            {/* Responsive update: category thumbnails scale down on mobile and retain their desktop dimensions from sm upward. */}
                            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex justify-center items-center aspect-square object-contain">
                                <img src={findProductsImage} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover" />
                            </div>
                            {/* Responsive update: category names use smaller mobile typography and a controlled label width. */}
                            <button className="text-[#666363] font-bold font-mono text-xs sm:text-[16.9px] active:scale-95 truncate w-16 sm:w-18">{item}</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Category