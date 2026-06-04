import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api.js';

const storedUser = localStorage.getItem('smartcommerce_user');

export const login = createAsyncThunk('auth/login', async (payload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
});

export const register = createAsyncThunk('auth/register', async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (payload) => {
  const { data } = await api.put('/auth/profile', payload);
  return data.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: localStorage.getItem('smartcommerce_token'),
    loading: false,
    error: null
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('smartcommerce_user');
      localStorage.removeItem('smartcommerce_token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('smartcommerce_user', JSON.stringify(action.payload.user));
        localStorage.setItem('smartcommerce_token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('smartcommerce_user', JSON.stringify(action.payload.user));
        localStorage.setItem('smartcommerce_token', action.payload.token);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('smartcommerce_user', JSON.stringify(action.payload));
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

