import {createSlice} from "@reduxjs/toolkit";

export const objectSlice = createSlice({
    name: "object",
    initialState: {
        currentObject: null,
        hasUserTookCurrentObject: false,
        timeLeft: {hours: 0, minutes: 0, seconds: 0},
        isCountDown: false
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
        },
        setIsCountDown: (state, action) => {
            state.isCountDown = action.payload
        },
        resetObject: (state) => {
            state.currentObject = null
            state.hasUserTookCurrentObject = false
        }
    }
})