import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/vendor",
    credentials: "include", // Required for cookie support
  }),
  tagTypes: ["Vendor"],
  endpoints: (build) => ({
    addVendor: build.mutation({
      query: (payload) => ({
        url: "",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Vendor"],
    }),
    updateVendor: build.mutation({
      query: ({ id, payload }) => ({
        url: `/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    getAVendor: build.query({
      query: (id) => `/${id}`,
      providesTags: ["Vendor"],
    }),
    deleteVendor: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vendor"],
    }),
    getAllVendor: build.query({
      query: () => "",
      providesTags: ["Vendor"],
    }),
    approveVendor: build.mutation({
      query: (id) => ({
        url: `/approve/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Vendor"],
    }),
    getVendorCustomers: build.query({
      query: (id) => `/store/customers`,
      providesTags: ["Vendor"],
    }),
  }),
});

export const {
  useAddVendorMutation,
  useGetAVendorQuery,
  useDeleteVendorMutation,
  useGetAllVendorQuery,
  useUpdateVendorMutation,
  useApproveVendorMutation,
  useGetVendorCustomersQuery,
} = vendorApi;
