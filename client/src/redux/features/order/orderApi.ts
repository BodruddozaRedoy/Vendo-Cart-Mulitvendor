// src/redux/features/order/orderApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/order`,
    credentials: "include", // send cookies with each request
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    placeOrder: builder.mutation<
      any,
      {
        cartItems: any[];
        totalAmount: number;
        paymentMethod: "cod" | "stripe";
        stripeToken?: string;
        deliveryInfo: object
      }
    >({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
    }),
    getMyOrders: builder.query<any[], void>({
      query: () => ``,
      providesTags: ["Order"],
    }),
    trackOrder: builder.query({
        query:(id) => `/track/${id}`,
        providesTags: ["Order"]
    })
  }),
});

export const { usePlaceOrderMutation, useGetMyOrdersQuery, useTrackOrderQuery } = orderApi;

