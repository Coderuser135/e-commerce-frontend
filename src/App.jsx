import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useSelector } from 'react-redux'


function App() {
  const token = useSelector(state => state.auth.token)
  console.log(token)
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
