import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_ORIGIN = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_ORIGIN}/api/v1`,
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
        url: '/user/login',
        method: 'POST', 
        body: payload,
      }),
    }),
    getUser: build.query({
        query: () => "/user/me",
        providesTags: ["User"]
    }),
    logout: build.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST"
      }),
    }),
    getAllUsers: build.query({
      query: () => '/user',
      providesTags:["User"]
    })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserQuery, useLogoutMutation, useGetAllUsersQuery } = authApi;
