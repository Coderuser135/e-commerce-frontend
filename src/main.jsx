import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./features/Store/store.js"
import './index.css'
import App from './App.jsx'
import router from './Routes/router.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>

)
