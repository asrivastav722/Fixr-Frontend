import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import apiReducer from './apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
  },
});