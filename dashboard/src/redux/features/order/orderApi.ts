// src/redux/features/order/orderApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_ORIGIN = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_ORIGIN}/api/v1/order`,
    credentials: "include", // ✅ send cookies with each request
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
      query: (id) => `/track/${id}`,
      providesTags: ["Order"],
    }),
    getOrdersByVendor: builder.query({
      query: () => `/vendor-orders`,
      providesTags: ["Order"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/status/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Order"]
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetMyOrdersQuery,
  useTrackOrderQuery,
  useGetOrdersByVendorQuery,
  useUpdateStatusMutation,
} = orderApi;
