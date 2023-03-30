import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    haveNotification: false
}

const listeningSlice = createSlice({
    name: 'listening',
    initialState,
    reducers: {
        //normal reducer without async logic
        notificationToggle(state, action){
            state.haveNotification = !state.haveNotification;
        }
    },
})

export const {notificationToggle} = listeningSlice.actions;

export default listeningSlice.reducer;