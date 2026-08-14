import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { getProducts } from './features/Store/reducers/products.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


function App() {
  const dispatch = useDispatch()
  const bearerToken = useSelector(state => state.auth.token)
  useEffect(() => {
    const productsItem = async () => {
      const productsData = await dispatch(getProducts({bearerToken}))
    }
    productsItem()
  }, [dispatch])
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
