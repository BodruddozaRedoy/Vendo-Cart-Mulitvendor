import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/wishlist",
    credentials: "include", // Required for cookie support
  }),
  tagTypes: ["Wishlist"],
  endpoints: (build) => ({
    addToWishlist: build.mutation({
      query: (payload) => ({
        url: ``,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    getWishlist: build.query({
      query: () => ``,
      providesTags: ["Wishlist"],
    }),
    updateWishlist: build.mutation({
      query: ({id,payload}) => ({
        url: `/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    deleteWishlist: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {useAddToWishlistMutation, useDeleteWishlistMutation, useGetWishlistQuery, useUpdateWishlistMutation} = wishlistApi;
