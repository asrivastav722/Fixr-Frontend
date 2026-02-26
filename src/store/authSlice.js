import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    hasLaunched: false,
    phone: "",
    userId: null,
    theme: 'light',
    otp: null, 
    isReady: false,
  },
  reducers: {
    hydrateAuth: (state, action) => {
      // Use nullish coalescing (??) so 'false' values aren't ignored
      state.isAuthenticated = action.payload.isAuthenticated ?? state.isAuthenticated;
      state.hasLaunched = action.payload.hasLaunched ?? state.hasLaunched;
      state.phone = action.payload.phone ?? state.phone;
      state.userId = action.payload.userId ?? state.userId;
      state.theme = action.payload.theme ?? state.theme;
      state.otp = action.payload.otp ?? state.otp; // Fixed the theme typo here
      state.isReady = true;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.hasLaunched = true;
      state.phone = action.payload.phone;
      state.userId = action.payload.userId || "user_001";
      state.isReady = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.phone = "";
      state.userId = null;
      // We usually keep 'hasLaunched' as true even on logout 
      // so they don't see the onboarding again.
    },
  },
});

export const { hydrateAuth, login, logout } = authSlice.actions;
export default authSlice.reducer;