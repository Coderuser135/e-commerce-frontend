import { createSlice } from "@reduxjs/toolkit";
import { updatePassword, updateUserInfo } from "../reducers/user.reducer.js";

const initialState = {
    userInfo: null,
    loading: false,
    updatePasswordLoading: false,
    status: null,
    error: null
}

const user = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (Builders) => {
        // update info
        Builders.addCase(updateUserInfo.pending, (state, action) => {
            state.loading = true,
            state.error = null
        }),
        Builders.addCase(updateUserInfo.fulfilled, (state, action) => {
            state.loading = false,
            state.userInfo = action.payload
        }),
        Builders.addCase(updateUserInfo.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })
        // update password
            Builders.addCase(updatePassword.pending, (state, action) => {
            state.updatePasswordLoading = true,
            state.error = null
        }),
        Builders.addCase(updatePassword.fulfilled, (state, action) => {
            state.updatePasswordLoading = false,
            state.status = action.payload
        }),
        Builders.addCase(updatePassword.rejected, (state, action) => {
            state.updatePasswordLoading = false,
            state.error = action.payload
        })
    }
})

export default user.reducer
export const {} = user.actions