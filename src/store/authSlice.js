import api from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const updateUserSettings = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      // Use your existing 'api' instance instead of raw axios
      const response = await api.put("/auth/update-profile", userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
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
    theme: 'light',
    isReady: false, 
    loading: false,     
    userloading: false  
  },
  reducers: {
    hydrateAuth: (state, action) => {
      state.user = action.payload.user ?? state.user;
      state.token = action.payload.token ?? state.token;
      state.isAuthenticated = !!(action.payload.token && action.payload.user);
      state.isReady = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isReady = true;
      AsyncStorage.removeItem("USER_TOKEN");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isReady = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.userloading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
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
      // --- Handle Profile Update ---
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update user object in state
        state.theme = action.payload.theme; // Sync theme
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => { state.loading = true; }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state) => { state.loading = false; }
      );
  },
});

export const { hydrateAuth, logout } = authSlice.actions;
export default authSlice.reducer;