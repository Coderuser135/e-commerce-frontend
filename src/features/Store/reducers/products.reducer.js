import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../configs/api.config.js";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ bearerToken }, { rejectWithValue }) => {
    try {
      const getProductsItem = await api.get("/api/products", {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      return getProductsItem.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getSingleProducts = createAsyncThunk(
  "products/getSingleProduucts",
  async ({ id, bearerToken }, { rejectWithValue }) => {
    try {
      const getSingleProductsItem = await api.get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });
      console.log(getSingleProductsItem)
      return getSingleProductsItem.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
);
