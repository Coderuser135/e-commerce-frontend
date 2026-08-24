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
        dispatch(
          getProducts({
            bearerToken,
          }),
        );
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
        await dispatch(
          getProducts({
            bearerToken,
          }),
        );
        toast.success("This Products is updated");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteProducts = createAsyncThunk(
  "admin/deleteProducts",
  async ({ productsId, bearerToken }, { rejectWithValue, dispatch }) => {
    console.log(productsId, bearerToken);
    try {
      const deleteProdutsItem = await api.delete(
        `/api/products/${productsId}`,
        { headers: { Authorization: `Bearer ${bearerToken}` } },
      );
      if (deleteProdutsItem.status === 200) {
        dispatch(
          getProducts({
            bearerToken,
          }),
        );
        toast.success("This products is deleted");
      }
    } catch (error) {
      return rejectWithValue(erro.message);
    }
  },
);

export const getAddToCard = createAsyncThunk(
  "admin/getAddToCard",
  async ({ bearerToken }, { rejectWithValue }) => {
    try {
      const getAddToCardItem = await api.get("/api/addToCard", {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });
      return getAddToCardItem.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addToCard = createAsyncThunk(
  "admin/addToCard",
  async ({ productsId, bearerToken }, { rejectWithValue, dispatch }) => {
    try {
      console.log(productsId, bearerToken);
      const addToCardItem = await api.post(
        `api/addToCard/${productsId}`,
        {},
        { headers: { Authorization: `Bearer ${bearerToken}` } },
      );
      if (addToCardItem.status === 201 || addToCardItem.status === 200) {
        dispatch(getAddToCard({ bearerToken }));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteAddToCard = createAsyncThunk(
  "admin/deleteAddToCard",
  async ({ id, bearerToken }, { rejectWithValue, dispatch }) => {
    console.log(id, bearerToken);
    try {
      const deleteAddToCardItem = await api.delete(`api/addToCard/${id}`, {
        headers: { Authorization: `Bearer ${bearerToken}` },
      });
      if (deleteAddToCardItem.status === 200) {
        dispatch(getAddToCard({ bearerToken }));
      }
      console.log(deleteAddToCardItem);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const increaseAddToCardQuentity = createAsyncThunk(
  "admin/increaseAddToCardQuentity",
  async (
    { itemId, bearerToken },
    { rejectWithValue, dispatch },
  ) => {
    console.log(itemId, bearerToken);
    try {
      const updateQuentity = await api.post(
        `/api/addToCard/increase-quentity/${itemId}`,
        {},
        { headers: { Authorization: `Bearer ${bearerToken}` } },
      );
      if (updateQuentity.status === 200) {
        dispatch(getAddToCard({ bearerToken }));
      }
      console.log(updateQuentity);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const decreaseAddToCardQuentity = createAsyncThunk(
  "admin/decreaseAddToCardQuentity",
  async (
    { itemId, bearerToken },
    { rejectWithValue, dispatch },
  ) => {
    console.log(itemId, bearerToken);
    try {
      const updateQuentity = await api.post(
        `/api/addToCard/decrease-quentity/${itemId}`,
        {},
        { headers: { Authorization: `Bearer ${bearerToken}` } },
      );
      if (updateQuentity.status === 200) {
        dispatch(getAddToCard({ bearerToken }));
      }
      console.log(updateQuentity);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createOrder = createAsyncThunk(
  "admin/createOrder",
  async ({inputData, bearerToken}, {rejectWithValue, dispatch}) => {
    try {
      const createOrderItem = await api.post(`/api/order`, inputData, {headers: {Authorization: `Bearer ${bearerToken}`}})
    } catch (error) {
      
    }
  }
)
