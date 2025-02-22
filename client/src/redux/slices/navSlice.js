import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggleNav : false
}

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        toggle : (state, action) => {
            state.toggleNav = !state.toggleNav
        }
    }
})

export const {toggle} = navSlice.actions
export default navSlice.reducer