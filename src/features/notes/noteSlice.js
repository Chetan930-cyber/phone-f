import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from "./noteService";

const noteSlice = createSlice({
  name:"notes",
  initialState:{
    notes:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
  },
  reducers:{},
  extraReducers:(builder) =>{
    builder
    .addCase(getNotes.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(getNotes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.notes = action.payload;
    })
    .addCase(getNotes.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    })

    builder
    .addCase(createNote.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(createNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.notes = [action.payload, ...state.notes];
    })
    .addCase(createNote.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    })
  },
})

export default noteSlice.reducer;
export const getNotes = createAsyncThunk("FETCH/NOTES", async(id, thunkAPI) =>{
  let token = thunkAPI.getState().auth.user.token;
  try{
    return await noteService.fetchNotes(id,token)
  }
  catch{
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
})

export const createNote = createAsyncThunk("ADD/NOTES", async(formData, thunkAPI) =>{
  let token = thunkAPI.getState().auth.user.token;
  try{
    return await noteService.addNotes(formData,token)
  }
  catch{
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
})