import api from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 1. Request OTP
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

// 2. Verify OTP & Login
export const loginWithOtp = createAsyncThunk(
  "auth/loginWithOtp",
  async ({ phone, otp, fullName }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/verify-otp", { phone, otp, fullName });
      await AsyncStorage.setItem("USER_TOKEN", response.data.token);
      return response.data; // Expected: { user: {...}, token: "..." }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Auth Failed");
    }
  }
);

// 3. App Refresh/Initial Boot
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("USER_TOKEN");
      if (!token) throw new Error("No token found");

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

// 4. FIXED: Update Profile (Matches Backend Switch Logic)
// payload should be: { type: 'name' | 'theme' | 'availability', value: any }
export const updateUserSettings = createAsyncThunk(
  "auth/updateProfile",
  async ({ type, value }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await api.put("/auth/update-profile", 
        { type, value }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Backend returns: { success: true, user: updatedUser }
      return response.data.user; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isReady: false, 
    loading: false,     
    userloading: false,
    theme: 'light' // Track theme directly for easy access
  },
  reducers: {
    hydrateAuth: (state, action) => {
      state.user = action.payload.user ?? state.user;
      state.token = action.payload.token ?? state.token;
      state.theme = action.payload.user?.theme ?? state.theme;
      state.isAuthenticated = !!(action.payload.token && action.payload.user);
      state.isReady = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isReady = true;
      state.theme = 'light';
      AsyncStorage.removeItem("USER_TOKEN");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginWithOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.theme = action.payload.user?.theme || 'light';
        state.isAuthenticated = true;
        state.isReady = true;
      })
      // REFRESH
      .addCase(refreshUser.pending, (state) => {
        state.userloading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.userloading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.theme = action.payload.user?.theme || 'light';
        state.isAuthenticated = true; 
        state.isReady = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.userloading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.isReady = true; 
      })
      // UPDATE PROFILE
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Full updated user from backend
        state.theme = action.payload.theme; // Keep theme in sync
      })
      // Global Loading Matchers
      .addMatcher(
        (action) => action.type.endsWith('/pending') && !action.type.includes('refreshUser'),
        (state) => { state.loading = true; }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state) => { state.loading = false; }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => { state.loading = false; }
      );
  },
});

export const { hydrateAuth, logout } = authSlice.actions;
export default authSlice.reducer;