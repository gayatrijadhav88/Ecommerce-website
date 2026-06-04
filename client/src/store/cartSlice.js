import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api.js';

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const { data } = await api.get('/cart');
  return data;
});

export const addToCart = createAsyncThunk('cart/add', async ({ productId, quantity = 1 }) => {
  const { data } = await api.post('/cart', { productId, quantity });
  return data;
});

export const updateCartItem = createAsyncThunk('cart/update', async ({ productId, quantity }) => {
  const { data } = await api.put(`/cart/${productId}`, { quantity });
  return data;
});

export const removeCartItem = createAsyncThunk('cart/remove', async (productId) => {
  const { data } = await api.delete(`/cart/${productId}`);
  return data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: { items: [] }, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  }
});

export default cartSlice.reducer;

