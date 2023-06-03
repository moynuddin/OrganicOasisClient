import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (action.payload) {
        const alreadyExists = state.some(
          (data) => data._id === action.payload._id
        );
        if (!alreadyExists) {
          state.push(action.payload);
          toast.success("Added to cart!", {
            position: "top-center",
          });
        }
      }
    },
    priceList: (state, action) => {
      const { id, newQty } = action.payload;
      state.map((item) => {
        if (item._id === id) {
          item.quantity = newQty;
        }
      });
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addToCart, priceList, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
