import React from 'react'
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { decreaseAddToCardQuentity, deleteAddToCard, increaseAddToCardQuentity } from '../features/Store/reducers/admin.reducer';
import { toast } from 'react-toastify';

const AddToCard = ({ item }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.admin.loading)
    const increaseQuentityHandler = (quentity, itemId) => {
        dispatch(increaseAddToCardQuentity({
            bearerToken: user?.accessToken,
            itemId: itemId
        }))
    }
    const decreaseQuentityHandeler = (quentity, itemId) => {
        if(quentity < 1 || quentity === 1){
            return toast.error("item quentity is not valid")
        }
        dispatch(decreaseAddToCardQuentity({
            bearerToken: user?.accessToken,
            itemId: itemId
        }))
    }
    const deleteAddToCardHandler = (id) => {
        dispatch(deleteAddToCard({
            bearerToken: user?.accessToken,
            id: id
        }))
    }
    return (
        <div key={item._id} className={`h-32 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-[#202020] w-full bg-[#615e5e] flex justify-center items-center rounded-xl px-2`}>
            <div className="h-full w-30 flex justify-center items-center">
                <img src={item?.productsId?.image} className="h-25 w-25 rounded-xl hover:scale-102" />
            </div>
            <div className="h-full w-full flex flex-col">
                <div className="h-20 w-full flex flex-col gap-1">
                    <div>
                        <h1 className="text-[14.5px] font-sans mt-1 px-2">{item?.productsId?.title}</h1>
                    </div>
                    <div>
                        <h1 className="text-[13px] font-sans truncate w-80 px-2">{item?.productsId?.description}</h1>
                    </div>
                    <div className="flex justify-between items-center w-50">
                        <div className='flex justify-between items-center w-16 bg-[#8e6ccee3] px-2 ml-2 mt-1 py-1 rounded-[5px] shadow-2xl gap-[3.5px] shrink-0'>
                            <h1 className='font-bold text-sm'>{item?.productsId?.rating}</h1>
                            <FaStar className='text-[#ffda05] text-sm' />
                        </div>
                        <div className='flex items-center gap-2 text-base sm:text-xl shrink-0 mt-1'>
                            <h1 className='line-through text-[#a19d9d] font-extralight text-xl'>₹{item?.productsId?.orginalPrice}</h1>
                            <h1 className='text-[#e0dddd] text-xl'>₹{item?.productsId?.discountPrice}</h1>
                        </div>
                    </div>
                </div>
                <div className="h-20 w-full flex items-center">
                    <div>
                        <h1 className="text-xl px-2">Quentity :</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button disabled={loading} onClick={() => decreaseQuentityHandeler(item?.quentity, item?.productsId?._id)} className="w-8 h-6.5 rounded-[5px] bg-[#8e6cce62] flex justify-center items-center active:scale-95 transition-all duration-150 ease-in-out"><h1 className="mb-1.5">-</h1></button>
                        <h1 className="text-xl">{item?.quentity}</h1>
                        <button disabled={loading} onClick={() => increaseQuentityHandler(item?.quentity, item?.productsId?._id)} className="w-8 h-6.5 rounded-[5px] bg-[#8e6cce62] flex justify-center items-center active:scale-95 transition-all duration-150 ease-in-out"><h1 className="mb-1 text-xl">+</h1></button>
                    </div>
                    <div className="w-32 flex items-center justify-end">
                        <button onClick={() => deleteAddToCardHandler(item?.productsId?._id)} className="w-8 h-6.5 rounded-[5px] bg-[#03030362] flex justify-center text-red-500 items-center active:scale-105 transition-all duration-150 ease-in-out"><h1 className="mb-1 text-xl">x</h1></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddToCard
