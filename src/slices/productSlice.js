import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  filteredValue: "",
  normalOrder: [],
  increasingOrder: [],
  decreasingOrder: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getItems: (state, action) => {
      state.data = action.payload;
      state.normalOrder = [...state.data];
    },

    filter: (state, action) => {
      state.filteredValue = action.payload;
    },

    recommended: (state) => {
      state.data = [...state.normalOrder];
    },

    lowToHigh: (state) => {
      state.increasingOrder = [...state.data].sort((a, b) => a.price - b.price);
      state.data = [...state.increasingOrder];
    },

    hightoLow: (state) => {
      state.decreasingOrder = [...state.data].sort((a, b) => b.price - a.price);
      state.data = [...state.decreasingOrder];
    },
  },
});

export const { getItems, filter, recommended, lowToHigh, hightoLow } =
  productSlice.actions;

export default productSlice.reducer;
