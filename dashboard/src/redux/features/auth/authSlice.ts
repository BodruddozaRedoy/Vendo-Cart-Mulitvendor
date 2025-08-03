import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isAuthenticated: false,
    hasTriedFetchingProfile: false,
    isLoading: false
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = !!action.payload
            state.hasTriedFetchingProfile = true
            state.isLoading = action.payload
        },
        logOut: (state) => {
            state.user = null
            state.isAuthenticated = false
            state.hasTriedFetchingProfile = true
        }
    }
})

export const {setUser, logOut} = authSlice.actions
export default authSlice.reducer