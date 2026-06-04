import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api.js';

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async () => {
  const { data } = await api.get('/wishlist');
  return data;
});

export const toggleWishlist = createAsyncThunk('wishlist/toggle', async (productId) => {
  const { data } = await api.post('/wishlist/toggle', { productId });
  return data;
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { wishlist: { products: [] } },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      });
  }
});

export default wishlistSlice.reducer;

