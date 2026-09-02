import { createSlice } from "@reduxjs/toolkit";
import { createProducts, decreaseAddToCardQuentity, deleteProducts, getAddToCard, getSingleOrder, increaseAddToCardQuentity, paymentVerify, updateProducts } from "../reducers/admin.reducer.js";

const initialState = {
  menuBar: false,
  deletePopup: false,
  editDataStore: null,
  loading: false,
  paymentVerifyStatus: null,
  getSingleOrderItem: [],
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
    // increase quentity
     Builders.addCase(increaseAddToCardQuentity.pending, (state, action) => {
      state.loading = true
    })
    Builders.addCase(increaseAddToCardQuentity.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
    })
    Builders.addCase(increaseAddToCardQuentity.rejected, (state, action) => {
      state.loading = false
      state.error = null
    })
    // decrease quentity
      Builders.addCase(decreaseAddToCardQuentity.pending, (state, action) => {
      state.loading = true
    })
    Builders.addCase(decreaseAddToCardQuentity.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
    })
    Builders.addCase(decreaseAddToCardQuentity.rejected, (state, action) => {
      state.loading = false
      state.error = null
    })
    // create order
    Builders.addCase(paymentVerify.pending, (state, action) => {
      state.loading = true
    })
    Builders.addCase(paymentVerify.fulfilled, (state, action) => {
      state.loading = false,
      state.paymentVerifyStatus = action.payload
      state.error = null
    })
    Builders.addCase(paymentVerify.rejected, (state, action) => {
      state.loading = false
      state.error = null
    })
    // get single order item
    Builders.addCase(getSingleOrder.pending, (state, action) => {
      state.loading = true
    })
    Builders.addCase(getSingleOrder.fulfilled, (state, action) => {
      state.loading = false,
      state.getSingleOrderItem = action.payload
      state.error = null
    })
    Builders.addCase(getSingleOrder.rejected, (state, action) => {
      state.loading = false
      state.error = null
    })
  }
});

export default admin.reducer;
export const { setMenuBar, setDeletePopup, deletePopup, setEditDataStore, setCloseDeletePopup } = admin.actions;
