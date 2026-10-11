import { createSlice } from "@reduxjs/toolkit";

const modalSlice=createSlice({
    name:"modal",
    initialState:{
        images:false
    },
    reducers:{
        setModalState:(state,action)=>{
            state.images=action.payload
        }
    }
})

export const {setModalState}=modalSlice.actions;
export default modalSlice.reducer