import { apiSlice } from "./apiSlice";

const USER_URL = "/api";
export const razorpay = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/checkout`,
        method: "POST",
        body: data,
      }),
    }),

    getapikey: builder.mutation({
      query: () => ({
        url: `${USER_URL}/key`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCheckoutMutation, useGetapikeyMutation } = razorpay;
