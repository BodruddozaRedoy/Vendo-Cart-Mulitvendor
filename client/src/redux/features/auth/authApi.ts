import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include', // Required for cookie support
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (payload) => ({
        url: '/user/register',
        method: 'POST',
        body: payload,
      }),
    }),
    loginUser: build.mutation({
      query: (payload) => ({
        url: '/auth/login/',
        method: 'POST', 
        body: payload,
      }),
    }),
    getUser: build.query({
        query: () => "/user/",
        providesTags: ["User"]
    })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserQuery } = authApi;
