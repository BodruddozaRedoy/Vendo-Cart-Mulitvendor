import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/product`,
    credentials: "include", // Required for cookie support
  }),
  tagTypes: ["Product"],
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
