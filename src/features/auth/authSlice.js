import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const userExist = JSON.parse(localStorage.getItem('user'))

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:userExist || null,
        isLoading:false,
        isSuccess: false,
        isError:false,
        message:"",

    },
    reducers:{},
    extraReducers: (builder) => {
builder
.addCase(registerUser.pending, (state, action)=>{
  state.isLoading = true
  state.isSuccess = false
  state.isError = false
})

builder
.addCase(registerUser.fulfilled, (state, action)=>{
  state.isLoading = false
  state.isSuccess = true
  state.isError = false
  state.user = action.payload
})

builder
.addCase(loginUser.rejected, (state, action)=>{
  state.isLoading = false
  state.isSuccess = false
  state.isError = true
  state.message = action.payload
})
builder
.addCase(loginUser.pending, (state, action)=>{
  state.isLoading = true
  state.isSuccess = false
  state.isError = false
})

builder
.addCase(loginUser.fulfilled, (state, action)=>{
  state.isLoading = false
  state.isSuccess = true
  state.isError = false
  state.user = action.payload
})

builder
.addCase(registerUser.rejected, (state, action)=>{
  state.isLoading = false
  state.isSuccess = false
  state.isError = true
  state.message = action.payload
})

.addCase(logoutUser.fulfilled, (state, action)=>{
  state.isLoading = false
  state.isSuccess = false
  state.isError = false
  state.user = null
  state.message = ""
})



    }
})

export default authSlice.reducer;

//for register 
export const registerUser = createAsyncThunk("AUTH/REGISTER", async(formData, thunkAPI) =>{
  
    try {
    return await authService.register(formData);
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message);
  }
});
export const loginUser = createAsyncThunk("AUTH/Login", async(formData, thunkAPI) =>{
  
    try {
    return await authService.login(formData);
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message);
  }
});


export const logoutUser = createAsyncThunk("AUTH/LOGOUT",async()  =>{
localStorage.removeItem("user");
})