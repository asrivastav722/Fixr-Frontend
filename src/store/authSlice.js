import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const requestOtp = createAsyncThunk(
  "auth/requestOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/request-otp", { phone });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send OTP");
    }
  }
);

export const loginWithOtp = createAsyncThunk(
  "auth/loginWithOtp",
  async ({ phone, otp, fullName }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/verify-otp", { phone, otp, fullName });
      
      // Persist only the token for security; user details can be re-fetched or hydrated
      await AsyncStorage.setItem("USER_TOKEN", response.data.token);
      
      return response.data; // { user: { id, phone, fullName, theme }, token }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Auth Failed");
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("USER_TOKEN");
      if (!token) throw new Error("No token found");

      // Attach token manually for this specific "boot" call
      const response = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return { user: response.data.user, token };
    } catch (err) {
      await AsyncStorage.removeItem("USER_TOKEN");
      return rejectWithValue(err.response?.data?.message || "Session Expired");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    haslaunched: false,
    theme: 'light',
    isReady: false, 
    
    // Granular Loading States
    isRefreshing: false, // For boot-up /auth/me check
    isOtpLoading: false, // For requesting the code
    isVerifying: false,  // For verifying the code
  },
  reducers: {
    hydrateAuth: (state, action) => {
      state.user = action.payload.user ?? state.user;
      state.token = action.payload.token ?? state.token;
      state.isAuthenticated = !!(action.payload.token && action.payload.user);
      state.haslaunched = true;
      state.isReady = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.haslaunched = true;
      state.isReady = true;
      AsyncStorage.removeItem("USER_TOKEN");
    },
  },
  extraReducers: (builder) => {
    builder
      // --- 1. Request OTP ---
      .addCase(requestOtp.pending, (state) => {
        state.isOtpLoading = true;
      })
      .addCase(requestOtp.fulfilled, (state) => {
        state.isOtpLoading = false;
      })
      .addCase(requestOtp.rejected, (state) => {
        state.isOtpLoading = false;
      })

      // --- 2. Verify OTP (Login) ---
      .addCase(loginWithOtp.pending, (state) => {
        state.isVerifying = true;
      })
      .addCase(loginWithOtp.fulfilled, (state, action) => {
        state.isVerifying = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isReady = true;
      })
      .addCase(loginWithOtp.rejected, (state) => {
        state.isVerifying = false;
      })

      // --- 3. Refresh User (Boot sequence) ---
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isReady = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.isReady = true; 
      });
  },
});

export const { hydrateAuth, logout } = authSlice.actions;
export default authSlice.reducer;