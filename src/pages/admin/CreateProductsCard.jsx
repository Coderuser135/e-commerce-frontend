import React, { useEffect, useRef, useState } from 'react'
import Category from '../../components/Category.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import productsImage from '../../assets/userImage.jpg'
import { setEditDataStore } from '../../features/Store/slice/admin.slice.js'
import { createProducts, updateProducts } from '../../features/Store/reducers/admin.reducer.js'
import ButtonLoading from "../../components/ButtonLoading.jsx"
import { toast } from 'react-toastify'

const CreateProductsCard = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.admin.loading)
  const menuBar = useSelector(state => state.admin.menuBar)
  const eidtData = useSelector(state => state.admin.editDataStore)
  const nevigate = useNavigate()
  const [inputData, setInputData] = useState({
    image: productsImage,
    category: '',
    rating: '',
    title: '',
    description: '',
    orginalPrice: '',
    discountPrice: '',
  })
  const inputDataHandler = (e) => {
    const { name, value, type, files } = e.target
    setInputData({
      ...inputData,
      [name]: type === "file" ? files[0] : value
    })
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
      inputData.discountPrice === "") {
      toast.error("All Products fields are required")
      return
    }
    if (inputData.rating > 5) {
      return toast.error("Products rating more then 5")
    }
    const formData = new FormData()
    const inputFromData = {
      category: inputData.category,
      rating: inputData.rating,
      title: inputData.title,
      description: inputData.description,
      orginalPrice: inputData.orginalPrice,
      discountPrice: inputData.discountPrice
    }
    formData.append("inputData", JSON.stringify(inputFromData))
    formData.append("image", inputData.image)
    await dispatch(createProducts({ formData: formData, bearerToken: user.accessToken }))
    setInputData({
      image: productsImage,
      category: '',
      rating: '',
      title: '',
      description: '',
      orginalPrice: '',
      discountPrice: '',
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
    formData.append("image", inputData.image)
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
      discountPrice: '',
    })
    dispatch(setEditDataStore(null))
  }
  const cancelProductsHandler = () => {
    setInputData({
      image: '',
      category: '',
      rating: '',
      title: '',
      description: '',
      orginalPrice: '',
      discountPrice: '',
    })
  }
  const imageFolderRef = useRef(null)
  const openImageFolderHandler = () => {
    if (imageFolderRef.current) {
      imageFolderRef.current.click()
    }
  }
  const { image, category, rating, title, description, orginalPrice, discountPrice } = inputData
  return (
    <>
      <div className='h-[91vh] w-full flex flex-col gap-5 bg-[#ddd9d9] py-5 transition-all 2s ease-in-out'>
        <div className='h-full w-full flex flex-col justify-center items-center gap-2'>
          <div className={`h-120 w-150 bg-[#e9e4e4] shadow-2xl rounded-[25px] flex flex-col px-6 py-5 gap-1`}>
            {/* products title, products descraption, products image, products rating, products category, orginal price, discount price */}
            {/* Column-1 */}
            {/* Products Image */}
            <div className='h-25 w-35 rounded-xl flex justify-center items-center relative bg-[#afafaf] flex-col'>
              <div className='h-full w-full rounded-xl hover:scale-95 flex justify-center items-center'>
                <img src={image instanceof File ? URL.createObjectURL(image) : image} alt='products image' className='h-full w-full rounded-xl' />
              </div>
              <input type='file' name='image' onChange={inputDataHandler} ref={imageFolderRef} className='hidden' />
              <div onClick={openImageFolderHandler} className='h-full w-full flex justify-center items-center bg-black absolute rounded-xl opacity-0 hover:opacity-60 text-xl text-white'>
                <h1 className='text-4xl'>+</h1>
              </div>
            </div>
            <div className='w-full flex justify-between items-center  font-serif p-2'>
              {/* Products Title */}
              <div>
                <label className='flex flex-col'>
                  Products Title
                  <input
                    type='text'
                    value={title}
                    name='title'
                    placeholder='Products Title'
                    onChange={inputDataHandler}
                    className='ml-2 mt-2 px-4 py-1.25 border border-solid border-[gray] rounded-sm'
                  />
                </label>
              </div>

              {/* Products Descraption */}
              <div>
                <label className='flex flex-col'>
                  Products Description
                  <input
                    type='text'
                    value={description}
                    name='description'
                    onChange={inputDataHandler}
                    placeholder='Products Description'
                    className='ml-2 mt-2 px-4 py-1.25 border border-solid border-[gray] rounded-sm'
                  />
                </label>
              </div>

            </div>
            {/* Column-2 */}
            <div className='w-full flex justify-between items-center  font-serif p-2'>
              {/* Products Orginal Price */}
              <div>
                <label className='flex flex-col'>
                  Orginal Price
                  <input
                    type='number'
                    value={orginalPrice}
                    name='orginalPrice'
                    onChange={inputDataHandler}
                    placeholder='Orginal Price'
                    className='ml-2 mt-2 px-4 py-1.25 border border-solid border-[gray] rounded-sm'
                  />
                </label>
              </div>

              {/* Products Discount Price */}
              <div>
                <label className='flex flex-col'>
                  Discount Price
                  <input
                    type='number'
                    value={discountPrice}
                    name='discountPrice'
                    onChange={inputDataHandler}
                    placeholder='Discount Price'
                    className='ml-2 mt-2 px-4 py-1.25 border border-solid border-[gray] rounded-sm'
                  />
                </label>
              </div>
            </div>
            {/* Column-3 */}
            <div className='w-full flex justify-between items-center  font-serif p-2'>
              {/* Products Rating */}
              <div>
                <label className='flex flex-col'>
                  Products Rating
                  <input
                    type='number'
                    value={rating}
                    name='rating'
                    onChange={inputDataHandler}
                    placeholder='Products Rating'
                    className='ml-2 mt-2 px-4 py-1.25 border border-solid border-[gray] rounded-sm'
                  />
                </label>
              </div>
            </div>
            {/* Column-4 */}
            <div className='w-full flex justify-center items-center  font-serif p-2 mt-2'>
              <div>
                <select name="category" onChange={inputDataHandler} value={category} className='px-40 py-1.25 border border-solid border-[#aaa9a9] rounded-[5px] shadow-2xl outline-none'>
                  <option value={''}>---Option----</option>
                  <option value="grocery">Grocery </option>
                  <option value="gourmet Foods">Gourmet Foods:</option>
                  <option value="sports">Sports</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home</option>
                  <option value="beauty">Beauty</option>
                  <option value="electronics ">Electronics</option>
                </select>
              </div>
            </div>

          </div>
        </div>
        <div className='h-20 w-150 m-auto flex items-center gap-2 justify-end'>
          <button onClick={() => {
            if (eidtData !== null) {
              updateProductsDataHandler()
            } else {
              createProductsHandler()
            }
          }} disabled={loading} className={`py-2.5 px-15 rounded-xl text-[18px] bg-[#0066FF] font-medium font-sans text-white shadow-2xl active:scale-95`}>{loading === true ? <ButtonLoading /> : eidtData !== null ? 'Update' : 'Create'}</button>
          <button onClick={cancelProductsHandler} className={`py-2.5 px-15 rounded-xl text-[18px] font-medium font-sans    shadow-2xl active:scale-95 text-black bg-[#E5F0FF]`}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default CreateProductsCard
