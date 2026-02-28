import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const requestOtp = createAsyncThunk(
  "auth/requestOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
      return confirmation;
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
    isAuthenticated: false, // NEW FLAG
    haslaunched: false,
    theme: 'light',
    isReady: false, 
    loading: false,     
    userloading: false  
  },
  reducers: {
    hydrateAuth: (state, action) => {
      state.user = action.payload.user ?? state.user;
      state.token = action.payload.token ?? state.token;
      // isAuthenticated is true only if we have a valid token/user
      state.isAuthenticated = !!(action.payload.token && action.payload.user);
      state.haslaunched = true;
      state.isReady = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // Reset on logout
      state.haslaunched = true;
      state.isReady = true;
      AsyncStorage.removeItem("USER_TOKEN");
    },
  },
  extraReducers: (builder) => {
    builder
      // 1. Login Logic
      .addCase(loginWithOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true; // Set true on successful login
        state.isReady = true;
      })
      // 2. Refresh/Boot Logic (The specific check you asked for)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.userloading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        // VALIDATION SUCCESS: Token is not expired and DB returned user
        state.isAuthenticated = true; 
        state.isReady = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.userloading = false;
        state.isAuthenticated = false; // Token expired or invalid
        state.token = null;
        state.user = null;
        state.isReady = true; 
      })
      // Standard loading states...
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