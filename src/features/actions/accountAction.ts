import { createAsyncThunk } from "@reduxjs/toolkit"
import { BASE_URL, encryptedToken } from "../../utils/constants"
import type { UserData, UserRequest } from "../../utils/interfaces"
import type { RootState } from "../../app/store"

export const registerFetch = createAsyncThunk(
  "account/registerFetch",
  async (registerUser: UserRequest, thunkAPI) => {
    const [response] = await Promise.all([fetch(`${BASE_URL}/user`, {
      method: "POST",
      body: JSON.stringify(registerUser),
      headers: {
        "Content-Type": "application/json"
      }
    })])
      if (!response.ok) {
        const error = await response.json()
        const message = (error.message === "user exists") ? "1email already exist" : error.message
        return thunkAPI.rejectWithValue(message)
      }
    return await response.json()
  }
)


export const logInFetch = createAsyncThunk(
  "account/logInFetch",
  async (userToken:string, thunkAPI) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken
      },
      redirect: 'follow'
    })
    if (!response.ok) {
      const error = await response.json()
      console.log(error)
      return thunkAPI.rejectWithValue(error.message)
    }
    return await response.json()
  }
)


export const changeNameFetch = createAsyncThunk(
  "account/changeNameFetch",
  async (userData:UserData, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.token.token;

    const response = await fetch(`${BASE_URL}/user`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({firstName: userData.firstName, lastName: userData.lastName }),
      redirect: 'follow'
    })
    if (!response.ok) {
      const error = await response.json()
      return thunkAPI.rejectWithValue(error.message)
    }
    const data = await response.json()
    return data
  }
)


export const changePasswordFetch = createAsyncThunk(
  "account/changePasswordFetch",
  async (passwords:{currentPassword:string, newPassword:string}, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const login = state.user.user!.login;

    const response = await fetch(`${BASE_URL}/user/password`, {
      method: 'PUT',
      headers: {
        "Authorization": encryptedToken(login, passwords.currentPassword),
        "X-Password": passwords.newPassword
      }
    })
    if (!response.ok) {
      const error = await response.json()
      console.log(error)
      const errorMessage = error.message === "Unauthorized" ? "Wrong current password" : error.message;
      return thunkAPI.rejectWithValue(errorMessage)
    }
    console.log("Changed")
    return "Password changed"
  }
)