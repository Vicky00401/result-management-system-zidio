import { createSlice } from "@reduxjs/toolkit";

const detail = createSlice({
    name:"user",
    initialState:{
        token:""
    },
    reducers:{
        profile:(state,action)=>{
            state.value=action.payload
        }
    }
})

export const {profile} = detail.actions
export default detail.reducer