import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth.slice.js"
import productsReducer from "./slice/products.slice.js"
import userReducer from "./slice/user.slice.js"
import adminReducer from "./slice/admin.slice.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        user: userReducer,
        admin: adminReducer
    }
})

export default store
