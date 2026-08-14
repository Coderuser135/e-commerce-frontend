import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBorderAll } from "react-icons/fa";

const Category = () => {
    const productsDetails = useSelector(stete => stete.products.productsStore)
    const singleProductsCategory = [...new Set(productsDetails.map(item => item.category))]
    console.log(singleProductsCategory)
    const nevigete = useNavigate()
    const categoryHandler = (item) => {
        nevigete(`/products-category/${item}`)
    }
    const seeAllProductsHandler = () => {
        nevigete('/products-all')
    }
    return (
        <>
            <div className="py-[10px] w-full bg-[#B0BA99] flex items-center gap-5 sticky top-20 px-6 z-15">
                <div className="flex flex-col justify-center items-center gap-1">
                    <div onClick={seeAllProductsHandler} className="h-12 w-12 rounded-full flex justify-center items-center">
                        <h1><FaBorderAll className="h-8 w-8"/></h1>
                    </div>
                    <button className=" text-[#666363] font-bold font-mono text-[16.9px] active:scale-95 truncate w-28">All Products</button>
                </div>
                {singleProductsCategory.slice(0, 10).map((item) => {
                    const findProductsImage = productsDetails.find(products => products.category === item)?.image
                    console.log(findProductsImage)
                    return (
                        <div key={item} onClick={() => {
                            categoryHandler(item)
                        }} className="flex flex-col justify-center items-center gap-1">
                            <div className="h-12 w-12 rounded-full flex justify-center items-center aspect-square object-contain">
                                <img src={findProductsImage} className="h-12 w-12 rounded-full" />
                            </div>
                            <button className=" text-[#666363] font-bold font-mono text-[16.9px] active:scale-95 truncate w-18">{item}</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Category