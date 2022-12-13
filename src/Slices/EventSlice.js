import { createSlice } from "@reduxjs/toolkit";
export const EventSlice=createSlice({
    name:"eventObj",
    initialState:[],
    reducers:{
        addEvent:(state,action)=>{
           state.push(action.payload)
        }
    }
})
export const {addEvent}=EventSlice.actions;
export default EventSlice.reducer