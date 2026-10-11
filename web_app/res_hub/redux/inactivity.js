import { createSlice } from "@reduxjs/toolkit";

const inactivitySlice=createSlice({
    name:"inactivity",
    initialState:{timeStamp:null},
    reducers:{
        setTimeStamp:(state,action)=>{
            state.timeStamp=action.payload
        },
        clearTimeStamp:(state, action)=>{
            state.timeStamp=null;
        }
    }
})

export const {setTimeStamp, clearTimeStamp}=inactivitySlice.actions
export default inactivitySlice.reducer