import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    skills: [],
    projects: [],
    refresh: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSkills : (state,action) => {
            state.skills = action.payload
        },
        setProjects : (state,action) => {
            state.projects = action.payload
        },
        setRefresh : (state,action) => {
            state.refresh =  !state.refresh
        },
    }
})

export const {setSkills, setProjects,setRefresh} = userSlice.actions

export default userSlice.reducer