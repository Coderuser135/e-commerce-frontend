import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../configs/api.config.js";
import { refreshTokenUser } from "./auth.reducer.js";
import { toast } from "react-toastify";

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async ({ userInfo, email, bearerToken }, { rejectWithValue, dispatch }) => {
    try {
      const updateUserInfoData = await api.post(
        `/api/user/update-info/${email}`,
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        },
      );
      if (updateUserInfoData.status === 200) {
        toast.success("Your Info is updated");
        dispatch(refreshTokenUser());
      }
      console.log(updateUserInfoData);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ data, email, bearerToken }, { rejectWithValue, dispatch }) => {
    try {
      const updatePasswordData = await api.post(
        `/api/user/update-password/${email}`,
        data,
        { headers: { Authorization: `Bearer ${bearerToken}` } },
      );
      if (updatePasswordData.status === 200) {
        toast.success("Your Password Is Updated");
        dispatch(refreshTokenUser());
      }
      return updatePasswordData.status;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      console.log(error);
      toast.error(errorMessage);
      return rejectWithValue(error.message);
    }
  },
);
