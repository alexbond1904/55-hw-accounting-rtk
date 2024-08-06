import { createSlice } from "@reduxjs/toolkit"
import { changeNameFetch, changePasswordFetch, logInFetch, registerFetch } from "../actions/accountAction"
import type { User } from "../../utils/interfaces"

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null as User | null,
    status: "Guest" as string,
    pending: false,
    errorMessage: "" as string
  },
  reducers: {
    clearError: (state) => {
      state.errorMessage = ""
    },
    changeError: (state, action) => {
      state.errorMessage = action.payload
    },
    clearUser: (state) => {
      state.user = null;
      state.status = "Guest";
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerFetch.pending, (state) => {
        state.pending = true
      })
      .addCase(registerFetch.fulfilled, (state, action) => {
        state.user = action.payload
        action.payload && (state.status = action.payload.roles[0])
        state.pending = false
      })
      .addCase(registerFetch.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
        state.status = "Guest"
        state.pending = false
      })
      .addCase(logInFetch.pending, (state) => {
        state.pending = true
      })
      .addCase(logInFetch.fulfilled, (state, action) => {
        state.user = action.payload
        action.payload && (state.status = action.payload.roles[0])
        state.pending = false
      })
      .addCase(logInFetch.rejected, (state, action) => {
        state.errorMessage = "Error: " + action.payload
        state.status = "Guest"
        state.pending = false
      })
      .addCase(changeNameFetch.pending, (state) => {
        state.pending = true
      })
      .addCase(changeNameFetch.fulfilled, (state, action) => {
        state.user = action.payload
        state.pending = false
      })
      .addCase(changeNameFetch.rejected, (state, action) => {
        state.errorMessage = "Error: " + action.payload
        state.pending = false
      })
      .addCase(changePasswordFetch.pending, (state) => {
        state.pending = true
      })
      .addCase(changePasswordFetch.fulfilled, (state) => {
        state.pending = false
      })
      .addCase(changePasswordFetch.rejected, (state, action) => {
        state.errorMessage = "Error: " + action.payload
        state.pending = false
      })

  }
})

export const { clearError, clearUser, changeError } = UserSlice.actions
export default UserSlice