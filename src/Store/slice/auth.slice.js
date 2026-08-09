import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register, resetPassword, sendOtpEmail, verifyEmail, verifyOtp } from "./auth.reduer.js";

const initialState = {
  status: null,
  user: [],
  token: null,
  loading: false,
  registerEmail: null,
  otpVerifyStatus: null,
  resetPasswordStatus: null,
  sendOtpStatus: null,
  isAuthenticated: false,
  count: 0,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setaccessToken: (state, action) => {
      state.token = action.payload,
      state.isAuthenticated = true
    },
    setUserData: (state, action) => {
      state.user = action.payload
    },
    logoutUser: (state, action) => {
      state.user = null,
      state.token = null,
      state.isAuthenticated = false
    }
  },
  extraReducers: (Builder) => {
    // register
    Builder
    .addCase(register.pending, (state, action) => {
      state.loading = true,
      state.error = null
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false,
      state.status = action.payload?.status,
      state.registerEmail = action.payload?.email
      state.error = null
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false,
      state.error = action.payload
    });
    // email verify
      Builder
    .addCase(verifyEmail.pending, (state, action) => {
      state.loading = true,
       state.error = null
    })
    .addCase(verifyEmail.fulfilled, (state, action) => {
      state.loading = false,
      state.status = action.payload,
      state.error = null
    })
    .addCase(verifyEmail.rejected, (state, action) => {
      state.loading = false,
      state.error = action.payload
    });
    // login
    Builder
    .addCase(login.pending, (state, action) => {
      state.loading = true,
       state.error = null
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false,
      state.status = action.payload?.status,
      state.user = action.payload?.data,
      state.token = action.payload?.data?.accessToken
      state.error = null
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false,
      state.error = action.payload
    });
    // logout
    Builder
    .addCase(logout.pending, (state, action) => {
      state.loading = true,
       state.error = null
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.loading = false,
      state.status = action.payload,
      state.error = null
    })
    .addCase(logout.rejected, (state, action) => {
      state.loading = false,
      state.error = action.payload
    });
    // send otp to email
    Builder
    .addCase(sendOtpEmail.pending, (state, action) => {
      state.loading = true,
      state.error = null
    })
    .addCase(sendOtpEmail.fulfilled, (state, action) => {
      state.loading = false,
      state.sendOtpStatus = action.payload,
      state.error = null
    })
    .addCase(sendOtpEmail.rejected, (state, action) => {
      state.loading = false,
      state.error = action.payload
    });
    // otp verify
    Builder
    .addCase(verifyOtp.pending, (state, action) => {
      state.loading = true,
      state.error = null
    })
    .addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false,
      state.otpVerifyStatus = action.payload,
      state.error = null
    })
    .addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false,
      state.error = action.payload
    });
    // reset password
      Builder
    .addCase(resetPassword.pending, (state, action) => {
      state.loading = true,
      state.error = null
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false,
      state.resetPasswordStatus = action.payload,
      state.error = null
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.loading = false,
      state.error = action.payload
    });
  },
});

export default authSlice.reducer;
export const { setaccessToken, setUserData, logoutUser } = authSlice.actions;
