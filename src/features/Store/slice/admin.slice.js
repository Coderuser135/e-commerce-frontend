import { createSlice } from "@reduxjs/toolkit";
import { createProducts, updateProducts } from "../reducers/admin.reducer.js";

const initialState = {
  menuBar: false,
  deletePopup: false,
  editDataStore: null,
  loading: false,
  error: null
};

const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setMenuBar: (state, action) => {
      state.menuBar = !state.menuBar;
    },
    setDeletePopup: (state, action) => {
      state.deletePopup = action.payload ?? true
    },
    setCloseDeletePopup: (state, action) => {
      state.deletePopup = false
    },
    setEditDataStore: (state, action) => {
      state.editDataStore = action.payload
    }
  },
  extraReducers: (Builders) => {
    // create products 
    Builders.addCase(createProducts.pending, (state, action) => {
      state.loading = true
    })
    Builders.addCase(createProducts.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
    })
    Builders.addCase(createProducts.rejected, (state, action) => {
      state.loading = false
      state.error = null
    })
    // update products
       Builders.addCase(updateProducts.pending, (state, action) => {
      state.loading = true
    })
    Builders.addCase(updateProducts.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
    })
    Builders.addCase(updateProducts.rejected, (state, action) => {
      state.loading = false
      state.error = null
    })
  }
});

export default admin.reducer;
export const { setMenuBar, setDeletePopup, deletePopup, setEditDataStore } = admin.actions;
