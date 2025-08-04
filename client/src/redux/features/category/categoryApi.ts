import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/categories",
    credentials: "include", // Required for cookie support
  }),
  tagTypes: ["Category"],
  endpoints: (build) => ({
    addCategory: build.mutation({
      query: (payload) => ({
        url: ``,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
    getAllCategory: build.query({
      query: () => ``,
      providesTags: ["Category"],
    }),
    getACategory: build.query({
      query: (id) => `/${id}`,
      providesTags: ["Category"],
    }),
    updateACategory: build.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteACategory: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"]
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetAllCategoryQuery,
  useGetACategoryQuery,
  useUpdateACategoryMutation,
  useDeleteACategoryMutation,
} = categoryApi;
