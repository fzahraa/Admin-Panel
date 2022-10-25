import { configureStore } from "@reduxjs/toolkit";
import adminSlice from '../features/admin/adminSlice';

const store = configureStore({
  reducer: {
    admin: adminSlice,
  },
  devTools: true,
});

export default store;