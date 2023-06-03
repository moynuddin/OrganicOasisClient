import { apiSlice } from "./apiSlice";

const USER_URL = "/api";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.mutation({
      query: () => ({
        url: `${USER_URL}/products`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsMutation } = productApiSlice;
