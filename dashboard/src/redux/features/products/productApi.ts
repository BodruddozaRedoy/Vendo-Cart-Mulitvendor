import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/product",
    credentials: "include", // Required for cookie support
  }),
  tagTypes: ["Product", "Category"],
  endpoints: (build) => ({
    addProduct: build.mutation({
      query: (payload) => ({
        url: "",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: build.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    getAllProductsByVendor: build.query({
      query: () => "/vendor/products",
      providesTags: ["Product"],
    }),
    getAProduct: build.query({
      query: (id) => `/${id}`,
      providesTags: ["Product"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getAllProducts: build.query({
      query: () => "",
      providesTags: ["Product"],
    }),
    addCategory: build.mutation({
      query: (payload) => ({
        url: `/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
    getAllCategory: build.query({
      query: () => `/`,
      providesTags: ["Category"],
    }),
    getACategory: build.query({
      query: (id) => `/${id}`,
      providesTags: ["Category"],
    }),
    updateACategory: build.mutation({
      query: (payload) => ({
        url: `/`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteACategory: build.mutation({
      query: (id) => ({
        url: `/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsByVendorQuery,
  useUpdateProductMutation,
  useGetAProductQuery,
  useDeleteProductMutation,
  useGetAllProductsQuery,
} = productApi;
