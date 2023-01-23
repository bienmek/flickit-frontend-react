import { configureStore} from "@reduxjs/toolkit";
import {flickitApi} from "./flickitApi";

export default configureStore({
    reducer: {
        [flickitApi.reducerPath]: flickitApi.reducer
    }
})