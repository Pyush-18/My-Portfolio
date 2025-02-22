import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loggedIn : false,
    authUser : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.loggedIn = true
        },
        logout: (state) => {
            state.loggedIn = false
        },
        setAuthUser : (state, action) => {
            state.authUser = action.payload
        }
    }
})

export const {login, logout, setAuthUser} = authSlice.actions
export default authSlice.reducer