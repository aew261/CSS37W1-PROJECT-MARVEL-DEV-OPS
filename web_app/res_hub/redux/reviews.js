import { createSlice } from "@reduxjs/toolkit";

const reviewSlice=createSlice({
    name:"review",
    initialState:{reviews:[]},
    reducers:{
        setReviews:(state,action)=>{
            state.reviews=action.payload
        },
        deleteReview:(state,action)=>{
            state.reviews=state.reviews.filter((item)=>item.id !== action.payload)
        }
    }
})

export const {setReviews, deleteReview}=reviewSlice.actions;
export default reviewSlice.reducer