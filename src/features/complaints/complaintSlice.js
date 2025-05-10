import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import complaintService from "./complaintService";

const complaintSlice = createSlice({
    name: "complaints",
    initialState:{
        complaints:[],
        complaint:{},
        isLoading:false,
        isSuccess:false,
        isError:false,
        message:""

    },
    reducers:{reset:(state,action) =>{
        state.complaints = []
        state.complaint = {}
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
       state. message = ""

    }},
    extraReducers:(builders) =>{
        builders
        .addCase(getAllComplaints.pending, (state,action) => {
            state.isLoading = true;
            state.isError = false; 
            state.isSuccess = false;
           
        });
        
        builders.addCase(getAllComplaints.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false; 
            state.isSuccess = true;
            state.complaints = action.payload;
           
        });
        builders.addCase(getAllComplaints.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true; 
            state.isSuccess = false;
            state.message = action.payload;
           
        });

        builders
        .addCase(getComplaint.pending, (state,action) => {
            state.isLoading = true;
            state.isError = false; 
            state.isSuccess = false;
           
        });
        
        builders.addCase(getComplaint.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false; 
            state.isSuccess = true;
            state.complaint = action.payload;
           
        });
        builders.addCase(getComplaint.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true; 
            state.isSuccess = false;
            state.message = action.payload;
           
        });
        builders.addCase(closeComplaint.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
          })
          builders.addCase(closeComplaint.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.complaint = action.payload;
          })
          builders.addCase(closeComplaint.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
          })



        builders.addCase(raiseComplaint.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
          })
          builders.addCase(raiseComplaint.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.complaint = action.payload;
          })
          builders.addCase(raiseComplaint.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
          })

    },

});
export const {reset}  = complaintSlice.actions
export default complaintSlice.reducer;

export const getAllComplaints = createAsyncThunk('FETCH/COMPLAINTS', async( _, thunkAPI) => {
let token = thunkAPI.getState().auth.user.token;

    try {
    return await complaintService.fetchComplaints(token);
} catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
}
});

export const getComplaint = createAsyncThunk('FETCH/COMPLAINT', async( id, thunkAPI) => {
let token = thunkAPI.getState().auth.user.token;

    try {
    return await complaintService.fetchComplaint(id,token);
} catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
}
});

export const raiseComplaint = createAsyncThunk("ADD/COMPLAINT", async(formData, thunkAPI)=>{
    let token = thunkAPI.getState().auth.user.token;
    try {
        return await complaintService.addComplaint(formData,token)
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
})

export const closeComplaint = createAsyncThunk("UPDATE/COMPLAINT", async(id, thunkAPI)=>{
    let token = thunkAPI.getState().auth.user.token;
    try {
        return await complaintService.updateComplaint(id,token)
    } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
})