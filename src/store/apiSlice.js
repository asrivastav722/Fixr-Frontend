import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// --- 1. The Async Thunk (The API Call) ---
export const checkApiHealth = createAsyncThunk(
  'api/checkHealth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/hello');
      return response.data; // { success: true, message: "..." }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Network Error");
    }
  }
);

// --- 2. The Slice ---
const apiSlice = createSlice({
  name: 'api',
  initialState: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: '',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkApiHealth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkApiHealth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
      })
      .addCase(checkApiHealth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message = "Backend Offline";
      });
  },
});

export default apiSlice.reducer;