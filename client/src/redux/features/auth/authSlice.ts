import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isAuthenticated: false
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = !!action.payload
        },
        logOut: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
})

export const {setUser, logOut} = authSlice.actions
export default authSlice.reducer