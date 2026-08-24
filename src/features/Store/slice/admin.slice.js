import { createSlice } from "@reduxjs/toolkit";
import { createProducts, deleteProducts, getAddToCard, updateProducts } from "../reducers/admin.reducer.js";

const initialState = {
  menuBar: false,
  deletePopup: false,
  editDataStore: null,
  loading: false,
  card: [],
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
    // delete products
      Builders.addCase(deleteProducts.pending, (state, action) => {
      state.loading = true
    })
    Builders.addCase(deleteProducts.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
    })
    Builders.addCase(deleteProducts.rejected, (state, action) => {
      state.loading = false
      state.error = null
    })
    // get addToCard
     Builders.addCase(getAddToCard.pending, (state, action) => {
      state.loading = true
    })
    Builders.addCase(getAddToCard.fulfilled, (state, action) => {
      state.loading = false
      state.card = action.payload
      state.error = null
    })
    Builders.addCase(getAddToCard.rejected, (state, action) => {
      state.loading = false
      state.error = null
    })
  }
});

export default admin.reducer;
export const { setMenuBar, setDeletePopup, deletePopup, setEditDataStore, setCloseDeletePopup } = admin.actions;
