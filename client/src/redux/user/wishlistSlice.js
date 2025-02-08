// src/redux/wishlist/wishlistSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array of wishlist items
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action) {
      state.items = action.payload;
    },
    addWishlistItem(state, action) {
      // Avoid duplicates
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeWishlistItem(state, action) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const { setWishlist, addWishlistItem, removeWishlistItem } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
