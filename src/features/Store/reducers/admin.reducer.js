import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../configs/api.config.js";
import { getProducts } from "./products.reducer.js";
import { toast } from "react-toastify";

export const createProducts = createAsyncThunk(
  "admin/createProducts",
  async ({ formData, bearerToken }, { rejectWithValue, dispatch }) => {
    try {
      const createProductsItem = await api.post(`/api/products`, formData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (createProductsItem.status === 201) {
        dispatch(getProducts({
          bearerToken
        }));
        toast.success("This Products are created");
      }
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updateProducts = createAsyncThunk(
  "admin/updateProducts",
  async ({ updateData, id, bearerToken }, { rejectWithValue, dispatch }) => {
    try {
      const updateProductsItem = await api.put(
        `/api/products/${id}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${bearerToken}` },
        },
      );
      if (updateProductsItem.status === 200) {
        await dispatch(getProducts({
          bearerToken
        }));
        toast.success("This Products is updated");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteProducts = createAsyncThunk(
  "admin/deleteProducts",
  async ({ id }, { rejectWithValue }) => {
    try {
    } catch (error) {}
  },
);
