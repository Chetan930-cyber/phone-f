import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import complaintReducer from "../features/complaints/complaintSlice"
import noteReducer from "../features/notes/noteSlice"
import adminReducer from "../features/admin/adminSlice"
const store = configureStore ({
reducer:{
  auth:authReducer,
  complaints:complaintReducer,
  notes: noteReducer,
  admin: adminReducer,
},
});

export default store;