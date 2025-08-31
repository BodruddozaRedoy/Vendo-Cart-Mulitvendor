import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/cart`,
    credentials: "include", // Required for cookie support
  }),
  tagTypes: ["Cart"],
  endpoints: (build) => ({
    addToCart: build.mutation({
      query: (payload) => ({
        url: ``,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Cart"],
    }),
    getCart: build.query({
      query: () => ``,
      providesTags: ["Cart"],
    }),
    updateCart: build.mutation({
      query: (payload) => ({
        url: `/`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: build.mutation({
      query: (id) => ({
        url: `/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: build.mutation({
        query: (id) => ({
            url: `/clear/${id}`,
            method: "DELETE"
        }),
        invalidatesTags: ["Cart"]
    })
  }),
});

export const {useAddToCartMutation, useClearCartMutation, useDeleteCartMutation, useGetCartQuery, useUpdateCartMutation} = cartApi;
