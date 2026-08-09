import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../configs/api.config.js";
import { toast } from "react-toastify";

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const getUserData = await api.post("/api/auth/register", data);
      if (getUserData.status === 201) {
        toast.success("Account created successfully email verify now");
      }
      return {
        status: getUserData.status,
        email: getUserData.email,
      };
    } catch (error) {
      rejectWithValue(error.message);
      console.log(error.message);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const emailOtpVerify = await api.post(`/api/auth/email-verify/${email}`, {
        otp: otp,
      });
      if (emailOtpVerify.status === 200) {
        toast.success("Your email verify successfully");
      }
      return emailOtpVerify.status;
    } catch (error) {
      rejectWithValue(error.message);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const login = await api.post("/api/auth/login", data, {
        withCredentials: true,
      });
      if (login.status === 200) {
        toast.success("You are login successfully");
      }
      return {
        status: login.status,
        data: login.data?.data,
      };
    } catch (error) {
      rejectWithValue(error.message);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const logoutUser = await api.get(
        "api/auth/logout",
        {},
        { withCredentials: true },
      );
      if (logoutUser.status === 200) {
        toast.success("Your account logout successfully");
      }
      return logoutUser.status;
    } catch (error) {
      rejectWithValue(error.message);
      const errorMessage = error.response?.data?.message;
      return toast.error(errorMessage);
    }
  },
);

export const sendOtpEmail = createAsyncThunk(
  "auth/sendOtpEmail",
  async (email, { rejectWithValue }) => {
    try {
      const sendOtp = await api.post("/api/auth/email-otp", { email: email });
      if (sendOtp.status === 200) {
        toast.success("send gmail OTP successfully");
      }
      return sendOtp.status;
    } catch (error) {
      rejectWithValue(error.message);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOto",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const verifyOtpRes = await api.post(`/api/auth/verify-otp/${email}`, {
        otp,
      });
      if (verifyOtpRes.status === 200) {
        toast.success("Your OTP is verify successfully");
      }
      return verifyOtpRes.status;
    } catch (error) {
      rejectWithValue(error.message);
      const errorMessage =
        error.response?.data?.message || "Semething went wrong";
      return toast.error(errorMessage);
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ newPassword, confirmPassword, email }, { rejectWithValue }) => {
    try {
      const resetPasswordRes = await api.post(
        `/api/auth/reset-password/${email}`,
        { newPassword: newPassword, confirmPassword: confirmPassword },
      );
      if (resetPasswordRes.status === 200) {
        toast.success("Your passoword reset successfully");
      }
      return resetPasswordRes.status;
    } catch (error) {
      rejectWithValue(error.message);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  },
);
