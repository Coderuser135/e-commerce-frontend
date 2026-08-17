import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditDataStore } from '../../features/Store/slice/admin.slice.js'
import { createProducts, updateProducts } from '../../features/Store/reducers/admin.reducer.js'
import ButtonLoading from "../../components/ButtonLoading.jsx"
import { toast } from 'react-toastify'
import productsImage from "../../assets/productsImage.jpg"

const CreateProductsCard = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.admin.loading)
  const eidtData = useSelector(state => state.admin.editDataStore)
  const [inputData, setInputData] = useState({
    image: productsImage,
    productsImage,
    category: '',
    rating: '',
    title: '',
    description: '',
    orginalPrice: '',
    discountPrice: ''
  })
  const inputDataHandler = (e) => {
    const { name, value, type, files } = e.target
    setInputData({ ...inputData, [name]: type === "file" ? files[0] : value })
  }
  useEffect(() => {
    if (!eidtData) return
    setInputData({
      image: eidtData.image,
      category: eidtData.category,
      rating: eidtData.rating,
      title: eidtData.rating,
      description: eidtData.description,
      orginalPrice: eidtData.orginalPrice,
      discountPrice: eidtData.discountPrice
    })
  }, [eidtData])
  const createProductsHandler = async () => {
    if (inputData.image === "" ||
      inputData.category === "" ||
      inputData.rating === "" ||
      inputData.title === "" ||
      inputData.description === "" ||
      inputData.orginalPrice === "" ||
      inputData.discountPrice === "")
      return toast.error("All Products fields are required")

    if (inputData.rating > 5) return toast.error("Products rating more then 5")
    const formData = new FormData()
    const inputFromData = {
      category: inputData.category,
      rating: inputData.rating,
      title: inputData.title,
      description: inputData.description,
      orginalPrice: inputData.orginalPrice,
      discountPrice: inputData.discountPrice
    }
    formData.append("inputData", JSON.stringify(inputFromData));
    formData.append("image", inputData.image)
    await dispatch(createProducts({
      formData,
      bearerToken: user.accessToken
    }))
    setInputData({
      image: productsImage,
      category: '',
      rating: '',
      title: '',
      description: '',
      orginalPrice: '',
      discountPrice: ''
    })
  }
  const updateProductsDataHandler = async () => {
    const formData = new FormData()
    const inputFromData = {
      category: inputData.category,
      rating: inputData.rating,
      title: inputData.title,
      description: inputData.description,
      orginalPrice: inputData.orginalPrice,
      discountPrice: inputData.discountPrice
    }
    formData.append("image", inputData.image);
    formData.append("inputData", JSON.stringify(inputFromData))
    await dispatch(updateProducts({
      updateData: formData,
      id: eidtData._id,
      bearerToken: user.accessToken
    }))
    setInputData({
      image: productsImage,
      category: '',
      rating: '',
      title: '',
      description: '',
      orginalPrice: '',
      discountPrice: ''
    });
    dispatch(setEditDataStore(null))
  }
  const cancelProductsHandler = () => {
    setInputData({
      image: productsImage,
      category: '',
      rating: '',
      title: '',
      description: '',
      orginalPrice: '',
      discountPrice: ''
    })
  }
  const imageFolderRef = useRef(null)
  const openImageFolderHandler = () => imageFolderRef.current?.click()
  const { image, category, rating, title, description, orginalPrice, discountPrice } = inputData
  return (
    <>
      {/* Responsive update: allow the form page to scroll naturally on short mobile screens instead of using a fixed viewport height. */}
      <div className='min-h-[91vh] w-full flex flex-col gap-4 sm:gap-5 bg-[#ddd9d9] py-4 sm:py-5 px-3 sm:px-5 overflow-x-hidden'>
        {/* Responsive update: make the form card fluid on mobile and restore the original compact desktop width on larger screens. */}
        <div className='w-full flex justify-center'>
          <div className='w-full max-w-[37.5rem] bg-[#e9e4e4] shadow-2xl rounded-[20px] sm:rounded-[25px] flex flex-col px-4 sm:px-6 py-4 sm:py-5 gap-2'>
            {/* Responsive update: keep the product image centered and touch-friendly on small screens. */}
            <div className='h-24 w-32 sm:h-25 hover:scale-95 transition-all duration-150 ease-in-out sm:w-35 rounded-xl flex justify-center items-center relative bg-[#afafaf] flex-col mx-auto shrink-0'>
              <div className='h-full w-full rounded-xl hover:scale-95 flex justify-center items-center'>
                <img src={image instanceof File ? URL.createObjectURL(image) : image} alt='products image' className='h-full w-full rounded-xl object-cover' />
              </div>
              <input type='file' name='image' onChange={inputDataHandler} ref={imageFolderRef} className='hidden' />
              <div onClick={openImageFolderHandler} className='h-full w-full flex justify-center items-center bg-black absolute rounded-xl opacity-0 hover:opacity-60 text-xl text-white'><h1 className='text-4xl'>+</h1></div>
            </div>
            {/* Responsive update: stack form fields on mobile and use two columns from tablet upward. */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-3 font-serif p-1 sm:p-2'>
              <label className='flex flex-col text-sm sm:text-base gap-1'>Products Title<input type='text' value={title} name='title' placeholder='Products Title' onChange={inputDataHandler} className='w-full min-w-0 h-10 px-3 border border-solid border-[gray] rounded-sm text-sm sm:text-base' /></label>
              <label className='flex flex-col text-sm sm:text-base gap-1'>Products Description<input type='text' value={description} name='description' onChange={inputDataHandler} placeholder='Products Description' className='w-full min-w-0 h-10 px-3 border border-solid border-[gray] rounded-sm text-sm sm:text-base' /></label>
              <label className='flex flex-col text-sm sm:text-base gap-1'>Orginal Price<input type='number' value={orginalPrice} name='orginalPrice' onChange={inputDataHandler} placeholder='Orginal Price' className='w-full min-w-0 h-10 px-3 border border-solid border-[gray] rounded-sm text-sm sm:text-base' /></label>
              <label className='flex flex-col text-sm sm:text-base gap-1'>Discount Price<input type='number' value={discountPrice} name='discountPrice' onChange={inputDataHandler} placeholder='Discount Price' className='w-full min-w-0 h-10 px-3 border border-solid border-[gray] rounded-sm text-sm sm:text-base' /></label>
              <label className='flex flex-col text-sm sm:text-base gap-1'>Products Rating<input type='number' value={rating} name='rating' onChange={inputDataHandler} placeholder='Products Rating' className='w-full min-w-0 h-10 px-3 border border-solid border-[gray] rounded-sm text-sm sm:text-base' /></label>
              <label className='flex flex-col text-sm sm:text-base gap-1'>Products Category<select name="category" onChange={inputDataHandler} value={category} className='w-full min-w-0 h-10 px-3 border border-solid border-[#aaa9a9] rounded-[5px] shadow-2xl outline-none bg-white text-sm sm:text-base'><option value=''>---Option----</option><option value='grocery'>Grocery</option><option value='gourmet Foods'>Gourmet Foods</option><option value='sports'>Sports</option><option value='fashion'>Fashion</option><option value='home'>Home</option><option value='beauty'>Beauty</option><option value='electronics '>Electronics</option></select></label>
            </div>
          </div>
        </div>
        {/* Responsive update: action buttons become full-width on phones and return to compact side-by-side buttons on desktop. */}
        <div className='w-full max-w-[37.5rem] mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 justify-end'>
          <button onClick={() => eidtData !== null ? updateProductsDataHandler() : createProductsHandler()} disabled={loading} className='w-full sm:w-auto py-2.5 px-8 sm:px-12 rounded-xl text-base sm:text-[18px] bg-[#0066FF] font-medium font-sans text-white shadow-2xl active:scale-95'>{loading ? <ButtonLoading /> : eidtData !== null ? 'Update' : 'Create'}</button>
          <button onClick={cancelProductsHandler} className='w-full sm:w-auto py-2.5 px-8 sm:px-12 rounded-xl text-base sm:text-[18px] font-medium font-sans shadow-2xl active:scale-95 text-black bg-[#E5F0FF]'>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default CreateProductsCard
