import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: userReducer, // Your combined reducer
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     // Additional middleware options can be configured here
  //     // For example, to enable Redux Thunk:
  //     thunk: true,
    // }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

export default store;