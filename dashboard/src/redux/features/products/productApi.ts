import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/product',
    credentials: 'include', // Required for cookie support
  }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    addProduct: build.mutation({
      query: (payload) => ({
        url: '',
        method: 'POST',
        body: payload,
      }),
    }),
    allProducts: build.mutation({
      query: (payload) => ({
        url: '/user/login',
        method: 'POST', 
        body: payload,
      }),
    }),
    getAllProductsByVendor: build.query({
        query: () => "/vendor/products",
        providesTags: ["Product"]
    }),
    logout: build.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST"
      }),
    })
  }),
});

export const { useAddProductMutation, useGetAllProductsByVendorQuery } = productApi;
