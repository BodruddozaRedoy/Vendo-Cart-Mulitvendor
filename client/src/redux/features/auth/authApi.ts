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
    updateUser: build.mutation({
      query: (payload) => ({
        url: "/user/update",
        method: "PUT",
        body: payload
      })
    })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserQuery, useLogoutMutation, useUpdateUserMutation } = authApi;
