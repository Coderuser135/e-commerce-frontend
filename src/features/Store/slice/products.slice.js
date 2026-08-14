import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getSingleProducts } from "../reducers/products.reducer.js";

const initialState = {
    productsStore: [],
    singleProduct: [],
    loading: false,
    error: null
}

const products = createSlice({
    name: "products",
    initialState,
    extraReducers: {},
    extraReducers: (Builders) => {
        // get all products item
        Builders.addCase(getProducts.pending, (state, action) => {
            state.loading = true,
            state.error = null
        }),
        Builders.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false,
            state.productsStore = action.payload
        }),
        Builders.addCase(getProducts.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
        // get single products item
            Builders.addCase(getSingleProducts.pending, (state, action) => {
            state.loading = true,
            state.error = null
        }),
        Builders.addCase(getSingleProducts.fulfilled, (state, action) => {
            state.loading = false,
            state.singleProduct = action.payload
        }),
        Builders.addCase(getSingleProducts.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
    }
})

export default products.reducer
export const  {} = products.actions