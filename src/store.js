import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";
import { apiSlice } from "./slices/apiSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
    products: productSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
