import { createSlice } from "@reduxjs/toolkit"


const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "" as string
  },
  reducers:{
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    }
  }
})

export default tokenSlice
export const {setToken, clearToken} = tokenSlice.actions
