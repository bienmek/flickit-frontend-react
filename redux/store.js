import {configureStore} from "@reduxjs/toolkit";
import {toasterSlice} from "./slices/toasterSlice";

export const store = configureStore({
    reducer: {
        toaster: toasterSlice.reducer,
    }
})