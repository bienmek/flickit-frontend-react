import {createSlice} from "@reduxjs/toolkit";

export const objectSlice = createSlice({
    name: "object",
    initialState: {
        currentObject: null,
        hasUserTookCurrentObject: false,
        timeLeft: {hours: 0, minutes: 0, seconds: 0}
    },
    reducers: {
        setCurrentObject: (state, action) => {
            state.currentObject = action.payload
        },
        setTimeLeft: (state, action) => {
            state.timeLeft = action.payload
        },
        setHasUserTookCurrentObject: (state, action) => {
            state.hasUserTookCurrentObject = action.payload
        }
    }
})