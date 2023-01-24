import {configureStore} from "@reduxjs/toolkit";
import {toasterSlice} from "./slices/toasterSlice";
import {objectSlice} from "./slices/objectSlice";

export const store = configureStore({
    reducer: {
        toaster: toasterSlice.reducer,
        object: objectSlice.reducer
    }
})