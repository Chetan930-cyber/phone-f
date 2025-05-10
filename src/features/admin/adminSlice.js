import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";


const adminSlice = createSlice({
    name:'admin',
    initialState:{
        users:[],
        complaints:[],
        isLoading:false,
        isSuccess:false,
        isError:false,
        message:"",
    },
    reducers:{},
    extraReducers: (builder) =>{
    builder
     .addCase(getUsers.pending, (state,action ) =>{
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
    })

    .addCase(getUsers.fulfilled, (state,action ) =>{
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.users = action.payload
    })
    .addCase(getUsers.rejected, (state,action ) =>{
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
    });

     
    builder.addCase(getComplaints.pending, (state,action ) =>{
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
    })

    .addCase(getComplaints.fulfilled, (state,action ) =>{
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.complaints = action.payload
    })
    .addCase(getComplaints.rejected, (state,action ) =>{
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
    });
    }
})

export default adminSlice.reducer;


export const getUsers = createAsyncThunk("FETCH/USERS", async(_, thunkAPI) =>{
    let token = thunkAPI.getState().auth.user.token
    try {
        
    return await adminService.fetchUsers(token);
} catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
}
})

export const getComplaints  = createAsyncThunk("FETCH/COMPLAINTS", async(_, thunkAPI) =>{
    let token = thunkAPI.getState().auth.user.token
    try {
        
    return await adminService.fetchComplaints(token);
} catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
}
})