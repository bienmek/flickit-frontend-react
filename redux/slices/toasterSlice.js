import {createSlice} from "@reduxjs/toolkit";

export const toasterSlice = createSlice({
    name: "toaster",
    initialState: {
        show: false,
        text: "",
        type: "ERROR"
    },
    reducers: {
        showToaster: (state, action) => {
            state.show = true
            state.text = action.payload.text
            state.type = action.payload.type
        },
        hideToaster: (state) => {
            state.show = false
            state.text = ""
            state.type = "ERROR"
        }
    }
})