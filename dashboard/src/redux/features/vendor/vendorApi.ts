import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vendorApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include', // Required for cookie support
  }),
  tagTypes: ['Vendor'],
  endpoints: (build) => ({
    
  }),
});

export const {  } = vendorApi;
